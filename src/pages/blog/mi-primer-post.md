---
layout: ../../layouts/Layout.astro
title: "IA Local: El fin de la latencia en Swift"
date: "2025-01-01"
description: "Por qué ejecutar modelos en el dispositivo es el futuro del desarrollo nativo."
---

# El cambio de paradigma

Como desarrolladores de **Swift**, estamos acostumbrados a la eficiencia. Sin embargo, la mayoría de las integraciones de IA actuales dependen de una API en la nube. 

## ¿Por qué local?

1. **Privacidad absoluta:** Los datos del usuario no viajan.
2. **Coste cero:** No pagas por tokens de terceros.
3. **Sin red:** Funciona en un avión o en un sótano.

### Ejemplo de concepto en Swift
Para cargar un modelo en Core ML, simplemente inicializamos:

```swift
let model = try MyLocalModel(configuration: .init())