# ANTIGRAVITY — XÂY DỰNG MÀN HÌNH GIÁO VIÊN / MISSION CONTROL

## Nhiệm vụ
Hãy xem ảnh `02_Giao_dien_giao_vien_1920x1080.png` là **bản tham chiếu bố cục**, không phải ảnh chụp màn hình để nhúng làm nền. Trong **cùng dự án/phòng chơi** của MATHVERSE OXYZ, xây dựng hoặc nâng cấp màn hình **TRUNG TÂM CHỈ HUY – GIÁO VIÊN** theo phong cách navy/cyan/vàng đồng bộ với màn hình học sinh. Không tạo dữ liệu giả hoặc trang tách rời không đồng bộ.

## 1. Quản lý phòng và quyền
- Giáo viên có quyền tạo/chọn phòng, xem mã phòng, bắt đầu một lượt thi, tạm dừng, tiếp tục và kết thúc có xác nhận.
- Phân quyền thực tế: chỉ giáo viên/host có quyền điều khiển phòng; học sinh không thể gọi hành động host từ UI hay API.
- Hai loại màn hình dùng chung một mô hình dữ liệu, một trạng thái phòng và một đồng hồ chủ. Dữ liệu cập nhật theo thời gian thực bằng cơ chế realtime đã có (nếu cần có thể thiết kế WebSocket/SSE theo kiến trúc dự án).
- Nếu lớp có nhiều giáo viên/host, xác định chủ sở hữu phiên và tránh lệnh điều khiển xung đột.

## 2. Header và KPI
- Logo MATHVERSE OXYZ, tiêu đề “TRUNG TÂM CHỈ HUY”, mã phòng, tình trạng kết nối.
- Bốn KPI: số đội trực tuyến, tiến trình/chặng, số câu đúng toàn lớp, đồng hồ đếm ngược còn lại. Không làm giả các con số trong ảnh.
- Thanh hành trình 5 chặng với trạng thái đang chơi/đã xong/sắp tới.

## 3. Bảng theo dõi lớp
Một bảng trực tiếp dễ đọc trên máy chiếu: thứ hạng, tên đội, chặng hiện tại, tiến độ trong chặng, số câu đúng trên tổng, XP và trạng thái online/offline. Hiển thị 3 đội đầu nổi bật; cập nhật theo kết quả thực tế.
Có thể chọn đội để mở bảng riêng gồm chi tiết từng chặng, câu đã trả lời, gợi ý đã dùng, câu sai, thời gian hoàn thành. Dữ liệu chi tiết chỉ hiện cho giáo viên.

## 4. Thống kê sư phạm
- Tách 3 chặng NHẬN BIẾT (Hiệu, Tổng, Hình bình hành) và 2 chặng THÔNG HIỂU (Trung điểm, Trọng tâm).
- Hiển thị tỷ lệ đúng tính **từ số câu trả lời hợp lệ đã phát sinh**, không chia cho số câu chưa thực hiện; ghi rõ mẫu số khi cần.
- Cho xem tỷ lệ đúng từng câu, câu gây nhầm lẫn phổ biến, nhóm nào cần hỗ trợ; không công khai đáp án cho HS khi đang thi.
- Cuối giờ có bảng tổng kết và cho phép xuất CSV hoặc định dạng dự án hỗ trợ, nếu khả thi.

## 5. Điều khiển cuộc thi
Các nút thực sự kết nối tới state machine/host action: BẮT ĐẦU, TẠM DỪNG, TIẾP TỤC, TRÌNH CHIẾU, CHI TIẾT TỪNG ĐỘI, KẾT THÚC.
- Disable nút không hợp lệ theo trạng thái.
- Kết thúc sớm phải có hộp xác nhận.
- Tạm dừng phải đóng băng đúng đồng hồ chủ và trạng thái nhận đáp án phù hợp, sau đó resume nhất quán ở mọi thiết bị.
- Có cảnh báo mất kết nối/đội đang đứng ở chặng lâu, không tự cộng điểm.

## 6. Màn hình trình chiếu lớp
Tạo chế độ chỉ chiếu hoặc route display riêng tối giản, dành cho cả lớp xem. Hiển thị đồng hồ, bản đồ 5 chặng, thứ hạng/tiến độ công khai, hiệu ứng chặng hoàn thành và vinh danh.
**Không chiếu đáp án đúng, câu trả lời của đội khác trước khi hết lượt, dữ liệu riêng của học sinh hoặc điều khiển của giáo viên.** Màn hình chiếu không có quyền thao tác host.

## 7. Quy tắc lịch 6 phút
Tổng thời lượng 360 giây: INTRO 20s; STAGE_1 60s; STAGE_2 60s; STAGE_3 65s; STAGE_4 65s; STAGE_5 70s; FINALE 20s.
Dùng một bộ đồng hồ chuẩn cho phòng và cập nhật realtime. Cần xử lý gia nhập muộn, rớt mạng, refresh, duplicate submissions và phòng đã kết thúc.

## 8. Nghiệm thu
Kiểm tra cấu trúc dự án hiện có, checkpoint trước khi sửa, giữ nguyên cơ chế XP/vàng/điều kiện mở khóa/bộ câu hỏi, không tạo database demo như dữ liệu thật.
Test các luồng: giáo viên start -> học sinh vào chặng; học sinh trả lời -> bảng live cập nhật; pause -> mọi đồng hồ dừng; resume -> đồng bộ; hoàn tất -> tổng kết; học sinh gọi API host -> bị từ chối; màn hình trình chiếu -> không lộ đáp án.
Kiểm tra giao diện trên 1920×1080 và 1366×768, font Montserrat hỗ trợ tiếng Việt, tốc độ cập nhật và tình trạng tràn bảng. Báo cáo file đã sửa, kiểm thử đã chạy và những gì chưa thể xác minh.
