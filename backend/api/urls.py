from django.urls import path
from .views import UploadFileView, AnalyzeQueryView

urlpatterns = [
    path('upload/', UploadFileView.as_view(), name='upload-file'),
    path('analyze/', AnalyzeQueryView.as_view(), name='analyze-query'),
]
