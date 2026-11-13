from rest_framework.routers import DefaultRouter
from django.urls import path, include
from apps.main.api.endpoints import UserViewSet, SignInView
from apps.task.api.endpoints import TaskItemViewSet

router = DefaultRouter()
router.register(r"accounts/me", UserViewSet, basename="user-me")
router.register(r"tasks", TaskItemViewSet, basename="taskitem")


urlpatterns = [
    path("", include(router.urls)),
    path("token/", SignInView.as_view(), name="signin"),
]
