from rest_framework.routers import DefaultRouter
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

from apps.main.api.endpoints import UserViewSet, SignInView
from apps.task.api.endpoints import TaskItemViewSet

router = DefaultRouter()
router.register(r"accounts/me", UserViewSet, basename="user-me")
router.register(r"tasks", TaskItemViewSet, basename="taskitem")


urlpatterns = [
    path("", include(router.urls)),
    path("token/", SignInView.as_view(), name="signin"),
    # URLs for documentation (Swagger and ReDoc)
    path(
        "schema/", SpectacularAPIView.as_view(), name="schema"
    ),  # Genera el esquema YAML/JSON
    path(
        "docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),  # Interfaz Swagger UI
    path(
        "redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"
    ),  # Interfaz ReDoc
]
