# To-Do List App

To-Do List App es una aplicación web pensada para ayudar a organizar las actividades del día a día. Su propósito es permitir que las personas registren las tareas que necesitan realizar, consulten lo que tienen pendiente y lleven un seguimiento de lo que ya completaron, facilitando la planificación y la productividad.

El proyecto utiliza React y TypeScript para la interfaz, y Django para el backend.

## Configuración del backend

La configuración predeterminada (`to_do_settings.settings`) utiliza los valores generales y está destinada a producción. Para iniciar el backend en desarrollo desde `backend/`, selecciona explícitamente su configuración:

```bash
DJANGO_SETTINGS_MODULE=to_do_settings.settings.development python manage.py runserver
```
