# Changelog

Tất cả những thay đổi quan trọng của dự án này sẽ được ghi nhận tại file này theo chuẩn [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Planned
- **Phase 2:** Hoàn thiện văn bản Báo cáo Biện pháp nâng cao chất lượng giảng dạy (file `Bien phap gop phan nang cao chat luong DH.docx`) tối đa 3 trang, chuẩn thể thức Hội thi GVG THPT Số 1 Phan Chu Trinh.
- **Phase 3:** Xây dựng Kế hoạch bài dạy (Giáo án) minh họa 1 tiết thực hành và Slide trình chiếu thuyết trình biện pháp 30 phút.
- **Phase 4:** Đóng gói, kiểm thử thực tế lớp học và nghiệm thu hồ sơ dự thi.

---

## [1.0.0] - 2026-11-02

### Added
- **Core Mathverse Oxyz Game System:**
  - Hệ thống 5 Mini-Game Toán 12 Oxyz (`MATHVERSE_OXYZ_MINIGAMES`) gồm 15 bài toán bám sát chương trình GDPT 2018.
  - Chế độ chơi demo một máy (`CHOI_THU_1_MAY.html`) cho phép trải nghiệm góc nhìn học sinh và giáo viên.
  - Server Node.js LAN (`server.js`) hỗ trợ 4-8 đội kết nối qua điện thoại thời gian thực không cần Internet.
  - Dashboard quản trị giáo viên: Giám sát tiến độ, đồng hồ bấm giờ, nút tạm dừng giảng giải, chấm điểm hợp tác (0-10 XP), xuất báo cáo CSV.
- **Solo Builder Framework:**
  - Khởi tạo quy trình Solo Builder gồm `AGENTS.md`, `CHANGELOG.md`, `docs/brief.md`, `docs/BRD.md`, `docs/plans/master-plan.md`, `docs/plans/phase-template.md`.
  - Tích hợp kỹ năng `solo-builder-executor` cho Antigravity AI Agent.
