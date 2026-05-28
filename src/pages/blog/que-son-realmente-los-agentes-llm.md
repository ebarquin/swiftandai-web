---
layout: ../../layouts/PostLayout.astro
title: "Qué son realmente los agentes LLM"
date: "2026-05-27"
description: "Todo el mundo llama agente a un chatbot con un system prompt. La diferencia real está en si el sistema decide y actúa, o solo responde."
image: /images/posts/agentes-llm.png
imageAlt: Diagrama de un agente LLM con tools y memoria
tags: ["IA", "Agentes LLM", "Python"]
---

Houston, tenemos un problema. Y es que la industria ha empezado a llamar "agente" a cualquier cosa que tenga un prompt largo, memoria de conversación y una respuesta más o menos convincente. Pero eso no convierte un chatbot en un agente.

Un chatbot responde texto. Un agente toma decisiones, ejecuta acciones y modifica el estado del mundo a través de herramientas.

Esa diferencia parece semántica… hasta que entiendes cómo funciona realmente por dentro. Porque el salto entre ambos no está en el prompt. Está en la capacidad de razonar sobre acciones, elegir qué hacer y operar sobre sistemas externos.

Y en el momento en que entiendes ese bucle, dejas de ver los LLMs como simples generadores de texto y empiezas a verlos como motores de orquestación.

---

## El cerebro del agente no sabe hacer nada

La parte divertida es que el LLM realmente no sabe hacer absolutamente nada. No puede consultar el tiempo, ni enviar un email, ni ejecutar una función Python. Todo eso es humo… hasta que alguien le da herramientas.

En el fondo, el modelo solo está haciendo una cosa: generar el siguiente token más probable basándose en todo el contexto anterior. Nada más.

Pero cuando haces eso a escala absurda, con miles de millones de parámetros y una cantidad gigantesca de información aprendida, empiezan a emerger comportamientos que desde fuera parecen razonamiento real.

Y ahí es donde ocurre la magia de los agentes. Porque ese texto que genera el modelo ya no es solo una respuesta para el usuario: puede convertirse en una instrucción de acción.

Básicamente, el LLM es ese jefe intensito que nunca toca producción pero va diciendo constantemente qué debería hacerse. Y las tools son los empleados que realmente curran: hacen requests, ejecutan código, consultan bases de datos o llaman APIs.

**El modelo decide. Las tools se manchan las manos.**

---

## Las tools — donde ocurre la acción real

Las tools son el momento en el que el agente deja de "hablar bonito" y empieza a hacer cosas. Y lo mejor es que una tool no tiene nada de místico: es simplemente una función Python normal.

`get_current_time` devuelve la hora, `get_weather` consulta el tiempo de una ciudad y `calculate` evalúa una operación matemática.

```python
def get_current_time(timezone: str) -> str:
    now = datetime.now()
    return f"Son las {now.strftime('%H:%M:%S')}"

def get_weather(city: str) -> str:
    mock_data = {
        "bilbao": "18°C, nublado con posibilidad de lluvia",
        "madrid": "26°C, soleado",
    }
    return mock_data.get(city.lower(), f"No tengo datos para {city}")
```

Pero aquí viene la parte importante: el LLM nunca ve el código de verdad. No inspecciona Python, no entiende tu lógica interna y desde luego no ejecuta funciones mágicamente. Lo único que recibe es una descripción estructurada de las herramientas disponibles:

```json
{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Obtiene el tiempo meteorológico de una ciudad",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string"}
            },
            "required": ["city"]
        }
    }
}
```

Y con solo eso, el modelo decide si debe usarla o no.

Básicamente, el LLM funciona como alguien extremadamente inteligente… pero encerrado en una habitación sin acceso a nada. Las tools son las manos que le permiten interactuar con el mundo exterior.

Porque el modelo no sabe mirar por la ventana para comprobar si llueve en Bilbao. Pero sí puede decir: "llama a `get_weather(city='Bilbao')` y tráeme el resultado". Y ese pequeño detalle cambia completamente la arquitectura del sistema.

---

## El bucle que lo hace inteligente

La pieza que convierte todo esto en un agente de verdad es el bucle. Porque un agente no funciona con una única llamada al modelo, sino con un ciclo continuo de decisión y ejecución.

El flujo real es algo así: el usuario hace una petición, el LLM analiza el contexto, decide si necesita una tool, genera la llamada, el sistema ejecuta la función y el resultado vuelve otra vez al modelo para que pueda seguir razonando sobre él.

Y eso cambia completamente el comportamiento del sistema. Un chatbot tradicional solo genera una respuesta directa. Un agente puede encadenar acciones, usar información externa y adaptar su respuesta en función de lo que acaba de ocurrir.

En tu código, ese momento ocurre exactamente aquí:

```python
for tool_call in message.tool_calls:
    func_name = tool_call.function.name
    func_args = json.loads(tool_call.function.arguments)
    result = tool_map[func_name](**func_args)
    self.messages.append({
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content": result
    })
```

Ese fragmento parece pequeño, pero es literalmente el corazón del agente. El modelo decide qué hacer, el sistema ejecuta la acción y luego el resultado vuelve al LLM para que siga pensando.

Y cuando entiendes ese patrón, empiezas a darte cuenta de que la mayoría de "agentes IA revolucionarios" que ves en redes sociales son, en realidad, simplemente un loop bien montado alrededor de un modelo de lenguaje.

Y esto es lo que sale por la terminal con logging real:

```
2026-05-27 11:55:00 [info] user_message        content='¿Qué tiempo hace aquí?'
2026-05-27 11:55:02 [info] tool_calls          tools=['get_weather']
2026-05-27 11:55:02 [info] tool_result         tool=get_weather result='18°C, nublado'
2026-05-27 11:55:03 [info] assistant_response  content='En Bilbao hace 18°C...'
```

No hay magia. Hay un bucle: contexto → decisión → acción → resultado → respuesta.

---

## Lo que nadie te cuenta sobre producción

Y aquí llega la parte que normalmente desaparece de los tutoriales de Twitter y las demos de "10 minutos". Porque un agente que funciona una vez en local no significa absolutamente nada en producción.

El momento en que conectas un agente al mundo real empiezan los problemas de verdad: memoria persistente, observabilidad, control de costes, rate limits, retries, trazabilidad, permisos, contexto, latencia y manejo de errores.

¿Qué ocurre si una tool falla? ¿Y si el modelo llama diez veces seguidas a la misma función? ¿Y si una respuesta rompe el estado de la conversación? ¿Cómo debuggeas una decisión tomada por un LLM hace 40 mensajes?

Lo que has construido aquí no es "el agente definitivo". Es el núcleo arquitectónico sobre el que se construyen sistemas reales.

Y eso es precisamente lo interesante: la parte difícil ya no es conseguir que el modelo responda. **La parte difícil es convertir ese razonamiento probabilístico en un sistema fiable, observable y mantenible cuando hay usuarios, dinero y producción de por medio.**

En el próximo artículo: cómo añadir memoria real, logging estructurado y los primeros guardrails para que el agente no se vuelva loco en producción.
