'use strict';
// Câu hỏi gốc và bài toán bổ sung tự xây dựng cho 5 mini-game Oxyz.
const STAGES=[
{ id:1, gameType:'hunt', title:'SĂN KHO BÁU TỌA ĐỘ', place:'Rừng Vectơ', icon:'🏝️', tag:'Vectơ AB trong Oxyz', time:'5–6 phút', item:'La bàn ba trục', digit:'3', digitRule:'Lấy hiệu hoành độ 5 − 2.',
 story:'Bản đồ bị chia thành ba tọa độ. Cả đội hãy lần theo dấu chân (x, y, z), đào đúng kho báu tại từng điểm để mở Cổng Vectơ.',
 groupTask:'Ba thành viên lần lượt phụ trách trục x, y, z; đội trưởng kiểm tra và chỉ đường.',
 challenges:[
 {prompt:'A(2; −1; 3), B(5; 1; 7). Thành phần x của vectơ AB bằng bao nhiêu?', options:['7','3','−3','2'],correct:1,hints:['Lấy hoành độ B trừ hoành độ A.','5 − 2 = ?'],explain:'ABₓ = xB − xA = 5 − 2 = 3.',label:'Tọa độ X · Đào điểm 1'},
 {prompt:'Thành phần y của vectơ AB với A(2; −1; 3), B(5; 1; 7) bằng bao nhiêu?',options:['0','2','−2','1'],correct:1,hints:['Cẩn thận khi trừ một số âm.','1 − (−1) = ?'],explain:'ABᵧ = 1 − (−1) = 2.',label:'Tọa độ Y · Đào điểm 2'},
 {prompt:'Thành phần z của vectơ AB với A(2; −1; 3), B(5; 1; 7) bằng bao nhiêu?',options:['−4','10','4','3'],correct:2,hints:['Lấy cao độ điểm cuối trừ cao độ điểm đầu.','7 − 3 = ?'],explain:'ABz = 7 − 3 = 4. Vậy AB=(3;2;4).',label:'Tọa độ Z · Đào điểm 3'}]
},
{ id:2, gameType:'defense',title:'THỦ THÀNH TRỰC GIAO',place:'Pháo Đài Vuông Góc',icon:'🏰',tag:'Tích vô hướng',time:'6–7 phút',item:'Khiên trực giao',digit:'0',digitRule:'Lấy kết quả tích vô hướng của đợt tấn công đầu tiên.',
 story:'Ba đợt quái vật mang theo tích vô hướng tiến đến. Chọn đúng năng lượng của vectơ để bắn hạ từng đợt và giữ an toàn cho thành.',
 groupTask:'Các thành viên luân phiên tính tích vô hướng. Đội trưởng chọn mục tiêu, thư ký kiểm tra kết quả.',
 challenges:[
 {prompt:'ĐỢT 1: u=(1;2;−2), v=(2;0;1). Tính u·v.',options:['−2','0','2','4'],correct:1,hints:['Nhân từng cặp tọa độ tương ứng rồi cộng.','1×2 + 2×0 + (−2)×1.'],explain:'u·v = 2+0−2=0. Hai vectơ đều khác 0 nên vuông góc.',label:'Sóng quái 1 · Cổng Bắc'},
 {prompt:'ĐỢT 2: a=(2;−1;3), b=(1;1;−1). Tính a·b.',options:['2','−2','−4','0'],correct:1,hints:['Có ba tích thành phần.','2×1 + (−1)×1 + 3×(−1).'],explain:'a·b=2−1−3=−2.',label:'Sóng quái 2 · Cổng Đông'},
 {prompt:'ĐỢT 3: c=(1;1;1), d=(2;−1;−1). Tính c·d.',options:['3','2','0','−1'],correct:2,hints:['Đừng bỏ dấu trừ ở hai thành phần cuối.','2 − 1 − 1 = ?'],explain:'c·d=2−1−1=0.',label:'Sóng quái 3 · Cổng Tây'}]
},
{ id:3,gameType:'forge',title:'LÒ RÈN PHA LÊ KHOẢNG CÁCH',place:'Tháp Pha Lê',icon:'💠',tag:'Khoảng cách hai điểm',time:'6 phút',item:'Tinh thể khoảng cách',digit:'5',digitRule:'Lấy khoảng cách AB = 5.',
 story:'Ba viên pha lê phải được rèn theo đúng hiệu tọa độ. Lò rèn sẽ phát sáng khi cả đội tính đúng chiều dài AB.',
 groupTask:'Một bạn tính Δx, một bạn tính Δy, một bạn tính Δz, bạn còn lại sử dụng công thức độ dài.',
 challenges:[
 {prompt:'A(1;2;−1), B(4;6;−1). Hiệu hoành độ Δx bằng:',options:['5','3','−3','1'],correct:1,hints:['Δx=xB−xA.','4−1 = ?'],explain:'Δx=4−1=3.',label:'Pha lê X · Tinh thể xanh'},
 {prompt:'Với A(1;2;−1), B(4;6;−1), hiệu tung độ Δy bằng:',options:['8','−4','2','4'],correct:3,hints:['Δy=yB−yA.','6−2 = ?'],explain:'Δy=6−2=4.',label:'Pha lê Y · Tinh thể tím'},
 {prompt:'Với Δx=3, Δy=4, Δz=0, độ dài AB bằng:',options:['7','25','5','√7'],correct:2,hints:['Dùng định lý Pitago trong Oxyz.','√(3² + 4² + 0²) = ?'],explain:'AB=√(9+16+0)=5.',label:'Pha lê Z · Rèn lõi năng lượng'}]
},
{ id:4,gameType:'maze',title:'MÊ CUNG TRUNG ĐIỂM',place:'Mê Cung Không Gian',icon:'🌀',tag:'Tọa độ trung điểm',time:'6–7 phút',item:'Bản đồ mê cung',digit:'2',digitRule:'Lấy hoành độ trung điểm I = 2.',
 story:'Các hành lang chồng lên nhau trong không gian. Chỉ cửa mang đúng một tọa độ của trung điểm I mới mở đường.',
 groupTask:'Ba thành viên mỗi người tính một tọa độ, một người điều khiển chọn cửa. Cùng nhau kiểm tra trước khi rẽ.',
 challenges:[
 {prompt:'A(0;−2;4), B(4;2;0). Hoành độ trung điểm I là:',options:['4','0','2','−2'],correct:2,hints:['Lấy trung bình cộng hai hoành độ.','(0+4)/2 = ?'],explain:'xI=(0+4)/2=2.',label:'Ngã rẽ X · Cánh cửa thứ nhất'},
 {prompt:'Với cùng A, B, tung độ trung điểm I là:',options:['0','−2','2','4'],correct:0,hints:['Trung bình cộng hai tung độ.','(−2+2)/2 = ?'],explain:'yI=(−2+2)/2=0.',label:'Ngã rẽ Y · Cánh cửa thứ hai'},
 {prompt:'Với cùng A, B, cao độ trung điểm I là:',options:['4','−2','2','0'],correct:2,hints:['Trung bình cộng hai cao độ.','(4+0)/2 = ?'],explain:'zI=(4+0)/2=2. Vậy I=(2;0;2).',label:'Ngã rẽ Z · Cửa thoát'}]
},
{ id:5,gameType:'boss',title:'ĐÁNH BẠI BÓNG ĐEN LÃNG QUÊN',place:'Thành Trì Cuối',icon:'🐲',tag:'Hai vectơ cùng phương',time:'7–8 phút',item:'Chìa khóa Lõi Trí Tuệ',digit:'4',digitRule:'Lấy tham số m=4 trong lần đánh cuối.',
 story:'Boss có ba tầng giáp. Mỗi đáp án đúng là một phát đại bác phá một lớp giáp; phá hết mới lấy được mảnh mã cuối.',
 groupTask:'Mỗi thành viên phụ trách một quan hệ tỉ lệ, cả đội đối chiếu để xác định hệ số và tham số.',
 challenges:[
 {prompt:'u=(m;2;4), v=(2;1;2) cùng phương. Từ hai tọa độ cuối suy ra u=kv với k bằng:',options:['1','2','3','4'],correct:1,hints:['Dựa vào 2=k×1 hoặc 4=k×2.','k=2/1 = ?'],explain:'Hệ số tỉ lệ k=2.',label:'Phá giáp 1 · Tỉ lệ'},
 {prompt:'Với u=(m;2;4), v=(2;1;2) và k=2, suy ra m bằng:',options:['2','8','4','1'],correct:2,hints:['Tọa độ thứ nhất: m=k×2.','m=2×2.'],explain:'m=4.',label:'Phá giáp 2 · Tham số'},
 {prompt:'Khi m=4, cặp vectơ nào sau đây cùng phương?',options:['(4;2;4) và (2;1;2)','(4;2;4) và (1;2;2)','(4;2;4) và (2;2;1)','(4;2;4) và (4;1;2)'],correct:0,hints:['Hai vectơ cùng phương nếu một vectơ là bội của vectơ kia.','(4;2;4)=2×(2;1;2).'],explain:'(4;2;4)=2(2;1;2). Boss bị đánh bại!',label:'Phá giáp 3 · Chiến thắng'}]
}
];
const TOKEN_WORDS={'3':'TƯ DUY','0':'VÀ','5':'HỢP TÁC','2':'MỞ','4':'KHO BÁU'};
const MESSAGE_OPTIONS=['TƯ DUY VÀ HỢP TÁC MỞ KHO BÁU','TỐC ĐỘ LUÔN QUAN TRỌNG NHẤT','CHỈ MỘT NGƯỜI GIỎI MỚI CHIẾN THẮNG'];
module.exports={STAGES,TOKEN_WORDS,MESSAGE_OPTIONS};
