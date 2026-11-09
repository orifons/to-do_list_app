from django.urls import include, path

urlpatterns = [
    path("", include("apps.user_profile.api.urls"), name="url_user_profile"),
    path("", include("apps.task.api.urls"), name="url_tasks"),
]
