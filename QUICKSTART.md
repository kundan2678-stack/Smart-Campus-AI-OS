# Smart Campus AI OS - Quick Start Guide

## 🚀 Getting Started

This guide will help you set up and run the complete Smart Campus AI OS system.

### Prerequisites

- **Node.js** v18+
- **Python** v3.9+
- **Docker** and **Docker Compose**
- **Git**

### Option 1: Quick Start with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/kundan2678-stack/smart-campus-ai-os.git
cd smart-campus-ai-os

# Copy environment file
cp backend/.env.example backend/.env
cp ai-services/.env.example ai-services/.env

# Start all services
docker-compose -f docker-compose.full.yml up -d

# Check status
docker-compose -f docker-compose.full.yml ps
```

### Option 2: Manual Setup

#### 1. Backend Services

```bash
cd backend

# Install dependencies
npm install

# Copy environment
cp .env.example .env

# Start development server
npm run dev

# API Gateway runs on http://localhost:3000
```

#### 2. Frontend Application

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend runs on http://localhost:3001
```

#### 3. AI Services

```bash
cd ai-services

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment
cp .env.example .env

# Start AI service
python main.py

# AI Service runs on http://localhost:8000
```

#### 4. Databases

Start Docker containers for databases:

```bash
docker-compose up postgres mongodb redis rabbitmq elasticsearch
```

---

## 🔐 Default Credentials

### Database
- **PostgreSQL**: `campus_user` / `campus_password`
- **MongoDB**: `campus_user` / `campus_password`
- **RabbitMQ Management**: `guest` / `guest`

### Test Accounts

Register new accounts at http://localhost:3001/register

Or use these test logins after registration:
```
Student: student@university.edu / password
Faculty: faculty@university.edu / password
Admin: admin@university.edu / password
```

---

## 📊 Access Points

| Service | URL | Purpose |
|---------|-----|----------|
| Frontend | http://localhost:3001 | Web Application |
| Backend API | http://localhost:3000 | REST API |
| AI Services | http://localhost:8000 | AI Endpoints |
| RabbitMQ | http://localhost:15672 | Message Queue Management |
| Postgres | localhost:5432 | Database |
| MongoDB | localhost:27017 | Document Database |
| Redis | localhost:6379 | Cache |

---

## 🎯 First Steps After Setup

1. **Register a test account** at http://localhost:3001/register
2. **Choose a role** (student, faculty, or admin)
3. **View your dashboard** based on role
4. **Try AI features** in the AI Mentor section
5. **Explore data** in the appropriate dashboards

---

## 🔧 API Examples

### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@university.edu",
    "password": "password"
  }'
```

### Get Student Dashboard
```bash
curl -X GET http://localhost:3000/api/v1/students/user_123/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### AI Chat
```bash
curl -X POST http://localhost:3000/api/v1/ai/chat \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How can I improve my placement readiness?",
    "agentType": "placement_mentor"
  }'
```

---

## 📝 Environment Variables

Create `.env` files in backend and ai-services directories:

**backend/.env:**
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://campus_user:campus_password@localhost:5432/smart_campus
JWT_SECRET=your-super-secret-jwt-key
AI_SERVICE_URL=http://localhost:8000
```

**ai-services/.env:**
```
OPENAI_API_KEY=sk-your-key-here
DATABASE_URL=postgresql://campus_user:campus_password@localhost:5432/smart_campus
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Database Connection Failed
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View logs
docker-compose logs postgres
```

### AI Service Not Responding
```bash
# Check if service is running
curl http://localhost:8000/health

# View logs
python ai-services/main.py
```

---

## 📚 Project Structure

```
smart-campus-ai-os/
├── backend/          # Node.js API services
├── frontend/         # React web application
├── ai-services/      # Python FastAPI services
├── docs/             # Documentation
└── docker-compose.full.yml
```

---

## 🚀 Deployment

For production deployment:

1. Set environment variables
2. Update JWT_SECRET and API keys
3. Configure database credentials
4. Use production-grade database (AWS RDS, Azure Database)
5. Deploy with Kubernetes or Docker Swarm
6. Set up CI/CD pipeline

---

## 📖 Documentation

- [API Documentation](./docs/API_DOCS.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [AI Agents Specification](./docs/AI_AGENTS.md)

---

## 💬 Support

For issues or questions:
- Check [existing issues](https://github.com/kundan2678-stack/smart-campus-ai-os/issues)
- Create a new issue with details
- Contact: support@smartcampus.ai

---

**Happy coding! 🎉**