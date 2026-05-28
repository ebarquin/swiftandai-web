---
layout: ../../layouts/PostLayout.astro
title: "Diseñar una UI de chat que no sabe nada de LLMs (y por qué eso importa)"
date: "2025-12-27"
description: "Separar la UI de chat de la lógica LLM no es una optimización: es una decisión arquitectónica que evita acoplamiento y deuda técnica."
image: /images/posts/chatkit-ui.png
imageAlt: Ilustración conceptual de una interfaz de chat desacoplada de la lógica de IA
---


# Diseñar una UI de chat que no sabe nada de LLMs (y por qué eso importa)

Durante los últimos días he estado construyendo **ChatKit**, un pequeño SDK en SwiftUI para renderizar interfaces de chat.  
No para “hablar con ChatGPT”.  
No para “integrar IA”.  
Simplemente para **mostrar mensajes**.

Y esa distinción, aunque parezca menor, cambia completamente el diseño.

---

## El problema habitual con las UIs de chat

La mayoría de interfaces de chat actuales —especialmente las que rodean a LLMs— cometen el mismo error de base:

> **La UI intenta entender la conversación.**

Decide cuándo toca responder el asistente.  
Asume alternancia usuario → assistant.  
Gestiona estados de red, tokens, streaming, retries.  
Se acopla al proveedor (OpenAI, Anthropic, local, etc.).

El resultado es una UI:
- difícil de reutilizar  
- difícil de testear  
- difícil de evolucionar  
- innecesariamente acoplada al backend  

Yo quería justo lo contrario.

---

## Principio fundamental: la UI no piensa

ChatKit parte de una idea muy simple:

> **La UI no decide nada. Solo renderiza lo que le pasan.**

Si recibe:
- dos mensajes del assistant seguidos → renderiza dos  
- un mensaje system en mitad → lo muestra  
- cero mensajes → no inventa nada  

No hay reglas implícitas.  
No hay “lógica conversacional”.  
No hay suposiciones.

La conversación **no existe** como concepto.  
Solo existe una lista ordenada de mensajes.

---

## Roles como datos, no como reglas

En ChatKit, un mensaje tiene un rol:

- `user`
- `assistant`
- `system`

El rol **solo afecta a cómo se renderiza** (alineación, estilo, color).  
No define quién habla después ni cuántas veces puede hacerlo.

Si el consumidor inyecta:
- dos respuestas consecutivas del assistant  
- un system message en mitad  
- o ningún assistant en absoluto  

ChatKit no lo cuestiona. Lo renderiza.

---

## El ViewModel como frontera explícita

La interacción con el exterior ocurre a través de un `ChatViewModel` inicializado así:

- mensajes iniciales
- quick prompts opcionales
- un closure `onSend`

Cuando el usuario envía un mensaje, ChatKit:
- lo añade al array
- notifica mediante el closure

Qué ocurre después **no es responsabilidad del SDK**:
- llamadas a un LLM  
- retries  
- streaming  
- errores  
- múltiples respuestas  

ChatKit no envía requests.  
Notifica eventos.

---

## Estados mínimos y visuales

ChatKit define estados **solo para la UI**:

- ready  
- awaitingAssistant  
- error  

No hay estados mágicos.  
No hay inferencias implícitas.

Si el consumidor quiere:
- bloquear input  
- mostrar animaciones  
- permitir múltiples respuestas  

lo decide fuera.

---

## Sobre el “streaming” (honestidad técnica)

Aunque el modelo define estados como `streaming`, a día de hoy **ChatKit no implementa un pipeline oficial de tokens**.

Esto es intencional.

Antes de añadir complejidad, quise validar que el diseño:
- no se rompía en el caso más simple  
- no imponía decisiones irreversibles  

El diseño está preparado para crecer hacia streaming, pero **no lo promete todavía**.

---

## Apariencia: configuración, no temas cerrados

ChatKit expone la apariencia como configuración:

- colores  
- tipografía  
- padding  
- estilos de burbuja  

No impone temas cerrados ni branding propio.

La app contenedora decide:
- colores light  
- colores dark  
- o usar un único esquema  

El SDK no intenta ser más listo que el consumidor.

---

## Animaciones: sutiles y opcionales

Las animaciones están pensadas como:
- transiciones suaves  
- feedback visual mínimo  

No afectan al modelo de datos ni al flujo.

Si mañana se eliminan, el sistema sigue funcionando.

---

## Cómo probarlo contra un LLM real (sin buenas prácticas)

Para validar que el diseño funciona fuera del entorno teórico, conecté ChatKit directamente a la API de OpenAI desde **un proyecto nuevo**, importándolo como Swift Package.

