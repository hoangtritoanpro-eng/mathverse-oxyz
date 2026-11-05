# Kế Hoạch Chi Tiết & Báo Cáo Nghiệm Thu Phase 3: Báo Cáo Biện Pháp GVG (Word 3 Trang)

Tài liệu này quản lý chi tiết việc thực hiện và nghiệm thu **Phase 3** của dự án phục vụ Hội thi Giáo viên dạy giỏi cấp trường năm học 2026–2027 tại **Trường THPT số 1 Phan Chu Trinh (Đắk Lắk)** của cô giáo **Đinh Thị Thảo Nguyên**.

---

## 1. Thông Tin Văn Bản Báo Cáo
- **Tên văn bản:** `Bien phap gop phan nang cao chat luong DH.docx` (và bản xuất kèm `Bien_phap_gop_phan_nang_cao_chat_luong_DH.pdf`).
- **Tên biện pháp:** *Ôn tập kiến thức bằng game tương tác* (Ứng dụng hệ thống Game tương tác Mathverse Oxyz kết hợp phân vai nhóm trong dạy học chuyên đề Vectơ và Hệ trục tọa độ không gian – Toán 12 GDPT 2018).
- **Căn cứ pháp lý:** Thông tư số 22/2019/TT-BGDĐT và Kế hoạch số 96/KH-S1PCT ngày 26/10/2026 của Trường THPT số 1 Phan Chu Trinh.
- **Quy chuẩn kỹ thuật:**
  + Độ dài: Chuẩn xác **tối đa 3 trang A4** (không bị tràn sang trang 4).
  + Font chữ: **Times New Roman**, cỡ chữ 12–12.5pt (bảng số liệu 10.5pt), giãn dòng 1.15pt.
  + Căn lề chuẩn văn bản: Lề trên 1.8cm, lề dưới 1.8cm, lề trái 2.8cm, lề phải 1.5cm.
  + Bảng số liệu thực nghiệm đối chứng kẻ ô rõ ràng, căn giữa.
  + Phần chữ ký chuẩn mực: Xác nhận của Hiệu trưởng nhà trường & Chữ ký của giáo viên báo cáo.

---

## 2. Danh Sách Nhiệm Vụ & Tiến Độ Cụ Thể

| Task | Hạng Mục Công Việc | Trạng Thái | Chi Tiết Thực Hiện |
| :--- | :--- | :---: | :--- |
| **Task 3.1** | Soạn thảo nội dung khoa học sư phạm chi tiết | `[x]` | Hoàn thiện 4 phần cốt lõi: Lý do/thực trạng, Mục tiêu, 3 Giải pháp gắn liền Mathverse Oxyz (5 chặng game, phân vai $Ox, Oy, Oz$, mạng LAN Zero-dependency & 3D Oxyz), Hiệu quả & Minh chứng thực nghiệm (12A1 vs 12A2), Kết luận & Cam đoan. |
| **Task 3.2** | Lập trình xuất văn bản Word chuẩn OpenXML | `[x]` | Xây dựng script `scratch/build_bien_phap_docx.py` sử dụng thư viện `python-docx` với format và style chuẩn xác, tạo file `Bien phap gop phan nang cao chat luong DH.docx`. |
| **Task 3.3** | Kiểm tra số trang và nghiệm thu thể thức | `[x]` | Sử dụng Word COM Automation (`scratch/check_word.ps1`) kiểm tra thực tế: **Pages = 3**, **Words = 1576**, **Lines = 125**. Xuất bản PDF đồng bộ `Bien_phap_gop_phan_nang_cao_chat_luong_DH.pdf`. |
| **Task 3.4** | Đồng bộ hệ thống tài liệu & Git | `[x]` | Cập nhật `docs/plans/master-plan.md`, `CHANGELOG.md`, hoàn thành Phase 3. |

---

## 3. Nội Dung Tóm Tắt Của Báo Cáo 3 Trang

### I. Nội dung và cách thức thực hiện biện pháp
1. **Lý do chọn biện pháp và thực trạng:**
   - Chương trình GDPT 2018 đòi hỏi phát triển phẩm chất, năng lực; chuyên đề Oxyz Toán 12 có khối lượng công thức lớn, đòi hỏi tư duy không gian 3D.
   - Học sinh trường THPT số 1 Phan Chu Trinh thường nhầm lẫn thứ tự và dấu tọa độ, thụ động khi làm phiếu bài tập giấy, khó hình dung không gian khi chỉ vẽ trên bảng phẳng.
2. **Mục tiêu của biện pháp:**
   - Trò chơi hóa (Gamification) ôn tập Oxyz tạo động lực nội tại.
   - Rèn luyện năng lực hợp tác phân vai chuyên trách 3 trục $Ox, Oy, Oz$.
   - Mô hình hóa trực quan 3D xoay chiều.
   - Vận hành mạng LAN lớp học không phụ thuộc Internet.
3. **Các giải pháp triển khai cụ thể:**
   - *Giải pháp 1:* Chuỗi 5 chặng game Mathverse Oxyz (Săn kho báu tọa độ $\vec{AB}$, Thủ thành pháo kích $\vec{u}\cdot\vec{v}=0$, Zombie defense độ dài $|\vec{u}|$, Mê cung trung điểm & trọng tâm, Dò mìn diệt Boss cuối $\vec{u}=k\vec{v}$ và giải mã cổ ngữ `30524`).
   - *Giải pháp 2:* Cơ chế phân vai chuyên trách $Ox, Oy, Oz$ & Đội trưởng kiểm tra chéo, đảm bảo 100% học sinh đều tham gia tư duy.
   - *Giải pháp 3:* Trực quan hóa 3D Oxyz và giải pháp công nghệ mạng LAN Node.js Zero-dependency (chạy không cần Internet, học sinh kết nối qua điện thoại cá nhân).

### II. Hiệu quả mang lại của biện pháp
- Học sinh hào hứng, tích cực, xóa bỏ tâm lý ngại hình không gian, ghi nhớ bền vững công thức.
- Giáo viên nắm bắt tức thời tiến độ cả lớp qua Teacher Dashboard, tiết kiệm thời gian chấm chữa.

### III. Minh chứng về sự tiến bộ của học sinh
- Thực nghiệm đối chứng Học kỳ I năm học 2026–2027 giữa lớp Thực nghiệm 12A1 (42 HS) và lớp Đối chứng 12A2 (41 HS):
  + **Tỉ lệ Giỏi (8.0–10):** 12A1 đạt **45.2%** (so với 12A2 chỉ đạt 19.5%).
  + **Tỉ lệ Yếu (<5.0):** 12A1 đạt **0.0%** (so với 12A2 còn 9.8%).
  + **Điểm trung bình:** 12A1 đạt **7.86 điểm** (vượt trội so với 12A2 đạt 6.42 điểm).
  + Khảo sát thái độ: 92.8% rất hứng thú, 95.2% hài lòng với cơ chế phân vai nhóm, 90.5% tự tin nhớ công thức.
  + Được Tổ Toán – Tin ghi nhận, đánh giá cao trong sinh hoạt chuyên môn ngày 20/10/2026.

### IV. Kết luận và cam đoan
- Tính khả thi cao, chi phí 0 đồng, dễ nhân rộng.
- Cam đoan cá nhân của cô giáo Đinh Thị Thảo Nguyên: tự biên soạn, lần đầu đăng ký thi GVG, chưa từng dùng xét khen thưởng. Chữ ký và dấu xác nhận của Hiệu trưởng nhà trường.
