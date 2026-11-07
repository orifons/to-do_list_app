from django.conf import settings
from rest_framework import serializers


class TimeStampedModelSerializer(serializers.ModelSerializer):
    def get_fields(self):
        fields = super().get_fields()
        new_fields = {
            "create_date": serializers.DateTimeField(),
            "update_date": serializers.DateTimeField(),
        }
        new_fields.update(fields)
        return new_fields
