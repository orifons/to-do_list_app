from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.task.api.endpoints.task import TaskItemViewSet
from apps.profile.api.endpoints import UserProfileViewSet

router = DefaultRouter()
router.register(r"tasks", TaskItemViewSet, basename="taskitem")
router.register(r"profile", UserProfileViewSet, basename="userprofile")
