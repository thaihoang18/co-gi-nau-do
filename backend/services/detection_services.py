from schema.detection import ImageResponse
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageOps
from ultralytics import YOLO
from schema.detection import Detection, ImageResponse

BASE_DIR = Path(__file__).resolve().parent.parent

model = YOLO(str(BASE_DIR / "models" / "yolo26n.pt"))

def process_image(
    image_bytes: bytes,
    filename: str,
) -> ImageResponse:
    # Đọc ảnh từ dữ liệu mobile gửi lên.
    with Image.open(BytesIO(image_bytes)) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")

    # Dự đoán trực tiếp trên ảnh trong bộ nhớ.
    results = model.predict( # type: ignore
        source=image,
        device="cpu",
        conf=0.25,
        save=False,
    )

    result = results[0] # type: ignore

    image_height, image_width = result.orig_shape # type: ignore

    detections = []

    for box in result.boxes: # type: ignore
        class_id = int(box.cls.item()) # type: ignore
        coordinates = box.xyxy[0].tolist() # type: ignore

        detection = Detection(
            class_id=class_id,
            name=result.names[class_id], # type: ignore
            confidence=float(box.conf.item()), # type: ignore
            bbox=(
                coordinates[0],
                coordinates[1],
                coordinates[2],
                coordinates[3],
            ), # type: ignore
        )

        detections.append(detection) # type: ignore

    return ImageResponse(
        filename=filename,
        size_bytes=len(image_bytes),
        message="Đã xử lý nhận diện",
        image_width=image_width, # type: ignore
        image_height=image_height, # type: ignore
        detections=detections, # type: ignore
    )