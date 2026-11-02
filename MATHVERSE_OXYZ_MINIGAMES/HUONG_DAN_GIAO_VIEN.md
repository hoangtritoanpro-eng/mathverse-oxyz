# MATHVERSE OXYZ – HỆ THỐNG 5 CHẶNG GAME TƯƠNG TÁC NHÓM
## Tích hợp 2 Cơ chế: Săn Kho Báu 2D (Map) & Bảo Vệ Thành Trì (Real-time)

**Môn học:** Toán 12 (Chương trình GDPT 2018) – Chương: Vectơ và Hệ trục tọa độ trong không gian ($Oxyz$)  
**Giáo viên thực hiện:** Đinh Thị Thảo Nguyên – Trường THPT Số 1 Phan Chu Trinh (Đắk Lắk)

---

## 1. Điểm đột phá của phiên bản nâng cấp

Hệ thống **MathVerse Oxyz** được thiết kế với **2 Game Engine tương tác thực thụ** cho phép học sinh tham gia theo nhóm (4–8 đội) và có thể chuyển đổi linh hoạt ngay trong mỗi chặng:

1. **🗺️ Chế độ Săn Kho Báu 2D (Scavenger Hunt Map):**
   - Bản đồ thế giới 2D rộng lớn (Rừng Vectơ, Thung Lũng Pha Lê, Mê Cung Không Gian) có địa hình, tường đá, cây cối, ánh đuốc và camera tự động di chuyển theo nhân vật của Đội.
   - Học sinh điều khiển nhân vật bằng **phím `WASD` / Mũi tên**, **chạm/click trực tiếp lên bản đồ** để nhân vật tự bước đi, sử dụng **cụm phím D-Pad ảo** trên điện thoại hoặc bấm nút **Đi tới Trạm I, II, III**.
   - Khi nhân vật tiến vào vòng hào quang của Trạm, **Cuộn Giấy Chiến Đấu Quái Vật** bật lên: hiển thị phân công nhiệm vụ cho từng thành viên trong nhóm, câu hỏi Toán $Oxyz$ (hỗ trợ cả chọn đáp án `A, B, C, D` và nhập trực tiếp đáp án số), nút **🏃 Rút lui** và **⚔️ Tấn công**.
   - Giải đúng sẽ kích hoạt hiệu ứng nổ `💥` đánh bại quái vật và hiệu ứng **Chìa khóa tọa độ bay vào túi đồ** trên thanh HUD.

2. **🏰 Chế độ Bảo Vệ Thành Trì Thời Gian Thực (Castle Defense):**
   - Chiến trường 3 làn đường thời gian thực (`60fps`) với **Thành Trì Oxyz** (có thanh máu `Castle HP` & lá chắn `Castle Shield`) cùng **3 Anh Hùng** (`🏹 Cung Thủ Ox`, `🧙‍♂️ Pháp Sư Oy`, `🛡️ Hiệp Sĩ Oz`) tự động bắn tên và phép thuật ngăn chặn các đợt Quái vật (`Goblin`, `Dơi`, `Bộ Xương`, `Orc`, `Boss Rồng`).
   - Ngay bên dưới chiến trường là **Bảng Câu Hỏi Pháo Kích Toán Học**: Nhóm học sinh thảo luận và giải đúng bài toán $Oxyz$ sẽ nhận ngay **+120 Vàng**, **+XP lên cấp** và kích hoạt **Đòn Pháo Kích Tọa Độ** tiêu diệt toàn bộ đợt quái vật!
   - Cột bên phải là **Bảng Nâng Cấp Đội Quân**: Dùng Vàng tích lũy để nâng cấp **⚔️ Sát thương**, **⚡ Tốc độ bắn**, **❤️ Máu & Giáp Thành Trì**, **🔧 Kỹ sư Hồi phục**, kết hợp bấm **4 Kỹ năng chủ động** (`🌧️ Mưa Tên`, `❄️ Băng Giá`, `💚 Hồi Máu`, `🛡️ Khiên Thành`).

---

## 2. Hai cách tổ chức trên lớp

