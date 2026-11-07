from django.contrib import admin
from django.utils.html import format_html
from apps.main.admin import TimestampedModelAdmin

from apps.user_profile.models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(TimestampedModelAdmin):
    list_display = ("user", "get_image")

    search_fields = ("user__username",)
    ordering = ("user__username", "user__is_active")

    def get_image(self, obj):
        if obj.image:
            return format_html(
                '<a href="{}" target="_blank" nofollow>{}<a/>', obj.image.url, obj.image
            )
        return None

    get_image.short_description = "Image Link"
