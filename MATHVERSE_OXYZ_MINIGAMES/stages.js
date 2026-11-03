'use strict';
// Dữ liệu 5 Chặng Hành Trình MATHVERSE OXYZ (Toán 12 - GDPT 2018)
// Tích hợp: Bản đồ Lục địa 5 Chặng + Săn Kho Báu 2D + Bảo Vệ Thành Trì + Mô phỏng Hình học 3D Oxyz

const STAGES = [
  {
    id: 1,
    gameType: 'hunt',
    defaultMode: 'hunt',
    title: 'QUẦN ĐẢO RỪNG VECTƠ',
    subtitle: 'Săn Kho Báu Tọa Độ Vectơ AB',
    place: 'Rừng Vectơ Nguyên Sinh',
    icon: '🏝️',
    biomeColor: '#10b981',
    tag: 'Tọa độ vectơ AB trong Oxyz',
    time: '5–6 phút',
    item: 'La bàn ba trục',
    digit: '3',
    digitRule: 'Lấy hiệu hoành độ xB − xA = 5 − 2 = 3.',
    story: 'Bản đồ Quần Đảo Rừng Vectơ bị phong ấn bởi 3 Đền Cổ giữ 3 thành phần (x; y; z) của vectơ AB. Cả đội hãy điều khiển nhân vật vượt qua cầu gỗ và rừng nguyên sinh, đánh bại Thần Rừng tại từng đền để thu thập đủ 3 chìa khóa tọa độ và mở Rương La Bàn Ba Trục!',
    groupTask: 'TV1 tính trục Ox, TV2 tính trục Oy, TV3 tính trục Oz; Đội trưởng điều khiển nhân vật trên bản đồ và phát lệnh tấn công.',
    teamRoles: [
      '🧭 Thành viên 1: Phụ trách công thức hoành độ xB − xA',
      '📐 Thành viên 2: Phụ trách công thức tung độ yB − yA (chú ý dấu âm)',
      '🔭 Thành viên 3: Phụ trách công thức cao độ zB − zA',
      '👑 Đội trưởng: Điều khiển nhân vật di chuyển & chốt đáp án tấn công'
    ],
    visual3D: {
      title: 'Mô phỏng 3D: Vectơ AB với A(2; −1; 3) và B(5; 1; 7)',
      type: 'vectorAB',
      points: [
        { label: 'A(2;−1;3)', coords: [2, -1, 3], x: 2, y: -1, z: 3, color: '#38bdf8' },
        { label: 'B(5;1;7)', coords: [5, 1, 7], x: 5, y: 1, z: 7, color: '#facc15' }
      ],
      vectors: [
        { from: [2, -1, 3], to: [5, 1, 7], label: 'AB = (3; 2; 4)', color: '#4ade80' }
      ],
      formula: 'AB = (xB − xA ; yB − yA ; zB − zA)'
    },
    huntMap: {
      theme: 'forest',
      worldTitle: 'QUẦN ĐẢO RỪNG VECTƠ OXYZ',
      spawn: { x: 12, y: 52 },
      chest: { x: 88, y: 50, name: 'Rương La Bàn Ba Trục' },
      stations: [
        { x: 32, y: 25, name: 'Đền I · Trục Hoành Ox', monsterIcon: '👹', monsterType: 'treant', monsterName: 'Mộc Tinh Hoành Độ', badge: 'ABx = 3' },
        { x: 54, y: 75, name: 'Đền II · Trục Tung Oy', monsterIcon: '🐊', monsterType: 'hydra', monsterName: 'Thủy Quái Tung Độ', badge: 'ABy = 2' },
        { x: 73, y: 28, name: 'Đền III · Trục Cao Oz', monsterIcon: '🦅', monsterType: 'griffin', monsterName: 'Đại Bàng Cao Độ', badge: 'ABz = 4' }
      ]
    },
    defenseConfig: {
      castleName: 'Thành Trì Rừng Vectơ',
      theme: 'forest',
      waves: [
        { name: 'Đợt 1: Quân đoàn Mộc Tinh Ox', enemies: ['goblin', 'bat', 'goblin', 'skeleton'], boss: '👹' },
        { name: 'Đợt 2: Quân đoàn Thủy Quái Oy', enemies: ['bat', 'skeleton', 'goblin', 'orc'], boss: '🐊' },
        { name: 'Đợt 3: Quân đoàn Đại Bàng Oz', enemies: ['skeleton', 'orc', 'bat', 'orc'], boss: '🦅' }
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
        label: 'Đền I · Tọa độ X · Khai mở Trục Ox',
        roleAssign: 'Thành viên 1 (Trục Ox) tính nhanh xB − xA = 5 − 2',
        monster: { icon: '👹', type: 'treant', name: 'Mộc Tinh Hoành Độ', hp: 120 },
        keyBadge: 'X=3',
        highlightAxis: 'x'
      },
      {
        prompt: 'Với A(2; −1; 3) và B(5; 1; 7), thành phần tung độ y của vectơ AB bằng bao nhiêu?',
        options: ['0', '2', '−2', '1'],
        correct: 1,
        shortAnswer: '2',
        hints: ['Cẩn thận khi trừ một số âm: yB − yA.', 'Tính: 1 − (−1) = ?'],
        explain: 'Ta có ABᵧ = yB − yA = 1 − (−1) = 2.',
        label: 'Đền II · Tọa độ Y · Khai mở Trục Oy',
        roleAssign: 'Thành viên 2 (Trục Oy) kiểm tra dấu âm 1 − (−1)',
        monster: { icon: '🐊', type: 'hydra', name: 'Thủy Quái Tung Độ', hp: 150 },
        keyBadge: 'Y=2',
        highlightAxis: 'y'
      },
      {
        prompt: 'Với A(2; −1; 3) và B(5; 1; 7), thành phần cao độ z của vectơ AB bằng bao nhiêu?',
        options: ['−4', '10', '4', '3'],
        correct: 2,
        shortAnswer: '4',
        hints: ['Lấy cao độ điểm cuối B trừ cao độ điểm đầu A.', 'Tính: zB − zA = 7 − 3 = ?'],
        explain: 'Ta có ABz = zB − zA = 7 − 3 = 4. Vậy vectơ AB = (3; 2; 4).',
        label: 'Đền III · Tọa độ Z · Hoàn tất Vectơ AB',
        roleAssign: 'Thành viên 3 (Trục Oz) tính 7 − 3 & Đội trưởng tổng hợp AB=(3;2;4)',
        monster: { icon: '🦅', type: 'griffin', name: 'Đại Bàng Cao Độ', hp: 180 },
        keyBadge: 'Z=4',
        highlightAxis: 'z'
      }
    ]
  },
  {
    id: 2,
    gameType: 'defense',
    defaultMode: 'defense',
    title: 'PHÁO ĐÀI VUÔNG GÓC',
    subtitle: 'Bảo Vệ Thành Trì Tích Vô Hướng',
    place: 'Pháo Đài Vuông Góc',
    icon: '🏰',
    biomeColor: '#f59e0b',
    tag: 'Tích vô hướng & Hai vectơ vuông góc',
    time: '6–7 phút',
    item: 'Khiên trực giao',
    digit: '0',
    digitRule: 'Lấy kết quả tích vô hướng của đợt tấn công đầu tiên (u·v = 0).',
    story: 'Ba đợt quân đoàn Cơ Giáp Không Gian đang tiến vào Pháo Đài Vuông Góc trên 3 làn đường! 3 Anh Hùng đang chiến đấu cầm chân chúng. Cả đội hãy giải nhanh tích vô hướng u·v để kiếm Vàng nâng cấp Anh Hùng, tung 4 Kỹ năng và kích hoạt Đại Bác Laser tiêu diệt từng đợt quái!',
    groupTask: 'TV1 tính tích x₁x₂, TV2 tính y₁y₂, TV3 tính z₁z₂; Đội trưởng cộng tổng, mua Nâng cấp và tung Kỹ năng Bảo vệ Thành trì.',
    teamRoles: [
      '🏹 Thành viên 1 (Cung Thủ): Tính tích hoành độ x₁·x₂',
      '🧙‍♂️ Thành viên 2 (Pháp Sư): Tính tích tung độ y₁·y₂',
      '🛡️ Thành viên 3 (Hiệp Sĩ): Tính tích cao độ z₁·z₂',
      '👑 Đội trưởng (Chỉ huy): Cộng x₁x₂+y₁y₂+z₁z₂, nâng cấp & kích hoạt kỹ năng'
    ],
    visual3D: {
      title: 'Mô phỏng 3D: Tích vô hướng & Góc vuông góc (u ⊥ v ⇔ u·v = 0)',
      type: 'dotProduct',
      points: [
        { label: 'O(0;0;0)', coords: [0, 0, 0], x: 0, y: 0, z: 0, color: '#ffffff' }
      ],
      vectors: [
        { from: [0, 0, 0], to: [2, 4, -4], label: 'u = (1; 2; −2)', color: '#38bdf8' },
        { from: [0, 0, 0], to: [4, 0, 2], label: 'v = (2; 0; 1)', color: '#facc15' }
      ],
      formula: 'u · v = x₁x₂ + y₁y₂ + z₁z₂ (Vuông góc khi u · v = 0)'
    },
    huntMap: {
      theme: 'fortress',
      worldTitle: 'PHÁO ĐÀI VUÔNG GÓC OXYZ',
      spawn: { x: 12, y: 50 },
      chest: { x: 88, y: 50, name: 'Rương Khiên Trực Giao' },
      stations: [
        { x: 34, y: 26, name: 'Cổng Bắc · Đợt Quái 1', monsterIcon: '👾', monsterType: 'golem', monsterName: 'Cơ Giáp Cổng Bắc', badge: 'u·v = 0' },
        { x: 55, y: 74, name: 'Cổng Đông · Đợt Quái 2', monsterIcon: '👹', monsterType: 'demon', monsterName: 'Chiến Binh Cổng Đông', badge: 'a·b = −2' },
        { x: 74, y: 30, name: 'Cổng Tây · Đợt Quái 3', monsterIcon: '🤖', monsterType: 'mech', monsterName: 'Pháo Đài Cơ Giáp Tây', badge: 'c·d = 0' }
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
        explain: 'u·v = 1×2 + 2×0 + (−2)×1 = 2 + 0 − 2 = 0. Hai vectơ khác 0 có tích vô hướng bằng 0 nên vuông góc (u ⊥ v)!',
        label: 'Sóng quái 1 · Cổng Bắc (u ⊥ v)',
        roleAssign: 'TV1 tính 1×2, TV2 tính 2×0, TV3 tính (−2)×1 → Cộng lại',
        monster: { icon: '👾', type: 'golem', name: 'Thủ Lĩnh Sóng Quái 1', hp: 140 },
        keyBadge: 'u·v=0',
        highlightAxis: 'all'
      },
      {
        prompt: 'ĐỢT 2: Cho a = (2; −1; 3) và b = (1; 1; −1). Tích vô hướng a · b bằng bao nhiêu?',
        options: ['2', '−2', '−4', '0'],
        correct: 1,
        shortAnswer: '-2',
        hints: ['Nhân từng cặp tọa độ tương ứng rồi cộng lại.', 'Tính: 2×1 + (−1)×1 + 3×(−1) = ?'],
        explain: 'a·b = 2×1 + (−1)×1 + 3×(−1) = 2 − 1 − 3 = −2.',
        label: 'Sóng quái 2 · Cổng Đông (Góc tù)',
        roleAssign: 'Chú ý dấu âm ở tích thứ hai (−1)×1 và thứ ba 3×(−1)',
        monster: { icon: '👹', type: 'demon', name: 'Ác Quỷ Cổng Đông', hp: 170 },
        keyBadge: 'a·b=−2',
        highlightAxis: 'all'
      },
      {
        prompt: 'ĐỢT 3: Cho c = (1; 1; 1) và d = (2; −1; −1). Tích vô hướng c · d bằng bao nhiêu?',
        options: ['3', '2', '0', '−1'],
        correct: 2,
        shortAnswer: '0',
        hints: ['Đừng bỏ quên hai dấu trừ ở hai thành phần cuối.', 'Tính: 1×2 + 1×(−1) + 1×(−1) = 2 − 1 − 1 = ?'],
        explain: 'c·d = 2 − 1 − 1 = 0. Do đó hai vectơ c và d vuông góc (c ⊥ d)!',
        label: 'Sóng quái 3 · Cổng Tây (c ⊥ d)',
        roleAssign: 'Cả nhóm kiểm tra điều kiện hai vectơ vuông góc c·d = 0',
        monster: { icon: '🤖', type: 'mech', name: 'Cơ Giáp Khổng Lồ', hp: 210 },
        keyBadge: 'c⊥d',
        highlightAxis: 'all'
      }
    ]
  },
  {
    id: 3,
    gameType: 'zombie_defense',
    defaultMode: 'zombie',
    title: 'THÁP PHA LÊ KHOẢNG CÁCH',
    subtitle: 'Chặn Quân Đoàn Zombie Bằng Công Thức Khoảng Cách',
    place: 'Thung Lũng Tháp Pha Lê',
    icon: '💠',
    biomeColor: '#8b5cf6',
    tag: 'Độ dài vectơ & Khoảng cách giữa hai điểm',
    time: '6–7 phút',
    item: 'Lõi Tháp Pha Lê',
    digit: '5',
    digitRule: 'Lấy độ dài khoảng cách rèn được AB = 5.',
    cipher: 'PHALE',
    cipherHint: 'Tên của tòa tháp cổ được rèn từ 5 viên tinh thể ánh sáng (5 ký tự: P - H - A - L - E)!',
    cipherLetters: ['P', 'H', 'A', 'L', 'E'],
    story: 'Quân đoàn Zombie Pha Lê đang tiến công trên 4 làn cỏ! Mỗi Zombie vác theo một tấm bia đáp án A, B, C, D. Hãy điều khiển xạ thủ ngắm bắn chính xác vào Zombie mang kết quả đúng của bài toán độ dài/khoảng cách để hạ gục Zombie và thu hồi 5 mảnh cổ tự PHALE mở cổng Tháp Pha Lê!',
    groupTask: 'Phân vai nhóm: TV1 giải bài toán khoảng cách, TV2 giải độ dài vectơ, TV3 tính căn bậc hai, TV4 ghi chép ký tự mật thư, Đội trưởng điều khiển nhân vật khám phá và ghép mã.',
    teamRoles: [
      '🧭 TV1 (Thám Hiểm & Dẫn Đường): Xác định vị trí 5 mỏ pha lê và cầu đá trên bản đồ',
      '📐 TV2 (Nhà Toán Học): Áp dụng công thức khoảng cách AB = √[(xB-xA)² + (yB-yA)² + (zB-zA)²]',
      '⚡ TV3 (Chuyên Gia Vectơ): Áp dụng công thức độ dài vectơ |u| = √(x² + y² + z²)',
      '📜 TV4 (Nhà Giải Mật Mã): Thu thập các ký tự rune P, H, A, L, E và giải mã mật thư',
      '👑 Đội trưởng (Chỉ Huy): Điều khiển di chuyển, nhấn E tương tác và chốt đáp án'
    ],
    visual3D: {
      title: 'Mô phỏng 3D: Khoảng cách AB và độ dài vectơ trong không gian Oxyz',
      type: 'distanceAB',
      points: [
        { label: 'A(1;2;−1)', coords: [1, 2, -1], x: 1, y: 2, z: -1, color: '#c084fc' },
        { label: 'B(4;6;−1)', coords: [4, 6, -1], x: 4, y: 6, z: -1, color: '#38bdf8' }
      ],
      vectors: [
        { from: [1, 2, -1], to: [4, 2, -1], label: 'Δx = 3', color: '#f87171' },
        { from: [4, 2, -1], to: [4, 6, -1], label: 'Δy = 4', color: '#4ade80' },
        { from: [1, 2, -1], to: [4, 6, -1], label: 'AB = √(3²+4²) = 5', color: '#facc15' }
      ],
      formula: 'AB = √[(xB − xA)² + (yB − yA)² + (zB − zA)²]'
    },
    huntMap: {
      theme: 'crystal',
      worldTitle: 'THÁP PHA LÊ KHOẢNG CÁCH OXYZ',
      spawn: { x: 8, y: 50 },
      chest: { x: 92, y: 50, name: 'Bàn Giải Mã Tháp Pha Lê' },
      stations: [
        { x: 22, y: 26, name: 'Mỏ I · Pha Lê Lam (Mảnh P)', monsterIcon: '🔷', monsterType: 'golem', monsterName: 'Vệ Binh Pha Lê Lam', badge: 'Mảnh P', cipherPiece: 'P' },
        { x: 38, y: 74, name: 'Mỏ II · Pha Lê Lục (Mảnh H)', monsterIcon: '💚', monsterType: 'lich', monsterName: 'Phù Thủy Tinh Thể Lục', badge: 'Mảnh H', cipherPiece: 'H' },
        { x: 55, y: 28, name: 'Mỏ III · Pha Lê Hoàng Kim (Mảnh A)', monsterIcon: '⭐', monsterType: 'crystal_boss', monsterName: 'Vệ Binh Hoàng Kim', badge: 'Mảnh A', cipherPiece: 'A' },
        { x: 70, y: 72, name: 'Mỏ IV · Pha Lê Hồng Ngọc (Mảnh L)', monsterIcon: '🌸', monsterType: 'golem', monsterName: 'Khổng Lồ Thạch Anh', badge: 'Mảnh L', cipherPiece: 'L' },
        { x: 84, y: 34, name: 'Mỏ V · Lõi Tối Thượng (Mảnh E)', monsterIcon: '💎', monsterType: 'crystal_boss', monsterName: 'Thần Thú Pha Lê Oxyz', badge: 'Mảnh E', cipherPiece: 'E' }
      ]
    },
    defenseConfig: {
      castleName: 'Tháp Pha Lê Khoảng Cách',
      theme: 'crystal',
      waves: [
        { name: 'Đợt 1: Vệ Binh Pha Lê Lam', enemies: ['goblin', 'skeleton', 'goblin', 'bat'], boss: '🔷' },
        { name: 'Đợt 2: Phù Thủy Tinh Thể Lục', enemies: ['bat', 'skeleton', 'orc', 'skeleton'], boss: '💚' },
        { name: 'Đợt 3: Vệ Binh Hoàng Kim', enemies: ['orc', 'skeleton', 'orc', 'orc'], boss: '⭐' },
        { name: 'Đợt 4: Khổng Lồ Thạch Anh', enemies: ['skeleton', 'orc', 'goblin', 'orc'], boss: '🌸' },
        { name: 'Đợt 5: Thần Thú Pha Lê Oxyz', enemies: ['orc', 'orc', 'orc', 'boss'], boss: '💎' }
      ]
    },
    challenges: [
      {
        prompt: 'TRẠM 1: Trong không gian Oxyz, cho hai điểm A(1; 2; −1) và B(4; 2; −1). Khoảng cách giữa hai điểm A và B bằng bao nhiêu?',
        options: ['3', '5', '4', '1'],
        correct: 0,
        shortAnswer: '3',
        cipherPiece: 'P',
        hints: [
          'Áp dụng công thức khoảng cách: AB = √[(xB − xA)² + (yB − yA)² + (zB − zA)²].',
          'Vì yA = yB và zA = zB nên AB = |xB − xA| = |4 − 1| = 3.'
        ],
        explain: 'Ta có AB = √[(4 − 1)² + (2 − 2)² + (−1 − (−1))²] = √(3² + 0² + 0²) = 3. Đội nhận được Mảnh Mật Thư [P]!',
        label: 'Mỏ I · Pha Lê Lam · Mảnh [P]',
        roleAssign: 'TV2 tính hiệu hoành độ Δx = 4 − 1; TV4 ghi chép ký tự P',
        monster: { icon: '🔷', type: 'golem', name: 'Vệ Binh Pha Lê Lam', hp: 120 },
        keyBadge: 'Mảnh P (AB=3)',
        highlightAxis: 'x'
      },
      {
        prompt: 'TRẠM 2: Trong không gian Oxyz, cho vectơ u = (2; −1; 2). Độ dài |u| của vectơ u bằng bao nhiêu?',
        options: ['9', '3', '√5', '5'],
        correct: 1,
        shortAnswer: '3',
        cipherPiece: 'H',
        hints: [
          'Áp dụng công thức độ dài vectơ: |u| = √(x² + y² + z²).',
          'Tính: √(2² + (−1)² + 2²) = √(4 + 1 + 4) = √9 = ?'
        ],
        explain: 'Ta có |u| = √(2² + (−1)² + 2²) = √(4 + 1 + 4) = √9 = 3. Đội nhận được Mảnh Mật Thư [H]!',
        label: 'Mỏ II · Pha Lê Lục · Mảnh [H]',
        roleAssign: 'TV3 tính bình phương các tọa độ u: 4 + 1 + 4 = 9; TV4 ghi ký tự H',
        monster: { icon: '💚', type: 'lich', name: 'Phù Thủy Tinh Thể Lục', hp: 150 },
        keyBadge: 'Mảnh H (|u|=3)',
        highlightAxis: 'all'
      },
      {
        prompt: 'TRẠM 3: Cho hai điểm M(1; −2; 3) và N(3; −2; 1). Độ dài đoạn thẳng MN bằng bao nhiêu?',
        options: ['2√2', '4', '2', '√6'],
        correct: 0,
        shortAnswer: '2√2',
        cipherPiece: 'A',
        hints: [
          'Tính tọa độ vectơ MN = (xN − xM; yN − yM; zN − zM).',
          'MN = √[(3−1)² + (−2−(−2))² + (1−3)²] = √(2² + 0² + (−2)²) = √8 = 2√2.'
        ],
        explain: 'Ta có MN = √(2² + 0² + (−2)²) = √(4 + 0 + 4) = √8 = 2√2. Đội nhận được Mảnh Mật Thư [A]!',
        label: 'Mỏ III · Pha Lê Hoàng Kim · Mảnh [A]',
        roleAssign: 'TV2 tính MN = √(2² + (−2)²) = √8 = 2√2; TV4 ghi ký tự A',
        monster: { icon: '⭐', type: 'crystal_boss', name: 'Vệ Binh Hoàng Kim', hp: 170 },
        keyBadge: 'Mảnh A (MN=2√2)',
        highlightAxis: 'all'
      },
      {
        prompt: 'TRẠM 4: Cho hai điểm A(1; 2; 3) và B(3; 5; 9). Khoảng cách giữa hai điểm A và B bằng bao nhiêu?',
        options: ['√45', '7', '9', '5'],
        correct: 1,
        shortAnswer: '7',
        cipherPiece: 'L',
        hints: [
          'Tính hiệu tọa độ: xB − xA = 2, yB − yA = 3, zB − zA = 6.',
          'Tính: √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = ?'
        ],
        explain: 'Ta có AB = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7. Đội nhận được Mảnh Mật Thư [L]!',
        label: 'Mỏ IV · Pha Lê Hồng Ngọc · Mảnh [L]',
        roleAssign: 'TV2 & TV3 phối hợp tính 4 + 9 + 36 = 49 → căn bậc hai bằng 7; TV4 ghi ký tự L',
        monster: { icon: '🌸', type: 'golem', name: 'Khổng Lồ Thạch Anh', hp: 190 },
        keyBadge: 'Mảnh L (AB=7)',
        highlightAxis: 'all'
      },
      {
        prompt: 'TRẠM 5: Cho hai điểm C(2; 1; −1) và D(6; 4; 11). Độ dài đoạn thẳng CD bằng bao nhiêu?',
        options: ['15', '12', '13', '√153'],
        correct: 2,
        shortAnswer: '13',
        cipherPiece: 'E',
        hints: [
          'Tính các hiệu: Δx = 6 − 2 = 4, Δy = 4 − 1 = 3, Δz = 11 − (−1) = 12.',
          'Tính: √(4² + 3² + 12²) = √(16 + 9 + 144) = √169 = ?'
        ],
        explain: 'Ta có CD = √(4² + 3² + 12²) = √(16 + 9 + 144) = √169 = 13. Đội nhận được Mảnh Mật Thư [E]!',
        label: 'Mỏ V · Lõi Tối Thượng · Mảnh [E]',
        roleAssign: 'Cả đội tính √(16 + 9 + 144) = √169 = 13; Đội trưởng chuẩn bị mở Bàn Giải Mã PHALE',
        monster: { icon: '💎', type: 'crystal_boss', name: 'Thần Thú Pha Lê Oxyz', hp: 220 },
        keyBadge: 'Mảnh E (CD=13)',
        highlightAxis: 'all'
      }
    ]
  },
  {
    id: 4,
    gameType: 'maze',
    defaultMode: 'maze',
    title: 'MÊ CUNG TRUNG ĐIỂM',
    subtitle: 'Khám Phá Tọa Độ Ô Vuông & Ghép Mật Thư TRUNG',
    place: 'Mê Cung Không Gian Cổ Đại',
    icon: '🌀',
    biomeColor: '#06b6d4',
    tag: 'Tọa độ trung điểm & Trọng tâm tam giác',
    time: '6–7 phút',
    item: 'Bản Đồ Cổ & Chìa Khóa Vàng',
    digit: '2',
    digitRule: 'Lấy hoành độ trung điểm xI = 2.',
    cipher: 'TRUNG',
    cipherHint: 'Mật từ khóa cốt lõi của Trung điểm & Trọng tâm (5 ký tự: T - R - U - N - G)!',
    cipherLetters: ['T', 'R', 'U', 'N', 'G'],
    story: 'Cả đội bước vào Mê Cung Atlantis cổ đại với các bức tường đá kiên cố và hệ trục tọa độ ô vuông Oxy hiển thị rõ nét trên mặt sàn. Có 5 trạm thử thách trung điểm và trọng tâm tam giác. Mỗi kết quả tọa độ tính được chính là tọa độ thực tế trên bản đồ ô vuông mà nhân vật phải điều khiển đến để kích hoạt công tắc đá và thu thập mảnh mật mã! Thu thập đủ 5 mảnh và ghép thành mật thư "TRUNG" để mở cánh cổng vàng dẫn vào Căn Phòng Kho Báu Trung Tâm!',
    groupTask: 'Phân vai nhóm: TV1 tính hoành độ trung bình cộng, TV2 tính tung độ, TV3 tính cao độ, TV4 đối chiếu tọa độ ô vuông trên bản đồ, Đội trưởng điều khiển nhân vật chạy tới đúng vị trí ô bí mật.',
    teamRoles: [
      '🧭 TV1 (Chuyên Gia Trung Điểm): Áp dụng công thức M = ((xA+xB)/2; (yA+yB)/2; (zA+zB)/2)',
      '📐 TV2 (Chuyên Gia Trọng Tâm): Áp dụng công thức G = ((xA+xB+xC)/3; (yA+yB+xC)/3; (zA+zB+zC)/3)',
      '🔍 TV3 (Trinh Sát Tọa Độ): Định vị ô tọa độ (x; y) tương ứng trên lưới mê cung',
      '📜 TV4 (Chuyên Viên Giải Mật): Thu thập các ký tự T, R, U, N, G và sắp xếp mật thư',
      '👑 Đội trưởng (Hoa Tiêu): Lái nhân vật luồn lách qua mê cung và nhấn E tại cơ quan bí mật'
    ],
    visual3D: {
      title: 'Mô phỏng 3D: Trung điểm I(2; 0; 2) và Trọng tâm G trong không gian Oxyz',
      type: 'midpointI',
      points: [
        { label: 'A(0;−2;4)', coords: [0, -2, 4], x: 0, y: -2, z: 4, color: '#38bdf8' },
        { label: 'I(2;0;2)', coords: [2, 0, 2], x: 2, y: 0, z: 2, color: '#facc15' },
        { label: 'B(4;2;0)', coords: [4, 2, 0], x: 4, y: 2, z: 0, color: '#f472b6' }
      ],
      vectors: [
        { from: [0, -2, 4], to: [4, 2, 0], label: 'Đoạn thẳng AB', color: '#2dd4bf' }
      ],
      formula: 'I = ( (xA+xB)/2 ; (yA+yB)/2 ; (zA+zB)/2 )'
    },
    huntMap: {
      theme: 'maze',
      worldTitle: 'MÊ CUNG TỌA ĐỘ TRUNG ĐIỂM OXYZ',
      spawn: { x: 10, y: 50 },
      chest: { x: 90, y: 50, name: 'Cổng Phòng Kho Báu Trung Tâm' },
      stations: [
        { x: 25, y: 24, name: 'Trạm I · Cửa Đá Trung Điểm M (Mảnh T)', monsterIcon: '👻', monsterType: 'wraith', monsterName: 'Bóng Ma Trung Điểm', badge: 'Mảnh T', cipherPiece: 'T', mapCoord: { x: 4, y: 3, label: 'M(4; 3)' } },
        { x: 40, y: 76, name: 'Trạm II · Điện Thờ Trọng Tâm G (Mảnh R)', monsterIcon: '🦇', monsterType: 'vampire_bat', monsterName: 'Dơi Huyết Tọa Độ', badge: 'Mảnh R', cipherPiece: 'R', mapCoord: { x: 3, y: 3, label: 'G(3; 3)' } },
        { x: 56, y: 26, name: 'Trạm III · Cổng Dịch Chuyển Điểm D (Mảnh U)', monsterIcon: '🌀', monsterType: 'wraith', monsterName: 'Vong Hồn Không Gian', badge: 'Mảnh U', cipherPiece: 'U', mapCoord: { x: 4, y: 1, label: 'D(4; -2; 0)' } },
        { x: 72, y: 74, name: 'Trạm IV · Pháp Trận Trọng Tâm G₂ (Mảnh N)', monsterIcon: '🐺', monsterType: 'fenrir', monsterName: 'Sói Băng Mê Cung', badge: 'Mảnh N', cipherPiece: 'N', mapCoord: { x: 2, y: 5, label: 'G(2; 1; 2)' } },
        { x: 84, y: 32, name: 'Trạm V · Bệ Đá Trung Điểm K (Mảnh G)', monsterIcon: '🗝️', monsterType: 'fenrir', monsterName: 'Vệ Binh Chìa Khóa Vàng', badge: 'Mảnh G', cipherPiece: 'G', mapCoord: { x: 6, y: 4, label: 'K(3; 1; 2)' } }
      ]
    },
    defenseConfig: {
      castleName: 'Mê Cung Tọa Độ Trung Điểm',
      theme: 'maze',
      waves: [
        { name: 'Đợt 1: Bóng Ma Trung Điểm M', enemies: ['bat', 'goblin', 'bat', 'skeleton'], boss: '👻' },
        { name: 'Đợt 2: Dơi Huyết Tọa Độ G', enemies: ['bat', 'skeleton', 'bat', 'orc'], boss: '🦇' },
        { name: 'Đợt 3: Vong Hồn Không Gian', enemies: ['skeleton', 'orc', 'skeleton', 'bat'], boss: '🌀' },
        { name: 'Đợt 4: Sói Băng Mê Cung G₂', enemies: ['orc', 'skeleton', 'orc', 'bat'], boss: '🐺' },
        { name: 'Đợt 5: Vệ Binh Chìa Khóa Vàng', enemies: ['orc', 'orc', 'skeleton', 'fenrir'], boss: '🗝️' }
      ]
    },
    challenges: [
      {
        prompt: 'TRẠM 1: Cho đoạn thẳng AB với A(2; 4; 0) và B(6; 2; 0). Tọa độ trung điểm M của đoạn thẳng AB là tọa độ nào? (Sau khi tính đúng, hãy điều khiển nhân vật đến ô tọa độ tương ứng trên bản đồ để mở cơ quan!)',
        options: ['(4; 3; 0)', '(8; 6; 0)', '(2; −1; 0)', '(3; 4; 0)'],
        correct: 0,
        shortAnswer: '(4;3;0)',
        cipherPiece: 'T',
        targetGrid: { x: 4, y: 3, label: 'Ô M(4; 3)' },
        hints: [
          'Áp dụng công thức trung điểm: xM = (xA + xB) / 2 và yM = (yA + yB) / 2.',
          'Tính: xM = (2 + 6) / 2 = 4; yM = (4 + 2) / 2 = 3; zM = 0 → M(4; 3; 0).'
        ],
        explain: 'Ta có M = ((2+6)/2; (4+2)/2; 0) = (4; 3; 0). Ô bí mật tại tọa độ (4; 3) trên bản đồ đã kích hoạt! Nhận Mảnh [T]!',
        label: 'Trạm I · Cửa Đá Trung Điểm M · Mảnh [T]',
        roleAssign: 'TV1 tính trung bình cộng x, y; Đội trưởng tìm ô (4; 3) trên lưới mê cung',
        monster: { icon: '👻', type: 'wraith', name: 'Bóng Ma Trung Điểm', hp: 130 },
        keyBadge: 'Mảnh T: M(4;3;0)',
        highlightAxis: 'all'
      },
      {
        prompt: 'TRẠM 2: Cho tam giác ABC với A(1; 2; 0), B(5; 1; 0) và C(3; 6; 0). Tọa độ trọng tâm G của tam giác ABC là gì?',
        options: ['(9; 9; 0)', '(3; 3; 0)', '(2; 3; 0)', '(4; 3; 0)'],
        correct: 1,
        shortAnswer: '(3;3;0)',
        cipherPiece: 'R',
        targetGrid: { x: 3, y: 3, label: 'Ô G(3; 3)' },
        hints: [
          'Tọa độ trọng tâm tam giác: xG = (xA + xB + xC) / 3; yG = (yA + yB + yC) / 3.',
          'Tính: xG = (1 + 5 + 3) / 3 = 9 / 3 = 3; yG = (2 + 1 + 6) / 3 = 9 / 3 = 3 → G(3; 3; 0).'
        ],
        explain: 'Ta có G = ((1+5+3)/3; (2+1+6)/3; 0) = (3; 3; 0). Bệ thờ trọng tâm tại ô (3; 3) đã mở! Nhận Mảnh [R]!',
        label: 'Trạm II · Điện Thờ Trọng Tâm G · Mảnh [R]',
        roleAssign: 'TV2 tính trung bình cộng 3 đỉnh: xG=3, yG=3; TV4 ghi nhận mảnh R',
        monster: { icon: '🦇', type: 'vampire_bat', name: 'Dơi Huyết Tọa Độ', hp: 155 },
        keyBadge: 'Mảnh R: G(3;3;0)',
        highlightAxis: 'all'
      },
      {
        prompt: 'TRẠM 3: Cho đoạn thẳng CD với C(0; 2; 4) và biết trung điểm là I(2; 0; 2). Tọa độ điểm mút D là gì?',
        options: ['(4; −2; 0)', '(2; 2; 2)', '(1; 1; 3)', '(4; 2; 0)'],
        correct: 0,
        shortAnswer: '(4;-2;0)',
        cipherPiece: 'U',
        hints: [
          'Từ công thức trung điểm I = (C + D) / 2 suy ra D = 2I − C.',
          'Tính: xD = 2(2) − 0 = 4; yD = 2(0) − 2 = −2; zD = 2(2) − 4 = 0 → D(4; −2; 0).'
        ],
        explain: 'Ta có D = 2I − C = (4; −2; 0). Cổng Dịch Chuyển Không Gian đã kích hoạt! Nhận Mảnh [U]!',
        label: 'Trạm III · Cổng Dịch Chuyển Điểm D · Mảnh [U]',
        roleAssign: 'TV1 dùng biến đổi D = 2I − C để tìm điểm đối xứng; TV4 ghi nhận mảnh U',
        monster: { icon: '🌀', type: 'wraith', name: 'Vong Hồn Không Gian', hp: 180 },
        keyBadge: 'Mảnh U: D(4;−2;0)',
        highlightAxis: 'all'
      },
      {
        prompt: 'TRẠM 4: Trong không gian Oxyz, cho tam giác MNP với M(2; −1; 3), N(4; 0; 1), P(0; 4; 2). Tọa độ trọng tâm G của tam giác MNP bằng bao nhiêu?',
        options: ['(6; 3; 6)', '(2; 1; 2)', '(3; 1; 2)', '(2; 0; 2)'],
        correct: 1,
        shortAnswer: '(2;1;2)',
        cipherPiece: 'N',
        hints: [
          'Trọng tâm tam giác trong Oxyz: G = ((xM+xN+xP)/3; (yM+yN+yP)/3; (zM+zN+zP)/3).',
          'Hoành độ: (2+4+0)/3 = 2; Tung độ: (−1+0+4)/3 = 1; Cao độ: (3+1+2)/3 = 2 → G(2; 1; 2).'
        ],
        explain: 'Ta có G = ((2+4+0)/3; (−1+0+4)/3; (3+1+2)/3) = (2; 1; 2). Nhận Mảnh Mật Thư [N]!',
        label: 'Trạm IV · Pháp Trận Trọng Tâm G₂ · Mảnh [N]',
        roleAssign: 'TV2 và TV3 cùng cộng tọa độ 3 chiều và chia 3; TV4 ghi nhận mảnh N',
        monster: { icon: '🐺', type: 'fenrir', name: 'Sói Băng Mê Cung', hp: 200 },
        keyBadge: 'Mảnh N: G(2;1;2)',
        highlightAxis: 'all'
      },
      {
        prompt: 'TRẠM 5: Cho hai điểm A(1; 3; −2) và B(5; −1; 6). Tọa độ trung điểm K của đoạn thẳng AB bằng bao nhiêu?',
        options: ['(6; 2; 4)', '(4; −4; 8)', '(3; 1; 2)', '(2; 2; 4)'],
        correct: 2,
        shortAnswer: '(3;1;2)',
        cipherPiece: 'G',
        hints: [
          'Áp dụng công thức trung điểm 3 chiều: K = ((xA+xB)/2; (yA+yB)/2; (zA+zB)/2).',
          'xK = (1+5)/2 = 3; yK = (3+(−1))/2 = 1; zK = (−2+6)/2 = 2 → K(3; 1; 2).'
        ],
        explain: 'Ta có K = ((1+5)/2; (3−1)/2; (−2+6)/2) = (3; 1; 2). Đội nhận đủ 5 mảnh mật mã và Chìa Khóa Vàng!',
        label: 'Trạm V · Bệ Đá Trung Điểm K · Mảnh [G]',
        roleAssign: 'Cả nhóm hoàn thành trung điểm K(3; 1; 2) và mở Sổ Mật Thư ghép chữ TRUNG',
        monster: { icon: '🗝️', type: 'fenrir', name: 'Vệ Binh Chìa Khóa Vàng', hp: 230 },
        keyBadge: 'Mảnh G: K(3;1;2)',
        highlightAxis: 'all'
      }
    ]
  },
  {
    id: 5,
    gameType: 'minesweeper',
    defaultMode: 'minesweeper',
    title: 'THÀNH TRÌ LỜI TRÍ TUỆ',
    subtitle: 'Dò Mìn Bãi Đá Phép Thuật & Mở Khóa Khiên Diệt Boss',
    place: 'Bãi Đá Rừng Thần Thành Trì',
    icon: '🏰',
    biomeColor: '#16a34a',
    tag: 'Dò mìn · Hai vectơ cùng phương & Cộng vectơ & Đại chiến Boss',
    time: '7–8 phút',
    item: 'Lõi Năng Lượng Khiên Vĩnh Cửu',
    digit: '4',
    digitRule: 'Lấy giá trị tham số m = 4 khi hai vectơ cùng phương.',
    cipher: 'BAOVE',
    cipherHint: 'Mệnh lệnh thiêng liêng để kích hoạt Khiên Phép Thuật tối thượng (5 ký tự: B - A - O - V - E)!',
    cipherLetters: ['B', 'A', 'O', 'V', 'E'],
    story: 'Thành Trì Lời Trí Tuệ đang bị Quân Đoàn Quái Vật Hắc Ám vây hãm dữ dội! Trước thành trì là Bãi Đá Dò Mìn Ma Thuật với các phiến đá dẫn đường ẩn chứa cạm bẫy mìn nổ. Hãy điều khiển nhân vật bước lên các phiến đá mang kết quả đúng của bài toán Vectơ cùng phương và phép cộng vectơ để vượt qua bãi mìn an toàn, thu thập đủ 5 mảnh cổ ngữ BAOVE kích hoạt Khiên Ma Pháp và bước vào trận ĐẠI CHIẾN BOSS CUỐI CÙNG!',
    groupTask: 'Phân vai nhóm: TV1 kiểm tra điều kiện cùng phương (u = k·v), TV2 tính tổng/hiệu vectơ, TV3 tính độ dài và hệ thức hình bình hành, TV4 giải mật thư cổ ngữ BAOVE, Đội trưởng điều khiển nhân vật nạp trụ và kích hoạt Pháo Laser diệt Boss.',
    teamRoles: [
      '⚔️ TV1 (Chuyên Gia Tỉ Lệ): Tìm hệ số k = x₁/x₂ = y₁/y₂ = z₁/z₂ và xử lý vectơ cùng phương',
      '🔥 TV2 (Chuyên Gia Đại Số Vectơ): Tính toán phép cộng/trừ vectơ u + v, 2u + v',
      '🛡️ TV3 (Chuyên Gia Hình Học Không Gian): Vận dụng tính chất hình bình hành ABCD (AD = BC) và 3 điểm thẳng hàng',
      '📜 TV4 (Pháp Sư Cổ Ngữ): Ghép 5 mảnh cổ ngữ B, A, O, V, E kích hoạt Khiên Bảo Vệ',
      '👑 Đội trưởng (Tổng Chỉ Huy): Lái nhân vật nạp năng lượng 5 trụ và điều khiển Đại Pháo Laser tiêu diệt Boss'
    ],
    visual3D: {
      title: 'Mô phỏng 3D: Hai vectơ cùng phương u = 2v và tổng hợp lực vectơ',
      type: 'collinear',
      points: [
        { label: 'O(0;0;0)', coords: [0, 0, 0], x: 0, y: 0, z: 0, color: '#ffffff' }
      ],
      vectors: [
        { from: [0, 0, 0], to: [4, 2, 4], label: 'u = (4; 2; 4) = 2v', color: '#f43f5e' },
        { from: [0, 0, 0], to: [2, 1, 2], label: 'v = (2; 1; 2)', color: '#facc15' }
      ],
      formula: 'u cùng phương v ⇔ u = k · v ⇔ x₁/x₂ = y₁/y₂ = z₁/z₂ = k'
    },
    huntMap: {
      theme: 'citadel',
      worldTitle: 'THÀNH TRÌ LỜI TRÍ TUỆ OXYZ',
      spawn: { x: 10, y: 50 },
      chest: { x: 90, y: 50, name: 'Bệ Kích Hoạt Lá Chắn Thành Trì' },
      stations: [
        { x: 25, y: 24, name: 'Trụ Phép I · Cổ Ngữ [B]', monsterIcon: '⚔️', monsterType: 'dark_knight', monsterName: 'Kỵ Sĩ Hắc Ám Cổng Tây', badge: 'Cổ ngữ B', cipherPiece: 'B' },
        { x: 42, y: 76, name: 'Trụ Phép II · Cổ Ngữ [A]', monsterIcon: '🔥', monsterType: 'warlock', monsterName: 'Pháp Sư Lửa Hắc Ám', badge: 'Cổ ngữ A', cipherPiece: 'A' },
        { x: 58, y: 26, name: 'Trụ Phép III · Cổ Ngữ [O]', monsterIcon: '⚡', monsterType: 'dark_knight', monsterName: 'Lôi Tinh Không Gian', badge: 'Cổ ngữ O', cipherPiece: 'O' },
        { x: 74, y: 74, name: 'Trụ Phép IV · Cổ Ngữ [V]', monsterIcon: '🛡️', monsterType: 'warlock', monsterName: 'Vệ Binh Sa Đọa', badge: 'Cổ ngữ V', cipherPiece: 'V' },
        { x: 86, y: 34, name: 'Trụ Phép V · Cổ Ngữ [E]', monsterIcon: '🔮', monsterType: 'dragon_boss', monsterName: 'Đại Tướng Quỷ Oxyz', badge: 'Cổ ngữ E', cipherPiece: 'E' }
      ]
    },
    defenseConfig: {
      castleName: 'Thành Trì Lời Trí Tuệ Oxyz',
      theme: 'citadel',
      waves: [
        { name: 'Đợt 1: Trụ Phép I (u = kv)', enemies: ['skeleton', 'orc', 'bat', 'orc'], boss: '⚔️' },
        { name: 'Đợt 2: Trụ Phép II (Tổng u + v)', enemies: ['orc', 'skeleton', 'orc', 'bat'], boss: '🔥' },
        { name: 'Đợt 3: Trụ Phép III (Cùng phương ngược hướng)', enemies: ['skeleton', 'orc', 'skeleton', 'orc'], boss: '⚡' },
        { name: 'Đợt 4: Trụ Phép IV (Hình bình hành ABCD)', enemies: ['orc', 'bat', 'orc', 'orc'], boss: '🛡️' },
        { name: 'Đợt 5: Trụ Phép V & ĐẠI CHIẾN BOSS CUỐI', enemies: ['orc', 'orc', 'orc', 'dragon'], boss: '🐲' }
      ]
    },
    challenges: [
      {
        prompt: 'TRỤ PHÉP I: Cho hai vectơ u = (2; −1; 3) và v = (4; m; 6) (với u ≠ 0). Tìm giá trị của m để hai vectơ u và v cùng phương.',
        options: ['−2', '2', '−1', '4'],
        correct: 0,
        shortAnswer: '-2',
        cipherPiece: 'B',
        hints: [
          'Hai vectơ cùng phương khi các tọa độ tương ứng tỉ lệ: 4/2 = m/(−1) = 6/3.',
          'Ta có 4/2 = 2 → m / (−1) = 2 → m = 2 × (−1) = −2.'
        ],
        explain: 'Vì u và v cùng phương nên tỉ số k = 4/2 = 6/3 = 2. Do đó m = 2 × (−1) = −2. Trụ phép I rực sáng! Nhận Cổ Ngữ [B]!',
        label: 'Trụ I · Điều kiện cùng phương · Cổ ngữ [B]',
        roleAssign: 'TV1 lập tỉ lệ 4/2 = m/(−1); TV4 ghi nhận cổ ngữ B',
        monster: { icon: '⚔️', type: 'dark_knight', name: 'Kỵ Sĩ Hắc Ám Cổng Tây', hp: 150 },
        keyBadge: 'Cổ ngữ B (m=−2)',
        highlightAxis: 'all'
      },
      {
        prompt: 'TRỤ PHÉP II: Trong không gian Oxyz, cho a = (1; 2; −1) và b = (3; −1; 4). Tọa độ của vectơ tổng w = a + b bằng bao nhiêu?',
        options: ['(4; 1; 3)', '(2; −3; 5)', '(4; 3; 3)', '(3; −2; −4)'],
        correct: 0,
        shortAnswer: '(4;1;3)',
        cipherPiece: 'A',
        hints: [
          'Cộng các thành phần tọa độ tương ứng: w = (xa + xb; ya + yb; za + zb).',
          'Tính: 1 + 3 = 4; 2 + (−1) = 1; −1 + 4 = 3 → w = (4; 1; 3).'
        ],
        explain: 'Ta có w = a + b = (1+3; 2−1; −1+4) = (4; 1; 3). Trụ phép II nạp đầy mana! Nhận Cổ Ngữ [A]!',
        label: 'Trụ II · Phép cộng vectơ · Cổ ngữ [A]',
        roleAssign: 'TV2 tính tổng từng cặp tọa độ: (1+3; 2−1; −1+4); TV4 ghi nhận cổ ngữ A',
        monster: { icon: '🔥', type: 'warlock', name: 'Pháp Sư Lửa Hắc Ám', hp: 175 },
        keyBadge: 'Cổ ngữ A (w=(4;1;3))',
        highlightAxis: 'all'
      },
      {
        prompt: 'TRỤ PHÉP III: Cho hai vectơ u = (1; −2; 2) và v = (−2; 4; −4). Nhận xét nào sau đây là ĐÚNG về mối quan hệ giữa hai vectơ?',
        options: [
          'Cùng phương và ngược hướng',
          'Cùng phương và cùng hướng',
          'Vuông góc với nhau',
          'Bằng nhau'
        ],
        correct: 0,
        shortAnswer: 'A',
        cipherPiece: 'O',
        hints: [
          'Xét tỉ số từng thành phần: (−2)/1 = 4/(−2) = (−4)/2 = −2.',
          'Vì v = −2u với hệ số k = −2 < 0 nên hai vectơ cùng phương và ngược hướng!'
        ],
        explain: 'Ta có v = −2u. Vì k = −2 < 0 nên u và v cùng phương và ngược hướng! Trụ phép III rực sáng! Nhận Cổ Ngữ [O]!',
        label: 'Trụ III · Hướng của hai vectơ · Cổ ngữ [O]',
        roleAssign: 'TV1 kiểm tra tỉ số k = −2 < 0 (ngược hướng); TV4 ghi nhận cổ ngữ O',
        monster: { icon: '⚡', type: 'dark_knight', name: 'Lôi Tinh Không Gian', hp: 200 },
        keyBadge: 'Cổ ngữ O (Ngược hướng)',
        highlightAxis: 'all'
      },
      {
        prompt: 'TRỤ PHÉP IV: Cho hình bình hành ABCD với A(1; 1; 1), B(2; 3; 4), C(6; 5; 2). Tọa độ đỉnh D là gì?',
        options: ['(5; 3; −1)', '(7; 7; 5)', '(3; 3; 1)', '(5; 1; −1)'],
        correct: 0,
        shortAnswer: '(5;3;-1)',
        cipherPiece: 'V',
        hints: [
          'Vì ABCD là hình bình hành nên vectơ AD = vectơ BC ⇔ D − A = C − B ⇔ D = A + C − B.',
          'Tính: xD = 1 + 6 − 2 = 5; yD = 1 + 5 − 3 = 3; zD = 1 + 2 − 4 = −1 → D(5; 3; −1).'
        ],
        explain: 'Ta có D = A + C − B = (1+6−2; 1+5−3; 1+2−4) = (5; 3; −1). Trụ phép IV phóng tia sáng kết nối! Nhận Cổ Ngữ [V]!',
        label: 'Trụ IV · Đỉnh hình bình hành · Cổ ngữ [V]',
        roleAssign: 'TV3 tính D = A + C − B = (5; 3; −1); TV4 ghi nhận cổ ngữ V',
        monster: { icon: '🛡️', type: 'warlock', name: 'Vệ Binh Sa Đọa', hp: 220 },
        keyBadge: 'Cổ ngữ V (D(5;3;−1))',
        highlightAxis: 'all'
      },
      {
        prompt: 'TRỤ PHÉP V: Cho ba điểm A(1; 2; 3), B(2; 4; 5) và C(m; 6; 7). Tìm giá trị của m để ba điểm A, B, C thẳng hàng.',
        options: ['3', '2', '4', '5'],
        correct: 0,
        shortAnswer: '3',
        cipherPiece: 'E',
        hints: [
          'Ba điểm A, B, C thẳng hàng ⇔ vectơ AC cùng phương với vectơ AB.',
          'Tính AB = (1; 2; 2) và AC = (m−1; 4; 4). Tỉ số: (m−1)/1 = 4/2 = 2 → m − 1 = 2 → m = 3.'
        ],
        explain: 'Ta có AB = (1; 2; 2) và AC = (m−1; 4; 4). Để cùng phương thì (m−1)/1 = 4/2 = 2 → m = 3. Nhận Cổ Ngữ [E]! Đủ 5 cổ ngữ B-A-O-V-E!',
        label: 'Trụ V · Ba điểm thẳng hàng · Cổ ngữ [E]',
        roleAssign: 'Cả nhóm tính AC = 2AB → m = 3; TV4 kích hoạt Khiên BAOVE để nghênh chiến Boss',
        monster: { icon: '🔮', type: 'dragon_boss', name: 'Đại Tướng Quỷ Oxyz', hp: 250 },
        keyBadge: 'Cổ ngữ E (m=3)',
        highlightAxis: 'all'
      }
    ],
    bossChallenge: {
      prompt: '🔥 ĐẠI CHIẾN BOSS CUỐI: "BÓNG ĐEN LÃNG QUÊN"! Cho hai vectơ u = (2; 1; −2) và v = (1; 0; 2). Tính độ dài của vectơ tổng hợp w = 2u + v để kích hoạt Đại Pháo Laser Thành Trì kết liễu Boss!',
      options: ['√33', '√29', '6', '5'],
      correct: 0,
      shortAnswer: '√33',
      hints: [
        'Tính tọa độ của 2u = (4; 2; −4) rồi cộng với v = (1; 0; 2) để tìm w.',
        'w = (4+1; 2+0; −4+2) = (5; 2; −2). Độ dài |w| = √(5² + 2² + (−2)²) = √(25 + 4 + 4) = √33.'
      ],
      explain: 'Ta có 2u = (4; 2; −4) → w = 2u + v = (5; 2; −2). Do đó |w| = √(5² + 2² + (−2)²) = √33. Đại Pháo Laser Oxyz đã kích hoạt và tiêu diệt hoàn toàn Boss! THÀNH TRÌ ĐÃ ĐƯỢC BẢO VỆ!',
      label: 'ĐẠI CHIẾN BOSS CUỐI · KÍCH HOẠT ĐẠI PHÁO LASER OXYZ',
      roleAssign: 'Toàn đội hợp lực: TV1 & TV2 tính 2u + v = (5; 2; −2), TV3 tính độ dài √(25+4+4)=√33, Đội trưởng nhấn bắn Laser!',
      monster: { icon: '🐲', type: 'dragon_boss', name: 'Boss Bóng Đen Lãng Quên', hp: 500 }
    }
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
