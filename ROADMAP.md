# otecnya-question@2

## Idea
Mejorar el recurso de la plataforma permitiendo que los usuarios puedan agregar un tag con mayor facilidad y así poder crear estadísticas con toda esta información recolectada.

## Cambios

- Agregar un campo de texto en la sesión con la nombre de la locación
- Agregar un campo de texto en la sesión con la nombre de la empresa
- Agregar campo de texto con el id del curso (Este sera dictado por el relator en curso)
- Sistema de para sincronizar de datos entre el cliente y un servidor central

### Mecanismo de para sincronizar datos

El service worker intentara actualizar los datos en todo momento, apoyado un un ente externo. Que sera el relator a cargo del curso

### new changes
- Control de Version
    + Interface que se conecta al store para actualiar la UI
        * Se conecta con el sw para manejar control el state local
- Sessión agregar nuevos campos
    + Modificar el esquema de la DB
    + Aplicar documento de migración
    + Campo de texto con autocompletado
    + mecanismo de aprendisaje para reusar los nombres a usados
    + Actualizar UI con nuevos campos de texto
    + Recordar seción anterior
    + Logout de la Sesión
- Actualizar pagina Registros
    + Agregar información al registro a mostrar en la UI
    + Agregar información al registro a mostrar en el SCV a exportar

