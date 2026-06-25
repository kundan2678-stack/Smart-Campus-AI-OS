# Smart Campus AI OS - API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
All requests (except login/register) require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "student@university.edu",
  "password": "secure_password",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student"
}
```

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "student@university.edu",
  "password": "secure_password"
}
```

---

## Student Endpoints

### Get Student Dashboard
```
GET /students/{studentId}/dashboard
```

### Get Student Attendance
```
GET /students/{studentId}/attendance
```

### Get Student Grades
```
GET /students/{studentId}/grades
```

### Get AI Progress Tracker
```
GET /students/{studentId}/progress
```

---

## AI Agent Endpoints

### AI Chat
```
POST /ai/chat
```

**Request Body:**
```json
{
  "message": "I want to improve my placement readiness",
  "agentType": "placement_mentor"
}
```

### Generate Study Plan
```
POST /ai/study-plan
```

### Analyze Resume
```
POST /ai/analyze-resume
```

### Get Placement Insights
```
GET /ai/placement-insights/{studentId}
```

---

## Faculty Endpoints

### Get Live Attendance
```
GET /faculty/{facultyId}/attendance-live
```

### Upload & Process Assignment
```
POST /faculty/{facultyId}/assignments
```

---

## Admin Endpoints

### Get Admin Dashboard
```
GET /admin/dashboard
```

### Analytics & Reports
```
GET /admin/analytics
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "details": [ { "field": "email", "message": "Invalid email format" } ]
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You do not have permission to access this resource"
}
```

---

**Last Updated**: June 2024