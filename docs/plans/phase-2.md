# Chi Tiết Kế Hoạch - Phase 2 (Bản Nâng Cấp Đồ Họa AAA & Hành Trình 3D Oxyz)

Tài liệu này định nghĩa chi tiết các đầu việc nâng cấp đồ họa, hành trình 5 chặng và mô phỏng 3D Oxyz cho **Phase 2** theo chuẩn quy trình **Solo Builder**.

---

## 1. Danh Sách Công Việc (Task Checklist)

- [x] **Task 1: Nâng cấp dữ liệu 5 chặng & Dữ liệu Mô phỏng 3D Oxyz trong `MATHVERSE_OXYZ_MINIGAMES/stages.js`**
  - *Mô tả chi tiết:*
    - Cấu hình 5 chặng Toán 12 Oxyz với cốt truyện liên hoàn, vật phẩm, danh hiệu chặng, tọa độ địa hình chi tiết.
    - Bổ sung dữ liệu hình học không gian `visual3D` cho cả 15 lượt chơi (tọa độ điểm $A, B, I$, vectơ $\vec{u}, \vec{v}$, thành phần chiếu lên 3 trục $Ox, Oy, Oz$) để vẽ mô phỏng 3D trực tiếp.
  - *File tác động:* `MATHVERSE_OXYZ_MINIGAMES/stages.js`

- [x] **Task 2: Nâng cấp máy chủ `MATHVERSE_OXYZ_MINIGAMES/server.js`**
  - *Mô tả chi tiết:*
    - Truyền đầy đủ dữ liệu `visual3D`, chuỗi `streak` (Combo trả lời đúng liên tiếp), thưởng Vàng theo Combo và đồng bộ trạng thái nâng cấp đội quân.
  - *File tác động:* `MATHVERSE_OXYZ_MINIGAMES/server.js`

- [x] **Task 3: Thiết kế Đồ họa AAA, Hiệu ứng Hạt, Bản đồ Lục địa & Mô phỏng 3D trong `public/style.css`**
  - *Mô tả chi tiết:*
    - Thiết kế **Bản đồ Hành trình Lục địa Oxyz** với 5 hòn đảo/thành trì nổi kết nối bằng cầu năng lượng và đánh giá 3 sao (`⭐⭐⭐`) mỗi chặng.
    - Thiết kế địa hình SVG đa lớp cho **Săn Kho Báu 2D** (sông suối sóng sánh, cầu gỗ, đền cổ, mỏ pha lê neon, mê cung đá, núi lửa dung nham), **Mini-Map Radar**, **La bàn chỉ hướng (`Compass Arrow`)** và bụi bước chân.
    - Thiết kế đồ họa **Bảo Vệ Thành Trì** với Thành Trì SVG đa tầng, hiệu ứng **Tia Laser Đại Bác Oxyz (`cd-laser-beam`)**, mưa tên rơi chéo, bão tuyết đóng băng, cột sáng hồi máu, hiệu ứng rung màn hình (`screen-shake`) và khung **Hologram 3D Oxyz** tương tác.
  - *File tác động:* `MATHVERSE_OXYZ_MINIGAMES/public/style.css`

- [x] **Task 4: Lập trình Đồ họa SVG, Mô phỏng 3D Oxyz & Hiệu ứng Chiến đấu trong `public/app.js`**
  - *Mô tả chi tiết:*
    - Xây dựng bộ vẽ **Hologram 3D Oxyz (`renderOxyz3D`)**: Phép chiếu trục đo (Isometric/Perspective 3D) vẽ hệ trục $Oxyz$, mặt phẳng lưới $Oxy$, các đường gióng tọa độ $(x, y, z)$, điểm $A, B, I$ và vectơ $\vec{u}, \vec{v}$ có nút xoay góc nhìn 3D trực tiếp!
    - Xây dựng bộ **SVG Monsters & Heroes Art** sinh động thay thế các biểu tượng đơn điệu.
    - Nâng cấp `HuntMapEngine`: Thêm Mini-Map Radar, La bàn định hướng trạm, hạt đom đóm môi trường, dấu chân di chuyển và hiệu ứng chiến đấu chém kiếm / nổ phép.
    - Nâng cấp `CastleDefenseEngine`: Thêm hiệu ứng hạt nổ (`sparks`), tia Laser Đại Bác Pháo Kích khi trả lời đúng, hiệu ứng thời tiết của 4 Kỹ năng (Mưa tên, Bão tuyết, Hồi máu, Khiên Lục Giác) và nút **⛶ Toàn màn hình**.
  - *File tác động:* `MATHVERSE_OXYZ_MINIGAMES/public/app.js`

- [x] **Task 5: Đóng gói lại `CHOI_THU_1_MAY.html` & Kiểm thử trên Server đang chạy**
  - *File tác động:* `MATHVERSE_OXYZ_MINIGAMES/CHOI_THU_1_MAY.html`
