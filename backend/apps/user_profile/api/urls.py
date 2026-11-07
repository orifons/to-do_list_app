from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.user_profile.api.endpoints import UserProfileViewSets

router = DefaultRouter()
router.register(r"user-profile", UserProfileViewSets)

urlpatterns = [
    path("", include(router.urls)),
]
