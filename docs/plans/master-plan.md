# Master Plan: Mathverse Oxyz & Báo Cáo Biện Pháp GVG 2026–2027

Tài liệu này quản lý lộ trình tổng thể của dự án theo quy trình **Solo Builder**.
*Quy tắc: AI Agent chỉ tập trung vào Phase hiện tại và đánh dấu `[x]` khi hoàn thành.*

---

## Lộ Trình Tổng Thể (Roadmap)

| Phase | Tên Giai Đoạn | Trạng Thái | Mô Tả Tóm Tắt |
| :--- | :--- | :---: | :--- |
| **Phase 1** | Xây dựng Game Engine Mathverse Oxyz | `[x]` | Hệ thống 5 mini-game, server LAN, dashboard GV và bản chạy thử 1 máy. |
| **Phase 2** | Hoàn thiện Báo Cáo Biện Pháp (Word 3 trang) | `[ ]` | Soạn thảo nội dung biện pháp, số liệu minh chứng và xuất file `.docx` hoàn chỉnh. |
| **Phase 3** | Kế hoạch bài dạy (Giáo án) & Slide Báo cáo | `[ ]` | Soạn kế hoạch tiết dạy 45 phút chi tiết và bộ slide thuyết trình trước BGK. |
| **Phase 4** | Kiểm thử, Tập dượt & Đóng gói Bàn giao | `[ ]` | Chạy thử nghiệm hệ thống mạng, tập dượt thuyết trình và hoàn thiện hồ sơ dự thi. |

---

## Chi Tiết Các Giai Đoạn (Phase Breakdown)

### Phase 1: Xây dựng Game Engine Mathverse Oxyz `[x]`
- **Mục tiêu:** Xây dựng hệ thống game tương tác và môi trường điều hành tiết học.
- **Kết quả đạt được:**
  - [x] Tạo `stages.js` với 5 chặng, 15 bài toán Oxyz chuẩn CT GDPT 2018.
  - [x] Xây dựng máy chủ `server.js` Node.js mạng LAN không cần Internet.
  - [x] Giao diện học sinh và giáo viên `public/` responsive đa thiết bị.
  - [x] Bản demo không cần cài đặt `CHOI_THU_1_MAY.html`.
  - [x] Hướng dẫn giáo viên chi tiết `HUONG_DAN_GIAO_VIEN.md`.

### Phase 2: Hoàn thiện Báo Cáo Biện Pháp (Word 3 trang) `[ ]`
- **Mục tiêu:** Điền và hoàn chỉnh file `Bien phap gop phan nang cao chat luong DH.docx` theo đúng mẫu và quy định của nhà trường (tối đa 3 trang).
- **Checklist công việc:**
  - [ ] Lập luận Lý do chọn biện pháp gắn với thực tiễn dạy học Toán 12 tại Trường THPT số 1 Phan Chu Trinh.
  - [ ] Trình bày Nội dung và cách thức thực hiện biện pháp (Mô hình Mathverse Oxyz, cấu trúc 5 chặng, kịch bản 45 phút).
  - [ ] Trình bày Hiệu quả mang lại (sự thay đổi về thái độ, năng lực tự học, làm việc nhóm).
  - [ ] Xây dựng Minh chứng về sự tiến bộ của học sinh (bảng số liệu đối chứng trước và sau tác động).
  - [ ] Tạo file docx chuẩn chỉn chu về thể thức văn bản hành chính sư phạm.

### Phase 3: Kế hoạch bài dạy (Giáo án) & Slide Báo cáo `[ ]`
- **Mục tiêu:** Chuẩn bị đầy đủ tài liệu phục vụ buổi thuyết trình 30 phút (10/11/2026) và tiết dạy thực hành (11/11 - 17/11/2026).
- **Checklist công việc:**
  - [ ] Soạn Giáo án (Kế hoạch bài dạy) theo Công văn 5512/BGDĐT cho tiết ôn tập Oxyz.
  - [ ] Soạn dàn ý và nội dung trình chiếu Slide báo cáo biện pháp (khoảng 12–15 slide súc tích).
  - [ ] Chuẩn bị bộ câu hỏi phản biện giả định của Ban Giám khảo và kịch bản trả lời.

### Phase 4: Kiểm thử, Tập dượt & Đóng gói Bàn giao `[ ]`
- **Mục tiêu:** Đảm bảo tính sẵn sàng cao nhất cho giáo viên khi bước vào phòng thi.
- **Checklist công việc:**
  - [ ] Test thực tế mạng LAN phát từ điện thoại/máy tính giáo viên với 2–3 thiết bị học sinh.
  - [ ] Rà soát toàn bộ hồ sơ theo danh mục quy định của Hội thi.
  - [ ] Đồng bộ hóa Git và xuất bản hồ sơ hoàn chỉnh.
