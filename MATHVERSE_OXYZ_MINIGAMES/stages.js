'use strict';
// KỊCH BẢN GAME GIÁO DỤC MATHVERSE OXYZ: HÀNH TRÌNH GIẢI CỨU LỤC ĐỊA OXYZ
// Thời lượng: 6 phút (360 giây) | Đối tượng: Học sinh lớp 12 | Hợp tác 3–5 HS/đội
// Cấu trúc: 5 Chặng (3 Chặng Nhận biết + 2 Chặng Thông hiểu)
// Mỗi chặng gồm 3 phần: Phần 1 (Khám phá tương tác) + Phần 2 (Giải mã 1) + Phần 3 (Giải mã 2)
// Ngân hàng: 15 câu hỏi chuẩn (mỗi chặng chọn ngẫu nhiên 2/3 câu không trùng nhau)

const TEAM_ROLES_STANDARD = [
  '🧭 Người dẫn đường: Quan sát mục tiêu & sơ đồ vectơ',
  '🧩 Người giải mã: Đề xuất đáp án & giải thích quy tắc',
  '🎮 Người điều khiển: Thực hiện thao tác (luân phiên mỗi chặng)',
  '✅ Người xác nhận: Kiểm tra lý do và chốt kết quả'
];

const STAGES = [
  /* ═══════════════════════════════════════════════════════════════════════
     CHẶNG 1. MẬT THƯ RỪNG VECTƠ (NHẬN BIẾT – 60 GIÂY)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: 1,
    isCipherBridgeQuest: true,
    gameType: 'vector_adventure',
    defaultMode: 'hunt',
    title: 'CHẶNG 1 – MẬT THƯ RỪNG VECTƠ',
    subtitle: 'Thử thách khám phá – săn lùng mảnh mật thư trong rừng phép!',
    shortName: 'Hiệu vectơ',
    place: 'Rừng Vectơ',
    icon: '🌿',
    biomeColor: '#10b981',
    levelBadge: 'NHẬN BIẾT',
    timeSeconds: 60,
    time: '60 giây',
    tag: 'Nhận biết · Hiệu hai vectơ (60 giây)',
    item: 'Ấn Hướng Đi',
    sealIcon: '🧭',
    digit: '3',
    digitRule: 'Tìm 4 mảnh mật thư để mở khóa Cầu Ánh Sáng & nhận Ấn Hướng Đi (Chặng 1 = 3).',
    story: 'Cây cầu ánh sáng xuyên qua Rừng Vectơ bị phong ấn. Rồng Xanh cần khám phá khu rừng phép, tìm đủ 4 mảnh mật thư về các vectơ AB, AC, CB để mở khóa Cầu Ánh Sáng!',
    dragonIntro: 'Tìm 4 mảnh mật thư trong Rừng Vectơ để mở khóa Cầu Ánh Sáng và nhận phần thưởng!',
    dragonWin: 'Chính xác! Vectơ AB − vectơ AC = vectơ CB! Cầu Ánh Sáng đã mở khóa, đội nhận Ấn Hướng Đi!',
    shadowIntro: 'Bóng Lỗi đã giấu 4 mảnh mật thư khắp Rừng Vectơ và phong ấn Cầu Ánh Sáng!',
    groupTask: 'Tìm 4 mảnh mật thư trong rừng phép (0/4 → 4/4) → Mở Rương Phần Thưởng & giải mã vectơ hiệu CB để mở khóa Cầu Ánh Sáng.',
    teamRoles: [
      '🎮 Thành viên 1 (Điều khiển): Dùng WASD / Phím mũi tên hoặc chạm giữ trên bản đồ để đưa Rồng Xanh tới 4 bệ đá mật thư',
      '🧭 Thành viên 2 (Hoa tiêu): Quan sát bản đồ Rừng Vectơ và dẫn đường tới 4 mảnh mật thư',
      '🧩 Thành viên 3 (Giải mã): Giải 4 câu hỏi nhận biết về các vectơ AB, AC, CB để thu thập đủ 4/4 mảnh',
      '✅ Thành viên 4 (Xác nhận): Mở Rương Phần Thưởng và xác nhận mật mã CB để mở khóa Cầu Ánh Sáng'
    ],
    visual3D: {
      title: 'Manh mối về các vectơ AB, AC, CB trong Rừng Vectơ',
      type: 'vectorDiff',
      points: [
        { label: 'A', coords: [0, 0, 0], x: 0, y: 0, z: 0, color: '#38bdf8' },
        { label: 'B', coords: [4, 2, 2], x: 4, y: 2, z: 2, color: '#facc15' },
        { label: 'C', coords: [2, 4, 0], x: 2, y: 4, z: 0, color: '#4ade80' }
      ],
      vectors: [
        { from: [0, 0, 0], to: [4, 2, 2], label: 'AB', color: '#38bdf8' },
        { from: [0, 0, 0], to: [2, 4, 0], label: 'AC', color: '#facc15' },
        { from: [2, 4, 0], to: [4, 2, 2], label: 'CB', color: '#4ade80' }
      ],
      formula: 'Manh mối về các vectơ AB, AC, CB: vectơ AB − vectơ AC = vectơ CB'
    },
    interactiveTask: {
      type: 'cipher_bridge_quest',
      title: 'Tìm 4 mảnh mật thư để mở khóa Cầu Ánh Sáng',
      instruction: 'Dùng W A S D / Phím mũi tên hoặc chạm vào bản đồ để điều khiển Rồng Xanh thu thập 4 mảnh mật thư (0/4 → 4/4) và mở khóa Cầu Ánh Sáng!',
      targets: ['1', '2', '3', '4'],
      rewardText: 'Đã thu thập đủ 4/4 mảnh mật thư! Hãy mở khóa Cầu Ánh Sáng!'
    },
    interactiveChallenge: {
      id: '1.0',
      stepType: 'find_pillars',
      isInteractive: true,
      level: 'NHẬN BIẾT',
      label: 'Nhiệm vụ Chặng 1 · Tìm 4 mảnh mật thư (0/4 → 4/4)',
      prompt: 'Tìm 4 mảnh mật thư trong Rừng Vectơ để mở khóa Cầu Ánh Sáng.',
      options: [
        'Đã thu thập đủ 4/4 mảnh mật thư trong Rừng Vectơ',
        'Đang thu thập mảnh mật thư',
        'Chưa thu thập mảnh mật thư'
      ],
      correct: 0,
      shortAnswer: '1234',
      hints: [
        'Manh mối về các vectơ AB, AC, CB: Hãy quan sát điểm đầu và điểm cuối của mỗi vectơ.',
        'Khi trừ hai vectơ cùng điểm đầu A: vectơ AB − vectơ AC = vectơ CB (nối từ C đến B).'
      ],
      explain: 'Đã thu thập đủ 4/4 mảnh mật thư về các vectơ AB, AC, CB!',
      keyBadge: '4/4 mảnh mật thư'
    },
    fixedChallenges: [
      {
        id: '1.0',
        stepType: 'find_pillars',
        isInteractive: true,
        level: 'NHẬN BIẾT',
        label: 'Tìm 4 mảnh mật thư (0/4 → 4/4)',
        prompt: 'Tìm 4 mảnh mật thư để mở khóa Cầu Ánh Sáng.',
        options: ['Đã thu thập đủ 4/4 mảnh mật thư'],
        correct: 0,
        shortAnswer: '1234',
        hints: [
          'Manh mối về các vectơ AB, AC, CB: Hãy quan sát điểm đầu và điểm cuối của mỗi vectơ.',
          'Khi trừ hai vectơ cùng điểm đầu A: vectơ AB − vectơ AC = vectơ CB.'
        ],
        explain: 'Đã thu thập đủ 4/4 mảnh mật thư trong Rừng Vectơ!',
        keyBadge: '4/4 mảnh mật thư'
      },
      {
        id: '1.1',
        stepType: 'assemble_cipher',
        isInteractive: false,
        level: 'NHẬN BIẾT',
        label: 'Ghép 4 mảnh mật thư',
        prompt: 'Ghép 4 mảnh mật thư đã thu thập được thành biểu thức hiệu hai vectơ:',
        options: ['vectơ AB − vectơ AC = ?', 'vectơ AC − vectơ AB = ?', '− vectơ AB vectơ AC = ?'],
        correct: 0,
        shortAnswer: 'AB-AC',
        hints: [
          'Hãy quan sát điểm đầu và điểm cuối của mỗi vectơ.',
          'Khi trừ hai vectơ cùng điểm đầu, hãy tìm hướng nối hai điểm cuối.'
        ],
        explain: 'Cuộn giấy phép thuật đã mở: vectơ AB − vectơ AC = ? Bây giờ hãy điều khiển Rồng Xanh từ cột C đến cột đích!',
        keyBadge: 'Giải mã cuộn giấy'
      },
      {
        id: '1.2',
        stepType: 'draw_vector_cb',
        isInteractive: false,
        level: 'NHẬN BIẾT',
        label: 'Nhiệm vụ 3 · Di chuyển để giải mật mã (Từ C đến B)',
        prompt: 'Từ cột C, điều khiển Rồng Xanh đến đúng cột đích của vectơ AB − vectơ AC rồi bấm E để kích hoạt!',
        options: ['Vectơ CB (Từ điểm C đến điểm B)', 'Vectơ BC (Từ điểm B đến điểm C)', 'Vectơ CA (Từ điểm C đến điểm A)'],
        correct: 0,
        shortAnswer: 'CB',
        hints: [
          'Hãy quan sát điểm đầu và điểm cuối của mỗi vectơ.',
          'Khi trừ hai vectơ cùng điểm đầu, hãy tìm hướng nối hai điểm cuối.'
        ],
        explain: 'vectơ AB − vectơ AC = vectơ CB (điểm đầu C, điểm cuối B). Cây cầu ánh sáng đã được khôi phục!',
        keyBadge: 'Mở Cầu Ánh Sáng'
      }
    ],
    questionBank: [
      {
        id: '1.1',
        stepType: 'assemble_cipher',
        level: 'NHẬN BIẾT',
        label: 'Nhiệm vụ 2 · Giải mã cuộn giấy (AB − AC = ?)',
        prompt: 'Hai mảnh mật thư từ cột B và cột C ghép thành biểu thức: vectơ AB − vectơ AC = ?',
        options: ['vectơ AB − vectơ AC = ?', 'vectơ AC − vectơ AB = ?', '− vectơ AB vectơ AC = ?'],
        correct: 0,
        shortAnswer: 'AB-AC',
        hints: [
          'Hãy quan sát điểm đầu và điểm cuối của mỗi vectơ.',
          'Khi trừ hai vectơ cùng điểm đầu, hãy tìm hướng nối hai điểm cuối.'
        ],
        explain: 'Hai manh mối đã được ghép: vectơ AB − vectơ AC = ?',
        keyBadge: 'Giải mã cuộn giấy'
      },
      {
        id: '1.2',
        stepType: 'draw_vector_cb',
        level: 'NHẬN BIẾT',
        label: 'Nhiệm vụ 3 · Di chuyển Rồng Xanh từ C đến B',
        prompt: 'Điều khiển Rồng Xanh từ cột C đến đúng cột đích của hiệu hai vectơ AB − AC và bấm E.',
        options: ['Vectơ CB (Từ C đến B)', 'Vectơ BC (Từ B đến C)', 'Vectơ CA (Từ C đến A)'],
        correct: 0,
        shortAnswer: 'CB',
        hints: [
          'Hãy quan sát điểm đầu và điểm cuối của mỗi vectơ.',
          'Khi trừ hai vectơ cùng điểm đầu, hãy tìm hướng nối hai điểm cuối.'
        ],
        explain: 'vectơ AB − vectơ AC = vectơ CB.',
        keyBadge: 'Mở Cầu Ánh Sáng'
      }
    ],
    // Default challenges array
    challenges: []
  },

  /* ═══════════════════════════════════════════════════════════════════════
     CHẶNG 2. PHÁO ĐÀI GÓC VUÔNG (NHẬN BIẾT – 60 GIÂY)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: 2,
    gameType: 'vector_adventure',
    defaultMode: 'matrix',
    title: 'CHẶNG 2. MẬT TRẬN VECTƠ – PHÁO ĐÀI GÓC VUÔNG',
    subtitle: 'Quy tắc cộng hai vectơ nối tiếp',
    shortName: 'Mật Trận Vectơ',
    place: 'Pháo Đài Góc Vuông',
    icon: '🏰',
    biomeColor: '#f59e0b',
    levelBadge: 'NHẬN BIẾT',
    timeSeconds: 60,
    time: '60 giây',
    tag: 'Nhận biết · Quy tắc cộng hai vectơ (60 giây)',
    item: 'Ấn Kết Nối',
    sealIcon: '🔗',
    digit: '0',
    digitRule: 'Khôi phục Ấn Kết Nối (Chặng 2 = 0).',
    story: 'Pháo Đài Góc Vuông bị đặt bẫy phép thuật tại bốn bệ đá cổ. Đội phải điều khiển Rồng Xanh dò mìn bằng kiến thức cộng hai vectơ để tìm vùng an toàn và mở cổng thành.',
    dragonIntro: 'Pháo đài bị đặt bẫy rồi! Hãy tìm vùng an toàn nhé!',
    dragonWin: 'Tuyệt vời! Pháo đài đã được giải cứu!',
    shadowIntro: 'Bốn bệ đá trong sân thành đã bị cài bẫy phép thuật tím!',
    groupTask: 'Điều khiển Rồng Xanh bằng phím WASD/Mũi tên đến bệ đá mang vectơ tổng đúng và nhấn E để hóa giải 6 mật trận.',
    teamRoles: TEAM_ROLES_STANDARD,
    visual3D: {
      title: 'Quy tắc ba điểm (Cộng hai vectơ nối tiếp)',
      type: 'vectorSum',
      points: [
        { label: 'A', coords: [-2, -2, 0], x: -2, y: -2, z: 0, color: '#38bdf8' },
        { label: 'B', coords: [1, 3, 2], x: 1, y: 3, z: 2, color: '#facc15' },
        { label: 'C', coords: [4, 0, 1], x: 4, y: 0, z: 1, color: '#4ade80' }
      ],
      vectors: [
        { from: [-2, -2, 0], to: [1, 3, 2], label: 'AB', color: '#38bdf8' },
        { from: [1, 3, 2], to: [4, 0, 1], label: 'BC', color: '#facc15' },
        { from: [-2, -2, 0], to: [4, 0, 1], label: 'AC = AB + BC', color: '#4ade80' }
      ],
      formula: 'AB + BC = AC   (Quy tắc ba điểm)'
    },
    interactiveTask: {
      type: 'paths_ab_bc',
      title: 'Mật Trận Vectơ – Dò mìn 4 bệ đá trong sân thành',
      instruction: 'Điều khiển Rồng Xanh bằng phím WASD/Mũi tên đến bệ đá có vectơ tổng đúng và nhấn E để xác nhận!',
      targets: ['AB', 'BC'],
      rewardText: 'Sáu mật trận đã được hóa giải! Mở khóa Ấn Kết Nối!'
    },
    interactiveChallenge: {
      id: '2.0',
      isInteractive: true,
      level: 'NHẬN BIẾT',
      label: 'Mật Trận Vectơ · Hóa giải 6 bẫy phép thuật trong sân thành',
      prompt: 'NHIỆM VỤ DÒ MÌN VECTƠ: Điều khiển Rồng Xanh đến vùng an toàn chứa vectơ tổng đúng và nhấn E để hóa giải đủ 6 mật trận!',
      options: [
        'Đã hóa giải 6/6 mật trận vectơ và mở cổng Pháo Đài Góc Vuông',
        'Chưa hóa giải hết mật trận',
        'Bỏ qua mật trận'
      ],
      correct: 0,
      shortAnswer: 'AC',
      hints: [
        'Quan sát điểm cuối của vectơ thứ nhất trùng với điểm đầu của vectơ thứ hai.',
        'Áp dụng quy tắc ba điểm: vectơ AB + vectơ BC = vectơ AC.'
      ],
      explain: 'Sáu mật trận vectơ đã được hóa giải hoàn toàn! Cổng Pháo Đài Góc Vuông đã mở!',
      keyBadge: 'Mật Trận 6/6'
    },
    questionBank: [
      {
        id: '2.1',
        level: 'NHẬN BIẾT',
        label: 'Câu 1 · Vectơ AB + Vectơ BC = ?',
        prompt: 'Vectơ AB + Vectơ BC = ?',
        options: ['Vectơ AC', 'Vectơ CA', 'Vectơ CB', 'Vectơ BA'],
        correct: 0,
        shortAnswer: 'AC',
        hints: ['Điểm cuối B nối tiếp với điểm đầu B: vectơ AB + vectơ BC = vectơ AC.'],
        explain: 'Vectơ AB + Vectơ BC = Vectơ AC.',
        keyBadge: 'Mật trận 1/6'
      },
      {
        id: '2.2',
        level: 'NHẬN BIẾT',
        label: 'Câu 2 · Vectơ MN + Vectơ NP = ?',
        prompt: 'Vectơ MN + Vectơ NP = ?',
        options: ['Vectơ MP', 'Vectơ PM', 'Vectơ MN', 'Vectơ NP'],
        correct: 0,
        shortAnswer: 'MP',
        hints: ['Điểm đầu là M, nối qua trung gian N tới điểm cuối P: vectơ MP.'],
        explain: 'Vectơ MN + Vectơ NP = Vectơ MP.',
        keyBadge: 'Mật trận 2/6'
      },
      {
        id: '2.3',
        level: 'NHẬN BIẾT',
        label: 'Câu 3 · Vectơ PQ + Vectơ QR = ?',
        prompt: 'Vectơ PQ + Vectơ QR = ?',
        options: ['Vectơ PR', 'Vectơ RP', 'Vectơ PQ', 'Vectơ QR'],
        correct: 0,
        shortAnswer: 'PR',
        hints: ['Điểm đầu P nối qua Q tới điểm cuối R: vectơ PR.'],
        explain: 'Vectơ PQ + Vectơ QR = Vectơ PR.',
        keyBadge: 'Mật trận 3/6'
      },
      {
        id: '2.4',
        level: 'NHẬN BIẾT',
        label: 'Câu 4 · Vectơ BA + Vectơ AC = ?',
        prompt: 'Vectơ BA + Vectơ AC = ?',
        options: ['Vectơ BC', 'Vectơ CB', 'Vectơ AC', 'Vectơ BA'],
        correct: 0,
        shortAnswer: 'BC',
        hints: ['Điểm đầu là B, điểm nối trung gian là A, điểm cuối là C: vectơ BC.'],
        explain: 'Vectơ BA + Vectơ AC = Vectơ BC.',
        keyBadge: 'Mật trận 4/6'
      },
      {
        id: '2.5',
        level: 'NHẬN BIẾT',
        label: 'Câu 5 · Vectơ AB + Vectơ BC + Vectơ CD = ?',
        prompt: 'Vectơ AB + Vectơ BC + Vectơ CD = ?',
        options: ['Vectơ AD', 'Vectơ DA', 'Vectơ AC', 'Vectơ BD'],
        correct: 0,
        shortAnswer: 'AD',
        hints: ['Cộng nối tiếp từ điểm đầu A qua B, C tới điểm cuối D: vectơ AD.'],
        explain: 'Vectơ AB + Vectơ BC + Vectơ CD = Vectơ AD.',
        keyBadge: 'Mật trận 5/6'
      },
      {
        id: '2.6',
        level: 'NHẬN BIẾT',
        label: 'Câu 6 · Vectơ OA + Vectơ AB = ?',
        prompt: 'Vectơ OA + Vectơ AB = ?',
        options: ['Vectơ OB', 'Vectơ BO', 'Vectơ OA', 'Vectơ AB'],
        correct: 0,
        shortAnswer: 'OB',
        hints: ['Điểm đầu là O, nối qua trung gian A tới điểm cuối B: vectơ OB.'],
        explain: 'Vectơ OA + Vectơ AB = Vectơ OB.',
        keyBadge: 'Mật trận 6/6'
      }
    ],
    challenges: []
  },

  /* ═══════════════════════════════════════════════════════════════════════
     CHẶNG 3. THÁP PHA LÊ (NHẬN BIẾT – 65 GIÂY)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: 3,
    gameType: 'vector_adventure',
    defaultMode: 'zombie',
    title: 'CHẶNG 3. THÁP PHA LÊ',
    subtitle: 'Quy tắc hình bình hành',
    shortName: 'Hình bình hành',
    place: 'Tháp Pha Lê Khoảng Cách',
    icon: '💠',
    biomeColor: '#8b5cf6',
    levelBadge: 'NHẬN BIẾT',
    timeSeconds: 65,
    time: '65 giây',
    tag: 'Nhận biết · Quy tắc hình bình hành (65 giây)',
    item: 'Ấn Cân Bằng',
    sealIcon: '💠',
    digit: '5',
    digitRule: 'Khôi phục Ấn Cân Bằng (Chặng 3 = 5).',
    story: 'Tháp Pha Lê chỉ hoạt động khi các mạch năng lượng tuân theo quy tắc hình bình hành. Một sơ đồ ABCD phát sáng xuất hiện trước cửa tháp.',
    dragonIntro: 'Một đường chéo đang bị phong ấn! Hãy nhận ra quy tắc để đánh thức tháp!',
    dragonWin: 'Xuất sắc! Tháp Pha Lê đã được đánh thức!',
    shadowIntro: 'Đường chéo năng lượng của Tháp Pha Lê đã bị phong ấn!',
    groupTask: 'Kích hoạt hai vectơ cạnh cùng xuất phát từ đỉnh A là AB và AD trên hình bình hành ABCD để giải mã đường chéo.',
    teamRoles: TEAM_ROLES_STANDARD,
    visual3D: {
      title: 'Quy tắc hình bình hành ABCD',
      type: 'parallelogram',
      points: [
        { label: 'A', coords: [0, 0, 0], x: 0, y: 0, z: 0, color: '#38bdf8' },
        { label: 'B', coords: [3, 1, 0], x: 3, y: 1, z: 0, color: '#facc15' },
        { label: 'D', coords: [1, 3, 2], x: 1, y: 3, z: 2, color: '#c084fc' },
        { label: 'C', coords: [4, 4, 2], x: 4, y: 4, z: 2, color: '#4ade80' }
      ],
      vectors: [
        { from: [0, 0, 0], to: [3, 1, 0], label: 'AB', color: '#38bdf8' },
        { from: [0, 0, 0], to: [1, 3, 2], label: 'AD', color: '#c084fc' },
        { from: [0, 0, 0], to: [4, 4, 2], label: 'AC = AB + AD', color: '#4ade80' }
      ],
      formula: 'AB + AD = AC   (ABCD là hình bình hành)'
    },
    interactiveTask: {
      type: 'parallelogram_ab_ad',
      title: 'Phần 1 – Khám phá: Kích hoạt hai vectơ cạnh AB và AD',
      instruction: 'Nhấp kích hoạt hai vectơ cạnh xuất phát từ cùng đỉnh A là AB và AD trên hình bình hành ABCD!',
      targets: ['AB', 'AD'],
      rewardText: 'Hai mạch năng lượng cạnh AB và AD đã nạp đầy! Nhận Mảnh chìa khóa 1/3!'
    },
    interactiveChallenge: {
      id: '3.0',
      isInteractive: true,
      level: 'NHẬN BIẾT',
      label: 'Phần 1 · Kích hoạt hai vectơ cạnh AB và AD',
      prompt: 'NHIỆM VỤ TƯƠNG TÁC: Trên hình bình hành ABCD trước Tháp Pha Lê, hãy kích hoạt hai vectơ xuất phát từ A là AB và AD để nhận mảnh chìa khóa đầu tiên (1/3)!',
      options: [
        'Đã kích hoạt hai vectơ cạnh AB và AD cùng xuất phát từ đỉnh A',
        'Chỉ kích hoạt một cạnh',
        'Bỏ qua sơ đồ'
      ],
      correct: 0,
      shortAnswer: 'A',
      hints: [
        'Nhấp vào cạnh vectơ AB và cạnh vectơ AD trên sơ đồ hình bình hành bên trái.',
        'Trong hình bình hành ABCD, tổng hai vectơ cạnh xuất phát từ A tạo thành vectơ đường chéo xuất phát từ A.'
      ],
      explain: 'Hai mạch cạnh AB và AD đã phát sáng! Đội nhận Mảnh chìa khóa 1/3!',
      keyBadge: 'Khóa 1/3'
    },
    questionBank: [
      {
        id: '3.1',
        level: 'NHẬN BIẾT',
        label: 'Câu 3.1 · Quy tắc hình bình hành tại đỉnh A',
        prompt: 'Cho hình bình hành ABCD. Vectơ AB + vectơ AD bằng vectơ nào?',
        options: ['Vectơ BD.', 'Vectơ CA.', 'Vectơ AC.'],
        correct: 2,
        shortAnswer: 'AC',
        hints: [
          'Hai vectơ AB và AD là hai cạnh cùng xuất phát từ đỉnh A của hình bình hành ABCD.',
          'Tổng của chúng bằng vectơ đường chéo xuất phát từ A là AC.'
        ],
        explain: 'Theo quy tắc hình bình hành, AB + AD = AC.',
        keyBadge: 'Khóa 2/3'
      },
      {
        id: '3.2',
        level: 'NHẬN BIẾT',
        label: 'Câu 3.2 · Quy tắc hình bình hành tại đỉnh B',
        prompt: 'Cho hình bình hành ABCD. Vectơ BA + vectơ BC bằng vectơ nào?',
        options: ['Vectơ BD.', 'Vectơ DB.', 'Vectơ AC.'],
        correct: 0,
        shortAnswer: 'BD',
        hints: [
          'Hai vectơ BA và BC là hai cạnh cùng xuất phát từ đỉnh B.',
          'Đường chéo xuất phát từ đỉnh B của hình bình hành ABCD là vectơ BD.'
        ],
        explain: 'Hai vectơ BA và BC cùng điểm đầu B nên có tổng bằng BD.',
        keyBadge: 'Khóa 2/3'
      },
      {
        id: '3.3',
        level: 'NHẬN BIẾT',
        label: 'Câu 3.3 · Nhận diện cặp vectơ cạnh',
        prompt: 'Cho hình bình hành ABCD. Cặp vectơ nào sau đây được cộng theo quy tắc hình bình hành để được vectơ AC?',
        options: [
          'Vectơ AB và vectơ BC.',
          'Vectơ AB và vectơ AD.',
          'Vectơ BA và vectơ BC.'
        ],
        correct: 1,
        shortAnswer: 'B',
        hints: [
          'Quy tắc hình bình hành cộng hai vectơ cạnh cùng xuất phát từ một đỉnh.',
          'Để được đường chéo AC xuất phát từ A, cần cộng hai vectơ cạnh cùng gốc A là AB và AD.'
        ],
        explain: 'AB và AD là hai vectơ cạnh cùng xuất phát từ A.',
        keyBadge: 'Khóa 3/3'
      }
    ],
    challenges: []
  },

  /* ═══════════════════════════════════════════════════════════════════════
     CHẶNG 4. MÊ CUNG TRUNG ĐIỂM (THÔNG HIỂU – 65 GIÂY)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: 4,
    gameType: 'vector_adventure',
    defaultMode: 'memory',
    title: 'CHẶNG 4. MÊ CUNG TRUNG ĐIỂM – GIẢI MÃ THẺ PHÉP THUẬT',
    subtitle: 'Tính chất trung điểm của đoạn thẳng và hệ thức vectơ',
    shortName: 'Lật Thẻ Trung Điểm',
    place: 'Mê Cung Trung Điểm',
    icon: '🌀',
    biomeColor: '#14b8a6',
    levelBadge: 'THÔNG HIỂU',
    timeSeconds: 65,
    time: '65 giây',
    tag: 'Thông hiểu · Lật thẻ trung điểm (65 giây)',
    item: 'Ấn Cân Xứng',
    sealIcon: '⚖️',
    digit: '2',
    digitRule: 'Khôi phục Ấn Cân Xứng (Chặng 4 = 2).',
    story: 'Trong Mê Cung Trung Điểm, các hệ thức vectơ bị phong ấn bên dưới 12 tấm thẻ phép thuật. Đội phải lật thẻ, tìm đúng các cặp hình vẽ – hệ thức tương ứng và hiểu bản chất triệt tiêu tại trung điểm I để mở cổng mê cung.',
    dragonIntro: 'Lật thẻ và ghép đúng cặp kiến thức về trung điểm nhé!',
    dragonWin: 'Tuyệt vời! Sáu cặp thẻ phép thuật đã hợp nhất mở cổng Mê Cung Trung Điểm!',
    shadowIntro: 'Mười hai tấm thẻ phép thuật trong mê cung đã bị đảo lộn!',
    groupTask: 'Thay phiên lật thẻ trên bàn 3×4, ghi nhớ vị trí và ghép đúng 6 cặp hình học – hệ thức vectơ trung điểm.',
    teamRoles: TEAM_ROLES_STANDARD,
    visual3D: {
      title: 'Tính chất trung điểm I của đoạn thẳng AB',
      type: 'midpoint',
      points: [
        { label: 'A', coords: [-3, 0, 1], x: -3, y: 0, z: 1, color: '#38bdf8' },
        { label: 'I (Trung điểm)', coords: [0, 0, 1], x: 0, y: 0, z: 1, color: '#facc15' },
        { label: 'B', coords: [3, 0, 1], x: 3, y: 0, z: 1, color: '#4ade80' }
      ],
      vectors: [
        { from: [0, 0, 1], to: [-3, 0, 1], label: 'IA', color: '#38bdf8' },
        { from: [0, 0, 1], to: [3, 0, 1], label: 'IB', color: '#4ade80' }
      ],
      formula: 'IA + IB = 0   và   MA + MB = 2MI'
    },
    interactiveTask: {
      type: 'midpoint_memory',
      title: 'Lật Thẻ Trung Điểm – Ghép 6 cặp thẻ phép thuật',
      instruction: 'Lật các thẻ đang úp, ghi nhớ vị trí và ghép hai thẻ có nội dung toán học tương ứng về trung điểm I!',
      targets: ['MIDPOINT_I'],
      rewardText: 'Đã ghép đủ các cặp thẻ trung điểm! Mở khóa Ấn Cân Xứng!'
    },
    interactiveChallenge: {
      id: '4.0',
      isInteractive: true,
      level: 'THÔNG HIỂU',
      label: 'Lật Thẻ Trung Điểm · Giải mã 6 cặp thẻ phép thuật',
      prompt: 'NHIỆM VỤ LẬT THẺ TRUNG ĐIỂM: Ghép đúng các cặp thẻ hình học và hệ thức vectơ trung điểm để mở cổng Mê Cung!',
      options: [
        'Đã ghép hoàn tất các cặp thẻ trung điểm và mở cổng Mê Cung',
        'Chưa ghép đủ các cặp thẻ',
        'Bỏ qua bàn thẻ'
      ],
      correct: 0,
      shortAnswer: 'A',
      hints: [
        'Tại trung điểm I của AB, hai vectơ IA và IB cùng độ dài nhưng ngược hướng nên IA + IB = 0.',
        'Với điểm M bất kỳ: MA + MB = (MI + IA) + (MI + IB) = 2MI.'
      ],
      explain: 'Chính xác! Toàn bộ các cặp thẻ trung điểm đã được giải mã! Đội nhận Ấn Cân Xứng!',
      keyBadge: 'Cặp thẻ 6/6'
    },
    questionBank: [
      {
        id: '4.1',
        level: 'THÔNG HIỂU',
        label: 'Cặp 1 · Nhận biết hình học trung điểm (AI = IB)',
        prompt: 'Hình đoạn thẳng AB có I nằm chính giữa (AI = IB) ↔ I là trung điểm của đoạn thẳng AB.',
        options: ['Ghép đúng Cặp 1 (Hình đoạn AB có AI = IB ↔ I là trung điểm của AB)', 'Ghép nhầm cặp thẻ', 'Chưa ghép'],
        correct: 0,
        shortAnswer: 'P1',
        hints: ['Điểm I nằm trên đoạn AB và cách đều A, B (IA = IB) là trung điểm của AB.'],
        explain: 'I nằm giữa A, B và IA = IB nên I là trung điểm của đoạn thẳng AB.',
        keyBadge: 'Cặp 1/6'
      },
      {
        id: '4.2',
        level: 'THÔNG HIỂU',
        label: 'Cặp 2 · Tính chất hai vectơ đối nhau từ trung điểm (IA + IB = 0)',
        prompt: 'Hình hai vectơ IA và IB ngược hướng, cùng độ dài ↔ Hệ thức vectơ IA + vectơ IB = vectơ 0.',
        options: ['Ghép đúng Cặp 2 (Hình hai vectơ IA, IB ngược hướng ↔ IA + IB = 0)', 'Ghép nhầm cặp thẻ', 'Chưa ghép'],
        correct: 0,
        shortAnswer: 'P2',
        hints: ['Hai vectơ IA và IB cùng độ dài, ngược hướng nên tổng của chúng bằng vectơ-không.'],
        explain: 'Đúng rồi! Hai vectơ cùng độ dài, ngược hướng nên tổng bằng vectơ-không!',
        keyBadge: 'Cặp 2/6'
      },
      {
        id: '4.3',
        level: 'THÔNG HIỂU',
        label: 'Cặp 3 · Hệ thức trung điểm với điểm M bất kỳ (MA + MB = 2MI)',
        prompt: 'Hình điểm M bất kỳ nối tới đoạn AB qua trung điểm I ↔ Hệ thức vectơ MA + vectơ MB = 2 vectơ MI.',
        options: ['Ghép đúng Cặp 3 (Hình tam giác MAB có trung tuyến MI ↔ MA + MB = 2MI)', 'Ghép nhầm cặp thẻ', 'Chưa ghép'],
        correct: 0,
        shortAnswer: 'P3',
        hints: ['Vì MA = MI + IA và MB = MI + IB, mà IA + IB = 0 nên MA + MB = 2MI.'],
        explain: 'Vì MA = MI + IA và MB = MI + IB, mà IA + IB = 0 nên MA + MB = 2MI.',
        keyBadge: 'Cặp 3/6'
      },
      {
        id: '4.4',
        level: 'THÔNG HIỂU',
        label: 'Cặp 4 · Phân tích hai vectơ MA, MB qua trung điểm I',
        prompt: 'Vectơ MA = vectơ MI + vectơ IA ↔ Vectơ MB = vectơ MI + vectơ IB (Chèn điểm I theo quy tắc 3 điểm).',
        options: ['Ghép đúng Cặp 4 (MA = MI + IA ↔ MB = MI + IB)', 'Ghép nhầm cặp thẻ', 'Chưa ghép'],
        correct: 0,
        shortAnswer: 'P4',
        hints: ['Chèn điểm I vào giữa MA và MB để tách thành hai mảnh bổ sung tạo nên hệ thức tổng 2MI.'],
        explain: 'Hai mảnh phân tích MA = MI + IA và MB = MI + IB khi cộng lại sẽ triệt tiêu IA + IB = 0 để tạo thành 2MI!',
        keyBadge: 'Cặp 4/6'
      },
      {
        id: '4.5',
        level: 'THÔNG HIỂU',
        label: 'Cặp 5 · Bản chất triệt tiêu của hai vectơ đối nhau',
        prompt: 'Hai vectơ IA và IB có cùng độ dài, ngược hướng (IA = −IB) ↔ Tổng của hai vectơ đối nhau bằng vectơ-không.',
        options: ['Ghép đúng Cặp 5 (IA = −IB cùng độ dài ngược hướng ↔ Tổng hai vectơ đối bằng 0)', 'Ghép nhầm cặp thẻ', 'Chưa ghép'],
        correct: 0,
        shortAnswer: 'P5',
        hints: ['Hai vectơ đối nhau có cùng độ dài và ngược hướng nên luôn triệt tiêu nhau.'],
        explain: 'Vectơ IA và vectơ IB đối nhau (IA = −IB) nên tổng của chúng triệt tiêu bằng vectơ-không!',
        keyBadge: 'Cặp 5/6'
      },
      {
        id: '4.6',
        level: 'THÔNG HIỂU',
        label: 'Cặp 6 · Quan hệ vectơ nửa đoạn thẳng tại trung điểm (AI = IB = 1/2 AB)',
        prompt: 'Hình hai vectơ AI và IB cùng hướng trên đoạn AB ↔ Hệ thức vectơ AI = vectơ IB = 1/2 vectơ AB.',
        options: ['Ghép đúng Cặp 6 (Hình AI, IB cùng hướng ↔ AI = IB = 1/2 AB)', 'Ghép nhầm cặp thẻ', 'Chưa ghép'],
        correct: 0,
        shortAnswer: 'P6',
        hints: ['Điểm I chia đôi đoạn AB theo cùng chiều từ A đến B nên vectơ AI = vectơ IB = 1/2 vectơ AB.'],
        explain: 'Vì I chia đôi đoạn AB theo chiều A → I → B nên vectơ AI = vectơ IB = 1/2 vectơ AB!',
        keyBadge: 'Cặp 6/6'
      }
    ],
    challenges: []
  },

  /* ═══════════════════════════════════════════════════════════════════════
     CHẶNG 5. GIẢI CỨU TÂM THẠCH – BÍ MẬT TRỌNG TÂM TAM GIÁC (THÔNG HIỂU – 70 GIÂY)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: 5,
    gameType: 'vector_adventure',
    defaultMode: 'centroid_rescue',
    title: 'CHẶNG 5 – GIẢI CỨU TÂM THẠCH',
    subtitle: 'Trọng tâm tam giác & các hệ thức vectơ liên quan',
    shortName: 'Trọng tâm',
    place: 'Thành Trì Trí Tuệ',
    icon: '👑',
    biomeColor: '#f59e0b',
    levelBadge: 'THÔNG HIỂU',
    timeSeconds: 70,
    time: '70 giây',
    tag: 'Thông hiểu · Trọng tâm tam giác (70 giây)',
    item: 'Ấn Trí Tuệ',
    sealIcon: '👑',
    digit: '4',
    digitRule: 'Khôi phục Ấn Trí Tuệ & Tâm Thạch Vectơ (Chặng 5 = 4).',
    story: 'Sau khi thu hồi bốn Ấn Vectơ, Rồng Xanh đến Thành Trì Trí Tuệ. Bóng Lỗi đã lấy Tâm Thạch khỏi vị trí cân bằng, khiến ba nguồn năng lượng tại các đỉnh A, B, C bị mất ổn định. Chỉ khi đặt viên Tâm Thạch về đúng trọng tâm G của tam giác ABC, ba nguồn năng lượng mới có thể hợp nhất.',
    dragonIntro: 'Chúng ta đã đến thử thách cuối cùng! Hãy tìm trọng tâm G và đưa Tâm Thạch trở về vị trí cân bằng!',
    dragonWin: 'Chúng ta làm được rồi! Lục địa OXYZ đã được giải cứu!',
    shadowIntro: 'Bóng Lỗi: "Các ngươi sẽ không thể tìm ra tâm điểm cân bằng của tam giác ABC!"',
    groupTask: 'Xác định trung điểm hai cạnh BC và AC, nối hai đường trung tuyến tìm giao điểm, kéo Tâm Thạch vào đúng trọng tâm G = (A+B+C)/3 và kích hoạt trận pháp vectơ GA + GB + GC = 0.',
    teamRoles: [
      { role: 'Hoa tiêu Trung điểm', icon: '📐', desc: 'Kéo điểm phát sáng về đúng trung điểm hai cạnh BC và AC' },
      { role: 'Kỹ sư Trung tuyến', icon: '⚡', desc: 'Nối đỉnh A với trung điểm BC và đỉnh B với trung điểm AC' },
      { role: 'Người giữ Tâm Thạch', icon: '💎', desc: 'Kéo viên Tâm Thạch đặt vào đúng giao điểm G của hai trung tuyến' },
      { role: 'Pháp sư Trận pháp', icon: '👑', desc: 'Kích hoạt 3 luồng năng lượng GA, GB, GC và giải cứu Lục địa OXYZ' }
    ],
    visual3D: {
      title: 'Tính chất trọng tâm G của tam giác ABC',
      type: 'centroid',
      points: [
        { label: 'A', coords: [0, 3, 2], x: 0, y: 3, z: 2, color: '#38bdf8' },
        { label: 'B', coords: [-3, -2, 0], x: -3, y: -2, z: 0, color: '#facc15' },
        { label: 'C', coords: [3, -1, 1], x: 3, y: -1, z: 1, color: '#4ade80' },
        { label: 'G (Trọng tâm)', coords: [0, 0, 1], x: 0, y: 0, z: 1, color: '#f43f5e' }
      ],
      vectors: [
        { from: [0, 0, 1], to: [0, 3, 2], label: 'GA', color: '#38bdf8' },
        { from: [0, 0, 1], to: [-3, -2, 0], label: 'GB', color: '#facc15' },
        { from: [0, 0, 1], to: [3, -1, 1], label: 'GC', color: '#4ade80' }
      ],
      formula: 'GA + GB + GC = 0   và   MA + MB + MC = 3MG'
    },
    interactiveTask: {
      type: 'centroid_select',
      title: 'Phần 1 – Khám phá: Chọn trọng tâm G (giao điểm 3 trung tuyến)',
      instruction: 'Trên sơ đồ tam giác ABC với 3 đường trung tuyến, hãy nhấp chọn đúng giao điểm G để khơi thông 3 luồng năng lượng GA, GB, GC!',
      targets: ['CENTROID_G'],
      rewardText: 'Đã xác định đúng Trọng tâm G! Ba luồng năng lượng GA, GB, GC đã xuất hiện! Nhận Mảnh chìa khóa 1/3!'
    },
    interactiveChallenge: {
      id: '5.0',
      isInteractive: true,
      level: 'THÔNG HIỂU',
      label: 'Phần 1 · Xác định Trọng tâm G của tam giác ABC',
      prompt: 'NHIỆM VỤ TƯƠNG TÁC: Hãy chọn đúng giao điểm G của ba đường trung tuyến trong tam giác ABC để kích hoạt ba luồng năng lượng hướng tới A, B, C và nhận mảnh chìa khóa đầu tiên (1/3)!',
      options: [
        'Đã chọn đúng giao điểm G của ba đường trung tuyến',
        'Chọn trung điểm I của cạnh BC',
        'Chọn đỉnh A của tam giác'
      ],
      correct: 0,
      shortAnswer: 'A',
      hints: [
        'Nhấp chuột trực tiếp vào điểm G (nơi 3 đường trung tuyến cắt nhau) trên tam giác ABC bên trái.',
        'Trọng tâm G là giao điểm của ba đường trung tuyến trong tam giác ABC.'
      ],
      explain: 'Chính xác! Từ trọng tâm G, ba luồng năng lượng GA, GB, GC đã tỏa ra cân bằng. Đội nhận Mảnh chìa khóa 1/3!',
      keyBadge: 'Khóa 1/3'
    },
    questionBank: [
      {
        id: '5.1',
        level: 'THÔNG HIỂU',
        label: 'Câu 5.1 · Giải thích vì sao GA + GB + GC = 0',
        prompt: 'Cho G là trọng tâm tam giác ABC và I là trung điểm BC. Cặp hệ thức nào giải thích vì sao tổng ba vectơ GA, GB, GC bằng vectơ không?',
        options: [
          'GB + GC = GI và GA = −GI.',
          'GB + GC = 2GI và GA = −2GI.',
          'GB + GC = 2GI và GA = 2GI.'
        ],
        correct: 1,
        shortAnswer: 'B',
        hints: [
          'Vì I là trung điểm BC nên với điểm G ta có GB + GC = 2GI.',
          'Tính chất trọng tâm: AG = 2GI và GA ngược hướng với GI nên GA = −2GI.'
        ],
        explain: 'Vì I là trung điểm BC nên GB + GC = 2GI. Trọng tâm G chia trung tuyến AI theo tỉ số AG:GI = 2:1 nên GA = −2GI. Do đó tổng ba vectơ bằng không.',
        keyBadge: 'Khóa 2/3'
      },
      {
        id: '5.2',
        level: 'THÔNG HIỂU',
        label: 'Câu 5.2 · Ý nghĩa của hệ thức MA + MB + MC = 3MG',
        prompt: 'Cho G là trọng tâm tam giác ABC. Với điểm M khác G, đẳng thức vectơ MA + MB + MC = 3MG cho biết điều gì?',
        options: [
          'Tổng ba vectơ luôn bằng vectơ không.',
          'M luôn là trọng tâm tam giác.',
          'Tổng ba vectơ cùng hướng với MG và có độ dài gấp 3 lần MG.'
        ],
        correct: 2,
        shortAnswer: 'C',
        hints: [
          'Nhân một vectơ MG với số dương k = 3 > 0 thì vectơ tích có hướng và độ dài thế nào?',
          'Vectơ 3MG cùng hướng với MG và có độ dài bằng 3 lần độ dài MG.'
        ],
        explain: 'Tổng ba vectơ bằng ba lần vectơ MG.',
        keyBadge: 'Khóa 2/3'
      },
      {
        id: '5.3',
        level: 'THÔNG HIỂU',
        label: 'Câu 5.3 · Xác định vị trí điểm M khi MA + MB + MC = 0',
        prompt: 'Với tam giác ABC có trọng tâm G, nếu một điểm M thỏa mãn vectơ MA + vectơ MB + vectơ MC = vectơ không thì M ở đâu?',
        options: [
          'M trùng với G.',
          'M nằm tại một đỉnh bất kỳ.',
          'M là trung điểm của một cạnh bất kỳ.'
        ],
        correct: 0,
        shortAnswer: 'A',
        hints: [
          'Áp dụng hệ thức MA + MB + MC = 3MG.',
          'Khi 3MG = 0 thì vectơ MG bằng vectơ không, tức là điểm M trùng với G.'
        ],
        explain: 'MA + MB + MC = 3MG. Tổng bằng vectơ không nên MG bằng vectơ không, suy ra M trùng G.',
        keyBadge: 'Khóa 3/3'
      }
    ],
    challenges: []
  }
];

// Khởi tạo challenges mặc định (Phần 1 tương tác + 2 câu đầu trong questionBank)
STAGES.forEach(s => {
  if (s.fixedChallenges && s.fixedChallenges.length) {
    s.challenges = s.fixedChallenges.map(c => ({ ...c }));
  } else {
    s.challenges = [
      s.interactiveChallenge,
      { ...s.questionBank[0], keyBadge: 'Khóa 2/3' },
      { ...s.questionBank[1], keyBadge: 'Khóa 3/3' }
    ];
  }
});

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

module.exports = { STAGES, TOKEN_WORDS, MESSAGE_OPTIONS, TEAM_ROLES_STANDARD };
