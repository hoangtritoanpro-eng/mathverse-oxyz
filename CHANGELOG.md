# Changelog

Tất cả những thay đổi quan trọng của dự án này sẽ được ghi nhận tại file này theo chuẩn [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Planned
- **Phase 4:** Xây dựng Kế hoạch bài dạy (Giáo án 45 phút) minh họa 1 tiết thực hành và Slide trình chiếu thuyết trình biện pháp 30 phút.

---

## [5.5.6] - 2026-11-08

### Fixed (Đồng Bộ Kết Quả Trực Tiếp Từ Đội Học Sinh Lên Màn Hình Giáo Viên & Màn Hình Trình Chiếu Lớp Học)
- **Khắc Phục Triệt Để Lỗi Kết Quả Đội Chơi Không Hiển Thị Trên Màn Hình Giáo Viên / Trình Chiếu (`MATHVERSE_OXYZ_MINIGAMES/server.js`, `MATHVERSE_OXYZ_MINIGAMES/public/app.js`):**
  1. **Trả về đầy đủ `digits` (5 Ấn Vectơ) và thống kê cho cả Chế độ Trình chiếu (`token === 'DISPLAY'`) trong `roomState()` (`server.js`):** Trước đây `digits: teacher ? t.digits : undefined` làm chế độ `MÀN HÌNH TRÌNH CHIẾU LỚP HỌC` bị ẩn mảng `digits` dẫn đến luôn hiển thị `0/5 Ấn`. Nay cả Giáo viên (`teacher`) và Trình chiếu (`display`) đều nhận đầy đủ số Ấn Vectơ (`0/5` $\rightarrow$ `5/5 Ấn`), trạng thái hoàn thành (`Đích 🏆`), điểm `XP`, `Vàng` và huy hiệu tiến độ cả 5 chặng.
  2. **Đồng bộ tự động liên phòng & Đa phiên Serverless (`GLOBAL_TEAM_PROGRESS`, `syncRoomWithGlobalProgress`, `mergeTeamSnapshot` trong `server.js` & `LiveClassroomSync` trong `public/app.js`):**
     - Khi Giáo viên tạo mã phòng mới (VD: `487084`) nhưng Học sinh bấm nút chơi nhanh `▶ BẮT ĐẦU HÀNH TRÌNH` (hoặc chơi trên tab/thiết bị khác), hệ thống tự động liên kết mã phòng đang hoạt động (`mv_active_room_v2`) và đồng bộ tiến độ các đội xuyên suốt giữa phòng mặc định `123456` với phòng Giáo viên vừa tạo.
     - Bổ sung cơ chế `LiveClassroomSync` (`BroadcastChannel` + `localStorage` + payload `_meSync` & `clientTeamsSync`) giúp đồng bộ tức thì (`0ms` trên cùng máy và `<2s` qua mạng/Vercel Serverless) kể cả khi yêu cầu rơi vào các Serverless Lambda instance khác nhau trên Vercel.
  3. **Tự động cấp đủ 5 Ấn Vectơ và đánh dấu hoàn thành khi giải cứu xong Tâm Thạch Chặng 5 (`ensureTeamFields` & `/api/stage5Progress`):** Khi học sinh hoàn thành giai đoạn kích hoạt trận pháp vectơ ở Chặng 5, hệ thống tự động đảm bảo `stage = 5`, `completed = true` và điền đủ `5/5 Ấn Vectơ` trên bảng xếp hạng.

---

## [5.5.5] - 2026-11-08

### Fixed (Sửa Lỗi Định Tuyến `/api/create` & Đồng Bộ Phòng Học Đa Phiên Trên Vercel Serverless)
- **Khắc Phục Triệt Để Lỗi `"Đường dẫn API không tồn tại."` Khi Tạo Phòng / Vào Đội Trên Vercel (`vercel.json`, `MATHVERSE_OXYZ_MINIGAMES/server.js`, `MATHVERSE_OXYZ_MINIGAMES/public/app.js`):**
  1. **Định tuyến API 4 lớp trên Vercel (`resolveApiEndpoint` & `inferEndpointFromPayload` trong `server.js`):** Khi Vercel rewrite `/api/*` về `/api/index.js`, `req.url` bị chuẩn hóa thành `/api/index.js` khiến `processAction` báo lỗi 404 `"Đường dẫn API không tồn tại."`. Hệ thống nay trích xuất chính xác đường dẫn API từ `d._endpoint` (JSON body), `?endpoint=...` (query string), `?__api=$1` (`vercel.json` rewrite) và tự động suy luận endpoint từ payload (`inferEndpointFromPayload`) giúp tương thích 100% kể cả khi trình duyệt còn lưu cache cũ.
  2. **Khởi tạo & Khôi phục phòng học tất định giữa các Serverless Instances (`createDeterministicRoom`, `getRoom`, `isTeacherToken`, `findTeamByToken`):** Mã phòng 6 chữ số tự động mã hóa số đội ở chữ số cuối và cấp mã PIN cố định dễ nhớ (`1111` $\rightarrow$ `6666`/`8888`), giúp mọi container Serverless của Vercel tự động đồng bộ mã phòng, quyền Giáo viên và mã PIN học sinh mà không bao giờ báo lỗi mất phòng khi chuyển instance.

---

## [5.5.4] - 2026-11-08

### Packaged & Deployed (Đóng Gói Độc Lập 100% Tài Nguyên 5 Chặng & Triển Khai Lên GitHub / Vercel)
- **Đóng Gói Bản Độc Lập 1 File (`MATHVERSE_OXYZ_CHOI_NGAY_1_FILE.html` & `MATHVERSE_OXYZ_MINIGAMES/CHOI_THU_1_MAY.html`), Cấu Hình Vercel (`vercel.json`, `api/index.js`, `package.json`) & Đẩy Lên GitHub (`https://github.com/hoangtritoanpro-eng/mathverse-oxyz`):**
  1. **Nhúng Base64 toàn bộ 43 tài nguyên đồ họa của cả 5 chặng (`scratch/build_standalone.js`):** Tự động quét và đóng gói toàn bộ hình nền, nhân vật Rồng Xanh, bệ đá, zombie, mặt sau thẻ bài và biểu tượng Ấn Vectơ của cả 5 chặng vào 1 file HTML duy nhất để mở trực tiếp trên bất kỳ máy tính/máy chiếu nào không cần cài đặt Node.js hay mạng Internet.
  2. **Tích hợp Serverless Function cho Vercel (`vercel.json`, `api/index.js`, `package.json` & cập nhật `server.js`):** Hỗ trợ tự động lưu trữ trạng thái phòng học trên `/tmp` khi chạy trên môi trường Serverless của Vercel và định tuyến toàn bộ API `/api/*` cùng tài nguyên tĩnh `public/`.
  3. **Triển khai mã nguồn lên GitHub (`https://github.com/hoangtritoanpro-eng/mathverse-oxyz`):** Khởi tạo kho lưu trữ công khai và đồng bộ toàn bộ mã nguồn dự án để kết nối trực tiếp 1-Click với Vercel.
  4. **Bộ khởi động nhanh 1-Click (`KHOI_DONG_GAME_MATHVERSE_OXYZ.bat` & `CHAY_GAME_WINDOWS.bat`) và Gói nén (`MATHVERSE_OXYZ_FULL_DEPLOY_2026.zip`).**

---

## [5.5.3] - 2026-11-08

### Added & Upgraded (Cơ Chế Trừ Điểm Trực Tiếp Khi Trả Lời Sai Xuyên Suốt 5 Chặng)
- **Hệ Thống Điểm Năng Lượng Tăng/Giảm Thời Gian Thực (`applyWrongAnswerPenalty`, `applyCorrectScoreReward`, `syncLiveScoreBadges` trong `public/app.js`, `public/style.css`, `server.js`, `CHOI_THU_1_MAY.html`):**
  1. **Khởi tạo điểm năng lượng & Huy hiệu Điểm XP trực tiếp (`.mv-live-score-pill`) trên cả 5 chặng:** Mỗi đội khởi đầu với **20 XP** năng lượng nền và hiển thị huy hiệu `⭐ XX XP` trực tiếp trên thanh HUD của cả 5 chặng (`#s1TopScoreBadge`, `#s2TopScoreBadge`, `#z3ScorePill`, `#s4ScorePill`, `#s5ScoreBadge`).
  2. **Trừ điểm ngay lập tức kèm hiệu ứng cảnh báo đỏ (`.score-penalty-flash`) khi trả lời sai:**
     - **Chặng 1 (Mật Thư Rừng Vectơ):** Chọn sai đáp án tại bệ đá mật thư hoặc chọn sai chiều vectơ trừ **`−2 XP` đến `−3 XP`** (`/api/stage1Progress` & `/api/answer`), thu thập đúng mảnh mật thư cộng **`+5 XP`**.
     - **Chặng 2 (Mật Trận Vectơ):** Dẫm phải bẫy phép thuật trừ **`−3 XP`** và mất `1 Khiên` (`/api/stage2Progress`), hóa giải đúng bệ đá an toàn cộng **`+5 XP`**.
     - **Chặng 3 (Phòng Thủ Zombie):** Bắn nhầm zombie mang vectơ sai trừ **`−3 XP`** (và để zombie chạm hàng rào trừ **`−4 XP`**) qua `/api/stage3Progress`, bắn đúng cột zombie cộng **`+5 XP` đến `+10 XP`**.
     - **Chặng 4 (Lật Thẻ Trung Điểm):** Lật 2 thẻ không khớp trừ **`−2 XP`** (`/api/stage4Progress`), ghép đúng cặp thẻ cộng **`+5 XP`**.
     - **Chặng 5 (Giải Cứu Tâm Thạch):** Kéo lệch trung điểm, nối sai trung tuyến hoặc đặt lệch Tâm Thạch trừ **`−2 XP`**, chọn sai câu hỏi hiểu sâu (`5.Q1..5.Q3`) trừ **`−3 XP`** (`/api/stage5Progress`). Mọi mức trừ đều giới hạn không âm (`Math.max(0, score - penalty)`) và đồng bộ tức thì lên bảng xếp hạng Giáo viên.

---

## [5.5.2] - 2026-11-08

### Changed & Improved (Tinh Chỉnh Chặng 4 – Lật Thẻ Trung Điểm Dễ Chơi & Trực Quan Hơn Cho Học Sinh)
- **Tối Ưu Độ Khó & Trải Nghiệm Lật Thẻ Chặng 4 (`S4_CARD_PAIRS_BANK`, `s4State`, `CardMatchingController`, `renderStage4MidpointMemoryGame` trong `public/app.js`, `public/style.css`, `server.js`):**
  1. **Mặc định chế độ 8 thẻ (4 cặp cốt lõi `Hình vẽ ⇔ Công thức`):** Bàn chơi mặc định mở **8 thẻ (4 cặp – 2 hàng × 4 cột)** khớp với chỉ báo `Đã ghép: 0 / 4` trong ảnh mẫu, mỗi cặp đều là **1 thẻ Hình vẽ trực quan $\leftrightarrow$ 1 thẻ Công thức ngắn gọn** (`IA = IB`, $\overrightarrow{IA}+\overrightarrow{IB}=\overrightarrow{0}$, $\overrightarrow{MA}+\overrightarrow{MB}=2\overrightarrow{MI}$, $\overrightarrow{AI}=\overrightarrow{IB}=\frac{1}{2}\overrightarrow{AB}$). Giáo viên và học sinh vẫn có thể chuyển sang `12 thẻ (6 cặp)` bất kỳ lúc nào.
  2. **Xem trước tự động (`Auto-Peek 2.2s`) & Nút `👁️ Mở xem 2.5s (2/2)`:** Khi mới vào ván (hoặc khi bấm nút `👁️ Mở xem 2.5s`), toàn bộ thẻ lật ngửa để học sinh quan sát vị trí trước khi úp xuống.
  3. **Nhãn ghi nhớ thông minh trên mặt sau thẻ đã lật (`.s4-card-seen-tag`) & Tự động sáng viền thẻ cùng cặp:** Thẻ nào đã từng được học sinh mở xem 1 lần sẽ lưu nhãn gợi nhớ trên mặt sau (`👁️ Cặp 1 · Hình vẽ`, `👁️ Cặp 1 · Công thức`...). Khi mở thẻ đầu tiên mà thẻ cùng cặp đã từng được mở trước đó, thẻ cùng cặp tự động sáng viền vàng kim giúp học sinh ghép đúng ngay mà không bị rối trí nhớ.
  4. **Bảng tóm tắt nhanh `📜 Kiến thức: Trung điểm I của AB` (`.s4-quick-theory-parchment`):** Hiển thị ngay ở cột trái phía trên hộp thoại Rồng Xanh để học sinh đối chiếu công thức trực tiếp trên màn hình, kết hợp tăng lượt `💡 Gợi ý cặp thẻ` lên `3/3` và cho phép bấm sang thẻ tiếp theo ngay lập tức mà không bị khóa chờ.
  5. **Chuẩn hóa ký hiệu mũi tên vectơ trên đầu chữ trong hình vẽ SVG (`P2_A`, `P4_A`, `GA, GB, GC`):** Thay thế hoàn toàn ký tự Unicode kết hợp `\u20D7` (dễ bị lỗi ô vuông `▯` trên Windows) bằng nét vẽ mũi tên SVG trực tiếp phía trên đầu chữ cái ($\overrightarrow{IA}, \overrightarrow{IB}, \overrightarrow{AI}, \overrightarrow{GA}, \overrightarrow{GB}, \overrightarrow{GC}$).

---

## [5.5.1] - 2026-11-07

### Added & Upgraded (Bổ Sung Chuỗi 3 Câu Hỏi Hiểu Sâu Sau Khi Nối & Đặt Trọng Tâm G Ở Chặng 5)
- **Tích Hợp Hộp 3 Câu Hỏi Hiểu Sâu Trọng Tâm (`getS5CentroidQuestions`, `#s5DeepQuizBox`, `CentroidStage5.selectQuizChoice`, `CentroidStage5.submitQuizAnswer` trong `public/app.js`, `public/style.css`, `server.js`):**
  1. **Luồng khám phá hình học kết hợp giải mã bản chất vectơ (Giai đoạn 4):** Ngay sau khi học sinh nối hai đường trung tuyến và đặt viên **Tâm Thạch** vào đúng trọng tâm $G = (A+B+C)/3$, tam giác $ABC$ vẫn hiển thị trực quan phía trên cùng tỉ lệ `2 phần : 1 phần` và 3 tia vectơ $\overrightarrow{GA}, \overrightarrow{GB}, \overrightarrow{GC}$, đồng thời mở hộp 3 câu hỏi hiểu sâu liên tiếp (`#s5DeepQuizBox`):
     - **Câu 1/3 (`5.Q1` – Tỉ số vàng $2:1$ trên đường trung tuyến):** Phân biệt chiều và độ dài vectơ trên trung tuyến $AM$ để chọn đúng $\overrightarrow{AG} = \frac{2}{3}\overrightarrow{AM}$ (và hiểu vì sao $\overrightarrow{GA} = -2\overrightarrow{GM}$).
     - **Câu 2/3 (`5.Q2` – Hệ thức cân bằng lực tại trọng tâm $G$):** Kết hợp tính chất trung điểm $\overrightarrow{GB} + \overrightarrow{GC} = 2\overrightarrow{GM}$ (từ Chặng 4) và $\overrightarrow{GA} = -2\overrightarrow{GM}$ (từ Câu 1) để suy ra $\overrightarrow{GA} + \overrightarrow{GB} + \overrightarrow{GC} = \overrightarrow{0}$.
     - **Câu 3/3 (`5.Q3` – Hệ thức với điểm $M$ bất kỳ & gốc tọa độ Oxyz):** Dùng quy tắc chèn điểm $G$ để rút ra $\overrightarrow{MA} + \overrightarrow{MB} + \overrightarrow{MC} = 3\overrightarrow{MG}$ — cơ sở trực tiếp của công thức tọa độ trọng tâm $G = \frac{A+B+C}{3}$ trong không gian Oxyz.
  2. **Mở khóa công thức lũy tiến & Đồng bộ Giáo viên:** Thanh công thức `#s5VectorFormulaBanner` giữ trạng thái khóa (`🔒 Giải mã Câu 1/3`, `2/3`, `3/3`) để không làm lộ đáp án trước, và lần lượt sáng lên thành công thức chuẩn sau khi học sinh giải đúng từng câu. Tiến độ `quizSolvedCount` (`0..3`) được đồng bộ thời gian thực qua `/api/stage5Progress` lên Dashboard Giáo viên và bản chơi thử 1 máy (`CHOI_THU_1_MAY.html`).

---

## [5.5.0] - 2026-11-07

### Added & Upgraded (Triển Khai Chặng 5 – Giải Cứu Tâm Thạch: Bí Mật Trọng Tâm Tam Giác)
- **Xây Dựng Mini-Game Kéo Thả & Tương Tác Hình Học Trọng Tâm Tam Giác Mức Độ Thông Hiểu (`renderStage5CentroidRescueGame`, `TriangleGeometry`, `Stage5GameState`, `MidpointDragController`, `MedianConnectionController`, `CrystalDragController`, `CentroidStage5` trong `public/app.js`, `public/style.css`, `stages.js`, `server.js`):**
  1. **Giao Diện & Bối Cảnh Khớp Chuẩn Hình Ảnh Tham Chiếu (`media_1794059608488_6807f589.jpg`):**
     - **A. Bối cảnh Thành Trì Trí Tuệ (`.s5-centroid-shell`, `public/assets/s5_citadel/s5_citadel_bg.jpg`):** Sân đá cổ hình tròn có ký hiệu phép thuật phát sáng cyan, lâu đài trên đỉnh thác tím và cầu vòm đá cổ phía sau, cờ hiệu tam giác tím cùng các bệ pha lê xanh ngọc và hạt phép thuật bay lơ lửng.
     - **B. Thanh tiêu đề trên cùng (`.s5-top-header`):** Huy hiệu sách ngọc `MATHVERSE OXYZ` + nút `🏠` bên trái, bảng tên trung tâm viền vàng kim `CHẶNG 5 – GIẢI CỨU TÂM THẠCH` kèm phụ đề `✦ Trọng tâm tam giác ✦`, nút âm thanh và toàn màn hình bên phải.
     - **C. Khu vực trò chơi hình học trung tâm (~65–70% chiều rộng – `.s5-center-geometry-arena`):** Sơ đồ SVG tương tác trực tiếp (`#s5GeometrySvg`, `viewBox="0 0 800 540"`) với ba đỉnh $A(360, 84)$, $B(168, 432)$, $C(588, 432)$, các trung điểm tính bằng $M = (P_1+P_2)/2$, các đường trung tuyến, trọng tâm $G(372, 316)$ tính bằng $G = (A+B+C)/3$ (ẩn chữ $G$ trước khi học sinh đặt đúng Tâm Thạch), và viên **Tâm Thạch** vàng kim đa diện có thể kéo thả.
     - **D. Khu vực Rồng Xanh bên trái (`.s5-left-dragon-col`):** Nhân vật **Rồng Xanh** (`RongXanh.png`) kèm bong bóng thoại dẫn dắt từng bước và giải thích toán học trực quan.
     - **E. Sidebar bên phải (`.s5-right-sidebar`):** Đồng hồ `70 giây` (`01:10`), chuỗi tiến độ 5 chặng (`✓-✓-✓-✓-(5)`) + 4 bước con, 3 ô gợi ý theo ngữ cảnh `(1) 📖`, `(2) 📐`, `(3) 2:1`, và phần thưởng cuối cùng **Huy hiệu Ấn Trí Tuệ** (`public/assets/s5_citadel/s5_seal_emblem.png`).
     - **F. Thanh điều khiển bên dưới (`.s5-bottom-control-bar`):** Ba nút tròn dài `💡 Gợi ý`, `📊 Kiến thức`, `🧠 Ấn Trí Tuệ · TV X/4` và nút lục giác vàng kim lớn `XÁC NHẬN` ở chính giữa.
  2. **Cơ Chế Gameplay 4 Giai Đoạn Hình Học Liên Tiếp + Giai Đoạn 5 Chiến Thắng:**
     - **Giai đoạn 1 (0–15 giây) – Tìm trung điểm (`MidpointDragController`):** Học sinh kéo hai điểm sáng trên cạnh $BC$ và $AC$ về đúng trung điểm $M_{BC}(378, 432)$ và $M_{AC}(474, 258)$. Khi đặt đúng: phát sáng xanh ngọc, hiện dấu `✓` và vạch chia hai đoạn bằng nhau (`||`, `|`); khi đặt lệch: đổi màu tím nhạt và Rồng Xanh nhắc *"Hãy tìm vị trí chia cạnh thành hai phần bằng nhau!"*.
     - **Giai đoạn 2 (15–30 giây) – Kích hoạt trung tuyến (`MedianConnectionController`):** Học sinh kéo nối từ đỉnh $A$ đến trung điểm cạnh $BC$ và từ đỉnh $B$ đến trung điểm cạnh $AC$. Hai đường trung tuyến phát sáng và tạo giao điểm nhưng chưa hiện chữ $G$.
     - **Giai đoạn 3 (30–50 giây) – Đặt Tâm Thạch vào Trọng tâm (`CrystalDragController`):** Học sinh kéo viên **Tâm Thạch** vàng kim vào đúng giao điểm $G = (A+B+C)/3$. Khi đặt đúng ($\text{dist} \le 36$): Tâm Thạch khóa vào $G$, hiện nhãn $G$, trung tuyến thứ ba từ $C$ đến trung điểm $AB$ phát sáng và hiển thị tỉ lệ `2 phần : 1 phần` trên trung tuyến; khi đặt sai: Tâm Thạch bật trở về vị trí ban đầu $(648, 228)$ kèm lời nhắc của Rồng Xanh.
     - **Giai đoạn 4 (50–60 giây) – Kích hoạt trận pháp vectơ:** Hiển thị 3 mũi tên vectơ cân bằng $\overrightarrow{GA}, \overrightarrow{GB}, \overrightarrow{GC}$ xuất phát từ $G$ tới 3 đỉnh cùng 2 hệ thức trọng tâm $\overrightarrow{GA} + \overrightarrow{GB} + \overrightarrow{GC} = \overrightarrow{0}$ và $\overrightarrow{MA} + \overrightarrow{MB} + \overrightarrow{MC} = 3\overrightarrow{MG}$.
     - **Giai đoạn 5 (60–70 giây) – Chiến thắng & Hợp nhất 5 Ấn Vectơ:** Nhấn `XÁC NHẬN` trao **👑 Huy hiệu Ấn Trí Tuệ** (mảnh mật mã `4`) đúng 1 lần duy nhất, hợp nhất trọn bộ 5 Ấn Vectơ (`30524`), mở Đại Màn Hình Chiến Thắng Toàn Hành Trình và đồng bộ trực tiếp lên bảng điều khiển Giáo viên cùng bản chơi thử 1 máy (`CHOI_THU_1_MAY.html`).

---

## [5.4.0] - 2026-11-07

### Added & Upgraded (Triển Khai Chặng 4 – Lật Thẻ Trung Điểm: Mê Cung Trung Điểm – Giải Mã Thẻ Phép Thuật)
- **Xây Dựng Mini-Game Lật & Ghép Thẻ Phép Thuật 3D Mức Độ Thông Hiểu (`renderStage4MidpointMemoryGame`, `MemoryCard`, `CardMatchingController`, `DragonGuide`, `Stage4Progress`, `S4_CARD_PAIRS_BANK` trong `public/app.js`, `public/style.css`, `stages.js`, `server.js`):**
  1. **Giao Diện & Bối Cảnh Khớp Chuẩn Hình Ảnh Tham Chiếu (`media_1794055265423_31b1c424.jpg`):**
     - **Bối cảnh Mê Cung Cây Xanh Huyền Bí (`.s4-memory-shell`, `public/assets/s4_maze/s4_maze_bg.jpg`):** Lối đi lát đá cổ, bụi pha lê cyan phát sáng, hạt đom đóm bay lơ lửng (`.s4-firefly`) và Cổng Mê Cung Phép Thuật phát sáng vàng kim - ngọc bích ở góc trên phải (`.s4-maze-portal-glow`).
     - **Thanh Header Trên Cùng (`.s4-top-header`):** Nút `🏠` quay về Bản đồ 5 Chặng, nút `📖 Kiến thức` mở sổ tay tính chất trung điểm khi cần (thay cho bảng lý thuyết tĩnh bên cạnh bàn chơi để không lộ đáp án và tối ưu diện tích thẻ), huy hiệu trung tâm `MATHVERSE OXYZ` + `CHẶNG 4 · THÔNG HIỂU` + `LẬT THẺ TRUNG ĐIỂM`, bộ chuyển chế độ `12 thẻ (6 cặp)` / `8 thẻ (4 cặp)`, nút bật/tắt âm thanh và toàn màn hình.
     - **Cột Trái (~25% chiều rộng – `.s4-left-guide-col`):** Nhân vật **Rồng Xanh** (`DragonGuide`), hộp thoại động giải thích **vì sao** hai thẻ vừa ghép tạo thành một cặp toán học, nút `💡 Gợi ý cặp thẻ (2/2)` có giới hạn, nút `📖 Kiến thức trung điểm` và nút đổi lượt thành viên lật thẻ trong nhóm (`1..4`).
     - **Cột Phải (~75% chiều rộng – `.s4-right-board-col`):** Khung bàn chơi viền vàng kim - ngọc lục bảo với thanh HUD trên đỉnh (`⏳ Thời gian: 01:05` đếm ngược 65 giây, `🃏 Đã ghép: 0 / 6 (X lượt lật)`, `Tiến độ: ○○○○○○` 6 viên ngọc phong ấn) và lưới thẻ `3 hàng × 4 cột` (12 thẻ) hoặc `2 hàng × 4 cột` (8 thẻ).
     - **Thiết Kế Thẻ Bài 3D (`.s4-memory-card`):** Mặt sau nền tím huyền bí có ngôi sao Ấn Vectơ và viền vàng kim (`public/assets/s4_maze/s4_card_back.png`); mặt trước nền giấy phép thuật sáng hiển thị hình vẽ hình học SVG trực tiếp và công thức vectơ có mũi tên chuẩn trên đầu chữ cái ($\overrightarrow{IA}, \overrightarrow{IB}, \overrightarrow{MA}, \overrightarrow{MB}, \overrightarrow{MI}, \overrightarrow{0}$).
  2. **Ngân Hàng 6 Cặp Thẻ Toán Học Không Nhập Nhằng (`S4_CARD_PAIRS_BANK` – Mức Độ Thông Hiểu):**
     - **Cặp 1 (`P1` – `4.1`):** Hình đoạn thẳng $AB$ có $I$ nằm chính giữa ($AI = IB$) $\leftrightarrow$ *"I là trung điểm của đoạn thẳng AB $\iff IA = IB$"*.
     - **Cặp 2 (`P2` – `4.2`):** Hình hai vectơ đối nhau $\overrightarrow{IA}, \overrightarrow{IB}$ xuất phát từ $I$ $\leftrightarrow$ $\overrightarrow{IA} + \overrightarrow{IB} = \overrightarrow{0}$.
     - **Cặp 3 (`P3` – `4.3`):** Hình điểm $M$ bất kỳ nối tới $A, B$ và trung điểm $I$ $\leftrightarrow$ $\overrightarrow{MA} + \overrightarrow{MB} = 2\overrightarrow{MI}$.
     - **Cặp 4 (`P4` – `4.4`):** Nhánh 1 quy tắc chèn điểm $I$: $\overrightarrow{MA} = \overrightarrow{MI} + \overrightarrow{IA}$ $\leftrightarrow$ Nhánh 2 quy tắc chèn điểm $I$: $\overrightarrow{MB} = \overrightarrow{MI} + \overrightarrow{IB}$.
     - **Cặp 5 (`P5` – `4.5`):** Hệ thức hai vectơ đối nhau $\overrightarrow{IA} = -\overrightarrow{IB}$ (*Cùng độ dài, ngược hướng*) $\leftrightarrow$ *"Tổng của hai vectơ đối nhau bằng vectơ-không ($\overrightarrow{0}$)"*.
     - **Cặp 6 (`P6` – `4.6`):** Hình hai vectơ cùng hướng $\overrightarrow{AI}$ và $\overrightarrow{IB}$ trên đoạn $AB$ $\leftrightarrow$ $\overrightarrow{AI} = \overrightarrow{IB} = \frac{1}{2}\overrightarrow{AB}$.
  3. **Máy Trạng Thái Lật Thẻ, Phím Tắt & Đồng Bộ Lớp Học (`/api/stage4Progress`, `/api/answer`):**
     - Hoạt ảnh lật 3D `300ms`; khóa `checkingLock` trong lúc 2 thẻ sai đang rung nhẹ và chờ tự úp lại (`720ms`) để chống lỗi nhấn liên tục mở thẻ thứ ba; không cho phép tự ghép 1 thẻ với chính nó.
     - Hỗ trợ đầy đủ cả **Chuột** và **Bàn phím** (`Arrow keys` / `W A S D` di chuyển ô chọn, `Enter` / `Space` lật thẻ, `H` gợi ý, `K` mở sổ tay kiến thức).
     - Khi còn `<= 15 giây`: đồng hồ nhấp nháy cảnh báo và Rồng Xanh tự động làm sáng gợi ý 1 cặp thẻ chưa mở.
     - Lưu trạng thái bàn chơi vào `sessionStorage` + `/api/stage4Progress` để khôi phục nguyên vẹn khi học sinh nhấn `F5`; ẩn `deckOrder` trên màn hình trình chiếu (`DISPLAY`) để không làm lộ vị trí thẻ đang úp; đồng bộ tiến độ (`matchedCount/6`, số lượt lật, số lần ghép sai, số lần gợi ý) lên bảng điều khiển Giáo viên và bản chơi thử 1 máy (`CHOI_THU_1_MAY.html`).
     - Khi ghép đủ `6/6` cặp: các thẻ phát sáng hợp thành vòng tròn phép thuật, mở Cổng Mê Cung Trung Điểm, trao **⚖️ Ấn Cân Xứng** (mảnh mật mã `2`) đúng 1 lần và chuyển tiếp sang **Chặng 5 – Thành Trì Lõi Trí Tuệ**.

---

## [5.3.0] - 2026-11-07

### Added & Upgraded (Triển Khai Chặng 2 – Mật Trận Vectơ – Pháo Đài Góc Vuông Theo Đúng Hình Ảnh Tham Chiếu)
- **Xây Dựng Mini-Game Dò Mìn Bằng Kiến Thức Vectơ Góc Nhìn Top-Down Fantasy RPG (`renderStage2VectorMatrixGame`, `s2Tick`, `s2ConfirmCurrentZone`, `S2_QUESTIONS` trong `public/app.js`, `public/style.css`, `stages.js`, `server.js`):**
  1. **Bố Cục Giao Diện Khớp 100% Ảnh Tham Chiếu (`media_1794051702137_89657ffb.jpg`):**
     - **A. Thanh trên cùng (`.s2-topbar`):** Nút `← Thoát`, logo `MATHVERSE OXYZ`, tiêu đề `CHẶNG 2 | Mật Trận Vectơ – Pháo Đài Góc Vuông`, nút `🎵 Nhạc nền` và `⛶ Toàn màn hình`.
     - **B. Sân chơi trung tâm (`.s2-courtyard-viewport`, 77% chiều rộng):** Sân thành lát đá cổ góc nhìn từ trên xuống (`public/assets/s2_matrix/s2_courtyard_bg.jpg`), Cổng Pháo Đài Góc Vuông ở phía trên với biểu tượng tam giác vuông vàng kim, 4 bệ đá tương tác thật ở 4 góc (`NW`, `NE`, `SW`, `SE`) và nhân vật **Rồng Xanh** ở giữa sân.
     - **C. Bảng công thức góc trên trái (`.s2-formula-board`):** Khung viền xanh hoàng gia - vàng kim hiển thị phép cộng vectơ với ký hiệu mũi tên trên đầu chữ cái chuẩn toán học ($\overrightarrow{AB} + \overrightarrow{BC} = \ ?$).
     - **D. Sidebar bên phải (`.s2-right-sidebar`):** Hiển thị 4 thẻ thông tin (`⏱ Thời gian` đếm ngược 60 giây, `⭐ Lượt sống` 3 khiên năng lượng, `🚩 Tiến độ` `0 / 6` kèm 6 chấm tiến trình, `Ấn Vectơ` với rương kho báu **Ấn Kết Nối** và nút chuyển người điều khiển trong nhóm) cùng hướng dẫn phím `W A S D` + `E`.
     - **E. Hộp thoại Rồng Xanh góc dưới trái (`.s2-companion-corner`):** Avatar Rồng Xanh đeo kính phi công (`public/assets/s2_matrix/s2_dragon_portrait.png`) và lời thoại động theo ngữ cảnh (*"Pháo đài bị đặt bẫy rồi! Hãy tìm vùng an toàn nhé!"*, *"Chính xác! Một bẫy đã được hóa giải!"*, *"Ôi! Bẫy phép thuật! Hãy thử hướng khác!"*, *"Nhanh lên! Cổng thành sắp đóng!"*, *"Tuyệt vời! Pháo đài đã được giải cứu!"*).
  2. **Điều Khiển Nhân Vật & Cơ Chế 4 Vùng Dò Mìn Vectơ (`s2Tick`, `s2ClampAndCollide`, `s2ConfirmCurrentZone`):**
     - Điều khiển Rồng Xanh bằng `W/A/S/D` hoặc `↑/↓/←/→` (tốc độ đường chéo được chuẩn hóa bằng `Math.hypot(vx, vy)`), có kiểm tra va chạm tường thành và vật cản, cùng 5 trạng thái hoạt ảnh (`idle`, `run`, `interact`, `hit`, `celebrate`).
     - Trước khi nhấn `E`, cả 4 bệ đá đều có giao diện đá cổ trung tính như nhau (tuyệt đối không lộ trước vùng xanh); khi Rồng Xanh đi vào bệ đá sẽ phát sáng viền và hiện nhắc lệnh `[E] Xác nhận`, chưa nhấn `E` thì chưa kích hoạt bẫy và có thể tự do rời sang vùng khác; không cho phép chọn đáp án bằng chuột như trắc nghiệm A/B/C/D.
     - Nhấn `E` tại **vùng đúng (`safe`)**: bệ đá bừng sáng xanh lục bảo - vàng kim kèm dấu tích `✓`, cộng `+1/6` tiến độ, phát hiệu ứng chúc mừng `0.5s`, đưa Rồng Xanh về giữa sân và nạp câu hỏi tiếp theo với vị trí 4 vùng được xáo trộn ngẫu nhiên (`s2ShuffleArray`).
     - Nhấn `E` tại **vùng sai (`trap`)**: bệ đá kích hoạt pha lê tím kèm biểu tượng cảnh báo `!`, trừ 1 khiên năng lượng (`-1 Khiên`), phát hoạt ảnh `hit` nhẹ nhàng và đưa Rồng Xanh về giữa sân để thử lại.
  3. **Ngân Hàng 6 Câu Hỏi Quy Tắc Cộng Vectơ & Chuyển Cảnh Mượt Sang Chặng 3 (`/api/stage2Progress`, `/api/answer`):**
     - Đầy đủ 6 câu hỏi: $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$, $\overrightarrow{MN}+\overrightarrow{NP}=\overrightarrow{MP}$, $\overrightarrow{PQ}+\overrightarrow{QR}=\overrightarrow{PR}$, $\overrightarrow{BA}+\overrightarrow{AC}=\overrightarrow{BC}$, $\overrightarrow{AB}+\overrightarrow{BC}+\overrightarrow{CD}=\overrightarrow{AD}$, $\overrightarrow{OA}+\overrightarrow{AB}=\overrightarrow{OB}$.
     - Khi hoàn thành đủ `6/6` câu: toàn bộ bẫy tím biến mất, Cổng Pháo Đài Góc Vuông phát sáng và mở ra, trao thưởng **Ấn Kết Nối** (mảnh mật mã `0`) đúng 1 lần không cộng trùng, Rồng Xanh chạy vào cổng thành và chuyển sang Bản đồ 5 Chặng bay tới **Chặng 3 – Tháp Pha Lê**.
     - Đồng bộ trực tiếp tiến độ Chặng 2 (`solvedCount/6`, số khiên, số lần dẫm bẫy, thời gian hoàn thành) lên màn hình Giáo viên và bản chơi thử 1 máy (`CHOI_THU_1_MAY.html`).

---

## [5.2.0] - 2026-11-07

### Fixed (Sửa Lỗi Khuất Đáp Án Trên Bảng Gỗ Cột 4 Zombie Chặng 3)
- **Tối Ưu Khoảng Cách 4 Làn `A`, `B`, `C`, `D` & Bố Cục Chữ Vectơ Trên Bảng Gỗ Zombie (`Z3_LANE_Y`, `Z3_SPAWN_X`, `.z3-zombie-unit`, `.z3-zombie-board-label` trong `public/app.js`, `public/style.css`):**
  1. **Loại Bỏ Hoàn Toàn Hiện Tượng Chồng Lấn Giữa 4 Zombie Cùng Cột:**
     - Giãn cách đều 4 làn `A`, `B`, `C`, `D` theo chiều dọc (`Z3_LANE_Y = [31.0, 48.0, 65.0, 82.0]` — cách nhau `17%` chiều cao sân đấu) và quy chuẩn chiều cao `.z3-zombie-unit { height: 15.6%; width: auto; }` để đầu của zombie phía dưới không bao giờ che khuất tấm bảng gỗ của zombie phía trên.
     - Đưa điểm xuất phát cột zombie vào trong sân đá (`Z3_SPAWN_X = 76.0%`) để toàn bộ thân zombie và đáp án không bị cắt ở mép phải màn hình.
  2. **Hiển Thị Rõ Ràng Đáp Án Vectơ ($\overrightarrow{BA}$, $\overrightarrow{CB}$, $\overrightarrow{AC}$, $\overrightarrow{AB}$) Chính Giữa Bảng Gỗ:**
     - Gỡ bỏ `flex-direction: row !important` trên `.z3-zombie-board-label`, khôi phục bố cục xếp dọc (`flex-direction: column`) đặt mũi tên `→` nằm ngay phía trên hai chữ cái vectơ (`BA`, `CB`, `AC`, `AB`) ở chính giữa bảng gỗ, và tách huy hiệu làn (`A`, `B`, `C`, `D`) sang góc trái bảng gỗ (`left: 22%`).

---

## [5.1.0] - 2026-11-07

### Added & Upgraded (Thiết Kế Logic Chặng 3 Theo Kiểu 4 Làn A/B/C/D & Cột Zombie `ZombieDefensePlayer` Nhưng Giữ Nguyên 100% Hình Ảnh Đấu Trường)
- **Tích Hợp Logic Cột Câu Hỏi 4 Làn (`A`, `B`, `C`, `D`) Chuẩn "Chặn Zombie" Trên Nền Hình Ảnh Đấu Trường Rồng Xanh (`z3CreateColumn`, `z3ShootColumnLane`, `z3ResolveBulletHit`, `z3TogglePause`, `z3RenderColumnsLayerHtml` trong `public/app.js`, `public/style.css`):**
  1. **Giữ Nguyên 100% Hình Ảnh Chặng 3:**
     - Sân đá pháo đài isometric (`s3_courtyard_clean.jpg`), 2 cuộn giấy da dê bên trái (`🎯 Nhiệm vụ` & `💡 Gợi ý`), nhân vật **Rồng Xanh** (`s3_dragon_shooter.png`), sprite **Zombie cầm bảng gỗ** (`s3_zombie_blank_sign.png`) và Rồng Xanh đồng hành ở góc phải dưới.
  2. **Hệ Thống 4 Làn Ngang (`A`, `B`, `C`, `D`) & Cột 4 Zombie Mang Thẻ Câu Hỏi (`CÂU 1`, `CÂU 2`, `CÂU 3`):**
     - Sân đấu chia thành 4 làn ngang có ký hiệu **`A`**, **`B`**, **`C`**, **`D`** dọc theo hàng rào phòng thủ trước mặt Rồng Xanh.
     - Mỗi câu hỏi sinh ra **1 cột gồm 4 zombie** (mỗi con đi trên 1 làn `A`, `B`, `C`, `D`, cầm bảng gỗ gắn nhãn `A · BA⃗`, `B · CB⃗`, `C · AC⃗`, `D · AB⃗`) cùng tiến về hàng rào, phía trên cột có **Thẻ câu hỏi (`CÂU 1`, `CÂU 2`, `CÂU 3`)** di chuyển đồng bộ theo cột.
  3. **Logic Bắn Đúng Diệt Cả Cột & Bắn Sai Cả Đàn Bứt Tốc (`z3ResolveBulletHit`):**
     - **Bắn trúng zombie mang đáp án đúng:** Tiêu diệt đồng loạt **cả cột 4 zombie** của câu hỏi đó (`col.cleared = true`), hiện chữ nổi `✓ Chính xác!`, cộng điểm XP và tự động triệu hồi cột câu hỏi tiếp theo.
     - **Bắn nhầm zombie mang đáp án sai:** Chỉ zombie sai đó bị loại, **cả đàn zombie còn lại bứt tốc `x3.0`** trong `2.0s` kèm cảnh báo `✗ Sai! Zombie tăng tốc`.
  4. **Modal Tạm Dừng (`⏸ Tạm dừng | ▶ Chơi tiếp | ← Thoát`) & Phím Tắt (`A/B/C/D`, `1–4`, `Space`):**
     - Bổ sung nút **`⏸ Tạm dừng` / `▶ Chơi tiếp`** trên thanh trạng thái và phím **`Space`** mở hộp thoại **Tạm dừng** ở chính giữa sân đấu y hệt ảnh tham chiếu.

---

## [5.0.0] - 2026-11-07

### Added & Upgraded (Bổ Sung 2 Câu Hỏi Nâng Tổng Số Lên 3 Câu Hỏi Trong Thẻ `🎯 Nhiệm vụ` & `💡 Gợi ý` Của Chặng 3 – Chặn Zombie Vectơ)
- **Hệ Thống 3 Câu Hỏi Nhiệm Vụ & Gợi Ý Động (`Z3_QUESTIONS`, `z3GetActiveQuestion`, `z3ApplyQuestionToZombies`, `z3RenderLeftParchmentsHtml` trong `public/app.js`, `public/style.css`):**
  1. **Câu 1/3 (`qIdx: 0` – Quy tắc 3 điểm cơ bản):**
     - **`🎯 Nhiệm vụ`:** *Tiêu diệt zombie đang giữ vectơ kết quả của $\overrightarrow{AB} + \overrightarrow{BC}$.*
     - **`💡 Gợi ý`:** *Tổng của hai vectơ nối tiếp bằng vectơ nối điểm đầu với điểm cuối (Quy tắc 3 điểm: $A \to B \to C$).*
     - **Bảng gỗ zombie trên sân:** `BA`, `CB`, `AC` (đúng), `AC` (đúng), `AB`.
  2. **Câu 2/3 (`qIdx: 1` – Quy tắc 3 điểm mở rộng):**
     - **`🎯 Nhiệm vụ`:** *Tiêu diệt zombie đang giữ vectơ kết quả của $\overrightarrow{MN} + \overrightarrow{NP}$.*
     - **`💡 Gợi ý`:** *Hai vectơ nối tiếp tại điểm trung gian $N$: tổng bằng vectơ nối điểm đầu $M$ với điểm cuối $P$.*
     - **Bảng gỗ zombie trên sân:** `PM`, `NP`, `MP` (đúng), `MP` (đúng), `MN`.
  3. **Câu 3/3 (`qIdx: 2` – Quy tắc hình bình hành):**
     - **`🎯 Nhiệm vụ`:** *Cho hình bình hành $ABCD$, tìm vectơ kết quả của $\overrightarrow{BA} + \overrightarrow{BC}$.*
     - **`💡 Gợi ý`:** *Quy tắc hình bình hành: tổng hai vectơ cạnh cùng xuất phát từ đỉnh $B$ bằng vectơ đường chéo xuất phát từ $B$.*
     - **Bảng gỗ zombie trên sân:** `DB`, `AC`, `BD` (đúng), `BD` (đúng), `CA`.
  4. **Chuyển Câu Hỏi Tự Động & Thủ Công Trên Thẻ Giấy Da Dê (`#z3LeftParchments`):**
     - Hiển thị thanh chuyển nhanh `Câu 1` | `Câu 2` | `Câu 3` (`data-action="z3SelectQuestion"`) và danh sách tóm tắt cả 3 câu hỏi (`z3-q-mini-list`) ngay trong thẻ `🎯 Nhiệm vụ`, đồng thời tự động chuyển tiếp câu hỏi theo tiến độ tiêu diệt zombie (`0..1/5` → Câu 1, `2..3/5` → Câu 2, `4/5` → Câu 3) kèm cập nhật lời nhắc của Rồng Xanh ở góc phải dưới.

---

## [4.9.0] - 2026-11-07

### Added & Upgraded (Tích Hợp Cơ Chế Gameplay "Chặn Zombie" `zombie-defense` Vào Giao Diện Đấu Trường Chặng 3)
- **Giữ Nguyên 100% Giao Diện Chặng 3 Vừa Thiết Lập & Nâng Cấp Toàn Diện Cơ Chế Chặn Zombie (`z3Tick`, `z3StartCharge`, `z3ImpactDragon`, `z3HandleZombieHit`, `playZ3Sfx` trong `public/app.js`, `public/style.css`):**
  1. **Cơ Chế Zombie Tiến Công Liên Tục Về Hàng Rào Phòng Thủ (`Z3_BASE_MARCH_SPEED`, `Z3_DEFENSE_LINE_X`):**
     - Các zombie cầm bảng gỗ ($\overrightarrow{BA}$, $\overrightarrow{CB}$, $\overrightarrow{AC}$, $\overrightarrow{AC}$, $\overrightarrow{AB}$) bước đi liên tục từ phía Đông sân đá tiến về vạch năng lượng phòng thủ (`.z3-defense-barrier`) trước mặt Rồng Xanh.
  2. **Cơ Chế Bắn Trúng Mục Tiêu Đúng ($\overrightarrow{AC}$):**
     - Phát âm thanh `/sounds/correct.mp3` + hiệu ứng nổ sáng (`.is-dying` + nhãn nổi `💥 CHÍNH XÁC! +50 XP`).
     - Tạo sóng xung kích đẩy lùi nhẹ các zombie còn lại trên sân, tăng tiến độ **`🎯 Tiêu diệt đúng vectơ: X/5`** (`0/5 → 5/5`) và triệu hồi đợt zombie mới cho đến khi hoàn thành đủ `5/5`.
  3. **Cơ Chế Bắn Trượt / Chạm Rào: Tăng Tốc Cả Bầy & Lao Tới Cắn Rồng Xanh (`z3StartCharge`, `z3ImpactDragon` chuẩn `giaoviendoimoi.com/zombie-defense`):**
     - Khi bắn nhầm zombie mang vectơ sai (`BA`, `CB`, `AB`) hoặc để zombie chạm vạch phòng thủ quá lâu:
       - Tốc độ toàn đội hình zombie tăng thêm `+60%` mỗi lần (`🧟 Tốc độ x1.6`, `x2.2`...) và cả bầy chạy nước rút (`Z3_RUSH_MULT = 6.5x`) trong `1.5s`.
       - Zombie bị bắn nhầm phát sáng đỏ rực (`.is-charging`), hiện cảnh báo `❌ TRƯỢT! ZOMBIE LAO TỚI!` và lao thẳng qua vạch phòng thủ theo gia tốc bậc hai (`t * t`) tới cắn Rồng Xanh.
       - Khi va chạm: phát âm thanh `/sounds/explosion.mp3` & `/sounds/zombie-lose.mp3`, rung lắc toàn sân đấu (`.is-shaking`), Rồng Xanh chớp đỏ (`.is-hurt`) kèm thông báo `🧟 ZOMBIE ĐÃ LAO TỚI CẮN! −1 ❤️`, trừ 1 tim và đẩy lùi zombie về điểm xuất phát để đội tiếp tục phòng thủ.

---

## [4.8.0] - 2026-11-07

### Added & Upgraded (Triển Khai Chặng 3 – Trò Chơi Bắn Zombie Vectơ "PHÁO ĐÀI GÓC VUÔNG" Chuẩn Giao Diện Ảnh Tham Chiếu)
- **Giao Diện & Gameplay Đấu Trường Bắn Zombie Chặng 3 (`renderStage3ZombieShooterGame`, `z3State`, `z3Tick`, `z3FireEnergyBall` trong `public/app.js`, `public/style.css`, `server.js`):**
  1. **Thanh Tiến Trình 5 Chặng Trên Cùng (`z3-top-nav-bar`):**
     - Logo kim cương xanh `MATHVERSE OXYZ` bên trái + 5 thẻ tiến trình chặng (`Chặng 1: Hiệu hai vectơ`, `Chặng 2: Tổng hai vectơ`, `Chặng 3: Hình bình hành`, `Chặng 4: Trung điểm`, `Chặng 5: Trọng tâm`) hiển thị rõ trạng thái `✓ Đã hoàn thành`, `▶ Đang chơi`, `🔒 Khóa`.
  2. **Thanh Phụ Pháo Đài & Cụm Chỉ Số (`z3-arena-subheader`):**
     - Biểu trưng pháo đài (`public/assets/s3_zombie/s3_castle_crest.png`) kèm tiêu đề **`CHẶNG 3 - PHÁO ĐÀI GÓC VUÔNG`** (`Tổng hai vectơ (Nhận biết)`).
     - Cụm 3 viên thuốc trạng thái bên phải: **3 Tim đỏ (`❤️ ❤️ ❤️`)**, **Điểm kinh nghiệm (`⭐ XP 240+`)** và **Đồng hồ đếm ngược (`🕒 00:56`)**.
  3. **Sân Đấu Đá Isometric & Cổng Dịch Chuyển Phía Bắc (`#z3CourtyardViewport`):**
     - Nền sân đấu pháo đài đá isometric (`public/assets/s3_zombie/s3_courtyard_clean.jpg`) với tường thành, đuốc lửa, cờ hiệu và cổng dịch chuyển ma thuật màu xanh lam ở chính giữa phía Bắc.
     - **2 Cuộn Giấy Da Dê Bên Trái (`z3-left-parchments`):**
       - **`🎯 Nhiệm vụ`:** *Tiêu diệt 5 zombie đang giữ vectơ kết quả của $\overrightarrow{AB} + \overrightarrow{BC}$.*
       - **`💡 Gợi ý`:** *Tổng của hai vectơ nối tiếp bằng vectơ nối điểm đầu với điểm cuối.*
     - **Nhân Vật Rồng Xanh Bắn Năng Lượng (`#z3DragonHero`):**
       - Sprite Rồng Xanh chiến đấu (`public/assets/s3_zombie/s3_dragon_shooter.png`) có thanh máu xanh lá trên đầu, điều khiển di chuyển 2D mượt mà bằng **phím mũi tên (`↑ ↓ ← →`) / `WASD`** và bắn cầu năng lượng xanh lam bằng phím **`Space`** (hoặc nhấn trực tiếp vào zombie).
     - **5 Zombie Cầm Bảng Gỗ Vectơ (`#z3ZombiesLayer`):**
       - Sprite zombie hoạt hình (`public/assets/s3_zombie/s3_zombie_blank_sign.png`) cầm bảng gỗ trước ngực hiển thị các vectơ $\overrightarrow{BA}$, $\overrightarrow{CB}$, $\overrightarrow{AC}$, $\overrightarrow{AC}$, $\overrightarrow{AB}$ và vòng hào quang vàng rực rỡ (`.z3-target-aura`) quanh mục tiêu đang ngắm.
       - Khi bắn trúng zombie mang vectơ đúng **$\overrightarrow{AC}$**, bộ đếm tăng từ `0/5 → 5/5`, cộng `+50 XP`, tự động triệu hồi zombie mới từ cổng dịch chuyển cho tới khi đạt `5/5`, hoàn thành Chặng 3 và trao **Ấn Cân Bằng**.
  4. **Thanh HUD Dưới Cùng (`z3-bottom-hud`):**
     - Hộp hướng dẫn phím **`Điều khiển Rồng Xanh`** (`↑ ← ↓ → Di chuyển` | `Space Bắn năng lượng`).
     - Thanh tiến độ mục tiêu ở giữa: **`🎯 Tiêu diệt đúng vectơ: 0/5`** kèm 5 ô tròn trạng thái.
     - Góc phải: Nhân vật Rồng Xanh đồng hành kèm bóng thoại nhắc công thức $\overrightarrow{AB} + \overrightarrow{BC}$.

---

## [4.7.0] - 2026-11-07

### Added & Upgraded (Tái Tạo Chặng 1 "CHẶNG 1 – MẬT THƯ RỪNG VECTƠ" Chuẩn Giao Diện Ảnh Mẫu & Cơ Chế Hunt-Preview + Kịch Bản Slide Báo Cáo PPTX)
- **Tái Tạo Giao Diện & Gameplay Chặng 1 (`CHẶNG 1 – MẬT THƯ RỪNG VECTƠ`) Khớp 100% Hình Mẫu Và `hunt-preview/__demo__` (`stages.js`, `server.js`, `public/app.js`, `public/style.css`):**
  1. **Top Header Banner (`renderStage1TopBanner`):**
     - Góc trái: Logo tinh thể `MATHVERSE OXYZ` (`public/assets/s1_hunt/mathverse_logo_s1.png`).
     - Chính giữa: Cuộn tiêu đề **`CHẶNG 1 – MẬT THƯ RỪNG VECTƠ`** kèm phụ đề `✦ Thử thách khám phá – săn lùng mảnh mật thư trong rừng phép! ✦`, đồng hồ đếm ngược 60s và nút đổi thành viên điều khiển (`🎮 TV X`).
  2. **Khung Bản Đồ Rừng Phép Isometric 2D & Nhân Vật Rồng Xanh Thám Hiểm (`#s1ForestViewport`):**
     - Tích hợp bản đồ rừng phép isometric sắc nét (`public/assets/s1_hunt/s1_forest_map_clean.jpg`) đã tách sạch nhân vật tĩnh và icon tĩnh để hiển thị đối tượng tương tác thời gian thực.
     - Nhân vật **Rồng Xanh Thám Hiểm (`public/assets/s1_hunt/s1_dragon_explorer.png`)** đeo kính phi công, khăn quàng đỏ và ba lô da, di chuyển mượt bằng `WASD` / Phím mũi tên / `Shift` hoặc Click chuột trên bản đồ (kèm hiệu ứng gợn sóng vàng `.s1-click-ripple` chuẩn `hunt-preview/__demo__`).
     - **4 Bệ Đá Mật Thư Phát Sáng (`S1_PEDESTAL_IDS`: `'1'`, `'2'`, `'3'`, `'4'`)** đặt khớp chính xác 4 bệ đá tròn trên bản đồ (Đền Cổ Tây Bắc, Thành Cổ Đông Bắc, Suối Pha Lê Tây Nam, Nhà Gỗ Đông Nam). Khi Rồng Xanh bước vào vòng sáng bệ đá hoặc người chơi nhấn vào bệ đá / bấm phím `E`, bảng câu hỏi da dê đinh tán (`.hw-frame-question`) hiện lên để thu thập từng mảnh mật thư (`0/4 → 1/4 → 2/4 → 3/4 → 4/4`).
  3. **Sidebar Phải (`s1-hunt-sidebar`) Khớp 100% Ảnh Tham Chiếu:**
     - Tiêu đề `↗ Nhiệm vụ Chặng 1: Mật thư Rừng Vectơ`.
     - Cuộn giấy nhiệm vụ: **`Tìm 4 mảnh mật thư để mở khóa Cầu Ánh Sáng.`** (`public/assets/s1_hunt/mission_scroll_art.png`).
     - Thanh tiến độ thu thập: `📜 Mảnh mật thư đã thu thập` (`0/4 → 4/4`).
     - Thẻ `Phần thưởng` với Rương kho báu đính ngọc lam (`public/assets/s1_hunt/reward_chest.png`) + `Mở khóa Cầu Ánh Sáng và nhận phần thưởng!` (nhấp nháy vàng `.ready` khi đủ `4/4` mảnh để mở khóa **Cầu Ánh Sáng** $\overrightarrow{AB} - \overrightarrow{AC} = \overrightarrow{CB}$ và nhận **Ấn Hướng Đi**).
     - Cụm 3 nút tiện ích cuối Sidebar: `[🔊]`, `[⛶]`, `[↪ Thoát]`.
  4. **Thanh Đáy (`s1-hunt-bottombar`) Khớp 100% Ảnh Tham Chiếu:**
     - Hộp gợi ý góc trái: `💡 Gợi ý: Manh mối về các vectơ ` $\overrightarrow{AB}, \overrightarrow{AC}, \overrightarrow{CB}.$
     - Khay 4 mảnh mật thư chính giữa: 4 ô tấm da dê `[ ? ] [ ? ] [ ? ] [ ? ]` lật mở công thức khi thu thập kèm bộ đếm `📜 X/4 mảnh mật thư`.
- **Biên Soạn Kịch Bản Nội Dung Báo Cáo PPTX 37 Slide (`Kich_Ban_Slide_Bao_Cao_Bien_Phap_PPTX.md`):**
  - Đồng bộ hóa cấu trúc 37 slide từ `BAO CAO BIEN PHAP NEW_LE THANH DUNG.pptx` với nội dung `Bien phap gop phan nang cao chat luong DH.docx` cho đề tài game tương tác Toán 12 `MATHVERSE OXYZ`.

---

## [4.6.0] - 2026-11-07

### Added & Upgraded (Nâng Cấp Chặng 1 v4.6: Mini-Game Phiêu Lưu Điều Khiển Bàn Phím "MẬT THƯ RỪNG VECTƠ – GIẢI CỨU CÂY CẦU ÁNH SÁNG")
- **Cơ Chế Gameplay 4 Nhiệm Vụ Trong 60 Giây – Không Dùng Trắc Nghiệm A/B/C (`stages.js`, `server.js`, `public/app.js`, `public/style.css`):**
  1. **Nhiệm vụ 1 (0–23s) – Truy tìm hai mảnh mật thư (`📜 0/2 → 1/2 → 2/2`):** Rồng Xanh xuất phát gần **Cột mốc A**. Học sinh điều khiển nhân vật bằng `WASD` / Phím mũi tên, giữ `Shift` để chạy nhanh (`345` vs `235` world-units/s kèm hạt bụi sao), đi theo đường mòn có dấu chân phát sáng (`S1_GLOWING_FOOTPRINTS`) đến gần **Cột B** và **Cột C**, nhấn phím `E` (chống lặp phím `e.repeat`) để thu thập 2 mảnh mật thư mang ký hiệu $\overrightarrow{AB}$ và $\overrightarrow{AC}$ (có 3 biến thể vị trí ngẫu nhiên `spawnVariant` quanh B và C để tăng tính chơi lại).
  2. **Nhiệm vụ 2 (23–32s) – Giải mã cuộn giấy (`📜 2/2`):** Khi nhặt đủ 2 mảnh, một cuộn giấy cổ mở ra trên màn hình với công thức $\overrightarrow{AB} - \overrightarrow{AC} = \ ?$ cùng lời thoại của Rồng Xanh: *“Hai manh mối đã được ghép! Hãy tìm vectơ bí mật để mở cây cầu!”* (tuyệt đối không lộ đáp án `CB`).
  3. **Nhiệm vụ 3 (32–48s) – Di chuyển để giải mật mã (`Từ C → B`):** Rồng Xanh đứng tại **Cột C**. Thay vì chọn đáp án trắc nghiệm, học sinh phải trực tiếp điều khiển Rồng Xanh chạy từ **Cột C** đến **Cột B** và nhấn **`E`** để xác nhận hướng của vectơ hiệu $\overrightarrow{CB}$. Nếu đi nhầm sang **Cột A** và nhấn `E`, cột đá phát sáng đỏ (`wrong-flash`), ghi nhận số lần sai (`wrongAttempts`), hiển thị phản hồi và đưa Rồng Xanh quay lại **Cột C** để thử lại.
  4. **Nhiệm vụ 4 (48–60s) – Khôi phục cây cầu:** Khi nhấn `E` đúng tại **Cột B**, một tia sáng phóng từ **C sang B** ($\overrightarrow{CB}$), hiện thông báo $\overrightarrow{AB} - \overrightarrow{AC} = \overrightarrow{CB}$, khôi phục **Cây Cầu Ánh Sáng**, trao **Ấn Hướng Đi (`🔑 1/1`)**, điều khiển Rồng Xanh chạy qua cây cầu vừa mở và bay sang **Chặng 2** trên Bản đồ Thế giới.
- **Thế Giới 2D Tương Tác Thật (`1000 × 560`) & Môi Trường Sống Động (`public/app.js`, `public/style.css`):**
  - Hệ thống va chạm vật cản thật (`S1_WORLD_OBSTACLES` & `s1ResolveWorldMovement`): Rồng Xanh không thể đi xuyên qua cây cổ thụ, tảng đá rêu hay vực thác nước khi cầu chưa mở.
  - Bổ sung **3 bụi cây phép thuật (`S1_FOREST_BUSHES`)** rung lắc khi Rồng Xanh chạy ngang qua và **1 Rương Bí Mật (`S1_SECRET_CHEST_META`)** mở bằng phím `E` thưởng ngay `+5 XP & +25 Vàng`.
  - Hỗ trợ 4 trạng thái hoạt ảnh cho Rồng Xanh (`IDLE`, `RUN`, `INTERACT`, `CELEBRATE`) cùng vỗ cánh SVG động.
- **Giao Diện HUD Fantasy RPG Tối Giản & Đồng Bộ Giáo Viên / Đội Chơi:**
  - HUD gọn gàng kiểu game phiêu lưu: `🌿 RỪNG VECTƠ` | `⏱️ 00:42` | `NHIỆM VỤ HIỆN TẠI` | `📜 X/2` | `🔑 X/1` | `⌨️ WASD: Di chuyển · E: Tương tác · Shift: Chạy nhanh` | Nút đổi lượt người điều khiển trong đội (`🎮 TV X`).
  - Hệ thống 2 gợi ý theo thời gian hoặc khi sai: Gợi ý 1 ($\le 30\text{s}$ hoặc sai lần 1): *"Hãy quan sát điểm đầu và điểm cuối của mỗi vectơ."* | Gợi ý 2 ($\le 15\text{s}$ hoặc sai lần 2): *"Khi trừ hai vectơ cùng điểm đầu, hãy tìm hướng nối hai điểm cuối."*
  - Màn hình Giáo viên cập nhật thời gian thực: Số mảnh mật thư (`📜 X/2`), trạng thái giải mã cầu (`🌉 Đã giải mã / Đang giải mã`), thời gian hoàn thành (`⏱️ Xs`), số lần đi nhầm cột (`❌ X sai`), đồng thời tự động ẩn đáp án trên máy chiếu khi các đội đang thi.

---

## [4.5.0] - 2026-11-07

### Added & Upgraded (Thiết Kế Game Chặng 1 – Mini-Game Khám Phá 2D: "MẬT THƯ CÂY CẦU ĐẢO CHIỀU")
- **Tích hợp Bối Cảnh 2D Rừng Vectơ Mới (`public/assets/Stage1_Mystic_Forest_2D.jpg` & `stages.js`):**
  - Cập nhật bối cảnh 2D Rừng Vectơ với 3 cột đá rune cổ `A`, `B`, `C` phát sáng, đường mòn lát đá, cổ vật phát sáng và hai trụ cầu gãy bên thác nước.
  - Đổi tên chính thức Chặng 1 thành **`MẬT THƯ CÂY CẦU ĐẢO CHIỀU`** (Thời gian: `60 giây`, Mức độ: `NHẬN BIẾT`).
- **Xây dựng Hệ Thống Điều Khiển Nhân Vật 2D & 4 Giai Đoạn Tương Tác (`public/app.js`, `public/style.css`):**
  1. **Giai đoạn 1 (Điều khiển Rồng Xanh WASD / Phím mũi tên thu thập mật thư):** Người chơi điều khiển trực tiếp Rồng Xanh (`#s1DragonExplorer`) chạy trên đường rừng bằng phím `WASD`, phím mũi tên, cụm phím D-Pad trên màn hình hoặc chạm vào đường rừng (`s1Tick` 60fps). Khi Rồng Xanh tiến lại gần các cột đá `A`, `B`, `C` (hoặc nhấn `E`/`Space`), hệ thống phát hiện tương tác khoảng cách thực sự (`s1UnlockPillar`), nhặt cổ vật dọc đường và thu thập đủ `3/3` mảnh mật thư (`0/3 → 1/3 → 2/3 → 3/3`), tự động chuyển sang Giai đoạn 2.
  2. **Giai đoạn 2 (Kéo thả ghép mật thư):** Kéo thả (`Drag & Drop`) hoặc chạm vào 3 mảnh mật thư (`\vec{AB}`, `−`, `\vec{AC}`) để ghép thành biểu thức $\overrightarrow{AB} - \overrightarrow{AC} = \text{?}$ (không để lộ đáp án `CB`). Kiểm tra đúng/sai và gợi ý trực quan từ Rồng Xanh.
  3. **Giai đoạn 3 (Dựng hình học SVG & Vẽ mũi tên vectơ hiệu):** Dựng hoàn toàn bằng **SVG thuần** (không dùng ảnh tĩnh có sẵn đáp án) sơ đồ tam giác `A, B, C` cùng hai vectơ $\overrightarrow{AB}$, $\overrightarrow{AC}$. Học sinh chọn điểm đầu và kéo mũi tên đến điểm kết thúc để tạo vectơ hiệu $\overrightarrow{CB}$ (điểm đầu `C`, điểm cuối `B`). Không sử dụng đáp án trắc nghiệm A/B/C.
  4. **Giai đoạn 4 (Khôi phục Cây Cầu Ánh Sáng, chạy qua cầu & bay sang Chặng 2):** Khi giải mã đúng $\overrightarrow{CB}$, phát hoạt ảnh khôi phục Cây Cầu Ánh Sáng nối qua thác nước, trao **Ấn Hướng Đi (`🧭`)**, điều khiển Rồng Xanh chạy qua cây cầu vừa khôi phục và chuyển mượt sang Bản đồ Thế giới (`AdventureMap`) để bay tới Chặng 2.
- **Giao Diện Tối Giản Trong Mini-Game (`renderStage1MinimalHud`):**
  - Khi ở trong Chặng 1, giao diện chỉ hiển thị gọn gàng: **Mục tiêu hiện tại**, **Đồng hồ đếm ngược 60s**, **Số mảnh mật thư (`X/3`)** và **Nút Gợi ý của Rồng Xanh**, tối ưu hiển thị trên máy tính và máy chiếu lớp học.
- **Kiểm Thử Toàn Diện E2E (`scratch/test_stage1_cipher_bridge.js` & `CHOI_THU_1_MAY.html`):**
  - Kiểm thử đạt 100% toàn bộ các tình huống: Giai đoạn 1 thu thập 3 cột mốc & đồng bộ màn hình Giáo viên, Giai đoạn 2 ghép đúng/sai, Giai đoạn 3 vẽ vectơ đúng (`C → B`) / sai (`B → C`), Giai đoạn 4 chuyển sang Chặng 2, tình huống hết giờ (`60s Timeout`), chống cộng thưởng trùng và giữ nguyên tiến trình khi tải lại trang (`F5`).

---

## [4.4.0] - 2026-11-07

### Added & Upgraded (Nâng Cấp Hệ Thống Rồng Xanh Di Chuyển Thực Sự Qua 5 Chặng Trên Bản Đồ Thế Giới 2D)
- **Tích hợp Bản Đồ Thế Giới 5 Vùng Đất Liên Kết (`public/assets/World_Map_Oxyz.jpg`, `public/app.js`, `public/style.css`):**
  - Thiết kế component `AdventureMap` tương tác thực sự trong hệ tọa độ chuẩn hóa `1000 × 560` (tương thích `1920×1080` và `1366×768`, không lệch vị trí nhân vật khi co giãn màn hình).
  - Kết nối 5 vùng đất (**Chặng 1: Rừng Vectơ Khởi Nguyên – Hiệu vectơ – Nhận biết**, **Chặng 2: Pháo Đài Góc Vuông – Tổng vectơ – Nhận biết**, **Chặng 3: Tháp Pha Lê – Hình bình hành – Nhận biết**, **Chặng 4: Mê Cung Trung Điểm – Trung điểm – Thông hiểu**, **Chặng 5: Thành Trì Lõi Trí Tuệ – Trọng tâm – Thông hiểu**) và **Đỉnh Thành Trì – Tâm Thạch Vectơ** bằng hệ thống đường đi cong Bézier bậc 3 SVG phát sáng động (`WORLD_ROUTES`).
  - Hiển thị thẻ HUD `CHẶNG HIỆN TẠI` ở góc trái trên, cột phải gồm 3 thẻ (`ẤN VECTƠ`, `TIẾN TRÌNH ĐỘI`, `RỒNG XANH ĐỒNG HÀNH`) và thanh công cụ đáy (`🗺️ Bản đồ Lục địa OXYZ`, `📜 Nhiệm vụ`, `▶ Bắt đầu`, `≫ Di chuyển tới chặng`).
- **Xây dựng Hệ Thống Nhân Vật & Di Chuyển Rồng Xanh (`DragonCharacter` & `DragonMovementController`):**
  - Hỗ trợ đầy đủ 6 trạng thái hoạt ảnh thời gian thực: `IDLE` (đứng thở nhẹ tại cổng chặng), `CELEBRATE` (nhận thưởng XP/Vàng/Ấn Vectơ và nhảy vui mừng), `RUN` (chạy trên con đường ánh sáng có bóng đổ dưới chân và hạt bụi sáng), `FLY` (vỗ cánh SVG động kèm hào quang sao sáng khi vượt qua khoảng không giữa các đảo nổi), `LAND` (hạ cánh phát sóng ánh sáng tại cổng chặng mới), và `TALK` (hiển thị bong bóng lời thoại giao nhiệm vụ mới).
  - Nội suy tọa độ mượt 60fps bằng đường cong Bézier bậc 3 (`evalCubicBezier`) qua các điểm mốc `stage1.position` → `stage2.position` → `stage3.position` → `stage4.position` → `stage5.position` → `heartStone.position`, tự động xoay hướng mặt theo đạo hàm tiếp tuyến (`tx`).
- **Máy Trạng Thái Chuyển Chặng (`StageTransitionController`) & Kịch Bản Thoại 5 Chặng:**
  - Chu trình tự động khi hoàn thành mỗi chặng: `PLAYING` → `STAGE_COMPLETED` → `REWARD` → `CELEBRATING` → `MOVING` (`RUN` → `FLY`) → `ARRIVING` (`LAND`) → `STAGE_UNLOCKED` (`TALK`) → `PLAYING`.
  - Lời thoại Rồng Xanh chuẩn kịch bản cho từng chặng (`1 → 2`: *"Giỏi lắm! Cây cầu đã hồi sinh! Cùng đến Pháo Đài Góc Vuông thôi!"*, `2 → 3`: *"Cánh cổng đã mở! Tháp Pha Lê đang đợi chúng ta!"*, `3 → 4`: *"Ba Ấn Vectơ đã được thu hồi! Hãy tìm điểm cân bằng!"*, `4 → 5`: *"Chỉ còn một thử thách! Cả đội cùng tiến đến Thành Trì Trí Tuệ!"*, `5 → Tâm Thạch`: *"Đủ 5 Ấn Vectơ rồi! Hãy bay lên đỉnh Thành Trì khôi phục Tâm Thạch Vectơ!"*).
- **Đồng Bộ Đội Chơi, Màn Hình Giáo Viên & Chống Cộng Trùng Điểm (`server.js`, `CHOI_THU_1_MAY.html`):**
  - Bổ sung endpoint `/api/dragonState` và trường `t.dragon` đồng bộ vị trí/trạng thái di chuyển của Rồng Xanh giữa tất cả thành viên cùng đội và hiển thị trực tiếp trên bảng xếp hạng Giáo viên (`🐉 Bay X→Y` / `🐉 Chặng X`).
  - Khóa chống cộng trùng (`alreadyRewarded`) đảm bảo tải lại trang (`F5`) giữ nguyên vị trí Rồng Xanh tại chặng hiện tại và không bao giờ cộng lặp XP, Vàng hay Ấn Vectơ.

---

## [4.3.0] - 2026-11-06

### Added & Upgraded (Nâng Cấp Chặng 1 – Game Truy Tìm Mật Thư: "BÍ MẬT CÂY CẦU ĐẢO CHIỀU")
- **Tích hợp 4 bối cảnh hình ảnh chuyên biệt cho Chặng 1 (`public/assets/`):**
  - `Stage1_Pillars_Forest.jpg`: Rừng Vectơ Khởi Nguyên với 3 cột đá cổ khắc rune phát sáng.
  - `Stage1_Cipher_Scroll.jpg`: Cuộn mật thư cổ đại dùng cho Bảng giải mã.
  - `Stage1_Vector_Triangle_Beams.jpg`: Sơ đồ tam giác tia sáng năng lượng để xác định hướng vectơ bí mật.
  - `Stage1_Restored_Bridge.jpg`: Cảnh Cầu Ánh Sáng khôi phục hoàn chỉnh nối qua vực Rừng Vectơ.
- **Thay thế hoàn toàn câu hỏi trắc nghiệm A/B/C ở Chặng 1 bằng 4 Bước Gameplay Phiêu Lưu Giải Mã (`stages.js`, `server.js`, `public/app.js`, `public/style.css`):**
  1. **Bước 1 – Tìm mật thư (`0/3 → 1/3 → 2/3 → 3/3`):** Đặt 3 cột đá cổ `A`, `B`, `C` phát sáng trên bối cảnh Rừng Vectơ. Mỗi lần nhấn mở phong ấn một cột đá sẽ phát hiệu ứng âm thanh pha lê, thu thập 1 mảnh mật thư ($\vec{AB}$, $-$, $\vec{AC}$) và gửi `/api/stage1Progress` cập nhật thời gian thực về màn hình Giáo viên.
  2. **Bước 2 – Ghép mật thư (`\vec{AB} − \vec{AC} = ?`):** Mở Bảng giải mã mật thư cổ đại. Học sinh kéo thả (`Drag & Drop`) hoặc nhấn chọn các mảnh để sắp xếp thành biểu thức $\vec{AB} - \vec{AC} = \text{?}$ (tuyệt đối không để lộ đáp án `CB`). Nếu xếp sai thứ tự (ví dụ `AC - AB`), hệ thống phản hồi ngắn gọn và cho phép thử lại ngay.
  3. **Bước 3 – Tìm hướng vectơ bí mật (Kéo mũi tên từ `C` đến `B`):** Hiển thị sơ đồ tam giác `A, B, C` tương tác trực tiếp. Học sinh nhấn giữ điểm bắt đầu và kéo mũi tên đến điểm kết thúc (hoặc chạm lần lượt Điểm đầu → Điểm cuối). Hệ thống kiểm tra bằng định danh điểm (`vectorFrom === 'C' && vectorTo === 'B'`). Nếu kéo ngược hướng (`B → C`), hiển thị gợi ý quy tắc hiệu hai vectơ chung gốc $A$ và cho phép kéo lại ngay, không dùng câu hỏi trắc nghiệm A/B/C.
  4. **Bước 4 – Khôi phục cây cầu (`s1BridgeRestoredOverlay`):** Khi giải mã đúng $\vec{CB}$, cả 3 cột đá `A, B, C` và mũi tên $\vec{CB}$ phát sáng rực rỡ, Cầu Năng Lượng xuất hiện nối từ $C$ sang $B$, Rồng Xanh chúc mừng, đội nhận thưởng XP, Vàng cùng **Ấn Hướng Đi (`🧭`)** và tự động chuyển sang Chặng 2.
- **Phối hợp nhóm 3–5 học sinh & Chống lộ đáp án tuyệt đối:**
  - Hiển thị thanh phân vai trực quan theo từng bước (Thành viên 1 tìm cột đá, Thành viên 2 ghép mật thư, Thành viên 3 kéo mũi tên, Thành viên 4 xác nhận) nhưng không khóa cứng tiến trình nếu đội chỉ có 3 người hoặc mất kết nối.
  - Ẩn hoàn toàn đáp án `CB` trên bản đồ 5 chặng, thẻ kiến thức, lời giới thiệu và gợi ý tự động trước khi học sinh hoàn thành Chặng 1.
- **Đồng bộ thời gian thực với Màn Hình Giáo Viên & Màn Hình Trình Chiếu (`server.js`, `public/app.js`):**
  - Hiển thị trực tiếp trên bảng xếp hạng Giáo viên và Modal Chi Tiết Đội: `📜 Mật thư: X/3`, `🧩 Ghép mật thư: Đã ghép / Chưa`, `🌉 Cầu ánh sáng: Đã mở cầu / Chưa mở`.
- **Cập nhật Bản Chơi Thử 1 Máy (`CHOI_THU_1_MAY.html`):** Đồng bộ đầy đủ 4 bước gameplay Chặng 1 vào bản đóng gói độc lập.
- **Cập nhật Báo Cáo Biện Pháp (`Bien phap gop phan nang cao chat luong DH.docx` & `scratch/build_bien_phap_docx.py`):**
  - Đồng bộ toàn bộ nội dung văn bản Báo cáo Biện pháp 3 trang theo đúng **Quy trình thiết kế & xây dựng game giáo dục Mathverse Oxyz – “Hành Trình Giải Cứu Lục Địa OXYZ”** (ma trận 6 phút / 3 chặng Nhận biết + 2 chặng Thông hiểu, Chặng 1 “Bí Mật Cây Cầu Đảo Chiều” với 4 bước tìm mật thư – ghép biểu thức – kéo mũi tên $\vec{CB}$ – khôi phục cầu, giao diện Minimal Fantasy RPG Game-First UI chống lộ đáp án, phân vai nhóm 3–5 học sinh và Trung tâm chỉ huy Giáo viên thời gian thực).

---

## [4.2.0] - 2026-11-06

### Added & Upgraded (Màn Hình Học Sinh Minimal Fantasy RPG & Màn Hình Giáo Viên Trung Tâm Chỉ Huy + Trình Chiếu)
- **Tích hợp bộ tài nguyên hình ảnh chuẩn hóa vào `public/assets/` (`RongXanh.png`, `Stage_01_Rung_Vecto.png` .. `Stage_05_Thanh_Tri.png`):**
  - Tự động đổi ảnh nền cảnh chơi theo đúng chặng hiện tại (`Stage_01` → `Stage_05`) và hiển thị linh vật Rồng Xanh (`RongXanh.png`) xuyên suốt màn hình học sinh.
- **Nâng cấp Màn Hình Học Sinh theo chuẩn Minimal Fantasy RPG (`03_PROMPT_MAN_HINH_HOC_SINH.md` & `01_Giao_dien_hoc_sinh_1920x1080.png`):**
  - **Top Bar tối giản (58px):** Icon kim cương + `MATHVERSE OXYZ`, thanh chọn chế độ (`SĂN KHO BÁU 2D`, `THỦ THÀNH`, `3D OXYZ`, `BẢN ĐỒ LỤC ĐỊA`), đồng hồ tổng 6 phút, pill `Đội: <Tên thật>`, `<Vàng thật> VÀNG`, và cụm nút âm thanh/toàn màn hình/cài đặt.
  - **Thanh Bản Đồ 5 Chặng (88px):** 5 thẻ gọn (`01 Hiệu vectơ`, `02 Tổng vectơ`, `03 Hình bình hành`, `04 Trung điểm`, `05 Trọng tâm`) kèm nhãn mức độ (`NHẬN BIẾT` / `THÔNG HIỂU`), trạng thái mở khóa/hoàn thành và tooltip công thức khi di chuột.
  - **Khung Tương Tác Chính (Chiếm ~72% diện tích) + Cột Phụ Phải (~28%):**
    - Bên trái: Sơ đồ hình học vectơ SVG tương tác trực tiếp với mũi tên toán học trên mọi ký hiệu vectơ (`svgVecLabel`) và dấu `?` trên vectơ cần tìm để tuyệt đối không làm lộ đáp án trước khi nộp; Khung câu hỏi đơn với 3 nút đáp án lớn `A`, `B`, `C`, hiển thị đầy đủ dấu mũi tên trên đầu mọi ký hiệu vectơ kể cả vectơ-không ($\vec{0}$), và nút vàng `XÁC NHẬN` (tự động khóa khi chưa chọn đáp án).
    - Thanh đáy gọn: `ẤN VECTƠ` (5 ô) | `Chìa khóa: X/3` | `Đội 4 thành viên · Đang thảo luận` cùng nút mở ngăn kéo `Nhiệm vụ` và `Kiến thức 3D`.
    - Cột phải 3 thẻ gọn: `TÚI ẤN VECTƠ` (5 ô), `TIẾN TRÌNH ĐỘI` (`X/5 ấn`, thanh tiến độ, XP & Hạng), và `RỒNG XANH ĐỒNG HÀNH` (bong bóng thoại 1 câu + ảnh `RongXanh.png` + nút `GỢI Ý TỪ RỒNG XANH`).
- **Xây dựng Màn Hình Giáo Viên – Trung Tâm Chỉ Huy & Chế Độ Trình Chiếu Lớp Học (`04_PROMPT_MAN_HINH_GIAO_VIEN.md` & `02_Giao_dien_giao_vien_1920x1080.png`):**
  - **Header Chỉ Huy:** Logo `MATHVERSE OXYZ` | `TRUNG TÂM CHỈ HUY · GIÁO VIÊN` | `PHÒNG <mã phòng>` + badge trạng thái `LIVE` / `TẠM DỪNG` / `KẾT THÚC`.
  - **4 Thẻ KPI Thời Gian Thực:** `ĐỘI ĐANG CHƠI`, `CHẶNG HIỆN TẠI`, `CÂU ĐÚNG TOÀN LỚP`, `THỜI GIAN CÒN LẠI` (đồng bộ đồng hồ chủ 360 giây).
  - **Thanh Hành Trình 5 Chặng & Bảng Xếp Hạng Trực Tiếp:** Hiển thị `Hạng`, `Đội chơi`, `Chặng`, thanh `Tiến độ`, số câu `Đúng` (`X/10`), `XP` và thanh tóm tắt đáy (`Trực tuyến · Đang trả lời · Cần hỗ trợ`). Nhấn vào từng đội mở Modal Chi Tiết Từng Đội (nhật ký từng câu trả lời, thời gian, lịch sử dùng gợi ý, cộng điểm thưởng hợp tác).
  - **Thống Kê Sư Phạm Theo Mức Độ (`computePedagogicalStats`):** Tự động tổng hợp tỷ lệ trả lời đúng thực tế cho nhóm **NHẬN BIẾT** (Chặng 1–3) và **THÔNG HIỂU** (Chặng 4–5) theo công thức `số câu đúng / tổng số câu đã trả lời hợp lệ`, kèm bảng chi tiết 15 câu (`1.1`–`5.3`) và cảnh báo đội cần hỗ trợ.
  - **6 Nút Điều Khiển Lượt Thi Có Phân Quyền (`RBAC`):** `BẮT ĐẦU`, `TẠM DỪNG`, `TIẾP TỤC`, `TRÌNH CHIẾU`, `CHI TIẾT TỪNG ĐỘI`, `KẾT THÚC` (có hộp thoại xác nhận trước khi kết thúc sớm).
  - **Chế Độ Trình Chiếu Lớp Học (`?view=display` / `token: 'DISPLAY'`):** Giao diện máy chiếu chuyên biệt trên bảng lớn, ẩn hoàn toàn đáp án, mã PIN và nút điều khiển của giáo viên.
- **Đồng bộ Bản Chơi Thử Độc Lập (`CHOI_THU_1_MAY.html`):** Đóng gói lại toàn bộ giao diện v4.2 cho phép chạy trực tiếp trên 1 máy không cần server.

---

## [4.1.0] - 2026-11-06

### Added & Integrated (Tích Hợp Toàn Bộ Bộ Ảnh Nhân Vật Rồng Xanh, Giao Diện Mở Đầu & Cảnh Nền 5 Chặng)
- **Tích hợp đầy đủ bộ tài nguyên hình ảnh gốc vào trò chơi (`public/images/scenario/`, `app.js`, `style.css`, `CHOI_THU_1_MAY.html`):**
  - **Giao diện Game Ban Đầu (`Hành Trình Giải Cứu Lục Địa OXYZ.png` → `/images/scenario/intro-hub.jpg`):**
    - Hiển thị tại màn hình khởi đầu và nút **`🏞️ Sảnh Hành Trình`** trên thanh điều hướng.
    - Gắn các điểm tương tác trực tiếp (hotspots) lên đúng 5 đảo nổi Chặng 1–5, nút **`▶ BẮT ĐẦU HÀNH TRÌNH`**, 4 nút **`Đội chơi` / `Túi đồ` / `Kiến thức` / `Xếp hạng`** và bảng **`🎯 Mục tiêu`** tự động tích xanh theo tiến độ thật.
  - **Nhân vật Rồng Xanh (`Ảnh ChatGPT ...-1.png` → `/images/scenario/dragon-mascot.png`):**
    - Tách nền trắng trong suốt (RGBA) sắc nét, hiển thị làm linh vật dẫn đường trên thanh Header, thanh hội thoại Rồng Xanh, nhân vật đồng hành đứng trực tiếp trong từng khung cảnh chặng chơi và màn tổng kết Tâm Thạch Vectơ.
  - **Bộ 5 Cảnh Nền Chặng 1–5 (`Ảnh ChatGPT ...-2..6.png` → `stage-1.jpg` .. `stage-5.jpg`) & 5 Thẻ Kiến Thức (`card-1.jpg` .. `card-5.jpg`):**
    - *Chặng 1 – Rừng Vectơ Khởi Nguyên:* `stage-1.jpg` (Rừng cổ thụ, cầu đá & vòng tròn bệ đá tinh thể).
    - *Chặng 2 – Pháo Đài Góc Vuông:* `stage-2.jpg` (Pháo đài đá với cờ hiệu góc vuông vàng `∟`).
    - *Chặng 3 – Tháp Pha Lê:* `stage-3.jpg` (Quần đảo nổi trên mây & Tháp Pha Lê tím-lam).
    - *Chặng 4 – Mê Cung Trung Điểm:* `stage-4.jpg` (Mê cung cây xanh đối xứng & cổng xoáy không gian tím).
    - *Chặng 5 – Thành Trì Lõi Trí Tuệ:* `stage-5.jpg` (Thành trì dung nham & Tâm Thạch Vectơ trên đỉnh tháp).
    - Tích hợp 5 Thẻ Kiến Thức (`01_Hieu_hai_vecto.png` .. `05_Tinh_chat_trong_tam.png`) vào ngăn **`📘 Kiến thức`** song song với mô hình 3D Oxyz.

---

## [4.0.0] - 2026-11-06

### Added & Rebuilt (Kịch Bản Game Giáo Dục 6 Phút: Hành Trình Giải Cứu Lục Địa OXYZ)
- **Xây Dựng Lại Toàn Bộ Kịch Bản & Ngân Hàng Câu Hỏi Sư Phạm 6 Phút (`stages.js`, `server.js`, `app.js`, `style.css`):**
  - **Bối cảnh & Nhân vật:**
    - **Rồng Xanh (`CHAR_GREEN_DRAGON_MASCOT_SVG`):** Người dẫn đường xuyên suốt trò chơi với đúng **1 câu thoại ngắn gọn** tại mỗi thời điểm (giao nhiệm vụ, phản hồi đúng/sai, tự động gợi ý khi còn `<= 15 giây`, chúc mừng khi thu hồi Ấn Vectơ).
    - **Bóng Lỗi:** Đánh cắp 5 Ấn Vectơ và xuất hiện tại cảnh chuyển chặng / Chặng 5 (*"Các ngươi sẽ không thể tìm ra tâm điểm sức mạnh!"*). Học sinh đánh bại Bóng Lỗi bằng kiến thức toán học.
  - **Phân bổ thời gian chuẩn 6 phút (360 giây):**
    - Đồng hồ tổng mặc định `06:00` (`360 giây`) kết hợp đồng hồ đếm ngược riêng cho từng chặng (`60s` / `60s` / `65s` / `65s` / `70s`). Khi hết giờ chặng, hệ thống tự động ghi nhận kết quả và chuyển đội sang chặng tiếp theo để không làm gián đoạn tiết học.
  - **Cấu trúc 3 Phần Thống Nhất trên mỗi Chặng (`3 mảnh chìa khóa 1/3 → 2/3 → 3/3`):**
    - **Phần 1 – Khám phá (Mảnh khóa 1/3):** Tương tác trực tiếp trên sơ đồ hình học vectơ SVG chính xác (không làm lộ đáp án trước khi trả lời):
      1. *Chặng 1 (Rừng Vectơ Khởi Nguyên – Nhận biết – 60s):* Kích hoạt 3 cột mốc $A, B, C$ khôi phục $\vec{AB}, \vec{AC}$ và chiều cây cầu $\vec{CB} = \vec{AB} - \vec{AC}$ → **Ấn Hướng Đi** (`🧭`).
      2. *Chặng 2 (Pháo Đài Góc Vuông – Nhận biết – 60s):* Kích hoạt hai con đường năng lượng nối tiếp $\vec{AB}$ và $\vec{BC}$ → **Ấn Kết Nối** (`🔗`).
      3. *Chặng 3 (Tháp Pha Lê – Nhận biết – 65s):* Kích hoạt hai vectơ cạnh $\vec{AB}$ và $\vec{AD}$ cùng xuất phát từ đỉnh $A$ của hình bình hành $ABCD$ → **Ấn Cân Bằng** (`💠`).
      4. *Chặng 4 (Mê Cung Trung Điểm – Thông hiểu – 65s):* Đưa viên pha lê $I$ về đúng trung điểm ($50\%$) đoạn $AB$ để cân bằng hai vectơ đối nhau $\vec{IA} + \vec{IB} = \vec{0}$ → **Ấn Cân Xứng** (`⚖️`).
      5. *Chặng 5 (Thành Trì Lõi Trí Tuệ – Thông hiểu – 70s):* Chọn đúng giao điểm trọng tâm $G$ của 3 đường trung tuyến trong tam giác $ABC$ để phát sáng $\vec{GA}, \vec{GB}, \vec{GC}$ → **Ấn Trí Tuệ** (`👑`).
    - **Phần 2 & Phần 3 – Giải mã 1 & Giải mã 2 (Mảnh khóa 2/3 & 3/3):** Hệ thống tự động bốc ngẫu nhiên **2 câu hỏi không trùng lặp** từ ngân hàng 3 câu của mỗi chặng (`rollStagePicks()`), tổng cộng **15 câu hỏi chuẩn (`1.1`–`5.3`)** với 3 lựa chọn lớn `A, B, C` và 1 nút Xác nhận.
  - **Màn Kết Thúc – Khôi Phục Tâm Thạch Vectơ:** Tổng kết số Ấn Vectơ thu hồi (`X/5`), số câu giải mã đúng (`X/10`), điểm XP và thứ hạng của đội.
  - **Đồng bộ Bản Chơi Thử Độc Lập (`CHOI_THU_1_MAY.html`):** Cập nhật đầy đủ ngân hàng 15 câu hỏi, bộ chọn ngẫu nhiên 2 câu/chặng và đồng hồ 6 phút cho chế độ offline 1 máy.

---

## [3.5.0] - 2026-11-06

### Changed & Optimized (Minimal Fantasy RPG – Game-First UI)
- **Tối Giản Hóa Giao Diện theo Nguyên Tắc "70% Trải Nghiệm Hình Ảnh – 30% Thông Tin & Điều Khiển":**
  - **Giảm 65–70% lượng chữ hiển thị mặc định:** Chuyển toàn bộ cốt truyện dài, danh sách nhiệm vụ, phân vai nhóm, phần thưởng và công thức Toán 12 vào các ngăn kéo thu gọn (`🎯 Nhiệm vụ`, `📘 Kiến thức`) và tooltip khi di chuột.
  - **Thu gọn phần đầu trang (`.mv-topnav`):** Hợp nhất thành một thanh Header gọn (~48px) chỉ hiển thị linh vật **Rồng Xanh**, tên game **MATHVERSE OXYZ**, nút chuyển chế độ (`🗺️ 2D`, `🏰 Thủ thành`, `🧊 3D Oxyz`), tên đội, **Vàng & XP** và các icon cài đặt (`🔊`, `⛶`, `👩‍🏫`, `⚙️`). Lược bỏ banner mô tả dài trong màn hình chơi.
  - **Thanh Hành Trình 5 Chặng Tối Giản (`.mv-journey-bar`):** Hiển thị hình ảnh đảo nổi đại diện, số chặng, biểu tượng trạng thái (`✅`, `⭐`, `🔒`) và **tên rút gọn**:
    1. *Hiệu vectơ*
    2. *Tổng vectơ*
    3. *Hình bình hành*
    4. *Trung điểm*
    5. *Trọng tâm*
    *(Tên đầy đủ, công thức và mô tả chế độ chơi xuất hiện trong popover tooltip khi hover).*
  - **Thanh Nhiệm Vụ 1 Dòng (`.mv-quest-bar`):** Hiển thị gọn `CHẶNG 1 – HIỆU VECTƠ | 🔑 0/3 | ⭐ +500 XP | [▶ BẮT ĐẦU]` cùng nút mở ngăn `🎯 Nhiệm vụ`, `📘 Kiến thức` và nút thu gọn Sidebar (`⇥`/`⇤`).
  - **Ưu Tiên Diện Tích Màn Chơi (Game-First Viewport):** Màn hình game 2D/3D xuất hiện trọn vẹn ngay trong viewport đầu tiên ở cả độ phân giải `1920×1080` và `1366×768` (`height: clamp(470px, 66vh, 660px)`), tích hợp cảnh nền thế giới đảo nổi Fantasy (`/images/fantasy-floating-world.jpg`) và lược bỏ các khung chữ thừa đè lên bản đồ.
  - **Sidebar 3 Widget Siêu Gọn & Có Thể Thu Gọn (`.mv-sidebar`):**
    1. **Túi đồ:** 5 biểu tượng vật phẩm kèm tooltip, không có đoạn văn mô tả dài.
    2. **Xếp hạng:** Chỉ hiển thị thứ hạng hiện tại của đội (`🥇 Hạng #1 · XP`) và nút `Bảng đầy đủ >`.
    3. **Tiến trình:** 1 thanh XP và 2 chỉ số ngắn gọn (`Chặng 0/5`, `Trạm 0/15`).
  - **Thanh Công Cụ Icon Có Tooltip (`.mv-bottom-nav`):** Chuyển các nút chức năng phụ thành icon có tooltip tức thì (`🗺️`, `👥`, `🎒`, `📘`, `🎯`, `⚙️`) và nút chuyển chặng `◀` `1/5` `▶`.

---

## [3.4.0] - 2026-11-06

### Added & Overhauled (Fantasy Adventure RPG + Holographic MathVerse UI/UX Upgrade)
- **Nâng cấp Toàn Diện Giao Diện MATHVERSE OXYZ theo Phong Cách Fantasy Adventure RPG + 3D Holographic:**
  - **Hệ thống Màu & Typography (`index.html`, `style.css`):**
    - Tích hợp font chữ `Montserrat` hỗ trợ đầy đủ tiếng Việt cùng hệ màu chủ đạo: Background (`#0B1227`), Deep Navy (`#101B3B`), Royal Purple (`#5846C9`), Electric Cyan (`#1AB6B5`), Emerald Green (`#35C992`), Treasure Gold (`#F2B94B`), Text White (`#F8FAFF`).
  - **A. Thanh Điều Hướng Tối Giản & Chuyên Nghiệp (`.mv-topnav`):**
    - Bên trái: Biểu tượng sao kim cương phát sáng + Logo `MATHVERSE OXYZ`.
    - Chính giữa: 4 nút chức năng `🎓 TOÁN 12 (GDPT 2018)`, `🗺️ SĂN KHO BÁU 2D`, `🏰 THỦ THÀNH`, `🧊 3D OXYZ` kết nối trực tiếp với các chế độ chơi và mô hình 3D.
    - Bên phải: Nút Âm thanh, Toàn màn hình, Chuyển màn hình Giáo viên, Đổi màn hình và Huy hiệu Đội chơi.
  - **B. Hero Banner Phiêu Lưu & Linh Vật Rồng Xanh (`.mv-vista-container`):**
    - Thiết kế đồ họa vector linh vật **Rồng Xanh Oxyz (`CHAR_GREEN_DRAGON_MASCOT_SVG`)** đeo kính bảo hộ công nghệ và giáp ngực OXYZ.
    - Tiêu đề vòng nguyệt quế vàng kim `HÀNH TRÌNH GIẢI CỨU LỤC ĐỊA OXYZ`, thông tin đội chơi, mã phòng, huy hiệu Vàng + Cấp độ (`Lv.`) và thanh XP đi kèm khối lập phương tọa độ 3D Oxyz Hologram (`HERO_OXYZ_CUBE_SVG`).
  - **C. Bản Đồ Hành Trình 5 Chặng Đảo Nổi (`mapTrack` & `ISLAND_SVGS`):**
    - Thay thế các thẻ đơn giản bằng 5 hòn đảo nổi minh họa SVG độc quyền nối với nhau bởi **Con đường ánh sáng năng lượng (`.mv-light-path-svg`)**: *Rừng Vectơ Khởi Nguyên*, *Pháo Đài Góc Vuông*, *Tháp Pha Lê Khoảng Cách*, *Mê Cung Trung Điểm*, *Thành Trì Lõi Trí Tuệ*.
    - Hiển thị mũi tên vàng định vị chặng đang chơi, đánh giá sao `⭐⭐⭐`, biểu tượng khóa `🔒` cho chặng chưa mở và tooltip chi tiết khi di chuột.
  - **D. Khu Vực Game Chính & Bảng Nhiệm Vụ Thu Gọn (`.mv-game-frame` & `.mv-briefing-banner`):**
    - Khung game trung tâm viền Electric Cyan phát sáng, tích hợp bảng Nhiệm vụ chặng có thể thu gọn/mở rộng (`📜 Nhiệm vụ`), hiển thị mô tả cốt truyện, checklist tiến độ (`0/3`), phần thưởng chặng và nút CTA ánh kim `▶ BẮT ĐẦU CHƠI CHẶNG X` không che khuất vùng thao tác của học sinh.
  - **E. Sidebar Bên Phải 3 Khối Đồng Bộ Thời Gian Thực (`.mv-sidebar`):**
    - **Khối 1 – Túi Vật Phẩm (5 ô):** Hiển thị 5 ô chìa khóa/cổ vật phát sáng khi sở hữu và trạng thái khóa kèm tooltip giải thích công dụng.
    - **Khối 2 – Bảng Xếp Hạng Lớp:** Làm nổi bật Top 1, 2, 3 (`🥇`, `🥈`, `🥉`) và nút `Xem đầy đủ bảng xếp hạng >` mở modal chi tiết.
    - **Khối 3 – Tiến Trình Của Đội:** Hiển thị cấp độ `Lv.`, thanh XP chuyển động mượt và 3 thẻ chỉ số (`Chặng`, `Nhiệm vụ`, `Hạng tạm thời`).
  - **F. Thanh Điều Hướng Phía Dưới (`.mv-bottom-nav`):**
    - Tích hợp đầy đủ các nút tương tác thật: `🏠 Trang chủ`, `🗺️ Bản đồ Oxyz`, `🎒 Túi đồ`, `👥 Đội / Nhóm`, `💡 Gợi ý`, `📜 Nhiệm vụ` và bộ chuyển chặng `< Chặng trước` / `Chặng X / 5` / `Chặng tiếp >`.
  - **Tối Ưu Responsive & Hiệu Năng:** Tương thích màn hình `1920×1080`, `1366×768`, hỗ trợ `prefers-reduced-motion`, đóng gói đồng bộ vào [CHOI_THU_1_MAY.html](file:///c:/Users/ADMIN/Downloads/ggvdg%20duyen/MATHVERSE_OXYZ_MINIGAMES/CHOI_THU_1_MAY.html) (~2.37 MB) và vượt qua 100% bài kiểm thử 5 chặng.

---

## [3.3.1] - 2026-11-06

### Fixed (Global Character SVGs Scope Definition)
- **Sửa Lỗi `CHAR_EXPLORER_SVG is not defined`:**
  - Chuyển toàn bộ các khai báo hằng số đồ họa `CHAR_*_SVG` (Cung thủ, Pháp sư, Hiệp sĩ, Rồng boss, Quái vật, Nhà thám hiểm) lên đầu file `public/app.js` ngay sau `'use strict'`, đảm bảo phạm vi toàn cục (Global Scope) trước khi các hàm render màn hình khởi động hoặc mê cung được gọi.
  - Tái biên dịch file chạy thử offline [CHOI_THU_1_MAY.html](file:///c:/Users/ADMIN/Downloads/ggvdg%20duyen/MATHVERSE_OXYZ_MINIGAMES/CHOI_THU_1_MAY.html) (~2.31 MB), kiểm thử toàn diện 100% Pass.

---

## [3.3.0] - 2026-11-06

### Added & Overhauled (High-Detail Character Artworks & Vector Animations)
- **Thiết Kế Lại Toàn Bộ Nhân Vật Game Bằng Đồ Họa Vector SVG Đa Tầng Chi Tiết:**
  - Thay thế toàn bộ các emoji đơn điệu bằng tác phẩm đồ họa vector chất lượng cao, có chiều sâu, hiệu ứng ánh sáng gradient, bóng đổ và hoạt họa thở/bước đi:
  - **Bộ 3 Anh Hùng Thủ Thành (Chặng 2):**
    - **Cung Thủ Ox (`CHAR_ARCHER_SVG`):** Áo choàng xanh navy, mũ gắn lông vũ đỏ, bao tên da sau lưng, cung liên hợp giương sẵn mũi tên năng lượng xanh cyan lấp lánh và hào quang phong ấn.
    - **Pháp Sư Oy (`CHAR_MAGE_SVG`):** Áo chùng tím thêu chỉ vàng, mũ phù thủy cao chót vót, râu dài hiền triết, tay cầm quyền trượng pha lê ma thuật tím với quả cầu năng lượng xoay vần.
    - **Hiệp Sĩ Oz (`CHAR_PALADIN_SVG`):** Bộ giáp thép sáng loáng viền vàng hoàng gia, mũ giáp cánh chim, áo choàng đỏ thắm, khiên sắt khắc quốc huy sư tử và đại thanh kiếm ánh sáng uy nghiêm.
  - **Đại Boss Rồng Bóng Đen Lãng Quên (Chặng 5 - `CHAR_DRAGON_SVG`):**
    - Thiết kế đại boss rồng khổng lồ: Đôi cánh dơi hắc ám xòe rộng với tĩnh mạch tím, sừng rồng cong vút phát sáng đỏ rực, mắt lửa địa ngục vàng-đỏ, hàm răng nanh sắc nhọn và hiệu ứng trôi nổi bồng bềnh (`boss-dragon-hover`).
  - **Đội Quân Quái Vật Lâu Đài (Castle Defense):**
    - **Goblin Tiên Phong (`CHAR_GOBLIN_SVG`):** Da xanh lục, tai dài nhọn hoắt, mắt đỏ hung hãn, áo giáp da và cầm song đao sẵn sàng đột kích.
    - **Dơi Quỷ Hắc Ám (`CHAR_BAT_SVG`):** Cánh màng tím sẫm, mắt đỏ rực và hoạt ảnh đập cánh liên hồi.
    - **Bộ Xương Chiến Binh (`CHAR_SKELETON_SVG`):** Hốc mắt xanh linh hồn phát sáng, khung xương sườn chi tiết, khiên tròn kim loại và đao liêm rỉ sét.
    - **Orc Thiết Giáp (`CHAR_ORC_SVG`):** Quái thú cơ bắp đỏ au, mũ sắt sừng trâu, rìu chiến hai lưỡi khổng lồ.
  - **Nhân Vật Thám Hiểm Oxyz (Chặng 1 Săn Kho Báu & Chặng 4 Mê Cung - `CHAR_EXPLORER_SVG`):**
    - Chibi thám hiểm đáng yêu với mũ rộng vành, balo dã ngoại có túi ngủ, tay cầm ngọn đuốc pha lê tọa độ phát sáng soi đường và hoạt ảnh bước chân sinh động khi di chuyển.
  - **Đồng bộ hóa sang CHOI_THU_1_MAY.html:**
    - Rebuild bản offline (~2.30 MB), kiểm thử toàn diện cả 5 chặng đạt 100% Pass.

---

## [3.2.0] - 2026-11-05

### Added & Upgraded (Magictools Game UI, Kenney 3D Tactile Buttons & Particle Juice Engine)
- **Khai Thác Kho Tàng Magictools Đột Phá Giao Diện Mathverse Oxyz:**
  - **Kenney UI 3D Tactile Buttons:**
    - Toàn bộ nút bấm `.button` (Primary, Gold, Teal, Red, Gray) và `.hw-btn-hud` được nâng cấp hiệu ứng 3D khối: viền nổi 5px, highlight gradient mặt trên, và hiệu ứng thụt xuống màn hình (`transform: translateY(3px)`) khi nhấn chuột tạo cảm giác cơ học xúc giác chân thực.
    - Nút đáp án mê cung `.maze-ans-btn` có hiệu ứng đổ bóng nổi 3D và đổi màu teal phát sáng khi rê chuột.
  - **Hệ Thống Chữ Nổi & Combo (Floating Combat Text - FCT):**
    - Tự động xuất hiện chữ nổi bay lượn bezier với hiệu ứng hào quang: `+20 XP ⭐`, `+240 🪙`, `COMBO x3 🔥`, `−1 💔` khi học sinh thực hiện các thao tác toán học trong game.
  - **Động Cơ Hiệu Ứng Pháo Hoa & Hạt Năng Lượng (Canvas Particle Confetti System):**
    - Tích hợp động cơ hạt vật lý 60fps thuần trên HTML5 Canvas: phun trào 55–110 mảnh pháo hoa đa sắc (sao vàng, kim cương, hạt rune lấp lánh) khi chinh phục thành công mỗi chặng và khi giải mã mở rương kho báu cuối.
  - **Huy Hiệu Phân Vai Nhóm Rực Rỡ (Role Badges):**
    - Bộ huy hiệu chuyên biệt: $Ox$ (Sky Blue), $Oy$ (Neon Purple), $Oz$ (Amber Gold), Đội trưởng (Emerald).
  - **Đồng bộ hóa sang CHOI_THU_1_MAY.html:**
    - Rebuild bản offline đơn file (~2.30 MB), kiểm thử toàn bộ 5 chặng đạt 100% Pass.

---

## [3.1.0] - 2026-11-05

### Added & Integrated (Arwes Futuristic Sci-Fi UI, Decrypt Engine & Audio Bleeps)
- **Tích Hợp Triết Lý Thiết Kế Arwes (Futuristic Sci-Fi UI Framework) vào Mathverse Oxyz:**
  - **Khung Viền Sci-Fi Đa Lớp (Chamfered Cyber Frames & Brackets):**
    - Áp dụng kỹ thuật `clip-path: polygon(...)` vát góc 45 độ, viền sáng neon Cyan (`#00f8ff`), Gold (`#facc15`) và 4 góc định vị bracket (`.arwes-corner`) phát sáng.
    - Tia laser quét ngang liên tục (`.arwes-scanner-line`) trên các khung bảng điều khiển.
    - Nâng cấp **Mô hình 3D Oxyz Hologram Box**, **Modal Sổ Mật Thư Cổ Đại**, **Màn hình Mở Rương Trạm Cuối (Cyber Core)** và **Bảng Vinh Quang Đội Chiến Thắng**.
  - **Công Nghệ Giải Mã Chữ Hoạt Họa Arwes (Decrypt / Cipher Text Engine):**
    - Xây dựng hàm `runArwesDecrypt(el, targetText, duration, onComplete)`: Chạy ngẫu nhiên các ký tự công nghệ (`0-9`, `A-Z`, `Δ`, `Ω`, `Σ`, `λ`, `φ`, `ψ`, `⌘`, `⚙`, `⚡`) kết hợp tiếng lách cách điện tử `sound('cipher')` trước khi chốt lại văn bản tiếng Việt chính xác.
    - Tự động áp dụng cho: Tiêu đề mở rương trạm cuối, tên đội chiến thắng, và thông điệp chung cuộc *"TƯ DUY VÀ HỢP TÁC MỞ KHO BÁU"*.
  - **Hệ Thống Âm Thanh Sci-Fi Web Audio API (Arwes Bleeps):**
    - Bổ sung các dải âm điện tử tần số cao: `bleep` (click phím bấm, độ trễ 0.04s), `cipher` (dữ liệu giải mã), `assemble / powerup` (kích hoạt cổng không gian), `scan` (quét radar và góc xoay 3D).
    - Tự động phát âm thanh `sound('bleep')` khi học sinh thao tác trên các nút bấm giao diện.
  - **Đồng bộ hóa toàn diện sang bản chạy đơn độc lập:**
    - Biên dịch lại [CHOI_THU_1_MAY.html](file:///c:/Users/ADMIN/Downloads/ggvdg%20duyen/MATHVERSE_OXYZ_MINIGAMES/CHOI_THU_1_MAY.html) (~2.29 MB) tích hợp trọn vẹn Arwes styles và Decrypt engine, kiểm thử tự động 100% Pass.

---

## [3.0.0] - 2026-11-05

### Added & Completed (Phase 3 – Hoàn Thiện Báo Cáo Biện Pháp GVG Chuẩn 3 Trang Word)
- **Hoàn thành xuất sắc Báo cáo Biện pháp nâng cao chất lượng giảng dạy:**
  - Tên văn bản: `Bien phap gop phan nang cao chat luong DH.docx` (và bản in `Bien_phap_gop_phan_nang_cao_chat_luong_DH.pdf`).
  - Tên biện pháp: *Ôn tập kiến thức bằng game tương tác (Mathverse Oxyz)* của cô giáo Đinh Thị Thảo Nguyên, Trường THPT số 1 Phan Chu Trinh (Đắk Lắk).
  - Căn cứ pháp lý: Kế hoạch số 96/KH-S1PCT và Thông tư số 22/2019/TT-BGDĐT.
- **Tuân thủ nghiêm ngặt thể thức và cấu trúc 4 phần chuẩn:**
  - **Phần I:** Lý do chọn biện pháp và thực trạng học sinh vùng Ea H'Leo; 4 mục tiêu sư phạm; 3 giải pháp cụ thể (Chuỗi 5 minigame Oxyz; Phân vai $Ox, Oy, Oz$ & Đội trưởng; Mạng LAN Zero-dependency không cần Internet & Mô phỏng 3D Oxyz).
  - **Phần II:** Hiệu quả sư phạm đối với học sinh (hứng thú, xóa nỗi sợ hình không gian, phản xạ công thức) và đối với giáo viên/nhà trường (chuyển đổi số, tự động hóa đánh giá).
  - **Phần III:** Minh chứng thực nghiệm đối chứng giữa Lớp Thực nghiệm 12A1 (42 HS) và Lớp Đối chứng 12A2 (41 HS) với 2 bảng số liệu kẻ ô rõ nét:
    + Bảng 1: Điểm kiểm tra (Tỉ lệ Giỏi 12A1 đạt 45.2% so với 12A2 đạt 19.5%; Điểm TB 7.86 so với 6.42; 0% học sinh dưới điểm 5).
    + Bảng 2: Khảo sát thái độ và năng lực hợp tác (92.8% rất hứng thú, 95.2% hài lòng phân vai, 90.5% tự tin nhớ công thức).
    + Ghi nhận đánh giá của Tổ chuyên môn Toán – Tin Trường THPT số 1 Phan Chu Trinh.
  - **Phần IV:** Tính khả thi, khả năng nhân rộng, cam đoan của tác giả và bảng chữ ký xác nhận của Hiệu trưởng & Giáo viên báo cáo.
- **Đạt chuẩn kích thước & nghiệm thu kỹ thuật:**
  - Kiểm tra qua Microsoft Word COM Automation (`scratch/check_word.ps1`): Độ dài đạt **chính xác 3 trang in A4** (Words = 1724, Lines = 143), không bị tràn sang trang 4, phân bố nội dung cân đối.
  - Tạo artifact trực quan hóa `Bao_Cao_Bien_Phap_3_Trang.md` với hình ảnh chất lượng cao 3 trang in.

---

## [2.13.0] - 2026-11-05

### Added (Chặng 3 – Zombie tiến công khi bắn trượt)
- **Zombie bò dần về hàng rào:** 4 zombie liên tục tiến từ phải sang trái theo thời gian thực (vòng lặp 60fps `zdTick`), tạo áp lực thời gian cho đội; khi chạm hàng rào sẽ đập rào (`zd-bash`).
- **Bắn trượt → zombie tăng tốc & lao tới cắn xạ thủ:**
  - Zombie mang đáp án sai gầm lên, chạy nước rút (tăng tốc dần) vượt qua hàng rào và lao thẳng tới xạ thủ trong ~1 giây.
  - Khi chạm: xạ thủ bị cắn (giật lùi, chớp đỏ), sân rung, tiếng nổ, nhãn `🧟 ZOMBIE ĐÃ LAO TỚI CẮN! −1 KHIÊN 💔`; sau đó zombie bị đẩy về điểm xuất phát để đội trả lời lại.
  - Cả bầy chạy nước rút ×7 trong 1,5 giây, và tốc độ nền tăng thêm 60% sau mỗi lần trượt (hiển thị `🧟 Tốc độ zombie x1.6, x2.2…` trên HUD). Tốc độ đặt lại khi sang câu mới.
- Đạn bay tới đúng vị trí hiện tại của zombie; zombie được dựng ở tầng sân chơi để có thể vượt hàng rào và đè lên xạ thủ.
- Đồng bộ vào `CHOI_THU_1_MAY.html`; thêm `scratch/test_zd_charge.js` kiểm thử logic.

---

## [2.12.0] - 2026-11-05

### Added & Overhauled (Complete 5 Interactive Stage Games & Unified Quick Navigation)
- **Hoàn Thiện Toàn Diện 5 Game Tương Tác Độc Lập Cho 5 Chặng Toán 12 Oxyz:**
  - **Chặng 1 – 🗺️ SĂN KHO BÁU 2D (Quần Đảo Rừng Vectơ - Island Explorer RPG):**
    - Tọa độ vectơ $\overrightarrow{AB} = (x_B-x_A; y_B-y_A; z_B-z_A)$ qua 3 Đền Cổ ($Ox, Oy, Oz$).
    - Hỗ trợ tự lái bằng **WASD / Phím mũi tên / D-Pad / Chạm bản đồ**, đồng thời bổ sung nút **`🏃 Tự chạy tới Đền`** và tự động mở Cuộn Giấy Chiến Đấu khi chạm vào Đền đang mở. Vượt đủ 3 Đền nhận mảnh số **`3`**.
  - **Chặng 2 – 🏰 THỦ THÀNH CHIẾN THUẬT 3 LÀN (Pháo Đài Vuông Góc - Real-time Castle Defense):**
    - Tích vô hướng $\vec{u}\cdot\vec{v}$ và điều kiện hai vectơ vuông góc $\vec{u}\perp\vec{v} \Leftrightarrow \vec{u}\cdot\vec{v} = 0$.
    - Cập nhật `initCastleForStage` tự động triệu hồi đội quân quái vật + Boss mới ngay khi chuyển qua Đợt 1, Đợt 2, Đợt 3; kết hợp 3 Anh Hùng bắn tự động 60fps, 4 Kỹ năng thời tiết, 4 Nâng cấp Vàng và khai hỏa **Đại Bác Laser Oxyz** nhận mảnh số **`0`**.
  - **Chặng 3 – 🧟 CHẶN ZOMBIE 4 LÀN (Tháp Pha Lê Khoảng Cách - Zombie Defense chuẩn GiaoVienDoiMoi):**
    - Độ dài vectơ $|\vec{u}|$ và khoảng cách hai điểm $AB$ qua 5 câu hỏi thu thập 5 mảnh cổ tự `P - H - A - L - E`.
    - Tách biệt luồng phản hồi trực tiếp trên 4 làn cỏ: bắn trúng Zombie hiện hiệu ứng ngã gục + nhận mảnh Rune; bắn sai hiện thanh gợi ý công thức NOVA ngay trên HUD; hoàn thành đủ 5 câu tự động mở **📜 Bàn Giải Mã Cổ Tự `PHALE`** nhận mảnh số **`5`**.
  - **Chặng 4 – 🌀 MÊ CUNG TỌA ĐỘ Ô VUÔNG (Mê Cung Trung Điểm - Interactive 2-Column Coordinate Grid Maze):**
    - Tọa độ trung điểm $M$, trọng tâm tam giác $G$ và điểm đối xứng qua 5 Trạm tọa độ thu thập 5 mảnh `T - R - U - N - G`.
    - Nâng cấp giao diện 2 Cột trực quan: Cột trái hiển thị đề bài, 4 nút chọn đáp án tọa độ `A, B, C, D` và cụm phím D-Pad; Cột phải là bàn cờ mê cung $9\times 7$ có trục $Ox, Oy$ với thuật toán tìm đường thông minh (BFS) giúp nhân vật tự bước qua các ô không có tường tới Cổng Dịch Chuyển. Ghép mã `TRUNG` nhận mảnh số **`2`**.
  - **Chặng 5 – 💣 DÒ MÌN BÃI CỎ & 🐲 ĐẠI CHIẾN BOSS CUỐI (Thành Trì Lời Trí Tuệ):**
    - **Giai đoạn 1 (5 Câu Dò Mìn Bãi Cỏ chuẩn GiaoVienDoiMoi):** Chú lính chạy bộ đa hướng tới đáp án trên bãi cỏ; nếu đạp phải mìn nổ BÙM rung màn hình và văng lùi về vị trí xuất phát `(50%, 82%)`; nếu đúng nhận mảnh cổ ngữ `B - A - O - V - E`.
    - **Giai đoạn 2 (Ghép mã `BAOVE` & Đấu Trường Boss 500 HP):** Kích hoạt Lá Chắn Thành Trì và hiển thị trực tiếp **Bảng Điều Khiển Đại Pháo Laser Oxyz** ngay trên màn hình đấu Boss ($\vec{w} = 2\vec{u} + \vec{v}, |\vec{w}| = \sqrt{33}$) để kết liễu Boss Bóng Đen và nhận mảnh số **`4`**.
- **Thanh Chuyển Nhanh 5 Chặng Game & Đồng Bộ Offline:**
  - Hiển thị thanh **🎮 Chuyển nhanh 5 Game Tương Tác** và cho phép nhấp trực tiếp vào 5 Hòn Đảo trên cả bản Server LAN (`http://localhost:3000`) và bản Offline ([CHOI_THU_1_MAY.html](file:///c:/Users/ADMIN/Downloads/ggvdg%20duyen/MATHVERSE_OXYZ_MINIGAMES/CHOI_THU_1_MAY.html)).
  - Kiểm thử tự động toàn trình `scratch/test_all_5_stages.js` và `scratch/test_standalone_flow.js` đạt 100% Pass.

---

## [2.11.0] - 2026-11-03

### Fixed & Enhanced (Full Authentic Minesweeper & Error Hardening)
- **Khắc Phục Hoàn Toàn Lỗi Runtime & Render Banner:**
  - Bảo vệ 100% tất cả các lời gọi `String.prototype.repeat(...)` với hàm cận an toàn `Math.max(0, Math.min(3, Math.floor(...) || 0))`, loại bỏ hoàn toàn lỗi `RangeError: Invalid count value: -1`.
  - Khắc phục triệt để lỗi `renderStageGame is not defined` và sửa đổi `submitStageAnswer` để trả về đúng kết quả đối tượng, không còn tự ý bật modal generic che mất màn hình Chặng 5.
- **Hoàn Thiện Chặng 5 Dò Mìn Chuẩn 100% Ảnh Mẫu GiaoVienDoiMoi:**
  - **Bố cục 2 Cột Độc Lập:**
    - Cột Trái (`.ms-left-sidebar`): Thẻ bài câu hỏi trắng thanh lịch, bo tròn góc với tiêu đề `CÂU X / Y` và nội dung câu hỏi Toán 12 Oxyz bằng chữ đen đậm cực kỳ sắc nét, rõ ràng chuẩn sư phạm.
    - Cột Phải (`.ms-right-arena`): Bãi cỏ rộng lớn phủ cỏ rêu xanh ngát (`ground-bg.png`).
  - **Hệ Thống Đáp Án Tự Do Trên Bãi Cỏ:**
    - Các phương án A, B, C, D được bố trí theo hình cánh cung mở rộng phía trước chú lính (`MS_CHOICE_COORDS_4`).
    - Huy hiệu chữ cái tròn `(A)`, `(B)`, `(C)`, `(D)` viền trắng nền đen, bên dưới là công thức toán học chữ trắng viền đen tương phản cực nét (`formatMath` hỗ trợ đầy đủ ký hiệu $\pi$, vector $\vec{u}$, $\sqrt{\dots}$, số mũ $^2, ^3$, đơn vị cm).
  - **Animation Chú Lính Chạy Bộ Đa Hướng Tới Tận Nơi Đáp Án:**
    - Chú lính xuất phát tại đáy màn hình `(50%, 82%)`. Khi học sinh nhấn chọn đáp án bất kỳ, hệ thống tính toán góc hướng chính xác (`up`, `left`, `right`, `down`), chú lính chuyển động chạy bộ mượt mà với 2 khung hình chân so le thay đổi liên tục và âm thanh bước chân sinh động, chạy tới đứng ngay trước phương án đã chọn.
  - **Hiệu Ứng Bù Khoáng Nổ Mìn Bị Hất Văng Về Vị Trí Ban Đầu (Knockback Return):**
    - Nếu chọn trúng mìn: Quả mìn phát nổ chấn động với hiệu ứng tia lửa rực rỡ (`ms-blast-overlay`), màn hình rung lắc mạnh mẽ (`shake`), âm thanh bom nổ rền vang `/sounds/sfx/explosion.mp3`.
    - Chú lính giật nảy người choáng váng (`wobble`) và **ngay lập tức bị hất văng / chạy lùi quay trở lại vị trí xuất phát ban đầu `(50%, 82%)`**.
    - Phương án đạp phải mìn được đánh dấu bằng biểu tượng `💥` gạch ngang đỏ để học sinh không chọn lại, trừ 1 khiên sinh mệnh và hiển thị thông báo `💥 BÙM! ĐẠP PHẢI MÌN! VĂNG VỀ VỊ TRÍ BAN ĐẦU!`. Học sinh có thể bấm chọn tiếp phương án khác để tiếp tục hành trình.
    - Nếu chọn đúng: Tiếp đất an toàn, chuông reo ngân vang `/sounds/sfx/correct.mp3`, nhận huy hiệu Cổ Ngữ (B, A, O, V, E) và tiến vào câu kế tiếp.
- **Đóng Gói & Đồng Bộ:**
  - Tự động biên dịch lại file ngoại tuyến [CHOI_THU_1_MAY.html](file:///c:/Users/ADMIN/Downloads/ggvdg%20duyen/MATHVERSE_OXYZ_MINIGAMES/CHOI_THU_1_MAY.html) (2.26 MB) nhúng toàn bộ Base64 sprite chú lính và âm thanh, hoạt động hoàn hảo 100% không cần Internet.
  - Kiểm thử tự động `test_adventure_flow.js` và `test_standalone_flow.js` đạt 100% Pass.

---

## [2.10.0] - 2026-11-03

### Added & Overhauled (Exact Giaoviendoimoi Layout & Knockback Explosion)
- **Chuẩn Hóa 100% Giao Diện Game Dò Mìn Bãi Cỏ Theo Đúng Ảnh Mẫu Giaoviendoimoi:**
  - **Bố cục 2 Cột Chuyên Nghiệp:**
    - Cột Trái (`.ms-left-sidebar`): Khung thẻ trắng thanh lịch hiển thị nhãn `CÂU X` và bài toán Toán 12 Oxyz bằng chữ to đậm màu xanh thẫm, kèm các nút thao tác hỗ trợ (Gợi ý 2 cấp, Phân vai, Sổ mật thư).
    - Cột Phải (`.ms-right-arena`): Toàn cảnh bãi cỏ xanh ngát trải dài (`ground-bg.png`).
  - **Phương Án Trả Lời Trực Quan Trên Bãi Cỏ:**
    - Vòng tròn huy hiệu màu đen viền trắng hiển thị `(A)`, `(B)`, `(C)`, `(D)` đặt ngay trên bãi cỏ với chữ số công thức màu trắng to viền đen tương phản cực nét, bố trí theo hình cánh cung mở rộng.
  - **Bộ Sprite Chú Lính Xạ Thủ Mũ Cối Gốc (Original Soldier Sprite Sheet):**
    - Sử dụng bộ sprite chính thức trích xuất từ Giaoviendoimoi (`soldier-up-1.png`, `soldier-up-2.png`, v.v.): Chú lính mũ cối xanh đeo ba lô sau lưng (`back-view`) bước đi nhịp nhàng trên bãi cỏ.
  - **Hiệu Ứng Bù Khoáng Bị Nổ Mìn Bật Văng Về Vị Trí Ban Đầu (Knockback Explosion FX):**
    - **Đạp phải Mìn (Chọn sai):** Khi chú lính chạy đến phương án sai, mìn nổ tung chấn động (`.ms-blast-overlay`), màn hình rung lắc dữ dội (`ms-screenshake`), âm thanh tiếng nổ rền vang `/sounds/sfx/explosion.mp3`, nhãn báo `💥 BÙM! ĐẠP PHẢI MÌN!`, chú lính bị hất văng lùi giật ngược lại vị trí xuất phát ban đầu `(50%, 80%)`, trừ 1 khiên sinh mệnh và hiện gợi ý để chọn lại.
    - **An Toàn (Chọn đúng):** Tiếp đất an toàn, nhãn nổi `💎 CHÍNH XÁC! +20 XP`, chuông ngân thần kỳ `/sounds/sfx/correct.mp3`, nhận Cổ ngữ và nhân vật sẵn sàng cho câu hỏi tiếp theo.
  - **Đồng bộ hóa Tự động:** Nhúng toàn bộ sprite chú lính vào file [CHOI_THU_1_MAY.html](file:///c:/Users/ADMIN/Downloads/ggvdg%20duyen/MATHVERSE_OXYZ_MINIGAMES/CHOI_THU_1_MAY.html) (offline) và máy chủ trực tiếp.

---

## [2.9.0] - 2026-11-03

### Added & Overhauled
- **Nâng Cấp Cơ Chế Di Chuyển Thực Tế Cho Game Dò Mìn Bãi Đá (Chặng 5):**
  - **Hệ Thống 5 Hàng Phiến Đá Hành Trình (Journey Path Grid):**
    - Bản đồ bãi đá trải dài 1200px gồm Điểm xuất phát (Hàng 0), 5 Hàng phiến đá câu hỏi (Hàng 1 $\to$ 5) và Cổng Thành Trì Oxyz (Hàng 6) ở đỉnh.
  - **Camera Dịch Chuyển Theo Nhân Vật (World Camera Tracking):**
    - Camera tự động trượt mượt mà (`transform: translateY(...)`) theo từng bước tiến của nhân vật khi vượt qua từng hàng câu hỏi.
  - **Nhân Vật Thật Sự Nhảy & Di Chuyển Giữa Các Phiến Đá (Physical Character Leaping):**
    - Khi người chơi chọn phiến đá (click chuột, chạm cảm ứng, phím A/B/C/D hoặc nút D-pad), nhân vật thực hiện động tác nhảy vút theo quỹ đạo parabol (`@keyframes ms-char-leap`) từ vị trí an toàn trước đó tới đúng phiến đá mục tiêu.
    - **Bước lên đá đúng:** Nhân vật tiếp đất an toàn trên phiến đá, phiến đá bừng sáng xanh ngọc (`.correct`), camera tiến lên hàng tiếp theo.
    - **Đạp phải mìn nổ:** Mìn phát nổ chấn động, rung màn hình (`ms-screenshake`), nhân vật chao đảo (`.wobble`) và lùi về phiến đá an toàn trước đó để học sinh thử lại.
  - **Thanh Điều Khiển Ảo & Phím Tắt Tiện Lợi:**
    - Cụm phím điều hướng ảo (`◀`, `▶`, `⬆ BƯỚC LÊN ĐÁ`) hỗ trợ trải nghiệm tối ưu trên cả điện thoại di động và máy tính.
  - **Đồng bộ hóa 100%:** Cập nhật đồng bộ vào `CHOI_THU_1_MAY.html` (offline) và máy chủ trực tiếp.

---

## [2.8.0] - 2026-11-03

### Added & Overhauled (Reverse-Engineered via REA)
- **Tích Hợp Game Dò Mìn Bãi Đá (Minesweeper) Từ Giaoviendoimoi.com Vào Chặng 5:**
  - **Bối cảnh & Đồ họa gốc trích xuất từ Giaoviendoimoi:**
    - `ground-bg.png`: Nền đất lát đá rêu phong cổ đại (`.ms-ground`).
    - `wobble-char.png`: Nhân vật phiêu lưu nhảy nhót nhấp nhô (`.ms-char`, `@keyframes ms-bob`, `@keyframes ms-wobble`) đứng trên phiến đá xuất phát (`.ms-pad-home`).
    - Các phiến đá dẫn đường phía trước (`.ms-pad`): Vỏ đá cẩm thạch màu xanh rêu với vòng tròn chữ cái tròn A, B, C, D (`.ms-pad-key`) và công thức toán học (`.ms-pad-answer`).
  - **Cơ chế Dò Mìn & Hiệu ứng Chân Thực:**
    - **Bước lên đá an toàn (Đúng):** Phiến đá phát sáng xanh ngọc bích rực rỡ (`.ms-pad.correct`), âm thanh leng keng thần kỳ `/sounds/sfx/correct.mp3`, nhãn điểm bay nổi `💎 AN TOÀN! +20 XP`, thu hồi mảnh cổ ngữ phong ấn (`B - A - O - V - E`).
    - **Đạp phải mìn nổ (Sai):** Phiến đá bùng cháy đỏ rực (`.ms-pad.wrong`), rung lắc toàn màn hình (`ms-screenshake`), âm thanh bom mìn nổ rền vang `/sounds/sfx/explosion.mp3`, nhân vật chới với giật lùi, trừ 1 khiên sinh mệnh (3 trái tim 💖💖💖) và hiển thị gợi ý sư phạm để học sinh thử lại.
  - **Mở Khóa Khiên & Đại Chiến Boss Cuối:**
    - Vượt qua 5 câu hỏi thu đủ 5 cổ ngữ để ghép mật thư `BAOVE` trên Sổ Mật Thư.
    - Kích hoạt Khiên Ma Pháp và bước vào trận chiến kết liễu Đại Boss "Bóng Đen Lãng Quên" bằng Đại Pháo Laser Oxyz.
  - **Đồng bộ hóa 100% Offline:** Nhúng toàn bộ sprite sheet vào file [CHOI_THU_1_MAY.html](file:///c:/Users/ADMIN/Downloads/ggvdg%20duyen/MATHVERSE_OXYZ_MINIGAMES/CHOI_THU_1_MAY.html) dưới dạng Base64 data URLs.

---

## [2.7.0] - 2026-11-03

### Added & Overhauled (Reverse-Engineered via REA)
- **Tích Hợp Trọn Vẹn 100% Đồ Họa & Âm Thanh Gốc Của Game Chặn Zombie Từ Giaoviendoimoi.com:**
  - **Tài nguyên đồ họa nguyên bản (Original High-Res Sprite Sheets):**
    - `gunner.png`: Chú lính xạ thủ chibi đội mũ cối cầm súng đồ chơi bắn nước/laser cực chuẩn.
    - `zombie-walk-v2.png`: Sprite sheet 4 khung hình bước chân đi bộ của zombie (`@keyframes zd-walk-frames`, `@keyframes zd-walk-bob`).
    - `fence.png`: Hàng rào cọc gỗ rào chắn phòng thủ dọc mép trái.
    - `flag.png`: Cuộn giấy da cổ phấp phới (`@keyframes zd-wave`) hiển thị 4 phương án trả lời kèm vòng tròn chữ cái nâu tròn (`.zd-flag-key`).
  - **Hệ thống âm thanh nguyên bản (Authentic Audio FX):**
    - `correct.mp3`: Tiếng hiệu ứng khi bắn trúng zombie đúng.
    - `incorrect.mp3`: Tiếng hiệu ứng khi bắn trúng zombie sai.
    - `zombie-lose.mp3` & `congratulations.wav`: Âm thanh hoàn thành và kết thúc.
  - **Tối ưu hóa máy chủ & ngoại tuyến 100%:**
    - Cập nhật `server.js` hỗ trợ streaming các file tĩnh `/images/` và `/sounds/`.
    - Đóng gói toàn bộ 4 hình ảnh dưới dạng Base64 data URL nhúng thẳng vào file [CHOI_THU_1_MAY.html](file:///c:/Users/ADMIN/Downloads/ggvdg%20duyen/MATHVERSE_OXYZ_MINIGAMES/CHOI_THU_1_MAY.html) (~1.5MB), đảm bảo mở chạy offline hoàn toàn không cần kết nối mạng hay máy chủ web.

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
