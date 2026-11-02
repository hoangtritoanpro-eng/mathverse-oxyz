# Master Plan: Mathverse Oxyz & Báo Cáo Biện Pháp GVG 2026–2027

Tài liệu này quản lý lộ trình tổng thể của dự án theo quy trình **Solo Builder**.
*Quy tắc: AI Agent chỉ tập trung vào Phase hiện tại và đánh dấu `[x]` khi hoàn thành.*

---

## Lộ Trình Tổng Thể (Roadmap)

| Phase | Tên Giai Đoạn | Trạng Thái | Mô Tả Tóm Tắt |
| :--- | :--- | :---: | :--- |
| **Phase 1** | Khởi tạo Khung Hệ thống & Server LAN | `[x]` | Khung 5 chặng, server LAN Node.js, dashboard GV và quy trình Solo Builder. |
| **Phase 2** | Nâng cấp 2 Game Engine Tương Tác Nhóm (Săn Kho Báu 2D & Bảo Vệ Thành Trì) | `[x]` | Tích hợp 2 cơ chế game tương tác thực thụ (`hunt-preview` & `castle-defense`) vào 5 chặng Oxyz cho học sinh chơi nhóm. |
| **Phase 3** | Hoàn thiện Báo Cáo Biện Pháp (Word 3 trang) | `[ ]` | Soạn thảo nội dung biện pháp, số liệu minh chứng và xuất file `.docx` hoàn chỉnh. |
| **Phase 4** | Kế hoạch bài dạy (Giáo án), Slide & Nghiệm thu | `[ ]` | Soạn giáo án 45 phút, bộ slide thuyết trình 30 phút và kiểm thử toàn diện. |

---

## Chi Tiết Các Giai Đoạn (Phase Breakdown)

### Phase 1: Khởi tạo Khung Hệ thống & Server LAN `[x]`
- **Mục tiêu:** Xây dựng nền tảng mạng LAN và khung quản lý lớp học.
- **Kết quả đạt được:**
  - [x] Khởi tạo `stages.js`, `server.js` Node.js mạng LAN không cần Internet.
  - [x] Dashboard giáo viên và hệ thống phòng chơi 4–8 đội.
  - [x] Thiết lập quy trình chuẩn Solo Builder (`AGENTS.md`, `BRD.md`, `brief.md`, `CHANGELOG.md`).

### Phase 2: Nâng cấp 2 Game Engine Tương Tác Nhóm (Săn Kho Báu 2D & Bảo Vệ Thành Trì) `[x]`
- **Mục tiêu:** Biến 5 chặng Oxyz thành các màn chơi tương tác trực quan, hấp dẫn dựa trên 2 mẫu game `giaoviendoimoi.com/hunt-preview/__demo__` (Săn Kho Báu 2D Map) và `giaoviensangtao.vn/play/castle-defense/thu-nghiem` (Bảo Vệ Thành Trì Real-time).
- **Kết quả đạt được:**
  - [x] Nâng cấp `stages.js`: Bổ sung cấu hình bản đồ 2D (tọa độ trạm, địa hình, quái vật canh giữ), cấu hình chiến trường Thủ Thành (3 làn đường, đợt quái vật, Boss), câu hỏi trắc nghiệm + trả lời ngắn và nhiệm vụ phân vai nhóm.
  - [x] Nâng cấp `server.js`: Hỗ trợ chấm điểm `choice` & `shortText`, lưu trạng thái Vàng (`gold`), Cấp độ (`heroLevel`), Nâng cấp (`upgrades`) và đồng bộ với Teacher Dashboard.
  - [x] Xây dựng **Game Engine 1 – Săn Kho Báu 2D (`HuntMapEngine`)** trong `public/app.js` & `public/style.css`.
  - [x] Xây dựng **Game Engine 2 – Bảo Vệ Thành Trì (`CastleDefenseEngine`)** trong `public/app.js` & `public/style.css`.
  - [x] Tích hợp nút chuyển đổi chế độ chơi (**🗺️ Săn Kho Báu 2D** $\leftrightarrow$ **🏰 Bảo Vệ Thành Trì**) ngay trên từng chặng và đồng bộ trọn vẹn sang `CHOI_THU_1_MAY.html`.

### Phase 3: Hoàn thiện Báo Cáo Biện Pháp (Word 3 trang) `[ ]`
- **Mục tiêu:** Điền và hoàn chỉnh file `Bien phap gop phan nang cao chat luong DH.docx` theo đúng mẫu và quy định của nhà trường (tối đa 3 trang).

### Phase 4: Kế hoạch bài dạy (Giáo án), Slide & Nghiệm thu `[ ]`
- **Mục tiêu:** Chuẩn bị đầy đủ tài liệu phục vụ buổi thuyết trình 30 phút (10/11/2026) và tiết dạy thực hành (11/11 – 17/11/2026).
