from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import token_refresh, token_verify
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

from apps.main.api.endpoints import (
    SignInView,
    WhoIAmViewSet,
    UserCreateViewSet,
    UserUpdateViewSet,
)
from apps.task.api.endpoints import TaskItemViewSet

router = DefaultRouter()
# Register the user-related viewsets with the router
router.register(r"accounts/me", WhoIAmViewSet, basename="user-me")
router.register(r"accounts/user/create", UserCreateViewSet, basename="user-create")
router.register(r"accounts/user/update", UserUpdateViewSet, basename="user-update")

# Register the TaskItemViewSet with the router
router.register(r"tasks", TaskItemViewSet, basename="taskitem")

urlpatterns = [
    path("", include(router.urls)),
    path("accounts/token/", SignInView.as_view(), name="user-signin"),
    path("accounts/token/refresh/", token_refresh, name="token_refresh"),
    path("accounts/token/verify/", token_verify, name="token_verify"),
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
