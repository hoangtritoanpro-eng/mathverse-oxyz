# ANTIGRAVITY — NÂNG CẤP MÀN HÌNH HỌC SINH MATHVERSE OXYZ

## Nhiệm vụ
Hãy xem ảnh `01_Giao_dien_hoc_sinh_1920x1080.png` là **bản tham chiếu bố cục**, không phải hình nền cần đặt nguyên ảnh vào website. Hãy nâng cấp trực tiếp giao diện học sinh của dự án MATHVERSE OXYZ hiện có thành giao diện **Minimal Fantasy RPG**, dùng component HTML/CSS/React/Vue... theo framework đang có. Không tạo một website demo tách rời.

## Yêu cầu giao diện
- Khung mục tiêu desktop 1920×1080 và 1366×768, tối ưu màn hình máy chiếu.
- Thanh trên cùng gọn: logo MATHVERSE OXYZ, chế độ đang chơi, tên đội, vàng và nút cài đặt (nếu đã có).
- Thanh bản đồ 5 chặng, hiển thị hình/biểu tượng, tên ngắn và trạng thái; chặng hoạt động được tô sáng, chặng khóa có khóa.
- Dành phần lớn diện tích nội dung cho **không gian tương tác toán học**; bố cục tham khảo có sơ đồ vectơ bên trái, khối câu hỏi bên phải, một thanh tiến trình dưới cùng.
- Bên phải chỉ có các widget nhỏ: 5 Ấn Vectơ, XP và lời thoại Rồng Xanh; có thể thu gọn trên màn hình nhỏ.
- Câu hỏi hiện **từng câu một** với tối đa 3 phương án lớn, nút “XÁC NHẬN” chỉ bật khi đã chọn.
- Không in sẵn đáp án vào hình nền; công thức, vectơ và điểm A/B/C/I/G phải vẽ bằng SVG/Canvas và kiểm tra chiều mũi tên toán học. Hiển thị công thức động bằng KaTeX/MathJax nếu phù hợp.
- Dùng font hỗ trợ tiếng Việt chuẩn (ưu tiên Montserrat) và icon nhất quán, không dùng emoji dày đặc.
- Màu chủ đạo: navy #0B1227, cyan #36DEF4, tím #5846C9, vàng #FFC953, xanh lá #35C992.
- Ảnh nền các chặng và ảnh mascot được lấy từ thư mục tài nguyên đính kèm, không chèn chữ vào asset.

## 5 chặng kiến thức
1. Hiệu hai vectơ — Rừng Vectơ, NHẬN BIẾT; AB − AC = CB.
2. Tổng hai vectơ — Pháo Đài Góc, NHẬN BIẾT; AB + BC = AC.
3. Quy tắc hình bình hành — Tháp Pha Lê, NHẬN BIẾT; AB + AD = AC, với ABCD là hình bình hành.
4. Tính chất trung điểm — Mê Cung, THÔNG HIỂU; IA + IB = 0 khi I là trung điểm AB; MA + MB = 2MI.
5. Tính chất trọng tâm — Thành Trì Trí Tuệ, THÔNG HIỂU; GA + GB + GC = 0; MA + MB + MC = 3MG.
Tất cả chuỗi trên là ký hiệu vectơ, phải có mũi tên trên từng vectơ và vectơ không phải có mũi tên.

## Cách chơi và đồng bộ
- Có 5 nhiệm vụ tương tác, mỗi chặng chọn ngẫu nhiên 2 câu khác nhau từ ngân hàng 3 câu đã xác nhận. Không hiển thị đáp án trước khi học sinh trả lời.
- Chế độ hội nhóm 3–5 học sinh với quyền điều khiển, giải mã, xác nhận theo logic có sẵn. Các thao tác giải toán phục vụ mở cổng, hồi sinh ấn.
- Tổng thời gian phòng 360 giây: mở đầu 20; chặng 1 60; chặng 2 60; chặng 3 65; chặng 4 65; chặng 5 70; kết thúc 20. Nếu dự án đã có logic thời gian thì bảo toàn, chỉ đồng bộ cho đúng kịch bản và không tạo nhiều đồng hồ mâu thuẫn.
- Mọi XP, vàng, trạng thái mở khóa, vật phẩm và bảng xếp hạng phải lấy từ **dữ liệu thật** của dự án, không hardcode 100 vàng/500 XP/05:40 từ ảnh mẫu.
- Timer do server/host phòng quản lý theo mốc thời gian chung, đồng bộ giữa học sinh và giáo viên, hỗ trợ pause/resume/reconnect. Không để HS tự sửa kết quả hoặc gửi đáp án trùng làm tăng điểm.
- Trên màn hình học sinh **không hiển thị đáp án đúng, thống kê bí mật hoặc quyền điều khiển của giáo viên**.

## Kỹ thuật và nghiệm thu
Kiểm tra cấu trúc mã nguồn trước, tạo checkpoint; tái dùng component và dữ liệu hiện có. Thay đổi từng phần, bảo đảm UI responsive, tương tác kéo-thả/khóa nút/tooltip/hiệu ứng hoàn thành hoạt động, không che canvas và không giảm FPS.
Chạy test liên quan, kiểm tra trực tiếp bằng trình duyệt nếu khả dụng. Báo cáo các file đã sửa, trạng thái chức năng kiểm thử và mọi hạn chế chưa được xác minh.
