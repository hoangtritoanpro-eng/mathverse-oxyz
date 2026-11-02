# Chi Tiết Kế Hoạch - Phase 2: Nâng Cấp 2 Game Engine Tương Tác Nhóm (Săn Kho Báu 2D & Bảo Vệ Thành Trì)

Tài liệu này định nghĩa chi tiết các đầu việc, kết quả đầu ra và phương thức kiểm thử cho **Phase 2** theo chuẩn quy trình **Solo Builder**.

---

## 1. Danh Sách Công Việc (Task Checklist)

- [x] **Task 1: Nâng cấp dữ liệu 5 chặng trong `MATHVERSE_OXYZ_MINIGAMES/stages.js`**
  - *Mô tả chi tiết:*
    - Cấu hình 5 chặng Toán 12 Oxyz (Vectơ $\vec{AB}$, Tích vô hướng $\vec{u}\cdot\vec{v}$, Khoảng cách $AB$, Tọa độ trung điểm $I$, Hai vectơ cùng phương $\vec{u}=k\vec{v}$).
    - Bổ sung dữ liệu bản đồ 2D cho từng chặng (chủ đề địa hình `forest`, `fortress`, `crystal`, `maze`, `citadel`, tọa độ 3 trạm quái vật `stations`, loại quái vật canh giữ `monster`, vị trí xuất phát `spawn`, vị trí rương kho báu `chest`).
    - Bổ sung dữ liệu chiến trường Bảo Vệ Thành Trì (`defenseConfig`: tên thành trì, 3 đợt quái vật `waves`, loại quái vật `goblin`, `bat`, `skeleton`, `orc`, `boss`).
    - Hỗ trợ cả câu hỏi trắc nghiệm (`abcd`) và trả lời ngắn (`shortAnswer`), kèm phân công vai trò hợp tác nhóm (`teamRoles`: Thành viên 1, Thành viên 2, Thành viên 3, Đội trưởng).
  - *File tác động:* `MATHVERSE_OXYZ_MINIGAMES/stages.js`

- [x] **Task 2: Nâng cấp máy chủ `MATHVERSE_OXYZ_MINIGAMES/server.js`**
  - *Mô tả chi tiết:*
    - Hỗ trợ kiểm tra đáp án cho cả `choice` (trắc nghiệm) và `shortText` (điền đáp án ngắn).
    - Lưu trữ và đồng bộ thêm chỉ số của đội (`gold`, `heroLevel`, `upgrades`) và endpoint `/api/upgrade` để hiển thị sinh động trên Dashboard Giáo viên.
  - *File tác động:* `MATHVERSE_OXYZ_MINIGAMES/server.js`

- [x] **Task 3: Xây dựng Giao diện & CSS cho 2 Game Engine trong `MATHVERSE_OXYZ_MINIGAMES/public/style.css`**
  - *Mô tả chi tiết:*
    - Thiết kế giao diện **Săn Kho Báu 2D (`hw-viewport`, `hw-world`, `hw-station`, `hw-ring`, `hw-player`, `hw-hud-keys`, `hw-dpad`, `hw-battle-modal`, `hw-letter-card`)** lấy cảm hứng từ `giaoviendoimoi.com/hunt-preview/__demo__`.
    - Thiết kế giao diện **Bảo Vệ Thành Trì (`cd-game`, `cd-hud`, `cd-battlefield`, `cd-lane-guide`, `cd-castle`, `cd-hero`, `cd-enemy`, `cd-proj`, `cd-skill-dock`, `cd-upgrade-panel`, `cd-question-dock`)** lấy cảm hứng từ `giaoviensangtao.vn/play/castle-defense/thu-nghiem`.
  - *File tác động:* `MATHVERSE_OXYZ_MINIGAMES/public/style.css`

- [x] **Task 4: Lập trình 2 Game Engine Tương Tác Nhóm trong `MATHVERSE_OXYZ_MINIGAMES/public/app.js`**
  - *Mô tả chi tiết:*
    - **Engine 1 – Săn Kho Báu 2D (`renderHuntGame` + `gameLoop`):** Bản đồ thế giới 2D có địa hình, nhân vật di chuyển bằng WASD/Mũi tên, chạm/click trên bản đồ, D-Pad ảo, hoặc nút Đi tới Trạm; tự động mở Cuộn Giấy Chiến Đấu Quái Vật và hiệu ứng bay mảnh chìa khóa.
    - **Engine 2 – Bảo Vệ Thành Trì (`renderCastleDefenseGame` + `gameLoop`):** Chiến trường 3 làn đường 60fps, 3 Anh Hùng bắn tên/phép thuật vào Quái vật, giải Toán nhận Vàng + Pháo Kích, nâng cấp 4 chỉ số và kích hoạt 4 Kỹ năng chủ động (Mưa Tên, Băng Giá, Hồi Máu, Khiên Thành).
    - **Thanh Chuyển Đổi Chế Độ Chơi (Mode Switcher):** Chuyển đổi tức thì giữa **🗺️ Săn Kho Báu 2D** và **🏰 Bảo Vệ Thành Trì** ở bất kỳ chặng nào.
  - *File tác động:* `MATHVERSE_OXYZ_MINIGAMES/public/app.js`

- [x] **Task 5: Đồng bộ bản chạy thử độc lập `CHOI_THU_1_MAY.html` & Cập nhật `HUONG_DAN_GIAO_VIEN.md`**
  - *Mô tả chi tiết:*
    - Đóng gói toàn bộ dữ liệu `stages.js`, `style.css` và `app.js` mới vào `CHOI_THU_1_MAY.html` kèm thanh chuyển nhanh Chặng 1..5 cho chế độ Demo.
    - Cập nhật tài liệu `HUONG_DAN_GIAO_VIEN.md`.
  - *File tác động:* `MATHVERSE_OXYZ_MINIGAMES/CHOI_THU_1_MAY.html`, `MATHVERSE_OXYZ_MINIGAMES/HUONG_DAN_GIAO_VIEN.md`

---

## 2. Kết Quả Đầu Ra Kỳ Vọng (Expected Outcomes)

- [x] Học sinh khi vào đội được trải nghiệm **2 trò chơi tương tác thực sự** (*Săn Kho Báu 2D* & *Bảo Vệ Thành Trì*).
- [x] Có nút chuyển đổi linh hoạt giữa 2 chế độ game ở mọi chặng.
- [x] Đã kiểm thử tự động E2E (`node --check` & API test) đạt 100%.
