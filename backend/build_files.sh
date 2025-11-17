#!/bin/bash

# Install dependencies
pip install -r requirements.txt

# Create necessary directories
mkdir -p staticfiles_build/static

# Collect static files
python manage.py collectstatic --noinput --clear || echo "Static files collection skipped"
