from django.apps import AppConfig


class TaskConfig(AppConfig):
    name = "apps.task"

    def ready(self):
        return super().ready()
