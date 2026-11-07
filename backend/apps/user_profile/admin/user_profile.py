from django.contrib import admin
from django.utils.html import format_html

from apps.user_profile.models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "get_image")

    search_fields = ("user__username",)
    ordering = ("user__username", "user__is_active")

    def get_image(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height:50px; max-width:50px; border-radius:50%;" />',
                obj.image.url,
            )
        return None

    get_image.short_description = "Image"
