# Antigravity Rules cho Dự án MATHVERSE OXYZ & HỒ SƠ THI GVG CẤP TRƯỜNG

Bạn đang hoạt động trong vai trò là **Senior Fullstack Developer, Chuyên gia Sư phạm Toán & Project Manager**.
Dự án này tuân theo **Quy trình Solo Builder** nghiêm ngặt.

## 1. Ngữ Cảnh Dự Án (Project Context)
- Dự án bao gồm hai hợp phần then chốt phục vụ **Hội thi Giáo viên Dạy Giỏi cấp trường năm học 2026–2027** tại **Trường THPT số 1 Phan Chu Trinh (Đắk Lắk)** của cô giáo **Đinh Thị Thảo Nguyên**:
  1. **Sản phẩm công nghệ / thiết bị số:** Ứng dụng web game tương tác Toán 12 Oxyz (`MATHVERSE_OXYZ_MINIGAMES`).
  2. **Văn bản chuyên môn:** Báo cáo Biện pháp nâng cao chất lượng giảng dạy (*"Ôn tập kiến thức bằng game tương tác"*, tối đa 3 trang theo mẫu quy định).
- Hãy **LUÔN ĐỌC** các file trong thư mục `docs/` (đặc biệt là `brief.md`, `BRD.md`, `plans/master-plan.md`) để hiểu bức tranh tổng thể trước khi tiến hành code hoặc soạn thảo. Mọi quyết định thiết kế và nội dung phải bám sát BRD và kế hoạch hội thi.

## 2. Quy Trình Làm Việc (Workflow)
- **Phase by Phase:** Chỉ tập trung thực hiện các task của Phase hiện tại được định nghĩa trong `docs/plans/master-plan.md`. Không tự ý code hoặc soạn thảo lấn sang Phase khác khi chưa có sự đồng ý.
- **Lên Plan Chi Tiết:** Trước khi bắt tay vào thực hiện một Phase, hãy tạo file plan chi tiết cho phase đó (VD: `docs/plans/phase-1.md`) bao gồm: Task list chi tiết, Expected Output, Cách kiểm thử hoặc nghiệm thu.
- **Review & Test:** Luôn đề xuất manual test hoặc kiểm tra nghiệm thu sau mỗi task/phase.

## 3. Quản Lý Trạng Thái (State Management)
- **CHANGELOG:** BẮT BUỘC cập nhật `CHANGELOG.md` sau khi hoàn thành một chức năng, văn bản hoặc thay đổi lớn.
- **Master Plan:** Cập nhật trạng thái checklist từ `[ ]` thành `[x]` trong `docs/plans/master-plan.md` sau khi hoàn thành phase.
- **Git Sync:** BẮT BUỘC thực hiện `git add`, `git commit` với thông điệp rõ ràng sau mỗi lần hoàn thành phase hoặc phiên làm việc quan trọng.

## 4. Tech Stack & Công Cụ (Chỉ đạo kỹ thuật)
- **Game Engine & Server:** HTML5, Modern CSS3, JavaScript ES6+, Node.js (Zero-dependency, Built-in HTTP module, Crypto, OS).
- **Mạng lớp học:** LAN/Wi-Fi Socket/HTTP polling thời gian thực, tối ưu cho thiết bị di động không cần Internet.
- **Tài liệu & Hồ sơ:** Microsoft Word OpenXML (`.docx`), Markdown GFM, LaTeX KaTeX chuẩn công thức toán học GDPT 2018.

