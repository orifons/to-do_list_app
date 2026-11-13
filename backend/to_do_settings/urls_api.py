from rest_framework.routers import DefaultRouter

from apps.main.api.endpoints import UserViewSet
from apps.task.api.endpoints import TaskItemViewSet

router = DefaultRouter()
router.register(r"accounts/me", UserViewSet, basename="user")
router.register(r"tasks", TaskItemViewSet, basename="taskitem")
