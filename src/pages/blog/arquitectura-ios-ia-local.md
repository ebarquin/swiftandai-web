---
layout: ../../layouts/PostLayout.astro
title: "Por qué la IA local cambia las decisiones de arquitectura en iOS"
date: "2025-12-22"
description: "Ejecutar modelos en local no es una optimización, sino una decisión arquitectónica en aplicaciones iOS."
image: /images/posts/ia-local.png
imageAlt: Ilustración conceptual sobre inferencia local y arquitectura en iOS
---

Cuando hablamos de integrar inteligencia artificial en una app iOS, casi siempre empezamos por el modelo.

¿Es suficientemente preciso?  
¿Es rápido?  
¿Escala bien?

Son preguntas razonables. Pero hay una decisión previa que suele quedar en segundo plano y que, en la práctica, condiciona mucho más de lo que parece:

**¿Dónde va a ejecutarse ese modelo?**

En iOS, esa elección no es un detalle técnico ni una optimización tardía. Es una **decisión de arquitectura** que afecta al diseño del sistema, a la experiencia de usuario y al grado de control que el desarrollador tiene sobre su aplicación.

---

## IA como feature… o como parte del sistema

Cuando un modelo vive en la nube, la IA se trata como una feature externa. Algo a lo que se llama cuando hace falta y que responde —con suerte— en un tiempo razonable.

Funciona mientras hay red.  
Mientras el backend responde.  
Mientras la latencia no rompe la experiencia.

El problema es que la aplicación queda atada a variables que no controla del todo y que rara vez se modelan bien durante el diseño inicial.

Cuando el modelo se ejecuta en local, el enfoque cambia por completo.

La IA deja de ser un servicio remoto y pasa a formar parte del sistema. Algo que se diseña desde el principio, que responde de forma inmediata y cuyo comportamiento es predecible. No depende del estado de la red ni de la carga de un servidor externo.

Ese cambio altera la manera en la que se conciben flujos, estados y responsabilidades dentro de la aplicación.

---

## Latencia, privacidad y control

La ventaja más evidente de la IA local es la latencia. Ejecutar inferencias en el propio dispositivo elimina viajes innecesarios a la red y permite respuestas prácticamente instantáneas.

Pero no es solo una cuestión de velocidad.

También hay privacidad. Los datos del usuario no abandonan el dispositivo. No hay necesidad de enviar información sensible a terceros ni de justificar cada petición a un backend.

Y, sobre todo, hay **control**.

El desarrollador decide cuándo se ejecuta el modelo, cómo se gestiona su ciclo de vida y cómo se integra con el resto de la aplicación. No hay contratos implícitos con servicios externos ni dependencias invisibles.

---

## Apple y la IA local: llegar tarde, integrar mejor

Durante años se ha criticado a Apple por su aparente lentitud a la hora de adoptar inteligencia artificial frente a otros actores del sector. En muchos casos, la crítica es comprensible.

Pero Apple rara vez compite por ser la primera. Compite por **integrar**.

Frameworks como Core ML, Vision o Create ML no están pensados como capas añadidas a posteriori, sino como piezas que encajan directamente en el sistema operativo, el hardware y las herramientas de desarrollo.

La apuesta por la IA local encaja con esa filosofía: aprovechar al máximo el dispositivo, reducir dependencias externas y ofrecer una base sólida sobre la que construir productos fiables a largo plazo.

No es una estrategia perfecta ni exenta de errores. Pero explica por qué, cuando Apple adopta una tecnología, no suele hacerlo como un parche, sino como parte estructural del sistema.

Este artículo conecta directamente con una serie más técnica que publiqué previamente en **Medium**, donde entro en el *cómo*: desde la integración real de modelos en local hasta las decisiones prácticas alrededor de Core ML, Vision y el pipeline completo en iOS.  
Aquí me centro en el *por qué* arquitectónico; allí, en la implementación concreta. Ambas piezas forman parte del mismo razonamiento.

---

## Diseñar alrededor de la IA

Quizá la pregunta no sea qué modelo usar.

Quizá la pregunta real sea esta:

**¿Estamos diseñando la aplicación alrededor de la IA… o simplemente conectándonos a ella?**

En iOS, ejecutar modelos en local no es solo una mejora de rendimiento. Es una forma distinta de pensar la arquitectura, las responsabilidades del sistema y la experiencia final del usuario.

Pero también es una decisión compleja.

Hoy, llevar modelos —y especialmente LLMs— al dispositivo sigue siendo difícil. El tooling aún está madurando, los límites de hardware son reales y muchas aproximaciones fallan antes de funcionar.

Aun así, empezar a plantear estas preguntas desde el diseño inicial cambia la conversación. Obliga a pensar qué partes del sistema queremos controlar, qué dependencias asumimos y hasta dónde estamos dispuestos a empujar el dispositivo.

No siempre será viable.  
No siempre será la mejor opción.

Pero, cada vez más, es una decisión que merece considerarse desde el primer boceto.

---

## Referencias y lecturas relacionadas

- [How to Run AI Models Locally on iOS with Core ML (Part 1)](https://medium.com/@eu.barquin/how-to-run-ai-models-locally-on-ios-with-core-ml-part-1-f69bd82de69c)  
  Artículo técnico en inglés donde desarrollo la implementación práctica de modelos en local con Core ML, Vision y arquitectura iOS.