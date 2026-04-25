FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy project files
COPY backend/ ./backend/
COPY content/ ./content/
COPY public/ ./public/

# Environment variables
ENV ASSISTANT_PROJECT_ROOT=/app
ENV PORT=8000

# Expose port
EXPOSE 8000

# Start command
CMD uvicorn backend.app.main:app --host 0.0.0.0 --port ${PORT}
