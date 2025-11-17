from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import UploadedFile
from .serializers import UploadedFileSerializer, AnalyzeQuerySerializer
from .analyzer import RealEstateAnalyzer
import os


class UploadFileView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request):
        file_serializer = UploadedFileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnalyzeQueryView(APIView):
    def post(self, request):
        serializer = AnalyzeQuerySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        query = serializer.validated_data['query']
        file_id = serializer.validated_data.get('file_id')
        
        # Get the file path
        if file_id:
            try:
                uploaded_file = UploadedFile.objects.get(id=file_id)
                file_path = uploaded_file.file.path
            except UploadedFile.DoesNotExist:
                return Response(
                    {'error': 'File not found'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            # Use default sample file if exists
            default_path = os.path.join(os.path.dirname(__file__), 'sample_data.xlsx')
            if os.path.exists(default_path):
                file_path = default_path
            else:
                return Response(
                    {'error': 'No file provided and no default file found'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Analyze the query
        analyzer = RealEstateAnalyzer(file_path)
        result = analyzer.analyze(query)
        
        return Response(result, status=status.HTTP_200_OK)
