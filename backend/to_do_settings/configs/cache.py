import os

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": os.getenv(
            "REDIS_URL", "redis://:tu_contraseña_segura@localhost:6379/1"
        ),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            # Opcional: desconectar o manejar errores de conexión limpiamente si Redis cae
            "IGNORE_EXCEPTIONS": True,
        },
    }
}

## Consejo para Docker:
# Si tu backend de Django corre en otro contenedor dentro de la misma red de Docker que Redis,
# el host 'localhost' debe reemplazarse por el nombre del servicio de Redis.
# (por ejemplo, redis://:tu_contraseña_segura@redis:6379/1).
