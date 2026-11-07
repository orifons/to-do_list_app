from typing import Any

from django.contrib import admin
from django.db.models.query import QuerySet
from django.http import HttpRequest
from django.utils.translation import gettext_lazy as _


class TimestampedModelAdmin(admin.ModelAdmin):
    readonly_fields = ("create_date", "update_date")

    def get_list_display(self, request):
        if request.user.is_superuser:
            return [*self.list_display, "create_date", "update_date"]
        return self.list_display

    def get_queryset(self, request: HttpRequest) -> QuerySet:
        return super().get_queryset(request)

    def get_fieldsets(self, request: HttpRequest, obj: Any | None = ...):
        return super().get_fieldsets(request, obj)
