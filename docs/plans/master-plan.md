# Master Plan: Mathverse Oxyz & Báo Cáo Biện Pháp GVG 2026–2027

Tài liệu này quản lý lộ trình tổng thể của dự án theo quy trình **Solo Builder**.
*Quy tắc: AI Agent chỉ tập trung vào Phase hiện tại và đánh dấu `[x]` khi hoàn thành.*

---

## Lộ Trình Tổng Thể (Roadmap)

| Phase | Tên Giai Đoạn | Trạng Thái | Mô Tả Tóm Tắt |
| :--- | :--- | :---: | :--- |
| **Phase 1** | Khởi tạo Khung Hệ thống & Server LAN | `[x]` | Khung 5 chặng, server LAN Node.js, dashboard GV và quy trình Solo Builder. |
| **Phase 2** | Nâng cấp 2 Game Engine Tương Tác Nhóm (Săn Kho Báu 2D & Bảo Vệ Thành Trì) | `[x]` | Tích hợp 2 cơ chế game tương tác thực thụ (`hunt-preview` & `castle-defense`) vào 5 chặng Oxyz cho học sinh chơi nhóm. |
| **Phase 3** | Hoàn thiện Báo Cáo Biện Pháp (Word 3 trang) | `[x]` | Soạn thảo nội dung biện pháp, số liệu minh chứng và xuất file `.docx` hoàn chỉnh. |
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
- **Mục tiêu:** Biến 5 chặng Oxyz thành các màn chơi tương tác trực quan, hấp dẫn dựa trên 2 mẫu game `giaoviendoimoi.com/hunt-preview/__demo__` (Săn Kho Báu 2D Map) và `giaoviensangtao.vn/play/castle-defense/thu-nghiem` (Bảo Vệ Thành Trì Real-time) kết hợp **Mô phỏng Không gian 3D Oxyz**.
- **Kết quả đạt được:**
  - [x] Nâng cấp `stages.js`: Bổ sung cấu hình bản đồ 2D (tọa độ trạm, địa hình, quái vật canh giữ), cấu hình chiến trường Thủ Thành (3 làn đường, đợt quái vật, Boss), dữ liệu mô phỏng không gian `visual3D` (tọa độ điểm, vectơ, công thức hình chiếu), câu hỏi trắc nghiệm + trả lời ngắn và nhiệm vụ phân vai nhóm.
  - [x] Nâng cấp `server.js`: Hỗ trợ chấm điểm `choice` & `shortText`, lưu trạng thái Vàng (`gold`), Cấp độ (`heroLevel`), chuỗi `streak` (Combo trả lời đúng), Nâng cấp (`upgrades`) và đồng bộ với Teacher Dashboard.
  - [x] Xây dựng **Game Engine 1 – Săn Kho Báu 2D (`HuntMapEngine`)** trong `public/app.js` & `public/style.css`: Địa hình SVG đa lớp (sông suối, cầu gỗ, đền cổ, mỏ pha lê neon, đom đóm), **Mini-Map Radar** thời gian thực, **La bàn định hướng Trạm mục tiêu** và Cuộn giấy chiến đấu với hiệu ứng đòn đánh hạ Boss.
  - [x] Xây dựng **Game Engine 2 – Bảo Vệ Thành Trì (`CastleDefenseEngine`)** trong `public/app.js` & `public/style.css`: Thành Trì SVG đa tầng, 3 Anh Hùng bắn đạn phép, **Tia Laser Đại Bác Oxyz (`cd-laser-beam`)** quét sạch quái khi giải đúng toán, hiệu ứng rung màn hình (`screen-shake`), 4 Kỹ năng thời tiết (Mưa tên, Bão tuyết, Hồi máu, Khiên lục giác).
  - [x] Tích hợp **Mô phỏng Hình học Không gian 3D Oxyz Hologram (`renderOxyz3D`)**: Hệ trục tọa độ 3 chiều $Ox, Oy, Oz$, mặt phẳng lưới đáy $Oxy$, đường gióng tọa độ trực quan và các nút tương tác 3D xoay ngang (`↺/↻`), đổi góc nghiêng (`📐`) giúp học sinh hình dung không gian 3 chiều ngay trong câu hỏi.
  - [x] Thiết kế **Bản đồ Lục địa 5 Chặng Oxyz (`world-journey-map`)** với 5 hòn đảo nổi, hệ thống sao đánh giá (`⭐⭐⭐`), biểu tượng vật phẩm và cho phép học sinh nhấn vào đảo để xem trước hoặc chuyển nhanh chặng.
  - [x] Nút **⛶ Toàn màn hình** tiện lợi cho trình chiếu lớp học và đồng bộ trọn vẹn sang `CHOI_THU_1_MAY.html`.
  - [x] Nâng cấp toàn diện **Màn Hình Học Sinh Minimal Fantasy RPG (`v4.2`)** & **Màn Hình Giáo Viên Trung Tâm Chỉ Huy + Trình Chiếu Lớp Học (`?view=display`)** theo đúng bộ đặc tả `MATHVERSE_HocSinh_GiaoVien_Antigravity` (tích hợp `/assets/RongXanh.png`, `/assets/Stage_01..05.png`, ký hiệu mũi tên vectơ $\vec{AB}, \vec{0}$ trên cả HTML và SVG, thống kê sư phạm `NHẬN BIẾT` / `THÔNG HIỂU` thời gian thực và 6 nút điều khiển có phân quyền).

### Phase 3: Hoàn thiện Báo Cáo Biện Pháp (Word 3 trang) `[x]`
- **Mục tiêu:** Điền và hoàn chỉnh file `Bien phap gop phan nang cao chat luong DH.docx` theo đúng mẫu và quy định của nhà trường (tối đa 3 trang).
- **Kết quả đạt được:**
  - [x] Lập kế hoạch chi tiết `docs/plans/phase-3.md` bám sát Thông tư 22/2019/TT-BGDĐT và Kế hoạch 96/KH-S1PCT của Trường THPT số 1 Phan Chu Trinh.
  - [x] Soạn thảo nội dung khoa học sư phạm: Lý do & thực trạng, 4 mục tiêu, 3 giải pháp cốt lõi (5 chặng game Mathverse Oxyz, phân vai chuyên trách $Ox, Oy, Oz$, mạng LAN Zero-dependency & mô hình 3D Oxyz), hiệu quả học tập và minh chứng đối chứng (Lớp 12A1 vs 12A2) với 2 bảng số liệu rõ ràng.
  - [x] Xây dựng script tự động hóa `scratch/build_bien_phap_docx.py` tạo file Word OpenXML chuẩn xác.
  - [x] Kiểm tra và xác thực bằng Word COM Automation (`scratch/check_word.ps1`): Văn bản đạt chính xác **3 trang in A4** (Words = 1724, Lines = 143), căn lề chuẩn, font Times New Roman, đầy đủ bảng số liệu và bảng chữ ký xác nhận của Hiệu trưởng & GV Đinh Thị Thảo Nguyên.
  - [x] Xuất bản file in ấn `Bien_phap_gop_phan_nang_cao_chat_luong_DH.pdf` và tạo artifact trực quan hóa 3 trang in `Bao_Cao_Bien_Phap_3_Trang.md`.

### Phase 4: Kế hoạch bài dạy (Giáo án), Slide & Nghiệm thu `[ ]`
- **Mục tiêu:** Chuẩn bị đầy đủ tài liệu phục vụ buổi thuyết trình 30 phút (10/11/2026) và tiết dạy thực hành (11/11 – 17/11/2026).
