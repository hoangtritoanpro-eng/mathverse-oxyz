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
     CHẶNG 1. MẬT THƯ RỪNG VECTƠ – CÂY CẦU ĐẢO CHIỀU (NHẬN BIẾT – 60 GIÂY)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: 1,
    isCipherBridgeQuest: true,
    gameType: 'vector_adventure',
    defaultMode: 'hunt',
    title: 'MẬT THƯ RỪNG VECTƠ – CÂY CẦU ĐẢO CHIỀU',
    subtitle: 'Giải Cứu Cây Cầu Ánh Sáng • Hiệu hai vectơ',
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
    digitRule: 'Khôi phục Cây Cầu Ánh Sáng & nhận Ấn Hướng Đi (Chặng 1 = 3).',
    story: 'Cây cầu ánh sáng xuyên qua Rừng Vectơ bị Bóng Lỗi phá hủy. Rồng Xanh xuất phát gần cột đá A, cần tìm 2 mảnh mật thư tại cột B và cột C rồi di chuyển từ C đến B để khôi phục cầu.',
    dragonIntro: 'Hãy dùng phím WASD (hoặc phím mũi tên) điều khiển Rồng Xanh tìm hai mảnh mật thư tại cột B và cột C, nhấn E để thu thập!',
    dragonWin: 'Chính xác! Vectơ AB − vectơ AC = vectơ CB! Cây cầu ánh sáng đã hồi sinh, đội nhận Ấn Hướng Đi!',
    shadowIntro: 'Bóng Lỗi đã phá hủy Cây cầu ánh sáng và giấu hai mảnh mật thư tại cột B và cột C!',
    groupTask: 'Nhiệm vụ 1: Tìm hai mảnh mật thư tại B, C (0–23s) → Nhiệm vụ 2: Giải mã cuộn giấy AB − AC = ? (23–32s) → Nhiệm vụ 3: Đưa Rồng Xanh từ C đến B bấm E (32–48s) → Nhiệm vụ 4: Khôi phục cầu (48–60s).',
    teamRoles: [
      '🎮 Thành viên 1 (Điều khiển): Dùng WASD + Shift + E điều khiển Rồng Xanh tìm 2 mảnh mật thư tại cột B và C',
      '🧭 Thành viên 2 (Hoa tiêu): Quan sát dấu chân phát sáng, rương bí mật và vị trí các cột A, B, C',
      '🧩 Thành viên 3 (Giải mã): Phân tích cuộn giấy vectơ AB − vectơ AC = ? để chỉ hướng đi từ C tới B',
      '✅ Thành viên 4 (Xác nhận): Luân phiên điều khiển đưa Rồng Xanh từ C đến cột B và bấm E mở cầu'
    ],
    visual3D: {
      title: 'Sơ đồ 3 cột mốc A, B, C trong Rừng Vectơ',
      type: 'vectorDiff',
      points: [
        { label: 'A', coords: [0, 0, 0], x: 0, y: 0, z: 0, color: '#38bdf8' },
        { label: 'B', coords: [4, 2, 2], x: 4, y: 2, z: 2, color: '#facc15' },
        { label: 'C', coords: [2, 4, 0], x: 2, y: 4, z: 0, color: '#4ade80' }
      ],
      vectors: [
        { from: [0, 0, 0], to: [4, 2, 2], label: 'AB', color: '#38bdf8' },
        { from: [0, 0, 0], to: [2, 4, 0], label: 'AC', color: '#facc15' },
        { from: [2, 4, 0], to: [4, 2, 2], label: '?', color: '#4ade80' }
      ],
      formula: 'Quy tắc hiệu hai vectơ chung gốc A: vectơ AB − vectơ AC = ?'
    },
    interactiveTask: {
      type: 'cipher_bridge_quest',
      title: 'Nhiệm vụ 1 – Truy tìm hai mảnh mật thư tại cột B và cột C',
      instruction: 'Rồng Xanh xuất phát gần cột đá A. Dùng WASD/Phím mũi tên (Shift chạy nhanh) đi theo lối mòn tới cột B và cột C, nhấn E để nhận 2 mảnh mật thư (0/2 → 2/2)!',
      targets: ['B', 'C'],
      rewardText: 'Đã tìm đủ 2/2 mảnh mật thư tại cột B và cột C!'
    },
    interactiveChallenge: {
      id: '1.0',
      stepType: 'find_pillars',
      isInteractive: true,
      level: 'NHẬN BIẾT',
      label: 'Nhiệm vụ 1 · Tìm hai mảnh mật thư (0/2 → 2/2)',
      prompt: 'Tìm hai mảnh mật thư tại cột B và cột C bằng phím WASD và nhấn E để tương tác.',
      options: [
        'Đã thu thập đủ 2/2 mảnh mật thư tại cột B và cột C',
        'Chỉ mới tìm thấy 1 mảnh mật thư',
        'Chưa thu thập mật thư'
      ],
      correct: 0,
      shortAnswer: 'BC',
      hints: [
        'Hãy quan sát điểm đầu và điểm cuối của mỗi vectơ.',
        'Khi trừ hai vectơ cùng điểm đầu, hãy tìm hướng nối hai điểm cuối.'
      ],
      explain: 'Hai manh mối đã được ghép: vectơ AB − vectơ AC = ?',
      keyBadge: 'Mật thư 2/2'
    },
    fixedChallenges: [
      {
        id: '1.0',
        stepType: 'find_pillars',
        isInteractive: true,
        level: 'NHẬN BIẾT',
        label: 'Nhiệm vụ 1 · Tìm hai mảnh mật thư',
        prompt: 'Tìm hai mảnh mật thư tại cột B và cột C (WASD: Di chuyển · E: Tương tác).',
        options: ['Đã thu thập đủ 2/2 mảnh mật thư tại cột B và cột C'],
        correct: 0,
        shortAnswer: 'BC',
        hints: [
          'Hãy quan sát điểm đầu và điểm cuối của mỗi vectơ.',
          'Khi trừ hai vectơ cùng điểm đầu, hãy tìm hướng nối hai điểm cuối.'
        ],
        explain: 'Đã thu thập đủ 2/2 mảnh mật thư từ cột B (vectơ AB) và cột C (vectơ AC)!',
        keyBadge: 'Mật thư 2/2'
      },
      {
        id: '1.1',
        stepType: 'assemble_cipher',
        isInteractive: false,
        level: 'NHẬN BIẾT',
        label: 'Nhiệm vụ 2 · Giải mã cuộn giấy',
        prompt: 'Hai manh mối đã được ghép: vectơ AB − vectơ AC = ? Hãy tìm vectơ bí mật để mở cây cầu!',
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
    defaultMode: 'defense',
    title: 'CHẶNG 2. PHÁO ĐÀI GÓC VUÔNG',
    subtitle: 'Quy tắc cộng hai vectơ nối tiếp',
    shortName: 'Tổng vectơ',
    place: 'Pháo Đài Góc Vuông',
    icon: '🏰',
    biomeColor: '#f59e0b',
    levelBadge: 'NHẬN BIẾT',
    timeSeconds: 60,
    time: '60 giây',
    tag: 'Nhận biết · Tổng hai vectơ (60 giây)',
    item: 'Ấn Kết Nối',
    sealIcon: '🔗',
    digit: '0',
    digitRule: 'Khôi phục Ấn Kết Nối (Chặng 2 = 0).',
    story: 'Pháo đài bị phong ấn bởi hai con đường năng lượng AB và BC. Muốn mở cổng thành, đội phải nhận biết quy tắc cộng hai vectơ.',
    dragonIntro: 'Hai con đường đã bị tách rời! Hãy tìm vectơ tổng để nối chúng!',
    dragonWin: 'Tuyệt vời! Các con đường đã hợp nhất!',
    shadowIntro: 'Cổng Pháo Đài đã bị chia cắt thành hai đoạn rời rạc!',
    groupTask: 'Kích hoạt lần lượt hai đoạn đường AB và BC trên bản đồ và giải mã quy tắc 3 điểm để mở cổng thành.',
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
      title: 'Phần 1 – Khám phá: Kích hoạt 2 đoạn đường AB và BC',
      instruction: 'Nhấp kích hoạt lần lượt đoạn đường năng lượng AB rồi đến đoạn đường BC để dẫn luồng sáng tới cổng Pháo Đài!',
      targets: ['AB', 'BC'],
      rewardText: 'Hai luồng sáng AB và BC đã kích hoạt! Nhận Mảnh chìa khóa 1/3!'
    },
    interactiveChallenge: {
      id: '2.0',
      isInteractive: true,
      level: 'NHẬN BIẾT',
      label: 'Phần 1 · Kích hoạt hai đoạn đường AB và BC',
      prompt: 'NHIỆM VỤ TƯƠNG TÁC: Hãy kích hoạt lần lượt hai đoạn đường năng lượng AB và BC trên sơ đồ Pháo Đài để nhận mảnh chìa khóa đầu tiên (1/3)!',
      options: [
        'Đã kích hoạt hai đoạn đường AB và BC nối tiếp nhau',
        'Chỉ kích hoạt một đoạn đường',
        'Bỏ qua sơ đồ'
      ],
      correct: 0,
      shortAnswer: 'A',
      hints: [
        'Nhấp vào đoạn đường AB trước, sau đó nhấp vào đoạn đường BC trên sơ đồ bên trái.',
        'Điểm cuối của vectơ AB nối tiếp với điểm đầu của vectơ BC tại B.'
      ],
      explain: 'Hai luồng năng lượng AB và BC đã rực sáng! Đội nhận Mảnh chìa khóa 1/3!',
      keyBadge: 'Khóa 1/3'
    },
    questionBank: [
      {
        id: '2.1',
        level: 'NHẬN BIẾT',
        label: 'Câu 2.1 · Tổng của vectơ AB và vectơ BC',
        prompt: 'Cho ba điểm A, B, C. Tổng của vectơ AB và vectơ BC bằng vectơ nào?',
        options: ['Vectơ CA.', 'Vectơ AC.', 'Vectơ CB.'],
        correct: 1,
        shortAnswer: 'AC',
        hints: [
          'Áp dụng quy tắc ba điểm: điểm cuối B của vectơ thứ nhất trùng với điểm đầu B của vectơ thứ hai.',
          'AB + BC = AC.'
        ],
        explain: 'AB + BC = AC.',
        keyBadge: 'Khóa 2/3'
      },
      {
        id: '2.2',
        level: 'NHẬN BIẾT',
        label: 'Câu 2.2 · Tổng của vectơ MN và vectơ NP',
        prompt: 'Cho ba điểm M, N, P. Tổng của vectơ MN và vectơ NP bằng vectơ nào?',
        options: ['Vectơ PM.', 'Vectơ PN.', 'Vectơ MP.'],
        correct: 2,
        shortAnswer: 'MP',
        hints: [
          'Điểm đầu là M, nối qua trung gian N tới điểm cuối P.',
          'MN + NP = MP.'
        ],
        explain: 'MN + NP = MP.',
        keyBadge: 'Khóa 2/3'
      },
      {
        id: '2.3',
        level: 'NHẬN BIẾT',
        label: 'Câu 2.3 · Cặp vectơ có tổng bằng AC',
        prompt: 'Cặp vectơ nào sau đây có tổng bằng vectơ AC?',
        options: [
          'Vectơ AB và vectơ BC.',
          'Vectơ AB và vectơ CB.',
          'Vectơ BA và vectơ AC.'
        ],
        correct: 0,
        shortAnswer: 'A',
        hints: [
          'Để tổng bằng AC theo quy tắc 3 điểm, vectơ đầu phải xuất phát từ A và vectơ sau kết thúc tại C.',
          'AB + BC = AC.'
        ],
        explain: 'Quy tắc ba điểm cho AB + BC = AC.',
        keyBadge: 'Khóa 3/3'
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
    defaultMode: 'maze',
    title: 'CHẶNG 4. MÊ CUNG TRUNG ĐIỂM',
    subtitle: 'Tính chất vectơ của trung điểm đoạn thẳng',
    shortName: 'Trung điểm',
    place: 'Mê Cung Trung Điểm',
    icon: '🌀',
    biomeColor: '#14b8a6',
    levelBadge: 'THÔNG HIỂU',
    timeSeconds: 65,
    time: '65 giây',
    tag: 'Thông hiểu · Trung điểm đoạn thẳng (65 giây)',
    item: 'Ấn Cân Xứng',
    sealIcon: '⚖️',
    digit: '2',
    digitRule: 'Khôi phục Ấn Cân Xứng (Chặng 4 = 2).',
    story: 'Trong mê cung, hai nguồn năng lượng tại A và B đang kéo ngược nhau. Cánh cổng chỉ xuất hiện khi đội tìm được điểm cân bằng và hiểu vì sao các vectơ tại đó triệt tiêu.',
    dragonIntro: 'Đừng chỉ tìm điểm ở giữa! Hãy giải thích vì sao nơi đó tạo ra sự cân bằng!',
    dragonWin: 'Các bạn đã hiểu bí mật của điểm cân bằng!',
    shadowIntro: 'Hai nguồn lực tại A và B đang xung đột dữ dội trong mê cung!',
    groupTask: 'Kéo viên pha lê I vào vị trí trung điểm của đoạn AB, quan sát hai vectơ IA, IB và thảo luận giải thích tính chất triệt tiêu.',
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
      type: 'midpoint_slider',
      title: 'Phần 1 – Khám phá: Đưa viên pha lê I về đúng Trung điểm AB',
      instruction: 'Di chuyển viên pha lê I vào đúng vị trí chính giữa (trung điểm) của đoạn thẳng AB để cân bằng hai vectơ IA và IB!',
      targets: ['MIDPOINT_I'],
      rewardText: 'Viên pha lê I đã nằm đúng trung điểm AB (IA = IB, ngược hướng)! Nhận Mảnh chìa khóa 1/3!'
    },
    interactiveChallenge: {
      id: '4.0',
      isInteractive: true,
      level: 'THÔNG HIỂU',
      label: 'Phần 1 · Đặt viên pha lê I tại trung điểm AB',
      prompt: 'NHIỆM VỤ TƯƠNG TÁC: Hãy đưa viên pha lê I vào đúng vị trí trung điểm của đoạn AB để hai vectơ IA và IB cân bằng nhau và nhận mảnh chìa khóa đầu tiên (1/3)!',
      options: [
        'Đã đặt viên pha lê I tại trung điểm AB (IA = IB và ngược hướng)',
        'Đặt I lệch về phía A',
        'Đặt I lệch về phía B'
      ],
      correct: 0,
      shortAnswer: 'A',
      hints: [
        'Kéo thanh trượt hoặc nhấn nút "Đặt tại Trung điểm I (50%)" trên sơ đồ bên trái.',
        'Tại trung điểm I, hai vectơ IA và IB có cùng độ dài và ngược hướng.'
      ],
      explain: 'Chính xác! Tại trung điểm I, hai vectơ IA và IB đối nhau nên cân bằng tuyệt đối. Đội nhận Mảnh chìa khóa 1/3!',
      keyBadge: 'Khóa 1/3'
    },
    questionBank: [
      {
        id: '4.1',
        level: 'THÔNG HIỂU',
        label: 'Câu 4.1 · Giải thích tính chất IA + IB = 0',
        prompt: 'Cho I là trung điểm của đoạn AB. Vì sao vectơ IA + vectơ IB bằng vectơ không?',
        options: [
          'Vì hai vectơ cùng hướng.',
          'Vì hai vectơ có cùng độ dài và ngược hướng.',
          'Vì hai vectơ luôn vuông góc.'
        ],
        correct: 1,
        shortAnswer: 'B',
        hints: [
          'Quan sát hướng và độ dài của hai mũi tên IA và IB xuất phát từ trung điểm I.',
          'Hai vectơ có cùng độ dài và ngược hướng là hai vectơ đối nhau.'
        ],
        explain: 'Hai vectơ IA và IB là hai vectơ đối nhau nên tổng bằng vectơ không.',
        keyBadge: 'Khóa 2/3'
      },
      {
        id: '4.2',
        level: 'THÔNG HIỂU',
        label: 'Câu 4.2 · Giải thích hệ thức MA + MB = 2MI',
        prompt: 'Cho I là trung điểm AB và M là điểm bất kỳ. Vì sao vectơ MA + vectơ MB = 2 vectơ MI?',
        options: [
          'Vì MA và MB luôn bằng nhau.',
          'Vì MI luôn là vectơ không.',
          'Vì khi phân tích MA và MB qua I, hai vectơ IA và IB triệt tiêu nhau.'
        ],
        correct: 2,
        shortAnswer: 'C',
        hints: [
          'Hãy chèn điểm trung điểm I vào hai vectơ MA và MB theo quy tắc ba điểm.',
          'MA + MB = (MI + IA) + (MI + IB) = 2MI + (IA + IB) = 2MI + 0 = 2MI.'
        ],
        explain: 'MA = MI + IA, MB = MI + IB. Vì IA + IB = 0 nên MA + MB = 2MI.',
        keyBadge: 'Khóa 2/3'
      },
      {
        id: '4.3',
        level: 'THÔNG HIỂU',
        label: 'Câu 4.3 · Khi I không phải là trung điểm AB',
        prompt: 'Điểm I nằm trên đoạn AB nhưng IA không bằng IB về độ dài. Nhận định nào đúng?',
        options: [
          'Vectơ IA + vectơ IB khác vectơ không.',
          'Vectơ IA + vectơ IB bằng vectơ không.',
          'Vectơ IA và vectơ IB là hai vectơ đối nhau.'
        ],
        correct: 0,
        shortAnswer: 'A',
        hints: [
          'Hai vectơ đối nhau bắt buộc phải vừa ngược hướng vừa có cùng độ dài.',
          'Vì độ dài IA ≠ IB nên hai vectơ không thể triệt tiêu hoàn toàn.'
        ],
        explain: 'Hai vectơ IA, IB ngược hướng nhưng khác độ dài nên tổng của chúng không bằng vectơ không.',
        keyBadge: 'Khóa 3/3'
      }
    ],
    challenges: []
  },

  /* ═══════════════════════════════════════════════════════════════════════
     CHẶNG 5. THÀNH TRÌ LÕI TRÍ TUỆ (THÔNG HIỂU – 70 GIÂY)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: 5,
    gameType: 'vector_adventure',
    defaultMode: 'minesweeper',
    title: 'CHẶNG 5. THÀNH TRÌ LÕI TRÍ TUỆ',
    subtitle: 'Tính chất vectơ của trọng tâm tam giác',
    shortName: 'Trọng tâm',
    place: 'Thành Trì Lõi Trí Tuệ',
    icon: '🏰',
    biomeColor: '#ef4444',
    levelBadge: 'THÔNG HIỂU',
    timeSeconds: 70,
    time: '70 giây',
    tag: 'Thông hiểu · Trọng tâm tam giác (70 giây)',
    item: 'Ấn Trí Tuệ',
    sealIcon: '👑',
    digit: '4',
    digitRule: 'Khôi phục Ấn Trí Tuệ & Tâm Thạch Vectơ (Chặng 5 = 4).',
    story: 'Bóng Lỗi đã chiếm giữ Tâm Thạch Vectơ. Ba luồng năng lượng từ các đỉnh A, B, C đang mất cân bằng. Muốn chiến thắng, đội phải xác định trọng tâm và hiểu mối quan hệ giữa các vectơ tại trọng tâm.',
    dragonIntro: 'Cả đội hãy cùng giải mã! Điểm cân bằng của tam giác sẽ cứu chúng ta!',
    dragonWin: 'Các bạn làm được rồi! Sức mạnh của tri thức đã cứu Lục địa OXYZ!',
    shadowIntro: 'Bóng Lỗi: "Các ngươi sẽ không thể tìm ra tâm điểm sức mạnh!"',
    groupTask: 'Chọn giao điểm G của ba đường trung tuyến trong tam giác ABC, kích hoạt 3 luồng năng lượng GA, GB, GC và giải thích hệ thức trọng tâm.',
    teamRoles: TEAM_ROLES_STANDARD,
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
