from pathlib import Path
from unittest import result
from ultralytics import YOLO

BASE_DIR = Path(__file__).resolve().parent

model = YOLO(str(BASE_DIR / "models" / "yolo26n.pt"))

results = model.predict( # type: ignore
    source=str(BASE_DIR / "sample.jpg"),
    device = "cpu",
    conf = 0.25,
    save = True,
    project = str(BASE_DIR / "runs"),
    name = "first_dectection",
    exist_ok = True,
)


result = results[0] # type: ignore

detections = []

for box in result.boxes: # type: ignore
    class_id = int(box.cls.item())# type: ignore
    name = result.names[class_id]# type: ignore
    confidence = float(box.conf.item())# type: ignore
    bbox = box.xyxy[0].tolist()# type: ignore

    detections.append({# type: ignore
    "class_id": class_id,
    "name": name,
    "confidence": confidence,
    "bbox": bbox,
    })

print("Các đối tượng nhận diện được:")
print(detections)# type: ignore

print("Thư mục kết quả:", results[0].save_dir) # type: ignore