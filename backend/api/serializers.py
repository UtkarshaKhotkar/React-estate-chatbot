from rest_framework import serializers
from .models import UploadedFile


class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['id', 'file', 'uploaded_at']


class AnalyzeQuerySerializer(serializers.Serializer):
    query = serializers.CharField(required=True)
    file_id = serializers.IntegerField(required=False, allow_null=True)
