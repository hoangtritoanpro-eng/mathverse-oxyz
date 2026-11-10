# Bài về nhà MathVerse Oxyz (v6.0.0)

Học sinh bấm link → nhập tên → làm một mình 5 chặng (không giới hạn thời gian từng chặng) → cuối bài thấy kết quả và bài được **tự gửi** cho giáo viên.

## Giáo viên giao bài
1. Mở trang game → **Tôi là giáo viên** → **Giao bài về nhà cho học sinh**.
2. (Tuỳ chọn) đặt tên bài → **Tạo đường dẫn bài về nhà**.
3. Gửi **link học sinh** (hoặc QR) lên nhóm lớp. **Link báo cáo** là của riêng thầy cô, đừng gửi học sinh. Hai link được nhớ trong trình duyệt, lần sau vào lại mục "Các bài đã giao".

## Xem báo cáo
Mở link báo cáo bất cứ lúc nào (tự làm mới mỗi 20 giây): số em đã vào/hoàn thành, % đúng, điểm, thời gian; kết quả theo từng chặng; nhận biết/thông hiểu; **câu cả lớp hay sai nhất** và em nào sai; danh sách em cần hỗ trợ (đúng dưới 60%). Có nút **Tải CSV** (mở bằng Excel) và **In / PDF**.

## Bật kho lưu trữ chung trên Vercel (nên làm 1 lần)
Vercel không giữ dữ liệu lâu dài, nên cần một kho lưu trữ miễn phí để bài nộp của mọi học sinh về cùng một chỗ:
1. Vào dự án trên Vercel → tab **Storage** → **Create Database** → chọn **Upstash (Redis)** gói Free → kết nối với dự án *mathverse-oxyz*.
2. Vercel tự thêm các biến `KV_REST_API_URL` và `KV_REST_API_TOKEN` (game cũng nhận `UPSTASH_REDIS_REST_URL/TOKEN`).
3. Bấm **Redeploy**. Trang báo cáo sẽ không còn dòng cảnh báo vàng.

Khi chưa bật: báo cáo có thể thiếu bài. Cách chữa tạm: học sinh mở "Không gửi được? Gửi bằng mã" ở màn kết quả, gửi mã cho thầy cô; thầy cô dán vào ô cuối trang báo cáo.

## Chạy trên máy giáo viên (không cần Vercel)
Chạy `node server.js` như thường. Bài nộp lưu ở `MATHVERSE_OXYZ_MINIGAMES/data/homework.json` (không đưa lên GitHub).

## Lưu ý riêng tư
Báo cáo chứa họ tên học sinh. Ai có link báo cáo đều xem được; mã bài (link học sinh) không xem được báo cáo. Dữ liệu trong kho tự xoá sau 180 ngày.