### Cách A: Chơi thử & Trình chiếu ngay trên 1 máy (Không cần cài đặt)
1. Nhấp đúp mở file `CHOI_THU_1_MAY.html` bằng trình duyệt Chrome, Edge hoặc Safari.
2. Bấm **▶ VÀO ĐỘI RỒNG XANH (CHƠI NGAY)** để trải nghiệm trực tiếp cả 5 chặng, hoặc dùng thanh **⚡ Chuyển nhanh Chặng 1..5** để trình chiếu từng dạng bài trước lớp / Hội đồng Giám khảo.
3. Bấm **👩‍🏫 XEM MÀN HÌNH GIÁO VIÊN** để xem bản đồ điều hành lớp học, bảng xếp hạng, đáp án và sân khấu vinh danh.

### Cách B: Nhiều nhóm học sinh cùng chơi trên điện thoại qua Wi-Fi/LAN (Không cần Internet)
1. Trên máy tính giáo viên (đã cài Node.js LTS), nhấp đúp `CHAY_GAME_WINDOWS.bat` (hoặc chạy `node server.js`).
2. Giáo viên mở `http://localhost:3000`, chọn số đội (4–8 đội) và bấm **✨ TẠO PHÒNG MATHVERSE**.
3. Học sinh dùng điện thoại kết nối chung Wi-Fi/LAN, truy cập địa chỉ IP hiển thị trên màn hình giáo viên (ví dụ `http://192.168.1.20:3000`), nhập **Mã phòng 6 chữ số** và **Mã PIN 4 chữ số** của đội mình.

---

## 3. Phân bổ 5 Chặng Kiến thức Toán 12 ($Oxyz$) & Đáp án

| Chặng | Tên chặng & Bối cảnh | Chế độ mặc định | Kiến thức $Oxyz$ trọng tâm | Đáp án 3 lượt | Mảnh mã |
| :---: | :--- | :---: | :--- | :---: | :---: |
| **1** | **Săn Kho Báu Tọa Độ** *(Rừng Vectơ)* | 🗺️ Săn Kho Báu 2D | Tọa độ $\vec{AB} = (x_B-x_A; y_B-y_A; z_B-z_A)$ với $A(2;-1;3), B(5;1;7)$ | L1: **B (3)**<br/>L2: **B (2)**<br/>L3: **C (4)** | **`3`** |
| **2** | **Bảo Vệ Thành Trì Trực Giao** *(Pháo Đài Vuông Góc)* | 🏰 Bảo Vệ Thành Trì | Tích vô hướng $\vec{u}\cdot\vec{v}$ & điều kiện vuông góc $\vec{u}\cdot\vec{v}=0$ | L1: **B (0)**<br/>L2: **B (-2)**<br/>L3: **C (0)** | **`0`** |
| **3** | **Thung Lũng Pha Lê** *(Tháp Pha Lê)* | 🗺️ Săn Kho Báu 2D | Khoảng cách $AB = \sqrt{\Delta x^2 + \Delta y^2 + \Delta z^2}$ với $A(1;2;-1), B(4;6;-1)$ | L1: **B (3)**<br/>L2: **D (4)**<br/>L3: **C (5)** | **`5`** |
| **4** | **Mê Cung Trung Điểm** *(Mê Cung Không Gian)* | 🗺️ Săn Kho Báu 2D | Tọa độ trung điểm $I = \left(\frac{x_A+x_B}{2}; \frac{y_A+y_B}{2}; \frac{z_A+z_B}{2}\right)$ với $A(0;-2;4), B(4;2;0)$ | L1: **C (2)**<br/>L2: **A (0)**<br/>L3: **C (2)** | **`2`** |
| **5** | **Đại Chiến Boss Bóng Đen** *(Thành Trì Cuối)* | 🏰 Bảo Vệ Thành Trì | Hai vectơ cùng phương $\vec{u}=k\vec{v}$ với $\vec{u}=(m;2;4), \vec{v}=(2;1;2)$ | L1: **B (2)**<br/>L2: **C (4)**<br/>L3: **A** | **`4`** |

- **Mật mã Rương Lõi Trí Tuệ cuối cùng:** **`30524`**
- **Thông điệp giải mã:** **TƯ DUY VÀ HỢP TÁC MỞ KHO BÁU** (+20 XP).
