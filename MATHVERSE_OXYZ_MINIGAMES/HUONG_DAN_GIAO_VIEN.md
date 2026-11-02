# MATHVERSE OXYZ – 5 MINI-GAME THEO HÀNH TRÌNH

**Toán 12 – Vectơ và hệ trục tọa độ trong không gian (Oxyz)**  
**Bản nâng cấp:** 5 chặng, **mỗi chặng có 3 lượt mini-game**, nhân vật đội, bản đồ, nhiệm vụ hợp tác, gợi ý, mảnh mã, điểm XP, theo dõi giáo viên và trao thưởng.

## 1. Hai cách chơi

**A. Xem thử một máy, không cần cài gì:** Mở `CHOI_THU_1_MAY.html` bằng Chrome / Edge. Ở đầu trang chọn:

- **▶ Vào đội Rồng Xanh** để trải nghiệm đủ 5 mini-game.
- **👩‍🏫 Xem màn hình giáo viên** để xem bản đồ, xếp hạng, bảng đáp án, điều khiển.
- Sau khi bấm “Đổi màn hình”, cô có thể chuyển vai; đây là mô phỏng **trên cùng một máy**, không đồng bộ điện thoại, dữ liệu demo khởi động lại khi tải lại trang.

**B. Nhiều đội trên điện thoại, giáo viên quan sát trực tiếp:**

1. Giải nén ZIP, giữ nguyên cấu trúc thư mục.
2. Cài Node.js LTS nếu máy chưa có (nodejs.org).
3. Windows: bấm đúp `CHAY_GAME_WINDOWS.bat`. Mac/Linux: mở Terminal trong thư mục và chạy `node server.js`.
4. Giáo viên vào `http://localhost:3000`, chọn 4–8 đội và **Tạo phòng**.
5. Trên cửa sổ máy chủ sẽ xuất hiện địa chỉ IP của máy giáo viên, ví dụ `http://192.168.1.20:3000`. Học sinh kết nối **cùng Wi‑Fi/LAN**, nhập URL/IP **thực tế**, mã phòng và mã đội do giáo viên phát riêng.
6. Mỗi đội có một mã PIN. Cả nhóm thảo luận và thống nhất câu trả lời trước khi bấm. Nên có **một thiết bị đại diện/đội** để tránh nộp đồng thời.
7. Chiếu **màn hình giáo viên**: bản đồ tự cập nhật, nhân vật đội, số chặng, lượt chơi 1/3–3/3, khiên, XP, bảng xếp hạng và nhật ký hành động.
8. Kết thúc: **Công bố giải thưởng**, **Xuất CSV** để lưu kết quả. Trình duyệt của máy giáo viên vẫn phải mở khi chơi; máy chủ `node server.js` phải chạy liên tục.

**Không cần Internet trong giờ học** sau khi đã cài Node.js: chỉ cần một mạng LAN/Wi‑Fi nội bộ cho các thiết bị. Một số mạng trường học bật cách ly thiết bị; hãy thử hai điện thoại trước tiết học.

## 2. Cốt truyện dẫn nhập

> “Bóng Đen Lãng Quên đã chia Lõi Trí Tuệ của Thành phố Oxyz thành năm mảnh. Để giải cứu thành phố, các biệt đội phải đi qua năm vùng đất đặc biệt: Rừng Vectơ, Pháo đài Vuông Góc, Tháp Pha Lê, Mê Cung Không Gian và Thành Trì Cuối. Nhưng mỗi vùng đất không chỉ có một câu hỏi. Các em phải **chơi 3 lượt mini-game** mới nhận được mảnh mã. Mỗi lựa chọn đúng giúp nhân vật đánh bại chướng ngại vật và tiến lên. Sai sẽ mất khiên và nhận gợi ý từ NOVA. Hãy hợp tác, hoàn thành đủ mật mã và mở Lõi Trí Tuệ!”

**Lưu ý minh bạch:** NOVA là nhân vật trợ lý hư cấu trong cốt truyện. Phần chấm đáp án dùng quy tắc trong mã chương trình, **không tích hợp một mô hình AI trực tuyến**. Bộ mini-game do chúng tôi tạo độc lập theo phong cách săn kho báu/phòng thủ thành trì, **không sao chép hoặc nhúng trực tiếp trò chơi của hai website tham khảo**.

## 3. Luật chơi và cách tính điểm

