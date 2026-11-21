# ĐỀ XUẤT ĐỀ TÀI ĐỒ ÁN TỐT NGHIỆP

## 1. Tên đề tài

**Xây dựng ứng dụng Android nhận diện nguyên liệu thực phẩm bằng YOLO và gợi ý món ăn bằng mô hình ngôn ngữ lớn**

Thời gian thực hiện dự kiến: khoảng 9 tháng.

Đề tài tập trung vào nhận diện nhiều nguyên liệu trong ảnh bằng phương pháp phát hiện đối tượng (object detection), sau đó sử dụng danh sách nguyên liệu được người dùng xác nhận để gợi ý món ăn và hướng dẫn chế biến. YOLO26n được lựa chọn ban đầu; việc sử dụng chính thức sẽ dựa trên kết quả đánh giá và khả năng triển khai.

## 2. Lý do thực hiện và đóng góp của đề tài

Trong sinh hoạt hằng ngày, người dùng thường có sẵn một số nguyên liệu nhưng chưa biết nên kết hợp để chế biến món gì. Việc tìm kiếm công thức thủ công đòi hỏi xác định tên nguyên liệu, nhập từ khóa và đối chiếu nhiều kết quả. Một ứng dụng cho phép chụp ảnh nguyên liệu rồi đề xuất món ăn phù hợp có thể giúp giảm thao tác tìm kiếm và hỗ trợ tận dụng thực phẩm sẵn có.

Bài toán cần kết hợp hai khả năng: nhận biết những nguyên liệu xuất hiện trong ảnh và đề xuất cách chế biến từ danh sách nguyên liệu đó. Phát hiện đối tượng phù hợp với trường hợp nhiều nguyên liệu cùng xuất hiện, vì có thể cung cấp tên và vị trí từng đối tượng. Mô hình ngôn ngữ lớn (LLM) có thể tiếp nhận danh sách nguyên liệu dưới dạng văn bản để tạo gợi ý món ăn và trình bày hướng dẫn chế biến.

Tuy nhiên, ảnh chụp thực tế có thể thiếu sáng, bị che khuất hoặc có nhiều thực phẩm giống nhau. Kết quả nhận diện tự động vì vậy cần được người dùng kiểm tra trước khi dùng làm đầu vào cho bước gợi ý. Đề tài đưa chức năng sửa và xác nhận nguyên liệu vào luồng sử dụng để hạn chế ảnh hưởng của sai số nhận diện đến kết quả cuối cùng.

Về học thuật và kỹ thuật, đề tài tạo điều kiện thực hành phát triển ứng dụng mobile, chuẩn bị dữ liệu và fine-tune mô hình YOLO, xây dựng API, ứng dụng LLM và đánh giá hệ thống. Sử dụng trọng số pretrained giúp kế thừa đặc trưng đã học, giảm khối lượng huấn luyện so với khởi tạo mô hình từ đầu, nhưng vẫn cần dữ liệu phù hợp với các lớp thực phẩm mục tiêu.

Đóng góp dự kiến gồm: xây dựng quy trình tích hợp từ ảnh nguyên liệu đến công thức chế biến; chuẩn bị và đánh giá tập dữ liệu cho phạm vi nguyên liệu đã chọn; thực nghiệm mô hình phát hiện đối tượng có kích thước nhỏ; và phân tích chất lượng nhận diện, tính phù hợp của gợi ý cùng thời gian phản hồi. Trọng tâm là xây dựng và đánh giá giải pháp ứng dụng, không đặt mục tiêu đề xuất một kiến trúc YOLO hoặc LLM mới.

## 3. Sản phẩm và chức năng dự kiến

Sản phẩm chính là ứng dụng Android kết hợp dịch vụ backend, có khả năng thực hiện luồng: **chụp/chọn ảnh → nhận diện nguyên liệu → chỉnh sửa/xác nhận → gợi ý món ăn → xem công thức**.

### 3.1. Chụp hoặc chọn ảnh

