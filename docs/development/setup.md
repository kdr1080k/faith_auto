# FlexCar Development Setup Guide

## Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Docker (optional)

## Backend Setup

### 1. Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install development dependencies
pip install -r requirements-dev.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
# Django
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=flexcar
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432

# Redis
REDIS_URL=redis://localhost:6379/0

# AWS
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=flexcar-media

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### 4. Database Setup

```bash
# Create database
createdb flexcar

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 5. Run Development Server

```bash
# Run Django development server
python manage.py runserver
```

## Frontend Setup

### 1. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Install development dependencies
npm install --save-dev
```

### 2. Configure Environment Variables

Create a `.env` file in the frontend directory:

```env
# API
REACT_APP_API_URL=http://localhost:8000/api/v1
REACT_APP_WS_URL=ws://localhost:8000/ws

# Authentication
REACT_APP_AUTH_TOKEN_KEY=flexcar_auth_token
REACT_APP_AUTH_REFRESH_TOKEN_KEY=flexcar_refresh_token

# Google Maps
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Analytics
REACT_APP_GA_TRACKING_ID=your-ga-tracking-id
```

### 3. Run Development Server

```bash
# Run React development server
npm start
```

## Docker Setup (Optional)

### 1. Build and Run Containers

```bash
# Build containers
docker-compose build

# Run containers
docker-compose up -d
```

### 2. Access Services

- Backend API: http://localhost:8000
- Frontend: http://localhost:3000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## Development Tools

### Code Quality

```bash
# Backend
# Run linting
flake8
# Run type checking
mypy .
# Run tests
pytest

# Frontend
# Run linting
npm run lint
# Run type checking
npm run type-check
# Run tests
npm test
```

### Git Hooks

```bash
# Install pre-commit hooks
pre-commit install

# Run pre-commit hooks manually
pre-commit run --all-files
```

### Database Management

```bash
# Create new migration
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Reset database
python manage.py reset_db
```

### Testing

```bash
# Run backend tests
pytest

# Run frontend tests
npm test

# Run end-to-end tests
npm run cypress:open
```

## Common Issues and Solutions

### 1. Database Connection Issues

```bash
# Check PostgreSQL service
sudo service postgresql status

# Reset PostgreSQL password
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'new-password';
```

### 2. Redis Connection Issues

```bash
# Check Redis service
sudo service redis-server status

# Test Redis connection
redis-cli ping
```

### 3. Node.js Version Issues

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install correct Node.js version
nvm install 18
nvm use 18
```

### 4. Python Version Issues

```bash
# Install pyenv
curl https://pyenv.run | bash

# Install correct Python version
pyenv install 3.10.0
pyenv global 3.10.0
```

## Development Workflow

1. Create a new branch
```bash
git checkout -b feature/your-feature-name
```

2. Make changes and commit
```bash
git add .
git commit -m "feat: your feature description"
```

3. Push changes
```bash
git push origin feature/your-feature-name
```

4. Create pull request
- Go to GitHub repository
- Click "New Pull Request"
- Select your branch
- Fill in PR description
- Request review

## Deployment

### Staging

```bash
# Deploy to staging
git push origin main:staging
```

### Production

```bash
# Deploy to production
git push origin main:production
```

## Monitoring

- Backend logs: `logs/backend.log`
- Frontend logs: `logs/frontend.log`
- Error tracking: Sentry
- Performance monitoring: New Relic

## Support

For technical support:
- Email: tech-support@flexcar.com
- Slack: #tech-support
- Documentation: https://docs.flexcar.com 