- Mỗi đội có **nhân vật đại diện** và 5 chặng được khóa tuần tự.
- **Mỗi chặng gồm 3 lượt**, đều phải vượt qua để mở chặng tiếp theo. Qua trọn chặng sẽ nhận **một chữ số mật mã**.
- Điểm khi vượt chặng: **20 XP** nếu đúng cả 3 lượt ngay từ đầu và không xin gợi ý; **12 XP** nếu tổng số lần sai trong chặng từ 1 đến 2 hoặc có dùng gợi ý; **8 XP** nếu sai 3 lần trở lên.
- Mỗi lần trả lời sai sẽ mất 1 khiên (tối thiểu còn 0). **Hết khiên không bị loại**, vẫn có thể học lại và thử tiếp – phù hợp mục tiêu ôn tập.
- Giải đúng mật mã 5 chữ số và thông điệp: **+20 XP**.
- Giáo viên có thể ghi nhận **0–10 XP hợp tác** cho mỗi đội (mức điểm được thay thế, không cộng lặp).
- **Tổng điểm tối đa 130 XP/đội**. Xếp hạng theo XP, nếu hòa điểm ưu tiên đội hoàn thành trước.
- Tạm dừng game trên màn hình giáo viên sẽ chặn các lượt nộp đáp án. Đồng hồ được điều khiển riêng.

## 4. Hành trình năm mini-game: 15 lượt chơi

### 🏝️ CHẶNG 1 – SĂN KHO BÁU TỌA ĐỘ

**Cơ chế:** Nhân vật thuyền khám phá 3 hòn đảo. Mỗi đảo mở một rương số, dùng các thành phần của vectơ AB.  
**Dữ kiện:** A(2; −1; 3), B(5; 1; 7).

| Lượt | Yêu cầu | Đáp án | Công thức / gợi ý |
|---|---|---|---|
| 1 | Thành phần x của AB | **B – 3** | 5 − 2 = 3 |
| 2 | Thành phần y của AB | **B – 2** | 1 − (−1) = 2 |
| 3 | Thành phần z của AB | **C – 4** | 7 − 3 = 4 |

**Mảnh mật mã:** `3` (hiệu hoành độ). **Vật phẩm:** La bàn ba trục.  
**Nhiệm vụ hợp tác:** ba học sinh tính ba thành phần, đội trưởng rà kết quả.

### 🏰 CHẶNG 2 – THỦ THÀNH TRỰC GIAO

**Cơ chế:** Ba đợt quái vật tiến đến lâu đài. Chạm nút mục tiêu mang kết quả đúng để bắn, sai sẽ mất một khiên.  

| Đợt | Yêu cầu | Đáp án | Lời giải |
|---|---|---|---|
| 1 | u=(1;2;−2), v=(2;0;1), tính u·v | **B – 0** | 2+0−2=0 |
| 2 | a=(2;−1;3), b=(1;1;−1), tính a·b | **B – −2** | 2−1−3=−2 |
| 3 | c=(1;1;1), d=(2;−1;−1), tính c·d | **C – 0** | 2−1−1=0 |

**Mảnh mật mã:** `0` (kết quả đợt 1). **Vật phẩm:** Khiên trực giao.  
**Nhiệm vụ hợp tác:** tính từng tích, kiểm tra các dấu âm, giải thích vuông góc khi tích vô hướng bằng 0 của hai vectơ khác 0.

### 💠 CHẶNG 3 – LÒ RÈN PHA LÊ

**Cơ chế:** Chọn đúng pha lê để kích hoạt ba ổ trong lò rèn, sau đó tính độ dài đoạn thẳng.  
**Dữ kiện:** A(1;2;−1), B(4;6;−1).

| Lượt | Yêu cầu | Đáp án | Lời giải |
|---|---|---|---|
| 1 | Hiệu hoành độ Δx | **B – 3** | 4−1=3 |
| 2 | Hiệu tung độ Δy | **D – 4** | 6−2=4 |
| 3 | Độ dài AB với Δz=0 | **C – 5** | √(3²+4²)=5 |

**Mảnh mật mã:** `5`. **Vật phẩm:** Tinh thể khoảng cách.  
**Nhiệm vụ hợp tác:** phân chia các hiệu tọa độ, một học sinh tính độ dài, người khác kiểm tra.

### 🌀 CHẶNG 4 – MÊ CUNG TRUNG ĐIỂM

**Cơ chế:** Chọn đúng cửa ở mỗi ngã rẽ. Mỗi bước giải phóng một trục của tọa độ trung điểm.  
**Dữ kiện:** A(0;−2;4), B(4;2;0).