Người dùng chụp ảnh bằng camera hoặc chọn ảnh từ thư viện. Ứng dụng hiển thị ảnh xem trước, cho phép chọn lại và gửi ảnh để xử lý. Giao diện cung cấp trạng thái đang gửi, thông báo lỗi và khả năng thử lại khi kết nối thất bại.

### 3.2. Nhận diện nguyên liệu

Hệ thống phát hiện các nguyên liệu thuộc danh sách lớp được hỗ trợ, trả về tên, độ tin cậy và tọa độ khung bao. Ứng dụng hiển thị danh sách kết quả, dự kiến kết hợp vẽ khung bao trên ảnh. Phạm vi ban đầu giới hạn ở các nguyên liệu phổ biến, phân biệt được bằng hình ảnh và có dữ liệu huấn luyện phù hợp; không cam kết nhận diện mọi loại thực phẩm.

### 3.3. Chỉnh sửa và xác nhận

Người dùng có thể sửa tên nguyên liệu bị nhận nhầm, xóa kết quả không đúng và bổ sung nguyên liệu bị bỏ sót. Danh sách sau xác nhận được sử dụng cho bước gợi ý món ăn, thay vì chuyển trực tiếp toàn bộ dự đoán của mô hình sang LLM.

### 3.4. Gợi ý món ăn

Hệ thống gửi danh sách nguyên liệu đã xác nhận đến LLM để đề xuất một số món ăn. Mỗi gợi ý dự kiến có tên món, mô tả ngắn, nguyên liệu tận dụng được và nguyên liệu cần bổ sung. Những gia vị hoặc thành phần chưa được người dùng cung cấp phải được thể hiện rõ, tránh gây hiểu nhầm rằng mọi nguyên liệu đều đã có sẵn.

### 3.5. Chi tiết công thức

Khi chọn một món, người dùng xem danh sách nguyên liệu, định lượng tham khảo, các bước chế biến và thời gian thực hiện dự kiến. Công thức cần được trình bày nhất quán, dễ đọc và đủ thông tin để đối chiếu. Các nội dung sinh bởi LLM sẽ được kiểm tra trong quá trình đánh giá, thay vì mặc định mọi câu trả lời đều chính xác.

Ngoài ứng dụng, sản phẩm bàn giao dự kiến gồm mã nguồn FE và BE, dữ liệu và hướng dẫn gán nhãn trong phạm vi được phép sử dụng, trọng số mô hình sau fine-tune, hướng dẫn cài đặt và báo cáo thực nghiệm. Hiện đã thử nghiệm thành công luồng chụp/chọn ảnh trên điện thoại, xem trước, gửi ảnh đến backend và nhận phản hồi HTTP 200. Các chức năng nhận diện và gợi ý món ăn là phần triển khai tiếp theo.

## 4. Công nghệ và giải pháp sử dụng

### 4.1. Ứng dụng mobile và backend

Ứng dụng sử dụng React Native, Expo và TypeScript; Expo Router tổ chức điều hướng. Camera và thư viện ảnh được truy cập qua Expo ImagePicker. File ảnh được gửi bằng multipart/form-data đến backend; dữ liệu kết quả được trao đổi dưới dạng JSON.

Backend sử dụng Python và FastAPI, chia thành các phần API, schema, service và cấu hình dùng chung. Pydantic định nghĩa cấu trúc dữ liệu đầu vào, đầu ra. Cách tổ chức này cho phép phát triển phần xử lý ảnh và phần gợi ý món ăn độc lập với giao diện.

### 4.2. Nhận diện bằng YOLO26n

YOLO26n pretrained là lựa chọn ban đầu vì thuộc nhóm mô hình kích thước nhỏ, phù hợp để khảo sát triển khai trên thiết bị có tài nguyên hạn chế. Trước tiên, mô hình được chạy độc lập trên máy tính, sau đó tích hợp vào backend nhận ảnh hiện có.

