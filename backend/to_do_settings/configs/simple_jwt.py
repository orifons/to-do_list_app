from datetime import timedelta
from django.conf import settings

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": settings.SECRET_KEY,
}