| Lượt | Yêu cầu | Đáp án | Lời giải |
|---|---|---|---|
| 1 | Hoành độ trung điểm | **C – 2** | (0+4)/2=2 |
| 2 | Tung độ trung điểm | **A – 0** | (−2+2)/2=0 |
| 3 | Cao độ trung điểm | **C – 2** | (4+0)/2=2 |

**Mảnh mật mã:** `2`. **Vật phẩm:** Bản đồ mê cung.  
**Nhiệm vụ hợp tác:** ba người tính ba trục, một người quyết định cửa.

### 🐲 CHẶNG 5 – TRẬN ĐÁNH BOSS CUỐI

**Cơ chế:** Boss có ba lớp giáp, mỗi đáp án đúng phá một lớp. Kết thúc nhận mảnh mã cuối.  
**Dữ kiện:** u=(m;2;4), v=(2;1;2).

| Lượt | Yêu cầu | Đáp án | Lời giải |
|---|---|---|---|
| 1 | Hệ số k sao cho u=kv từ hai tọa độ cuối | **B – 2** | 2/1=4/2=2 |
| 2 | Giá trị m để hai vectơ cùng phương | **C – 4** | m=2×2=4 |
| 3 | Chọn cặp vectơ cùng phương | **A – (4;2;4) và (2;1;2)** | Vectơ trước bằng 2 lần vectơ sau |

**Mảnh mật mã:** `4`. **Vật phẩm:** Chìa khóa Lõi Trí Tuệ.

## 5. Kho báu cuối

Mảnh chữ số theo thứ tự chặng: **3 – 0 – 5 – 2 – 4**.  
**Mã khóa: `30524`**. Bảng giải mã:

- 3 → **TƯ DUY**
- 0 → **VÀ**
- 5 → **HỢP TÁC**
- 2 → **MỞ**
- 4 → **KHO BÁU**

**Thông điệp chiến thắng:** **TƯ DUY VÀ HỢP TÁC MỞ KHO BÁU**.  
Học sinh phải nhập mã và chọn đúng thông điệp trong 3 lựa chọn; hệ thống mới trao 20 XP cuối.

## 6. Kịch bản phân bổ một tiết 45 phút

| Hoạt động | Thời gian |
|---|---:|
| NOVA kể chuyện, chia đội, phổ biến luật | 4 phút |
| Săn kho báu tọa độ | 5 phút |
| Thủ thành trực giao | 6 phút |
| Lò rèn pha lê | 6 phút |
| Mê cung trung điểm | 7 phút |
| Boss cuối | 8 phút |
| Ghép mật mã, giải thông điệp | 4 phút |
| GV chốt các lỗi sai, công bố bảng điểm và trao thưởng | 5 phút |
| **Tổng** | **45 phút** |

## 7. Giáo viên quan sát, đánh giá, trao thưởng

Trên dashboard giáo viên: avatar đội di chuyển khi hoàn thành chặng; mỗi đội còn thấy **lượt đang chơi** (1/3, 2/3, 3/3), khiên, XP, hoàn thành hay chưa, nhật ký sự kiện. Nút **Tạm dừng** cho phép chốt một khái niệm nếu nhiều đội đang sai. Bấm **Công bố giải thưởng** để hiển thị ba vị trí cao nhất và giải hợp tác. Bấm **Xuất CSV** để lưu: đội, chặng, lượt, số lần sai, khiên, XP, điểm hợp tác, thành tích giải mã và thời gian hoàn thành.

## 8. Các lưu ý quan trọng

- **Không đăng ảnh chứa mã của tất cả đội** từ màn hình giáo viên lên nhóm chung.
- Đây là **game web**: đội tự thao tác trên điện thoại nhưng chỉ một người đại diện nộp lựa chọn để tránh gửi trùng.
- Máy giáo viên lưu phòng trong `data/rooms.json`; muốn chạy lớp mới nên tạo phòng mới, không tự ý gửi file lưu phòng cho học sinh vì nó chứa mã đăng nhập.
- Các địa chỉ bên dưới chỉ dùng để tham khảo **phong cách**; game MATHVERSE là mini-game được tạo riêng, **không nhúng nguyên bản game của bên thứ ba**:
  - https://giaoviendoimoi.com/hunt-preview/__demo__
  - https://giaoviensangtao.vn/play/castle-defense/thu-nghiem
- Nên kiểm tra trước với một laptop giáo viên + hai điện thoại học sinh; nội dung và kết quả chỉ phù hợp ôn tập, không thay thế đánh giá định kỳ.
