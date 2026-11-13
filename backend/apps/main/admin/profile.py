from django.contrib import admin
from django.utils.html import format_html

from apps.main.models import Profile
from apps.main.admin.timestamped_abstract import TimestampedModelAdmin


@admin.register(Profile)
class ProfileAdmin(TimestampedModelAdmin):
    list_display = ("user", "get_image")

    def get_image(self, obj):
        if obj.image:
            return format_html(
                '<a href="{}" target="_blank">View Image</a>',
                obj.image.url,
            )
        return ""

    get_image.short_description = "Profile Image"  # type: ignore
    get_image.allow_tags = True  # type: ignore
