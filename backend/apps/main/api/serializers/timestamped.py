from rest_framework import serializers


class TimeStampedModelSerializer(serializers.ModelSerializer):

    def get_fields(self):
        fields = super().get_fields()
        new_fields = {
            "created_at": serializers.DateTimeField(read_only=True),
            "updated_at": serializers.DateTimeField(read_only=True),
        }
        fields.update(new_fields)

        return fields
