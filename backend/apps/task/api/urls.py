from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.task.api.endpoints import TaskItemViewSet

router = DefaultRouter()
router.register(r"tasks", TaskItemViewSet, basename="taskitem")

urlpatterns = [
    path("", include(router.urls)),
]
