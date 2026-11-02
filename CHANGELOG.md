# Changelog

Tất cả những thay đổi quan trọng của dự án này sẽ được ghi nhận tại file này theo chuẩn [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Planned
- **Phase 3:** Hoàn thiện văn bản Báo cáo Biện pháp nâng cao chất lượng giảng dạy (file `Bien phap gop phan nang cao chat luong DH.docx`) tối đa 3 trang, chuẩn thể thức Hội thi GVG THPT Số 1 Phan Chu Trinh.
- **Phase 4:** Xây dựng Kế hoạch bài dạy (Giáo án) minh họa 1 tiết thực hành và Slide trình chiếu thuyết trình biện pháp 30 phút.

---

## [2.0.0] - 2026-11-02

### Added
- **Game Engine 1 – Săn Kho Báu 2D Map (`HuntMapEngine` lấy cảm hứng từ `giaoviendoimoi.com/hunt-preview/__demo__`):**
  - Bản đồ thế giới 2D Top-Down (`1200x820`) với 5 chủ đề địa hình (`Rừng Vectơ`, `Pháo Đài Vuông Góc`, `Thung Lũng Pha Lê`, `Mê Cung Không Gian`, `Thành Trì Cuối`), camera tự động pan theo nhân vật của Đội.
  - Điều khiển đa phương thức: Bàn phím (`WASD` / Mũi tên), Click/Chạm trực tiếp trên bản đồ có hiệu ứng gợn sóng, phím D-Pad ảo trên màn hình cảm ứng và nút di chuyển nhanh tới từng Trạm (`Trạm I, II, III`).
  - Cửa sổ **Cuộn Giấy Chiến Đấu Quái Vật (Battle Scroll Modal)**: Hiển thị phân công vai trò hợp tác nhóm, câu hỏi Toán Oxyz (chọn A/B/C/D hoặc nhập đáp án ngắn), nút **🏃 Rút lui** & **⚔️ Tấn công**, hiệu ứng nổ `💥` khi hạ gục quái vật và hiệu ứng **Chìa khóa tọa độ bay vào túi đồ (`hw-letter-card`)**.
- **Game Engine 2 – Bảo Vệ Thành Trì Thời Gian Thực (`CastleDefenseEngine` lấy cảm hứng từ `giaoviensangtao.vn/play/castle-defense/thu-nghiem`):**
  - Chiến trường 3 làn đường thời gian thực (`60fps requestAnimationFrame`), **Thành Trì Oxyz** (thanh máu `Castle HP`, khiên năng lượng `Castle Shield`) và **3 Anh Hùng** (`🏹 Cung Thủ Ox`, `🧙‍♂️ Pháp Sư Oy`, `🛡️ Hiệp Sĩ Oz`) tự động bắn đạn/phép thuật vào các đợt Quái vật (`Goblin`, `Dơi`, `Bộ Xương`, `Orc`, `Boss`).
  - **Bảng Câu Hỏi Pháo Kích Toán Học** gắn dưới chiến trường: Giải đúng nhận **+120 Vàng**, **+XP lên cấp** và kích hoạt **Đòn Pháo Kích Tọa Độ** tiêu diệt toàn bộ đợt quái vật.
  - **Bảng Nâng Cấp Đội Quân** bằng Vàng (`⚔️ Sát thương`, `⚡ Tốc độ bắn`, `❤️ Máu & Giáp`, `🔧 Hồi phục Thành`) và **Thanh 4 Kỹ Năng Chủ Động** (`🌧️ Mưa Tên`, `❄️ Băng Giá`, `💚 Hồi Máu`, `🛡️ Khiên Thành`).
- **Chuyển đổi Chế độ Chơi linh hoạt (Mode Switcher):**
  - Học sinh và giáo viên có thể chuyển đổi qua lại giữa **🗺️ Săn Kho Báu 2D** và **🏰 Bảo Vệ Thành Trì** ở bất kỳ chặng nào trong 5 chặng.
- **Đồng bộ Bản Chơi Thử 1 Máy (`CHOI_THU_1_MAY.html`):**
  - Tích hợp trọn vẹn cả 2 Game Engine và thanh chuyển nhanh Chặng 1..5 phục vụ trình chiếu độc lập không cần cài đặt.

---

## [1.0.0] - 2026-11-02

### Added
- **Core Mathverse Oxyz Game System & Solo Builder Framework:**
  - Khởi tạo cấu trúc 5 chặng Toán 12 Oxyz, máy chủ mạng LAN `server.js` và bộ khung quy trình Solo Builder (`AGENTS.md`, `CHANGELOG.md`, `docs/brief.md`, `docs/BRD.md`, `docs/plans/master-plan.md`).
