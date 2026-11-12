from typing import Any

from django.contrib import admin
from django.db.models.query import QuerySet
from django.http import HttpRequest
from django.utils.translation import gettext_lazy as _


class TimestampedModelAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")

    def get_list_display(self, request):
        if request.user.is_superuser:
            return [*self.list_display, "created_at", "updated_at"]
        return self.list_display

    def get_queryset(self, request: HttpRequest) -> QuerySet:
        return super().get_queryset(request)

    def get_fieldsets(self, request: HttpRequest, obj: Any | None = ...):
        # fieldsets = super().get_fieldsets(request, obj)
        # if request.user.is_superuser:
        #     fieldsets = [
        #         (None, {"fields": self.get_fields(request, obj)}),
        #         (_("Timestamps"), {"fields": ("created_at", "updated_at")}),
        #     ]
        # return fieldsets
        return super().get_fieldsets(request, obj)
