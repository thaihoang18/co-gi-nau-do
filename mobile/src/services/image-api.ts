import { File } from 'expo-file-system';
import { fetch } from 'expo/fetch';
const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/$/, '');

export interface Detection {
  class_id: number;
  name: string;
  confidence: number;
  bbox: [number, number, number, number];
}

export interface ImageResponse {
  filename: string;
  size_bytes: number;
  message: string;
  image_width: number;
  image_height: number;
  detections: Detection[];
}

export async function uploadImage(imageUri: string) {
    if (!API_URL || !/^https?:\/\//.test(API_URL)) {
        throw new Error('Hãy cấu hình EXPO_PUBLIC_API_URL trong mobile/.env.local rồi tải lại app.');
    }
    const extension = imageUri
     .split('?')[0]
     .split('.')
     .pop()
     ?.toLowerCase();

    if(!['jpg', 'jpeg', 'png'].includes(extension ?? '')){
        throw new Error('Định dạng ảnh không hợp lệ. Vui lòng chọn ảnh có định dạng JPG, JPEG hoặc PNG.');
    }

   const file = new File(imageUri);

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/detection/image`, {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            typeof data?.detail === 'string' 
            ? data.detail: `Gửi ảnh thất bại: HTTP ${response.status}`
        );
    }

    return data;
}