Trọng số pretrained trên COCO không bao phủ đầy đủ nguyên liệu cần dùng, chẳng hạn cà chua và trứng không có trong danh sách lớp COCO. Vì vậy, cần xác định tập lớp mục tiêu, thu thập ảnh, gán bounding box và fine-tune. Dữ liệu được chia thành tập huấn luyện, xác thực và kiểm thử, hạn chế ảnh trùng hoặc gần trùng giữa các tập.

Kiến trúc hiện tại chạy nhận diện tại backend, Android gửi ảnh và nhận kết quả. Nếu yêu cầu cuối cùng là suy luận trực tiếp trên điện thoại, sẽ khảo sát xuất mô hình sang LiteRT hoặc NCNN và đo trên thiết bị thật. Đây là hướng triển khai cần kiểm chứng; mô hình chạy tại backend chưa đồng nghĩa với mô hình đã chạy trực tiếp trên Android. Với Expo, việc thêm runtime native ngoài các thư viện có sẵn trong Expo Go có thể yêu cầu development build.

### 4.3. Gợi ý món ăn bằng LLM

Giải pháp dự kiến sử dụng LLM có sẵn thông qua API để tạo gợi ý và công thức; không huấn luyện LLM từ đầu. Nhà cung cấp và mô hình cụ thể được lựa chọn sau khi thử nghiệm chất lượng tiếng Việt, độ trễ và chi phí.

Backend xây dựng prompt từ danh sách nguyên liệu đã xác nhận, yêu cầu phân biệt nguyên liệu hiện có với nguyên liệu bổ sung và trả kết quả theo cấu trúc thống nhất. Phản hồi được kiểm tra các trường cần thiết trước khi chuyển đến FE. Khóa API được quản lý ở backend, không đưa vào mã ứng dụng mobile.

## 5. Thách thức kỹ thuật và hướng xử lý

**Dữ liệu phù hợp với thực tế:** nguyên liệu có nhiều trạng thái như nguyên quả, cắt nhỏ, còn vỏ hoặc đã sơ chế. Cần quy định rõ phạm vi lớp, cách gán nhãn và thu thập ảnh đa dạng về góc chụp, nền, ánh sáng. Ưu tiên số lớp vừa phải với dữ liệu đủ chất lượng trước khi mở rộng.

**Độ chính xác và hiệu năng:** mô hình nhỏ có thể bỏ sót vật thể nhỏ, bị che khuất hoặc dễ nhầm lẫn. Cần đo precision, recall, mAP và phân tích lỗi theo từng lớp. Nếu triển khai trên Android, đánh giá thêm thời gian suy luận, bộ nhớ và ảnh hưởng của định dạng xuất hoặc lượng tử hóa. Không dùng số liệu benchmark máy chủ để khẳng định hiệu năng điện thoại.

**Tích hợp ảnh và kết quả:** FE và BE phải thống nhất loại file, dung lượng, cấu trúc JSON và cách biểu diễn tọa độ. Việc xoay ảnh, thay đổi kích thước và hiển thị theo tỷ lệ có thể làm lệch bounding box. Cần xử lý ảnh đầu vào nhất quán và quy đổi tọa độ khi vẽ lên màn hình.

**Độ tin cậy của công thức:** LLM có thể đề xuất món ít phù hợp, thêm nguyên liệu không được nêu hoặc tạo hướng dẫn thiếu hợp lý. Hướng xử lý là giới hạn yêu cầu trong prompt, kiểm tra cấu trúc phản hồi và đánh giá thủ công trên các tình huống mẫu về mức tận dụng nguyên liệu, tính nhất quán và khả năng thực hiện.

**Đánh giá toàn hệ thống:** cần kiểm thử cả trường hợp không nhận diện được, người dùng sửa kết quả, ảnh không hợp lệ, mất mạng và dịch vụ LLM lỗi. Kết quả đồ án sẽ được đánh giá ở cả mô hình và luồng ứng dụng, bao gồm độ chính xác, thời gian phản hồi và mức độ hoàn thành tác vụ của người dùng.
