# Changelog

Tất cả những thay đổi quan trọng của dự án này sẽ được ghi nhận tại file này theo chuẩn [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Planned
- **Phase 3:** Hoàn thiện văn bản Báo cáo Biện pháp nâng cao chất lượng giảng dạy (file `Bien phap gop phan nang cao chat luong DH.docx`) tối đa 3 trang, chuẩn thể thức Hội thi GVG THPT Số 1 Phan Chu Trinh.
- **Phase 4:** Xây dựng Kế hoạch bài dạy (Giáo án) minh họa 1 tiết thực hành và Slide trình chiếu thuyết trình biện pháp 30 phút.

---

## [2.6.0] - 2026-11-03

### Added & Overhauled
- **Thiết Kế Lại Chặng 3: 🧟 CHẶN ZOMBIE 4 LÀN (Zombie Defense 4-Lane Shooter Game - Chuẩn Giaoviendoimoi):**
  - **Bối cảnh & Giao diện:**
    - Khung cảnh bãi cỏ xanh 4 làn đường ngang (tương ứng 4 đáp án A, B, C, D).
    - Bên trái: Hàng rào gỗ phòng thủ kiên cố (`.hw-zd-fence`) cùng chú lính xạ thủ chibi đội mũ cối cầm súng Blaster Laser cực ngầu (`renderZombieShooterSVG`).
    - Bên phải: Đội quân Zombie hoạt hình ngộ nghĩnh bước đi nhịp nhàng từ phải sang trái (`renderZombieWalkingSVG`), hai tay giơ cuộn giấy da cổ mang nội dung 4 phương án A, B, C, D của bài toán Toán 12 Oxyz.
    - Thẻ câu hỏi nổi bật phía trên (`CÂU X / 5`) kèm nhãn chủ đề và hướng dẫn thao tác chi tiết.
  - **Cơ chế Điều khiển & Bắn Súng Đa Dạng (Flexible Controls):**
    - **Click/Tap trực tiếp:** Bấm vào zombie hoặc làn bất kỳ để lính di chuyển nòng súng và khai hỏa tia laser tiêu diệt zombie.
    - **Bàn phím PC:** Phím `W` / `S` hoặc `↑` / `↓` để chuyển làn ngắm bắn; phím `Space` hoặc `Enter` để khai hỏa tia laser. Hỗ trợ phím tắt số `1`–`4` hoặc chữ `A`–`D` bắn tức thì làn tương ứng.
    - **Mobile:** Chạm trực tiếp vào zombie đang tiến tới.
  - **Hiệu ứng Bắn Nổ & Tiến trình Mật Thư:**
    - Khi bắn trúng zombie mang đáp án đúng: Tia laser xanh neon rực sáng toàn làn, nổ tia lửa `💥`, zombie tan biến và rơi ra Mảnh Tinh Thể Phong Ấn (`P`, `H`, `A`, `L`, `E`).
    - Bắn sai không bị kẹt hay thua vĩnh viễn: Tia đạn dội ngược, hiển thị gợi ý sư phạm 2 cấp và bảo lưu tiến độ để học sinh tiếp tục thử sức.
    - Đủ 5 mảnh kích hoạt nút mở Sổ Mật Thư `PHALE` để mở cổng Tháp Pha Lê Cổ.
- **Đồng bộ hóa Tự động:** Cập nhật trọn vẹn vào `CHOI_THU_1_MAY.html` (chạy offline 100% không cần mạng) và máy chủ Live Server.

---

## [2.5.0] - 2026-11-03

### Added & Overhauled
- **Thiết Kế 5 Chặng Thành 5 Trò Chơi Tương Tác Hoàn Toàn Riêng Biệt (5 Unique Game Engines):**
  - **Chặng 1: 🗺️ SĂN KHO BÁU 2D (Island Treasure Explorer RPG):**
    - Bản đồ quần đảo nhiệt đới 2D top-down, tự do lái nhân vật thám hiểm (WASD/D-Pad), vượt cầu gỗ, tránh tảng đá nhặt rương kho báu và tìm 3 Đền thờ cổ trục $Ox, Oy, Oz$.
  - **Chặng 2: 🏰 BẢO VỆ THÀNH TRÌ (3-Lane Castle Defense Real-time):**
    - Game thủ thành thời gian thực 3 làn đường, nâng cấp 3 Anh Hùng, tung 4 kỹ năng thời tiết và khai hỏa Đại Bác Laser Oxyz quét sạch các đợt quái.
  - **Chặng 3: 🔮 LÒ RÈN TINH THỂ & THÁP PHA LÊ (Crystal Forge & Alchemist Cauldron):**
    - Giao diện phòng rèn thuật giả kim huyền bí, Vạc Năng Lượng Pitago xoay tròn plasma, 5 bệ rèn tinh thể pha lê tương ứng 5 bài toán độ dài/khoảng cách, thu thập đủ 5 viên để kích hoạt Bàn Giải Mã mở cổng Tháp Pha Lê Cổ.
  - **Chặng 4: 🌀 MÊ CUNG TỌA ĐỘ Ô VUÔNG (Interactive Grid Maze & Teleport Waypoints):**
    - Bàn cờ mê cung ô vuông $8 \times 6$ có hệ trục $Ox, Oy$ vạch số rõ ràng. Học sinh điều khiển nhân vật chạy từng ô trong mê cung, đạp lên đúng phiến đá tại tọa độ trung điểm/trọng tâm đã tính toán để mở cổng dịch chuyển và giải mã rương vàng `TRUNG`.
  - **Chặng 5: 🐲 ĐẤU TRƯỜNG DIỆT BOSS TỐI THƯỢNG (Epic Boss Raid Arena):**
    - Màn Đấu Boss tổ đội hoành tráng: Boss rồng "Bóng Đen Lãng Quên" (500 HP) bay lượn ở trung tâm. Học sinh giải 5 bài toán vectơ cùng phương để sạc 5 Trụ Phép bao quanh, kích hoạt Khiên Năng Lượng `BAOVE` và bắn **Đại Pháo Laser Oxyz Tối Thượng** quét sạch Boss.
- **Cập Nhật Toàn Diện Bản Đồ Hành Trình 5 Chặng:**
  - Nhãn hiển thị chế độ game trên từng hòn đảo: `🗺️ Săn Kho Báu 2D`, `🏰 Thủ Thành 3 Làn`, `🔮 Lò Rèn Pha Lê`, `🌀 Mê Cung Tọa Độ`, `🐲 Đấu Trường Boss`.
- **Đồng Bộ:** Đóng gói toàn bộ 5 game engines vào tệp ngoại tuyến `CHOI_THU_1_MAY.html` (~268KB) và cập nhật live server.

---

## [2.4.0] - 2026-11-03

### Added & Overhauled
- **Đại Trùng Tu Chặng 3, 4, 5 Thành Game Phiêu Lưu Toán Học 2D Đích Thực (Fantasy Adventure Math Game):**
  - **Chặng 3 – Tháp Pha Lê Khoảng Cách (Distance & Vector Length):**
    - Khám phá thung lũng hang động, NPC Vệ Binh Hang Pha Lê tại cửa hang giao nhiệm vụ tìm 5 viên pha lê thất lạc.
    - 5 bài toán độ dài vectơ và khoảng cách giữa hai điểm trong $Oxyz$, mỗi trạm mở khóa 1 mảnh cổ tự: `P - H - A - L - E`.
    - Bàn Giải Mã Trung Tâm & Tháp Pha Lê Cổ: Mở Sổ Mật Thư, sắp xếp đúng chuỗi `PHALE` để bừng sáng tháp pha lê và giải phóng phong ấn (nhận số mật mã `5`).
  - **Chặng 4 – Mê Cung Trung Điểm (Midpoint & Centroid):**
    - Mê cung cổ đại với hệ thống Lưới Tọa Độ $Oxy$ trực quan ($x=0..8, y=0..6$) hiển thị rõ ràng trên bản đồ.
    - Cơ chế Tọa độ bí mật: Sau khi tính trung điểm $M$ hoặc trọng tâm $G$, xuất hiện cọc tiêu tọa độ mục tiêu trên bản đồ; học sinh điều khiển nhân vật chạy đến đúng vị trí tọa độ để kích hoạt dấu hiệu bí mật.
    - Thu thập 5 ký tự cổ `T - R - U - N - G` và ghép thành `TRUNG` tại Bàn Cổ Mê Cung để mở khóa Phòng Kho Báu Trung Tâm (nhận số mật mã `2`).
  - **Chặng 5 – Thành Trì Lời Trí Tuệ (Collinear Vectors, Vector Addition & Boss Battle):**
    - Thành trì phép thuật bị quái vật vây hãm, điều khiển nhân vật nạp năng lượng cho 5 Trụ Phép phòng thủ xung quanh thành.
    - 5 bài toán hai vectơ cùng phương và phép toán vectơ, thu thập 5 cổ ngữ `B - A - O - V - E`.
    - Ghép thành công `BAOVE` trên Sổ Mật Thư để kích hoạt Màng Chắn Năng Lượng Kim Cương (`hw-shield-dome`).
    - Nghênh chiến Đại Boss "Bóng Đen Lãng Quên" (500 HP): Giải bài toán vận dụng cao tổng hợp ($|2\vec{u}+\vec{v}|=\sqrt{33}$) để kích hoạt Đại Pháo Laser Thành Trì quét sạch Boss với thông điệp *"THÀNH TRÌ ĐÃ ĐƯỢC BẢO VỆ!"* (nhận số mật mã `4`).
- **Hệ Thống Sổ Mật Thư Cổ Đại (Interactive Cipher Notebook):**
  - Giao diện Sổ Mật Thư chuyên dụng với 5 ô khóa ký tự, khay rune khả dụng, thao tác kéo thả/chạm đặt ký tự, gỡ bỏ, làm lại và xác thực linh hoạt, có gợi ý sửa sai không khóa vĩnh viễn.
- **Hệ Thống Phân Vai Nhóm 5 Thành Viên (Team Roles Modal):**
  - Hỗ trợ phân công rõ ràng: Dẫn đường & Thám hiểm (TV1), Nhà Toán học (TV2), Chuyên gia Vectơ (TV3), Nhà Giải Mật mã (TV4), Chỉ huy & Điều khiển (Đội trưởng).
- **Hệ Thống Gợi Ý 2 Cấp (2-Level Hint System):**
  - Cấp 1: Công thức trọng tâm; Cấp 2: Các bước giải chi tiết từng bước.
- **Tương Tác Phím E & Chạm Cảm Ứng Di Động:**
  - Hỗ trợ phím `E` và nút "✋ TƯƠNG TÁC (Phím E)" để tiếp cận NPC, trạm toán học, bàn giải mã, và Boss.
- **Bộ Hiệu Ứng Âm Thanh Web Audio Độc Lập:**
  - Tiếng pha lê leng keng (`crystal`), tiếng gầm uy lực của Boss (`boss_roar`), tiếng sạc khiên năng lượng (`energy`), tiếng chuông tọa độ (`gem`), pháo hoa rực rỡ.
- **Đồng Bộ Hoàn Toàn Bản Chơi Thử 1 Máy:**
  - Tái tạo toàn bộ logic mật thư, 5 chặng, 5 trạm và Đại chiến Boss vào file offline `CHOI_THU_1_MAY.html` (~246KB).

---

## [2.3.2] - 2026-11-03

### Fixed & Improved
- **Không Tự Động Di Chuyển Khi Bấm "Tiếp Tục Hành Trình":**
  - Loại bỏ hoàn toàn cơ chế tự động gán tọa độ `targetX, targetY` tới trạm tiếp theo khi học sinh đánh bại quái vật và bấm *“Trở lại bản đồ & Tự lái nhân vật tiếp tục”*.
  - Nhân vật sẽ đứng yên tại đền vừa chinh phục, trao quyền 100% cho học sinh tự dùng phím mũi tên / WASD / chạm cảm ứng để điều khiển nhân vật chạy tìm đền tiếp theo.
  - Đồng bộ cập nhật vào tệp độc lập `CHOI_THU_1_MAY.html`.

---

## [2.3.1] - 2026-11-03

### Added & Improved
- **Ưu Tiên Tuyệt Đối Bản Đồ Game RPG Lên Đầu Màn Hình Học Sinh:**
  - Chuyển khung Mô hình 3D Oxyz xuống dưới bản đồ game và mặc định thu gọn thành thanh tiện ích nhỏ gọn (`🧊 Mở Mô hình 3D Oxyz Tra Cứu`), giải phóng 100% tầm nhìn phía trên để học sinh nhìn thấy ngay nhân vật, thế giới phiêu lưu và các phím điều khiển.
  - Giáo viên vẫn xem trọn vẹn mô hình 3D Hologram kích thước lớn trên màn chiếu.
- **Hệ Thống Tự Lái Tìm Đền Hoàn Toàn (True Self-Movement Scavenger Hunt):**
  - Xóa bỏ các nút nhảy tắt / tự động đi hộ tới trạm. Học sinh trong nhóm bắt buộc phải phân công nhau **tự tay lái nhân vật** vượt sông qua cầu gỗ, tránh chướng ngại vật và nhặt tinh thể để tìm đến các Đền thờ Oxyz.
  - Tích hợp thanh trạng thái Dò Tìm Thời Gian Thực (`hw-exploring-pill`): Cập nhật khoảng cách tới đền thờ mục tiêu (`Còn 45m ➔ 20m ➔ 8m`).
  - Khi học sinh tự lái nhân vật tới sát cổng đền (`<= 10.5m`): Đền phát sáng và nút lệnh chiến đấu `⚔️ ĐÃ TỚI ĐỀN! BẤM MỞ BÀI TOÁN (Space)` sẽ tự động kích hoạt rực rỡ!
- **Khắc Phục Lỗi Hiển Thị Lặp Tọa Độ Điểm 3D:**
  - Sửa lỗi in trùng tọa độ `A(2;-1;3)(2;-1;3)` trên mô hình không gian 3 chiều.
- **Đồng Bộ:** Đóng gói bản cập nhật mới vào tệp độc lập `CHOI_THU_1_MAY.html` (~198KB).

---

## [2.3.0] - 2026-11-03

### Added
- **Đại Tu Đồ Họa Bản Đồ 2D AAA & Hệ Thống Tự Di Chuyển Cực Mượt (Self-Movement Adventure):**
  - **Địa Hình & Cảnh Quan Phiêu Lưu Sống Động:** Dòng sông uốn lượn tự nhiên với gradient nước xanh ngọc biếc và hiệu ứng sóng nước chảy lăn tăn (`riverFlow`); Cầu gỗ cổ tích được đặt chính xác tại giao lộ đường mòn `(516, 410)` xoay 57° theo góc đường với mố đá, ván gỗ vân sồi, lan can và đèn lồng mạ vàng; Con đường mòn lát đá cuội phiêu lưu đa lớp viền cỏ và vạch dạ quang Oxyz.
  - **Đền Thờ & Công Trình Oxyz Cổ Xưa:** Nâng cấp các trạm thử thách thành đền thờ La Mã cổ đại với bệ đá giật cấp, đôi cột trụ khắc chữ Runes, cột sáng thiên hà (Beacon beam) rực rỡ chiếu thẳng lên trời ở Trạm đang mở và nhãn hướng dẫn chiến đấu trực quan.
  - **Nhân Vật Thám Hiểm Chuyển Động Sống Động:** Avatar nhún nhảy theo nhịp chạy (`heroWalk`), tự động xoay mặt theo hướng di chuyển (`facing-left` / `facing-right`), bóng đổ 3D mềm mại, vầng hào quang định vị đội và vương miện/lửa streak nổi bật.
  - **Cơ Chế Chạm/Kéo Dẫn Đường (Click / Drag to Move):** Cho phép học sinh chạm hoặc kéo rê ngón tay/chuột trên bản đồ; hiển thị Cọc Tiêu Định Vị Mục Tiêu `📍` với vòng tròn sóng sonar lan tỏa và cự ly thu hẹp dần.
  - **Nút ⚡ TĂNG TỐC (Sprint Boost):** Bổ sung nút tăng tốc chạy nhanh 1.7x (kèm phím tắt `Shift`), hiệu ứng lửa sao băng và âm thanh vút gió.
  - **Âm Thanh Khám Phá Web Audio API:** Bổ sung âm bước chân sột soạt nhẹ nhàng, âm sonar khi chọn điểm đến, âm thanh nhặt tinh thể rộn rã.
  - **Hệ Thống Thu Thập Tinh Thể & Vàng Trên Bản Đồ (Exploration Collectibles):** Rải sẵn các Đồng Vàng Cổ `🪙`, Pha Lê Oxyz `💎`, Khiên Năng Lượng `🛡️` trên bản đồ để học sinh tự do điều khiển nhân vật chạy nhặt, hiển thị chữ nổi `+25 Vàng!`, `+5 XP!` bay lên.
  - **Bia Đá Khắc Trục Tọa Độ Cổ Xưa ($O, Ox, Oy, Oz$) & Cây Cối Đa Tầng:** Bổ sung cây sồi, thông, dừa có bóng đổ và các cột mốc tọa độ không gian rải rác khắp lục địa.
  - Đồng bộ toàn diện vào file chạy 1 máy `CHOI_THU_1_MAY.html` (~194KB) và máy chủ trực tiếp.

---

## [2.2.1] - 2026-11-03

### Fixed
- **Khắc Phục Triệt Để Lỗi Khởi Tạo Mô Hình 3D Oxyz (`undefined is not iterable`):**
  - Sửa lỗi destructuring `pt.coords` khi mở màn hình Chặng 1–5: Bổ sung cơ chế phòng vệ tự động bóc tách tọa độ từ `[x, y, z]` hoặc các trường riêng lẻ `x, y, z` trong hàm dựng hình 3 chiều `renderOxyz3D`.
  - Cập nhật chuẩn hóa toàn bộ mảng `coords: [x, y, z]` cho tất cả điểm mốc không gian trên cả 5 chặng trong file `stages.js`.
  - Đồng bộ và tái tạo tệp chạy độc lập `CHOI_THU_1_MAY.html` và tái khởi động máy chủ nền (Port 3000) với kiểm thử tự động đạt 100% kết quả thành công.

---

## [2.2.0] - 2026-11-03

### Added
- **Hoàn Thiện Toàn Diện Hệ Thống Âm Thanh Tổng Hợp Web Audio:**
  - Nâng cấp bộ máy âm thanh Web Audio API không phụ thuộc file ngoài: Âm chuông chiến thắng (Đô-Mi-Sol-Đố arpeggio), âm rít pháo Laser năng lượng, âm vung kiếm chém quái, âm thi triển kỹ năng ma thuật và nhạc Fanfare rộn rã khi chiến thắng.
- **Hiệu Ứng Pháo Hoa Giấy Ăn Mừng Chiến Thắng (`Confetti Canvas`):**
  - Tích hợp hiệu ứng pháo hoa giấy confetti 7 màu rơi bồng bềnh khi học sinh vượt qua từng chặng, khi mở được Lõi Trí Tuệ cuối cùng và khi Giáo viên bật Sân khấu vinh danh.
- **Định Dạng Công Thức Toán Học Chuẩn Mực (`formatMath`):**
  - Tự động định dạng các ký hiệu vectơ $\vec{AB}$, $\vec{u}$, tích vô hướng $\vec{u}\cdot\vec{v}$, điều kiện trực giao $\vec{u}\perp\vec{v}$, căn bậc hai $\sqrt{\dots}$ và số mũ theo chuẩn typography giáo khoa GDPT 2018.
- **Bộ Công Cụ Điều Hành Nhanh Cho Giáo Viên:**
  - Nút **📢 Nhắn gửi toàn lớp**: Giáo viên gửi thông báo/gợi ý hiển thị dạng banner nổi bật ngay tức thì trên màn hình học sinh.
  - Nút **💖 Hồi 3 khiên cả lớp**: Nạp đầy năng lượng hỗ trợ khi học sinh gặp bài toán hóc búa.
  - Nút **✨ Thưởng nóng +5 XP & +50 Vàng**: Động viên tinh thần học tập tích cực.
  - Bảng **🧊 Chiếu Mô hình 3D Oxyz Lên Bảng Giảng**: Cho phép giáo viên lựa chọn và chiếu trực tiếp mô hình không gian 3 chiều của bất kỳ chặng nào lên màn hình lớn.
- **Kịch Bản Giảng Dạy 45 Phút & Sổ Tay Giáo Viên:**
  - Hoàn thiện tài liệu `HUONG_DAN_GIAO_VIEN.md` với kịch bản phân bổ thời lượng 6 hoạt động cho tiết dạy ôn tập 45 phút chuẩn hội thi GVG.
- **Đồng bộ hóa Trọn vẹn:**
  - Đóng gói toàn bộ các cải tiến mới vào file độc lập `CHOI_THU_1_MAY.html` (kích thước ~167KB).

---

## [2.1.0] - 2026-11-03

### Added
- **Mô hình Hình học Không gian 3D Oxyz Hologram Tương Tác (`Interactive 3D Oxyz Visualizer`):**
  - Xây dựng bộ dựng hình không gian 3 chiều trực tiếp (`renderOxyz3D`) với phép chiếu góc phối cảnh chuẩn Toán THPT GDPT 2018 (trục $Ox$ đỏ, trục $Oy$ lục, trục $Oz$ lam, mặt phẳng lưới đáy $Oxy$).
  - Tích hợp các nút điều khiển góc nhìn 3D trực quan: Xoay góc ngang (`↺/↻`), thay đổi góc nghiêng (`📐`) và bật/tắt đường gióng tọa độ hình chiếu vuông góc $(x, y, 0) \to (x, 0, 0), (0, y, 0)$.
  - Bổ sung bộ dữ liệu hình học không gian `visual3D` cho cả 15 lượt chơi thuộc 5 chặng (tọa độ điểm $A, B, I$, vectơ $\vec{AB}$, công thức KaTeX trọng tâm, tích vô hướng $\vec{u}\cdot\vec{v}$, độ dài đoạn thẳng và điều kiện cùng phương).
- **Bản Đồ Lục Địa 5 Chặng Oxyz (`World Journey Islands Map`):**
  - Thiết kế 5 hòn đảo nổi đại diện cho 5 vùng đất Oxyz với viền màu Biome phát sáng, thẻ danh hiệu, đánh giá 3 sao (`⭐⭐⭐`) theo số lượt hoàn thành và cơ chế chuyển nhanh chặng bằng 1 cú nhấp chuột.
- **Nâng Cấp Đồ Họa AAA & Trải Nghiệm Người Chơi:**
  - **Săn Kho Báu 2D (`HuntMapEngine`):** Địa hình SVG đa lớp phong phú (dòng sông cổ, cầu gỗ, vòng đá cổ Atlantis, mỏ tinh thể pha lê neon, đom đóm phát sáng, núi lửa), **Mini-Map Radar** thu nhỏ ở góc màn hình, **La bàn chỉ hướng Trạm mục tiêu (`Compass Arrow`)** và hiệu ứng cuộn giấy chiến đấu với bộ vector art sinh động cho Boss canh trạm.
  - **Bảo Vệ Thành Trì (`CastleDefenseEngine`):** Thành Trì SVG đa tầng với tháp Pháo Laser, hiệu ứng **Tia Laser Đại Bác Oxyz (`cd-laser-beam`)** quét sạch quái vật trên màn hình khi học sinh giải đúng bài toán, hiệu ứng rung màn hình (`screen-shake`), hiệu ứng thời tiết toàn màn hình cho 4 Kỹ năng (Mưa tên, Bão tuyết đóng băng quái 6s, Hồi máu, Khiên Lục Giác) và nút **⛶ Toàn màn hình** phục vụ máy chiếu.
  - **Hệ thống Chuỗi Combo & Thưởng Vàng:** Đội trả lời đúng liên tiếp sẽ tích lũy chuỗi Combo (`🔥 Combo x2, x3...`) nhận thêm tới +120 Vàng mỗi câu hỏi.
- **Đồng bộ hóa Hoàn hảo:**
  - Cập nhật đồng bộ toàn bộ đồ họa và tính năng mới vào tệp độc lập `CHOI_THU_1_MAY.html` (kích thước ~159KB, mở trực tiếp bằng trình duyệt không cần cài đặt hoặc mạng).

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
