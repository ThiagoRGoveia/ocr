# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container to /app
WORKDIR /app

# Add the files to directory
COPY . .

# Install Tesseract and its dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
RUN apt-get install poppler-utils -y

# Install Jupyter and any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8888 available for Jupyter
EXPOSE 8888

# Define environment variable (optional if set in docker-compose)
ENV NAME World

# Run Jupyter notebook on container start, listen on all IPs and disable token for simplicity
# CMD ["jupyter", "notebook", "--ip=0.0.0.0", "--allow-root", "--NotebookApp.token=''"]
# Removed the CMD as it's overridden in docker-compose.yml
