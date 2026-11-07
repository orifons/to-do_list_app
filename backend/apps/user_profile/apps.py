from importlib import import_module

from django.apps import AppConfig


class UserProfileConfig(AppConfig):
    name = 'apps.user_profile'

    def ready(self):
        import_module(f"{self.name}.signals")
