---
layout: ../../layouts/PostLayout.astro
title: "Diseñando flujos async seguros en SwiftUI"
date: "2026-02-16"
description: "La concurrencia en SwiftUI es potente, pero sin una arquitectura clara de estado es fácil caer en race conditions y comportamientos inconsistentes."
image: /images/posts/swiftui-async-safe.png
imageAlt: "Ilustración de flujos asíncronos y arquitectura en SwiftUI"
tags: ["Swift", "SwiftUI", "Concurrencia"]
---

## La historia detrás de este proyecto

Este proyecto no nace porque `async/await` sea nuevo, complejo o difícil de usar.

Nace porque, en un momento dado, el proyecto dejó de sentirse fiable.

La pantalla en cuestión era completamente normal. Un listado de elementos. Nada especialmente complejo. Al entrar en la vista se cargaban datos. El usuario podía refrescar manualmente. De vez en cuando, la aplicación sincronizaba información en segundo plano. Todo ello de forma asíncrona, como es habitual hoy en día.

De manera aislada, cada operación tenía sentido. Cada función `async` era pequeña, legible y aparentemente correcta. No había `await` olvidados. No había APIs peligrosas. No había nada que señalara un error evidente.

Y sin embargo, con el tiempo, el comportamiento empezó a volverse inconsistente.

Actualizaciones de estado que llegaban tarde o fuera de orden. Indicadores de carga que parpadeaban o se quedaban bloqueados. Refrescos que sobrescribían datos más recientes. Nada de esto era fácil de reproducir. La aplicación rara vez crasheaba. La mayor parte del tiempo, “funcionaba”.

Y ese era precisamente el problema.

---

## De qué trata realmente este proyecto

Este proyecto no trata de aprender a escribir código asíncrono en SwiftUI.

Trata de lo que ocurre después, cuando ya sabes hacerlo.

La mayoría de ejemplos sobre concurrencia funcionan porque asumen un único flujo asíncrono activo a la vez. Las aplicaciones reales no funcionan así. En cuanto una pantalla empieza a reaccionar a múltiples fuentes de eventos —acciones del usuario, eventos del ciclo de vida, sincronizaciones en segundo plano— ya no tienes “una tarea asíncrona”. Tienes varias, potencialmente solapadas, todas afectando al mismo estado.

En ese punto, la pregunta deja de ser:

> ¿Esta función está bien escrita?

Y pasa a ser:

> ¿Quién tiene realmente permiso para decidir cuándo cambia el estado?

Este proyecto existe para responder a esa pregunta de forma explícita.

---

## El tipo de problemas que queremos eliminar

Los problemas que este proyecto intenta evitar son, por naturaleza, sutiles:

- No hay crashes  
- No hay warnings del compilador  
- No hay trazas claras que indiquen el origen del fallo  

Solo una pérdida progresiva de confianza en el comportamiento de la interfaz.

Estos problemas no aparecen por usar mal SwiftUI ni por no entender la concurrencia. Aparecen por suposiciones implícitas sobre el orden de ejecución, la propiedad del estado y la responsabilidad de cada capa.

Este proyecto plantea una alternativa.

---

## El patrón que parece correcto (y no lo es)

```swift
func refresh() async {
    let currentItems = state.items
    let updatedItems = await fetchItems()
    state.items = merge(currentItems, updatedItems)
}
```

Este patrón compila, se lee bien y suele funcionar… hasta que deja de hacerlo.

El problema no es la función. El problema es la suposición implícita: que nadie más va a tocar ese estado mientras la tarea está suspendida.

---

## La decisión central

En lugar de intentar coordinar múltiples tareas asíncronas desde la vista, el proyecto toma una decisión arquitectónica clara y deliberada:

> **El estado de una pantalla tiene un único dueño.**

La vista no coordina.  
La vista no serializa trabajo.  
La vista no muta estado.  

La vista solo expresa intención.

---

## La implementación canónica (caso realista)

### 1. Definir el estado

```swift
struct FeedState {
    var items: [FeedItem] = []
    var isLoading: Bool = false
    var isRefreshing: Bool = false
    var lastSync: Date?
    var error: Error?
}
```

---

### 2. El dueño del estado

```swift
@MainActor
final class FeedStore: ObservableObject {
    @Published private(set) var state = FeedState()
}
```

---

### 3. Procesos asíncronos reales

```swift
extension FeedStore {

    func loadInitial() async {
        beginLoading()
        let result = await fetchItems()
        apply(result)
    }

    func refresh() async {
        beginRefreshing()
        let result = await fetchItems()
        apply(result)
    }

    func syncInBackground() async {
        let result = await fetchItems()
        apply(result)
    }
}
```

---

### 4. Mutaciones explícitas y centralizadas

```swift
extension FeedStore {

    private func beginLoading() {
        state.isLoading = true
        state.error = nil
    }

    private func beginRefreshing() {
        state.isRefreshing = true
        state.error = nil
    }

    private func apply(_ result: Result<[FeedItem], Error>) {
        switch result {
        case .success(let items):
            state.items = items
            state.lastSync = Date()
        case .failure(let error):
            state.error = error
        }

        state.isLoading = false
        state.isRefreshing = false
    }
}
```

---

### 5. La vista (aburrida a propósito)

```swift
struct FeedView: View {

    @StateObject private var store = FeedStore()

    var body: some View {
        List(store.state.items) { item in
            Text(item.title)
        }
        .overlay {
            if store.state.isLoading {
                ProgressView()
            }
        }
        .task {
            await store.loadInitial()
        }
        .refreshable {
            await store.refresh()
        }
    }
}
```

---

## Una idea para llevarte contigo

Si una pantalla puede verse afectada por más de un proceso asíncrono, entonces:

- el orden no puede ser implícito  
- el estado no puede ser optimista  
- la vista no puede ser quien coordine  

No se trata de escribir más código.  
Se trata de escribir código que no dependa de suposiciones frágiles.

Ese es el objetivo de esta arquitectura.

---

## Enlaces y notas finales

> **Repositorio completo:**  
> [https://github.com/ebarquin/SwiftUIAsyncState](https://github.com/ebarquin/SwiftUIAsyncState)
 

> 📖 **Lectura complementaria**  
> Este artículo se apoya en un razonamiento previo publicado en Medium:  
> **The Hidden Race Conditions in SwiftUI’s async/await (And How to Fix Them)**  
> *[https://medium.com/@eu.barquin/why-async-await-changes-swiftui-architecture-more-than-you-expect-9fbe086e6d6e](https://medium.com/@eu.barquin/why-async-await-changes-swiftui-architecture-more-than-you-expect-9fbe086e6d6e)*
