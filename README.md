# Có Gì Nấu Đó

Ứng dụng Android nhận diện nguyên liệu từ ảnh bằng YOLO và gợi ý món ăn,
công thức chế biến bằng mô hình ngôn ngữ lớn (LLM).

An Android app for ingredient detection and AI-powered recipe suggestions.

## Trạng thái phát triển

- Đã có chụp/chọn ảnh, xem trước và gửi ảnh từ điện thoại đến FastAPI.
- Đã tích hợp YOLO26n pretrained trên backend, trả kết quả JSON và hiển thị
  bounding box, tên đối tượng, confidence trên mobile.
- Đang chuẩn bị, kiểm tra và chuẩn hóa dữ liệu cho 36 lớp nguyên liệu.
- Chưa hoàn thành fine-tune và đánh giá mô hình nguyên liệu; kết quả hiện
  tại thuộc các lớp của mô hình pretrained, không phải đủ 36 lớp mục tiêu.
- Chỉnh sửa/xác nhận nguyên liệu, gợi ý món ăn và chi tiết công thức là các
  phần dự kiến triển khai tiếp theo.

Hiện mô hình chạy ở backend. Suy luận trực tiếp trên Android là hướng cần
đánh giá riêng, chưa được triển khai trong app.

## Cấu trúc

```text
co-gi-nau-do/
├── backend/
│   ├── api/                 Endpoint FastAPI
│   ├── schema/              Cấu trúc dữ liệu Pydantic
│   ├── services/            Xử lý ảnh và gọi YOLO
│   ├── models/              Hướng dẫn trọng số; file .pt không đưa vào Git
│   ├── main.py
│   ├── requirements.txt
│   └── try_yolo.py          Thử inference độc lập
├── mobile/
│   ├── src/app/             Màn hình và điều hướng Expo Router
│   ├── src/services/        Giao tiếp API
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
└── MO_TA_DE_TAI.md           Mô tả đề tài
```

## Môi trường phát triển

- Backend: Python 3.12, FastAPI, PyTorch, Ultralytics YOLO26n, Pillow.
- Mobile: Node.js 22.13 trở lên thuộc nhánh 22 (đã dùng 22.21), Expo SDK 58,
  React Native và TypeScript.
- Điện thoại: Expo Go tương thích SDK 58; cùng mạng LAN với máy chạy backend.

Các lệnh bên dưới dùng PowerShell trên Windows. Không đưa `.venv` hay
`node_modules` lên Git; mỗi máy tự cài dependency.

## Chạy backend

Tại thư mục gốc:

```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Không cần tạo lại `.venv` nếu đã có môi trường hoạt động. Requirements ghi
phiên bản dependency trực tiếp của môi trường hiện tại; cài đặt lần đầu có
thể tải nhiều dữ liệu do PyTorch. Bản CUDA cần chọn phù hợp phần cứng và driver.

Backend nạp `models/yolo26n.pt`. Nếu file chưa có, Ultralytics sẽ thử tải
trọng số pretrained khi khởi tạo, vì vậy lần chạy đầu cần Internet.

- Kiểm tra trạng thái: `http://127.0.0.1:8000/`
- Swagger UI: `http://127.0.0.1:8000/docs`
- Upload/nhận diện: `POST /detection/image`, multipart với trường `file`.

## Chạy mobile

Mở terminal khác từ thư mục gốc:

```powershell
cd mobile
npm.cmd ci
Copy-Item .env.example .env.local
```

Sửa `mobile/.env.local`, thay IP ví dụ bằng IPv4 LAN của máy chạy backend:

```dotenv
EXPO_PUBLIC_API_URL=http://192.168.1.105:8000
```

```powershell
npm.cmd start -- --clear
```

Quét QR bằng Expo Go SDK 58. Không dùng `localhost` hoặc `0.0.0.0` làm URL
backend trên điện thoại thật. IP có thể đổi khi kết nối mạng lại; kiểm tra bằng
`ipconfig`. Sau khi đổi cấu hình, tải lại toàn bộ app hoặc khởi động lại Expo.

Các biến `EXPO_PUBLIC_*` được đưa vào app, chỉ dùng cho cấu hình công khai.
Không đặt API key Roboflow, LLM hoặc mật khẩu trong các biến này.

## Kiểm tra FE

```powershell
cd mobile
npx.cmd tsc --noEmit
npm.cmd run lint
npx.cmd expo install --check
```
