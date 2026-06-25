from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
from typing import Optional, List
import os

app = FastAPI(
    title="Smart Campus AI OS - AI Services",
    description="AI services for placement, academics, and student success",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Models
class ChatRequest(BaseModel):
    message: str
    agentType: str
    userId: str

class StudyPlanRequest(BaseModel):
    courseId: str
    examDate: str
    hoursPerDay: int = 3
    learningStyle: str = "visual"
    userId: str

class ResumeAnalysisRequest(BaseModel):
    resumeText: str
    userId: str

class PredictionRequest(BaseModel):
    predictionType: str
    studentId: str
    parameters: Optional[dict] = None

class ChatResponse(BaseModel):
    agentResponse: str
    suggestedActions: List[dict] = []
    followUp: str = ""

# Endpoints
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "OK", "service": "AI Services"}

@app.post("/chat", response_model=ChatResponse)
async def ai_chat(request: ChatRequest):
    """
    AI Chat endpoint - Routes to specialized agents
    """
    logger.info(f"Chat request from user {request.userId} with agent {request.agentType}")
    
    try:
        # Mock response based on agent type
        agent_responses = {
            "academic_advisor": "Based on your profile, I recommend taking courses that align with your career goals. Your current GPA of 3.7 is excellent!",
            "placement_mentor": "Your placement readiness is at 72%. Let's focus on improving your coding skills and resume.",
            "study_planner": "I've created a personalized study plan. You should allocate 3 hours daily for DSA and 2 hours for theory.",
            "dsa_mentor": "For this problem, start with a brute force approach, then optimize using dynamic programming.",
            "wellness": "I notice you might be stressed. Let's work on stress management techniques and wellness practices.",
        }
        
        response_text = agent_responses.get(
            request.agentType, 
            "I'm here to help. What would you like assistance with?"
        )
        
        return ChatResponse(
            agentResponse=response_text,
            suggestedActions=[
                {"action": "View detailed insights", "priority": "high"},
                {"action": "Schedule mentoring session", "priority": "medium"},
            ],
            followUp="Would you like me to provide more specific guidance?"
        )
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        raise HTTPException(status_code=500, detail="Chat processing failed")

@app.post("/study-plan")
async def generate_study_plan(request: StudyPlanRequest):
    """
    Generate personalized study plan
    """
    logger.info(f"Study plan requested for course {request.courseId}")
    
    return {
        "studyPlan": [
            {
                "day": 1,
                "date": "2024-06-26",
                "topics": ["Arrays", "Linked Lists"],
                "duration": "3 hours",
                "resources": ["Video lecture", "Practice problems"]
            },
            {
                "day": 2,
                "date": "2024-06-27",
                "topics": ["Stacks", "Queues"],
                "duration": "3 hours",
                "resources": ["Video lecture", "Coding exercises"]
            },
        ],
        "totalHours": 45,
        "expectedScore": 85
    }

@app.post("/analyze-resume")
async def analyze_resume(request: ResumeAnalysisRequest):
    """
    Analyze and score resume
    """
    logger.info(f"Resume analysis for user {request.userId}")
    
    return {
        "score": 72,
        "atsScore": 68,
        "issues": [
            {
                "issue": "Missing quantifiable achievements",
                "severity": "high",
                "suggestion": "Replace 'Led project' with 'Led team of 5, delivered 30% faster'"
            },
            {
                "issue": "Limited technical skills section",
                "severity": "medium",
                "suggestion": "Add Python, Java, and C++ to your skills"
            }
        ],
        "strengths": ["Good technical skills", "Clear formatting"],
        "improvementSuggestions": [
            "Add more quantifiable metrics",
            "Include industry keywords",
            "Restructure to impact-first format"
        ]
    }

@app.get("/placement-insights/{student_id}")
async def get_placement_insights(student_id: str):
    """
    Get placement insights for a student
    """
    logger.info(f"Placement insights for student {student_id}")
    
    return {
        "placementReadiness": 72,
        "gapAnalysis": {
            "coding": {"score": 70, "gap": 30, "topics": ["DP", "Graphs"]},
            "systemDesign": {"score": 60, "gap": 40},
            "behavioral": {"score": 75, "gap": 25}
        },
        "topCompanies": [
            {"name": "Google", "match": 72, "requiredSkills": ["DSA", "System Design"]},
            {"name": "Microsoft", "match": 75, "requiredSkills": ["DSA", "OOP"]}
        ],
        "recommendedCompanies": [
            {"name": "Flipkart", "match": 88, "reason": "Strong match with current skills"}
        ],
        "predictedSalary": {"min": 8, "max": 12, "currency": "LPA"},
        "nextSteps": [
            "Improve coding skills",
            "Update resume",
            "Practice mock interviews"
        ]
    }

@app.post("/predict")
async def make_prediction(request: PredictionRequest):
    """
    Make AI predictions
    """
    logger.info(f"Prediction: {request.predictionType} for student {request.studentId}")
    
    predictions = {
        "dropout_risk": {
            "riskLevel": "low",
            "probability": 0.15,
            "factors": ["Attendance: 88%", "GPA: 3.7", "Engagement: High"],
            "recommendations": ["Continue current performance", "Maintain engagement"]
        },
        "placement_probability": {
            "probability": 0.88,
            "confidence": 0.92,
            "expectedSalary": 9.5,
            "timeline": "2-3 months",
            "topMatches": ["Flipkart", "Amazon", "Microsoft"]
        },
        "gpa_prediction": {
            "predictedGPA": 3.8,
            "confidence": 0.85,
            "factors": ["Study hours: Optimal", "Attendance: Excellent"],
            "recommendations": ["Focus on weak areas", "Maintain consistency"]
        },
        "salary_prediction": {
            "expectedSalary": 10.2,
            "range": {"min": 8, "max": 15},
            "currency": "LPA",
            "factors": ["Skills match", "Experience", "Location preference"]
        }
    }
    
    return predictions.get(request.predictionType, {"error": "Unknown prediction type"})

@app.post("/attendance-analysis")
async def analyze_attendance(student_id: str):
    """
    Analyze student attendance and predict trends
    """
    logger.info(f"Attendance analysis for student {student_id}")
    
    return {
        "currentAttendance": 88.5,
        "trend": "stable",
        "riskLevel": "low",
        "predictions": [
            {"week": "Week 1", "predictedAttendance": 87.5},
            {"week": "Week 2", "predictedAttendance": 88.0},
            {"week": "Week 3", "predictedAttendance": 88.5},
        ],
        "alerts": [],
        "recommendations": ["Maintain current attendance pattern"]
    }

@app.post("/academic-performance")
async def analyze_academic_performance(student_id: str):
    """
    Analyze academic performance and provide insights
    """
    logger.info(f"Academic performance analysis for student {student_id}")
    
    return {
        "currentGPA": 3.7,
        "trend": "improving",
        "strongSubjects": ["Data Structures", "Algorithms", "Database"],
        "weakSubjects": ["Operating Systems"],
        "recommendations": [
            "Focus on OS concepts",
            "Continue excelling in core subjects",
            "Consider advanced electives"
        ],
        "nextExamPrediction": {
            "predictedScore": 89,
            "confidence": 0.87
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)