'use strict';
// Dữ liệu 5 Chặng Game Tương Tác Nhóm MATHVERSE OXYZ (Toán 12 - GDPT 2018)
// Tích hợp 2 cơ chế: Săn Kho Báu 2D Map (Scavenger Hunt) & Bảo Vệ Thành Trì Thời Gian Thực (Castle Defense)

const STAGES = [
  {
    id: 1,
    gameType: 'hunt',
    defaultMode: 'hunt',
    title: 'SĂN KHO BÁU TỌA ĐỘ',
    place: 'Rừng Vectơ Nguyên Sinh',
    icon: '🏝️',
    tag: 'Tọa độ vectơ AB trong Oxyz',
    time: '5–6 phút',
    item: 'La bàn ba trục',
    digit: '3',
    digitRule: 'Lấy hiệu hoành độ xB − xA = 5 − 2 = 3.',
    story: 'Bản đồ Rừng Vectơ bị phong ấn bởi 3 Trạm Quái Vật giữ 3 thành phần (x; y; z) của vectơ AB. Cả đội hãy điều khiển nhân vật vượt địa hình, đánh bại từng trạm để thu thập đủ 3 chìa khóa tọa độ và mở Rương Mật Mã!',
    groupTask: 'TV1 tính trục Ox, TV2 tính trục Oy, TV3 tính trục Oz; Đội trưởng điều khiển nhân vật trên bản đồ và phát lệnh tấn công.',
    teamRoles: [
      '🧭 Thành viên 1: Phụ trách công thức hoành độ xB − xA',
      '📐 Thành viên 2: Phụ trách công thức tung độ yB − yA (chú ý dấu âm)',
      '🔭 Thành viên 3: Phụ trách công thức cao độ zB − zA',
      '👑 Đội trưởng: Điều khiển nhân vật di chuyển & chốt đáp án tấn công'
    ],
    huntMap: {
      theme: 'forest',
      worldTitle: 'BẢN ĐỒ RỪNG VECTƠ OXYZ',
      spawn: { x: 14, y: 52 },
      chest: { x: 86, y: 50, name: 'Rương La Bàn Ba Trục' },
      stations: [
        { x: 34, y: 26, name: 'Trạm I · Đền Hoành Độ Ox', monsterIcon: '👹', monsterName: 'Thần Rừng Hoành Độ', badge: 'ABx = 3' },
        { x: 54, y: 74, name: 'Trạm II · Đầm Tung Độ Oy', monsterIcon: '🐊', monsterName: 'Thủy Quái Tung Độ', badge: 'ABy = 2' },
        { x: 72, y: 30, name: 'Trạm III · Đỉnh Cao Độ Oz', monsterIcon: '🦅', monsterName: 'Đại Bàng Cao Độ', badge: 'ABz = 4' }
      ]
    },
    defenseConfig: {
      castleName: 'Thành Trì Rừng Vectơ',
      theme: 'forest',
      waves: [
        { name: 'Đợt 1: Quái Hoành Độ Ox', enemies: ['goblin', 'bat', 'goblin'], boss: '👹' },
        { name: 'Đợt 2: Quái Tung Độ Oy', enemies: ['bat', 'skeleton', 'goblin'], boss: '🐊' },
        { name: 'Đợt 3: Quái Cao Độ Oz', enemies: ['skeleton', 'orc', 'bat'], boss: '🦅' }
      ]
    },
    challenges: [
      {
        prompt: 'Cho hai điểm A(2; −1; 3) và B(5; 1; 7) trong không gian Oxyz. Thành phần hoành độ x của vectơ AB bằng bao nhiêu?',
        options: ['7', '3', '−3', '2'],
        correct: 1,
        shortAnswer: '3',
        hints: ['Lấy hoành độ điểm cuối B trừ hoành độ điểm đầu A.', 'Tính: xB − xA = 5 − 2 = ?'],
        explain: 'Ta có ABₓ = xB − xA = 5 − 2 = 3.',
        label: 'Trạm I · Tọa độ X · Đào điểm 1',
        roleAssign: 'Thành viên 1 (Trục Ox) tính nhanh xB − xA',
        monster: { icon: '👹', name: 'Thần Rừng Hoành Độ', hp: 100 },
        keyBadge: 'X=3'
      },
      {
        prompt: 'Với A(2; −1; 3) và B(5; 1; 7), thành phần tung độ y của vectơ AB bằng bao nhiêu?',
        options: ['0', '2', '−2', '1'],
        correct: 1,
        shortAnswer: '2',
        hints: ['Cẩn thận khi trừ một số âm: yB − yA.', 'Tính: 1 − (−1) = ?'],
        explain: 'Ta có ABᵧ = yB − yA = 1 − (−1) = 2.',
        label: 'Trạm II · Tọa độ Y · Đào điểm 2',
        roleAssign: 'Thành viên 2 (Trục Oy) kiểm tra dấu âm 1 − (−1)',
        monster: { icon: '🐊', name: 'Thủy Quái Tung Độ', hp: 120 },
        keyBadge: 'Y=2'
      },
      {
        prompt: 'Với A(2; −1; 3) và B(5; 1; 7), thành phần cao độ z của vectơ AB bằng bao nhiêu?',
        options: ['−4', '10', '4', '3'],
        correct: 2,
        shortAnswer: '4',
        hints: ['Lấy cao độ điểm cuối B trừ cao độ điểm đầu A.', 'Tính: zB − zA = 7 − 3 = ?'],
        explain: 'Ta có ABz = zB − zA = 7 − 3 = 4. Vậy vectơ AB = (3; 2; 4).',
        label: 'Trạm III · Tọa độ Z · Đào điểm 3',
        roleAssign: 'Thành viên 3 (Trục Oz) tính 7 − 3 & Đội trưởng tổng hợp AB=(3;2;4)',
        monster: { icon: '🦅', name: 'Đại Bàng Cao Độ', hp: 150 },
        keyBadge: 'Z=4'
      }
    ]
  },
  {
    id: 2,
    gameType: 'defense',
    defaultMode: 'defense',
    title: 'BẢO VỆ THÀNH TRÌ TRỰC GIAO',
    place: 'Pháo Đài Vuông Góc',
    icon: '🏰',
    tag: 'Tích vô hướng & Hai vectơ vuông góc',
    time: '6–7 phút',
    item: 'Khiên trực giao',
    digit: '0',
    digitRule: 'Lấy kết quả tích vô hướng của đợt tấn công đầu tiên (u·v = 0).',
    story: 'Ba đợt quân đoàn Quái Vật Không Gian đang tiến vào Pháo Đài Vuông Góc trên 3 làn đường! Các Anh Hùng đang chiến đấu cầm chân chúng. Cả đội hãy giải nhanh tích vô hướng để kiếm Vàng nâng cấp Anh Hùng, tung Kỹ năng và gọi Pháo Kích tiêu diệt từng đợt quái!',
    groupTask: 'TV1 tính tích x₁x₂, TV2 tính y₁y₂, TV3 tính z₁z₂; Đội trưởng cộng tổng, mua Nâng cấp và tung Kỹ năng Bảo vệ Thành trì.',
    teamRoles: [
      '🏹 Thành viên 1 (Cung Thủ): Tính tích hoành độ x₁·x₂',
      '🧙‍♂️ Thành viên 2 (Pháp Sư): Tính tích tung độ y₁·y₂',
      '🛡️ Thành viên 3 (Hiệp Sĩ): Tính tích cao độ z₁·z₂',
      '👑 Đội trưởng (Chỉ huy): Cộng x₁x₂+y₁y₂+z₁z₂, nâng cấp & kích hoạt kỹ năng'
    ],
    huntMap: {
      theme: 'fortress',
      worldTitle: 'BẢN ĐỒ PHÁO ĐÀI VUÔNG GÓC',
      spawn: { x: 14, y: 50 },
      chest: { x: 86, y: 50, name: 'Rương Khiên Trực Giao' },
      stations: [
        { x: 35, y: 28, name: 'Cổng Bắc · Đợt Quái 1', monsterIcon: '👾', monsterName: 'Quái Tích Vô Hướng Bắc', badge: 'u·v = 0' },
        { x: 56, y: 72, name: 'Cổng Đông · Đợt Quái 2', monsterIcon: '👹', monsterName: 'Chiến Binh Cổng Đông', badge: 'a·b = −2' },
        { x: 74, y: 32, name: 'Cổng Tây · Đợt Quái 3', monsterIcon: '🤖', monsterName: 'Cơ Giáp Cổng Tây', badge: 'c·d = 0' }
      ]
    },
    defenseConfig: {
      castleName: 'Pháo Đài Vuông Góc',
      theme: 'fortress',
      waves: [
        { name: 'Sóng Quái 1 · Cổng Bắc', enemies: ['goblin', 'bat', 'skeleton', 'goblin'], boss: '👾' },
        { name: 'Sóng Quái 2 · Cổng Đông', enemies: ['skeleton', 'orc', 'bat', 'skeleton'], boss: '👹' },
        { name: 'Sóng Quái 3 · Cổng Tây', enemies: ['orc', 'skeleton', 'orc', 'bat'], boss: '🤖' }
      ]
    },
    challenges: [
      {
        prompt: 'ĐỢT 1: Cho u = (1; 2; −2) và v = (2; 0; 1). Tích vô hướng u · v bằng bao nhiêu?',
        options: ['−2', '0', '2', '4'],
        correct: 1,
        shortAnswer: '0',
        hints: ['Áp dụng công thức: u·v = x₁x₂ + y₁y₂ + z₁z₂.', 'Tính: 1×2 + 2×0 + (−2)×1 = ?'],
        explain: 'u·v = 1×2 + 2×0 + (−2)×1 = 2 + 0 − 2 = 0. Hai vectơ khác 0 có tích vô hướng bằng 0 nên vuông góc với nhau!',
        label: 'Sóng quái 1 · Cổng Bắc (Làn 1)',
        roleAssign: 'TV1 tính 1×2, TV2 tính 2×0, TV3 tính (−2)×1 → Cộng lại',
        monster: { icon: '👾', name: 'Thủ Lĩnh Sóng Quái 1', hp: 140 },
        keyBadge: 'u·v=0'
      },
      {
        prompt: 'ĐỢT 2: Cho a = (2; −1; 3) và b = (1; 1; −1). Tích vô hướng a · b bằng bao nhiêu?',
        options: ['2', '−2', '−4', '0'],
        correct: 1,
        shortAnswer: '-2',
        hints: ['Nhân từng cặp tọa độ tương ứng rồi cộng lại.', 'Tính: 2×1 + (−1)×1 + 3×(−1) = ?'],
        explain: 'a·b = 2×1 + (−1)×1 + 3×(−1) = 2 − 1 − 3 = −2.',
        label: 'Sóng quái 2 · Cổng Đông (Làn 2)',
        roleAssign: 'Chú ý dấu âm ở tích thứ hai (−1)×1 và thứ ba 3×(−1)',
        monster: { icon: '👹', name: 'Ác Quỷ Cổng Đông', hp: 170 },
        keyBadge: 'a·b=−2'
      },
      {
        prompt: 'ĐỢT 3: Cho c = (1; 1; 1) và d = (2; −1; −1). Tích vô hướng c · d bằng bao nhiêu?',
        options: ['3', '2', '0', '−1'],
        correct: 2,
        shortAnswer: '0',
        hints: ['Đừng bỏ quên hai dấu trừ ở hai thành phần cuối.', 'Tính: 1×2 + 1×(−1) + 1×(−1) = 2 − 1 − 1 = ?'],
        explain: 'c·d = 2 − 1 − 1 = 0. Следовательно, hai vectơ c và d vuông góc (c ⊥ d)!',
        label: 'Sóng quái 3 · Cổng Tây (Làn 3)',
        roleAssign: 'Cả nhóm kiểm tra điều kiện hai vectơ vuông góc c·d = 0',
        monster: { icon: '🤖', name: 'Cơ Giáp Khổng Lồ', hp: 200 },
        keyBadge: 'c⊥d'
      }
    ]
  },
  {
    id: 3,
    gameType: 'forge',
    defaultMode: 'hunt',
    title: 'THUNG LŨNG PHA LÊ KHOẢNG CÁCH',
    place: 'Tháp Pha Lê',
    icon: '💠',
    tag: 'Khoảng cách giữa hai điểm AB',
    time: '6 phút',
    item: 'Tinh thể khoảng cách',
    digit: '5',
    digitRule: 'Lấy độ dài đoạn thẳng AB = 5.',
    story: 'Trong Thung Lũng Pha Lê, 3 Mỏ Tinh Thể (Δx, Δy, Δz) đang bị các Golem Đá canh giữ. Hãy điều khiển nhân vật đi tới từng mỏ tinh thể, giải bài toán hiệu tọa độ và dùng định lý Pitago không gian để rèn Tinh Thể Khoảng Cách AB!',
    groupTask: 'TV1 tính Δx, TV2 tính Δy, TV3 tính Δz; Đội trưởng lấy căn bậc hai √(Δx² + Δy² + Δz²).',
    teamRoles: [
      '🔷 Thành viên 1: Tính hiệu hoành độ Δx = xB − xA',
      '💜 Thành viên 2: Tính hiệu tung độ Δy = yB − yA',
      '💎 Thành viên 3: Tính hiệu cao độ Δz = zB − zA',
      '👑 Đội trưởng: Tính độ dài AB = √(Δx² + Δy² + Δz²)'
    ],
    huntMap: {
      theme: 'crystal',
      worldTitle: 'BẢN ĐỒ THUNG LŨNG PHA LÊ',
      spawn: { x: 14, y: 50 },
      chest: { x: 86, y: 50, name: 'Lò Rèn Tinh Thể AB' },
      stations: [
        { x: 32, y: 30, name: 'Mỏ I · Pha Lê Xanh (Δx)', monsterIcon: '🗿', monsterName: 'Golem Tinh Thể Xanh', badge: 'Δx = 3' },
        { x: 52, y: 70, name: 'Mỏ II · Pha Lê Tím (Δy)', monsterIcon: '🔮', monsterName: 'Phù Thủy Pha Lê Tím', badge: 'Δy = 4' },
        { x: 73, y: 34, name: 'Mỏ III · Lõi Năng Lượng AB', monsterIcon: '💎', monsterName: 'Vệ Binh Kim Cương', badge: 'AB = 5' }
      ]
    },
    defenseConfig: {
      castleName: 'Tháp Pha Lê Khoảng Cách',
      theme: 'crystal',
      waves: [
        { name: 'Đợt 1: Golem Tinh Thể Xanh', enemies: ['goblin', 'skeleton', 'goblin'], boss: '🗿' },
        { name: 'Đợt 2: Phù Thủy Pha Lê Tím', enemies: ['bat', 'skeleton', 'orc'], boss: '🔮' },
        { name: 'Đợt 3: Vệ Binh Kim Cương', enemies: ['orc', 'skeleton', 'orc'], boss: '💎' }
      ]
    },
    challenges: [
      {
        prompt: 'Cho hai điểm A(1; 2; −1) và B(4; 6; −1). Hiệu hoành độ Δx = xB − xA bằng bao nhiêu?',
        options: ['5', '3', '−3', '1'],
        correct: 1,
        shortAnswer: '3',
        hints: ['Tính Δx = xB − xA.', 'Lấy 4 − 1 = ?'],
        explain: 'Ta có Δx = xB − xA = 4 − 1 = 3.',
        label: 'Mỏ I · Pha lê X · Tinh thể xanh',
        roleAssign: 'Thành viên 1 khai thác Pha lê Xanh (Δx = 4 − 1)',
        monster: { icon: '🗿', name: 'Golem Tinh Thể Xanh', hp: 130 },
        keyBadge: 'Δx=3'
      },
      {
        prompt: 'Với hai điểm A(1; 2; −1) và B(4; 6; −1), hiệu tung độ Δy = yB − yA bằng bao nhiêu?',
        options: ['8', '−4', '2', '4'],
        correct: 3,
        shortAnswer: '4',
        hints: ['Tính Δy = yB − yA.', 'Lấy 6 − 2 = ?'],
        explain: 'Ta có Δy = yB − yA = 6 − 2 = 4.',
        label: 'Mỏ II · Pha lê Y · Tinh thể tím',
        roleAssign: 'Thành viên 2 khai thác Pha lê Tím (Δy = 6 − 2)',
        monster: { icon: '🔮', name: 'Phù Thủy Pha Lê Tím', hp: 150 },
        keyBadge: 'Δy=4'
      },
      {
        prompt: 'Biết Δx = 3, Δy = 4 và Δz = (−1) − (−1) = 0. Độ dài đoạn thẳng AB bằng bao nhiêu?',
        options: ['7', '25', '5', '√7'],
        correct: 2,
        shortAnswer: '5',
        hints: ['Áp dụng công thức khoảng cách: AB = √(Δx² + Δy² + Δz²).', 'Tính: √(3² + 4² + 0²) = √25 = ?'],
        explain: 'Ta có AB = √(3² + 4² + 0²) = √(9 + 16 + 0) = √25 = 5.',
        label: 'Mỏ III · Rèn Lõi Năng Lượng AB',
        roleAssign: 'Thành viên 3 & Đội trưởng tính √(3² + 4² + 0²)',
        monster: { icon: '💎', name: 'Vệ Binh Kim Cương', hp: 180 },
        keyBadge: 'AB=5'
      }
    ]
  },
  {
    id: 4,
    gameType: 'maze',
    defaultMode: 'hunt',
    title: 'THÁM HIỂM MÊ CUNG TRUNG ĐIỂM',
    place: 'Mê Cung Không Gian',
    icon: '🌀',
    tag: 'Tọa độ trung điểm đoạn thẳng',
    time: '6–7 phút',
    item: 'Bản đồ mê cung',
    digit: '2',
    digitRule: 'Lấy hoành độ trung điểm xI = 2.',
    story: 'Cả đội đang đứng giữa Mê Cung Không Gian cổ đại với những bức tường đá đan xen. Hãy dẫn đường cho nhân vật luồn lách qua các ngã rẽ tới 3 Cổng Không Gian (xI, yI, zI), giải mã tọa độ trung điểm I của đoạn thẳng AB để mở lối thoát!',
    groupTask: '3 thành viên tính trung bình cộng từng trục (xA+xB)/2, (yA+yB)/2, (zA+zB)/2; Đội trưởng tìm đường vượt mê cung.',
    teamRoles: [
      '🚪 Thành viên 1: Tính hoành độ trung điểm xI = (xA + xB) / 2',
      '🚪 Thành viên 2: Tính tung độ trung điểm yI = (yA + yB) / 2',
      '🚪 Thành viên 3: Tính cao độ trung điểm zI = (zA + zB) / 2',
      '👑 Đội trưởng: Dẫn đường vượt tường mê cung & mở 3 Cổng Không Gian'
    ],
    huntMap: {
      theme: 'maze',
      worldTitle: 'BẢN ĐỒ MÊ CUNG TRUNG ĐIỂM I(x;y;z)',
      spawn: { x: 12, y: 50 },
      chest: { x: 88, y: 50, name: 'Rương Bản Đồ Mê Cung' },
      stations: [
        { x: 30, y: 22, name: 'Cổng I · Ngã Rẽ Hoành Độ xI', monsterIcon: '👻', monsterName: 'Bóng Ma Ngã Rẽ X', badge: 'xI = 2' },
        { x: 52, y: 76, name: 'Cổng II · Ngã Rẽ Tung Độ yI', monsterIcon: '🦇', monsterName: 'Dơi Canh Cổng Y', badge: 'yI = 0' },
        { x: 74, y: 24, name: 'Cổng III · Cửa Thoát Cao Độ zI', monsterIcon: '🐺', monsterName: 'Sói Không Gian Z', badge: 'zI = 2' }
      ]
    },
    defenseConfig: {
      castleName: 'Thành Trì Mê Cung Trung Điểm',
      theme: 'maze',
      waves: [
        { name: 'Đợt 1: Bóng Ma Ngã Rẽ X', enemies: ['bat', 'goblin', 'bat', 'skeleton'], boss: '👻' },
        { name: 'Đợt 2: Dơi Canh Cổng Y', enemies: ['bat', 'skeleton', 'bat', 'orc'], boss: '🦇' },
        { name: 'Đợt 3: Sói Không Gian Z', enemies: ['skeleton', 'orc', 'skeleton', 'bat'], boss: '🐺' }
      ]
    },
    challenges: [
      {
        prompt: 'Cho đoạn thẳng AB với A(0; −2; 4) và B(4; 2; 0). Hoành độ xI của trung điểm I bằng bao nhiêu?',
        options: ['4', '0', '2', '−2'],
        correct: 2,
        shortAnswer: '2',
        hints: ['Hoành độ trung điểm bằng trung bình cộng hai hoành độ.', 'Tính: xI = (0 + 4) / 2 = ?'],
        explain: 'Ta có xI = (xA + xB) / 2 = (0 + 4) / 2 = 2.',
        label: 'Ngã rẽ X · Cánh cửa thứ nhất',
        roleAssign: 'Thành viên 1 tính nhanh (0 + 4) / 2',
        monster: { icon: '👻', name: 'Bóng Ma Ngã Rẽ X', hp: 140 },
        keyBadge: 'xI=2'
      },
      {
        prompt: 'Với A(0; −2; 4) và B(4; 2; 0), tung độ yI của trung điểm I bằng bao nhiêu?',
        options: ['0', '−2', '2', '4'],
        correct: 0,
        shortAnswer: '0',
        hints: ['Tung độ trung điểm bằng trung bình cộng hai tung độ.', 'Tính: yI = (−2 + 2) / 2 = ?'],
        explain: 'Ta có yI = (yA + yB) / 2 = (−2 + 2) / 2 = 0.',
        label: 'Ngã rẽ Y · Cánh cửa thứ hai',
        roleAssign: 'Thành viên 2 tính (−2 + 2) / 2',
        monster: { icon: '🦇', name: 'Dơi Canh Cổng Y', hp: 160 },
        keyBadge: 'yI=0'
      },
      {
        prompt: 'Với A(0; −2; 4) và B(4; 2; 0), cao độ zI của trung điểm I bằng bao nhiêu?',
        options: ['4', '−2', '2', '0'],
        correct: 2,
        shortAnswer: '2',
        hints: ['Cao độ trung điểm bằng trung bình cộng hai cao độ.', 'Tính: zI = (4 + 0) / 2 = ?'],
        explain: 'Ta có zI = (zA + zB) / 2 = (4 + 0) / 2 = 2. Vậy trung điểm I(2; 0; 2)!',
        label: 'Ngã rẽ Z · Cửa thoát mê cung',
        roleAssign: 'Thành viên 3 tính (4 + 0) / 2 & Đội trưởng chốt I(2; 0; 2)',
        monster: { icon: '🐺', name: 'Sói Không Gian Z', hp: 190 },
        keyBadge: 'zI=2'
      }
    ]
  },
  {
    id: 5,
    gameType: 'boss',
    defaultMode: 'defense',
    title: 'ĐẠI CHIẾN BOSS: BÓNG ĐEN LÃNG QUÊN',
    place: 'Thành Trì Cuối Cùng',
    icon: '🐲',
    tag: 'Điều kiện hai vectơ cùng phương',
    time: '7–8 phút',
    item: 'Chìa khóa Lõi Trí Tuệ',
    digit: '4',
    digitRule: 'Lấy giá trị tham số m = 4 khi hai vectơ cùng phương.',
    story: 'Boss cuối "Bóng Đen Lãng Quên" cùng đại quân Orc & Rồng Hắc Ám đang tổng tấn công Thành Trì Cuối Cùng! Boss mang 3 lớp giáp tương ứng với bài toán Hai Vectơ Cùng Phương (u = k·v). Hãy hợp sức giải toán, nâng cấp tối đa 3 Anh Hùng và tung toàn bộ Kỹ năng để phá vỡ 3 lớp giáp của Boss!',
    groupTask: 'TV1 tìm hệ số tỉ lệ k, TV2 tìm tham số m, TV3 kiểm tra cặp vectơ cùng phương; Đội trưởng chỉ huy chiến trường Thủ Thành.',
    teamRoles: [
      '⚔️ Thành viên 1: Tìm hệ số tỉ lệ k từ hai tọa độ đã biết (u = k·v)',
      '🔥 Thành viên 2: Thay hệ số k để tìm tham số m = k·x_v',
      '⚡ Thành viên 3: Kiểm tra bộ ba tỉ lệ x₁/x₂ = y₁/y₂ = z₁/z₂',
      '👑 Đội trưởng: Nâng cấp tối đa Anh Hùng, bật Khiên Thành & Mưa Tên diệt Boss'
    ],
    huntMap: {
      theme: 'citadel',
      worldTitle: 'BẢN ĐỒ THÀNH TRÌ BÓNG ĐEN CUỐI CÙNG',
      spawn: { x: 14, y: 50 },
      chest: { x: 86, y: 50, name: 'Rương Chìa Khóa Lõi Trí Tuệ' },
      stations: [
        { x: 34, y: 28, name: 'Giáp I · Tiền Đồn Hệ Số k', monsterIcon: '⚔️', monsterName: 'Kỵ Sĩ Hắc Ám (Lớp Giáp 1)', badge: 'k = 2' },
        { x: 56, y: 72, name: 'Giáp II · Pháp Trận Tham Số m', monsterIcon: '🔥', monsterName: 'Pháp Sư Hắc Ám (Lớp Giáp 2)', badge: 'm = 4' },
        { x: 75, y: 34, name: 'Giáp III · Điện Thờ Rồng Boss', monsterIcon: '🐲', monsterName: 'Boss Bóng Đen Lãng Quên', badge: 'u = 2v' }
      ]
    },
    defenseConfig: {
      castleName: 'Thành Trì Lõi Trí Tuệ Oxyz',
      theme: 'citadel',
      waves: [
        { name: 'Phá Giáp 1 · Tìm Hệ Số Tỉ Lệ k', enemies: ['skeleton', 'orc', 'bat', 'orc'], boss: '⚔️' },
        { name: 'Phá Giáp 2 · Giải Tham Số m', enemies: ['orc', 'skeleton', 'orc', 'bat', 'orc'], boss: '🔥' },
        { name: 'Phá Giáp 3 · Đại Chiến Boss Rồng', enemies: ['orc', 'orc', 'skeleton', 'bat', 'orc'], boss: '🐲' }
      ]
    },
    challenges: [
      {
        prompt: 'Cho hai vectơ u = (m; 2; 4) và v = (2; 1; 2) cùng phương với nhau. Từ hai tọa độ cuối, hệ số tỉ lệ k trong đẳng thức u = k·v bằng bao nhiêu?',
        options: ['1', '2', '3', '4'],
        correct: 1,
        shortAnswer: '2',
        hints: ['Dựa vào tung độ và cao độ: 2 = k×1 và 4 = k×2.', 'Suy ra k = 2 / 1 = ?'],
        explain: 'Vì u = k·v nên ta có 2 = k·1 và 4 = k·2, suy ra hệ số tỉ lệ k = 2. Lớp giáp thứ nhất của Boss đã vỡ!',
        label: 'Phá giáp 1 · Xác định hệ số tỉ lệ k',
        roleAssign: 'Thành viên 1 lập tỉ số y_u / y_v = 2 / 1 = 4 / 2',
        monster: { icon: '⚔️', name: 'Kỵ Sĩ Hắc Ám (Giáp 1)', hp: 180 },
        keyBadge: 'k=2'
      },
      {
        prompt: 'Với u = (m; 2; 4), v = (2; 1; 2) cùng phương và hệ số tỉ lệ k = 2 (tức u = 2v), giá trị của tham số m bằng bao nhiêu?',
        options: ['2', '8', '4', '1'],
        correct: 2,
        shortAnswer: '4',
        hints: ['Hoành độ của u bằng k lần hoành độ của v: m = k × 2.', 'Với k = 2, tính m = 2 × 2 = ?'],
        explain: 'Ta có m = k × 2 = 2 × 2 = 4. Lớp giáp thứ hai của Boss đã bị xuyên thủng!',
        label: 'Phá giáp 2 · Tìm tham số m',
        roleAssign: 'Thành viên 2 tính m = k × x_v = 2 × 2',
        monster: { icon: '🔥', name: 'Pháp Sư Hắc Ám (Giáp 2)', hp: 220 },
        keyBadge: 'm=4'
      },
      {
        prompt: 'Khi m = 4, cặp vectơ nào dưới đây là hai vectơ cùng phương?',
        options: ['(4; 2; 4) và (2; 1; 2)', '(4; 2; 4) và (1; 2; 2)', '(4; 2; 4) và (2; 2; 1)', '(4; 2; 4) và (4; 1; 2)'],
        correct: 0,
        shortAnswer: 'A',
        hints: ['Hai vectơ cùng phương khi tọa độ tương ứng tỉ lệ: x₁/x₂ = y₁/y₂ = z₁/z₂.', 'Kiểm tra: (4; 2; 4) = 2 × (2; 1; 2).'],
        explain: 'Vì (4; 2; 4) = 2 × (2; 1; 2) nên hai vectơ cùng phương. Boss Bóng Đen Lãng Quên đã bị đánh bại hoàn toàn!',
        label: 'Phá giáp 3 · Đòn quyết định hạ Boss',
        roleAssign: 'Cả đội đồng thanh kiểm tra tỉ lệ 4/2 = 2/1 = 4/2 = 2',
        monster: { icon: '🐲', name: 'Boss Bóng Đen Lãng Quên', hp: 300 },
        keyBadge: 'BOSS💥'
      }
    ]
  }
];

const TOKEN_WORDS = {
  '3': 'TƯ DUY',
  '0': 'VÀ',
  '5': 'HỢP TÁC',
  '2': 'MỞ',
  '4': 'KHO BÁU'
};

const MESSAGE_OPTIONS = [
  'TƯ DUY VÀ HỢP TÁC MỞ KHO BÁU',
  'TỐC ĐỘ LUÔN QUAN TRỌNG NHẤT',
  'CHỈ MỘT NGƯỜI GIỎI MỚI CHIẾN THẮNG'
];

module.exports = { STAGES, TOKEN_WORDS, MESSAGE_OPTIONS };
