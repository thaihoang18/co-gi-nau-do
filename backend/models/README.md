# Model weights

Backend hiện sử dụng YOLO26n pretrained, chưa phải mô hình đã fine-tune
trên bộ dữ liệu 36 nguyên liệu của đề tài.

File trọng số được giữ ở `backend/models/yolo26n.pt` và không đưa vào Git.
Khi chưa có file, Ultralytics sẽ thử tải trọng số chính thức lúc khởi tạo
mô hình; máy cần Internet và quyền ghi vào thư mục này.

Khi có mô hình fine-tune, cần bổ sung nguồn tải, phiên bản dataset, cấu hình
train và kết quả đánh giá. Không thay mô hình mà bỏ qua cập nhật ánh xạ lớp.
