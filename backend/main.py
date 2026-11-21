from fastapi import FastAPI
from pydantic import BaseModel # type: ignore
from api.detection import router as detection_router

app = FastAPI()
app.include_router(detection_router)

@app.get("/")
def home() -> dict[str, str]:
    return {
        "message": "Food AI Backend is running"
    }
