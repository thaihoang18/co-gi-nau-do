import { View, Text, Button, Alert, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  uploadImage,
  type Detection,
} from '../services/image-api';

export default function HomeScreen(){

  const [imageSize, setImageSize] = useState<{ width: number; height: number; } | null>(null);
  const [detections, setDetections] = useState<Detection[] | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const previewWidth = 300;
  const previewHeight = 300;
  const scale = imageSize
    ? Math.min(
      previewWidth / imageSize.width,
      previewHeight / imageSize.height
    )
    : 0;

    const offsetX = imageSize
    ? (previewWidth - imageSize.width * scale) / 2
    : 0;
    const offsetY = imageSize
    ? (previewHeight - imageSize.height * scale) / 2
    : 0;

  async function handleTakePhoto() {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
          Alert.alert("Chưa thể truy cập camera", "Bạn cần cấp quyền truy cập camera để chụp ảnh thực phẩm");
          return;
          }

        const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        });

        if(result.canceled) {
        return;
        }

        const photo = result.assets[0];
        setImageUri(photo.uri);
        setDetections(null);
        setImageSize(null);
        console.log("Ảnh đã chụp:", photo);
        } catch {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi truy cập camera");
        }
    }

  async function handleUploadImage() {
    if (!imageUri || isUploading) {
    return;
    }
    setIsUploading(true);
    setDetections(null);
    setImageSize(null);
    try {
      const data = await uploadImage(imageUri);
      setDetections(data.detections);
      setImageSize({
      width: data.image_width,
      height: data.image_height,
    });
    } catch (error) {
      Alert.alert(
      'Gửi ảnh thất bại',
      error instanceof Error ? error.message : 'Có lỗi xảy ra.'
    );
    } finally {
      setIsUploading(false);
      }
    }

    async function handleChoosePhoto() {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          quality: 0.8,
        });

        if (result.canceled) {
          return;
        }

        const photo = result.assets[0];

        setImageUri(photo.uri);
        setDetections(null);
        setImageSize(null);
      }catch{
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi truy cập thư viện ảnh");
      }
    }

    return(
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text>Chụp ảnh thực phẩm</Text>
            <View style={{ height: 16 }} />
            <Button title ="Chụp ảnh" 
                    onPress={handleTakePhoto}
                    disabled={isUploading}/>
            <View style={{ height: 16 }} />
            <Button title ="Chọn ảnh từ thư viện"
                    onPress={handleChoosePhoto}
                    disabled={isUploading}/>
            <View style={{ height: 16 }} />
           {imageUri !== null && (
            <View style={{
                    width: previewWidth,
                    height: previewHeight,
                    marginTop: 16,
                    position: 'relative',}}>
              <Image
                    source={{ uri: imageUri }}
                    style={{
                    width: previewWidth,
                    height: previewHeight,}}
                    resizeMode="contain"/>
            {imageSize !== null &&
                    detections?.map((item, index) => {
                    const [x1, y1, x2, y2] = item.bbox;
            return (
            <View
            key={index}
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: offsetX + x1 * scale,
              top: offsetY + y1 * scale,
              width: (x2 - x1) * scale,
              height: (y2 - y1) * scale,
              borderWidth: 2,
              borderColor: '#00a040',}}>
            <Text
              numberOfLines={1}
              style={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: '#00a040',
              color: '#ffffff',
              fontSize: 10,
              paddingHorizontal: 3,
              }}
              >
              {index + 1}. {item.name}
              </Text>
              </View>);
            })}
            </View>
            )}
            <View style={{ height: 16 }} />
            <Button
            title={isUploading ? 'Đang gửi...' : 'Gửi ảnh'}
            onPress={handleUploadImage}
            disabled={!imageUri || isUploading}
            />
            {imageSize !== null && (
              <Text>
                Kích thước ảnh: {imageSize.width} x {imageSize.height}
              </Text>
            )}
            {detections !== null && (
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                 Kết quả nhận diện
                </Text>
            {detections.length === 0 ? (
            <Text>Không phát hiện đối tượng ở ngưỡng hiện tại.</Text>
            ) : (
                  detections.map((item, index) => (
                  <View
                   key={index}
                   style={{ marginTop: 12 }}
                  >
                        <Text>
                        {index + 1}. {item.name}
                        </Text>
                        <Text>
                        Confidence: {(item.confidence * 100).toFixed(1)}%
                        </Text>
                    </View>
                    ))
                  )}
           </View>
            )}
       </ScrollView>
    )
}