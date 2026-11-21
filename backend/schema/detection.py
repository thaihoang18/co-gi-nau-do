from pydantic import Field, BaseModel


class Detection(BaseModel):
    class_id: int
    name: str
    confidence: float = Field(ge=0, le=1)
    bbox: tuple[float, float, float, float]

class ImageResponse(BaseModel):
    filename: str
    size_bytes: int
    message: str
    image_width: int
    image_height: int
    detections: list["Detection"] = Field(default_factory=list) # type: ignore
    