from django.contrib import admin

from apps.main.models import Profile
from apps.main.admin.timestamped_abstract import TimestampedModelAdmin


@admin.register(Profile)
class ProfileAdmin(TimestampedModelAdmin):
    pass
