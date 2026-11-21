from typing import Annotated
from fastapi import APIRouter, File, UploadFile, HTTPException
from schema.detection import ImageResponse # type: ignore
from services.detection_services import process_image

router = APIRouter(
    prefix="/detection",
    tags=["Detection"],
)

@router.post("/image", response_model=ImageResponse)
async def upload_image( # type: ignore
    file: Annotated[UploadFile, File()],
) -> ImageResponse:
    try:
        if file.content_type not in {"image/jpeg", "image/png", "image/jpg"}:
            raise HTTPException(
                status_code=415,
                detail="Hãy gửi ảnh JPEG, JPG hoặc PNG",
            )

        image_bytes = await file.read()

        if not image_bytes:
            raise HTTPException(
                status_code=400,
                detail="Ảnh rỗng",
            )

        return process_image(
            image_bytes=image_bytes,
            filename=file.filename or "image"
        )
    finally:
        await file.close()
