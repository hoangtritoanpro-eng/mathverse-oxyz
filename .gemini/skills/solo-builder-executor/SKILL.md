---
name: solo-builder-executor
description: Hướng dẫn chi tiết cách thực thi một Phase trong dự án theo chuẩn vòng lặp Solo Builder (Plan -> Review -> Execute -> Test -> Commit).
---

# Solo Builder Executor Skill

Sử dụng skill này (quy trình này) BẮT BUỘC mỗi khi user yêu cầu bắt đầu thực thi một Phase hoặc một Task lớn trong dự án.

## Quy Trình Thực Thi Một Phase (The Infinite Loop)

Khi bắt đầu một Phase (ví dụ: Phase 2), bạn phải tuần tự thực hiện các bước sau một cách có kỷ luật:

### 1. Lên Plan Chi Tiết (Plan Creation)
- Xem lại `docs/plans/master-plan.md` để biết phạm vi.
- Tạo một file plan chi tiết, ví dụ: `docs/plans/phase-2.md` (dựa trên `docs/plans/phase-template.md`).
- File này phải định nghĩa rõ: 
  - Checklist công việc chi tiết (Tasks).
  - Kết quả kỳ vọng (Expected Outcomes).
  - Phương pháp kiểm thử / Nghiệm thu.

### 2. Review Plan
- Trình bày tóm tắt plan cho user và đợi user xác nhận.
- Nếu có điểm nào bất hợp lý so với BRD hoặc Brief, hãy chủ động thảo luận và hoàn thiện plan.

### 3. Thực Thi (Implementation)
- Cập nhật, viết code hoặc soạn thảo văn bản dựa theo checklist đã đề ra.
- Đảm bảo tuân thủ đúng Tech Stack và quy định trong `AGENTS.md`.
- Sử dụng các công cụ chỉnh sửa file chính xác, bảo toàn tính nguyên vẹn của văn bản và mã nguồn.

### 4. Báo Cáo Thực Thi & Review (Walkthrough)
- Sau khi hoàn tất, lập báo cáo tóm tắt các file đã tạo/sửa.
- Review tổng thể xem các nội dung logic đã liên kết chặt chẽ và hoạt động đồng bộ chưa.

### 5. Test & Nghiệm Thu
- Đưa ra các bước hướng dẫn cụ thể để User thực hiện manual test hoặc đọc soát tài liệu.
- Chờ User test và cung cấp feedback.

### 6. Fix / Improve (Nếu có)
- Xử lý các điều chỉnh theo feedback của user.

### 7. Đóng gói (State Sync & Commit)
- **BẮT BUỘC** cập nhật file `CHANGELOG.md` ghi lại các kết quả vừa hoàn thành.
- **BẮT BUỘC** check tick `[x]` cho phase tương ứng trong `docs/plans/master-plan.md`.
- Đề xuất commit Git rõ ràng để lưu vết lịch sử.

