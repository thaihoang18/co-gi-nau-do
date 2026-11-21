# Food AI Mobile

React Native + Expo SDK 58 + TypeScript.

Ứng dụng hiện hỗ trợ chụp/chọn ảnh, gửi ảnh đến FastAPI và hiển thị kết quả
nhận diện kèm bounding box.

## Chạy thử

```powershell
npm.cmd ci
Copy-Item .env.example .env.local
# Sửa EXPO_PUBLIC_API_URL trong .env.local theo IP máy chạy backend.
npm.cmd start -- --clear
```

Dùng Expo Go tương thích SDK 58 trên điện thoại. Để gọi backend qua LAN,
điện thoại và máy tính cần kết nối cùng mạng; đặt EXPO_PUBLIC_API_URL trong
.env.local theo IP hiện tại của máy chạy FastAPI. File .env.local không commit.

## Kiểm tra

```powershell
npx.cmd expo install --check
npx.cmd tsc --noEmit
npm.cmd run lint
```

Khi nâng SDK, cập nhật Expo rồi chạy `npx.cmd expo install --fix` để đồng bộ
dependency theo SDK, thay vì cập nhật riêng Router hoặc React Native.