El objetivo **no es enseñar a integrar OpenAI correctamente**, sino demostrar que el SDK funciona con un backend real.

Para ello creé un `OpenAIClient` mínimo

```swift
import Foundation
import ChatKit

struct OpenAIClient {

    let apiKey: String

    func send(
        messages: [ChatMessage],
        completion: @escaping (Result<String, Error>) -> Void
    ) {
        let url = URL(string: "https://api.openai.com/v1/chat/completions")!

        let payload: [String: Any] = [
            "model": "gpt-4o-mini",
            "messages": messages.map {
                [
                    "role": mapRole($0.role),
                    "content": $0.content
                ]
            }
        ]

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try? JSONSerialization.data(withJSONObject: payload)

        URLSession.shared.dataTask(with: request) { data, _, error in
            if let error {
                completion(.failure(error))
                return
            }

            guard
                let data,
                let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                let choices = json["choices"] as? [[String: Any]],
                let message = choices.first?["message"] as? [String: Any],
                let content = message["content"] as? String
            else {
                completion(.failure(NSError(domain: "OpenAI", code: -1)))
                return
            }

            completion(.success(content))
        }.resume()
    }

    private func mapRole(_ role: ChatRole) -> String {
        switch role {
        case .user:
            return "user"
        case .assistant:
            return "assistant"
        case .system:
            return "system"
        }
    }
}

```

y hardcodeé la API key directamente en el `ContentView`



```swift
import SwiftUI
import ChatKit

struct ContentView: View {

    @StateObject private var viewModel: ChatViewModel
    private let brandAppearance: ChatAppearancePair

    init() {
        var vmRef: ChatViewModel?

        let vm = ChatViewModel(
            initialMessages: [
                ChatMessage(
                    role: .assistant,
                    content: "Hi! Ask me anything.",
                    status: .completed
                )
            ],
            quickPrompts: [
                QuickPrompt(id: UUID(), title: "Resume this", message: "Resume this"),
                QuickPrompt(id: UUID(), title: "Give examples", message: "Give examples"),
                QuickPrompt(id: UUID(), title: "Explain like I'm 5", message: "Explain like I'm 5")
            ],
            onSend: { message in
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                    let response = ChatMessage(
                        role: .assistant,
                        content: "Fake LLM response to: \(message.content)",
                        status: .completed
                    )
                    vmRef?.appendMessage(response)
                }
            }
        )
        
        vmRef = vm

        let lightAppearance = ChatAppearance(
            background: Color(.systemGroupedBackground),
            font: .callout,
            contentPadding: 14,
            userBubbleBackground: Color(red: 255/255, green: 204/255, blue: 0/255).opacity(0.25), // Vueling yellow
            assistantBubbleBackground: Color.gray.opacity(0.12),
            userForeground: .black,
            assistantForeground: .primary,
            cornerRadius: 18
        )

        let darkAppearance = ChatAppearance(
            background: Color(.black),
            font: .callout,
            contentPadding: 14,
            userBubbleBackground: Color(red: 255/255, green: 204/255, blue: 0/255).opacity(0.35),
            assistantBubbleBackground: Color.white.opacity(0.12),
            userForeground: .black,
            assistantForeground: .white,
            cornerRadius: 18
        )

        brandAppearance = ChatAppearancePair(
            light: lightAppearance,
            dark: darkAppearance
        )

        _viewModel = StateObject(wrappedValue: vm)
    }

    var body: some View {
        ChatView(
            viewModel: viewModel,
            appearance: brandAppearance,
            layout: .compact,
            behavior: .default
        )
    }
}
```

El `ChatViewModel` notifica cuando el usuario envía un mensaje.  
El cliente llama a OpenAI y, cuando llega la respuesta, la inyecta como un mensaje con rol `.assistant`.

ChatKit no sabe:
- que OpenAI existe  
- que hay una API key  
- que hay una request en curso  

Solo renderiza lo que recibe.

Aquí el objetivo es otro: demostrar que el diseño funciona cuando deja de ser teórico.

Y funciona.

---

## Conclusión

ChatKit no intenta ser un “chat inteligente”.  
Intenta ser una **UI predecible** en un ecosistema lleno de suposiciones implícitas.

Separar la UI del backend no es una optimización prematura.  
Es una decisión estructural.

Y, en proyectos reales, suele marcar la diferencia.

---

🚧 **Status**

Este proyecto está en desarrollo activo.  
La API pública no se considera estable antes de la versión 1.0.

- [Repositorio Github Package ChatKit ](https://medium.com/@eu.barquin/how-to-run-ai-models-locally-on-ios-with-core-ml-part-1-f69bd82de69c)
