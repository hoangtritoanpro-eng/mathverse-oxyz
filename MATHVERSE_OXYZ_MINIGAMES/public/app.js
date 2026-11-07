/* MATHVERSE OXYZ — Hệ thống Game Tương Tác Nhóm (Săn Kho Báu 2D, Bảo Vệ Thành Trì & Mô hình 3D Oxyz) */
'use strict';

/* ═══════════════════════════════════════════════════════════════════════════
   HIGH-DETAIL CHARACTER VECTOR ARTWORKS MODULE (TOP LEVEL DEFINITIONS)
   ═══════════════════════════════════════════════════════════════════════════ */
const CHAR_ARCHER_SVG = `<svg viewBox="0 0 64 74" width="58" height="68" class="char-svg archer-svg">
  <defs>
    <radialGradient id="archerAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="archerBow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
  </defs>
  <!-- Shadow -->
  <ellipse cx="32" cy="70" rx="20" ry="4" fill="rgba(0,0,0,0.4)"/>
  <!-- Aura -->
  <circle cx="32" cy="36" r="28" fill="url(#archerAura)"/>
  <!-- Quiver & Arrows on back -->
  <rect x="18" y="16" width="6" height="22" rx="3" fill="#78350f" transform="rotate(-15 21 27)"/>
  <line x1="17" y1="14" x2="15" y2="6" stroke="#fef08a" stroke-width="2"/>
  <line x1="21" y1="15" x2="22" y2="7" stroke="#fef08a" stroke-width="2"/>
  <polygon points="15,6 13,8 17,9" fill="#0284c7"/>
  <polygon points="22,7 20,9 24,10" fill="#0284c7"/>
  <!-- Body / Cloak -->
  <path d="M22,32 Q32,36 42,32 L46,62 Q32,66 18,62 Z" fill="#0369a1"/>
  <path d="M26,34 L38,34 L36,54 L28,54 Z" fill="#0284c7"/>
  <!-- Belt -->
  <rect x="25" y="48" width="14" height="4" rx="1" fill="#78350f"/>
  <rect x="30" y="47" width="4" height="6" fill="#facc15"/>
  <!-- Head & Hood -->
  <ellipse cx="32" cy="22" rx="11" ry="12" fill="#fed7aa"/>
  <path d="M21,20 Q32,8 43,20 Q44,28 41,31 Q32,28 23,31 Q20,28 21,20 Z" fill="#0284c7"/>
  <!-- Feather on hat -->
  <path d="M38,12 Q48,4 44,18 Q40,16 38,12 Z" fill="#f43f5e"/>
  <!-- Eyes -->
  <ellipse cx="28" cy="23" rx="2" ry="2.5" fill="#0f172a"/>
  <ellipse cx="36" cy="23" rx="2" ry="2.5" fill="#0f172a"/>
  <circle cx="29" cy="22" r="0.8" fill="#fff"/>
  <circle cx="37" cy="22" r="0.8" fill="#fff"/>
  <!-- Bow in Hand -->
  <path d="M44,14 Q58,38 44,62" fill="none" stroke="url(#archerBow)" stroke-width="4" stroke-linecap="round"/>
  <!-- Bowstring with glowing arrow -->
  <line x1="44" y1="14" x2="44" y2="62" stroke="#bae6fd" stroke-width="1.5" stroke-dasharray="2 1"/>
  <line x1="32" y1="38" x2="52" y2="38" stroke="#38bdf8" stroke-width="2.5"/>
  <polygon points="54,38 49,35 49,41" fill="#00f8ff" filter="drop-shadow(0 0 3px #00f8ff)"/>
</svg>`;
const CHAR_MAGE_SVG = `<svg viewBox="0 0 64 74" width="58" height="68" class="char-svg mage-svg">
  <defs>
    <radialGradient id="mageOrb" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f0abfc"/>
      <stop offset="60%" stop-color="#c026d3"/>
      <stop offset="100%" stop-color="#581c87" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Shadow -->
  <ellipse cx="32" cy="70" rx="18" ry="4" fill="rgba(0,0,0,0.4)"/>
  <!-- Magic Aura -->
  <circle cx="48" cy="26" r="14" fill="url(#mageOrb)"/>
  <!-- Robe -->
  <path d="M20,34 Q32,38 44,34 L48,64 Q32,68 16,64 Z" fill="#4c1d95"/>
  <path d="M26,36 Q32,40 38,36 L40,64 Q32,66 24,64 Z" fill="#6d28d9"/>
  <!-- Golden Rune Trim -->
  <path d="M31,38 L31,64 M33,38 L33,64" stroke="#facc15" stroke-width="1.2" stroke-dasharray="3 2"/>
  <!-- Beard -->
  <path d="M26,26 Q32,46 38,26 Q32,29 26,26 Z" fill="#e2e8f0"/>
  <!-- Face -->
  <ellipse cx="32" cy="22" rx="9" ry="9" fill="#fde68a"/>
  <!-- Eyes with glowing pupil -->
  <circle cx="29" cy="21" r="2" fill="#38bdf8"/>
  <circle cx="35" cy="21" r="2" fill="#38bdf8"/>
  <!-- Wizard Hat -->
  <path d="M16,22 Q32,16 48,22 Q32,20 16,22 Z" fill="#3b0764"/>
  <polygon points="22,20 42,20 34,2 26,4" fill="#581c87"/>
  <circle cx="28" cy="7" r="3" fill="#facc15"/>
  <!-- Staff in hand -->
  <line x1="48" y1="16" x2="48" y2="66" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
  <!-- Glowing Crystal on Staff -->
  <polygon points="48,10 54,18 48,24 42,18" fill="#d946ef" filter="drop-shadow(0 0 6px #d946ef)"/>
</svg>`;
const CHAR_PALADIN_SVG = `<svg viewBox="0 0 64 74" width="58" height="68" class="char-svg paladin-svg">
  <defs>
    <linearGradient id="armorGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <linearGradient id="goldTrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <!-- Shadow -->
  <ellipse cx="32" cy="70" rx="22" ry="4" fill="rgba(0,0,0,0.4)"/>
  <!-- Cape -->
  <path d="M18,28 L12,64 Q32,68 52,64 L46,28 Z" fill="#b91c1c"/>
  <!-- Steel Armor Body -->
  <path d="M22,30 Q32,33 42,30 L44,58 Q32,62 20,58 Z" fill="url(#armorGrad)"/>
  <polygon points="32,32 38,42 32,54 26,42" fill="url(#goldTrim)"/>
  <!-- Pauldrons (Spike Shoulders) -->
  <ellipse cx="19" cy="32" rx="7" ry="5" fill="url(#armorGrad)" stroke="#facc15" stroke-width="1.5"/>
  <ellipse cx="45" cy="32" rx="7" ry="5" fill="url(#armorGrad)" stroke="#facc15" stroke-width="1.5"/>
  <!-- Helmet -->
  <ellipse cx="32" cy="20" rx="10" ry="11" fill="url(#armorGrad)"/>
  <rect x="25" y="18" width="14" height="4" rx="2" fill="#0f172a"/>
  <!-- Winged Plume -->
  <path d="M30,9 Q32,1 34,9 L36,16 L28,16 Z" fill="#facc15"/>
  <path d="M22,12 Q32,-2 42,12 L32,8 Z" fill="#ef4444"/>
  <!-- Great Shield with Lion / Cross Crest -->
  <path d="M12,32 Q26,30 26,32 L26,52 Q26,62 12,66 Q0,62 0,52 L0,32 Z" fill="#1e293b" stroke="#facc15" stroke-width="2.5" transform="translate(4,0)"/>
  <path d="M16,40 L16,56 M10,46 L22,46" stroke="#facc15" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Shining Rune Broadsword -->
  <polygon points="48,16 52,18 49,54 47,54" fill="#e2e8f0" stroke="#38bdf8" stroke-width="1.2" filter="drop-shadow(0 0 4px #38bdf8)"/>
  <rect x="44" y="52" width="10" height="3" rx="1" fill="#facc15"/>
  <rect x="48" y="55" width="2" height="7" fill="#78350f"/>
</svg>`;
const CHAR_DRAGON_SVG = `<svg viewBox="0 0 140 120" width="130" height="110" class="char-svg boss-dragon-svg">
  <defs>
    <radialGradient id="dragonVoidEye" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#facc15"/>
      <stop offset="60%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#7f1d1d"/>
    </radialGradient>
    <linearGradient id="dragonWing" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3b0764"/>
      <stop offset="50%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="voidAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#3b0764" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Void Aura Background -->
  <circle cx="70" cy="60" r="54" fill="url(#voidAura)" filter="drop-shadow(0 0 15px #a855f7)"/>
  <!-- Left Wing -->
  <path d="M60,65 Q25,25 2,42 Q15,62 30,72 Q20,82 12,96 Q38,88 56,76 Z" fill="url(#dragonWing)" stroke="#a855f7" stroke-width="1.8"/>
  <path d="M60,65 L2,42 M60,65 L30,72 M60,65 L12,96" stroke="#c084fc" stroke-width="1.2" opacity="0.6"/>
  <!-- Right Wing -->
  <path d="M80,65 Q115,25 138,42 Q125,62 110,72 Q120,82 128,96 Q102,88 84,76 Z" fill="url(#dragonWing)" stroke="#a855f7" stroke-width="1.8"/>
  <path d="M80,65 L138,42 M80,65 L110,72 M80,65 L128,96" stroke="#c084fc" stroke-width="1.2" opacity="0.6"/>
  <!-- Tail with Spikes -->
  <path d="M70,85 Q50,115 25,110 Q40,118 70,95" fill="#1e1b4b" stroke="#7e22ce" stroke-width="2"/>
  <polygon points="25,110 20,105 28,114" fill="#f43f5e"/>
  <!-- Dragon Body -->
  <ellipse cx="70" cy="74" rx="20" ry="24" fill="#0f172a" stroke="#6b21a8" stroke-width="2"/>
  <!-- Chest Armor Plates -->
  <path d="M62,64 Q70,68 78,64 L76,76 Q70,80 64,76 Z" fill="#3b0764" stroke="#c084fc" stroke-width="1.2"/>
  <path d="M63,78 Q70,82 77,78 L75,88 Q70,91 65,88 Z" fill="#3b0764" stroke="#c084fc" stroke-width="1.2"/>
  <!-- Dragon Neck & Head -->
  <path d="M62,60 L60,35 Q70,22 80,35 L78,60 Z" fill="#1e1b4b"/>
  <!-- Great Horns -->
  <path d="M63,30 Q45,10 40,2 Q52,14 65,24 Z" fill="#f43f5e" stroke="#ffe4e6" stroke-width="1" filter="drop-shadow(0 0 5px #f43f5e)"/>
  <path d="M77,30 Q95,10 100,2 Q88,14 75,24 Z" fill="#f43f5e" stroke="#ffe4e6" stroke-width="1" filter="drop-shadow(0 0 5px #f43f5e)"/>
  <!-- Dragon Face -->
  <path d="M58,34 Q70,18 82,34 Q86,46 70,52 Q54,46 58,34 Z" fill="#0f172a" stroke="#a855f7" stroke-width="2"/>
  <polygon points="70,52 66,42 74,42" fill="#581c87"/>
  <!-- Glowing Fiery Eyes -->
  <polygon points="62,35 68,36 64,39" fill="url(#dragonVoidEye)" filter="drop-shadow(0 0 4px #facc15)"/>
  <polygon points="78,35 72,36 76,39" fill="url(#dragonVoidEye)" filter="drop-shadow(0 0 4px #facc15)"/>
  <!-- Snout & Void Breath Particles -->
  <circle cx="68" cy="46" r="1.5" fill="#f43f5e"/>
  <circle cx="72" cy="46" r="1.5" fill="#f43f5e"/>
  <!-- Sharp Teeth -->
  <polygon points="63,44 65,48 67,44" fill="#ffffff"/>
  <polygon points="67,44 69,48 71,44" fill="#ffffff"/>
  <polygon points="71,44 73,48 75,44" fill="#ffffff"/>
  <polygon points="75,44 77,48 79,44" fill="#ffffff"/>
  <!-- Dragon Claws -->
  <path d="M54,82 Q48,92 46,95 M56,84 Q52,94 51,97 M58,84 Q56,94 56,97" stroke="#e2e8f0" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M86,82 Q92,92 94,95 M84,84 Q88,94 89,97 M82,84 Q84,94 84,97" stroke="#e2e8f0" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;
const CHAR_GOBLIN_SVG = `<svg viewBox="0 0 48 56" width="42" height="50" class="char-svg goblin-svg">
  <!-- Shadow -->
  <ellipse cx="24" cy="52" rx="14" ry="3" fill="rgba(0,0,0,0.4)"/>
  <!-- Body -->
  <path d="M16,26 Q24,30 32,26 L34,46 Q24,50 14,46 Z" fill="#65a30d"/>
  <!-- Leather Vest -->
  <path d="M17,28 L31,28 L30,42 L18,42 Z" fill="#78350f"/>
  <!-- Legs -->
  <rect x="18" y="44" width="4" height="8" rx="2" fill="#4d7c0f"/>
  <rect x="26" y="44" width="4" height="8" rx="2" fill="#4d7c0f"/>
  <!-- Pointed Ears -->
  <polygon points="14,18 4,14 12,24" fill="#84cc16"/>
  <polygon points="34,18 44,14 36,24" fill="#84cc16"/>
  <!-- Head -->
  <ellipse cx="24" cy="20" rx="9" ry="8" fill="#84cc16"/>
  <!-- Eyes -->
  <circle cx="21" cy="19" r="2.2" fill="#ef4444"/>
  <circle cx="27" cy="19" r="2.2" fill="#ef4444"/>
  <circle cx="21.5" cy="18.5" r="0.8" fill="#fff"/>
  <circle cx="27.5" cy="18.5" r="0.8" fill="#fff"/>
  <!-- Grin with Fangs -->
  <path d="M19,24 Q24,28 29,24" stroke="#000" stroke-width="1.2" fill="none"/>
  <polygon points="20,24 21,26 22,24" fill="#fff"/>
  <polygon points="26,24 27,26 28,24" fill="#fff"/>
  <!-- Daggers in Hands -->
  <line x1="12" y1="28" x2="6" y2="40" stroke="#94a3b8" stroke-width="2.5"/>
  <line x1="36" y1="28" x2="42" y2="40" stroke="#94a3b8" stroke-width="2.5"/>
</svg>`;
const CHAR_BAT_SVG = `<svg viewBox="0 0 54 46" width="48" height="40" class="char-svg bat-svg">
  <!-- Wings -->
  <path d="M27,22 Q12,6 2,14 Q8,28 16,30 Q22,34 27,26 Z" fill="#3b0764" stroke="#a855f7" stroke-width="1.5"/>
  <path d="M27,22 Q42,6 52,14 Q46,28 38,30 Q32,34 27,26 Z" fill="#3b0764" stroke="#a855f7" stroke-width="1.5"/>
  <!-- Body -->
  <ellipse cx="27" cy="24" rx="6" ry="8" fill="#1e1b4b"/>
  <!-- Pointed Ears -->
  <polygon points="23,16 21,9 25,14" fill="#6b21a8"/>
  <polygon points="31,16 33,9 29,14" fill="#6b21a8"/>
  <!-- Glowing Eyes -->
  <circle cx="25" cy="22" r="1.8" fill="#f43f5e" filter="drop-shadow(0 0 3px #f43f5e)"/>
  <circle cx="29" cy="22" r="1.8" fill="#f43f5e" filter="drop-shadow(0 0 3px #f43f5e)"/>
  <!-- Small Fangs -->
  <polygon points="25,27 26,29 27,27" fill="#fff"/>
  <polygon points="27,27 28,29 29,27" fill="#fff"/>
</svg>`;
const CHAR_SKELETON_SVG = `<svg viewBox="0 0 48 56" width="42" height="50" class="char-svg skeleton-svg">
  <!-- Shadow -->
  <ellipse cx="24" cy="52" rx="14" ry="3" fill="rgba(0,0,0,0.4)"/>
  <!-- Ribcage Body -->
  <line x1="24" y1="26" x2="24" y2="44" stroke="#e2e8f0" stroke-width="3"/>
  <line x1="18" y1="30" x2="30" y2="30" stroke="#e2e8f0" stroke-width="2"/>
  <line x1="19" y1="35" x2="29" y2="35" stroke="#e2e8f0" stroke-width="2"/>
  <line x1="20" y1="40" x2="28" y2="40" stroke="#e2e8f0" stroke-width="2"/>
  <!-- Legs -->
  <line x1="21" y1="44" x2="19" y2="52" stroke="#e2e8f0" stroke-width="2.5"/>
  <line x1="27" y1="44" x2="29" y2="52" stroke="#e2e8f0" stroke-width="2.5"/>
  <!-- Skull Head -->
  <ellipse cx="24" cy="18" rx="8" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="21" y="24" width="6" height="3" fill="#f8fafc"/>
  <!-- Glowing Blue Eye Sockets -->
  <ellipse cx="21.5" cy="17" rx="2" ry="2.5" fill="#0284c7" filter="drop-shadow(0 0 3px #38bdf8)"/>
  <ellipse cx="26.5" cy="17" rx="2" ry="2.5" fill="#0284c7" filter="drop-shadow(0 0 3px #38bdf8)"/>
  <!-- Round Shield -->
  <circle cx="12" cy="35" r="9" fill="#475569" stroke="#94a3b8" stroke-width="2"/>
  <circle cx="12" cy="35" r="3" fill="#f59e0b"/>
  <!-- Scimitar Sword -->
  <path d="M34,42 Q42,28 38,18 Q36,26 34,36 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="1"/>
</svg>`;
const CHAR_ORC_SVG = `<svg viewBox="0 0 56 64" width="50" height="58" class="char-svg orc-svg">
  <!-- Shadow -->
  <ellipse cx="28" cy="60" rx="18" ry="4" fill="rgba(0,0,0,0.5)"/>
  <!-- Muscular Body -->
  <path d="M16,28 Q28,32 40,28 L42,52 Q28,56 14,52 Z" fill="#991b1b"/>
  <!-- Spiked Iron Armor -->
  <rect x="20" y="32" width="16" height="18" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- Horned Helmet -->
  <ellipse cx="28" cy="20" rx="10" ry="9" fill="#1e293b" stroke="#94a3b8" stroke-width="1.8"/>
  <path d="M19,16 Q10,8 12,2 Q18,8 21,14 Z" fill="#f59e0b"/>
  <path d="M37,16 Q46,8 44,2 Q38,8 35,14 Z" fill="#f59e0b"/>
  <rect x="23" y="19" width="10" height="3" fill="#ef4444" filter="drop-shadow(0 0 3px #ef4444)"/>
  <!-- Massive Battleaxe -->
  <line x1="44" y1="12" x2="44" y2="58" stroke="#78350f" stroke-width="3.5"/>
  <path d="M44,14 Q54,10 52,24 Q44,28 44,20 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
  <path d="M44,14 Q34,10 36,24 Q44,28 44,20 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
</svg>`;
const CHAR_EXPLORER_SVG = `<svg viewBox="0 0 48 54" width="44" height="50" class="char-svg explorer-svg">
  <!-- Shadow -->
  <ellipse cx="24" cy="50" rx="14" ry="3.5" fill="rgba(0,0,0,0.4)"/>
  <!-- Backpack -->
  <rect x="11" y="24" width="6" height="18" rx="2" fill="#78350f"/>
  <ellipse cx="14" cy="24" rx="4" ry="2" fill="#ca8a04"/>
  <!-- Body / Jacket -->
  <path d="M17,26 L31,26 L33,42 L15,42 Z" fill="#1d4ed8"/>
  <!-- Belt -->
  <rect x="16" y="38" width="16" height="3" fill="#78350f"/>
  <rect x="22" y="37.5" width="4" height="4" fill="#facc15"/>
  <!-- Legs -->
  <rect x="18" y="42" width="4" height="8" rx="2" fill="#1e3a8a"/>
  <rect x="26" y="42" width="4" height="8" rx="2" fill="#1e3a8a"/>
  <!-- Head -->
  <ellipse cx="24" cy="18" rx="8" ry="8" fill="#fed7aa"/>
  <!-- Adventurer Hat -->
  <ellipse cx="24" cy="14" rx="14" ry="4" fill="#a16207"/>
  <path d="M17,14 Q24,6 31,14 Z" fill="#ca8a04"/>
  <!-- Friendly Eyes -->
  <circle cx="22" cy="18" r="1.8" fill="#0f172a"/>
  <circle cx="27" cy="18" r="1.8" fill="#0f172a"/>
  <circle cx="22.5" cy="17.5" r="0.7" fill="#fff"/>
  <circle cx="27.5" cy="17.5" r="0.7" fill="#fff"/>
  <!-- Smile -->
  <path d="M22,22 Q24,24 26,22" stroke="#b45309" stroke-width="1" fill="none"/>
  <!-- Coordinate Crystal Torch in Hand -->
  <line x1="33" y1="28" x2="38" y2="40" stroke="#78350f" stroke-width="2.5"/>
  <polygon points="38,26 42,32 38,38 34,32" fill="#38bdf8" filter="drop-shadow(0 0 6px #00f8ff)"/>
</svg>`;

const $=sel=>document.querySelector(sel);
const $$=sel=>Array.from(document.querySelectorAll(sel));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function formatMath(str){
 if(!str)return '';
 let out = esc(str)
   .replace(/\\vec\{([A-Za-z0-9]+)\}/g, '<span class="vec-arrow">$1</span>')
   .replace(/\\vec\s*([A-Za-z0-9]+)/g, '<span class="vec-arrow">$1</span>')
   .replace(/\\cdot/g, '<span class="math-sym">·</span>')
   .replace(/\\perp/g, '<span class="math-sym">⊥</span>')
   .replace(/\\sqrt\{([^}]+)\}/g, '<span class="math-sym">√</span>($1)')
   .replace(/\\approx/g, '≈')
   .replace(/\\pi/g, 'π')
   .replace(/\\text\{([^}]+)\}/g, '$1')
   .replace(/\^2/g, '²')
   .replace(/\^3/g, '³');
 // Ensure "vectơ không" has arrow over 0
 out = out.replace(/([Vv]ectơ\s+)(không)\b/g, '$1<span class="vec-arrow">0</span>');
 // Ensure "vectơ AB" has arrow over AB
 out = out.replace(/([Vv]ectơ\s+)([A-Z]{2})\b/g, '$1<span class="vec-arrow">$2</span>');
 // Ensure scalar-multiplied vectors like 2MI, 3MG, 2GI, −2GI, 1/2 MI have arrow over the vector part
 out = out.replace(/(^|[\s(\[+\-=−])([23]|1\/2\s*|−2|-2)\s*(GI|IG|MI|IM|MG|GM|MC|MA|MB)\b/g, '$1$2<span class="vec-arrow">$3</span>');
 // Ensure standalone 2-letter vector tokens in equations (AB, AC, BC, CB, BA, CA, AD, BD, CD, MN, MP, NP, NM, PN, IA, IB, MA, MB, MC, MI, GA, GB, GC, MG, AG, GI, IG) have arrows when not preceded by geometry nouns
 out = out.replace(/(?<!điểm\s|Điểm\s|cạnh\s|Cạnh\s|đoạn\s|Đoạn\s|thẳng\s|chắn\s|chéo\s|hành\s|giác\s|mốc\s|>)(^|[\s(\[+\-=−⋅|])(AB|AC|BC|CB|BA|CA|AD|DA|BD|DB|CD|DC|MN|MP|NP|NM|PN|PM|IA|IB|AI|BI|MA|MB|MC|MI|GA|GB|GC|MG|AG|GI|IG)(?=$|[\s)\]+\-=−.,?;:|])/g, '$1<span class="vec-arrow">$2</span>');
 // Ensure "= 0" or "≠ 0" in vector sum equations renders 0 with vector arrow
 out = out.replace(/(<\/span>\s*[=≠]\s*)0\b/g, '$1<span class="vec-arrow">0</span>');
 return out;
}
const app=$('#app');
const qs=new URLSearchParams(location.search);
let session=null, world=null, modal=null, busy=false, showAward=false, soundEnabled=true;
let lastSignature='', lastStudentKey='', clockBase=null, tickBase=0;
let activePlayMode=null; // 'hunt' | 'defense'
let teacherPreviewStage=0;
window.IS_DEMO_MODE=Boolean(typeof demoApi==='function');

/* ─── TRẠNG THÁI MÔ HÌNH HÌNH HỌC 3D OXYZ HOLOGRAM ─── */
const oxyz3D={
 yaw:38,       // góc xoay ngang (độ)
 pitch:24,     // góc nghiêng dọc (độ)
 showProj:true, // hiện đường gióng tọa độ (x,y,0)
 open:false    // mặc định thu gọn để ưu tiên toàn màn hình cho game chạy tìm trạm
};

const missionMeta=[
 {icon:'🏝️',place:'Rừng Vectơ Khởi Nguyên',sub:'Hiệu hai vectơ (Nhận biết · 60s)',biome:'#10b981',mode:'🧭 Ấn Hướng Đi'},
 {icon:'🏰',place:'Pháo Đài Góc Vuông',sub:'Tổng hai vectơ (Nhận biết · 60s)',biome:'#f59e0b',mode:'🔗 Ấn Kết Nối'},
 {icon:'💠',place:'Tháp Pha Lê',sub:'Quy tắc hình bình hành (Nhận biết · 65s)',biome:'#a855f7',mode:'💠 Ấn Cân Bằng'},
 {icon:'🌀',place:'Mê Cung Trung Điểm',sub:'Tính chất trung điểm (Thông hiểu · 65s)',biome:'#14b8a6',mode:'⚖️ Ấn Cân Xứng'},
 {icon:'👑',place:'Thành Trì Lõi Trí Tuệ',sub:'Trọng tâm tam giác (Thông hiểu · 70s)',biome:'#ef4444',mode:'👑 Ấn Trí Tuệ'}
];
const labels=['A','B','C','D'];
const initialRoom=(qs.get('room')||'').trim().toUpperCase();
const initialTeam=qs.get('team')||'';
const initialView=qs.get('view')||'';

/* ─── TRẠNG THÁI ENGINE 1: SĂN KHO BÁU 2D (HUNT MAP) ─── */
const cipherState = {
 open: false,
 slots: [null, null, null, null, null],
 error: null,
 successMsg: null,
 solving: false
};
let showRolesModal = false;
let questDialogue = null;
let currentHintLevel = 0;

let mvBriefingCollapsed = true;
let mvSidebarCollapsed = false;
const SHORT_STAGE_NAMES = ['Hiệu vectơ', 'Tổng vectơ', 'Hình bình hành', 'Trung điểm', 'Trọng tâm'];
const STAGE_FORMULAS_SHORT = [
  '\\vec{AB} − \\vec{AC} = \\vec{CB}  |  \\vec{AC} − \\vec{AB} = \\vec{BC}  |  \\vec{MN} − \\vec{MP} = \\vec{PN}',
  '\\vec{AB} + \\vec{BC} = \\vec{AC}  |  \\vec{MN} + \\vec{NP} = \\vec{MP}',
  'Hình bình hành ABCD: \\vec{AB} + \\vec{AD} = \\vec{AC}  |  \\vec{BA} + \\vec{BC} = \\vec{BD}',
  'I là trung điểm đoạn AB: \\vec{IA} + \\vec{IB} = \\vec{0}  |  \\vec{MA} + \\vec{MB} = 2\\vec{MI}',
  'G là trọng tâm tam giác ABC: \\vec{GA} + \\vec{GB} + \\vec{GC} = \\vec{0}  |  \\vec{MA} + \\vec{MB} + \\vec{MC} = 3\\vec{MG}'
];
const STAGE_BG_ASSETS = [
  '/assets/Stage_01_Rung_Vecto.png',
  '/assets/Stage_02_Phao_Dai.png',
  '/assets/Stage_03_Thap_Pha_Le.png',
  '/assets/Stage_04_Me_Cung.png',
  '/assets/Stage_05_Thanh_Tri.png'
];
const DIAMOND_ICON_SVG = `<svg viewBox="0 0 32 36" width="24" height="28" class="hs-diamond-svg" aria-hidden="true">
  <polygon points="16,2 29,18 16,34 3,18" fill="#36DEF4" stroke="#FFC953" stroke-width="2.5"/>
  <polygon points="16,7 24,18 16,29 8,18" fill="#A5F3FC" opacity="0.85"/>
</svg>`;
const SMALL_DIAMOND_SVG = `<svg viewBox="0 0 24 28" width="18" height="22" aria-hidden="true">
  <polygon points="12,2 22,14 12,26 2,14" fill="#36DEF4" stroke="#FFC953" stroke-width="2.2"/>
</svg>`;
let selectedInspectorTeamId = null;
let showTeacherPinDrawer = false;
let showTeacher3DDrawer = false;

const CHAR_GREEN_DRAGON_MASCOT_SVG = `<img src="/assets/RongXanh.png" alt="Rồng Xanh OXYZ" class="mv-dragon-mascot-img" draggable="false"/>`;

const HERO_OXYZ_CUBE_SVG = `<svg viewBox="0 0 220 150" class="mv-vista-cube" xmlns="http://www.w3.org/2000/svg">
  <!-- Glowing Grid Base -->
  <ellipse cx="105" cy="110" rx="68" ry="22" fill="rgba(26,182,181,0.18)" stroke="rgba(103,232,249,0.45)" stroke-dasharray="4 4"/>
  <!-- Axes O, x, y, z -->
  <line x1="105" y1="88" x2="105" y2="14" stroke="#67E8F9" stroke-width="2.4"/>
  <polygon points="105,8 101,17 109,17" fill="#67E8F9"/>
  <text x="113" y="18" fill="#FEF08A" font-size="13" font-weight="900" font-style="italic">z</text>

  <line x1="105" y1="88" x2="40" y2="118" stroke="#67E8F9" stroke-width="2.4"/>
  <polygon points="34,121 44,121 40,113" fill="#67E8F9"/>
  <text x="20" y="122" fill="#FEF08A" font-size="13" font-weight="900" font-style="italic">x</text>

  <line x1="105" y1="88" x2="176" y2="112" stroke="#67E8F9" stroke-width="2.4"/>
  <polygon points="182,114 172,115 175,107" fill="#67E8F9"/>
  <text x="186" y="116" fill="#FEF08A" font-size="13" font-weight="900" font-style="italic">y</text>

  <!-- Holographic 3D Cube -->
  <polygon points="105,36 145,50 145,88 105,102 65,88 65,50" fill="rgba(26,182,181,0.22)" stroke="#A5F3FC" stroke-width="1.8"/>
  <polyline points="65,50 105,64 145,50" fill="none" stroke="#67E8F9" stroke-width="1.6"/>
  <line x1="105" y1="64" x2="105" y2="102" stroke="#67E8F9" stroke-width="1.6"/>
  <!-- Glowing Vertices -->
  <circle cx="105" cy="36" r="3" fill="#FEF08A"/>
  <circle cx="145" cy="50" r="3" fill="#67E8F9"/>
  <circle cx="65" cy="50" r="3" fill="#67E8F9"/>
  <circle cx="105" cy="64" r="3.5" fill="#FFFFFF"/>
</svg>`;

const ISLAND_SVGS = [
  '<img src="/images/scenario/stage-1.jpg" alt="Chặng 1" class="mv-island-photo" draggable="false"/>',
  '<img src="/images/scenario/stage-2.jpg" alt="Chặng 2" class="mv-island-photo" draggable="false"/>',
  '<img src="/images/scenario/stage-3.jpg" alt="Chặng 3" class="mv-island-photo" draggable="false"/>',
  '<img src="/images/scenario/stage-4.jpg" alt="Chặng 4" class="mv-island-photo" draggable="false"/>',
  '<img src="/images/scenario/stage-5.jpg" alt="Chặng 5" class="mv-island-photo" draggable="false"/>'
];

/* ─── TRẠNG THÁI ENGINE 4: MÊ CUNG TỌA ĐỘ Ô VUÔNG (GRID MAZE) ─── */
const mazeState = {
  x: 0,
  y: 0,
  walking: false,
  shaking: false,
  toastMsg: null,
  toastType: null,
  hintMsg: null,
  walls: new Set(['1,1', '1,2', '1,4', '2,4', '3,1', '3,5', '4,2', '4,4', '5,1', '5,3', '6,3', '6,5', '7,2', '7,4']),
  waypoints: [
    {x: 4, y: 3, label: 'M(4; 3)', badge: 'Mảnh T'},
    {x: 3, y: 3, label: 'G(3; 3)', badge: 'Mảnh R'},
    {x: 4, y: 1, label: 'D(4; −2; 0)', badge: 'Mảnh U'},
    {x: 2, y: 1, label: 'G₂(2; 1; 2)', badge: 'Mảnh N'},
    {x: 3, y: 2, label: 'K(3; 1; 2)', badge: 'Mảnh G'}
  ]
};
function isMazeWall(x, y){
  return mazeState.walls.has(x + ',' + y);
}

/* ─── TRẠNG THÁI ENGINE 3: CHẶN ZOMBIE 4 LÀN (ZOMBIE DEFENSE) ─── */
const zdState = {
  lane: 0,
  shooting: false,
  hitLane: null,
  hitType: null,
  hintMsg: null,
  rewardMsg: null
};

function playZdSound(type){
  try{
    const src = type==='hit' ? '/sounds/sfx/correct.mp3' : (type==='miss' ? '/sounds/sfx/incorrect.mp3' : null);
    if(src){
      const a = new Audio(src);
      a.volume = 0.85;
      a.play().catch(()=>{});
    }
  }catch(e){}
  sound(type==='hit' ? 'laser' : 'wrong');
}

/* ─── TRẠNG THÁI ENGINE 5: DÒ MÌN GIAOVIENDOIMOI (EXACT RUNNING SOLDIER & DIRECTION) ─── */
const msState = {
  aimedPad: 0,
  walking: false,
  shaking: false,
  wobble: false,
  lastChoice: null,
  resultType: null,
  posX: 50,
  posY: 82,
  blastX: null,
  blastY: null,
  direction: 'up',
  frame: 0,
  animTimer: null,
  explodedMines: [],
  hintMsg: null
};

function playMsSound(type){
  try{
    const src = type==='safe' ? '/sounds/sfx/correct.mp3' : (type==='mine' ? '/sounds/sfx/explosion.mp3' : null);
    if(src){
      const a = new Audio(src);
      a.volume = 0.85;
      a.play().catch(()=>{});
    }
  }catch(e){}
  sound(type==='safe' ? 'laser' : 'wrong');
}

function startSoldierRunning(dir, durationMs){
  msState.walking = true;
  msState.direction = dir;
  msState.frame = 0;
  if(msState.animTimer) clearInterval(msState.animTimer);
  msState.animTimer = setInterval(()=>{
    msState.frame = (msState.frame === 0 ? 1 : 0);
    render();
  }, 110);
  setTimeout(()=>{
    if(msState.animTimer) clearInterval(msState.animTimer);
    msState.animTimer = null;
    msState.walking = false;
    msState.frame = 0;
    render();
  }, durationMs);
}

function getSoldierSprite(){
  if(msState.wobble){
    return '/images/minesweeper/soldier-down-1.png';
  }
  if(!msState.walking){
    return '/images/minesweeper/soldier-up-1.png';
  }
  const f = msState.frame + 1;
  if(msState.direction === 'left') return `/images/minesweeper/soldier-left-${f}.png`;
  if(msState.direction === 'right') return `/images/minesweeper/soldier-right-${f}.png`;
  if(msState.direction === 'down') return `/images/minesweeper/soldier-down-${f}.png`;
  return `/images/minesweeper/soldier-up-${f}.png`;
}

const huntState={
 stageId:-1,
 x:14, y:50,
 targetX:null, targetY:null,
 keysPressed:new Set(),
 moving:false,
 facing:'right',
 isSprinting:false,
 battleOpen:false,
 selectedChoice:null,
 shortText:'',
 monsterDefeated:false,
 rewardBadge:null,
 lastAutoStation:-1,
 lastStepSfxAt:0,
 collectibles:[],
 popups:[]
};

/* ─── TRẠNG THÁI ENGINE 2: BẢO VỆ THÀNH TRÌ (CASTLE DEFENSE) ─── */
const cdState={
 stageId:-1,
 castleHp:300,
 castleMaxHp:300,
 shieldUntil:0,
 slowUntil:0,
 laserUntil:0,
 shakeUntil:0,
 enemies:[],
 projectiles:[],
 effects:[],
 lastSpawnAt:0,
 lastHeroShot:[0,0,0],
 lastRegenAt:0,
 seq:0,
 skillCd:{arrowRain:0,iceVolley:0,groupHeal:0,castleShield:0},
 shortText:''
};

function cacheKey(role,room,id=''){return 'mathverse_oyxz_'+role+'_'+room+(id?'_'+id:'');}
function saveSession(d){
 session=d;
 try{localStorage.setItem(cacheKey(d.role,d.room,d.teamId),d.token);}catch(e){}
 const par=new URLSearchParams({
  room:d.room,
  ...(d.role==='teacher'?{view:'teacher'}:d.role==='display'?{view:'display'}:{team:d.teamId})
 });
 try{history.replaceState({},'',location.pathname+'?'+par.toString());}catch(e){}
}
function restoreSession(){
 if(qs.get('demo')==='1')return{role:'student',room:'123456',teamId:'doi-1',token:'DEMO_DOI_1'};
 if(!initialRoom)return null;
 if(initialView==='display')return{role:'display',room:initialRoom,token:'DISPLAY'};
 if(initialView==='teacher'){const token=localStorage.getItem(cacheKey('teacher',initialRoom));if(token)return{role:'teacher',room:initialRoom,token};}
 if(initialTeam){const token=localStorage.getItem(cacheKey('student',initialRoom,initialTeam));if(token)return{role:'student',room:initialRoom,teamId:initialTeam,token};}
 return null;
}
async function api(route,payload){
 if(typeof demoApi==='function')return demoApi(route,payload);
 let r;
 try{r=await fetch(route,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload||{})});}
 catch(e){throw new Error('Không kết nối được máy giáo viên. Hãy kiểm tra Wi-Fi hoặc máy chủ.');}
 let d=await r.json();
 if(!r.ok)throw new Error(d.error||'Đã xảy ra lỗi.');
 return d;
}
function btn(text,action,cls='primary',attr=''){return `<button type="button" class="button ${cls}" data-action="${action}" ${attr}>${esc(text)}</button>`;}
function layout(content){
 const role = session?.role || 'guest';
 const stg = world?.me?.stage ?? 0;
 const isStudent = role === 'student';
 const isTeacher = role === 'teacher';
 const isDisplay = role === 'display';
 const meName = world?.me?.name || (isTeacher ? 'Giáo Viên' : isDisplay ? 'Trình Chiếu' : 'Khách');
 const goldVal = (world?.me?.gold ?? 120).toLocaleString('vi-VN');

 if (isTeacher || isDisplay) {
  const isRunning = Boolean(world?.clock?.running && !world?.paused && !world?.ended);
  const statusText = world?.ended ? 'KẾT THÚC' : world?.paused ? 'TẠM DỪNG' : isRunning ? 'LIVE' : 'CHỜ BẮT ĐẦU';
  const statusCls = world?.ended ? 'ended' : world?.paused ? 'paused' : isRunning ? 'live' : 'ready';
  return `<nav class="navbar gv-topnav">
   <div class="gv-brand" data-action="scrollTop">
    ${DIAMOND_ICON_SVG}
    <span class="gv-brand-text">MATHVERSE <span class="gv-brand-oxyz">OXYZ</span></span>
   </div>
   <div class="gv-nav-title">
    ${isDisplay ? 'MÀN HÌNH TRÌNH CHIẾU LỚP HỌC · HÀNH TRÌNH 6 PHÚT' : 'TRUNG TÂM CHỈ HUY · GIÁO VIÊN'}
   </div>
   <div class="gv-nav-right">
    <span class="gv-room-pill">PHÒNG ${esc(world?.room || '123456')}</span>
    <span class="gv-live-pill ${statusCls}">${statusText}</span>
    ${isDisplay ? `<button type="button" class="mv-chip-btn" data-action="exitDisplayMode" title="Quay về Trung tâm chỉ huy">👩‍🏫 Chỉ huy</button>` : ''}
    <button type="button" class="mv-icon-btn" data-action="toggleSound" title="${soundEnabled ? 'Âm thanh: Bật' : 'Âm thanh: Tắt'}">${soundEnabled ? '🔊' : '🔇'}</button>
    <button type="button" class="mv-icon-btn" data-action="toggleFullscreen" title="Toàn màn hình">⛶</button>
    <button type="button" class="mv-icon-btn" data-action="openSettingsModal" title="Cài đặt & Đổi màn hình">⚙️</button>
   </div>
  </nav>${content}`;
 }

 return `<nav class="navbar hs-topnav">
  <div class="hs-brand" data-action="scrollTop" title="MATHVERSE OXYZ">
   ${DIAMOND_ICON_SVG}
   <span class="hs-brand-text">MATHVERSE <span class="hs-brand-oxyz">OXYZ</span></span>
  </div>
  <div class="hs-nav-center">
   <button type="button" class="hs-mode-pill ${!oxyz3D.open && !mvShowIntroHub && stg !== 1 && stg !== 2 ? 'active' : ''}" ${isStudent ? 'data-action="demoJumpStage" data-stage="0"' : 'data-action="scrollTop"'}>
    SĂN KHO BÁU 2D
   </button>
   <button type="button" class="hs-mode-pill ${isStudent && (stg === 1 || stg === 2) ? 'active' : ''}" ${isStudent ? 'data-action="demoJumpStage" data-stage="1"' : 'data-action="scrollTop"'}>
    THỦ THÀNH
   </button>
   <button type="button" class="hs-mode-pill ${oxyz3D.open ? 'active' : ''}" data-action="toggle3DPanel">
    3D OXYZ
   </button>
   ${isStudent ? `<button type="button" class="hs-mode-pill ${mvShowIntroHub ? 'active' : ''}" data-action="toggleIntroHub" title="Xem bản đồ tổng quan 5 vùng đất">BẢN ĐỒ LỤC ĐỊA</button>` : ''}
  </div>
  <div class="hs-nav-right">
   ${session && world?.clock ? `<span class="hs-master-clock-pill" title="Đồng hồ tổng của phòng (360 giây)">⏳ <b id="clock">06:00</b></span>` : ''}
   ${isStudent ? `<span class="hs-team-label">Đội: <b>${esc(meName)}</b></span>` : ''}
   ${isStudent && world?.me ? `<span class="hs-gold-pill"><b id="topGoldBadge">${goldVal}</b> VÀNG</span>` : ''}
   <button type="button" class="mv-icon-btn" data-action="toggleSound" title="${soundEnabled ? 'Âm thanh: Đang Bật' : 'Âm thanh: Đang Tắt'}">${soundEnabled ? '🔊' : '🔇'}</button>
   <button type="button" class="mv-icon-btn" data-action="toggleFullscreen" title="Toàn màn hình">⛶</button>
   ${session ? `<button type="button" class="mv-icon-btn" data-action="openSettingsModal" title="Cài đặt">⚙️</button>` : ''}
  </div>
 </nav>${content}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MÔ HÌNH HÌNH HỌC KHÔNG GIAN 3D OXYZ HOLOGRAM (INTERACTIVE 3D VIEWER)
   ═══════════════════════════════════════════════════════════════════════════ */
function project3DPoint(x,y,z,cx=195,cy=112,scale=19){
 const radYaw=oxyz3D.yaw*Math.PI/180;
 const radPitch=oxyz3D.pitch*Math.PI/180;
 // Hệ trục chuẩn Toán THPT: Ox hướng về phía trước-trái, Oy hướng sang phải, Oz hướng thẳng đứng lên
 const rx = -x*Math.sin(radYaw) + y*Math.cos(radYaw);
 const ry = -x*Math.cos(radYaw)*Math.sin(radPitch) - y*Math.sin(radYaw)*Math.sin(radPitch) + z*Math.cos(radPitch);
 return {
  sx: +(cx + rx*scale).toFixed(1),
  sy: +(cy - ry*scale).toFixed(1)
 };
}

function renderOxyz3D(m, forceOpen=false){
 const v3=m.visual3D||{
  title:'Mô hình Hệ trục tọa độ Oxyz',
  formula:'\\vec{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)',
  points:[{label:'A',coords:[1,2,3],color:'#38bdf8'},{label:'B',coords:[4,-2,3],color:'#facc15'}],
  vectors:[{from:[1,2,3],to:[4,-2,3],color:'#4ade80',label:'AB'}]
 };
 const hlAxis=m.challenge?.highlightAxis||'all';
 if(!oxyz3D.open && !forceOpen){
  return '';
 }
 const O=project3DPoint(0,0,0);
 const X=project3DPoint(4.6,0,0);
 const Y=project3DPoint(0,4.6,0);
 const Z=project3DPoint(0,0,4.2);

 // Vẽ lưới mặt phẳng đáy Oxy (z=0)
 let gridLines='';
 for(let g=-3;g<=4;g++){
  const p1=project3DPoint(g,-3,0), p2=project3DPoint(g,4,0);
  const p3=project3DPoint(-3,g,0), p4=project3DPoint(4,g,0);
  gridLines+=`<line x1="${p1.sx}" y1="${p1.sy}" x2="${p2.sx}" y2="${p2.sy}" stroke="rgba(148,163,184,0.14)" stroke-width="1"/>`;
  gridLines+=`<line x1="${p3.sx}" y1="${p3.sy}" x2="${p4.sx}" y2="${p4.sy}" stroke="rgba(148,163,184,0.14)" stroke-width="1"/>`;
 }

 // Vẽ đường gióng tọa độ của các điểm xuống mặt phẳng Oxy
 let projLines='';
 if(oxyz3D.showProj){
  (v3.points||[]).forEach(pt=>{
   const coords = Array.isArray(pt.coords) ? pt.coords : [Number(pt.x||0), Number(pt.y||0), Number(pt.z||0)];
   const [px,py,pz]=coords;
   const P=project3DPoint(px,py,pz);
   const Pxy=project3DPoint(px,py,0);
   const Px=project3DPoint(px,0,0);
   const Py=project3DPoint(0,py,0);
   projLines+=`
    <line x1="${P.sx}" y1="${P.sy}" x2="${Pxy.sx}" y2="${Pxy.sy}" stroke="${pt.color||'#38bdf8'}" stroke-width="1.3" stroke-dasharray="3 3" opacity="0.75"/>
    <line x1="${Pxy.sx}" y1="${Pxy.sy}" x2="${Px.sx}" y2="${Px.sy}" stroke="rgba(239,68,68,0.5)" stroke-width="1.1" stroke-dasharray="2 3"/>
    <line x1="${Pxy.sx}" y1="${Pxy.sy}" x2="${Py.sx}" y2="${Py.sy}" stroke="rgba(16,185,129,0.5)" stroke-width="1.1" stroke-dasharray="2 3"/>
    <circle cx="${Pxy.sx}" cy="${Pxy.sy}" r="2.5" fill="${pt.color||'#38bdf8'}" opacity="0.6"/>`;
  });
 }

 // Vẽ các Vectơ trong không gian 3D
 const vecSvg=(v3.vectors||[]).map(v=>{
  const vFrom = Array.isArray(v.from) ? v.from : [0, 0, 0];
  const vTo = Array.isArray(v.to) ? v.to : [0, 0, 0];
  const pFrom=project3DPoint(...vFrom);
  const pTo=project3DPoint(...vTo);
  const mx=((pFrom.sx+pTo.sx)/2).toFixed(1);
  const my=((pFrom.sy+pTo.sy)/2-7).toFixed(1);
  return `<g>
   <line x1="${pFrom.sx}" y1="${pFrom.sy}" x2="${pTo.sx}" y2="${pTo.sy}" stroke="${v.color||'#4ade80'}" stroke-width="3.2" marker-end="url(#arrow3d)"/>
   <text x="${mx}" y="${my}" fill="${v.color||'#4ade80'}" font-size="11" font-weight="900" text-anchor="middle" style="text-shadow:0 2px 4px #000">→${esc(v.label)}</text>
  </g>`;
 }).join('');

 // Vẽ các Điểm trong không gian 3D
 const ptsSvg=(v3.points||[]).map(pt=>{
  const coords = Array.isArray(pt.coords) ? pt.coords : [Number(pt.x||0), Number(pt.y||0), Number(pt.z||0)];
  const P=project3DPoint(...coords);
  const coordStr=`(${coords.join(';')})`;
  const rawLabel=String(pt.label||'');
  const displayLabel=rawLabel.includes('(')?rawLabel:`${rawLabel}${coordStr}`;
  return `<g>
   <circle cx="${P.sx}" cy="${P.sy}" r="5.5" fill="${pt.color||'#facc15'}" stroke="#fff" stroke-width="1.8"/>
   <text x="${P.sx+7}" y="${P.sy-6}" fill="#ffffff" font-size="11" font-weight="900" style="text-shadow:0 2px 4px #000">${esc(displayLabel)}</text>
  </g>`;
 }).join('');

 const wOx=hlAxis==='x'||hlAxis==='all'?3.2:1.8;
 const wOy=hlAxis==='y'||hlAxis==='all'?3.2:1.8;
 const wOz=hlAxis==='z'||hlAxis==='all'?3.2:1.8;

 return `<div style="padding:10px 16px;background:#090f1d;border-bottom:1px solid #1e293b">
  <div class="oxyz-hologram-box arwes-frame">
   <div class="arwes-scanner-line"></div>
   <div class="arwes-corner tl"></div><div class="arwes-corner tr"></div>
   <div class="arwes-corner bl"></div><div class="arwes-corner br"></div>
   <div class="oxyz-hologram-head">
    <div class="oxyz-hologram-title">🧊 MÔ HÌNH HÌNH HỌC 3D OXYZ TRỰC QUAN: ${esc(v3.title)}</div>
    <div class="oxyz-controls">
     <button type="button" class="oxyz-btn" data-action="rot3D" data-dir="left" title="Xoay góc nhìn sang trái">↺ Xoay Trái</button>
     <button type="button" class="oxyz-btn" data-action="rot3D" data-dir="right" title="Xoay góc nhìn sang phải">↻ Xoay Phải</button>
     <button type="button" class="oxyz-btn" data-action="rot3D" data-dir="pitch" title="Đổi góc nhìn cao/thấp">📐 Góc nghiêng</button>
     <button type="button" class="oxyz-btn" data-action="toggle3DProj">${oxyz3D.showProj?'📏 Ẩn đường gióng':'📏 Hiện đường gióng'}</button>
     <button type="button" class="oxyz-btn" data-action="toggle3DPanel">▲ Thu gọn</button>
    </div>
   </div>
   <div class="oxyz-canvas-wrap">
    <svg class="oxyz-svg" viewBox="0 0 400 195" preserveAspectRatio="xMidYMid meet">
     <defs>
      <marker id="arrow3d" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
       <path d="M 0 1 L 10 5 L 0 9 z" fill="#fde047"/>
      </marker>
      <marker id="axisX" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
       <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444"/>
      </marker>
      <marker id="axisY" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
       <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981"/>
      </marker>
      <marker id="axisZ" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
       <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8"/>
      </marker>
     </defs>
     ${gridLines}
     <!-- 3 Trục tọa độ Ox, Oy, Oz -->
     <line x1="${O.sx}" y1="${O.sy}" x2="${X.sx}" y2="${X.sy}" stroke="#ef4444" stroke-width="${wOx}" marker-end="url(#axisX)"/>
     <text x="${X.sx-10}" y="${X.sy+14}" fill="#f87171" font-size="12" font-weight="900">Ox</text>
     <line x1="${O.sx}" y1="${O.sy}" x2="${Y.sx}" y2="${Y.sy}" stroke="#10b981" stroke-width="${wOy}" marker-end="url(#axisY)"/>
     <text x="${Y.sx+6}" y="${Y.sy+4}" fill="#34d399" font-size="12" font-weight="900">Oy</text>
     <line x1="${O.sx}" y1="${O.sy}" x2="${Z.sx}" y2="${Z.sy}" stroke="#38bdf8" stroke-width="${wOz}" marker-end="url(#axisZ)"/>
     <text x="${Z.sx+6}" y="${Z.sy+4}" fill="#7dd3fc" font-size="12" font-weight="900">Oz</text>
     <circle cx="${O.sx}" cy="${O.sy}" r="3.2" fill="#ffffff"/>
     <text x="${O.sx-12}" y="${O.sy+12}" fill="#cbd5e1" font-size="10" font-weight="800">O</text>
     ${projLines}
     ${vecSvg}
     ${ptsSvg}
    </svg>
    <div class="oxyz-formula-card">
     <b>📐 Công thức Trọng tâm Chặng ${m.id}:</b>
     <div style="color:#e0f2fe;font-weight:800;background:rgba(255,255,255,.06);padding:6px 8px;border-radius:8px;margin:4px 0;font-family:monospace;font-size:12px">${esc(v3.formula)}</div>
     <div class="oxyz-legend">
      <span><i class="oxyz-dot" style="background:#ef4444"></i>Trục Ox (Hoành)</span>
      <span><i class="oxyz-dot" style="background:#10b981"></i>Trục Oy (Tung)</span>
      <span><i class="oxyz-dot" style="background:#38bdf8"></i>Trục Oz (Cao)</span>
     </div>
     <div style="margin-top:6px;font-size:11px;color:#93c5fd">💡 Bấm <b>Xoay Trái/Phải</b> để quan sát hình chiếu tọa độ trong không gian 3 chiều!</div>
    </div>
   </div>
  </div>
 </div>`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ĐỒ HỌA VECTOR SVG CHO QUÁI VẬT, LÂU ĐÀI & ĐỊA HÌNH 2D
   ═══════════════════════════════════════════════════════════════════════════ */
function renderMonsterSVG(type,fallbackIcon='👹'){
 const palettes={
  golem:['#10b981','#047857','#fef08a'],
  croc:['#06b6d4','#0e7490','#fde047'],
  hawk:['#f59e0b','#b45309','#fffbeb'],
  knight:['#60a5fa','#1d4ed8','#f87171'],
  gargoyle:['#a855f7','#6b21a8','#fde047'],
  titan:['#ef4444','#991b1b','#fef08a'],
  prism:['#38bdf8','#0284c7','#e0f2fe'],
  lich:['#c084fc','#581c87','#4ade80'],
  phoenix:['#fb923c','#c2410c','#fef08a'],
  minotaur:['#f87171','#7f1d1d','#fde047'],
  sphinx:['#facc15','#a16207','#38bdf8'],
  guardian:['#2dd4bf','#0f766e','#fef08a'],
  cerberus:['#f43f5e','#881337','#fde047'],
  wyvern:['#a78bfa','#4c1d95','#f43f5e'],
  overlord:['#ec4899','#831843','#facc15']
 };
 const [c1,c2,eye]=palettes[type]||['#f97316','#9a3412','#fef08a'];
 return `<svg viewBox="0 0 140 140" width="150" height="150" style="overflow:visible;filter:drop-shadow(0 12px 18px rgba(0,0,0,.65))">
  <defs>
   <radialGradient id="mg_${type}" cx="35%" cy="30%" r="70%">
    <stop offset="0%" stop-color="${c1}"/>
    <stop offset="100%" stop-color="${c2}"/>
   </radialGradient>
  </defs>
  <!-- Hào quang năng lượng dưới chân Boss -->
  <ellipse cx="70" cy="124" rx="48" ry="11" fill="rgba(0,0,0,0.45)" stroke="${c1}" stroke-width="2" stroke-dasharray="6 4"/>
  <!-- Sừng / Cánh năng lượng -->
  <path d="M 22 58 Q 8 24 38 36 Z" fill="${c1}" stroke="#fff" stroke-width="1.5"/>
  <path d="M 118 58 Q 132 24 102 36 Z" fill="${c1}" stroke="#fff" stroke-width="1.5"/>
  <!-- Thân giáp Boss -->
  <path d="M 34 52 C 34 26, 106 26, 106 52 L 112 98 C 112 114, 28 114, 28 98 Z" fill="url(#mg_${type})" stroke="#fde68a" stroke-width="3"/>
  <!-- Mắt phát sáng -->
  <polygon points="46,58 62,64 48,70" fill="${eye}"/>
  <polygon points="94,58 78,64 92,70" fill="${eye}"/>
  <!-- Lõi Tinh Thể Oxyz trước ngực -->
  <polygon points="70,74 82,88 70,102 58,88" fill="${eye}" stroke="#fff" stroke-width="1.5"/>
  <!-- Icon đặc trưng ở đỉnh đầu -->
  <text x="70" y="34" text-anchor="middle" font-size="26">${fallbackIcon}</text>
 </svg>`;
}

function renderCastleSVG(){
 return `<svg class="cd-castle-art" viewBox="0 0 120 145">
  <defs>
   <linearGradient id="castleWall" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#94a3b8"/>
    <stop offset="50%" stop-color="#475569"/>
    <stop offset="100%" stop-color="#1e293b"/>
   </linearGradient>
   <linearGradient id="castleGold" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fde047"/>
    <stop offset="100%" stop-color="#ca8a04"/>
   </linearGradient>
  </defs>
  <!-- Tháp trái & phải -->
  <rect x="8" y="42" width="26" height="95" rx="3" fill="url(#castleWall)" stroke="#cbd5e1" stroke-width="2"/>
  <rect x="86" y="42" width="26" height="95" rx="3" fill="url(#castleWall)" stroke="#cbd5e1" stroke-width="2"/>
  <polygon points="4,42 21,16 38,42" fill="#2563eb" stroke="#fde047" stroke-width="2"/>
  <polygon points="82,42 99,16 116,42" fill="#2563eb" stroke="#fde047" stroke-width="2"/>
  <!-- Thân chính Thành Trì -->
  <rect x="26" y="54" width="68" height="83" rx="4" fill="url(#castleWall)" stroke="#fde047" stroke-width="2.5"/>
  <!-- Tháp Đại Bác Laser Oxyz ở giữa -->
  <rect x="44" y="26" width="32" height="34" rx="4" fill="#334155" stroke="#38bdf8" stroke-width="2"/>
  <circle cx="60" cy="43" r="10" fill="#0284c7" stroke="#bae6fd" stroke-width="2.5"/>
  <circle cx="60" cy="43" r="4" fill="#fef08a"/>
  <!-- Cổng vòm Thành Trì -->
  <path d="M 44 137 L 44 102 C 44 86, 76 86, 76 102 L 76 137 Z" fill="#451a03" stroke="url(#castleGold)" stroke-width="3"/>
  <!-- Cờ hiệu Oxyz -->
  <line x1="60" y1="26" x2="60" y2="4" stroke="#fde047" stroke-width="2.5"/>
  <polygon points="60,5 86,12 60,19" fill="#ef4444"/>
 </svg>`;
}

function getTerrainSVG(theme,pathPts){
 let bgShapes='';
 const defs=`
  <defs>
   <linearGradient id="riverWater" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#0284c7"/>
    <stop offset="50%" stop-color="#38bdf8"/>
    <stop offset="100%" stop-color="#0369a1"/>
   </linearGradient>
   <linearGradient id="lavaRiver" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#991b1b"/>
    <stop offset="35%" stop-color="#dc2626"/>
    <stop offset="70%" stop-color="#f97316"/>
    <stop offset="100%" stop-color="#facc15"/>
   </linearGradient>
   <linearGradient id="manaStream" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#6366f1"/>
    <stop offset="50%" stop-color="#a855f7"/>
    <stop offset="100%" stop-color="#38bdf8"/>
   </linearGradient>
   <linearGradient id="bridgePlankGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#451a03"/>
    <stop offset="30%" stop-color="#78350f"/>
    <stop offset="70%" stop-color="#92400e"/>
    <stop offset="100%" stop-color="#451a03"/>
   </linearGradient>
  </defs>
  <rect class="va-svg-glass-plate" x="42" y="20" width="476" height="242" rx="18" fill="rgba(11, 18, 39, 0.56)" stroke="rgba(103, 232, 249, 0.38)" stroke-width="1.5"/>`;

 if(theme==='forest'){
  bgShapes=`
   ${defs}
   <!-- DÒNG SÔNG CỔ TỰ NHIÊN UỐN LƯỢN QUA LỤC ĐỊA -->
   <path d="M 510 0 C 535 180, 495 300, 516 410 C 538 520, 485 640, 520 820" fill="none" stroke="#14532d" stroke-width="90" stroke-linecap="round"/>
   <path d="M 510 0 C 535 180, 495 300, 516 410 C 538 520, 485 640, 520 820" fill="none" stroke="#b45309" stroke-width="78" stroke-opacity="0.32" stroke-linecap="round"/>
   <path d="M 510 0 C 535 180, 495 300, 516 410 C 538 520, 485 640, 520 820" fill="none" stroke="url(#riverWater)" stroke-width="62" stroke-linecap="round"/>
   <!-- Gợn sóng chuyển động lăn tăn -->
   <path d="M 510 0 C 535 180, 495 300, 516 410 C 538 520, 485 640, 520 820" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="4.5" stroke-dasharray="16 26" class="hw-river-flow" stroke-linecap="round"/>
   <!-- Nhánh suối nhỏ phía Đông -->
   <path d="M 516 410 Q 640 430 762 422 T 950 460" fill="none" stroke="#0284c7" stroke-width="26" stroke-opacity="0.65" stroke-linecap="round"/>
   <!-- Bụi hoa súng ven sông -->
   <circle cx="496" cy="180" r="9" fill="#15803d" stroke="#4ade80" stroke-width="1.5"/>
   <circle cx="538" cy="630" r="11" fill="#15803d" stroke="#4ade80" stroke-width="1.5"/>
   <!-- CẦU GỖ CỔ TÍCH CHÍNH TẠI ĐIỂM GIAO ĐƯỜNG MÒN (x=516, y=410, xoay 57 độ theo góc đường) -->
   <g transform="translate(516, 410) rotate(57)">
    <rect x="-62" y="-30" width="20" height="60" rx="5" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
    <rect x="42" y="-30" width="20" height="60" rx="5" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
    <rect x="-48" y="-26" width="96" height="52" rx="4" fill="url(#bridgePlankGrad)" stroke="#b45309" stroke-width="3" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.45))"/>
    <line x1="-38" y1="-26" x2="-38" y2="26" stroke="#261005" stroke-width="2.5"/>
    <line x1="-26" y1="-26" x2="-26" y2="26" stroke="#261005" stroke-width="2.5"/>
    <line x1="-14" y1="-26" x2="-14" y2="26" stroke="#261005" stroke-width="2.5"/>
    <line x1="-2"  y1="-26" x2="-2"  y2="26" stroke="#261005" stroke-width="2.5"/>
    <line x1="10"  y1="-26" x2="10"  y2="26" stroke="#261005" stroke-width="2.5"/>
    <line x1="22"  y1="-26" x2="22"  y2="26" stroke="#261005" stroke-width="2.5"/>
    <line x1="34"  y1="-26" x2="34"  y2="26" stroke="#261005" stroke-width="2.5"/>
    <!-- Lan can gỗ bảo vệ và đèn lồng mạ vàng -->
    <rect x="-50" y="-28" width="100" height="6" rx="2" fill="#d97706" stroke="#451a03" stroke-width="1.5"/>
    <rect x="-50" y="22"  width="100" height="6" rx="2" fill="#d97706" stroke="#451a03" stroke-width="1.5"/>
    <circle cx="-42" cy="-25" r="3.5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
    <circle cx="0"   cy="-25" r="3.5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
    <circle cx="42"  cy="-25" r="3.5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
    <circle cx="-42" cy="25"  r="3.5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
    <circle cx="0"   cy="25"  r="3.5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
    <circle cx="42"  cy="25"  r="3.5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
   </g>
   <!-- CẦU ĐÁ PHỤ TẠI NHÁNH SUỐI ĐÔNG (x=762, y=422, xoay -60 độ) -->
   <g transform="translate(762, 422) rotate(-60)">
    <rect x="-35" y="-20" width="70" height="40" rx="6" fill="#475569" stroke="#94a3b8" stroke-width="2.5"/>
    <rect x="-28" y="-16" width="56" height="32" rx="3" fill="#64748b" stroke="#cbd5e1" stroke-width="1.5"/>
    <circle cx="-25" cy="-18" r="3" fill="#38bdf8"/>
    <circle cx="25"  cy="-18" r="3" fill="#38bdf8"/>
    <circle cx="-25" cy="18"  r="3" fill="#38bdf8"/>
    <circle cx="25"  cy="18"  r="3" fill="#38bdf8"/>
   </g>`;
 }else if(theme==='fortress'){
  bgShapes=`
   ${defs}
   <!-- SÔNG DUNG NHAM NÚI LỬA NÓNG CHẢY -->
   <path d="M 510 0 C 490 200, 540 320, 516 410 C 490 510, 530 650, 510 820" fill="none" stroke="#0f172a" stroke-width="96" stroke-linecap="round"/>
   <path d="M 510 0 C 490 200, 540 320, 516 410 C 490 510, 530 650, 510 820" fill="none" stroke="#dc2626" stroke-width="82" stroke-opacity="0.45" stroke-linecap="round"/>
   <path d="M 510 0 C 490 200, 540 320, 516 410 C 490 510, 530 650, 510 820" fill="none" stroke="url(#lavaRiver)" stroke-width="64" stroke-linecap="round"/>
   <!-- Bọt lửa sôi sục -->
   <circle cx="505" cy="220" r="7" fill="#fef08a" opacity="0.9"/>
   <circle cx="530" cy="580" r="9" fill="#fef08a" opacity="0.9"/>
   <!-- CẦU THÉP NÚI LỬA CHỐNG NHIỆT OXYZ -->
   <g transform="translate(516, 410) rotate(57)">
    <rect x="-60" y="-28" width="120" height="56" rx="5" fill="#1e293b" stroke="#f97316" stroke-width="3" filter="drop-shadow(0 6px 12px rgba(249,115,22,0.35))"/>
    <line x1="-40" y1="-28" x2="40" y2="28" stroke="#facc15" stroke-width="2"/>
    <line x1="-40" y1="28" x2="40" y2="-28" stroke="#facc15" stroke-width="2"/>
    <circle cx="-45" cy="0" r="5" fill="#ef4444"/>
    <circle cx="45" cy="0" r="5" fill="#ef4444"/>
   </g>`;
 }else if(theme==='crystal'){
  bgShapes=`
   ${defs}
   <!-- DÒNG SÔNG NĂNG LƯỢNG ÁNH SÁNG TỰ NHIÊN -->
   <path d="M 510 0 C 530 200, 490 320, 516 410 C 540 520, 480 640, 515 820" fill="none" stroke="#1e1b4b" stroke-width="86" stroke-linecap="round"/>
   <path d="M 510 0 C 530 200, 490 320, 516 410 C 540 520, 480 640, 515 820" fill="none" stroke="url(#manaStream)" stroke-width="58" stroke-linecap="round"/>
   <path d="M 510 0 C 530 200, 490 320, 516 410 C 540 520, 480 640, 515 820" fill="none" stroke="#bae6fd" stroke-width="3" stroke-dasharray="14 24" class="hw-river-flow"/>
   <!-- CẦU PHA LÊ NĂNG LƯỢNG NGỌC BÍCH -->
   <g transform="translate(516, 410) rotate(57)">
    <rect x="-56" y="-26" width="112" height="52" rx="8" fill="rgba(30,27,75,0.85)" stroke="#38bdf8" stroke-width="3" filter="drop-shadow(0 0 16px rgba(56,189,248,0.5))"/>
    <polygon points="-40,-18 -20,-18 -30,-8" fill="#a855f7"/>
    <polygon points="20,-18 40,-18 30,-8" fill="#a855f7"/>
    <polygon points="-40,18 -20,18 -30,8" fill="#38bdf8"/>
    <polygon points="20,18 40,18 30,8" fill="#38bdf8"/>
   </g>`;
 }else if(theme==='maze'){
  bgShapes=`
   ${defs}
   <!-- HỆ THỐNG KÊNH NƯỚC CỔ MÊ CUNG HY LẠP -->
   <path d="M 516 0 L 516 820" fill="none" stroke="#042f2e" stroke-width="84"/>
   <path d="M 516 0 L 516 820" fill="none" stroke="#0d9488" stroke-width="56"/>
   <path d="M 516 0 L 516 820" fill="none" stroke="#5eead4" stroke-width="4" stroke-dasharray="24 20" class="hw-river-flow"/>
   <g transform="translate(516, 410) rotate(57)">
    <rect x="-55" y="-26" width="110" height="52" rx="4" fill="#134e4a" stroke="#2dd4bf" stroke-width="3"/>
    <circle cx="-42" cy="-20" r="4" fill="#99f6e4"/>
    <circle cx="42" cy="-20" r="4" fill="#99f6e4"/>
    <circle cx="-42" cy="20" r="4" fill="#99f6e4"/>
    <circle cx="42" cy="20" r="4" fill="#99f6e4"/>
   </g>`;
 }else{
  bgShapes=`
   ${defs}
   <!-- HÀO NƯỚC HOÀNG GIA BAO QUANH ĐIỆN THỜ -->
   <path d="M 510 0 C 530 200, 490 320, 516 410 C 540 520, 480 640, 515 820" fill="none" stroke="#2e1065" stroke-width="84" stroke-linecap="round"/>
   <path d="M 510 0 C 530 200, 490 320, 516 410 C 540 520, 480 640, 515 820" fill="none" stroke="#7c3aed" stroke-width="56" stroke-linecap="round"/>
   <g transform="translate(516, 410) rotate(57)">
    <rect x="-60" y="-28" width="120" height="56" rx="6" fill="#4c1d95" stroke="#facc15" stroke-width="3" filter="drop-shadow(0 6px 14px rgba(250,204,21,0.4))"/>
    <circle cx="-45" cy="0" r="6" fill="#facc15"/>
    <circle cx="45" cy="0" r="6" fill="#facc15"/>
   </g>`;
 }

 return `<svg class="hw-path-svg" viewBox="0 0 1200 820" preserveAspectRatio="none">
  ${bgShapes}
  <!-- NỀN ĐƯỜNG ĐẤT NỆN RỘNG RÃI -->
  <polyline points="${pathPts}" fill="none" stroke="rgba(15,23,42,0.85)" stroke-width="52" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- LỚP ĐÁ CUỘI LÁT ĐƯỜNG PHIÊU LƯU (COBBLESTONE TRAIL) -->
  <polyline points="${pathPts}" fill="none" stroke="rgba(113,113,122,0.72)" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- VIỀN CỎ VÀ HOA DẠI DỌC LỀ ĐƯỜNG -->
  <polyline points="${pathPts}" fill="none" stroke="rgba(63,63,70,0.52)" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- VẠCH CHỈ HƯỚNG DẠ QUANG VÀNG KIM CHÍNH GIỮA -->
  <polyline points="${pathPts}" fill="none" stroke="#facc15" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="16 16"/>
  <!-- ĐỐM NĂNG LƯỢNG OXYZ PHÁT SÁNG -->
  <polyline points="${pathPts}" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 32"/>
 </svg>`;
}


let mvShowIntroHub = false;

function renderIntroHubBanner(isStudentLogged = false) {
  const me = world?.me || {};
  const curStage = me.stage ?? 0;
  const sealsCount = (me.digits || []).length;
  const completedAll5 = curStage >= 5 || Boolean(me.completed);
  const hasAllSeals = sealsCount >= 5;
  const isCoreRestored = Boolean(me.completed);

  // 5 island hotspot left positions (%) matching "Hành Trình Giải Cứu Lục Địa OXYZ.png"
  const islandLefts = [27.5, 42.3, 56.9, 71.3, 85.0];
  const islandHotspots = [0, 1, 2, 3, 4].map(i => {
    const isDone = isStudentLogged && i < curStage;
    const isCur = isStudentLogged ? (i === curStage) : (i === 0);
    const badge = isDone ? '✅ Đã qua' : isCur ? '⭐ Đang mở' : '🔒 Chặng ' + (i + 1);
    const actionAttr = isStudentLogged
      ? `data-action="hubEnterStage" data-stage="${i}"`
      : `data-action="demoPlay" data-stage="${i}"`;
    return `<div class="mv-hub-hotspot-island ${isCur ? 'active-stage' : ''}" style="left:${islandLefts[i]}%" ${actionAttr} title="Nhấn để vào Chặng ${i + 1}: ${esc(missionMeta[i]?.place || '')}">
      <span class="mv-hub-badge-pip">${badge}</span>
    </div>`;
  }).join('');

  const startAction = isStudentLogged
    ? `data-action="hubStartCurrentStage"`
    : `data-action="demoPlay"`;

  // 4 bottom buttons on the artwork: Đội chơi (31.2%), Túi đồ (43.8%), Kiến thức (55.8%), Xếp hạng (67.2%)
  const bottomBtns = isStudentLogged ? `
    <button type="button" class="mv-hub-bottom-btn" style="left:31.2%" data-action="openTeamRoles" title="Đội chơi & Phân vai"></button>
    <button type="button" class="mv-hub-bottom-btn" style="left:43.8%" data-action="openCipherNotebook" title="Túi đồ & 5 Ấn Vectơ"></button>
    <button type="button" class="mv-hub-bottom-btn" style="left:55.8%" data-action="hubOpenKnowledge" title="Kiến thức & Công thức"></button>
    <button type="button" class="mv-hub-bottom-btn" style="left:67.2%" data-action="openFullLeaderboard" title="Bảng xếp hạng"></button>
  ` : `
    <button type="button" class="mv-hub-bottom-btn" style="left:31.2%" data-action="demoPlay" title="Vào Đội chơi ngay"></button>
    <button type="button" class="mv-hub-bottom-btn" style="left:43.8%" data-action="demoPlay" title="Mở Túi đồ"></button>
    <button type="button" class="mv-hub-bottom-btn" style="left:55.8%" data-action="demoPlay" title="Xem Kiến thức"></button>
    <button type="button" class="mv-hub-bottom-btn" style="left:67.2%" data-action="demoTeacher" title="Xem Bảng xếp hạng GV"></button>
  `;

  return `<div class="mv-intro-hub-showcase" role="region" aria-label="Giao diện Hành Trình Giải Cứu Lục Địa OXYZ">
    ${islandHotspots}
    <button type="button" class="mv-hub-start-btn" ${startAction} title="Bắt đầu Hành Trình Giải Cứu Lục Địa OXYZ!"></button>
    ${bottomBtns}
    ${isStudentLogged ? `
      <div class="mv-hub-live-goals">
        <div style="font-weight:900;color:#92400E;margin-bottom:2px">🎯 Mục tiêu (${sealsCount}/5 Ấn)</div>
        <div>${completedAll5 ? '☑️' : '⬜'} Hoàn thành 5 chặng (${Math.min(curStage, 5)}/5)</div>
        <div>${hasAllSeals ? '☑️' : '⬜'} Thu hồi 5 Ấn Vectơ (${sealsCount}/5)</div>
        <div>${isCoreRestored ? '☑️' : '⬜'} Khôi phục Tâm Thạch</div>
      </div>
    ` : ''}
  </div>`;
}

function startScreen(msg=''){
 const fRoom=esc(initialRoom),fTeam=esc(initialTeam);
 const demoBar=`<div class="demo-banner"><strong>🎮 CHẾ ĐỘ CHƠI THỬ & TRÌNH CHIẾU NHANH:</strong> ${btn('▶ BẮT ĐẦU HÀNH TRÌNH (ĐỘI RỒNG XANH)','demoPlay','teal')} ${btn('👩‍🏫 MÀN HÌNH GIÁO VIÊN','demoTeacher','gold')}<small>Nhấp trực tiếp vào nút "BẮT ĐẦU HÀNH TRÌNH" hoặc 5 Chặng trên giao diện bên dưới để vào game ngay!</small></div>`;
 app.innerHTML=layout(`
 ${demoBar}
 ${renderIntroHubBanner(false)}
 <div class="tabs"><button class="active" data-action="switch-tab" data-tab="teacher">👩‍🏫 Tạo phòng – Giáo viên</button><button data-action="switch-tab" data-tab="student">🧑‍🚀 Vào đội – Học sinh</button></div>
 ${msg?`<div class="notice error">${esc(msg)}</div>`:''}
 <section class="setup grid grid-2" id="entry"><div class="panel" data-tabbox="teacher"><div class="section-title"><h2>🎓 Phòng điều khiển Giáo viên</h2></div><p>Giáo viên tạo mã phòng, phát mã PIN cho 4–8 nhóm học sinh (3–5 HS/đội), chiếu Hành trình Giải cứu Lục địa OXYZ (6 phút) và theo dõi tiến độ thu hồi 5 Ấn Vectơ thời gian thực.</p><div class="form-field"><label>Số đội tham gia</label><select id="teamCount"><option value="4">4 đội</option><option value="5">5 đội</option><option value="6" selected>6 đội</option><option value="7">7 đội</option><option value="8">8 đội</option></select></div>${btn('✨ TẠO PHÒNG MATHVERSE (6 PHÚT)','create','primary block')}</div>
 <div class="panel" data-tabbox="student"><div class="section-title"><h2>🚀 Đăng nhập Đội Thám Hiểm</h2></div><p>Nhận mã phòng và mã PIN đội từ giáo viên để cùng Rồng Xanh vượt qua 5 vùng đất và khôi phục Tâm Thạch Vectơ!</p><div class="form-field"><label>Mã phòng 6 chữ số</label><input id="roomInput" type="text" inputmode="numeric" maxlength="6" class="mono" value="${fRoom}" placeholder="VD: 123456" /></div><div class="form-field"><label>Đội thám hiểm</label><select id="teamSelect">${Array.from({length:8},(_,i)=>`<option value="doi-${i+1}" ${fTeam===`doi-${i+1}`?'selected':''}>Đội ${i+1}</option>`).join('')}</select></div><div class="form-field"><label>Mã đội 4 chữ số</label><input id="teamCode" type="password" inputmode="numeric" maxlength="4" placeholder="Mã PIN của đội" /></div>${btn('🗝️ VÀO HÀNH TRÌNH NGAY','join','teal block')}</div></section>`);
}
function getStageFormulaSafe(stageIdx, currentTeamStage) {
 if (stageIdx === 0) {
  const unlocked = (session?.role === 'teacher') || (Number(currentTeamStage) >= 1) || Boolean(vaState?.s1BridgeRestoredOverlay);
  return unlocked
   ? '\\vec{AB} − \\vec{AC} = \\vec{CB}'
   : 'Bí mật Cây Cầu Đảo Chiều: \\vec{AB} − \\vec{AC} = ?';
 }
 return STAGE_FORMULAS_SHORT[stageIdx] || '';
}

/* ═══════════════════════════════════════════════════════════════════════════
   HỆ THỐNG RỒNG XANH DI CHUYỂN QUA 5 CHẶNG TRÊN BẢN ĐỒ LỤC ĐỊA OXYZ
   Modules:
   1. WORLD_STAGE_NODES & WORLD_ROUTES (Tọa độ chuẩn hóa 1000x560 & Đường cong Bézier)
   2. DragonCharacter (IDLE, RUN, FLY, LAND, CELEBRATE, TALK + Cánh vỗ + Bóng + Hạt sáng)
   3. DragonMovementController (Nội suy Bézier mượt 60fps, tự xoay hướng, vệt sáng)
   4. StageTransitionController (PLAYING -> STAGE_COMPLETED -> REWARD -> CELEBRATING -> MOVING -> ARRIVING -> STAGE_UNLOCKED -> PLAYING)
   5. AdventureMap (Bản đồ 5 vùng đất tương tác thật + Thẻ HUD góc trái + Thanh Dock 4 nút)
   ═══════════════════════════════════════════════════════════════════════════ */

const WORLD_STAGE_NODES = [
 {
  idx: 0,
  id: 1,
  key: 'stage1',
  numStr: '01',
  shortTitle: 'Hiệu vectơ',
  fullTitle: 'Rừng Vectơ Khởi Nguyên',
  topic: 'Hiệu hai vectơ',
  level: 'NHẬN BIẾT',
  levelCls: 'nb',
  taskSummary: 'Tìm 3 mảnh mật thư & giải mã vectơ còn thiếu.',
  rewardText: '+250 XP  +50 Vàng',
  sealName: 'Ấn Hướng Đi',
  img: '/assets/Stage_01_Rung_Vecto.png',
  position: { x: 148, y: 420 }
 },
 {
  idx: 1,
  id: 2,
  key: 'stage2',
  numStr: '02',
  shortTitle: 'Tổng vectơ',
  fullTitle: 'Pháo Đài Góc Vuông',
  topic: 'Tổng hai vectơ',
  level: 'NHẬN BIẾT',
  levelCls: 'nb',
  taskSummary: 'Nối thông hai đoạn vectơ liên tiếp AB và BC.',
  rewardText: '+250 XP  +50 Vàng',
  sealName: 'Ấn Kết Nối',
  img: '/assets/Stage_02_Phao_Dai.png',
  position: { x: 308, y: 292 }
 },
 {
  idx: 2,
  id: 3,
  key: 'stage3',
  numStr: '03',
  shortTitle: 'Hình bình hành',
  fullTitle: 'Tháp Pha Lê',
  topic: 'Quy tắc hình bình hành',
  level: 'NHẬN BIẾT',
  levelCls: 'nb',
  taskSummary: 'Khôi phục đường chéo hình bình hành ABCD.',
  rewardText: '+300 XP  +60 Vàng',
  sealName: 'Ấn Cân Bằng',
  img: '/assets/Stage_03_Thap_Pha_Le.png',
  position: { x: 468, y: 208 }
 },
 {
  idx: 3,
  id: 4,
  key: 'stage4',
  numStr: '04',
  shortTitle: 'Trung điểm',
  fullTitle: 'Mê Cung Trung Điểm',
  topic: 'Tính chất trung điểm',
  level: 'THÔNG HIỂU',
  levelCls: 'th',
  taskSummary: 'Đặt pha lê I tại trung điểm AB để cân bằng hai vectơ.',
  rewardText: '+350 XP  +75 Vàng',
  sealName: 'Ấn Cân Xứng',
  img: '/assets/Stage_04_Me_Cung.png',
  position: { x: 618, y: 365 }
 },
 {
  idx: 4,
  id: 5,
  key: 'stage5',
  numStr: '05',
  shortTitle: 'Trọng tâm',
  fullTitle: 'Thành Trì Lõi Trí Tuệ',
  topic: 'Tính chất trọng tâm',
  level: 'THÔNG HIỂU',
  levelCls: 'th',
  taskSummary: 'Hợp nhất 3 luồng năng lượng tại trọng tâm G.',
  rewardText: '+400 XP  +100 Vàng',
  sealName: 'Ấn Trí Tuệ',
  img: '/assets/Stage_05_Thanh_Tri.png',
  position: { x: 758, y: 205 }
 },
 {
  idx: 5,
  id: 6,
  key: 'heartStone',
  numStr: '💎',
  shortTitle: 'Tâm Thạch Vectơ',
  fullTitle: 'Đỉnh Thành Trì · Tâm Thạch Vectơ',
  topic: 'Khôi phục Tâm Thạch Lục Địa OXYZ',
  level: 'TÂM THẠCH',
  levelCls: 'core',
  taskSummary: 'Hợp nhất đủ 5 Ấn Vectơ để khôi phục Tâm Thạch!',
  rewardText: '+500 XP  Vinh Danh',
  sealName: 'Tâm Thạch Vectơ',
  img: '/assets/Stage_05_Thanh_Tri.png',
  position: { x: 758, y: 88 }
 }
];

const WORLD_ROUTES = {
 '0->1': {
  fromStage: 0,
  toStage: 1,
  p0: { x: 148, y: 420 },
  p1: { x: 215, y: 405 },
  p2: { x: 255, y: 342 },
  p3: { x: 308, y: 292 },
  runUntil: 0.42,
  flyUntil: 0.88
 },
 '1->2': {
  fromStage: 1,
  toStage: 2,
  p0: { x: 308, y: 292 },
  p1: { x: 362, y: 262 },
  p2: { x: 412, y: 220 },
  p3: { x: 468, y: 208 },
  runUntil: 0.38,
  flyUntil: 0.88
 },
 '2->3': {
  fromStage: 2,
  toStage: 3,
  p0: { x: 468, y: 208 },
  p1: { x: 525, y: 238 },
  p2: { x: 562, y: 332 },
  p3: { x: 618, y: 365 },
  runUntil: 0.36,
  flyUntil: 0.88
 },
 '3->4': {
  fromStage: 3,
  toStage: 4,
  p0: { x: 618, y: 365 },
  p1: { x: 678, y: 342 },
  p2: { x: 712, y: 255 },
  p3: { x: 758, y: 205 },
  runUntil: 0.40,
  flyUntil: 0.88
 },
 '4->5': {
  fromStage: 4,
  toStage: 5,
  p0: { x: 758, y: 205 },
  p1: { x: 738, y: 165 },
  p2: { x: 778, y: 125 },
  p3: { x: 758, y: 88 },
  runUntil: 0.26,
  flyUntil: 0.88
 }
};

// Mục 8: Lời thoại Rồng Xanh chuẩn kịch bản khi di chuyển giữa các chặng
const STAGE_TRANSITION_DIALOGUES = {
 '0->1': 'Giỏi lắm! Cây cầu đã hồi sinh! Cùng đến Pháo Đài Góc Vuông thôi!',
 '1->2': 'Cánh cổng đã mở! Tháp Pha Lê đang đợi chúng ta!',
 '2->3': 'Ba Ấn Vectơ đã được thu hồi! Hãy tìm điểm cân bằng!',
 '3->4': 'Chỉ còn một thử thách! Cả đội cùng tiến đến Thành Trì Trí Tuệ!',
 '4->5': 'Đủ 5 Ấn Vectơ rồi! Hãy bay lên đỉnh Thành Trì khôi phục Tâm Thạch Vectơ!'
};

const STAGE_ARRIVAL_DIALOGUES = {
 0: 'Cây cầu bị đảo chiều rồi! Hãy tìm 3 mảnh mật thư tại cột đá A, B, C để mở đường!',
 1: 'Đã tới cổng Pháo Đài Góc Vuông! Hai đoạn đường năng lượng đang rời nhau, hãy nối chúng lại!',
 2: 'Đã hạ cánh tại Tháp Pha Lê! Hai luồng sáng từ cùng một điểm sẽ tạo nên đường chéo chính!',
 3: 'Chào mừng tới Mê Cung Trung Điểm! Hãy đặt viên pha lê đúng chính giữa để hai vectơ cân bằng!',
 4: 'Thành Trì Lõi Trí Tuệ đây rồi! Hãy tìm Trọng tâm G để hợp nhất 3 luồng năng lượng!',
 5: 'Tâm Thạch Vectơ đã ở ngay trước mắt! Hãy kích hoạt đủ 5 Ấn Vectơ để giải cứu Lục địa OXYZ!'
};

// Trạng thái mở Bản đồ Thế giới 5 vùng đất (Mặc định hiển thị khi chuyển chặng hoặc khi bấm nút Bản đồ)
let mvWorldMapOpen = false;
let lastSyncedTeamStage = null;

const DragonCharacter = {
 STATES: ['IDLE', 'RUN', 'FLY', 'LAND', 'CELEBRATE', 'TALK'],

 getStatusLabel(animState, machineState) {
  if (machineState === 'REWARD' || animState === 'CELEBRATE') return '🎉 Nhận Ấn Vectơ & Ăn mừng!';
  if (animState === 'RUN') return '🏃 Rồng Xanh đang chạy trên đường ánh sáng...';
  if (animState === 'FLY') return '🪽 Rồng Xanh đang bay qua khoảng không đảo nổi...';
  if (animState === 'LAND') return '🛬 Rồng Xanh hạ cánh tại cổng chặng mới!';
  if (animState === 'TALK') return '💬 Rồng Xanh giao nhiệm vụ chặng mới!';
  return '🐉 Rồng Xanh sẵn sàng đồng hành';
 },

 render(opts = {}) {
  const xPct = (opts.x ?? 148) / 10;
  const yPct = ((opts.y ?? 420) / 560) * 100;
  const animState = this.STATES.includes(opts.animState) ? opts.animState : 'IDLE';
  const facing = opts.facing === 'left' ? 'left' : 'right';
  const speech = opts.speech || '';
  const showBubble = Boolean(speech && (opts.showBubble || animState !== 'IDLE'));
  const rewardTag = opts.rewardTag || '';

  return `<div id="mvWorldDragonActor"
    class="dragon-actor dragon-state-${animState} dragon-facing-${facing}"
    data-dragon-state="${animState}"
    style="left:${xPct.toFixed(2)}%;top:${yPct.toFixed(2)}%">
    <!-- Bóng đổ dưới chân (co giãn khi chạy / thu nhỏ khi bay) -->
    <div class="dragon-ground-shadow"></div>
    <!-- Vòng sóng ánh sáng khi hạ cánh (LAND) hoặc mở cổng -->
    <div class="dragon-landing-ring"></div>
    <!-- Hạt bụi vàng & dấu chân năng lượng khi chạy (RUN) -->
    <div class="dragon-run-dust" aria-hidden="true">
     <span class="dust-p p1"></span>
     <span class="dust-p p2"></span>
     <span class="dust-p p3"></span>
     <span class="dust-paw">🐾</span>
    </div>
    <!-- Hạt sao lấp lánh & luồng gió khi bay (FLY / CELEBRATE) -->
    <div class="dragon-fly-stars" aria-hidden="true">
     <span class="star-p s1">✦</span>
     <span class="star-p s2">★</span>
     <span class="star-p s3">✧</span>
     <span class="star-p s4">✨</span>
    </div>
    <!-- Khung nhân vật Rồng Xanh có cánh vỗ SVG + Sprite động -->
    <div class="dragon-body-rig">
     <svg class="dragon-wings-svg" viewBox="0 0 120 76" aria-hidden="true">
      <defs>
       <linearGradient id="drgWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#34D399"/>
        <stop offset="55%" stop-color="#10B981"/>
        <stop offset="100%" stop-color="#059669"/>
       </linearGradient>
      </defs>
      <path class="dragon-wing-left" d="M 54 44 C 34 12, 10 8, 4 28 C 12 36, 24 44, 14 58 C 28 54, 42 50, 54 46 Z" fill="url(#drgWingGrad)" stroke="#A7F3D0" stroke-width="1.8"/>
      <path class="dragon-wing-right" d="M 66 44 C 86 12, 110 8, 116 28 C 108 36, 96 44, 106 58 C 92 54, 78 50, 66 46 Z" fill="url(#drgWingGrad)" stroke="#A7F3D0" stroke-width="1.8"/>
     </svg>
     <img src="/assets/RongXanh.png" alt="Rồng Xanh" class="dragon-actor-img" draggable="false"/>
    </div>
    ${rewardTag ? `<div class="dragon-reward-floater" id="mvDragonRewardFloater">${esc(rewardTag)}</div>` : `<div class="dragon-reward-floater" id="mvDragonRewardFloater" style="display:none"></div>`}
    <div class="dragon-speech-cloud ${showBubble ? 'visible' : ''}" id="mvWorldDragonBubble">
     <span id="mvWorldDragonBubbleText">${formatMath(speech)}</span>
    </div>
   </div>`;
 }
};

const DragonMovementController = {
 x: 148,
 y: 420,
 facing: 'right',
 animState: 'IDLE',
 activeRouteKey: null,
 routeProgress: 0,
 rafId: null,
 trailParticles: [],

 evalCubicBezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
  const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;
  // Đạo hàm bậc 1 để xác định hướng di chuyển (tangent vector)
  const tx = 3 * uu * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * tt * (p3.x - p2.x);
  const ty = 3 * uu * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * tt * (p3.y - p2.y);
  return { x, y, tx, ty };
 },

 snapToStage(stageIdx, animState = 'IDLE') {
  const safeIdx = Math.max(0, Math.min(WORLD_STAGE_NODES.length - 1, Number(stageIdx) || 0));
  const node = WORLD_STAGE_NODES[safeIdx] || WORLD_STAGE_NODES[0];
  this.x = node.position.x;
  this.y = node.position.y;
  this.animState = animState;
  this.facing = 'right';
  this.activeRouteKey = null;
  this.routeProgress = 0;
  this.syncActorDOM();
 },

 syncActorDOM(extra = {}) {
  const actor = document.getElementById('mvWorldDragonActor');
  if (actor) {
   const xPct = (this.x / 10).toFixed(2);
   const yPct = ((this.y / 560) * 100).toFixed(2);
   actor.style.left = xPct + '%';
   actor.style.top = yPct + '%';
   actor.dataset.dragonState = this.animState;
   DragonCharacter.STATES.forEach(st => actor.classList.toggle('dragon-state-' + st, st === this.animState));
   actor.classList.toggle('dragon-facing-left', this.facing === 'left');
   actor.classList.toggle('dragon-facing-right', this.facing !== 'left');
  }

  // Cập nhật bong bóng thoại trên đầu Rồng Xanh
  const bubble = document.getElementById('mvWorldDragonBubble');
  const bubbleText = document.getElementById('mvWorldDragonBubbleText');
  if (bubble && bubbleText && extra.speech !== undefined) {
   if (extra.speech) {
    bubbleText.innerHTML = formatMath(extra.speech);
    bubble.classList.add('visible');
   } else {
    bubble.classList.remove('visible');
   }
  }

  // Cập nhật huy hiệu phần thưởng bay lên
  const rwEl = document.getElementById('mvDragonRewardFloater');
  if (rwEl && extra.rewardTag !== undefined) {
   if (extra.rewardTag) {
    rwEl.textContent = extra.rewardTag;
    rwEl.style.display = 'inline-flex';
   } else {
    rwEl.style.display = 'none';
   }
  }

  // Cập nhật đường nối Bézier phát sáng theo tiến độ di chuyển
  if (this.activeRouteKey) {
   const progPath = document.getElementById('mvRouteActiveGlow-' + this.activeRouteKey);
   if (progPath) {
    const pct = Math.max(0, Math.min(100, Math.round(this.routeProgress * 100)));
    progPath.style.strokeDasharray = `${pct} 100`;
    progPath.style.opacity = '1';
   }
  }

  // Cập nhật thanh trạng thái trên thẻ góc trái
  const hudStateEl = document.getElementById('mvAdvHudStatusText');
  if (hudStateEl) {
   hudStateEl.textContent = DragonCharacter.getStatusLabel(this.animState, StageTransitionController.state);
  }
 },

 spawnStepParticle(x, y, mode) {
  const layer = document.getElementById('mvDragonTrailLayer');
  if (!layer) return;
  const dot = document.createElement('span');
  dot.className = mode === 'FLY' ? 'adv-trail-particle star' : 'adv-trail-particle dust';
  dot.style.left = (x / 10).toFixed(2) + '%';
  dot.style.top = ((y / 560) * 100).toFixed(2) + '%';
  dot.textContent = mode === 'FLY' ? '✦' : '•';
  layer.appendChild(dot);
  setTimeout(() => dot.remove(), 950);
 }
};

const StageTransitionController = {
 // Máy trạng thái chuẩn Mục 5:
 // PLAYING -> STAGE_COMPLETED -> REWARD -> CELEBRATING -> MOVING -> ARRIVING -> STAGE_UNLOCKED -> PLAYING
 state: 'PLAYING',
 fromStage: 0,
 toStage: 0,
 speech: '',
 rewardTag: '',
 transitionId: null,
 timers: [],
 lastParticleAt: 0,

 isTransitioning() {
  return this.state !== 'PLAYING';
 },

 clearAllTimers() {
  this.timers.forEach(t => clearTimeout(t));
  this.timers = [];
  if (DragonMovementController.rafId) {
   cancelAnimationFrame(DragonMovementController.rafId);
   DragonMovementController.rafId = null;
  }
 },

 syncServerDragonState(state, moveMode, fromStage, toStage) {
  if (!session?.room || !session?.token || session?.role !== 'student') return;
  api('/api/dragonState', {
   room: session.room,
   token: session.token,
   state,
   moveMode,
   fromStage,
   toStage,
   transitionId: this.transitionId
  }).catch(() => {});
 },

 /**
  * Kích hoạt chuỗi hoạt cảnh Rồng Xanh di chuyển thực sự trên bản đồ từ fromStage -> toStage
  * Thời lượng tổng cộng ~3.4 giây (nằm gọn trong 2–4 giây theo Mục 6, không cộng thêm giờ tổng)
  */
 beginStageTransition(fromStageIdx, toStageIdx, rewardData = {}, options = {}) {
  const fromIdx = Math.max(0, Math.min(4, Number(fromStageIdx) || 0));
  const toIdx = Math.max(1, Math.min(5, Number(toStageIdx) || (fromIdx + 1)));
  const routeKey = `${fromIdx}->${toIdx}`;
  const route = WORLD_ROUTES[routeKey] || WORLD_ROUTES['0->1'];

  this.clearAllTimers();
  this.fromStage = fromIdx;
  this.toStage = toIdx;
  this.transitionId = `tr_${fromIdx}_${toIdx}_${Date.now()}`;
  lastSyncedTeamStage = toIdx;

  // Mở ngay Bản đồ Thế giới 5 vùng đất để người chơi thấy Rồng Xanh di chuyển thật
  mvWorldMapOpen = true;
  mvShowIntroHub = false;

  const sealName = rewardData.sealName || WORLD_STAGE_NODES[fromIdx]?.sealName || ('Ấn Chặng ' + (fromIdx + 1));
  const pts = rewardData.points || 10;
  const gold = rewardData.goldEarned || 50;
  const moveSpeech = STAGE_TRANSITION_DIALOGUES[routeKey] || 'Cùng tiến sang vùng đất tiếp theo thôi!';
  const arrivalSpeech = STAGE_ARRIVAL_DIALOGUES[toIdx] || 'Chặng mới đã mở khóa! Hãy bắt đầu nhiệm vụ!';

  // 1. STAGE_COMPLETED & 2. REWARD (0ms -> 400ms): Xuất hiện tại vị trí chặng vừa hoàn thành & Nhận thưởng
  this.state = 'STAGE_COMPLETED';
  this.rewardTag = `🏅 +${pts} XP · +${gold} Vàng · ${sealName}`;
  this.speech = moveSpeech;
  DragonMovementController.snapToStage(fromIdx, 'CELEBRATE');
  render();

  this.timers.push(setTimeout(() => {
   this.state = 'REWARD';
   sound('coin');
   DragonMovementController.syncActorDOM({
    speech: this.speech,
    rewardTag: this.rewardTag
   });
  }, 160));

  // 3. CELEBRATING (400ms -> 950ms): Thực hiện hoạt ảnh vui mừng tại chặng vừa qua
  this.timers.push(setTimeout(() => {
   this.state = 'CELEBRATING';
   DragonMovementController.animState = 'CELEBRATE';
   this.syncServerDragonState('CELEBRATING', 'CELEBRATE', fromIdx + 1, toIdx + 1);
   DragonMovementController.syncActorDOM({
    speech: this.speech,
    rewardTag: this.rewardTag
   });
   if (vaState) vaState.dragonMsg = this.speech;
   const sideBubble = document.getElementById('vaDragonSpeech');
   if (sideBubble) sideBubble.innerHTML = '“' + formatMath(this.speech) + '”';
  }, 400));

  // 4, 5, 6. MOVING (950ms -> 2650ms, 1700ms nội suy mượt):
  // - Chạy (RUN) theo con đường ánh sáng trên đảo
  // - Tới vực đứt đoạn giữa các đảo chuyển sang bay (FLY)
  // - Bay theo đường cong Bézier tới cổng chặng tiếp theo
  this.timers.push(setTimeout(() => {
   this.state = 'MOVING';
   this.rewardTag = '';
   DragonMovementController.activeRouteKey = routeKey;
   DragonMovementController.routeProgress = 0;
   const moveStart = performance.now();
   const moveDuration = 1700; // 1.7s di chuyển mượt trên bản đồ
   let sentFlySync = false;

   this.syncServerDragonState('MOVING', 'RUN', fromIdx + 1, toIdx + 1);
   sound('boost');

   const stepFrame = (now) => {
    const rawT = Math.min(1, Math.max(0, (now - moveStart) / moveDuration));
    // Ease-in-out mượt mà
    const easedT = rawT < 0.5
     ? 2 * rawT * rawT
     : 1 - Math.pow(-2 * rawT + 2, 2) / 2;

    const pt = DragonMovementController.evalCubicBezier(route.p0, route.p1, route.p2, route.p3, easedT);
    DragonMovementController.x = pt.x;
    DragonMovementController.y = pt.y;
    DragonMovementController.routeProgress = easedT;
    DragonMovementController.facing = pt.tx < -2 ? 'left' : 'right';

    if (easedT < route.runUntil) {
     DragonMovementController.animState = 'RUN';
    } else if (easedT < route.flyUntil) {
     DragonMovementController.animState = 'FLY';
     if (!sentFlySync) {
      sentFlySync = true;
      this.syncServerDragonState('MOVING', 'FLY', fromIdx + 1, toIdx + 1);
      sound('portal');
     }
    } else {
     DragonMovementController.animState = 'LAND';
    }

    if (now - this.lastParticleAt > 85) {
     this.lastParticleAt = now;
     DragonMovementController.spawnStepParticle(pt.x, pt.y, DragonMovementController.animState);
    }

    DragonMovementController.syncActorDOM({
     speech: this.speech,
     rewardTag: ''
    });

    if (rawT < 1) {
     DragonMovementController.rafId = requestAnimationFrame(stepFrame);
    } else {
     DragonMovementController.rafId = null;
     this.onArriveAtDestination(fromIdx, toIdx, arrivalSpeech, options);
    }
   };

   DragonMovementController.rafId = requestAnimationFrame(stepFrame);
  }, 950));
 },

 // 7. ARRIVING -> 8. TALK -> 9. STAGE_UNLOCKED -> 10. PLAYING
 onArriveAtDestination(fromIdx, toIdx, arrivalSpeech, options = {}) {
  this.state = 'ARRIVING';
  DragonMovementController.snapToStage(toIdx, 'LAND');
  this.speech = arrivalSpeech;
  this.syncServerDragonState('ARRIVING', 'LAND', fromIdx + 1, toIdx + 1);
  sound('powerup');

  // Hiệu ứng mở khóa đảo đích
  const targetIsland = document.getElementById('advIslandNode-' + toIdx);
  if (targetIsland) {
   targetIsland.classList.remove('locked');
   targetIsland.classList.add('current', 'just-unlocked');
  }

  DragonMovementController.syncActorDOM({
   speech: arrivalSpeech,
   rewardTag: toIdx === 5 ? '💎 Khôi phục Tâm Thạch!' : `🔓 Mở khóa Chặng ${toIdx + 1}!`
  });

  // 8 & 9. STAGE_UNLOCKED + TALK (sau 380ms hạ cánh)
  this.timers.push(setTimeout(() => {
   this.state = 'STAGE_UNLOCKED';
   DragonMovementController.animState = 'TALK';
   if (vaState) vaState.dragonMsg = arrivalSpeech;
   const sideBubble = document.getElementById('vaDragonSpeech');
   if (sideBubble) sideBubble.innerHTML = '“' + formatMath(arrivalSpeech) + '”';
   DragonMovementController.syncActorDOM({
    speech: arrivalSpeech,
    rewardTag: toIdx === 5 ? '💎 Tâm Thạch Vectơ đã mở!' : `✨ Chặng ${toIdx + 1} sẵn sàng!`
   });
  }, 380));

  // 10. Chuyển sang PLAYING và bắt đầu nhiệm vụ chặng mới (sau 1150ms kể từ lúc hạ cánh -> tổng ~3.4s)
  this.timers.push(setTimeout(() => {
   this.state = 'PLAYING';
   this.rewardTag = '';
   DragonMovementController.animState = 'IDLE';
   this.syncServerDragonState('PLAYING', 'IDLE', toIdx + 1, toIdx + 1);
   if (!options.stayOnMap) {
    mvWorldMapOpen = false;
   }
   updateAfterAction();
  }, 1150));
 }
};

const AdventureMap = {
 render(currentStageIdx = 0) {
  const me = world?.me || {};
  const stageVal = Math.max(0, Math.min(5, Number(currentStageIdx) ?? 0));
  const isMoving = StageTransitionController.isTransitioning();

  // Nếu không trong quá trình di chuyển, đặt Rồng Xanh đứng tại đúng chặng hiện tại
  if (!isMoving) {
   const targetNode = WORLD_STAGE_NODES[stageVal] || WORLD_STAGE_NODES[0];
   DragonMovementController.x = targetNode.position.x;
   DragonMovementController.y = targetNode.position.y;
   DragonMovementController.animState = 'IDLE';
   DragonMovementController.facing = 'right';
  }

  const activeNodeIdx = isMoving ? StageTransitionController.toStage : stageVal;
  const hudNode = WORLD_STAGE_NODES[Math.min(5, activeNodeIdx)] || WORLD_STAGE_NODES[0];
  const defaultSpeech = isMoving
   ? StageTransitionController.speech
   : (STAGE_ARRIVAL_DIALOGUES[stageVal] || 'Hãy nhấn Bắt đầu để thực hiện nhiệm vụ tại vùng đất này!');

  // Vẽ các đường nối Bézier phát sáng giữa 5 đảo và Tâm Thạch
  const routesSvgHtml = Object.entries(WORLD_ROUTES).map(([rKey, r]) => {
   const dPath = `M ${r.p0.x} ${r.p0.y} C ${r.p1.x} ${r.p1.y}, ${r.p2.x} ${r.p2.y}, ${r.p3.x} ${r.p3.y}`;
   const isPassed = (!isMoving && r.toStage <= stageVal) || (isMoving && r.toStage <= StageTransitionController.fromStage);
   const isCurrentMove = isMoving && DragonMovementController.activeRouteKey === rKey;
   return `<g class="adv-route-group ${isPassed ? 'passed' : ''} ${isCurrentMove ? 'moving' : ''}">
    <!-- Hào quang nền đường bay / cầu ánh sáng -->
    <path d="${dPath}" fill="none" stroke="rgba(14, 165, 233, 0.28)" stroke-width="18" stroke-linecap="round"/>
    <!-- Đường đá / cầu năng lượng chính -->
    <path d="${dPath}" fill="none" stroke="${isPassed ? 'rgba(250, 204, 21, 0.88)' : 'rgba(148, 163, 184, 0.42)'}" stroke-width="9" stroke-linecap="round"/>
    <!-- Vạch chấm sáng dẫn đường như ảnh tham chiếu -->
    <path d="${dPath}" fill="none" stroke="${isPassed ? '#FEF08A' : '#E2E8F0'}" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 16" class="adv-route-dots"/>
    <!-- Luồng sáng tiến trình khi Rồng Xanh đang chạy/bay qua -->
    <path id="mvRouteActiveGlow-${rKey}" d="${dPath}" pathLength="100" fill="none" stroke="#36DEF4" stroke-width="10" stroke-linecap="round" style="stroke-dasharray:${isPassed ? '100 100' : '0 100'};opacity:${isPassed || isCurrentMove ? '1' : '0'};filter:drop-shadow(0 0 8px #36DEF4)"/>
   </g>`;
  }).join('');

  // Vẽ 5 vùng đất (Đảo nổi 1..5) + Đỉnh Tâm Thạch Vectơ
  const islandsHtml = WORLD_STAGE_NODES.map((nd, idx) => {
   if (idx === 5) {
    // Tâm Thạch Vectơ trên đỉnh Thành Trì
    const heartUnlocked = stageVal >= 5 || Boolean(me.completed);
    return `<div id="advIslandNode-5"
      class="adv-heartstone-node ${heartUnlocked ? 'unlocked' : 'locked'}"
      style="left:${(nd.position.x / 10).toFixed(2)}%;top:${((nd.position.y / 560) * 100).toFixed(2)}%"
      data-action="advClickIsland" data-stage="5"
      title="Tâm Thạch Vectơ — Khôi phục khi thu hồi đủ 5 Ấn Vectơ">
      <div class="adv-heartstone-orb">💎</div>
      <span class="adv-heartstone-tag">TÂM THẠCH VECTƠ</span>
     </div>`;
   }

   const isDone = isMoving
    ? (idx <= StageTransitionController.fromStage)
    : (idx < stageVal || Boolean(me.completed));
   const isCurrent = isMoving
    ? (idx === StageTransitionController.toStage)
    : (idx === stageVal && !me.completed);
   const stateCls = isDone ? 'done' : isCurrent ? 'current' : 'locked';
   const xPct = (nd.position.x / 10).toFixed(2);
   const yPct = ((nd.position.y / 560) * 100).toFixed(2);
   const safeFormula = getStageFormulaSafe(idx, stageVal);

   return `<div id="advIslandNode-${idx}"
     class="adv-island-node ${stateCls}"
     style="left:${xPct}%;top:${yPct}%"
     data-action="advClickIsland"
     data-stage="${idx}"
     title="Chặng ${nd.id}: ${esc(nd.fullTitle)} (${esc(nd.topic)})">
     <!-- Tooltip chi tiết khi hover -->
     <div class="mv-island-tooltip">
      <b style="color:#FFC953">Chặng ${nd.id}: ${esc(nd.fullTitle)}</b><br/>
      <span style="color:#A5F3FC">📐 ${formatMath(safeFormula)}</span><br/>
      <small style="color:#CBD5E1">🏅 Ấn: ${esc(nd.sealName)} · ${esc(nd.rewardText)}</small>
     </div>

     <!-- Hình thu nhỏ hòn đảo & công trình đặc trưng từng chặng -->
     <div class="adv-island-art-wrap">
      <img src="${nd.img}" alt="Chặng ${nd.id}" class="adv-island-art-img" draggable="false"/>
      <span class="adv-island-seal-gem">${isDone ? '✨' : isCurrent ? '🔮' : '🔒'}</span>
     </div>

     <!-- Bảng tên rút gọn: Số chặng + Tên rút gọn (1. Hiệu vectơ .. 5. Trọng tâm) -->
     <div class="adv-island-banner">
      <span class="adv-island-num">${nd.id}</span>
      <strong class="adv-island-title">${esc(nd.shortTitle)}</strong>
     </div>

     <!-- Nhãn mức độ: NHẬN BIẾT / THÔNG HIỂU -->
     <div class="adv-island-level ${nd.levelCls}">${nd.level}</div>

     <!-- Bệ cổng dịch chuyển dưới chân đảo (Dấu ✓ xanh lá khi hoàn thành, vòng sáng vàng khi đang mở) -->
     <div class="adv-portal-pad ${stateCls}">
      ${isDone ? '<span class="adv-portal-check">✓</span>' : isCurrent ? '<span class="adv-portal-beacon"></span>' : '<span class="adv-portal-lock">🔒</span>'}
     </div>
    </div>`;
  }).join('');

  return `<div class="adv-world-map-container" id="mvAdventureWorldMap">
   <div class="adv-world-map-viewport" style="background-image: linear-gradient(180deg, rgba(6, 18, 38, 0.18), rgba(6, 18, 38, 0.42)), url('/assets/World_Map_Oxyz.jpg')">
    <!-- Thẻ HUD Góc Trên Trái giống hệt ảnh tham chiếu -->
    <div class="adv-top-left-hud">
     <div class="adv-hud-head">
      <div class="adv-hud-scroll-icon">📜</div>
      <div>
       <div class="adv-hud-kicker">CHẶNG HIỆN TẠI</div>
       <div class="adv-hud-stage-name">${esc(hudNode.numStr)}. ${esc(hudNode.shortTitle)}</div>
      </div>
     </div>
     <div class="adv-hud-row">
      <span>🎯 <b>Nhiệm vụ:</b> ${esc(hudNode.taskSummary)}</span>
     </div>
     <div class="adv-hud-row">
      <span>🎁 <b>Thưởng:</b> <b style="color:#35C992">${esc(hudNode.rewardText)}</b> · <b style="color:#FFC953">${esc(hudNode.sealName)}</b></span>
     </div>
     <div class="adv-hud-live-state" id="mvAdvHudStatusText">
      ${esc(DragonCharacter.getStatusLabel(DragonMovementController.animState, StageTransitionController.state))}
     </div>
    </div>

    <!-- Nút điều khiển nhanh Góc Trên Phải bản đồ -->
    <div class="adv-top-right-controls">
     <button type="button" class="adv-mini-action-btn" data-action="advTriggerDragonMove" title="Xem hoạt cảnh Rồng Xanh chạy & bay qua các đảo">
      🐉 Di chuyển Rồng Xanh
     </button>
     <button type="button" class="adv-mini-action-btn primary" data-action="advStartCurrentMission" title="Mở màn chơi nhiệm vụ của chặng hiện tại">
      ▶ Vào Nhiệm Vụ Chặng ${Math.min(5, stageVal + 1)}
     </button>
    </div>

    <!-- Lớp SVG Đường đi ánh sáng, Cầu năng lượng & Đường bay qua các đảo nổi (viewBox 1000x560) -->
    <svg id="mvWorldRoutesSvg" class="adv-routes-svg" viewBox="0 0 1000 560" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
     ${routesSvgHtml}
    </svg>

    <!-- Lớp Hạt bụi sáng & Hạt sao trên đường di chuyển -->
    <div id="mvDragonTrailLayer" class="adv-trail-layer" aria-hidden="true"></div>

    <!-- 5 Vùng Đất Liên Kết + Tâm Thạch Vectơ -->
    <div class="adv-islands-layer">
     ${islandsHtml}
    </div>

    <!-- Nhân Vật Rồng Xanh Di Chuyển Thực Sự Trên Bản Đồ -->
    ${DragonCharacter.render({
     x: DragonMovementController.x,
     y: DragonMovementController.y,
     animState: DragonMovementController.animState,
     facing: DragonMovementController.facing,
     speech: defaultSpeech,
     showBubble: true,
     rewardTag: StageTransitionController.rewardTag
    })}
   </div>

   <!-- Thanh Dock 4 Nút Dưới Cùng Chuẩn Bố Cục Ảnh Tham Chiếu -->
   <div class="adv-bottom-dock">
    <button type="button" class="adv-dock-btn ${mvWorldMapOpen ? 'active' : ''}" data-action="toggleWorldMap">
     <span class="adv-dock-icon">🗺️</span>
     <span>Bản đồ Lục địa OXYZ</span>
    </button>
    <button type="button" class="adv-dock-btn ${!mvBriefingCollapsed ? 'active' : ''}" data-action="toggleBriefing">
     <span class="adv-dock-icon">📜</span>
     <span>Nhiệm vụ</span>
     <i class="adv-dock-badge">!</i>
    </button>
    <button type="button" class="adv-dock-btn start-cta" data-action="advStartCurrentMission">
     <span class="adv-dock-play-icon">▶</span>
     <span>Bắt đầu</span>
    </button>
    <button type="button" class="adv-dock-btn" data-action="advTriggerDragonMove" title="Kích hoạt Rồng Xanh di chuyển tới chặng tiếp theo">
     <span class="adv-dock-icon">≫</span>
     <span>Di chuyển tới chặng</span>
    </button>
   </div>
  </div>`;
 }
};

function mapTrack(stage){
 const isStudent = session?.role === 'student';
 const curStageIdx = stage === -1 ? 0 : Math.max(0, Math.min(4, Number(stage) || 0));
 const isMoving = StageTransitionController.isTransitioning();
 const moveBadge = isMoving
  ? `<span class="hs-map-dragon-live moving">🐉 Rồng Xanh đang bay: Chặng ${StageTransitionController.fromStage + 1} → ${Math.min(5, StageTransitionController.toStage + 1)} (${DragonMovementController.animState})</span>`
  : `<span class="hs-map-dragon-live">🐉 Rồng Xanh tại cổng Chặng ${curStageIdx + 1}/5</span>`;

 return `<div class="hs-stage-map-bar">
  <div class="hs-stage-cards-grid">
   ${missionMeta.map((m, i) => {
    const state = stage === -1 ? 'current' : i < stage ? 'done' : i === stage ? 'current' : 'locked';
    const shortName = SHORT_STAGE_NAMES[i] || m.sub;
    const numStr = String(i + 1).padStart(2, '0');
    const isNhanBiet = i < 3;
    const levelLabel = isNhanBiet ? 'NHẬN BIẾT' : 'THÔNG HIỂU';
    const levelCls = isNhanBiet ? 'level-nb' : 'level-th';
    const statusLabel = state === 'done' ? '✓ ĐÃ XONG' : state === 'current' ? '🐉 ĐANG Ở ĐÂY' : '🔒 KHÓA';
    const clickAttr = isStudent
     ? `data-action="advClickTopStageCard" data-stage="${i}"`
     : `data-action="preview3DStage" data-stage="${i}"`;
    const safeFormula = getStageFormulaSafe(i, stage);
    const hasDragonHere = (stage !== -1) && ((isMoving && StageTransitionController.toStage === i) || (!isMoving && curStageIdx === i));

    return `<div class="hs-stage-card ${state} ${hasDragonHere ? 'dragon-present' : ''}" ${clickAttr}>
     <div class="mv-island-tooltip">
      <b style="color:#FFC953">Chặng ${i + 1}: ${esc(m.place)}</b><br/>
      <span style="color:#A5F3FC">📐 ${formatMath(safeFormula || m.sub)}</span><br/>
      <small style="color:#CBD5E1">🏅 Vật phẩm: ${esc(m.mode)} · Nhấn để di chuyển trên Bản đồ</small>
     </div>
     <div class="hs-stage-card-top">
      <span class="hs-stage-num-pill">${numStr}</span>
      <strong class="hs-stage-short-name">${esc(shortName)}</strong>
      ${hasDragonHere ? `<img src="/assets/RongXanh.png" alt="Rồng Xanh" class="hs-stage-mini-dragon ${isMoving ? 'flying' : ''}" draggable="false"/>` : `<img src="${STAGE_BG_ASSETS[i] || STAGE_BG_ASSETS[0]}" alt="" class="hs-stage-mini-thumb" draggable="false"/>`}
     </div>
     <div class="hs-stage-card-bottom">
      <span class="hs-stage-level ${levelCls}">${levelLabel}</span>
      <span class="hs-stage-lock-tag">${statusLabel}</span>
     </div>
    </div>`;
   }).join('')}
  </div>
  ${isStudent ? `<div class="hs-map-bar-substrip">
   ${moveBadge}
   <div style="display:flex;gap:8px;align-items:center">
    <button type="button" class="mv-chip-btn ${mvWorldMapOpen ? 'active' : ''}" data-action="toggleWorldMap">
     🗺️ ${mvWorldMapOpen ? 'Đang mở Bản đồ 5 Chặng (Nhấn để vào Màn chơi)' : 'Mở Bản đồ Hành trình 5 Chặng'}
    </button>
    <button type="button" class="mv-chip-btn" data-action="advTriggerDragonMove" title="Xem hoạt cảnh Rồng Xanh chạy & bay qua các đảo">
     🐉 Di chuyển Rồng Xanh
    </button>
   </div>
  </div>` : ''}
 </div>`;
}

function teacherMap(teams){
 return `<div class="big-map"><div class="screen-tag">🗺️ BẢN ĐỒ LỤC ĐỊA 5 CHẶNG & ĐƯỜNG ĐUA TRỰC TIẾP CỦA CÁC ĐỘI</div>${mapTrack(-1)}${teams.map(t=>`<div class="map-lane"><div class="map-name"><span class="team-avatar">${t.avatar}</span><span>${esc(t.name)}</span></div><div class="track"><div class="filled" style="width:${Math.max(2,(t.stage*3+t.round)/15*100)}%"></div><div class="ticks">${[0,1,2,3,4,5].map(()=>'<i></i>').join('')}</div><span class="pawn" style="--pos:calc(5% + ${(t.stage*3+(t.stage<5?t.round:0))/15} * 90%)">${t.avatar}</span></div><div class="lane-score">${t.score} XP · 🪙${t.gold??120}<br/><small>${t.stage<5?`Chặng ${t.stage+1} (${t.round+1}/3) · 🔥x${t.streak||0}`:'🔓 Đủ 5 mảnh'}</small></div></div>`).join('')}</div>`;
}

function standings(teams,compact=false){
 const list=[...teams].sort((a,b)=>b.score-a.score||(b.stage-a.stage)||(b.round-a.round)||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 if(compact){
  const meId = world?.me?.id;
  const myIdx = Math.max(0, list.findIndex(t => t.id === meId));
  const myTeam = list[myIdx] || world?.me || {name:'Đội 1', avatar:'🐉', score:0};
  const rankNum = myIdx + 1;
  const medal = rankNum === 1 ? '🥇' : rankNum === 2 ? '🥈' : rankNum === 3 ? '🥉' : '🏅';
  return `<div class="mini-rank mv-my-rank-card" title="Nhấn 'Bảng đầy đủ' để xem toàn bộ lớp">
   <span class="mv-my-rank-pos">${medal} Hạng #${rankNum} · ${esc(myTeam.name)}</span>
   <span class="mv-my-rank-xp">${(myTeam.score || 0).toLocaleString('vi-VN')} XP</span>
  </div>`;
 }
 return `<table class="result-table"><thead><tr><th>Hạng</th><th>Đội</th><th>Tiến độ Chặng</th><th>Vàng · Cấp · Combo</th><th>Điểm XP</th><th>Trạng thái</th></tr></thead><tbody>${list.map((t,i)=>`<tr><td>${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</td><td>${t.avatar} <strong>${esc(t.name)}</strong></td><td><div class="mini-progress"><span style="width:${(t.stage*3+(t.stage<5?t.round:0))/15*100}%"></span></div><small>Chặng ${t.stage}/5 • ${t.stage<5?`lượt ${t.round+1}/3`:'Hoàn tất 5 chặng'}</small></td><td>🪙 ${t.gold??120} · Lv.${t.heroLevel??1} ${(t.streak||0)>=2?`<span class="pill pink">🔥x${t.streak}</span>`:''}</td><td><strong>${t.score} XP</strong></td><td>${t.completed?'<span class="pill green">🏆 Đã mở kho báu</span>':t.stage===5?'<span class="pill gold">🔐 Đang giải mật mã</span>':'⚔️ Đang chiến đấu'}</td></tr>`).join('')}</tbody></table>`;
}

function getTimelinePhaseInfo(clock) {
 const totalMs = (clock?.minutes || 6) * 60000;
 const remMs = Math.max(0, clock?.remainingMs ?? totalMs);
 const elapsedSec = Math.max(0, Math.floor((totalMs - remMs) / 1000));
 // 360s schedule: INTRO 20s | S1 60s (20..80) | S2 60s (80..140) | S3 65s (140..205) | S4 65s (205..270) | S5 70s (270..340) | FINALE 20s (340..360)
 if (elapsedSec < 20) return { code: 'INTRO', label: 'Mở đầu (20s)', stageNum: 1 };
 if (elapsedSec < 80) return { code: 'STAGE_1', label: 'Chặng 1 · Hiệu vectơ (60s)', stageNum: 1 };
 if (elapsedSec < 140) return { code: 'STAGE_2', label: 'Chặng 2 · Tổng vectơ (60s)', stageNum: 2 };
 if (elapsedSec < 205) return { code: 'STAGE_3', label: 'Chặng 3 · Hình bình hành (65s)', stageNum: 3 };
 if (elapsedSec < 270) return { code: 'STAGE_4', label: 'Chặng 4 · Trung điểm (65s)', stageNum: 4 };
 if (elapsedSec < 340) return { code: 'STAGE_5', label: 'Chặng 5 · Trọng tâm (70s)', stageNum: 5 };
 return { code: 'FINALE', label: 'Tổng kết & Khôi phục Tâm Thạch (20s)', stageNum: 5 };
}

function renderTeacherTeamModal() {
 if (!selectedInspectorTeamId || !world?.teams) return '';
 const t = world.teams.find(x => x.id === selectedInspectorTeamId) || world.teams[0];
 if (!t) return '';
 const logs = t.answerLog || [];
 const joinBase = world.joinBaseURL || location.origin;
 const teamPin = world.teamCodes?.[t.id] || '----';

 return `<div class="modal-backdrop">
  <div class="modal gv-inspector-modal" role="dialog" aria-modal="true">
   <div class="flex-between" style="border-bottom:1px solid rgba(54,222,244,0.25);padding-bottom:12px;margin-bottom:14px">
    <div>
     <span class="gv-kicker">HỒ SƠ CHI TIẾT ĐỘI CHƠI (CHỈ GIÁO VIÊN)</span>
     <h2 style="color:#F8FAFF;margin:4px 0 0">${t.avatar} ${esc(t.name)} · PIN: <span class="mono" style="color:#FFC953">${esc(teamPin)}</span></h2>
    </div>
    <div style="display:flex;gap:8px;align-items:center">
     <select id="inspectorTeamSelect" class="gv-select-sm" onchange="window.switchInspectorTeam(this.value)">
      ${world.teams.map(tm => `<option value="${tm.id}" ${tm.id === t.id ? 'selected' : ''}>${esc(tm.name)} (Chặng ${Math.min(5, tm.stage + 1)}/5)</option>`).join('')}
     </select>
     <button type="button" class="mv-chip-btn" data-action="closeTeamInspector">✕ Đóng</button>
    </div>
   </div>

   <div class="gv-inspector-kpis">
    <div class="gv-mini-kpi"><span>Chặng hiện tại</span><b>${t.completed ? 'Hoàn thành 5/5' : ('Chặng ' + Math.min(5, t.stage + 1) + '/5 (Bước ' + (t.round + 1) + '/3)')}</b></div>
    <div class="gv-mini-kpi"><span>Số bước giải mã đúng</span><b style="color:#35C992">${t.correctCount || 0} / 10</b></div>
    <div class="gv-mini-kpi"><span>Số lần thử sai / Gợi ý</span><b style="color:#FDA4AF">${t.wrong || 0} sai · ${t.hints || 0} gợi ý</b></div>
    <div class="gv-mini-kpi"><span>Điểm XP & Thưởng</span><b style="color:#FFC953">${t.score} XP (Hợp tác +${t.bonus || 0})</b></div>
   </div>

   <div class="gv-s1-live-box" style="margin:10px 0;padding:10px 14px;background:rgba(16,185,129,0.12);border:1px solid rgba(54,222,244,0.35);border-radius:10px;display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between">
    <strong style="color:#36DEF4;font-size:12.5px">🌲 CHẶNG 1 – BÍ MẬT CÂY CẦU ĐẢO CHIỀU:</strong>
    <span style="font-size:12.5px;color:#F8FAFF">📜 Mật thư: <b style="color:#FFC953">${t.stage > 0 ? 3 : (t.stage1?.cluesFound ?? (t.round >= 1 ? 3 : 0))}/3</b></span>
    <span style="font-size:12.5px;color:#F8FAFF">🧩 Ghép mật thư: <b style="color:${(t.stage > 0 || t.stage1?.cipherSolved || t.round >= 2) ? '#35C992' : '#94A3B8'}">${(t.stage > 0 || t.stage1?.cipherSolved || t.round >= 2) ? '✓ Đã hoàn thành' : 'Chưa xong'}</b></span>
    <span style="font-size:12.5px;color:#F8FAFF">🌉 Cầu ánh sáng: <b style="color:${(t.stage > 0 || t.stage1?.bridgeOpened) ? '#35C992' : '#94A3B8'}">${(t.stage > 0 || t.stage1?.bridgeOpened) ? '✓ Đã mở cầu (Ấn Hướng Đi)' : 'Chưa mở'}</b></span>
    <span style="font-size:12.5px;color:#F8FAFF">🐉 Rồng Xanh: <b style="color:#FFC953">${(t.dragon?.state && t.dragon.state !== 'PLAYING') ? `Đang di chuyển Chặng ${(t.dragon.fromStage ?? 0) + 1} → ${(t.dragon.toStage ?? 0) >= 5 ? 'Tâm Thạch' : ((t.dragon.toStage ?? 0) + 1)} (${t.dragon.moveMode || 'FLY'})` : (t.completed ? 'Đã khôi phục Tâm Thạch' : `Tại cổng Chặng ${Math.min(5, (t.stage || 0) + 1)}`)}</b></span>
   </div>

   <h3 style="color:#36DEF4;font-size:13.5px;margin:12px 0 8px">📋 Lịch sử câu trả lời & thời gian từng chặng (${logs.length} lượt):</h3>
   <div class="gv-log-table-wrap">
    ${logs.length ? `<table class="gv-log-table">
     <thead><tr><th>Thời gian</th><th>Chặng</th><th>Mã câu</th><th>Loại</th><th>Lựa chọn của HS</th><th>Kết quả</th></tr></thead>
     <tbody>
      ${logs.map(l => `<tr>
       <td class="mono">${new Date(l.at).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit',second:'2-digit'})}</td>
       <td>Chặng ${l.stage} (${esc(l.level || '')})</td>
       <td class="mono"><b>${esc(l.questionId || ('S'+l.stage))}</b></td>
       <td>${l.isQuiz ? 'Câu hỏi giải mã' : 'Tương tác mở đường'}</td>
       <td>${esc(l.chosenText || ('Phương án ' + (l.choice + 1)))}</td>
       <td>${l.correct ? '<span class="pill green">✓ Đúng</span>' : '<span class="pill pink">✗ Sai</span>'}</td>
      </tr>`).join('')}
     </tbody>
    </table>` : '<p class="muted" style="padding:12px;background:rgba(11,18,39,0.6);border-radius:10px">Đội này chưa gửi câu trả lời nào trong phiên hiện tại.</p>'}
   </div>

   <div class="flex-between" style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(54,222,244,0.2);flex-wrap:wrap;gap:10px">
    <div style="display:flex;align-items:center;gap:8px">
     <span style="font-size:12.5px;font-weight:800;color:#CBD5E1">Thưởng điểm hợp tác (0–10 XP):</span>
     <select id="modalBonusVal" class="gv-select-sm">
      ${Array.from({length:11},(_,n)=>`<option value="${n}" ${(t.bonus||0)===n?'selected':''}>+${n} XP</option>`).join('')}
     </select>
     <button type="button" class="mv-chip-btn" data-action="saveModalBonus" data-team="${t.id}">✨ Lưu điểm thưởng</button>
    </div>
    <div style="display:flex;gap:8px">
     <button type="button" class="mv-chip-btn" style="border-color:#F43F5E;color:#FDA4AF" data-action="resetSingleTeam" data-team="${t.id}">↺ Đặt lại đội này</button>
     <button type="button" class="mv-chip-btn" data-action="closeTeamInspector">Đóng</button>
    </div>
   </div>
  </div>
 </div>`;
}

window.switchInspectorTeam = function(teamId) {
 selectedInspectorTeamId = teamId;
 render();
};

function teacherScreen(){
 const teams = world.teams || [];
 const sortedTeams = [...teams].sort((a,b)=>b.score-a.score||(b.stage-a.stage)||(b.round-a.round)||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 const onlineTeams = teams.filter(t => (t.answerLog?.length > 0) || t.stage > 0 || t.round > 0 || t.score > 0);
 const activeCount = onlineTeams.length || teams.length;
 const maxStageNum = Math.min(5, Math.max(1, ...teams.map(t => Math.min(5, (t.stage || 0) + 1))));
 const ped = world.pedagogicalStats || {
  totalCorrect: teams.reduce((s,t)=>s+(t.correctCount||0), 0),
  totalAnswered: 0,
  totalMaxQuestions: teams.length * 10,
  nhanBiet: { correct: 0, total: 0, pct: null },
  thongHieu: { correct: 0, total: 0, pct: null },
  byQuestion: {}
 };
 const totalCorrect = ped.totalCorrect ?? teams.reduce((s,t)=>s+(t.correctCount||0), 0);
 const totalDenom = ped.totalAnswered > 0 ? ped.totalAnswered : (teams.length * 10);

 const nbPct = ped.nhanBiet?.pct !== null && ped.nhanBiet?.pct !== undefined
  ? ped.nhanBiet.pct
  : (totalCorrect > 0 ? 100 : 0);
 const thPct = ped.thongHieu?.pct !== null && ped.thongHieu?.pct !== undefined
  ? ped.thongHieu.pct
  : 0;

 const barColors = ['#FFC953', '#7DD3FC', '#C4B5FD', '#FDBA74', '#35C992', '#F472B6', '#67E8F9', '#FDE047'];
 const journeyLabels = ['1 · Hiệu', '2 · Tổng', '3 · Hình bình hành', '4 · Trung điểm', '5 · Trọng tâm'];
 const phaseInfo = getTimelinePhaseInfo(world.clock);

 const stuckTeams = teams.filter(t => !t.completed && ((t.wrong || 0) >= 2 || (Date.now() - (t.stageEnteredAt || Date.now()) > 55000)));
 const answeringCount = teams.filter(t => !t.completed).length;

 const isRunning = Boolean(world.clock?.running && !world.paused && !world.ended);
 const isPaused = Boolean(world.paused && !world.ended);
 const isEnded = Boolean(world.ended);

 const joinBase = world.joinBaseURL || location.origin;
 const baseUrl = joinBase + location.pathname;

 return `<div class="gv-shell">
  <!-- 1. BỐN THẺ KPI LỚN (4 KPI CARDS) -->
  <section class="gv-kpi-container">
   <div class="gv-kpi-grid">
    <div class="gv-kpi-card">
     <span class="gv-kpi-label">ĐỘI ĐANG CHƠI</span>
     <strong class="gv-kpi-value cyan">${String(activeCount).padStart(2, '0')}</strong>
     <small class="gv-kpi-sub">Tổng số: ${teams.length} đội trong phòng</small>
    </div>
    <div class="gv-kpi-card">
     <span class="gv-kpi-label">CHẶNG HIỆN TẠI</span>
     <strong class="gv-kpi-value cyan">${String(maxStageNum).padStart(2, '0')}/05</strong>
     <small class="gv-kpi-sub">${esc(phaseInfo.label)}</small>
    </div>
    <div class="gv-kpi-card">
     <span class="gv-kpi-label">CÂU ĐÚNG TOÀN LỚP</span>
     <strong class="gv-kpi-value cyan">${String(totalCorrect).padStart(2, '0')}/${String(totalDenom).padStart(2, '0')}</strong>
     <small class="gv-kpi-sub">${ped.totalAnswered > 0 ? `Trên ${ped.totalAnswered} lượt trả lời hợp lệ` : `Tối đa ${teams.length * 10} câu toàn lớp`}</small>
    </div>
    <div class="gv-kpi-card">
     <span class="gv-kpi-label">THỜI GIAN CÒN LẠI</span>
     <strong class="gv-kpi-value gold" id="clock">06:00</strong>
     <small class="gv-kpi-sub">Kịch bản chuẩn 360 giây (6 phút)</small>
    </div>
   </div>
  </section>

  <!-- 2. THANH HÀNH TRÌNH 5 CHẶNG (HÀNH TRÌNH) -->
  <section class="gv-journey-bar">
   <span class="gv-journey-title">HÀNH TRÌNH</span>
   <div class="gv-journey-pills">
    ${journeyLabels.map((lbl, idx) => {
     const stNum = idx + 1;
     const isCur = stNum === maxStageNum;
     const isDone = stNum < maxStageNum;
     const teamsHere = teams.filter(t => (t.stage === idx && !t.completed) || (idx === 4 && t.completed)).length;
     return `<button type="button" class="gv-journey-pill ${isCur ? 'active' : isDone ? 'done' : ''}" data-action="teacherSelectStage3D" data-stage="${idx}" title="Nhấn để xem mô hình 3D & câu hỏi Chặng ${stNum}">
      <span>${esc(lbl)}</span>
      ${teamsHere > 0 ? `<small class="gv-pill-count">${teamsHere} đội</small>` : ''}
     </button>`;
    }).join('')}
   </div>
  </section>

  ${showTeacher3DDrawer ? `<section class="gv-drawer-box">
   <div class="flex-between" style="margin-bottom:8px">
    <strong style="color:#FFC953">🧊 Mô hình 3D & Đáp án Sư phạm Chặng ${teacherPreviewStage + 1}: ${esc(world.missions[teacherPreviewStage]?.title || '')}</strong>
    <button type="button" class="mv-chip-btn" data-action="toggleTeacher3DDrawer">✕ Đóng</button>
   </div>
   ${renderOxyz3D(world.missions[teacherPreviewStage] || world.stages[teacherPreviewStage], true)}
   <div class="gv-ped-answers-grid">
    ${(world.missions[teacherPreviewStage]?.questionPool || world.missions[teacherPreviewStage]?.challenges || []).map((q, qi) => {
     const qStat = ped.byQuestion?.[q.id] || { correct: 0, total: 0 };
     const qPct = qStat.total > 0 ? Math.round((qStat.correct / qStat.total) * 100) + '%' : 'Chưa làm';
     return `<div class="gv-ped-qcard">
      <div class="flex-between"><b style="color:#36DEF4">Câu ${esc(q.id || (qi+1))}</b><span class="pill green">Đúng: ${qPct} (${qStat.correct}/${qStat.total})</span></div>
      <div style="margin:6px 0;font-size:13px;color:#F8FAFF">${formatMath(q.prompt)}</div>
      <div style="color:#FFC953;font-size:12.5px;font-weight:800">✓ Đáp án ${esc(q.answer)}: ${formatMath(q.options?.[q.correct] || '')}</div>
     </div>`;
    }).join('')}
   </div>
  </section>` : ''}

  ${showTeacherPinDrawer ? `<section class="gv-drawer-box">
   <div class="flex-between" style="margin-bottom:10px">
    <strong style="color:#36DEF4">🔑 MÃ PHÒNG <span style="color:#FFC953">${esc(world.room)}</span> & MÃ PIN ĐĂNG NHẬP TỪNG ĐỘI (URL: ${esc(joinBase)})</strong>
    <div style="display:flex;gap:8px">
     ${window.IS_DEMO_MODE ? `<button type="button" class="mv-chip-btn" data-action="demoPlay">🎮 Chuyển sang Màn hình Học sinh</button>` : ''}
     <button type="button" class="mv-chip-btn" data-action="exportCSV">📥 Xuất CSV</button>
     <button type="button" class="mv-chip-btn" data-action="toggleTeacherPinDrawer">✕ Đóng</button>
    </div>
   </div>
   <div class="gv-pin-grid">
    ${teams.map(t => `<div class="gv-pin-card">
     <div><b>${t.avatar} ${esc(t.name)}</b><br/><small>Mã đội: ${esc(t.id)} · PIN: <b style="color:#FFC953;font-size:14px">${esc(world.teamCodes?.[t.id] || '----')}</b></small></div>
     <button type="button" class="mv-chip-btn" data-action="copy" data-url="${esc(baseUrl+'?room='+world.room+'&team='+t.id)}">⧉ Link</button>
    </div>`).join('')}
   </div>
  </section>` : ''}

  <!-- 3. KHU VỰC CHÍNH 2 CỘT: BẢNG XẾP HẠNG TRỰC TIẾP & THỐNG KÊ SƯ PHẠM -->
  <div class="gv-main-grid">
   <!-- CỘT TRÁI: BẢNG XẾP HẠNG TRỰC TIẾP -->
   <section class="gv-panel gv-leaderboard-panel">
    <div class="flex-between" style="margin-bottom:10px">
     <h2 class="gv-panel-title">BẢNG XẾP HẠNG TRỰC TIẾP</h2>
     <div style="display:flex;gap:6px">
      <button type="button" class="mv-chip-btn" data-action="toggleTeacherPinDrawer">🔑 Mã PIN (${teams.length} đội)</button>
      <button type="button" class="mv-chip-btn" data-action="teacherBroadcast">📢 Nhắn lớp</button>
      <button type="button" class="mv-chip-btn" data-action="exportCSV">📥 Xuất CSV</button>
     </div>
    </div>

    <div class="gv-table-head">
     <span>Hạng</span>
     <span>Đội chơi</span>
     <span>Chặng</span>
     <span>Tiến độ</span>
     <span>Đúng</span>
     <span>XP</span>
    </div>

    <div class="gv-rows-list">
     ${sortedTeams.map((t, idx) => {
      const rankNum = idx + 1;
      const rankCls = rankNum === 1 ? 'rank-1' : rankNum === 2 ? 'rank-2' : rankNum === 3 ? 'rank-3' : 'rank-n';
      const stgDisplay = t.completed ? '5/5' : `${Math.min(5, (t.stage || 0) + (t.round > 0 ? 1 : 1))}/5`;
      const s1Clues = t.stage > 0 ? 3 : (t.stage1?.cluesFound ?? (t.round >= 1 ? 3 : 0));
      const s1Cipher = Boolean(t.stage > 0 || t.stage1?.cipherSolved || t.round >= 2);
      const s1Bridge = Boolean(t.stage > 0 || t.stage1?.bridgeOpened);
      const pct = t.completed ? 100 : Math.max(8, Math.round((((t.stage || 0) * 3 + (t.round || 0) + (t.stage === 0 && t.round === 0 ? (s1Clues / 3) : 0)) / 15) * 100));
      const barColor = barColors[idx % barColors.length];
      const correctVal = t.correctCount ?? ((t.digits || []).length * 2);
      const drgMoving = Boolean(t.dragon?.state && t.dragon.state !== 'PLAYING');
      const drgPillText = t.completed
       ? '🐉 Đỉnh Tâm Thạch'
       : drgMoving
         ? `🐉 Bay ${(t.dragon.fromStage ?? 0) + 1}→${(t.dragon.toStage ?? 0) >= 5 ? 'Tâm Thạch' : ((t.dragon.toStage ?? 0) + 1)}`
         : `🐉 Chặng ${Math.min(5, (t.stage || 0) + 1)}`;
      const s1LiveBadge = `<div class="gv-s1-inline-badges">
       <span class="gv-s1-pill ${drgMoving ? 'moving' : 'done'}" title="Vị trí & Trạng thái di chuyển của Rồng Xanh">${esc(drgPillText)}</span>
       <span class="gv-s1-pill ${s1Clues >= 3 ? 'done' : ''}" title="Số mảnh mật thư Chặng 1 đã tìm thấy">📜 ${s1Clues}/3</span>
       <span class="gv-s1-pill ${s1Cipher ? 'done' : ''}" title="Trạng thái ghép mật thư Chặng 1">🧩 ${s1Cipher ? 'Đã ghép' : 'Chưa'}</span>
       <span class="gv-s1-pill ${s1Bridge ? 'done' : ''}" title="Trạng thái mở Cầu ánh sáng Chặng 1">🌉 ${s1Bridge ? 'Đã mở cầu' : 'Chưa mở'}</span>
      </div>`;
      return `<div class="gv-rank-row ${rankCls}" data-action="inspectTeamRow" data-team="${t.id}" title="Nhấn để xem chi tiết từng bước của ${esc(t.name)}">
       <span class="gv-col-rank">#${rankNum}</span>
       <span class="gv-col-team"><strong>${esc(t.name)}</strong>${s1LiveBadge}</span>
       <span class="gv-col-stage">${stgDisplay}</span>
       <div class="gv-col-progress">
        <div class="gv-prog-track"><div class="gv-prog-fill" style="width:${pct}%;background:${barColor}"></div></div>
       </div>
       <span class="gv-col-correct">${correctVal}/10</span>
       <span class="gv-col-xp">${t.score}</span>
      </div>`;
     }).join('')}
    </div>

    <div class="gv-live-summary-bar">
     <span>Trực tuyến: <b>${activeCount}/${teams.length} đội</b></span>
     <span>·</span>
     <span>Đang trả lời: <b>${answeringCount} đội</b></span>
     <span>·</span>
     <span>Cần hỗ trợ: <b>${stuckTeams.length} đội</b></span>
    </div>
   </section>

   <!-- CỘT PHẢI: THỐNG KÊ THEO MỨC ĐỘ & TRẠNG THÁI CẢNH BÁO -->
   <div class="gv-right-stack">
    <section class="gv-panel">
     <div class="flex-between" style="margin-bottom:10px">
      <h2 class="gv-panel-title">THỐNG KÊ THEO MỨC ĐỘ</h2>
      <button type="button" class="mv-chip-btn" data-action="toggleTeacher3DDrawer">📐 Chi tiết câu</button>
     </div>

     <div class="gv-level-stat-block">
      <div class="flex-between">
       <span class="gv-level-name">NHẬN BIẾT <small style="color:#94A3B8;font-weight:600">(Chặng 1–3)</small></span>
       <strong class="gv-level-pct">${ped.nhanBiet?.pct !== null && ped.nhanBiet?.pct !== undefined ? ped.nhanBiet.pct + '%' : (nbPct + '%')} <small style="color:#94A3B8;font-size:11.5px">(${ped.nhanBiet?.correct || 0}/${ped.nhanBiet?.total || 0})</small></strong>
      </div>
      <div class="gv-level-track">
       <div class="gv-level-fill green" style="width:${Math.max(4, nbPct)}%"></div>
      </div>
     </div>

     <div class="gv-level-stat-block" style="margin-top:16px">
      <div class="flex-between">
       <span class="gv-level-name">THÔNG HIỂU <small style="color:#94A3B8;font-weight:600">(Chặng 4–5)</small></span>
       <strong class="gv-level-pct">${ped.thongHieu?.pct !== null && ped.thongHieu?.pct !== undefined ? ped.thongHieu.pct + '%' : (thPct + '%')} <small style="color:#94A3B8;font-size:11.5px">(${ped.thongHieu?.correct || 0}/${ped.thongHieu?.total || 0})</small></strong>
      </div>
      <div class="gv-level-track">
       <div class="gv-level-fill purple" style="width:${Math.max(4, thPct)}%"></div>
      </div>
     </div>
    </section>

    <section class="gv-panel">
     <h2 class="gv-panel-title" style="margin-bottom:12px">TRẠNG THÁI & CẢNH BÁO</h2>
     <ul class="gv-status-list">
      <li class="gv-status-item">
       <span class="gv-dot green"></span>
       <span style="color:#35C992;font-weight:800">${activeCount} đội đang kết nối</span>
      </li>
      ${stuckTeams.length > 0 ? stuckTeams.slice(0, 2).map(st => `<li class="gv-status-item">
       <span class="gv-dot gold"></span>
       <span style="color:#FFC953;font-weight:800">${esc(st.name)} đang ở chặng ${Math.min(5, (st.stage||0)+1)} ${st.wrong ? `(${st.wrong} lần thử sai)` : ''}</span>
      </li>`).join('') : `<li class="gv-status-item">
       <span class="gv-dot gold"></span>
       <span style="color:#FFC953;font-weight:800">${esc(sortedTeams[sortedTeams.length - 1]?.name || 'Đội chơi')} đang ở chặng ${Math.min(5, (sortedTeams[sortedTeams.length - 1]?.stage || 0) + 1)}</span>
      </li>`}
      <li class="gv-status-item">
       <span class="gv-dot slate"></span>
       <span style="color:#CBD5E1;font-weight:700">Đáp án chỉ hiện ở màn giáo viên</span>
      </li>
     </ul>
     ${world.lastEvent?.length ? `<div class="gv-mini-event-feed">
      <div style="font-size:11px;font-weight:800;color:#36DEF4;margin-bottom:4px">NHẬT KÝ MỚI NHẤT:</div>
      <div style="font-size:12px;color:#E2E8F0">${esc(world.lastEvent[0].text)}</div>
     </div>` : ''}
    </section>
   </div>
  </div>

  <!-- 4. THANH ĐIỀU KHIỂN CUỘC THI DƯỚI CÙNG (6 NÚT HOST CONTROL) -->
  <footer class="gv-control-bar">
   <button type="button" class="gv-ctrl-btn start" data-action="hostStartContest" ${isRunning ? 'disabled' : ''}>BẮT ĐẦU</button>
   <button type="button" class="gv-ctrl-btn pause" data-action="hostPauseContest" ${!isRunning ? 'disabled' : ''}>TẠM DỪNG</button>
   <button type="button" class="gv-ctrl-btn resume" data-action="hostResumeContest" ${!isPaused ? 'disabled' : ''}>TIẾP TỤC</button>
   <button type="button" class="gv-ctrl-btn display" data-action="hostOpenDisplay">TRÌNH CHIẾU</button>
   <button type="button" class="gv-ctrl-btn detail" data-action="openTeamInspector">CHI TIẾT TỪNG ĐỘI</button>
   <button type="button" class="gv-ctrl-btn end" data-action="hostEndContest" ${isEnded ? 'disabled' : ''}>KẾT THÚC</button>
  </footer>
  ${renderTeacherTeamModal()}
 </div>`;
}

function displayScreen(){
 const teams = world.teams || [];
 const sortedTeams = [...teams].sort((a,b)=>b.score-a.score||(b.stage-a.stage)||(b.round-a.round));
 const maxStageNum = Math.min(5, Math.max(1, ...teams.map(t => Math.min(5, (t.stage || 0) + 1))));
 const barColors = ['#FFC953', '#7DD3FC', '#C4B5FD', '#FDBA74', '#35C992', '#F472B6'];
 const journeyLabels = ['1 · Hiệu vectơ', '2 · Tổng vectơ', '3 · Hình bình hành', '4 · Trung điểm', '5 · Trọng tâm'];
 const phaseInfo = getTimelinePhaseInfo(world.clock);

 return `<div class="gv-shell display-mode-shell">
  <section class="gv-kpi-container">
   <div class="gv-kpi-grid" style="grid-template-columns:repeat(3,1fr)">
    <div class="gv-kpi-card">
     <span class="gv-kpi-label">ĐỘI THAM GIA</span>
     <strong class="gv-kpi-value cyan">${String(teams.length).padStart(2, '0')} ĐỘI</strong>
     <small class="gv-kpi-sub">Hành trình Giải cứu Lục địa OXYZ</small>
    </div>
    <div class="gv-kpi-card">
     <span class="gv-kpi-label">CHẶNG DẪN ĐẦU</span>
     <strong class="gv-kpi-value cyan">CHẶNG 0${maxStageNum}/05</strong>
     <small class="gv-kpi-sub">${esc(phaseInfo.label)}</small>
    </div>
    <div class="gv-kpi-card">
     <span class="gv-kpi-label">ĐỒNG HỒ TOÀN LỚP</span>
     <strong class="gv-kpi-value gold" id="clock">06:00</strong>
     <small class="gv-kpi-sub">${world.paused ? '⏸ Đang tạm dừng' : world.ended ? '🏁 Đã kết thúc' : '🟢 Đang diễn ra trực tiếp'}</small>
    </div>
   </div>
  </section>

  <section class="gv-journey-bar">
   <span class="gv-journey-title">BẢN ĐỒ 5 CHẶNG</span>
   <div class="gv-journey-pills">
    ${journeyLabels.map((lbl, idx) => {
     const stNum = idx + 1;
     const isCur = stNum === maxStageNum;
     const isDone = stNum < maxStageNum;
     return `<div class="gv-journey-pill ${isCur ? 'active' : isDone ? 'done' : ''}">
      <span>${esc(lbl)}</span>
     </div>`;
    }).join('')}
   </div>
  </section>

  <section class="gv-panel" style="margin-top:8px">
   <div class="flex-between" style="margin-bottom:12px">
    <h2 class="gv-panel-title">🏆 BẢNG XẾP HẠNG & TIẾN ĐỘ TRỰC TIẾP CÁC ĐỘI</h2>
    <span class="pill green">Chế độ trình chiếu công khai (Không hiển thị đáp án)</span>
   </div>
   <div class="gv-table-head">
    <span>Hạng</span>
    <span>Đội thám hiểm</span>
    <span>Chặng</span>
    <span>Tiến độ thu hồi 5 Ấn Vectơ</span>
    <span>Ấn Vectơ</span>
    <span>Điểm XP</span>
   </div>
   <div class="gv-rows-list">
    ${sortedTeams.map((t, idx) => {
     const rankNum = idx + 1;
     const rankCls = rankNum === 1 ? 'rank-1' : rankNum === 2 ? 'rank-2' : rankNum === 3 ? 'rank-3' : 'rank-n';
     const s1Clues = t.stage > 0 ? 3 : (t.stage1?.cluesFound ?? (t.round >= 1 ? 3 : 0));
     const s1Cipher = Boolean(t.stage > 0 || t.stage1?.cipherSolved || t.round >= 2);
     const s1Bridge = Boolean(t.stage > 0 || t.stage1?.bridgeOpened);
     const pct = t.completed ? 100 : Math.max(8, Math.round((((t.stage || 0) * 3 + (t.round || 0) + (t.stage === 0 && t.round === 0 ? (s1Clues / 3) : 0)) / 15) * 100));
     const barColor = barColors[idx % barColors.length];
     const seals = (t.digits || []).length;
     const drgMoving = Boolean(t.dragon?.state && t.dragon.state !== 'PLAYING');
     const drgPillText = t.completed
      ? '🐉 Đỉnh Tâm Thạch'
      : drgMoving
        ? `🐉 Bay ${(t.dragon.fromStage ?? 0) + 1}→${(t.dragon.toStage ?? 0) >= 5 ? 'Tâm Thạch' : ((t.dragon.toStage ?? 0) + 1)}`
        : `🐉 Chặng ${Math.min(5, (t.stage || 0) + 1)}`;
     return `<div class="gv-rank-row ${rankCls}">
      <span class="gv-col-rank">#${rankNum}</span>
      <span class="gv-col-team"><strong>${t.avatar} ${esc(t.name)}</strong><div class="gv-s1-inline-badges"><span class="gv-s1-pill ${drgMoving ? 'moving' : 'done'}">${esc(drgPillText)}</span><span class="gv-s1-pill ${s1Clues >= 3 ? 'done' : ''}">📜 ${s1Clues}/3</span><span class="gv-s1-pill ${s1Cipher ? 'done' : ''}">🧩 ${s1Cipher ? 'Đã ghép' : 'Chưa'}</span><span class="gv-s1-pill ${s1Bridge ? 'done' : ''}">🌉 ${s1Bridge ? 'Đã mở cầu' : 'Chưa'}</span></div></span>
      <span class="gv-col-stage">${t.completed ? 'Đích 🏆' : `${Math.min(5, (t.stage||0)+1)}/5`}</span>
      <div class="gv-col-progress">
       <div class="gv-prog-track"><div class="gv-prog-fill" style="width:${pct}%;background:${barColor}"></div></div>
      </div>
      <span class="gv-col-correct">${seals}/5 Ấn</span>
      <span class="gv-col-xp">${t.score} XP</span>
     </div>`;
    }).join('')}
   </div>
  </section>
 </div>`;
}

function inv(digits){
 const d = Object.fromEntries((digits||[]).map(v=>[v.stage,v.digit]));
 const curStage = (world?.me?.stage ?? 0) + 1;
 const sealMeta = [
  {name:'Ấn Hướng Đi (Chặng 1)', desc:'Khôi phục chiều mũi tên hiệu hai vectơ tại Rừng Vectơ'},
  {name:'Ấn Kết Nối (Chặng 2)', desc:'Hợp nhất hai con đường năng lượng AB + BC = AC tại Pháo Đài'},
  {name:'Ấn Cân Bằng (Chặng 3)', desc:'Đánh thức đường chéo hình bình hành ABCD tại Tháp Pha Lê'},
  {name:'Ấn Cân Xứng (Chặng 4)', desc:'Cân bằng hai vectơ đối nhau IA + IB = 0 tại Mê Cung Trung Điểm'},
  {name:'Ấn Trí Tuệ (Chặng 5)', desc:'Hợp nhất 3 luồng năng lượng trọng tâm GA + GB + GC = 0'}
 ];
 return `<div class="hs-seal-slots-row">${[1,2,3,4,5].map(i=>{
  const hasSeal = d[i] !== undefined;
  const meta = sealMeta[i-1];
  const stateCls = hasSeal ? 'owned' : (i === curStage ? 'active-stage' : 'locked');
  const tip = hasSeal
   ? `Đã thu hồi ${meta.name} — ${meta.desc}`
   : `Chưa thu hồi ${meta.name} — ${meta.desc}`;
  return `<div class="hs-seal-slot ${stateCls}" title="${esc(tip)}" data-action="openCipherNotebook">
   ${hasSeal ? SMALL_DIAMOND_SVG : '<span class="hs-seal-dot">·</span>'}
  </div>`;
 }).join('')}</div>`;
}
/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 1: SĂN KHO BÁU 2D MAP (SCAVENGER HUNT RPG)
   ═══════════════════════════════════════════════════════════════════════════ */
function initHuntForStage(m){
 const hm=m.huntMap||{theme:'forest',spawn:{x:14,y:50},chest:{x:86,y:50,name:'Rương Kho Báu'},stations:[{x:34,y:28,name:'Trạm I',monsterIcon:'👹',monsterName:'Quái Trạm 1',badge:'I'},{x:54,y:72,name:'Trạm II',monsterIcon:'🐊',monsterName:'Quái Trạm 2',badge:'II'},{x:73,y:32,name:'Trạm III',monsterIcon:'🦅',monsterName:'Quái Trạm 3',badge:'III'}]};
 if(huntState.stageId!==m.id){
  huntState.stageId=m.id;
  huntState.x=hm.spawn.x;
  huntState.y=hm.spawn.y;
  huntState.targetX=null;
  huntState.targetY=null;
  huntState.moving=false;
  huntState.facing='right';
  huntState.isSprinting=false;
  huntState.battleOpen=false;
  huntState.selectedChoice=null;
  huntState.shortText='';
  huntState.monsterDefeated=false;
  huntState.rewardBadge=null;
  huntState.lastAutoStation=-1;
  huntState.lastStepSfxAt=0;
  // Bố trí 6 Tinh thể & Vật phẩm có thể nhặt được trên đường đi khám phá
  huntState.collectibles=[
   {id:'c1',x:22,y:38,type:'gold',val:25,icon:'🪙',label:'+25 Vàng',collected:false},
   {id:'c2',x:44,y:24,type:'xp',  val:5, icon:'💎',label:'+5 XP',   collected:false},
   {id:'c3',x:49,y:55,type:'gold',val:30,icon:'🪙',label:'+30 Vàng',collected:false},
   {id:'c4',x:63,y:60,type:'xp',  val:5, icon:'💎',label:'+5 XP',   collected:false},
   {id:'c5',x:82,y:38,type:'gold',val:35,icon:'🪙',label:'+35 Vàng',collected:false},
   {id:'c6',x:38,y:68,type:'shield',val:1,icon:'🛡️',label:'+1 Khiên',collected:false}
  ];
  huntState.popups=[];
 }
 return hm;
}

function getMapDecorations(theme){
 const fireflies=`
  <div class="hw-firefly" style="left:28%;top:35%;animation-delay:.2s"></div>
  <div class="hw-firefly" style="left:52%;top:48%;animation-delay:1.1s"></div>
  <div class="hw-firefly" style="left:68%;top:25%;animation-delay:.7s"></div>
  <div class="hw-firefly" style="left:75%;top:68%;animation-delay:1.6s"></div>
  <div class="hw-firefly" style="left:42%;top:78%;animation-delay:2.1s"></div>`;

 if(theme==='maze'){
  return fireflies+`
   <div class="hw-wall-block" style="left:21%;top:10%;width:3.5%;height:52%"></div>
   <div class="hw-wall-block" style="left:41%;top:38%;width:3.5%;height:52%"></div>
   <div class="hw-wall-block" style="left:63%;top:10%;width:3.5%;height:52%"></div>
   <div class="hw-monument" style="left:16%;top:20%" title="Bia đá Trục Ox"><span class="hw-monument-rune">Ox</span></div>
   <div class="hw-monument" style="left:58%;top:65%" title="Bia đá Trục Oy"><span class="hw-monument-rune">Oy</span></div>
   <div class="hw-monument" style="left:80%;top:18%" title="Bia đá Trục Oz"><span class="hw-monument-rune">Oz</span></div>
   <div class="hw-obstacle" style="left:16%;top:22%">🗿</div>
   <div class="hw-obstacle" style="left:48%;top:18%">🕯️</div>
   <div class="hw-obstacle" style="left:82%;top:76%">🏛️</div>`;
 }
 if(theme==='crystal'){
  return fireflies+`
   <div class="hw-wall-block" style="left:22%;top:58%;width:12%;height:6%"></div>
   <div class="hw-wall-block" style="left:42%;top:22%;width:12%;height:6%"></div>
   <div class="hw-crystal-spire" style="left:24%;top:20%">💎</div>
   <div class="hw-crystal-spire" style="left:45%;top:48%">🔮</div>
   <div class="hw-crystal-spire" style="left:64%;top:75%">🔷</div>
   <div class="hw-crystal-spire" style="left:82%;top:22%">✨</div>
   <div class="hw-monument" style="left:38%;top:16%" title="Trục Ox"><span class="hw-monument-rune">Ox</span></div>
   <div class="hw-monument" style="left:78%;top:72%" title="Trục Oy"><span class="hw-monument-rune">Oy</span></div>`;
 }
 if(theme==='fortress'||theme==='citadel'){
  return fireflies+`
   <div class="hw-wall-block" style="left:23%;top:14%;width:4%;height:26%"></div>
   <div class="hw-wall-block" style="left:62%;top:56%;width:4%;height:28%"></div>
   <div class="hw-monument" style="left:20%;top:68%" title="Pháp trận Ox"><span class="hw-monument-rune">Ox</span></div>
   <div class="hw-monument" style="left:70%;top:18%" title="Pháp trận Oy"><span class="hw-monument-rune">Oy</span></div>
   <div class="hw-monument" style="left:84%;top:68%" title="Pháp trận Oz"><span class="hw-monument-rune">Oz</span></div>
   <div class="hw-obstacle" style="left:18%;top:75%">🔥</div>
   <div class="hw-obstacle" style="left:45%;top:20%">⚔️</div>
   <div class="hw-obstacle" style="left:66%;top:18%">🌋</div>
   <div class="hw-obstacle" style="left:82%;top:74%">🛡️</div>`;
 }
 return fireflies+`
  <!-- CÂY CỐI ĐA TẦNG CÓ BÓNG ĐỔ VÀ CHI TIẾT LÁ XANH -->
  <div class="hw-nature-tree" style="left:16%;top:20%"><div class="hw-tree-shadow"></div><div class="hw-tree-crown oak">🌳</div></div>
  <div class="hw-nature-tree" style="left:26%;top:72%"><div class="hw-tree-shadow"></div><div class="hw-tree-crown pine">🌲</div></div>
  <div class="hw-nature-tree" style="left:44%;top:16%"><div class="hw-tree-shadow"></div><div class="hw-tree-crown palm">🌴</div></div>
  <div class="hw-nature-tree" style="left:64%;top:62%"><div class="hw-tree-shadow"></div><div class="hw-tree-crown oak">🌳</div></div>
  <div class="hw-nature-tree" style="left:82%;top:20%"><div class="hw-tree-shadow"></div><div class="hw-tree-crown pine">🌲</div></div>
  <!-- BIA ĐÁ KHẮC HỆ TRỤC TỌA ĐỘ OXYZ CỔ ĐẠI -->
  <div class="hw-monument" style="left:21%;top:46%" title="Cột mốc O(0;0;0)"><span class="hw-monument-rune">O</span></div>
  <div class="hw-monument" style="left:38%;top:18%" title="Cột mốc Trục Hoành Ox"><span class="hw-monument-rune">Ox</span></div>
  <div class="hw-monument" style="left:60%;top:78%" title="Cột mốc Trục Tung Oy"><span class="hw-monument-rune">Oy</span></div>
  <div class="hw-monument" style="left:78%;top:22%" title="Cột mốc Trục Cao Oz"><span class="hw-monument-rune">Oz</span></div>
  <!-- TẢNG ĐÁ & HOA DẠI RỰC RỠ -->
  <div class="hw-obstacle" style="left:45%;top:47%">🪨</div>
  <div class="hw-obstacle" style="left:82%;top:74%">⛺</div>`;
}

function renderCipherNotebookModal(m){
 const cipherLetters = m.cipherLetters || (m.cipher ? m.cipher.split('') : ['P','H','A','L','E']);
 const isReady = Boolean(m.cipherReady || world.me?.cipherReady);
 const earnedLetters = isReady ? [...cipherLetters] : (m.allRounds || []).slice(0, m.round).map(r => r.cipherPiece).filter(Boolean);
 
 const placedLetters = cipherState.slots.filter(Boolean);
 const availableChips = [...earnedLetters];
 placedLetters.forEach(ch => {
  const idx = availableChips.indexOf(ch);
  if (idx !== -1) availableChips.splice(idx, 1);
 });
 
 const slotsHtml = [0, 1, 2, 3, 4].map(idx => {
  const val = cipherState.slots[idx];
  if (val) {
   return `<div class="hw-cipher-slot filled" data-action="removeCipherSlot" data-slot="${idx}" title="Chạm để gỡ chữ">
    <span class="hw-cipher-slot-num">${idx + 1}</span>
    <span class="hw-cipher-slot-letter">${esc(val)}</span>
    <span class="hw-slot-remove-btn">×</span>
   </div>`;
  }
  return `<div class="hw-cipher-slot empty" title="Ô ký tự ${idx + 1}">
   <span class="hw-cipher-slot-num">${idx + 1}</span>
   <span class="hw-cipher-slot-placeholder">?</span>
  </div>`;
 }).join('');
 
 const chipsHtml = availableChips.length ? availableChips.map(ch => `
  <button type="button" class="hw-cipher-chip" data-action="placeCipherChip" data-char="${esc(ch)}" title="Chạm để xếp vào ô tiếp theo">
   ${esc(ch)}
  </button>
 `).join('') : `<span style="color:#94a3b8;font-size:12.5px;font-style:italic">Đã xếp hết các mảnh ký tự vào ô phía trên.</span>`;

 return `<div class="hw-cipher-backdrop">
  <div class="hw-cipher-modal arwes-frame gold">
   <div class="arwes-scanner-line"></div>
   <div class="arwes-corner tl"></div><div class="arwes-corner tr"></div>
   <div class="arwes-corner bl"></div><div class="arwes-corner br"></div>
   <div class="hw-cipher-header">
    <div>
     <h3 style="margin:0;font-size:16px;font-weight:900">📜 SỔ MẬT THƯ CỔ ĐẠI · ${esc(m.title)}</h3>
     <p style="margin:4px 0 0;font-size:12px;color:#cbd5e1">${esc(m.cipherHint || 'Ghép 5 ký tự cổ thu thập được từ các trạm để mở phong ấn tối thượng!')}</p>
    </div>
    <button type="button" class="hw-btn-flee" data-action="closeCipherNotebook" title="Đóng">✕</button>
   </div>
   <div class="hw-cipher-body">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
     <span style="font-size:12px;font-weight:900;color:#fde047">
      🗝️ TIẾN ĐỘ THU THẬP: ${earnedLetters.length}/${cipherLetters.length} MẢNH RUNE
     </span>
     <span class="pill ${isReady?'green':'gold'}" style="font-size:11px">
      ${isReady ? '✨ ĐỦ 5 MẢNH – SẴN SÀNG GIẢI MÃ' : 'Đang thu thập mảnh từ các trạm'}
     </span>
    </div>
    <div class="hw-cipher-slots">${slotsHtml}</div>
    <div style="font-size:12px;font-weight:800;color:#94a3b8;margin:12px 0 6px">
     MẢNH RUNE KHẢ DỤNG (CHẠM VÀO ĐỂ ĐẶT VÀO Ô TRỐNG):
    </div>
    <div class="hw-cipher-tray">${chipsHtml}</div>
    ${cipherState.error ? `<div class="hw-cipher-error">⚠️ ${esc(cipherState.error)}</div>` : ''}
    ${cipherState.successMsg ? `<div class="hw-cipher-success">🎉 ${esc(cipherState.successMsg)}</div>` : ''}
   </div>
   <div class="hw-cipher-footer">
    <div style="display:flex;gap:8px">
     <button type="button" class="button gray sm" data-action="resetCipherSlots">↺ Xếp lại từ đầu</button>
     <button type="button" class="button gray sm" data-action="closeCipherNotebook">Đóng sổ</button>
    </div>
    <button type="button" class="button gold" data-action="submitCipherNotebook" ${placedLetters.length < 5 ? 'disabled' : ''}>
     🔓 GIẢI MÃ MẬT THƯ (${placedLetters.length}/5)
    </button>
   </div>
  </div>
 </div>`;
}

function renderTeamRolesModal(m){
 const defaultRoles = [
  '🧭 TV1 (Dẫn đường & Thám hiểm): Quan sát bản đồ Oxyz, xác định vị trí trạm và mỏ tinh thể.',
  '📐 TV2 (Nhà Toán học): Nhận diện dạng toán và áp dụng công thức chuẩn GDPT 2018.',
  '⚡ TV3 (Chuyên gia Vectơ & Tọa độ): Thực hiện phép tính từng trục Ox, Oy, Oz cẩn thận dấu âm.',
  '📜 TV4 (Nhà Giải Mật mã): Ghi chép ký tự rune cổ và sắp xếp mật thư.',
  '👑 Đội trưởng (Chỉ huy & Điều khiển): Điều khiển nhân vật di chuyển (WASD / D-Pad), nhấn phím E tương tác và chốt đáp án.'
 ];
 const roles = (m.teamRoles && m.teamRoles.length) ? m.teamRoles : defaultRoles;
 return `<div class="hw-roles-backdrop">
  <div class="hw-roles-modal">
   <div class="hw-roles-head">
    <div>
     <h3 style="margin:0;font-size:16px;font-weight:900">🤝 PHÂN VAI HỢP TÁC NHÓM 5 THÀNH VIÊN</h3>
     <small style="color:#bae6fd">${esc(m.title)} · Phân chia nhiệm vụ theo chuẩn GDPT 2018</small>
    </div>
    <button type="button" class="hw-btn-flee" data-action="closeTeamRoles" title="Đóng">✕</button>
   </div>
   <div class="hw-roles-list">
    ${roles.map((r, idx) => `<div class="hw-role-card" style="border-left-color:${idx === m.round ? '#facc15' : '#38bdf8'}">
     <b>${esc(r.split(':')[0] || ('Vai trò ' + (idx + 1)))}</b>
     <div style="color:#cbd5e1;margin-top:2px">${esc(r.split(':').slice(1).join(':') || r)}</div>
    </div>`).join('')}
    <div style="background:rgba(250,204,21,.1);border:1.5px solid #facc15;border-radius:12px;padding:10px 14px;color:#fef08a;font-size:12px">
     💡 <b>Gợi ý phối hợp:</b> Sau mỗi trạm, các thành viên hãy luân phiên đảm nhận vai trò điều khiển nhân vật và tính toán để cả nhóm cùng tiến bộ!
    </div>
   </div>
   <div style="background:#0b1120;padding:12px 20px;text-align:right;border-top:1px solid #1e293b">
    <button type="button" class="button primary sm" data-action="closeTeamRoles">Đã Rõ Phân Vai – Tiếp Tục Nhiệm Vụ →</button>
   </div>
  </div>
 </div>`;
}

function renderQuestDialogueModal(){
 if (!questDialogue) return '';
 return `<div class="hw-roles-backdrop">
  <div class="hw-roles-modal" style="max-width:500px">
   <div class="hw-roles-head" style="background:linear-gradient(90deg,#581c87,#3b0764)">
    <div style="display:flex;align-items:center;gap:10px">
     <span style="font-size:28px">${questDialogue.avatar || '🧙‍♂️'}</span>
     <div>
      <h3 style="margin:0;font-size:15px;font-weight:900">${esc(questDialogue.name || 'NPC Giao Nhiệm Vụ')}</h3>
      <small style="color:#e9d5ff">${esc(questDialogue.role || 'Cố vấn thám hiểm')}</small>
     </div>
    </div>
    <button type="button" class="hw-btn-flee" data-action="closeQuestDialogue">✕</button>
   </div>
   <div style="padding:18px;font-size:13.5px;line-height:1.55;color:#e2e8f0">
    ${questDialogue.text}
   </div>
   <div style="background:#0b1120;padding:12px 18px;text-align:right;border-top:1px solid #1e293b">
    <button type="button" class="button gold sm" data-action="closeQuestDialogue">Đã rõ nhiệm vụ – Lên đường ngay! →</button>
   </div>
  </div>
 </div>`;
}

function renderGridOverlay(m){
 if (m.id !== 4) return '';
 let lines = '';
 for (let x = 0; x <= 8; x++) {
  const px = 14 + (x / 8) * 72;
  lines += `<div class="hw-grid-line-x" style="position:absolute;left:${px}%;top:18%;bottom:18%;width:1px;background:rgba(45,212,191,0.22);pointer-events:none"></div>`;
  lines += `<div class="hw-grid-label-x" style="position:absolute;left:${px}%;bottom:14%;transform:translateX(-50%);font-size:10px;font-weight:900;color:#2dd4bf;pointer-events:none">${x}</div>`;
 }
 for (let y = 0; y <= 6; y++) {
  const py = 80 - (y / 6) * 62;
  lines += `<div class="hw-grid-line-y" style="position:absolute;left:14%;right:14%;top:${py}%;height:1px;background:rgba(45,212,191,0.22);pointer-events:none"></div>`;
  lines += `<div class="hw-grid-label-y" style="position:absolute;left:10%;top:${py}%;transform:translateY(-50%);font-size:10px;font-weight:900;color:#2dd4bf;pointer-events:none">${y}</div>`;
 }
 return `<div class="hw-grid-overlay">${lines}
  <div style="position:absolute;left:10%;bottom:14%;font-size:11px;font-weight:900;color:#facc15;pointer-events:none">O(0;0)</div>
  <div style="position:absolute;right:10%;bottom:14%;font-size:11px;font-weight:900;color:#2dd4bf;pointer-events:none">Trục Ox ➔</div>
  <div style="position:absolute;left:10%;top:14%;font-size:11px;font-weight:900;color:#2dd4bf;pointer-events:none">Trục Oy ⬆</div>
 </div>`;
}


/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 3: LÒ RÈN TINH THỂ & THÁP PHA LÊ (CHẶNG 3 - CRYSTAL FORGE)
   ═══════════════════════════════════════════════════════════════════════════ */

function renderZombieShooterSVG(){
 return `<svg viewBox="0 0 100 120" width="68" height="82" style="filter:drop-shadow(0 4px 8px rgba(0,0,0,0.4))">
  <ellipse cx="45" cy="112" rx="28" ry="7" fill="rgba(0,0,0,0.3)"/>
  <rect x="32" y="80" width="10" height="26" rx="4" fill="#854d0e"/>
  <rect x="48" y="80" width="10" height="26" rx="4" fill="#713f12"/>
  <path d="M28 102 h16 v10 h-18 z" fill="#3f2305"/>
  <path d="M46 102 h16 v10 h-18 z" fill="#2d1904"/>
  <rect x="28" y="48" width="34" height="34" rx="8" fill="#2563eb"/>
  <rect x="30" y="76" width="30" height="6" fill="#1e293b"/>
  <rect x="42" y="75" width="6" height="8" fill="#facc15" rx="1"/>
  <path d="M48 54 l24 8 l-4 10 l-22 -6 z" fill="#3b82f6"/>
  <circle cx="70" cy="62" r="5" fill="#fbcfe8"/>
  <rect x="62" y="56" width="28" height="12" rx="3" fill="#ea580c"/>
  <rect x="66" y="52" width="14" height="6" rx="2" fill="#38bdf8"/>
  <rect x="88" y="59" width="8" height="6" rx="1" fill="#facc15"/>
  <circle cx="94" cy="62" r="3" fill="#ef4444"/>
  <circle cx="44" cy="34" r="16" fill="#fed7aa"/>
  <ellipse cx="48" cy="34" rx="3.5" ry="4.5" fill="#1e293b"/>
  <circle cx="49.5" cy="32.5" r="1.5" fill="#fff"/>
  <path d="M44 42 q4 3 8 0" stroke="#9a3412" stroke-width="2" fill="none"/>
  <path d="M24 30 q20 -24 40 0 c2 4 -4 8 -8 7 q-12 -6 -24 0 c-4 1 -10 -3 -8 -7 z" fill="#15803d"/>
  <rect x="25" y="28" width="38" height="4" rx="2" fill="#166534"/>
  <polygon points="44,20 45.5,24 50,24 46.5,26.5 48,31 44,28 40,31 41.5,26.5 38,24 42.5,24" fill="#facc15"/>
 </svg>`;
}

function renderZombieWalkingSVG(){
 return `<svg viewBox="0 0 100 120" width="64" height="78" style="filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3))">
  <ellipse cx="48" cy="112" rx="26" ry="6" fill="rgba(0,0,0,0.25)"/>
  <rect x="34" y="78" width="11" height="28" rx="4" fill="#334155"/>
  <rect x="49" y="80" width="11" height="26" rx="4" fill="#1e293b"/>
  <circle cx="39" cy="108" r="5" fill="#475569"/>
  <circle cx="54" cy="108" r="5" fill="#334155"/>
  <rect x="28" y="46" width="34" height="34" rx="6" fill="#e2e8f0"/>
  <path d="M28 66 l8 8 l8 -6 l8 8 l10 -6 v14 h-34 z" fill="#64748b"/>
  <path d="M40 52 l-22 10 l3 8 l20 -8 z" fill="#86efac"/>
  <circle cx="18" cy="62" r="5" fill="#4ade80"/>
  <circle cx="48" cy="30" r="18" fill="#86efac"/>
  <path d="M34 18 l4 -8 l6 6 l6 -8 l6 8 l4 -6 l4 8 z" fill="#334155"/>
  <circle cx="42" cy="28" r="6" fill="#fff" stroke="#1e293b" stroke-width="1.5"/>
  <circle cx="43" cy="28" r="2.5" fill="#dc2626"/>
  <circle cx="54" cy="27" r="5" fill="#fff" stroke="#1e293b" stroke-width="1.5"/>
  <circle cx="53" cy="27" r="2" fill="#1e293b"/>
  <path d="M40 38 q8 6 16 0 z" fill="#450a0a"/>
  <rect x="44" y="38" width="3" height="4" fill="#fff"/>
 </svg>`;
}


/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 3: CHẶN ZOMBIE 4 LÀN (EXACT GIAOVIENDOIMOI REA ASSETS)
   ═══════════════════════════════════════════════════════════════════════════ */
async function shootZombieLane(laneIdx){
  if(zdState.shooting || busy) return;
  const m = world?.current;
  const isReady = Boolean(m?.cipherReady || world?.me?.cipherReady);
  if(isReady){
    cipherState.open = true;
    cipherState.error = null;
    render();
    return;
  }
  if(m) zdEnsureRound(m);
  zdState.lane = laneIdx;
  zdState.shooting = true;
  zdState.hintMsg = null;
  zdState.rewardMsg = null;
  zdState.firedAt = performance.now();
  sound('laser');
  render();

  try{
    const res = await submitStageAnswer({choice: laneIdx});
    if(res?.correct){
      zdState.hitLane = laneIdx;
      zdState.hitType = 'hit';
      zdState.lanes[laneIdx].dead = true;
      playZdSound('hit');
      const piece = res.cipherPiece || m?.challenge?.cipherPiece || '';
      zdState.rewardMsg = `💥 TIÊU DIỆT ZOMBIE! +${res.goldEarned||120} VÀNG ${piece ? '· NHẬN MẢNH [' + piece + ']' : ''}`;
      render();
      setTimeout(()=>{
        zdState.shooting = false;
        zdState.hitLane = null;
        zdState.hitType = null;
        zdState.rewardMsg = null;
        if(res.cipherReady){
          cipherState.open = true;
          cipherState.error = null;
        }
        updateAfterAction();
      }, 650);
    }else{
      if(world?.me && res?.health !== undefined) world.me.health = res.health;
      zdState.hintMsg = res?.hint || 'Hãy kiểm tra lại công thức độ dài AB = √((xB-xA)² + (yB-yA)² + (zB-zA)²) nhé!';
      playZdSound('miss');
      zdStartCharge(laneIdx);
      render();
    }
  }catch(err){
    playZdSound('miss');
    zdStartCharge(laneIdx);
    render();
  }
}

/* ─── CƠ CHẾ ZOMBIE TIẾN CÔNG: BÒ DẦN VỀ HÀNG RÀO, BẮN TRƯỢT → TĂNG TỐC & LAO TỚI CẮN NGƯỜI CHƠI ─── */
const ZD_BASE_SPEED = 0.012;   // tiến độ/giây khi bò chậm (≈ 80 giây mới chạm hàng rào)
const ZD_SPEED_STEP = 0.6;     // mỗi lần bắn trượt: tốc độ nền tăng thêm 60%
const ZD_RUSH_MULT = 7;        // hệ số chạy nước rút của cả bầy ngay sau khi bắn trượt
const ZD_RUSH_MS = 1500;
const ZD_CHARGE_MS = 1000;     // thời gian zombie bị bắn trượt lao từ vị trí hiện tại tới người chơi

function zdFreshLanes(){
  return [0,1,2,3].map(()=>({s:0, s0:0, charging:false, chargeStart:0, impacted:false, dead:false, respawn:false}));
}

function zdEnsureRound(m){
  const key = m.id + '-' + m.round;
  if(zdState.roundKey !== key || !zdState.lanes){
    zdState.roundKey = key;
    zdState.lanes = zdFreshLanes();
    zdState.speedLevel = 0;
    zdState.rushUntil = 0;
    zdState.playerHitUntil = 0;
    zdState.biteMsg = null;
  }
}

/* s ∈ [0,1]: từ điểm xuất phát bên phải → sát hàng rào; s ∈ [1,2]: vượt hàng rào → chạm người chơi */
function zdLeftCss(s){
  const a = Math.min(1, Math.max(0, s));
  const b = Math.max(0, Math.min(1, s - 1));
  return `calc((100% - 313px) * ${(1 - a).toFixed(4)} + ${(112 * a - 92 * b).toFixed(1)}px)`;
}

function zdSpeedMult(){
  return 1 + ZD_SPEED_STEP * (zdState.speedLevel || 0);
}

function zdStartCharge(laneIdx){
  if(!zdState.lanes) zdState.lanes = zdFreshLanes();
  const now = performance.now();
  const L = zdState.lanes[laneIdx];
  zdState.speedLevel = (zdState.speedLevel || 0) + 1;
  zdState.rushUntil = now + ZD_RUSH_MS;
  L.charging = true;
  L.impacted = false;
  L.respawn = false;
  L.s0 = L.s;
  L.chargeStart = now;
  sound('boss_roar');
}

function zdImpact(laneIdx){
  const now = performance.now();
  zdState.playerHitUntil = now + 850;
  zdState.biteMsg = '🧟 ZOMBIE ĐÃ LAO TỚI CẮN! −1 KHIÊN 💔';
  try{
    const a = new Audio('/sounds/sfx/explosion.mp3');
    a.volume = 0.55;
    a.play().catch(()=>{});
  }catch(e){}
  sound('wrong');
  const gun = document.getElementById('zdGunner');
  if(gun){ gun.classList.remove('hurt'); void gun.offsetWidth; gun.classList.add('hurt'); }
  const board = document.getElementById('zdBoard');
  if(board){ board.classList.remove('shake'); void board.offsetWidth; board.classList.add('shake'); }

  setTimeout(()=>{
    const L = zdState.lanes?.[laneIdx];
    if(L){
      // Zombie bị đẩy lùi về điểm xuất phát để đội làm lại câu hỏi
      L.charging = false;
      L.impacted = false;
      L.s = 0;
      L.respawn = true;
    }
    zdState.shooting = false;
    zdState.biteMsg = null;
    render();
    setTimeout(()=>{ if(L) L.respawn = false; }, 600);
  }, 900);
}

function zdTick(now, dt, m){
  zdEnsureRound(m);
  if(m.cipherReady || world.me?.cipherReady || cipherState.open || world.paused) return;
  const rushing = now < (zdState.rushUntil || 0);
  const speed = ZD_BASE_SPEED * zdSpeedMult() * (rushing ? ZD_RUSH_MULT : 1);
  zdState.lanes.forEach((L, i)=>{
    if(L.dead) return;
    if(L.charging){
      const t = Math.min(1, (now - L.chargeStart) / ZD_CHARGE_MS);
      L.s = L.s0 + (2 - L.s0) * t * t; // tăng tốc dần (ease-in) khi lao tới
      if(t >= 1 && !L.impacted){
        L.impacted = true;
        zdImpact(i);
      }
    }else{
      L.s = Math.min(1, L.s + speed * dt);
    }
    const el = document.getElementById('zdUnit' + i);
    if(el){
      el.style.left = zdLeftCss(L.s);
      el.classList.toggle('rushing', rushing || L.charging);
      el.classList.toggle('charging', L.charging);
      el.classList.toggle('at-fence', !L.charging && L.s >= 0.999);
    }
  });
  const spd = document.getElementById('zdSpeedPill');
  if(spd) spd.textContent = `🧟 Tốc độ zombie x${zdSpeedMult().toFixed(1)}`;
}

function renderZombieDefenseGame(m){
  zdEnsureRound(m);
  const r = m.round;
  const q = m.challenge;
  const isReady = Boolean(m.cipherReady || world.me?.cipherReady);
  const laneLabels = ['A', 'B', 'C', 'D'];
  const opts = q.options || ['?', '?', '?', '?'];
  const health = Math.max(0, Math.min(3, world.me?.health ?? 3));
  const now = performance.now();
  const rushing = now < (zdState.rushUntil || 0);
  const playerHurt = now < (zdState.playerHitUntil || 0);
  const firing = now - (zdState.firedAt || 0) < 320;

  const lanesHtml = [0, 1, 2, 3].map(i => {
    const isAimed = (zdState.lane === i);
    return `<div class="zd-lane ${i%2 ? 'odd' : 'even'} ${isAimed ? 'aimed' : ''}" style="top:${i*25}%;" data-action="shootZombieLane" data-lane="${i}">
     <span class="zd-lane-key">${laneLabels[i]}</span>
    </div>`;
  }).join('');

  const unitsHtml = [0, 1, 2, 3].map(i => {
    const L = zdState.lanes[i];
    const isHit = (zdState.hitLane === i && zdState.hitType === 'hit');
    const cls = [
      isHit ? 'dying' : '',
      (rushing || L.charging) ? 'rushing' : '',
      L.charging ? 'charging' : '',
      (!L.charging && L.s >= 0.999) ? 'at-fence' : '',
      L.respawn ? 'respawn' : ''
    ].join(' ');
    return `<div class="zd-unit ${cls}" id="zdUnit${i}" style="top:calc(${i*25}% + 12.5%);left:${zdLeftCss(L.s)}" data-action="shootZombieLane" data-lane="${i}" title="Bấm để bắn Zombie mang đáp án ${laneLabels[i]}">
      <div class="zd-zombie"></div>
      <div class="zd-flag">
       <div class="zd-flag-rope"></div>
       <div class="zd-flag-cloth">
        <div class="zd-flag-inner">
         <div class="zd-flag-key">${laneLabels[i]}</div>
         <div class="zd-flag-content">
          <span class="zd-flag-text">${formatMath(opts[i])}</span>
         </div>
        </div>
       </div>
      </div>
      ${isHit ? `<div class="zd-pop hit">💥 CHÍNH XÁC! +XP</div>` : ''}
      ${L.charging ? `<div class="zd-pop miss">❌ TRƯỢT! ZOMBIE LAO TỚI!</div>` : ''}
     </div>`;
  }).join('');

  const aimL = zdState.lanes[zdState.lane] || {s:0};

  return `<div class="zd-player-wrap">
   <div class="zd-hud">
    <div class="zd-hud-title">
     <span class="tag" style="background:#7c3aed;border-color:#c084fc">🧟 CHẶN ZOMBIE · CHẶNG 3</span>
     <b>THÁP PHA LÊ KHOẢNG CÁCH</b>
    </div>
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
     <span class="zd-hud-score">⭐ ${world.me?.score||0} XP · 🪙 ${world.me?.gold||120}</span>
     <span title="Khiên bảo vệ">${'💖'.repeat(health)}${'🖤'.repeat(Math.max(0,3-health))}</span>
     <span class="pill ${zdState.speedLevel ? 'red' : 'purple'}" id="zdSpeedPill" style="font-size:12px">🧟 Tốc độ zombie x${zdSpeedMult().toFixed(1)}</span>
     <span class="pill purple" style="font-size:12px">Câu ${Math.min(r+1, m.totalRounds)}/${m.totalRounds}</span>
     <button type="button" class="hw-btn-hud ${isReady?'alert':''}" data-action="openCipherNotebook">
      📜 SỔ MẬT THƯ (${Math.min(r,5)}/5 MẢNH)
     </button>
     <button type="button" class="hw-btn-hud" data-action="openTeamRoles">
      🤝 PHÂN VAI
     </button>
     <button type="button" class="button gray sm" data-action="hint">💡 Gợi ý (2 Cấp)</button>
     <button type="button" class="oxyz-toggle-btn" style="padding:4px 10px;font-size:11.5px" data-action="toggle3DPanel">🧊 3D Oxyz</button>
    </div>
   </div>

   ${zdState.rewardMsg ? `<div style="background:linear-gradient(90deg,#15803d,#22c55e);color:#fff;padding:8px 16px;font-weight:900;text-align:center;font-size:14px">🎉 ${esc(zdState.rewardMsg)}</div>` : ''}
   ${zdState.hintMsg ? `<div style="background:linear-gradient(90deg,#991b1b,#dc2626);color:#fff;padding:8px 16px;font-weight:800;text-align:center;font-size:13px">💡 Bắn trượt – zombie đã tăng tốc! Gợi ý từ NOVA: ${esc(zdState.hintMsg)}</div>` : ''}

   <div class="zd-field">
    <div class="zd-header-band">
     <div class="zd-card">
      <span class="zd-card-num">${isReady ? '✨ ĐÃ HOÀN THÀNH 5/5 CÂU HỎI – SẴN SÀNG GIẢI MÃ THÁP PHA LÊ!' : ('CÂU ' + (r+1) + ' / ' + m.totalRounds + ' · ' + esc(q.label))}</span>
      <div class="zd-card-text">${isReady ? '🎉 Chúc mừng! Đội đã tiêu diệt toàn bộ 5 đợt Zombie và thu thập đủ 5 mảnh cổ tự P - H - A - L - E! Hãy bấm nút Mở Sổ Mật Thư bên dưới để ghép từ khóa mở Tháp Pha Lê!' : ('🧩 ' + formatMath(q.prompt))}</div>
     </div>
    </div>

    <div class="zd-lanes-board" id="zdBoard">
     ${lanesHtml}

     <div class="zd-fence"></div>

     <div class="zd-gunner ${playerHurt ? 'hurt' : ''}" id="zdGunner" style="top:calc(${zdState.lane * 25}% + 12px);">
      <img src="/images/zombie-defense/gunner.png" alt="Gunner" class="zd-gunner-img ${firing ? 'recoil' : ''}">
      ${firing ? '<div class="zd-g-muzzle"></div>' : ''}
      ${zdState.biteMsg ? `<div class="zd-bite-pop">${esc(zdState.biteMsg)}</div>` : ''}
     </div>

     ${firing ? `
      <div class="zd-bullet" style="top:calc(${zdState.lane * 25}% + 44px);--zd-target:calc(${zdLeftCss(Math.min(1, aimL.s))} + 20px);"></div>
     ` : ''}

     ${unitsHtml}

     ${isReady ? `
      <div style="position:absolute;inset:0;background:rgba(15,23,42,0.78);backdrop-filter:blur(4px);z-index:35;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:20px;text-align:center">
       <div style="font-size:52px">💠</div>
       <h3 style="color:#fde047;font-size:22px;font-weight:900;margin:0">ĐÃ THU THẬP ĐỦ 5 MẢNH RUNE: P - H - A - L - E!</h3>
       <p style="color:#e9d5ff;max-width:520px;margin:0;font-size:14px">Hãy mở Sổ Mật Thư và ghép chính xác từ khóa 5 chữ cái để phá giải phong ấn Tháp Pha Lê Khoảng Cách và nhận Mảnh Số Mật Mã Chặng 3!</p>
       <button type="button" class="button gold pulse-urgent" style="font-size:15px;padding:12px 24px" data-action="openCipherNotebook">
        🔓 MỞ SỔ MẬT THƯ & GHÉP CHỮ "PHALE" NGAY!
       </button>
      </div>
     ` : ''}
    </div>
   </div>

   <div class="zd-botbar">
    <div>
     ⌨️ <b>Điều khiển:</b> Nhấp chuột vào Zombie (A / B / C / D) hoặc phím <b>W / S</b> (<b>↑ / ↓</b>) chọn làn + <b>Space / Enter</b> để bắn! ⚠️ Bắn trượt: zombie <b>tăng tốc</b> và <b>lao tới cắn</b> xạ thủ!
    </div>
    <div>
     ${isReady ? `
      <button type="button" class="button gold pulse-urgent" data-action="openCipherNotebook">
       🔓 ĐỦ 5 MẢNH – GIẢI MÃ PHALE MỞ THÁP!
      </button>
     ` : `
      <span style="color:#e9d5ff;font-weight:700">Mảnh rune đã thu thập: ${r}/5 (P - H - A - L - E)</span>
     `}
    </div>
   </div>

   ${cipherState.open ? renderCipherNotebookModal(m) : ''}
   ${showRolesModal ? renderTeamRolesModal(m) : ''}
  </div>`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 4: MÊ CUNG TỌA ĐỘ Ô VUÔNG (CHẶNG 4 - INTERACTIVE 2-COLUMN GRID MAZE)
   ═══════════════════════════════════════════════════════════════════════════ */
function findMazePath(startX, startY, targetX, targetY){
  const q = [[startX, startY, []]];
  const visited = new Set([startX + ',' + startY]);
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while(q.length > 0){
    const [cx, cy, path] = q.shift();
    if(cx === targetX && cy === targetY) return path;
    for(const [dx, dy] of dirs){
      const nx = cx + dx, ny = cy + dy;
      const key = nx + ',' + ny;
      if(nx >= 0 && nx <= 8 && ny >= 0 && ny <= 6 && !isMazeWall(nx, ny) && !visited.has(key)){
        visited.add(key);
        q.push([nx, ny, [...path, [nx, ny]]]);
      }
    }
  }
  return [[targetX, targetY]];
}

async function animateMazeWalkTo(targetX, targetY){
  const path = findMazePath(mazeState.x, mazeState.y, targetX, targetY);
  if(!path.length) return;
  mazeState.walking = true;
  for(const [nx, ny] of path){
    mazeState.x = nx;
    mazeState.y = ny;
    sound('step');
    render();
    await new Promise(r => setTimeout(r, 95));
  }
  mazeState.walking = false;
  render();
}

async function answerMazeQuestion(choiceIdx){
  if(mazeState.walking || busy) return;
  const m = world?.current;
  if(!m) return;
  const isReady = Boolean(m.cipherReady || world.me?.cipherReady);
  if(isReady){
    cipherState.open = true;
    cipherState.error = null;
    render();
    return;
  }

  const r = m.round;
  const curTarget = mazeState.waypoints[Math.min(r, 4)] || {x: 4, y: 3, label: 'M(4; 3)'};
  mazeState.hintMsg = null;
  mazeState.toastMsg = null;

  // Bước 1: Nhân vật tự động tìm đường chạy trong mê cung tới ô Trạm mục tiêu
  if(mazeState.x !== curTarget.x || mazeState.y !== curTarget.y){
    await animateMazeWalkTo(curTarget.x, curTarget.y);
  }

  // Bước 2: Gửi đáp án kiểm tra tọa độ
  try{
    const res = await submitStageAnswer({choice: choiceIdx});
    if(res && res.correct){
      sound('gem');
      const piece = res.cipherPiece || m.challenge?.cipherPiece || '';
      mazeState.toastType = 'correct';
      mazeState.toastMsg = `✨ KÍCH HOẠT TRẠM ${r+1} THÀNH CÔNG! NHẬN MẢNH [${piece}] · +${res.goldEarned||120} VÀNG`;
      render();
      setTimeout(()=>{
        mazeState.toastMsg = null;
        if(res.cipherReady){
          cipherState.open = true;
          cipherState.error = null;
        }
        updateAfterAction();
      }, 750);
    }else{
      sound('wrong');
      mazeState.shaking = true;
      mazeState.toastType = 'wrong';
      mazeState.toastMsg = '❌ TỌA ĐỘ CHƯA CHÍNH XÁC! HÃY KIỂM TRA LẠI CÔNG THỨC!';
      mazeState.hintMsg = res?.hint || 'Công thức trung điểm: M = ((xA+xB)/2 ; (yA+yB)/2 ; (zA+zB)/2). Trọng tâm: chia 3.';
      if(world?.me && res?.health !== undefined) world.me.health = res.health;
      render();
      setTimeout(()=>{
        mazeState.shaking = false;
        mazeState.toastMsg = null;
        render();
      }, 650);
    }
  }catch(e){
    mazeState.shaking = false;
    render();
  }
}

function moveMazeStep(dx, dy){
  if(mazeState.walking) return;
  const nx = Math.max(0, Math.min(8, mazeState.x + dx));
  const ny = Math.max(0, Math.min(6, mazeState.y + dy));
  if(!isMazeWall(nx, ny)){
    mazeState.x = nx;
    mazeState.y = ny;
    sound('step');
    render();
  }else{
    sound('wrong');
  }
}

function renderGridMazeGame(m){
  const r = m.round;
  const q = m.challenge;
  const isReady = Boolean(m.cipherReady || world.me?.cipherReady);
  const curTarget = mazeState.waypoints[Math.min(r, 4)] || {x: 4, y: 3, label: 'M(4; 3)'};
  const opts = q.options || ['?', '?', '?', '?'];
  const health = Math.max(0, Math.min(3, world.me?.health ?? 3));

  // Build 9x7 cells (x = 0..8, y = 0..6)
  let cellsHtml = '';
  for (let y = 6; y >= 0; y--) {
    for (let x = 0; x <= 8; x++) {
      const isWall = isMazeWall(x, y);
      const isPlayer = (mazeState.x === x && mazeState.y === y);
      const wpIdx = mazeState.waypoints.findIndex(w => w.x === x && w.y === y);
      const isPad = wpIdx !== -1;
      const isClearedPad = isPad && wpIdx < r;
      const isActivePad = isPad && wpIdx === r && !isReady;
      const isChest = (x === 8 && y === 5);

      let cellContent = '';
      if (isPlayer) {
        cellContent = `<div class="hw-maze-player">${CHAR_EXPLORER_SVG}</div>`;
      } else if (isChest) {
        cellContent = isReady ? '👑' : '🔒';
      } else if (isActivePad) {
        cellContent = `<span title="Trạm ${wpIdx+1}">🎯</span>`;
      } else if (isClearedPad) {
        cellContent = '✅';
      }

      const coordTag = (!isWall && (x % 2 === 0 && y % 2 === 0)) ? `<small style="position:absolute;bottom:2px;right:3px;font-size:8.5px;color:rgba(148,163,184,0.45);pointer-events:none">(${x};${y})</small>` : '';
      const cellCls = isWall ? 'wall' : (isChest ? 'chest-cell' : (isActivePad ? 'pad' : (isClearedPad ? 'pad cleared' : '')));
      cellsHtml += `<div class="hw-grid-cell ${cellCls}" data-action="clickMazeCell" data-x="${x}" data-y="${y}" title="Ô tọa độ (${x}; ${y})">
       ${cellContent}${coordTag}
      </div>`;
    }
  }

  return `<div class="hw-maze-wrapper ${mazeState.shaking ? 'shake' : ''}">
   <div class="hw-forge-head">
    <div>
     <span class="tag" style="background:#0f766e;border-color:#2dd4bf">🌀 MÊ CUNG TỌA ĐỘ Ô VUÔNG · CHẶNG 4</span>
     <h3 style="margin:4px 0 0;font-size:17px;font-weight:900">BÀN CỜ MÊ CUNG TỌA ĐỘ & CỔNG DỊCH CHUYỂN TRUNG ĐIỂM</h3>
    </div>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
     <span class="pill gold">⭐ ${world.me?.score||0} XP · 🪙 ${world.me?.gold||120}</span>
     <span title="Khiên bảo vệ">${'💖'.repeat(health)}${'🖤'.repeat(Math.max(0,3-health))}</span>
     <button type="button" class="hw-btn-hud ${isReady?'alert':''}" data-action="openCipherNotebook">
      📜 SỔ MẬT THƯ (${Math.min(r,5)}/5 MẢNH)
     </button>
     <button type="button" class="hw-btn-hud" data-action="openTeamRoles">
      🤝 PHÂN VAI NHÓM
     </button>
     <button type="button" class="oxyz-toggle-btn" style="padding:4px 10px;font-size:11.5px" data-action="toggle3DPanel">🧊 3D Oxyz</button>
    </div>
   </div>

   ${mazeState.toastMsg ? `<div style="background:${mazeState.toastType==='correct'?'linear-gradient(90deg,#0f766e,#14b8a6)':'linear-gradient(90deg,#991b1b,#dc2626)'};color:#fff;padding:8px 14px;border-radius:10px;font-weight:900;text-align:center;font-size:13.5px">${esc(mazeState.toastMsg)}</div>` : ''}
   ${mazeState.hintMsg ? `<div style="background:rgba(250,204,21,0.16);border:1px solid #facc15;color:#fef08a;padding:8px 14px;border-radius:10px;font-size:12.5px">💡 <b>Gợi ý từ NOVA:</b> ${esc(mazeState.hintMsg)}</div>` : ''}

   <div style="display:grid;grid-template-columns:minmax(290px, 360px) 1fr;gap:16px;align-items:stretch">
    <!-- CỘT TRÁI: CÂU HỎI TỌA ĐỘ & BẢNG CHỌN ĐÁP ÁN TRỰC TIẾP -->
    <div style="background:#f8fafc;color:#0f172a;border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;border:2px solid #2dd4bf;box-shadow:0 8px 20px rgba(0,0,0,0.3)">
     <div>
      <div style="font-size:12px;font-weight:900;color:#0f766e;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">
       ${isReady ? '👑 ĐÃ MỞ ĐỦ 5 TRẠM TỌA ĐỘ!' : ('TRẠM ' + (r+1) + ' / ' + m.totalRounds + ' · ' + esc(q.label))}
      </div>
      <div style="font-size:16px;font-weight:800;line-height:1.45;color:#0f172a;margin-bottom:12px">
       ${isReady ? 'Đội đã thu thập đủ 5 mảnh cổ ngữ T - R - U - N - G! Hãy bấm nút Mở Phòng Kho Báu để ghép mật thư TRUNG và nhận Mảnh Số 2!' : formatMath(q.prompt)}
      </div>

      ${!isReady ? `
       <div style="display:grid;grid-template-columns:1fr;gap:8px;margin-top:8px">
        ${opts.map((opt, i) => `
         <button type="button" class="maze-ans-btn" data-action="answerMazeQuestion" data-choice="${i}" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;border:2px solid #cbd5e1;background:#ffffff;color:#0f172a;font-weight:800;font-size:14.5px;cursor:pointer;text-align:left;transition:all 0.15s">
          <span style="width:26px;height:26px;border-radius:50%;background:#0f766e;color:#fff;display:inline-grid;place-items:center;font-size:13px;font-weight:900;flex-shrink:0">${labels[i]}</span>
          <span>${formatMath(opt)}</span>
         </button>
        `).join('')}
       </div>
      ` : `
       <button type="button" class="button gold block pulse-urgent" style="margin-top:12px;padding:12px;font-size:14px" data-action="openCipherNotebook">
        👑 GHÉP MÃ "TRUNG" MỞ PHÒNG KHO BÁU!
       </button>
      `}
     </div>

     <div style="margin-top:14px;padding-top:12px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
      <div style="display:flex;gap:4px;align-items:center">
       <button type="button" class="button gray sm" data-action="mazeMove" data-dx="-1" data-dy="0" title="Qua trái (A/←)">◀</button>
       <button type="button" class="button gray sm" data-action="mazeMove" data-dx="0" data-dy="1" title="Đi lên (W/↑)">▲</button>
       <button type="button" class="button gray sm" data-action="mazeMove" data-dx="0" data-dy="-1" title="Đi xuống (S/↓)">▼</button>
       <button type="button" class="button gray sm" data-action="mazeMove" data-dx="1" data-dy="0" title="Qua phải (D/→)">▶</button>
      </div>
      <div style="display:flex;gap:6px">
       <button type="button" class="button teal sm" data-action="autoStepToMazeTarget" title="Tự động đi tới ô Trạm mục tiêu">🧭 Tới Trạm</button>
       <button type="button" class="button gray sm" data-action="hint">💡 Gợi ý</button>
      </div>
     </div>
    </div>

    <!-- CỘT PHẢI: BÀN CỜ MÊ CUNG TỌA ĐỘ 9x7 -->
    <div style="display:flex;flex-direction:column;justify-content:space-between">
     <div class="hw-maze-board-container" style="height:100%;display:flex;flex-direction:column;justify-content:center">
      <div class="hw-maze-grid-board">
       ${cellsHtml}
      </div>
      <div class="hw-maze-axis-x">
       <span>Ox: 0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
      </div>
      <div class="hw-maze-axis-y">
       <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>Oy: 6</span>
      </div>
     </div>

     <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-top:8px;background:rgba(15,23,42,0.75);padding:8px 14px;border-radius:10px;border:1px solid rgba(45,212,191,0.3)">
      <div style="font-size:12px;color:#99f6e4">
       📍 Nhân vật đang ở ô: <b style="color:#fde047">(${mazeState.x}; ${mazeState.y})</b> · Cổng Trạm ${Math.min(5, r+1)}: <b style="color:#fff">Ô (${curTarget.x}; ${curTarget.y})</b>
      </div>
      <div style="font-size:12px;font-weight:800;color:#fde047">
       Mảnh mật mã: ${Math.min(r,5)}/5 (T - R - U - N - G)
      </div>
     </div>
    </div>
   </div>

   ${cipherState.open ? renderCipherNotebookModal(m) : ''}
   ${showRolesModal ? renderTeamRolesModal(m) : ''}
  </div>`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 5: DÒ MÌN GIAOVIENDOIMOI - CHÚ LÍNH CHẠY BỘ ĐA HƯỚNG & NỔ BOOM
   ═══════════════════════════════════════════════════════════════════════════ */
const MS_CHOICE_COORDS_4 = [
  { x: 20, y: 50 }, // A (Bên trái)
  { x: 40, y: 25 }, // B (Phía trên bên trái)
  { x: 60, y: 25 }, // C (Phía trên bên phải)
  { x: 80, y: 50 }  // D (Bên phải)
];

const MS_CHOICE_COORDS_3 = [
  { x: 26, y: 52 }, // A (Bên trái)
  { x: 50, y: 25 }, // B (Chính giữa trên)
  { x: 74, y: 52 }  // C (Bên phải)
];

async function stepMinesweeperPad(choiceIdx){
  if(msState.walking || busy) return;
  const isReady = Boolean(world?.current?.cipherReady || world?.me?.cipherReady);
  if(isReady && !world?.current?.isBoss){
    cipherState.open = true;
    cipherState.error = null;
    render();
    return;
  }
  if(msState.explodedMines && msState.explodedMines.includes(choiceIdx)) return;

  const totalOpts = (world?.current?.challenge?.options?.length || 4);
  const coords = (totalOpts === 3) ? MS_CHOICE_COORDS_3 : MS_CHOICE_COORDS_4;
  const target = coords[choiceIdx] || { x: 50, y: 50 };

  const dx = target.x - msState.posX;
  const dy = target.y - msState.posY;
  let dir = 'up';
  if(Math.abs(dx) > Math.abs(dy)){
    dir = dx < 0 ? 'left' : 'right';
  }else{
    dir = dy < 0 ? 'up' : 'down';
  }

  msState.lastChoice = choiceIdx;
  msState.hintMsg = null;
  startSoldierRunning(dir, 550);
  msState.posX = target.x;
  msState.posY = target.y + 6;
  sound('step');
  render();

  try{
    await new Promise(r => setTimeout(r, 480));
    const res = await submitStageAnswer({choice: choiceIdx});

    if(res && res.correct){
      msState.resultType = 'correct';
      msState.walking = false;
      playMsSound('safe');
      render();

      setTimeout(()=>{
        msState.posX = 50;
        msState.posY = 82;
        msState.lastChoice = null;
        msState.resultType = null;
        msState.direction = 'up';
        msState.explodedMines = [];
        msState.hintMsg = null;
        if(res.cipherReady){
          cipherState.open = true;
          cipherState.error = null;
        }
        updateAfterAction();
      }, 820);
    }else{
      msState.resultType = 'wrong';
      msState.blastX = target.x;
      msState.blastY = target.y;
      msState.shaking = true;
      msState.wobble = true;
      msState.hintMsg = res?.hint || 'Hai vectơ cùng phương khi các tọa độ tương ứng tỉ lệ! Hãy thử phương án khác!';
      if(!msState.explodedMines.includes(choiceIdx)){
        msState.explodedMines.push(choiceIdx);
      }
      if(world?.me && res?.health !== undefined){
        world.me.health = res.health;
      }
      playMsSound('mine');
      render();

      setTimeout(()=>{
        startSoldierRunning('down', 420);
        msState.posX = 50;
        msState.posY = 82;
        render();
      }, 350);

      setTimeout(()=>{
        msState.walking = false;
        msState.shaking = false;
        msState.wobble = false;
        msState.lastChoice = null;
        msState.resultType = null;
        msState.blastX = null;
        msState.blastY = null;
        msState.direction = 'up';
        render();
      }, 820);
    }
  }catch(err){
    msState.walking = false;
    msState.posX = 50;
    msState.posY = 82;
    render();
  }
}

function renderMinesweeperGame(m){
  if(m.isBoss || world.me?.bossReady){
    return renderBossRaidGame(m);
  }

  const r = m.round;
  const q = m.challenge;
  const isReady = Boolean(m.cipherReady || world.me?.cipherReady);
  const laneLabels = ['A', 'B', 'C', 'D'];
  const opts = q.options || ['?', '?', '?', '?'];
  const health = Math.max(0, Math.min(3, world.me?.health ?? 3));
  const progressPct = Math.round((Math.min(r, m.totalRounds) / m.totalRounds) * 100);

  const coords = (opts.length === 3) ? MS_CHOICE_COORDS_3 : MS_CHOICE_COORDS_4;

  const choicesHtml = opts.map((optText, i) => {
    const pos = coords[i] || { x: 25 + i * 20, y: 40 };
    const isAimed = (msState.aimedPad === i);
    const isExploded = msState.explodedMines && msState.explodedMines.includes(i);

    return `<div class="ms-field-choice ${isAimed ? 'aimed' : ''} ${isExploded ? 'exploded' : ''}" 
                 style="left:${pos.x}%; top:${pos.y}%;"
                 data-action="stepMinesweeperPad" 
                 data-pad="${i}" 
                 title="${isExploded ? 'Mìn đã nổ!' : 'Bấm để chú lính chạy đến đáp án ' + laneLabels[i]}">
      <div class="ms-choice-badge">${isExploded ? '💥' : laneLabels[i]}</div>
      <div class="ms-choice-text">${formatMath(optText)}</div>
    </div>`;
  }).join('');

  const spriteSrc = getSoldierSprite();

  return `<div class="ms-container-wrap ${msState.shaking ? 'shake' : ''}">
    <!-- CỘT TRÁI: BẢNG CÂU HỎI TRẮNG THANH LỊCH CHUẨN GIAOVIENDOIMOI -->
    <div class="ms-left-sidebar">
      <div class="ms-side-qnum">${isReady ? '✨ ĐÃ VƯỢT QUA 5/5 BÃI MÌN!' : ('CÂU ' + (r+1) + ' / ' + m.totalRounds + ' · ' + esc(q.label || 'VECTƠ OXYZ'))}</div>
      <div class="ms-side-qtext">
        ${isReady ? 'Chúc mừng! Chú lính đã vượt qua toàn bộ 5 bãi mìn và thu thập đủ 5 Cổ Ngữ B - A - O - V - E! Hãy kích hoạt Lá Chắn Thành Trì để bước vào trận ĐẠI CHIẾN BOSS CUỐI!' : formatMath(q.prompt)}
      </div>

      ${msState.hintMsg ? `<div style="margin-top:12px;padding:10px;background:#fef2f2;border:1.5px solid #ef4444;border-radius:10px;font-size:12.5px;color:#991b1b;font-weight:700">💡 <b>Gợi ý NOVA:</b> ${esc(msState.hintMsg)}</div>` : ''}

      <div class="ms-side-footer">
        <button type="button" class="button gray sm" data-action="hint">💡 Gợi ý (2 Cấp)</button>
        <button type="button" class="hw-btn-hud" data-action="openTeamRoles">🤝 PHÂN VAI NHÓM</button>
        <button type="button" class="oxyz-toggle-btn" style="justify-content:center" data-action="toggle3DPanel">🧊 Mô hình 3D Oxyz</button>
        ${isReady ? `
          <button type="button" class="button gold pulse-urgent" data-action="openCipherNotebook">
            🔓 GIẢI MÃ BAOVE MỞ THÀNH!
          </button>
        ` : `
          <button type="button" class="hw-btn-hud" data-action="openCipherNotebook">
            📜 SỔ MẬT THƯ (${r}/5 MẢNH)
          </button>
        `}
      </div>
    </div>

    <!-- CỘT PHẢI: CHIẾN TRƯỜNG BÃI CỎ DÒ MÌN CHÂN THẬT -->
    <div class="ms-right-arena">
      <div class="ms-arena-ground"></div>

      <!-- TOP MINI HUD -->
      <div class="ms-mini-hud">
        <div style="font-size:12px;font-weight:800;color:#fef08a;background:rgba(0,0,0,0.5);padding:5px 12px;border-radius:14px;border:1px solid rgba(255,255,255,0.2)">
          💣 DÒ MÌN · THÀNH TRÌ LỜI TRÍ TUỆ
        </div>

        <div class="ms-hud-pills-center">
          <span style="color:#fde047;font-weight:900;font-size:14px">⭐ ${world.me?.score||0} XP</span>
          <div class="ms-hud-lives" title="Khiên sinh mệnh">
            <span class="${health<1?'lost':''}">💖</span>
            <span class="${health<2?'lost':''}">💖</span>
            <span class="${health<3?'lost':''}">💖</span>
          </div>
          <span style="font-size:12px;font-weight:800;color:#bbf7d0">CÂU ${Math.min(r+1, m.totalRounds)}/${m.totalRounds}</span>
          <div style="width:65px;height:7px;background:rgba(255,255,255,0.25);border-radius:4px;overflow:hidden">
            <div style="width:${progressPct}%;height:100%;background:#4ade80"></div>
          </div>
        </div>

        <div style="display:flex;gap:6px;pointer-events:auto">
          <button type="button" class="hw-btn-hud" style="font-size:11.5px;padding:4px 10px" data-action="toggleSound">🔊 ${soundEnabled?'Âm thanh':'Tắt âm'}</button>
        </div>
      </div>

      <!-- CÁC ĐÁP ÁN TRÊN BÃI CỎ -->
      ${choicesHtml}

      <!-- HIỆU ỨNG VỤ NỔ BOOM NẾU ĐẠP PHẢI MÌN -->
      ${msState.blastX !== null ? `
        <div class="ms-blast-overlay" style="left:${msState.blastX}%; top:${msState.blastY}%;"></div>
        <div class="ms-blast-toast wrong" style="left:${msState.blastX}%; top:${msState.blastY}%;">
          💥 BÙM! ĐẠP PHẢI MÌN! VĂNG VỀ VỊ TRÍ BAN ĐẦU!
        </div>
      ` : ''}

      <!-- HIỆU ỨNG TIẾP ĐẤT AN TOÀN NẾU ĐÚNG -->
      ${(msState.resultType === 'correct' && msState.lastChoice !== null) ? `
        <div class="ms-blast-toast correct" style="left:${coords[msState.lastChoice]?.x||50}%; top:${coords[msState.lastChoice]?.y||50}%;">
          💎 CHÍNH XÁC! +20 XP · NHẬN CỔ NGỮ [${q.cipherPiece||'✨'}]
        </div>
      ` : ''}

      <!-- CHÚ LÍNH XẠ THỦ TỰ DO CHẠY ĐẾN ĐÁP ÁN -->
      <div class="ms-soldier-actor ${msState.walking ? 'walking' : ''} ${msState.wobble ? 'wobble' : ''}" 
           style="left:${msState.posX}%; top:${msState.posY}%;">
        <img src="${spriteSrc}" alt="Soldier" class="ms-soldier-img">
      </div>

      ${isReady ? `
        <div style="position:absolute;inset:0;background:rgba(15,23,42,0.82);backdrop-filter:blur(4px);z-index:32;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;text-align:center">
          <div style="font-size:52px">🛡️</div>
          <h3 style="color:#fde047;font-size:22px;font-weight:900;margin:0">ĐÃ THU THẬP ĐỦ 5 CỔ NGỮ: B - A - O - V - E!</h3>
          <p style="color:#dcfce7;max-width:500px;margin:0;font-size:14px">Bãi mìn đã được vượt qua an toàn! Hãy ghép mật thư "BAOVE" để kích hoạt Lá Chắn Thành Trì và bước vào trận ĐẠI CHIẾN BOSS BÓNG ĐEN!</p>
          <button type="button" class="button gold pulse-urgent" style="font-size:15px;padding:12px 24px" data-action="openCipherNotebook">
            🔓 MỞ SỔ MẬT THƯ & GHÉP "BAOVE" NGAY!
          </button>
        </div>
      ` : ''}

      <!-- THANH ĐIỀU HƯỚNG BÊN DƯỚI -->
      <div class="ms-footer-bar">
        <div>
          🎯 <b>Cách chơi:</b> Bấm chuột lên đáp án (A / B / C / D) hoặc phím <b>1 / 2 / 3 / 4</b> để chú lính chạy đến. Nếu đạp phải mìn nổ sẽ bị hất văng quay lại vị trí ban đầu!
        </div>
        <div style="font-weight:700;color:#fef08a">
          Mảnh cổ ngữ: ${Math.min(r,5)}/5 (B - A - O - V - E)
        </div>
      </div>
    </div>

    ${cipherState.open ? renderCipherNotebookModal(m) : ''}
    ${showRolesModal ? renderTeamRolesModal(m) : ''}
  </div>`;
}

function renderBossRaidGame(m){
  const q = m.challenge;
  const opts = q.options || ['√33', '√29', '6', '5'];
  const pylonNames = ['Trụ I · Cổ ngữ B', 'Trụ II · Cổ ngữ A', 'Trụ III · Cổ ngữ O', 'Trụ IV · Cổ ngữ V', 'Trụ V · Cổ ngữ E'];
  const pylonMath = ['u = kv (k=-2)', 'w = u + v', 'Ngược hướng', 'D(5; 3; -1)', 'm = 3'];

  const pylonsHtml = [0, 1, 2, 3, 4].map(idx => `
    <div class="hw-pylon-box charged" title="${pylonNames[idx]}">
      <div style="font-size:22px">⚡</div>
      <b style="font-size:11px;color:#fde047;display:block;margin-top:2px">✅ ${pylonMath[idx]}</b>
      <small style="font-size:10px;color:#cbd5e1">${pylonNames[idx]}</small>
    </div>
  `).join('');

  return `<div class="hw-raid-wrapper">
   <div class="hw-forge-head">
    <div>
     <span class="tag" style="background:#7f1d1d;border-color:#ef4444">🐲 ĐẤU TRƯỜNG DIỆT BOSS TỐI THƯỢNG · CHẶNG 5</span>
     <h3 style="margin:4px 0 0;font-size:17px;font-weight:900">ĐẠI CHIẾN BOSS BÓNG ĐEN LÃNG QUÊN & ĐẠI PHÁO LASER OXYZ</h3>
    </div>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
     <button type="button" class="button gray sm" data-action="hint">💡 Gợi ý NOVA (2 Cấp)</button>
     <button type="button" class="hw-btn-hud" data-action="openTeamRoles">🤝 PHÂN VAI NHÓM</button>
     <button type="button" class="oxyz-toggle-btn" style="padding:4px 10px;font-size:11.5px" data-action="toggle3DPanel">🧊 3D Oxyz</button>
    </div>
   </div>

   <div class="hw-raid-arena-stage" style="padding:18px">
    <div class="hw-boss-hud" style="width:100%;max-width:520px">
     <div class="flex-between" style="width:100%">
      <span class="hw-boss-name">🐲 BOSS BÓNG ĐEN LÃNG QUÊN</span>
      <span class="pill red" style="font-size:10px">🛡️ KHIÊN BAOVE ĐÃ BẬT</span>
     </div>
     <div class="hw-boss-hp-bar" style="width:100%">
      <div class="hw-boss-hp-fill" style="width:${huntState.monsterDefeated?0:100}%"></div>
     </div>
     <small style="color:#fca5a5;font-weight:900;margin-top:3px">
      HP: ${huntState.monsterDefeated?0:500}/500 · Giải bài toán tổng hợp vectơ bên dưới để khai hỏa Đại Pháo Laser Oxyz!
     </small>
    </div>

    <div class="hw-raid-boss-center" style="margin:10px 0">
     <div class="hw-shield-dome"></div>
     <div class="hw-raid-boss-sprite">${huntState.monsterDefeated?'💥':CHAR_DRAGON_SVG}</div>
    </div>

    <!-- BẢNG ĐIỀU KHIỂN ĐẠI PHÁO LASER OXYZ TRỰC TIẾP -->
    <div style="width:100%;max-width:760px;background:rgba(15,23,42,0.92);border:2px solid #facc15;border-radius:16px;padding:16px 20px;z-index:20;box-shadow:0 10px 30px rgba(0,0,0,0.6)">
     <div style="font-size:12px;font-weight:900;color:#fde047;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">
      ⚡ BẢNG ĐIỀU KHIỂN ĐẠI PHÁO LASER THÀNH TRÌ:
     </div>
     <div style="font-size:16.5px;font-weight:800;color:#ffffff;line-height:1.45;margin-bottom:14px">
      ${formatMath(q.prompt)}
     </div>
     <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">
      ${opts.map((opt, i) => `
       <button type="button" class="cd-ans-btn" data-action="answer" data-choice="${i}" style="padding:12px 16px;font-size:16px;border-radius:12px;cursor:pointer">
        <span class="ans-letter">${labels[i]}</span>
        <strong>${formatMath(opt)}</strong>
       </button>
      `).join('')}
     </div>
    </div>

    <div class="hw-raid-pylons-circle" style="margin-top:12px">
     ${pylonsHtml}
    </div>
   </div>

   ${huntState.battleOpen ? renderHuntBattleModal(m) : ''}
   ${cipherState.open ? renderCipherNotebookModal(m) : ''}
   ${showRolesModal ? renderTeamRolesModal(m) : ''}
  </div>`;
}

function renderHuntGame(m){
 const hm=initHuntForStage(m);
 const r=m.round;
 const q=m.challenge;
 const stList=hm.stations||[];
 const roundsMeta=m.allRounds||[];
 const isBoss=Boolean(m.isBoss||world.me?.bossReady);
 
 const keySlots=Array.from({length:m.totalRounds}, (_,i)=>{
  const badge=roundsMeta[i]?.keyBadge||stList[i]?.badge||('Trạm '+(i+1));
  if(i<r)return `<div class="hw-key-slot earned">🔑 Trạm ${i+1}: <b>${esc(badge)}</b> ✅</div>`;
  if(i===r)return `<div class="hw-key-slot current">⚔️ Trạm ${i+1}: Đang mở</div>`;
  return `<div class="hw-key-slot">🔒 Trạm ${i+1}: Khóa</div>`;
 }).join('');

 const trackerBadges=Array.from({length:m.totalRounds}, (_,i)=>{
  const cls=i<r?'done':i===r?'active':'locked';
  const label=i<r?`✅ Trạm ${i+1}: Xong`:(i===r?`🧭 Tìm Trạm ${i+1}`:`🔒 Trạm ${i+1}`);
  return `<span class="hw-tracker-pill ${cls}">${label}</span>`;
 }).join('');

 const pathPts=[hm.spawn,...stList,hm.chest].map(p=>`${Math.round(p.x*12)},${Math.round(p.y*8.2)}`).join(' ');

 const stationsHtml=stList.map((st,i)=>{
  const state=i<r?'passed':i===r?'active':'locked';
  const isPylon = m.id === 5;
  return `<div class="hw-station ${state} ${isPylon?'hw-citadel-pylon':''}" style="left:${st.x}%;top:${st.y}%" data-action="clickStation" data-idx="${i}">
   <div class="hw-shrine-base"></div>
   <div class="hw-shrine-pillars"><span class="hw-pillar left"></span><span class="hw-pillar right"></span></div>
   <div class="hw-ring"></div>
   ${state==='active'?'<div class="hw-beacon-beam"></div>':''}
   <div class="hw-station-core">
    <div class="hw-station-glyph">${i<r?'🏛️':(st.monsterIcon||'👾')}</div>
    ${i<r?'<div class="hw-cleared-badge">✅</div>':''}
   </div>
   <div class="hw-station-info">
    <div class="hw-station-label">${i<r?('✅ ĐÃ VƯỢT ('+esc(st.badge)+')'):esc(st.name)}</div>
    ${state==='active'?'<div class="hw-station-action-hint">⚡ CHẠM ĐỂ CHIẾN ĐẤU (E)</div>':''}
   </div>
  </div>`;
 }).join('');

 const curStation=stList[r]||{x:50,y:50,name:q.label,monsterIcon:q.monster?.icon||'👾',monsterName:q.monster?.name||'Quái Vật Trạm'};
 const dx=curStation.x-huntState.x, dy=curStation.y-huntState.y;
 const dist=Math.hypot(dx,dy);
 const angleDeg=Math.round(Math.atan2(dy,dx)*180/Math.PI);
 const nearStation=dist<=10.5;

 const miniDots=stList.map((st,i)=>{
  const cls=i<r?'st-done':i===r?'st-active':'st-lock';
  return `<span class="hw-minimap-dot ${cls}" style="left:${st.x}%;top:${st.y}%"></span>`;
 }).join('')+`<span class="hw-minimap-dot chest" style="left:${hm.chest.x}%;top:${hm.chest.y}%"></span>`;

 const collectiblesHtml=(huntState.collectibles||[]).filter(c=>!c.collected).map(c=>`
  <div class="hw-collectible ${c.type}" id="collectible-${c.id}" style="left:${c.x}%;top:${c.y}%" title="${c.label}">
   <div class="hw-collectible-glow"></div>
   <div class="hw-collectible-icon">${c.icon}</div>
   <span class="hw-collectible-tag">${c.label}</span>
  </div>`).join('');

 const popupsHtml=(huntState.popups||[]).map(p=>`
  <div class="hw-float-popup" style="left:${p.x}%;top:${p.y}%;color:${p.color}">${esc(p.text)}</div>`).join('');

 const targetBeaconHtml=(huntState.targetX!==null&&huntState.targetY!==null)?`
  <div class="hw-target-beacon" id="hwTargetBeacon" style="left:${huntState.targetX}%;top:${huntState.targetY}%">
   <div class="hw-target-beacon-sonar"></div>
   <div class="hw-target-beacon-ring"></div>
   <div class="hw-target-beacon-pin">📍</div>
   <div class="hw-target-beacon-label">${Math.round(Math.hypot(huntState.targetX-huntState.x,huntState.targetY-huntState.y)*1.5)}m</div>
  </div>`:'' ;

 // Stage 3: NPC & Tháp Pha Lê Cổ
 let stage3Extra = '';
 if (m.id === 3) {
  stage3Extra = `
   <div class="hw-npc-wrap" style="position:absolute;left:14%;top:52%;transform:translate(-50%,-50%);cursor:pointer;z-index:6" data-action="clickNPC" title="Vệ Binh Hang Pha Lê (Chạm để nhận nhiệm vụ)">
    <div style="width:52px;height:52px;border-radius:50%;background:rgba(168,85,247,.25);border:2px dashed #c084fc;animation:spinSlow 8s linear infinite;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"></div>
    <div style="font-size:38px;text-align:center;filter:drop-shadow(0 4px 8px rgba(0,0,0,.5))">🧙‍♂️</div>
    <div style="background:rgba(15,23,42,.9);border:1.5px solid #c084fc;color:#f3e8ff;padding:2px 8px;border-radius:99px;font-size:10px;font-weight:900;white-space:nowrap;margin-top:2px">💬 Vệ Binh Hang (E)</div>
   </div>
   <div class="hw-crystal-altar" style="left:88%;top:50%" data-action="clickCrystalAltar" title="Bàn Giải Mã Tháp Pha Lê (PHALE)">
    <div class="hw-crystal-barrier ${m.cipherReady?'unlocked':''}"></div>
    <div class="hw-crystal-tower-art">
     <div class="hw-crystal-spire">💠</div>
    </div>
    <div style="background:rgba(15,23,42,.92);border:1.5px solid ${m.cipherReady?'#4ade80':'#c084fc'};color:#fff;padding:4px 10px;border-radius:10px;font-size:11px;font-weight:900;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.6)">
     ${m.cipherReady ? '✨ BÀN GIẢI MÃ SẴN SÀNG (E)' : '🔒 THÁP PHA LÊ (PHONG ẤN)'}
    </div>
   </div>`;
 }

 // Stage 4: Target grid beacon
 let stage4Extra = '';
 if (m.id === 4 && q.targetGrid) {
  const gx = q.targetGrid[0], gy = q.targetGrid[1];
  const px = 14 + (gx / 8) * 72;
  const py = 80 - (gy / 6) * 62;
  stage4Extra = `
   <div class="hw-grid-beacon" style="left:${px}%;top:${py}%" data-action="clickTargetBeacon" data-gx="${gx}" data-gy="${gy}" title="Tọa độ mục tiêu (${gx}; ${gy})">
    <div class="hw-grid-beacon-ring"></div>
    <div class="hw-grid-beacon-icon">🎯</div>
    <div class="hw-grid-beacon-tag">Tọa độ mục tiêu: (${gx}; ${gy})</div>
   </div>`;
 }

 // Stage 5: Citadel Core, Shield Dome, Boss Arena
 let stage5Extra = '';
 if (m.id === 5) {
  const hasShield = Boolean(m.bossReady || world.me?.bossReady);
  stage5Extra = `
   <div class="hw-citadel-core" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:5;text-align:center" data-action="clickCitadelCore" title="Lõi Năng Lượng Thành Trì (BAOVE)">
    ${hasShield ? '<div class="hw-shield-dome"></div>' : ''}
    <div style="font-size:48px;filter:drop-shadow(0 0 20px #38bdf8)">🏰</div>
    <div style="background:rgba(15,23,42,.92);border:1.5px solid #38bdf8;color:#bae6fd;padding:3px 8px;border-radius:8px;font-size:11px;font-weight:900">
     ${hasShield ? '🛡️ LÁ CHẮN BAOVE ĐÃ BẬT' : '⚡ LÕI THÀNH TRÌ (BAOVE)'}
    </div>
   </div>
   ${hasShield ? `
    <div class="hw-boss-arena" data-action="openBossBattle" title="Đại Chiến Boss Bóng Đen (Bấm để nghênh chiến!)">
     <div class="hw-boss-hud">
      <div class="hw-boss-name">🐲 BOSS BÓNG ĐEN LÃNG QUÊN</div>
      <div class="hw-boss-hp-bar"><div class="hw-boss-hp-fill" style="width:${huntState.monsterDefeated?0:100}%"></div></div>
      <small style="color:#fca5a5;font-weight:900;font-size:10.5px">HP: ${huntState.monsterDefeated?0:500}/500 · Bấm để nghênh chiến!</small>
     </div>
     <div class="hw-boss-dragon">🐲</div>
    </div>` : ''}`;
 }

 return `<div class="hw-wrapper">

  <div class="hw-viewport" id="hwViewport">
   <div class="hw-compass">
    <span class="hw-compass-arrow" id="hwCompassArrow" style="transform:rotate(${angleDeg}deg)">➤</span>
    <div>
     <div style="font-size:10px;color:#7dd3fc">${isBoss ? 'MỤC TIÊU: BOSS BÓNG ĐEN' : 'MỤC TIÊU HIỆN TẠI:'}</div>
     <strong id="hwCompassText">${isBoss ? '🐲 Boss Bóng Đen Lãng Quên' : (esc(curStation.name) + ' (' + Math.round(dist*1.5) + 'm)')}</strong>
    </div>
   </div>
   <div class="hw-minimap">
    <span class="hw-minimap-title">📡 RADAR OXYZ</span>
    ${miniDots}
    <span class="hw-minimap-player" id="hwMiniPlayer" style="left:${huntState.x}%;top:${huntState.y}%"></span>
   </div>
   <div class="hw-world theme-${esc(hm.theme||'forest')}" id="hwWorld">
    ${getTerrainSVG(hm.theme||'forest',pathPts)}
    ${getMapDecorations(hm.theme)}
    ${renderGridOverlay(m)}
    ${stage3Extra}
    ${stage4Extra}
    ${stage5Extra}
    ${collectiblesHtml}
    ${popupsHtml}
    ${targetBeaconHtml}
    ${stationsHtml}
    <div class="hw-chest ${r<m.totalRounds?'locked':'ready'}" style="left:${hm.chest.x}%;top:${hm.chest.y}%" data-action="clickChest">
     <div class="hw-chest-pedestal"></div>
     <div class="hw-chest-box">${r<m.totalRounds?'🧰':'🎁'}</div>
     <div class="hw-station-label">${r<m.totalRounds?esc(hm.chest.name||'Rương Mật Mã'):'✨ MỞ RƯƠNG KHO BÁU!'}</div>
    </div>
    <div class="hw-player ${huntState.moving?'moving':''} facing-${huntState.facing||'right'} ${huntState.isSprinting?'sprinting':''}" id="hwPlayer" style="left:${huntState.x}%;top:${huntState.y}%">
     <div class="hw-player-torch"></div>
     <div class="hw-player-aura-ring"></div>
     <div class="hw-player-shadow"></div>
     <div class="hw-hero-chassis">
      <div class="hw-player-avatar">${CHAR_EXPLORER_SVG}</div>
      <div class="hw-hero-crown">${(world.me.streak||0)>=2?'🔥':'⭐'}</div>
     </div>
     <div class="hw-player-tag">
      <span class="hw-player-name">${esc(world.me.name)}</span>
      <span class="hw-player-role">Cấp ${world.me.heroLevel||1} · Đội trưởng</span>
     </div>
     <div class="hw-footstep-sparks"></div>
    </div>
   </div>
   <div class="hw-controls-overlay">
    <div class="hw-dpad-wrap">
     <div class="hw-dpad">
      <span></span><button type="button" data-dpad="up" title="Đi lên (W / ↑)">▲</button><span></span>
      <button type="button" data-dpad="left" title="Qua trái (A / ←)">◀</button>
      <button type="button" data-dpad="down" title="Đi xuống (S / ↓)">▼</button>
      <button type="button" data-dpad="right" title="Qua phải (D / →)">▶</button>
     </div>
     <button type="button" class="hw-sprint-btn ${huntState.isSprinting?'active':''}" data-action="toggleSprint" title="Bật/Tắt chạy nhanh (Shift)">⚡ ${huntState.isSprinting?'ĐANG CHẠY NHANH':'TĂNG TỐC'}</button>
    </div>
    <div class="hw-action-panel">
     <button type="button" class="hw-attack-station-btn ${nearStation?'pulse-urgent':''}" data-action="openHuntBattle" style="${nearStation?'display:inline-flex':'display:none'}">⚔️ MỞ CÂU ĐỐ TRẠM ${r+1} (E)</button>
     <button type="button" class="hw-interact-btn" data-action="autoRunToStation" style="display:inline-flex;background:linear-gradient(135deg,#059669,#10b981)" title="Tự động chạy tới Trạm ${r+1}">▶ TỚI TRẠM ${r+1}</button>
     <button type="button" class="hw-interact-btn" data-action="interactNearObject" style="display:inline-flex" title="Tương tác với Trạm hoặc Rương (Phím E)">✋ TƯƠNG TÁC (E)</button>
    </div>
   </div>
  </div>
  ${huntState.battleOpen?renderHuntBattleModal(m):''}
  ${cipherState.open?renderCipherNotebookModal(m):''}
  ${showRolesModal?renderTeamRolesModal(m):''}
  ${questDialogue?renderQuestDialogueModal():''}
 </div>`;
}

function renderHuntBattleModal(m){
 const isBoss=Boolean(m.isBoss||world.me?.bossReady);
 const q=m.challenge;
 const monster=q.monster||(isBoss?{icon:'🐲',name:'Boss Bóng Đen Lãng Quên',hp:500,type:'dragon_boss'}:{icon:'👹',name:'Quái Vật Canh Trạm',hp:120,type:'golem'});
 const sel=huntState.selectedChoice;
 return `<div class="hw-battle-backdrop">
  <div class="hw-battle-modal">
   ${huntState.rewardBadge?`<div class="hw-letter-reward-overlay">
     <div style="font-size:56px">🎉</div>
     <h2>ĐÁNH BẠI ${esc(monster.name.toUpperCase())}!</h2>
     <div class="hw-letter-card">${esc(huntState.rewardBadge)}</div>
     <p style="max-width:440px;color:#dcfce7;font-weight:700">${esc(huntState.rewardExplain||'')}</p>
     <button type="button" class="button gold" data-action="finishHuntReward">🗺️ Trở lại bản đồ & Tự lái nhân vật tiếp tục →</button>
    </div>`:''}
   <div class="hw-battle-scroll">
    <div>
     <div class="hw-scroll-kicker">${isBoss?'🐲 ĐẠI CHIẾN BOSS CUỐI CÙNG':('📜 TRẠM '+(m.round+1)+' / '+m.totalRounds+' · '+esc(q.label))}</div>
     <div class="hw-scroll-role">🤝 <b>Phân công nhóm:</b> ${esc(q.roleAssign||m.groupTask)}</div>
     <div class="hw-scroll-question">🧩 ${formatMath(q.prompt)}</div>
     <div class="hw-scroll-options">
      ${q.options.map((opt,i)=>`<button type="button" class="hw-opt-btn ${sel===i?'selected':''}" data-action="selectHuntOpt" data-choice="${i}">
       <span class="opt-letter">${labels[i]}</span>
       <span>${formatMath(opt)}</span>
      </button>`).join('')}
     </div>
     <div class="hw-short-box">
      <span style="font-size:12px;font-weight:900;color:#6b4d28">✍️ Hoặc nhập nhanh đáp án:</span>
      <input type="text" id="huntShortInput" value="${esc(huntState.shortText)}" placeholder="Nhập kết quả số hoặc biểu thức (VD: 3, 2√2, √33...)" />
     </div>
    </div>
    <div class="hw-scroll-footer">
     <div style="display:flex;gap:8px">
      <button type="button" class="hw-btn-flee" data-action="closeHuntBattle">🏃 Rút lui ra bản đồ</button>
      <button type="button" class="hw-btn-flee" data-action="hint">💡 NOVA gợi ý (2 Cấp)</button>
     </div>
     <button type="button" class="hw-btn-attack" data-action="attackHuntMonster">${isBoss?'⚔️ BẮN ĐẠI PHÁO LASER DIỆT BOSS!':'⚔️ TUNG ĐÒN TẤN CÔNG!'}</button>
    </div>
   </div>
   <div class="hw-monster-stage">
    <span class="pill gold" style="margin-bottom:8px">🛡️ KHIÊN ĐỘI: ${'🛡️'.repeat(Math.max(0, Math.min(3, Math.floor(world.me?.health || 0)))) || '0'}</span>
    <div class="hw-monster-hp"><i style="width:${huntState.monsterDefeated?0:100}%"></i></div>
    <small style="color:#fde68a;font-weight:900">${esc(monster.name)} · HP: ${huntState.monsterDefeated?0:monster.hp}/${monster.hp}</small>
    <div class="hw-monster-art-wrap ${huntState.monsterDefeated?'defeated':''}">
     ${renderMonsterSVG(monster.type||'golem',monster.icon)}
    </div>
    ${huntState.monsterDefeated?'<div class="hw-monster-impact">💥</div>':''}
    <p style="font-size:12px;color:#cbd5e1;margin-top:6px">${isBoss?'Hợp sức tính độ dài vectơ w = 2u + v để kích hoạt Laser kết liễu Boss!':'Chọn đáp án đúng hoặc nhập kết quả rồi nhấn <b>⚔️ Tung đòn tấn công</b> để tiêu diệt quái và thu hồi cổ ngữ!'}</p>
   </div>
  </div>
 </div>`;
}

function interactNearObject(){
 const m=world?.current;
 if(!m||huntState.battleOpen||cipherState.open)return;
 
 if((m.bossReady||world.me?.bossReady)&&Math.hypot(huntState.x-50,huntState.y-18)<=18){
  huntState.battleOpen=true;
  huntState.selectedChoice=null;
  huntState.shortText='';
  huntState.monsterDefeated=false;
  huntState.rewardBadge=null;
  sound('boss_roar');
  render();
  return;
 }
 
 const curSt=m.huntMap?.stations?.[m.round];
 if(curSt&&Math.hypot(huntState.x-curSt.x,huntState.y-curSt.y)<=12){
  huntState.battleOpen=true;
  huntState.selectedChoice=null;
  huntState.shortText='';
  huntState.monsterDefeated=false;
  huntState.rewardBadge=null;
  render();
  return;
 }
 
 if(m.id===3&&Math.hypot(huntState.x-14,huntState.y-52)<=14){
  questDialogue={
   avatar:'🧙‍♂️',
   name:'Vệ Binh Hang Pha Lê Oxyz',
   role:'Người Canh Cổng Tháp Cổ',
   text:`<p>Chào các chiến binh Toán học! Tòa <b>Tháp Pha Lê Khoảng Cách</b> đang bị phong ấn bởi một kết giới cổ xưa gồm 5 ổ khóa năng lượng.</p>
   <p style="margin-top:8px">Nhiệm vụ của các em: Hãy điều khiển nhân vật khám phá 5 mỏ tinh thể, giải đúng 5 bài toán <b>Độ dài vectơ & Khoảng cách giữa hai điểm trong không gian Oxyz</b> để thu thập 5 mảnh cổ tự <b>P - H - A - L - E</b>.</p>
   <p style="margin-top:8px;color:#fde047">Sau khi thu thập đủ, hãy tới <b>Bàn Giải Mã Trung Tâm</b> tại cuối thung lũng, mở Sổ Mật Thư và ghép chính xác từ khóa <b>PHALE</b> để khai mở cổng tháp!</p>`
  };
  sound('magic');
  render();
  return;
 }
 
 if(m.id===3&&Math.hypot(huntState.x-88,huntState.y-50)<=15){
  cipherState.open=true;
  cipherState.error=null;
  sound('crystal');
  render();
  return;
 }
 
 if(m.id===4&&Math.hypot(huntState.x-89,huntState.y-50)<=15){
  cipherState.open=true;
  cipherState.error=null;
  sound('portal');
  render();
  return;
 }
 
 const q=m.challenge;
 if(m.id===4&&q?.targetGrid){
  const gx=q.targetGrid[0], gy=q.targetGrid[1];
  const px=14+(gx/8)*72, py=80-(gy/6)*62;
  if(Math.hypot(huntState.x-px,huntState.y-py)<=12){
   sound('gem');
   huntState.popups.push({
    id:Date.now(),
    x:px,
    y:py-4,
    text:`🎯 Tọa độ M(${gx}; ${gy}) kích hoạt!`,
    color:'#2dd4bf',
    createdAt:performance.now()
   });
   render();
   return;
  }
 }
 
 if(m.id===5&&Math.hypot(huntState.x-50,huntState.y-50)<=15){
  cipherState.open=true;
  cipherState.error=null;
  sound('energy');
  render();
  return;
 }
}
function updateHuntCamera(){
 const vp=$('#hwViewport'), wd=$('#hwWorld'), pl=$('#hwPlayer');
 if(!vp||!wd||!pl)return;
 pl.style.left=huntState.x+'%';
 pl.style.top=huntState.y+'%';
 pl.classList.toggle('moving',huntState.moving);
 pl.classList.toggle('sprinting',huntState.isSprinting);
 pl.classList.toggle('facing-left',huntState.facing==='left');
 pl.classList.toggle('facing-right',huntState.facing==='right');

 const miniPl=$('#hwMiniPlayer');
 if(miniPl){miniPl.style.left=huntState.x+'%';miniPl.style.top=huntState.y+'%';}

 const targetBeacon=$('#hwTargetBeacon');
 if(targetBeacon){
  if(huntState.targetX!==null&&huntState.targetY!==null){
   targetBeacon.style.display='block';
   targetBeacon.style.left=huntState.targetX+'%';
   targetBeacon.style.top=huntState.targetY+'%';
   const dToTarget=Math.hypot(huntState.targetX-huntState.x,huntState.targetY-huntState.y);
   const lbl=targetBeacon.querySelector('.hw-target-beacon-label');
   if(lbl)lbl.textContent=`${Math.round(dToTarget*1.5)}m`;
  }else{
   targetBeacon.style.display='none';
  }
 }

 const m=world?.current;
 const curSt=m?.huntMap?.stations?.[m.round];
 if(curSt){
  const dx=curSt.x-huntState.x, dy=curSt.y-huntState.y;
  const dist=Math.hypot(dx,dy);
  const angleDeg=Math.round(Math.atan2(dy,dx)*180/Math.PI);
  const arr=$('#hwCompassArrow'), txt=$('#hwCompassText');
  if(arr)arr.style.transform=`rotate(${angleDeg}deg)`;
  if(txt)txt.textContent=`${curSt.name} (${Math.round(dist*1.5)}m)`;

  const atkBtn=$('.hw-attack-station-btn');
  const expPill=$('.hw-exploring-pill');
  const isNear=dist<=10.5;
  if(atkBtn){
   if(isNear){
    atkBtn.style.display='inline-flex';
    atkBtn.innerHTML=`⚔️ ĐÃ TỚI ĐỀN ${m.round+1}! BẤM MỞ BÀI TOÁN (Space)`;
    atkBtn.classList.add('pulse-urgent');
    if(expPill)expPill.style.display='none';
   }else{
    atkBtn.style.display='none';
    if(expPill){
     expPill.style.display='flex';
     const dLabel=expPill.querySelector('.hw-exploring-dist');
     if(dLabel)dLabel.textContent=`Còn ${Math.round(dist*1.5)}m`;
    }
   }
  }
 }
 const vw=vp.clientWidth||800, vh=vp.clientHeight||485;
 const ww=1200, wh=820;
 const px=huntState.x/100*ww, py=huntState.y/100*wh;
 const tx=Math.min(0,Math.max(vw-ww,vw/2-px));
 const ty=Math.min(0,Math.max(vh-wh,vh/2-py));
 wd.style.transform=`translate3d(${Math.round(tx)}px,${Math.round(ty)}px,0)`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 2: BẢO VỆ THÀNH TRÌ (CASTLE DEFENSE REAL-TIME)
   ═══════════════════════════════════════════════════════════════════════════ */
function initCastleForStage(m){
 const up=world?.me?.upgrades||{damage:1,speed:1,hp:1,regen:1};
 const maxHp=260+up.hp*40;
 cdState.castleMaxHp=maxHp;
 if(cdState.stageId!==m.id || cdState.roundId!==m.round){
  if(cdState.stageId!==m.id) cdState.castleHp=maxHp;
  cdState.stageId=m.id;
  cdState.roundId=m.round;
  cdState.enemies=[];
  cdState.projectiles=[];
  cdState.effects=[];
  cdState.lastSpawnAt=0;
  spawnCastleWaveEnemies(m);
 }
}

function spawnCastleWaveEnemies(m){
 if(!m||!m.defenseConfig)return;
 const w=m.defenseConfig.waves?.[m.round]||{name:'Đợt tấn công',enemies:['goblin','bat','skeleton'],boss:'👹'};
 const list=w.enemies||['goblin','bat','skeleton'];
 const spriteMap={goblin:CHAR_GOBLIN_SVG,bat:CHAR_BAT_SVG,skeleton:CHAR_SKELETON_SVG,orc:CHAR_ORC_SVG};
 list.forEach((kind,idx)=>{
  const hp=75+m.id*20+m.round*15;
  cdState.enemies.push({
   id:'en-'+(++cdState.seq),
   lane:idx%3,
   x:84+idx*5,
   hp, maxHp:hp,
   speed:2.1+(idx%2)*0.4,
   sprite:spriteMap[kind]||'👺',
   isBoss:false
  });
 });
 const bossHp=160+m.id*35+m.round*25;
 cdState.enemies.push({
  id:'boss-'+(++cdState.seq),
  lane:1,
  x:94,
  hp:bossHp, maxHp:bossHp,
  speed:1.45,
  sprite:CHAR_ORC_SVG,
  isBoss:true
 });
}

function renderCastleDefenseGame(m){
 initCastleForStage(m);
 const me=world.me;
 const up=me.upgrades||{damage:1,speed:1,hp:1,regen:1};
 const q=m.challenge;
 const cfg=m.defenseConfig||{castleName:'Thành Trì Oxyz'};
 const now=performance.now();
 const shieldActive=cdState.shieldUntil>now;
 const shakeActive=cdState.shakeUntil>now;
 const hpPct=Math.max(0,Math.min(100,Math.round(cdState.castleHp/cdState.castleMaxHp*100)));

 const skills=[
  {key:'arrowRain',icon:'🌧️',name:'Mưa Tên',cd:12000},
  {key:'iceVolley',icon:'❄️',name:'Băng Giá',cd:14000},
  {key:'groupHeal',icon:'💚',name:'Hồi Máu',cd:15000},
  {key:'castleShield',icon:'🛡️',name:'Khiên Thành',cd:16000}
 ];

 const upgradeItems=[
  {key:'damage',icon:'⚔️',name:'Sát thương Anh Hùng',lv:up.damage||1,desc:`Đạn bắn mạnh hơn (${22+(up.damage||1)*10} DMG)`},
  {key:'speed',icon:'⚡',name:'Tốc độ bắn',lv:up.speed||1,desc:'Anh hùng nạp tên & phép nhanh hơn'},
  {key:'hp',icon:'❤️',name:'Máu & Giáp Thành Trì',lv:up.hp||1,desc:`Tăng máu tối đa (${cdState.castleMaxHp} HP) & +1 Khiên`},
  {key:'regen',icon:'🔧',name:'Kỹ sư Hồi phục Thành',lv:up.regen||1,desc:`Tự hồi +${(up.regen||1)*3} HP mỗi giây`}
 ];

 return `<div class="cd-game ${shakeActive?'shake':''}" id="cdGameRoot">
  <div class="cd-hud">
   <div class="cd-hud-stats">
    <div class="cd-stat">
     <span class="cd-stat-icon">🏰</span>
     <div style="flex:1">
      <small>MÁU THÀNH TRÌ</small>
      <strong id="cdHudHp">${Math.round(cdState.castleHp)} / ${cdState.castleMaxHp}</strong>
      <div class="cd-bar hp"><i id="cdHudHpBar" style="width:${hpPct}%"></i></div>
     </div>
    </div>
    <div class="cd-stat">
     <span class="cd-stat-icon">🌊</span>
     <div>
      <small>ĐỢT QUÁI VẬT</small>
      <strong>Đợt ${m.round+1} / ${m.totalRounds}</strong>
     </div>
    </div>
    <div class="cd-stat">
     <span class="cd-stat-icon">⭐</span>
     <div style="flex:1">
      <small>CẤP ĐỘI QUÂN</small>
      <strong>Lv.${me.heroLevel||1} · ${me.score} XP</strong>
      <div class="cd-bar xp"><i style="width:${Math.min(100,(me.round+1)/3*100)}%"></i></div>
     </div>
    </div>
    <div class="cd-stat">
     <span class="cd-stat-icon">🪙</span>
     <div>
      <small>KHO VÀNG ĐỘI</small>
      <strong id="cdHudGold">${me.gold??120} Vàng</strong>
     </div>
    </div>
    <div class="cd-stat">
     <span class="cd-stat-icon">🔥</span>
     <div>
      <small>CHUỖI COMBO</small>
      <strong>x${me.streak||0} (+${Math.min(4,Math.max(0,(me.streak||0)))*30}🪙)</strong>
     </div>
    </div>
   </div>
  </div>

  <div class="cd-layout">
   <div class="cd-main-col">
    <div class="cd-battlefield" id="cdBattlefield">
     <div class="cd-sky-decor">⚔️ ${esc(cfg.castleName.toUpperCase())} · ${esc(q.label)}</div>
     <div class="cd-lane-guide cd-lane-0"></div>
     <div class="cd-lane-guide cd-lane-1"></div>
     <div class="cd-lane-guide cd-lane-2"></div>

     <div class="cd-skill-dock">
      ${skills.map(sk=>{
       const rem=Math.max(0,Math.ceil(((cdState.skillCd[sk.key]||0)-now)/1000));
       return `<button type="button" class="cd-skill-btn ${rem>0?'cooldown':''}" data-action="useSkill" data-skill="${sk.key}" title="Kỹ năng ${sk.name}">
        <span>${sk.icon}</span>
        <small>${sk.name}</small>
        ${rem>0?`<span class="cd-skill-cd">${rem}s</span>`:''}
       </button>`;
      }).join('')}
     </div>

     <div class="cd-castle">
      <div class="cd-castle-shield" id="cdCastleShield" style="display:${shieldActive?'block':'none'}"></div>
      ${renderCastleSVG()}
      <span class="cd-castle-tag">${esc(me.name)}</span>
     </div>

     <div class="cd-hero" style="top:44%"><div class="cd-hero-sprite">${CHAR_ARCHER_SVG}</div><span class="cd-hero-label">Cung Thủ Ox</span></div>
     <div class="cd-hero" style="top:65%"><div class="cd-hero-sprite">${CHAR_MAGE_SVG}</div><span class="cd-hero-label">Pháp Sư Oy</span></div>
     <div class="cd-hero" style="top:86%"><div class="cd-hero-sprite">${CHAR_PALADIN_SVG}</div><span class="cd-hero-label">Hiệp Sĩ Oz</span></div>

     <div id="cdDynamicLayer"></div>
    </div>

    <div class="cd-question-dock">
     <div class="cd-q-header">
      <span class="cd-q-badge">🎯 ĐẠI BÁC LASER ĐỢT ${m.round+1}/${m.totalRounds}: ${esc(q.label)}</span>
      <span class="cd-q-reward">🎁 Giải đúng: +120 Vàng (+Combo) · 💥 Bắn Tia Laser Oxyz Quét Sạch Quái!</span>
     </div>
     <div style="font-size:12.5px;font-weight:800;color:#6b4214;margin-bottom:6px">🤝 Phân công: ${esc(q.roleAssign||m.groupTask)}</div>
     <div class="cd-q-prompt">🧩 ${formatMath(q.prompt)}</div>
     <div class="cd-answers">
      ${q.options.map((opt,i)=>`<button type="button" class="cd-ans-btn" data-action="answer" data-choice="${i}" ${world.paused?'disabled':''}>
       <span class="ans-letter">${labels[i]}</span>
       <strong>${formatMath(opt)}</strong>
      </button>`).join('')}
     </div>
     <div class="cd-q-InputRow">
      <input type="text" id="cdShortInput" placeholder="✍️ Hoặc nhập trực tiếp đáp án số rồi bấm Khai Hỏa Laser..." />
      ${btn('💥 KHAI HỎA LASER','submitShortCastle','gold sm')}
      ${btn('💡 NOVA gợi ý','hint','gray sm')}
     </div>
    </div>
   </div>

   <aside class="cd-upgrade-panel">
    <div>
     <div class="cd-up-title">🛠️ NÂNG CẤP ĐỘI QUÂN (VÀNG)</div>
     <p style="font-size:11.5px;color:#d6bfa0;margin-bottom:10px">Giải đúng câu hỏi Toán Oxyz để nhận <b>+120 Vàng</b> (cộng thưởng Combo) và nâng cấp sức mạnh cho 3 Anh Hùng!</p>
     <div class="cd-up-list">
      ${upgradeItems.map(u=>{
       const cost=60+u.lv*40;
       const maxed=u.lv>=5;
       return `<div class="cd-up-item">
        <div class="cd-up-info">
         <b>${u.icon} ${esc(u.name)} (Lv.${u.lv})</b>
         <small>${esc(u.desc)}</small>
        </div>
        <button type="button" class="cd-up-buy" data-action="buyUpgrade" data-upgrade="${u.key}" ${maxed||(me.gold||0)<cost?'disabled':''}>
         ${maxed?'TỐI ĐA':`🪙 ${cost}`}
        </button>
       </div>`;
      }).join('')}
     </div>
    </div>
    <div style="background:rgba(255,255,255,.06);border:1px solid #6e4215;border-radius:12px;padding:10px;font-size:11.5px;color:#fde68a">
     <b>⚡ Mẹo chiến thuật nhóm:</b>
     <div style="margin-top:4px;color:#e7cfa1">• Bấm 4 nút Kỹ năng ở góc trên phải chiến trường (Mưa Tên, Băng Giá, Hồi Máu, Khiên Thành) để hỗ trợ Anh Hùng!<br/>• Trả lời đúng liên tiếp để tích <b>🔥 Chuỗi Combo</b> nhận thêm tới +120 Vàng mỗi lượt!</div>
    </div>
   </aside>
  </div>
 </div>`;
}


function getGameModeBadge(m){
 if (m.id === 1) return '🗺️ SĂN KHO BÁU 2D (Tự Lái Tìm Đền)';
 if (m.id === 2) return '🏰 THỦ THÀNH CHIẾN THUẬT (3 Làn Real-time)';
 if (m.id === 3) return '🧟 CHẶN ZOMBIE 4 LÀN (Ngắm Bắn Đáp Án Đúng)';
 if (m.id === 4) return '🌀 MÊ CUNG TỌA ĐỘ Ô VUÔNG (Lưới Oxy & Cổng Dịch Chuyển)';
 if (m.id === 5) return '💣 DÒ MÌN BÃI ĐÁ RỪNG THẦN (Phiêu Lưu & Diệt Boss)';
 return '🎮 Game Tương Tác Oxyz';
}

function renderStageGame(m){
 if (m.id === 1) return renderHuntGame(m);
 if (m.id === 2) return renderCastleDefenseGame(m);
 if (m.id === 3) return renderZombieDefenseGame(m);
 if (m.id === 4) return renderGridMazeGame(m);
 if (m.id === 5) return renderMinesweeperGame(m);
 return renderHuntGame(m);
}


/* ═══════════════════════════════════════════════════════════════════════════
   ENGINE KỊCH BẢN MỚI V4.0: HÀNH TRÌNH GIẢI CỨU LỤC ĐỊA OXYZ (6 PHÚT)
   3 Phần mỗi chặng: Phần 1 (Khám phá tương tác SVG) + Phần 2 (Giải mã 1) + Phần 3 (Giải mã 2)
   ═══════════════════════════════════════════════════════════════════════════ */
const vaState = {
  stageId: -1,
  roundId: -1,
  selectedChoice: null,
  pillars: new Set(),       // Chặng 1: 'A', 'B', 'C'
  s1CipherSlots: [null, null, null], // Chặng 1 Bước 2: ['AB', '-', 'AC']
  s1ArrowFrom: null,        // Chặng 1 Bước 3: điểm bắt đầu ('A' | 'B' | 'C')
  s1ArrowTo: null,          // Chặng 1 Bước 3: điểm kết thúc ('A' | 'B' | 'C')
  s1Feedback: null,         // Phản hồi ngắn tại chỗ cho Chặng 1
  s1BridgeRestoredOverlay: false, // Bước 4: Hiệu ứng khôi phục cây cầu ánh sáng
  s1BridgeTimer: null,
  paths: new Set(),         // Chặng 2: 'AB', 'BC'
  paraEdges: new Set(),     // Chặng 3: 'AB', 'AD'
  midpointPct: 25,          // Chặng 4: 50 = Trung điểm I
  centroidSelected: null,   // Chặng 5: 'G' = Trọng tâm
  dragonMsg: null,
  dragonMood: 'normal',     // 'normal' | 'shadow' | 'hint' | 'win'
  stageDurationSec: 60,
  stageStartedAt: Date.now(),
  stageTimeoutTriggered: false
};

function ensureVaStateForStage(m) {
  if (!m || !m.id) return;
  const dur = m.timeSeconds || (m.id <= 2 ? 60 : m.id <= 4 ? 65 : 70);
  // Đồng bộ các cột đá A, B, C từ server nếu có
  const srvPillars = world?.me?.stage1?.pillars;
  if (m.id === 1 && Array.isArray(srvPillars)) {
    srvPillars.forEach(p => vaState.pillars.add(p));
  }
  if (vaState.stageId !== m.id) {
    vaState.stageId = m.id;
    vaState.roundId = m.round;
    vaState.selectedChoice = null;
    vaState.pillars = new Set(m.id === 1 && Array.isArray(srvPillars) ? srvPillars : []);
    vaState.s1CipherSlots = [null, null, null];
    vaState.s1ArrowFrom = null;
    vaState.s1ArrowTo = null;
    vaState.s1Feedback = null;
    vaState.paths = new Set();
    vaState.paraEdges = new Set();
    vaState.midpointPct = 25;
    vaState.centroidSelected = null;
    vaState.dragonMsg = m.dragonIntro || 'Hãy cùng khám phá sơ đồ vectơ để mở khóa chặng này!';
    vaState.dragonMood = m.id === 5 ? 'shadow' : 'normal';
    vaState.stageDurationSec = dur;
    vaState.stageStartedAt = Date.now();
    vaState.stageTimeoutTriggered = false;
  } else if (vaState.roundId !== m.round) {
    vaState.roundId = m.round;
    vaState.selectedChoice = null;
    vaState.s1Feedback = null;
    if (m.id === 1 && m.round === 1) {
      vaState.dragonMsg = 'Đã thu thập đủ 3 mảnh mật thư! Hãy kéo hoặc nhấn các mảnh để ghép biểu thức hiệu hai vectơ!';
    } else if (m.id === 1 && m.round === 2) {
      vaState.dragonMsg = 'Mật thư đã hiện ra: vectơ AB − vectơ AC = ? Hãy nhấn điểm bắt đầu và kéo mũi tên đến điểm kết thúc trên tam giác ABC!';
    }
  }
}

function isVaInteractiveReady(m) {
  if (m.id === 1) return vaState.pillars.size >= 3;
  if (m.id === 2) return vaState.paths.has('AB') && vaState.paths.has('BC');
  if (m.id === 3) return vaState.paraEdges.has('AB') && vaState.paraEdges.has('AD');
  if (m.id === 4) return Math.abs(vaState.midpointPct - 50) <= 5;
  if (m.id === 5) return vaState.centroidSelected === 'G';
  return true;
}

function svgVecLabel(x, y, text, color = '#67E8F9', size = 16) {
  const w = Math.max(16, String(text).length * (size * 0.62));
  const x1 = Math.round(x - w / 2);
  const x2 = Math.round(x + w / 2);
  const ay = Math.round(y - size - 3);
  return `<g class="svg-vec-label">
    <line x1="${x1}" y1="${ay}" x2="${x2}" y2="${ay}" stroke="${color}" stroke-width="1.8"/>
    <polygon points="${x2 + 3},${ay} ${x2 - 3},${ay - 3} ${x2 - 3},${ay + 3}" fill="${color}"/>
    <text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-size="${size}" font-weight="900">${esc(text)}</text>
  </g>`;
}

function renderStageVectorSVG(m) {
  const r = m.round || 0;
  const q = m.challenge || {};
  const isPart1 = (r === 0);
  const defs = `<defs>
    <marker id="arrCyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#36DEF4"/>
    </marker>
    <marker id="arrGold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#FFC953"/>
    </marker>
    <marker id="arrGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#35C992"/>
    </marker>
    <marker id="arrPink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#F43F5E"/>
    </marker>
  </defs>`;

  // CHẶNG 1: RỪNG VECTƠ KHỞI NGUYÊN (Tam giác A ở đỉnh trên, B trái dưới, C phải dưới như bố cục tham chiếu)
  if (m.id === 1) {
    const isMNP = (q.prompt || '').includes('M, N, P');
    const L1 = isMNP ? 'M' : 'A';
    const L2 = isMNP ? 'N' : 'B';
    const L3 = isMNP ? 'P' : 'C';
    const hasA = !isPart1 || vaState.pillars.has('A');
    const hasB = !isPart1 || vaState.pillars.has('B');
    const hasC = !isPart1 || vaState.pillars.has('C');
    const all3 = hasA && hasB && hasC;
    // A(270, 66), B(110, 226), C(435, 226)
    return `<svg class="va-svg-stage" viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg">
      ${defs}
      <!-- Vectơ AB (từ A xuống B) -->
      ${(hasA && hasB) ? `<line x1="270" y1="66" x2="122" y2="214" stroke="#36DEF4" stroke-width="4.5" marker-end="url(#arrCyan)"/>
      ${svgVecLabel(162, 142, L1 + L2, '#36DEF4', 18)}` : `<line x1="270" y1="66" x2="110" y2="226" stroke="rgba(148,163,184,0.35)" stroke-width="3" stroke-dasharray="6 6"/>`}

      <!-- Vectơ AC (từ A xuống C) -->
      ${(hasA && hasC) ? `<line x1="270" y1="66" x2="423" y2="214" stroke="#FFC953" stroke-width="4.5" marker-end="url(#arrGold)"/>
      ${svgVecLabel(382, 142, L1 + L3, '#FFC953', 18)}` : `<line x1="270" y1="66" x2="435" y2="226" stroke="rgba(148,163,184,0.35)" stroke-width="3" stroke-dasharray="6 6"/>`}

      <!-- Cạnh đáy giữa B và C (nét đứt hồng + dấu ? để không lộ đáp án trước khi trả lời) -->
      <line x1="126" y1="226" x2="419" y2="226" stroke="#EC4899" stroke-width="4" stroke-dasharray="10 8"/>
      <text x="272" y="216" text-anchor="middle" fill="#F472B6" font-size="24" font-weight="900">?</text>

      <!-- Đỉnh A / M -->
      <g class="va-node-clickable" data-action="vaClickPillar" data-node="A">
        <text x="270" y="38" text-anchor="middle" fill="#F8FAFF" font-size="22" font-weight="900">${L1}</text>
        <circle cx="270" cy="66" r="11" fill="#FFFFFF" stroke="#36DEF4" stroke-width="4"/>
      </g>
      <!-- Đỉnh B / N -->
      <g class="va-node-clickable" data-action="vaClickPillar" data-node="B">
        <text x="110" y="198" text-anchor="middle" fill="#F8FAFF" font-size="22" font-weight="900">${L2}</text>
        <circle cx="110" cy="226" r="11" fill="#FFFFFF" stroke="#36DEF4" stroke-width="4"/>
      </g>
      <!-- Đỉnh C / P -->
      <g class="va-node-clickable" data-action="vaClickPillar" data-node="C">
        <text x="435" y="198" text-anchor="middle" fill="#F8FAFF" font-size="22" font-weight="900">${L3}</text>
        <circle cx="435" cy="226" r="11" fill="#FFFFFF" stroke="#36DEF4" stroke-width="4"/>
      </g>
    </svg>`;
  }

  // CHẶNG 2: PHÁO ĐÀI GÓC VUÔNG (Hai đoạn đường nối tiếp AB và BC)
  if (m.id === 2) {
    const isMNP = (q.prompt || '').includes('M, N, P');
    const L1 = isMNP ? 'M' : 'A';
    const L2 = isMNP ? 'N' : 'B';
    const L3 = isMNP ? 'P' : 'C';
    const hasAB = !isPart1 || vaState.paths.has('AB');
    const hasBC = !isPart1 || vaState.paths.has('BC');
    const both = hasAB && hasBC;

    return `<svg class="va-svg-stage" viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg">
      ${defs}
      <!-- Đoạn đường AB -->
      <g class="va-node-clickable" data-action="vaClickPath" data-path="AB">
        <line x1="95" y1="210" x2="266" y2="78" stroke="${hasAB ? '#36DEF4' : '#475569'}" stroke-width="5" marker-end="${hasAB ? 'url(#arrCyan)' : ''}"/>
        ${svgVecLabel(165, 132, L1 + L2, hasAB ? '#36DEF4' : '#94A3B8', 17)}
      </g>

      <!-- Đoạn đường BC -->
      <g class="va-node-clickable" data-action="vaClickPath" data-path="BC">
        <line x1="280" y1="70" x2="450" y2="200" stroke="${hasBC ? '#FFC953' : '#475569'}" stroke-width="5" marker-end="${hasBC ? 'url(#arrGold)' : ''}"/>
        ${svgVecLabel(385, 132, L2 + L3, hasBC ? '#FFC953' : '#94A3B8', 17)}
      </g>

      <!-- Đường tổng nối từ A đến C (không lộ đáp án ở phần câu hỏi) -->
      <line x1="108" y1="210" x2="450" y2="210" stroke="#EC4899" stroke-width="3.8" stroke-dasharray="9 7"/>
      <text x="280" y="242" text-anchor="middle" fill="#F472B6" font-size="22" font-weight="900">?</text>

      <!-- 3 Đỉnh A, B, C -->
      <text x="95" y="245" text-anchor="middle" fill="#FFF" font-size="20" font-weight="900">${L1}</text>
      <circle cx="95" cy="210" r="11" fill="#FFF" stroke="#36DEF4" stroke-width="4"/>

      <text x="280" y="45" text-anchor="middle" fill="#FFF" font-size="20" font-weight="900">${L2}</text>
      <circle cx="280" cy="70" r="11" fill="#FFF" stroke="#FFC953" stroke-width="4"/>

      <text x="465" y="245" text-anchor="middle" fill="#FFF" font-size="20" font-weight="900">${L3}</text>
      <circle cx="465" cy="210" r="11" fill="#FFF" stroke="#35C992" stroke-width="4"/>
    </svg>`;
  }

  // CHẶNG 3: THÁP PHA LÊ (Hình bình hành ABCD)
  if (m.id === 3) {
    const hasAB = !isPart1 || vaState.paraEdges.has('AB');
    const hasAD = !isPart1 || vaState.paraEdges.has('AD');
    // A(105, 215), B(335, 215), D(215, 75), C(445, 75)
    return `<svg class="va-svg-stage" viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg">
      ${defs}
      <!-- Cạnh BC và DC của hình bình hành -->
      <line x1="335" y1="215" x2="445" y2="75" stroke="rgba(167,139,250,0.5)" stroke-width="2.5" stroke-dasharray="6 5"/>
      <line x1="215" y1="75" x2="445" y2="75" stroke="rgba(167,139,250,0.5)" stroke-width="2.5" stroke-dasharray="6 5"/>

      <!-- Đường chéo ẩn (?) -->
      <line x1="105" y1="215" x2="435" y2="80" stroke="#EC4899" stroke-width="3.5" stroke-dasharray="8 6"/>
      <text x="282" y="138" text-anchor="middle" fill="#F472B6" font-size="22" font-weight="900">?</text>

      <!-- Vectơ cạnh AB -->
      <g class="va-node-clickable" data-action="vaClickPara" data-edge="AB">
        <line x1="105" y1="215" x2="320" y2="215" stroke="${hasAB ? '#36DEF4' : '#64748B'}" stroke-width="5" marker-end="${hasAB ? 'url(#arrCyan)' : ''}"/>
        ${svgVecLabel(218, 248, 'AB', hasAB ? '#36DEF4' : '#94A3B8', 16)}
      </g>

      <!-- Vectơ cạnh AD -->
      <g class="va-node-clickable" data-action="vaClickPara" data-edge="AD">
        <line x1="105" y1="215" x2="206" y2="86" stroke="${hasAD ? '#FFC953' : '#64748B'}" stroke-width="5" marker-end="${hasAD ? 'url(#arrGold)' : ''}"/>
        ${svgVecLabel(132, 142, 'AD', hasAD ? '#FFC953' : '#94A3B8', 16)}
      </g>

      <!-- 4 Đỉnh A, B, C, D -->
      <text x="82" y="222" text-anchor="middle" fill="#FFF" font-size="20" font-weight="900">A</text>
      <circle cx="105" cy="215" r="10" fill="#FFF" stroke="#36DEF4" stroke-width="3.5"/>

      <text x="358" y="222" text-anchor="middle" fill="#FFF" font-size="20" font-weight="900">B</text>
      <circle cx="335" cy="215" r="10" fill="#FFF" stroke="#A78BFA" stroke-width="3.5"/>

      <text x="468" y="82" text-anchor="middle" fill="#FFF" font-size="20" font-weight="900">C</text>
      <circle cx="445" cy="75" r="10" fill="#FFF" stroke="#35C992" stroke-width="3.5"/>

      <text x="192" y="72" text-anchor="middle" fill="#FFF" font-size="20" font-weight="900">D</text>
      <circle cx="215" cy="75" r="10" fill="#FFF" stroke="#FFC953" stroke-width="3.5"/>
    </svg>`;
  }

  // CHẶNG 4: MÊ CUNG TRUNG ĐIỂM (Đoạn AB và viên pha lê I)
  if (m.id === 4) {
    const pct = isPart1 ? vaState.midpointPct : ((q.id === '4.3') ? 32 : 50);
    const ix = Math.round(90 + (pct / 100) * 380);
    const isBalanced = Math.abs(pct - 50) <= 5;
    const hasPointM = (q.id === '4.2');

    return `<svg class="va-svg-stage" viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg">
      ${defs}
      ${hasPointM ? `
        <line x1="280" y1="52" x2="98" y2="168" stroke="#36DEF4" stroke-width="2.5" stroke-dasharray="5 5" marker-end="url(#arrCyan)"/>
        <line x1="280" y1="52" x2="462" y2="168" stroke="#36DEF4" stroke-width="2.5" stroke-dasharray="5 5" marker-end="url(#arrCyan)"/>
        <line x1="280" y1="52" x2="280" y2="164" stroke="#FFC953" stroke-width="3.5" marker-end="url(#arrGold)"/>
        <circle cx="280" cy="52" r="10" fill="#FFF" stroke="#A78BFA" stroke-width="3.5"/>
        <text x="280" y="34" text-anchor="middle" fill="#FFF" font-size="18" font-weight="900">M</text>
        ${svgVecLabel(308, 118, 'MI', '#FFC953', 15)}
      ` : ''}

      <!-- Vạch chia trung điểm 50% -->
      <line x1="280" y1="140" x2="280" y2="215" stroke="rgba(53,201,146,0.45)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Hai vectơ IA (hướng sang trái tới A) và IB (hướng sang phải tới B) -->
      <line x1="${ix}" y1="180" x2="108" y2="180" stroke="#36DEF4" stroke-width="5" marker-end="url(#arrCyan)"/>
      <line x1="${ix}" y1="180" x2="452" y2="180" stroke="#35C992" stroke-width="5" marker-end="url(#arrGreen)"/>

      ${svgVecLabel(Math.round((ix + 90) / 2), 160, 'IA', '#36DEF4', 16)}
      ${svgVecLabel(Math.round((ix + 470) / 2), 160, 'IB', '#35C992', 16)}

      <!-- Đỉnh A và Đỉnh B -->
      <text x="90" y="218" text-anchor="middle" fill="#FFF" font-size="20" font-weight="900">A</text>
      <circle cx="90" cy="180" r="10" fill="#FFF" stroke="#36DEF4" stroke-width="3.5"/>

      <text x="470" y="218" text-anchor="middle" fill="#FFF" font-size="20" font-weight="900">B</text>
      <circle cx="470" cy="180" r="10" fill="#FFF" stroke="#35C992" stroke-width="3.5"/>

      <!-- Viên pha lê I -->
      <g class="va-node-clickable" data-action="vaSetMidpoint" data-pct="50">
        <polygon points="${ix},156 ${ix+16},180 ${ix},204 ${ix-16},180" fill="${isBalanced ? '#FFC953' : '#F43F5E'}" stroke="#FFFFFF" stroke-width="2.5"/>
        <text x="${ix}" y="185" text-anchor="middle" fill="#0B1227" font-size="14" font-weight="900">I</text>
      </g>
    </svg>`;
  }

  // CHẶNG 5: THÀNH TRÌ LÕI TRÍ TUỆ (Tam giác ABC, trung tuyến AI và Trọng tâm G)
  const hasG = !isPart1 || vaState.centroidSelected === 'G';
  return `<svg class="va-svg-stage" viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg">
    ${defs}
    <!-- Cạnh tam giác ABC -->
    <polygon points="280,46 110,226 450,226" fill="rgba(16,27,59,0.5)" stroke="#64748B" stroke-width="2.5"/>

    <!-- 3 đường trung tuyến AI, BJ, CK -->
    <line x1="280" y1="46" x2="280" y2="226" stroke="rgba(148,163,184,0.55)" stroke-width="2" stroke-dasharray="5 5"/>
    <line x1="110" y1="226" x2="365" y2="136" stroke="rgba(148,163,184,0.4)" stroke-width="1.8" stroke-dasharray="5 5"/>
    <line x1="450" y1="226" x2="195" y2="136" stroke="rgba(148,163,184,0.4)" stroke-width="1.8" stroke-dasharray="5 5"/>

    ${hasG ? `
      <line x1="280" y1="166" x2="280" y2="64" stroke="#36DEF4" stroke-width="4" marker-end="url(#arrCyan)"/>
      <line x1="280" y1="166" x2="128" y2="219" stroke="#FFC953" stroke-width="4" marker-end="url(#arrGold)"/>
      <line x1="280" y1="166" x2="432" y2="219" stroke="#35C992" stroke-width="4" marker-end="url(#arrGreen)"/>
      ${svgVecLabel(308, 114, 'GA', '#36DEF4', 15)}
      ${svgVecLabel(188, 186, 'GB', '#FFC953', 15)}
      ${svgVecLabel(372, 186, 'GC', '#35C992', 15)}
    ` : ''}

    <!-- Trung điểm I của cạnh BC -->
    <g class="va-node-clickable" data-action="vaClickCentroid" data-pt="I">
      <circle cx="280" cy="226" r="9" fill="#334155" stroke="#94A3B8" stroke-width="2.5"/>
      <text x="280" y="252" text-anchor="middle" fill="#E2E8F0" font-size="16" font-weight="900">I</text>
    </g>

    <!-- Đỉnh A, B, C -->
    <text x="280" y="28" text-anchor="middle" fill="#FFF" font-size="20" font-weight="900">A</text>
    <circle cx="280" cy="46" r="10" fill="#FFF" stroke="#36DEF4" stroke-width="3.5"/>

    <text x="86" y="232" text-anchor="middle" fill="#FFF" font-size="20" font-weight="900">B</text>
    <circle cx="110" cy="226" r="10" fill="#FFF" stroke="#FFC953" stroke-width="3.5"/>

    <text x="474" y="232" text-anchor="middle" fill="#FFF" font-size="20" font-weight="900">C</text>
    <circle cx="450" cy="226" r="10" fill="#FFF" stroke="#35C992" stroke-width="3.5"/>

    <!-- Trọng tâm G -->
    <g class="va-node-clickable" data-action="vaClickCentroid" data-pt="G">
      <circle cx="280" cy="166" r="16" fill="${hasG ? '#E11D48' : '#5846C9'}" stroke="#FFC953" stroke-width="3"/>
      <text x="280" y="172" text-anchor="middle" fill="#FFFFFF" font-size="15" font-weight="900">G</text>
    </g>
  </svg>`;
}

function renderInteractiveControls(m) {
  if (m.id === 1) {
    return `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <span>Kích hoạt nhanh cột mốc:</span>
      ${['A', 'B', 'C'].map(p => `<button type="button" class="mv-chip-btn ${vaState.pillars.has(p) ? 'active' : ''}" data-action="vaClickPillar" data-node="${p}">📍 Cột mốc ${p} ${vaState.pillars.has(p) ? '✓' : ''}</button>`).join('')}
    </div>`;
  }
  if (m.id === 2) {
    return `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <span>Kích hoạt đoạn đường:</span>
      ${['AB', 'BC'].map(p => `<button type="button" class="mv-chip-btn ${vaState.paths.has(p) ? 'active' : ''}" data-action="vaClickPath" data-path="${p}">⚡ Đoạn ${p} ${vaState.paths.has(p) ? '✓' : ''}</button>`).join('')}
    </div>`;
  }
  if (m.id === 3) {
    return `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <span>Kích hoạt hai vectơ cạnh từ A:</span>
      ${['AB', 'AD'].map(e => `<button type="button" class="mv-chip-btn ${vaState.paraEdges.has(e) ? 'active' : ''}" data-action="vaClickPara" data-edge="${e}">💠 Vectơ ${e} ${vaState.paraEdges.has(e) ? '✓' : ''}</button>`).join('')}
    </div>`;
  }
  if (m.id === 4) {
    return `<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;width:100%">
      <span>Vị trí pha lê I:</span>
      <input type="range" min="15" max="85" step="5" value="${vaState.midpointPct}" style="flex:1;accent-color:#FACC15" oninput="window.vaUpdateMidpointSlider(this.value)"/>
      <button type="button" class="mv-chip-btn ${Math.abs(vaState.midpointPct - 50) <= 5 ? 'active' : ''}" data-action="vaSetMidpoint" data-pct="50">⚖️ Đặt tại Trung điểm I (50%)</button>
    </div>`;
  }
  return `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
    <span>Chọn giao điểm 3 trung tuyến:</span>
    <button type="button" class="mv-chip-btn ${vaState.centroidSelected === 'G' ? 'active' : ''}" data-action="vaClickCentroid" data-pt="G">👑 Chọn Trọng tâm G ${vaState.centroidSelected === 'G' ? '✓' : ''}</button>
  </div>`;
}

window.vaUpdateMidpointSlider = function(val) {
  vaState.midpointPct = Number(val);
  if (Math.abs(vaState.midpointPct - 50) <= 5) {
    vaState.dragonMsg = 'Tuyệt vời! Viên pha lê I đã nằm đúng trung điểm AB, hai vectơ IA và IB cân bằng nhau!';
    vaState.dragonMood = 'win';
  }
  render();
};

function formatMMSS(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds || 0));
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return mm + ':' + ss;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CHẶNG 1 NÂNG CẤP: GAME TRUY TÌM MẬT THƯ – "BÍ MẬT CÂY CẦU ĐẢO CHIỀU"
   4 Bước tương tác: Tìm 3 cột đá A,B,C -> Ghép mật thư -> Kéo mũi tên CB -> Khôi phục cầu
   ═══════════════════════════════════════════════════════════════════════════ */
const S1_PILLAR_META = {
  A: { id: 'A', label: 'Cột đá A', token: 'AB', tokenDisplay: '\\vec{AB}', left: 20, top: 52, rune: 'ᚠ' },
  B: { id: 'B', label: 'Cột đá B', token: '-',  tokenDisplay: '−',         left: 52, top: 44, rune: 'ᛟ' },
  C: { id: 'C', label: 'Cột đá C', token: 'AC', tokenDisplay: '\\vec{AC}', left: 81, top: 50, rune: 'ᛞ' }
};

const S1_VERTEX_COORDS = {
  A: { x: 280, y: 56,  labelX: 280, labelY: 26 },
  B: { x: 120, y: 224, labelX: 88,  labelY: 230 },
  C: { x: 440, y: 224, labelX: 472, labelY: 230 }
};

function renderS1TokenLabel(token) {
  if (token === 'AB') return formatMath('\\vec{AB}');
  if (token === 'AC') return formatMath('\\vec{AC}');
  if (token === '-')  return '<span style="font-size:24px;font-weight:900;color:#FFC953">−</span>';
  return esc(token || '');
}

window.s1DragStart = function(ev, token, fromSlotIdx = null) {
  try {
    ev.dataTransfer.setData('text/plain', JSON.stringify({ token, fromSlotIdx }));
  } catch (e) {}
};

window.s1DragOver = function(ev) {
  ev.preventDefault();
};

window.s1DropSlot = function(ev, targetSlotIdx) {
  ev.preventDefault();
  try {
    const raw = ev.dataTransfer.getData('text/plain');
    if (!raw) return;
    const data = JSON.parse(raw);
    const token = data.token;
    if (!token) return;
    const prevInTarget = vaState.s1CipherSlots[targetSlotIdx];
    if (data.fromSlotIdx !== null && data.fromSlotIdx !== undefined) {
      vaState.s1CipherSlots[data.fromSlotIdx] = prevInTarget || null;
    } else {
      const existingIdx = vaState.s1CipherSlots.indexOf(token);
      if (existingIdx !== -1) vaState.s1CipherSlots[existingIdx] = prevInTarget || null;
    }
    vaState.s1CipherSlots[targetSlotIdx] = token;
    vaState.s1Feedback = null;
    sound('step');
    render();
  } catch (e) {}
};

let s1DragVertexFrom = null;
window.s1StartVertexDrag = function(ev, pt) {
  s1DragVertexFrom = pt;
  vaState.s1ArrowFrom = pt;
  vaState.s1ArrowTo = null;
  vaState.s1Feedback = null;
  const svg = document.getElementById('s1VectorSvg');
  const dragLine = document.getElementById('s1LiveDragLine');
  const startCoord = S1_VERTEX_COORDS[pt];
  if (!svg || !dragLine || !startCoord) return;

  dragLine.setAttribute('x1', startCoord.x);
  dragLine.setAttribute('y1', startCoord.y);
  dragLine.setAttribute('x2', startCoord.x);
  dragLine.setAttribute('y2', startCoord.y);
  dragLine.style.display = 'block';

  function onMove(moveEv) {
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const cx = ((moveEv.clientX - rect.left) / rect.width) * 560;
    const cy = ((moveEv.clientY - rect.top) / rect.height) * 280;
    dragLine.setAttribute('x2', Math.max(20, Math.min(540, cx)));
    dragLine.setAttribute('y2', Math.max(20, Math.min(265, cy)));
  }

  function onUp(upEv) {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    dragLine.style.display = 'none';
    const rect = svg.getBoundingClientRect();
    if (rect.width && rect.height) {
      const ux = ((upEv.clientX - rect.left) / rect.width) * 560;
      const uy = ((upEv.clientY - rect.top) / rect.height) * 280;
      let nearestPt = null;
      let minDist = 68; // ngưỡng bắt điểm đỉnh A, B, C
      Object.entries(S1_VERTEX_COORDS).forEach(([k, v]) => {
        const d = Math.hypot(ux - v.x, uy - v.y);
        if (d < minDist) {
          minDist = d;
          nearestPt = k;
        }
      });
      if (nearestPt && nearestPt !== s1DragVertexFrom) {
        vaState.s1ArrowFrom = s1DragVertexFrom;
        vaState.s1ArrowTo = nearestPt;
        sound('target');
        render();
        return;
      }
    }
    render();
  }

  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
};

function renderStage1RestoredBridgeStep() {
  return `<div class="s1-quest-wrap s1-bridge-restored">
    <div class="s1-step-ribbon">
      <span class="s1-step-pill done">✓ Bước 1: 3/3 Mật thư</span>
      <span class="s1-step-pill done">✓ Bước 2: Ghép mật thư</span>
      <span class="s1-step-pill done">✓ Bước 3: Vectơ CB</span>
      <span class="s1-step-pill active">✨ Bước 4: Khôi phục Cây Cầu Ánh Sáng</span>
    </div>

    <div class="s1-restored-showcase" style="background-image: linear-gradient(180deg, rgba(6,22,38,0.45), rgba(6,22,38,0.82)), url('/assets/Stage1_Restored_Bridge.jpg')">
      <svg class="s1-restored-svg" viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="s1BridgeEnergyGrad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#FFC953"/>
            <stop offset="50%" stop-color="#36DEF4"/>
            <stop offset="100%" stop-color="#10B981"/>
          </linearGradient>
          <marker id="s1ArrRestoredCB" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#FFC953"/>
          </marker>
          <marker id="s1ArrCyanSub" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#36DEF4"/>
          </marker>
        </defs>

        <!-- Hai tia vectơ AB và AC -->
        <line x1="280" y1="48" x2="128" y2="196" stroke="#36DEF4" stroke-width="4" stroke-opacity="0.85" marker-end="url(#s1ArrCyanSub)"/>
        <line x1="280" y1="48" x2="432" y2="196" stroke="#36DEF4" stroke-width="4" stroke-opacity="0.85" marker-end="url(#s1ArrCyanSub)"/>
        ${svgVecLabel(178, 118, 'AB', '#36DEF4', 16)}
        ${svgVecLabel(382, 118, 'AC', '#36DEF4', 16)}

        <!-- CẦU NĂNG LƯỢNG ÁNH SÁNG NỐI TỪ C SANG B -->
        <rect x="120" y="192" width="320" height="24" rx="12" fill="url(#s1BridgeEnergyGrad)" opacity="0.38" class="s1-bridge-beam-glow"/>
        <line x1="422" y1="204" x2="142" y2="204" stroke="#FFC953" stroke-width="6.5" marker-end="url(#s1ArrRestoredCB)" class="s1-cb-arrow-glow"/>
        ${svgVecLabel(280, 184, 'CB', '#FFC953', 20)}

        <!-- 3 CỘT ĐÁ A, B, C PHÁT SÁNG RỰC RỠ -->
        <g class="s1-pillar-svg-glow">
          <circle cx="280" cy="48" r="16" fill="#10B981" stroke="#FFC953" stroke-width="4"/>
          <text x="280" y="54" text-anchor="middle" fill="#FFFFFF" font-size="15" font-weight="900">A</text>
        </g>
        <g class="s1-pillar-svg-glow">
          <circle cx="120" cy="204" r="16" fill="#10B981" stroke="#FFC953" stroke-width="4"/>
          <text x="120" y="210" text-anchor="middle" fill="#FFFFFF" font-size="15" font-weight="900">B</text>
        </g>
        <g class="s1-pillar-svg-glow">
          <circle cx="440" cy="204" r="16" fill="#10B981" stroke="#FFC953" stroke-width="4"/>
          <text x="440" y="210" text-anchor="middle" fill="#FFFFFF" font-size="15" font-weight="900">C</text>
        </g>
      </svg>

      <div class="s1-restored-banner">
        <div class="s1-restored-formula">${formatMath('\\vec{AB} − \\vec{AC} = \\vec{CB}')}</div>
        <p class="s1-restored-msg">🐉 <b>Rồng Xanh:</b> “Tuyệt vời! Ba cột đá A, B, C và mũi tên <span class="math-vec"><span class="vec-arr">→</span><span>CB</span></span> đã phát sáng! Cây cầu năng lượng qua Rừng Vectơ đã khôi phục, đội nhận <b>Ấn Hướng Đi 🧭</b>!”</p>
        <div class="s1-restored-rewards">
          <span class="s1-reward-pill gold">🧭 Nhận Ấn Hướng Đi</span>
          <span class="s1-reward-pill cyan">⭐ +Điểm XP & Vàng</span>
          <button type="button" class="hs-confirm-btn" data-action="s1ProceedToStage2">
            🌉 BƯỚC QUA CẦU SANG CHẶNG 2 →
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderStage1CipherBridgeGame(m) {
  ensureVaStateForStage(m);
  if (vaState.s1BridgeRestoredOverlay) {
    return renderStage1RestoredBridgeStep();
  }

  const r = m.round || 0;
  const cluesCount = r >= 1 ? 3 : vaState.pillars.size;
  const roles = m.teamRoles || [
    'Thành viên 1 (Thám hiểm): Tìm 3 cột đá A, B, C',
    'Thành viên 2 (Giải mật thư): Ghép biểu thức vectơ',
    'Thành viên 3 (Điều khiển): Kéo mũi tên chọn hướng',
    'Thành viên 4 (Xác nhận): Mở khóa Cầu Ánh Sáng'
  ];
  const activeRoleText = r === 0 ? roles[0] : r === 1 ? roles[1] : (roles[2] + ' · ' + (roles[3] || ''));

  const stepRibbonHtml = `<div class="s1-step-ribbon">
    <span class="s1-step-pill ${r === 0 ? 'active' : 'done'}">${r > 0 ? '✓' : '1.'} Tìm mật thư (${cluesCount}/3)</span>
    <span class="s1-step-pill ${r === 1 ? 'active' : r > 1 ? 'done' : ''}">${r > 1 ? '✓' : '2.'} Ghép mật thư</span>
    <span class="s1-step-pill ${r === 2 ? 'active' : ''}">3. Tìm hướng vectơ</span>
    <span class="s1-role-chip" title="Phân vai phối hợp nhóm 3–5 học sinh">👥 ${esc(activeRoleText)}</span>
  </div>`;

  // ─── BƯỚC 1: TÌM MẬT THƯ TẠI 3 CỘT ĐÁ A, B, C ───
  if (r === 0) {
    const allFound = cluesCount >= 3;
    return `<div class="s1-quest-wrap">
      ${stepRibbonHtml}
      <div class="s1-forest-scene" style="background-image: linear-gradient(180deg, rgba(6,20,34,0.32), rgba(6,20,34,0.78)), url('/assets/Stage1_Pillars_Forest.jpg'), url('/assets/Stage_01_Rung_Vecto.png')">
        <div class="s1-scene-top-hud">
          <div class="s1-objective-badge">
            🔍 <b>BƯỚC 1 – TÌM MẬT THƯ:</b> Nhấn vào 3 cột đá cổ <b>A, B, C</b> đang phát sáng trong Rừng Vectơ để thu thập 3 mảnh mật thư!
          </div>
          <div class="s1-clue-counter ${allFound ? 'complete' : ''}">
            📜 Mật thư: <b>${cluesCount}/3</b>
          </div>
        </div>

        <!-- 3 CỘT ĐÁ CỔ A, B, C TRÊN BỐI CẢNH RỪNG VECTƠ -->
        <div class="s1-pillars-stage">
          ${['A', 'B', 'C'].map(pid => {
            const meta = S1_PILLAR_META[pid];
            const isOpened = vaState.pillars.has(pid);
            return `<button type="button" class="s1-pillar-node ${isOpened ? 'opened' : 'sealed'}" style="left:${meta.left}%;top:${meta.top}%" data-action="s1ClickPillar" data-pillar="${pid}" title="Nhấn để mở phong ấn ${meta.label}">
              <span class="s1-pillar-aura"></span>
              <span class="s1-pillar-stone">
                <span class="s1-pillar-rune">${meta.rune}</span>
                <strong class="s1-pillar-letter">${pid}</strong>
                <small class="s1-pillar-status">${isOpened ? '✓ Đã thu thập' : 'Nhấn mở ấn'}</small>
              </span>
              ${isOpened ? `<span class="s1-pillar-shard">📜 ${renderS1TokenLabel(meta.token)}</span>` : ''}
            </button>`;
          }).join('')}
        </div>

        <!-- KHAY 3 MẢNH MẬT THƯ & NÚT CHUYỂN SANG BƯỚC 2 -->
        <div class="s1-forest-bottom-bar">
          <div class="s1-collected-tray">
            <span>Mảnh mật thư thu được:</span>
            ${['A', 'B', 'C'].map(pid => {
              const meta = S1_PILLAR_META[pid];
              const has = vaState.pillars.has(pid);
              return `<span class="s1-mini-fragment ${has ? 'earned' : 'locked'}">
                ${has ? `Cột ${pid}: ${renderS1TokenLabel(meta.token)}` : `Cột ${pid}: ?`}
              </span>`;
            }).join('')}
          </div>
          <button type="button" class="hs-confirm-btn ${allFound ? 'pulse-ready' : ''}" data-action="s1FinishStep1" ${!allFound ? 'disabled' : ''}>
            ${allFound ? '📜 MỞ BẢNG GIẢI MÃ MẬT THƯ (3/3) →' : `Hãy tìm đủ 3 cột đá (${cluesCount}/3)`}
          </button>
        </div>
      </div>
    </div>`;
  }

  // ─── BƯỚC 2: GHÉP MẬT THƯ (KÉO THẢ HOẶC NHẤN ĐỂ XẾP: vectơ AB − vectơ AC = ?) ───
  if (r === 1) {
    const allTokens = ['AC', 'AB', '-'];
    const usedTokens = vaState.s1CipherSlots.filter(Boolean);
    const availableTokens = allTokens.filter(t => !usedTokens.includes(t));
    const isFull = usedTokens.length === 3;

    return `<div class="s1-quest-wrap">
      ${stepRibbonHtml}
      <div class="s1-cipher-board" style="background-image: linear-gradient(180deg, rgba(8,15,32,0.72), rgba(8,15,32,0.88)), url('/assets/Stage1_Cipher_Scroll.jpg')">
        <div class="s1-scene-top-hud">
          <div class="s1-objective-badge">
            🧩 <b>BƯỚC 2 – GHÉP MẬT THƯ:</b> Kéo thả (hoặc chạm) 3 mảnh mật thư từ 3 cột đá để ghép thành biểu thức <b>Hiệu hai vectơ xuất phát từ điểm A</b>!
          </div>
          <div class="s1-clue-counter complete">📜 Đủ 3/3 mảnh</div>
        </div>

        <!-- KHU VỰC 3 Ô GHÉP BIỂU THỨC: [ Ô 1 ] [ Ô 2 ] [ Ô 3 ] = ? (KHÔNG LỘ ĐÁP ÁN CB) -->
        <div class="s1-cipher-equation-box">
          <div class="s1-cipher-slots-row">
            ${[0, 1, 2].map(slotIdx => {
              const tok = vaState.s1CipherSlots[slotIdx];
              const slotHints = ['Vectơ thứ nhất (từ A)', 'Phép toán', 'Vectơ thứ hai (từ A)'];
              return `<div class="s1-cipher-slot ${tok ? 'filled' : 'empty'}"
                ondragover="window.s1DragOver(event)"
                ondrop="window.s1DropSlot(event, ${slotIdx})"
                ${tok ? `draggable="true" ondragstart="window.s1DragStart(event, '${tok}', ${slotIdx})" data-action="s1RemoveCipherSlot" data-slot="${slotIdx}"` : ''}
                title="${tok ? 'Nhấn để gỡ mảnh này ra' : slotHints[slotIdx]}">
                <small class="s1-slot-index">Mảnh ${slotIdx + 1}</small>
                <div class="s1-slot-content">
                  ${tok ? renderS1TokenLabel(tok) : `<span class="s1-slot-placeholder">${esc(slotHints[slotIdx])}</span>`}
                </div>
              </div>`;
            }).join('')}
            <span class="s1-cipher-equals">=</span>
            <div class="s1-cipher-mystery-box" title="Vectơ bí mật sẽ được giải mã ở Bước 3">?</div>
          </div>
        </div>

        <!-- KHAY CÁC MẢNH MẬT THƯ ĐỂ KÉO THẢ HOẶC NHẤN CHỌN -->
        <div class="s1-cipher-pool-area">
          <div class="s1-pool-label">Kéo mảnh mật thư vào ô trống phía trên (hoặc nhấn trực tiếp vào mảnh):</div>
          <div class="s1-cipher-tokens-row">
            ${availableTokens.length > 0 ? availableTokens.map(tok => `
              <button type="button" class="s1-cipher-token-chip"
                draggable="true"
                ondragstart="window.s1DragStart(event, '${tok}', null)"
                data-action="s1PlaceCipherToken"
                data-token="${tok}"
                title="Kéo thả hoặc nhấn để đặt mảnh này vào ô trống">
                <span class="s1-chip-grip">⋮⋮</span>
                <span class="s1-chip-math">${renderS1TokenLabel(tok)}</span>
              </button>
            `).join('') : `<span class="s1-all-placed-note">✓ Đã đặt đủ 3 mảnh vào bảng giải mã. Nhấn "Giải mã mật thư" để kiểm tra!</span>`}
          </div>
        </div>

        ${vaState.s1Feedback ? `<div class="s1-inline-feedback ${vaState.s1Feedback.good ? 'good' : 'warn'}">${esc(vaState.s1Feedback.text)}</div>` : ''}

        <div class="s1-cipher-actions">
          <button type="button" class="mv-chip-btn" data-action="s1ResetCipher">↺ Xếp lại các mảnh</button>
          <button type="button" class="hs-confirm-btn" data-action="s1SubmitCipher" ${!isFull ? 'disabled' : ''}>
            🔓 GIẢI MÃ MẬT THƯ
          </button>
        </div>
      </div>
    </div>`;
  }

  // ─── BƯỚC 3: TÌM HƯỚNG VECTƠ BÍ MẬT (NHẤN ĐIỂM ĐẦU & KÉO MŨI TÊN ĐẾN ĐIỂM CUỐI TRÊN TAM GIÁC ABC) ───
  const fromPt = vaState.s1ArrowFrom;
  const toPt = vaState.s1ArrowTo;
  const hasFullArrow = Boolean(fromPt && toPt && fromPt !== toPt);
  const fCoord = fromPt ? S1_VERTEX_COORDS[fromPt] : null;
  const tCoord = toPt ? S1_VERTEX_COORDS[toPt] : null;

  // Rút ngắn nhẹ đầu mũi tên để không đè lên tâm đỉnh
  let arrowLineHtml = '';
  if (hasFullArrow && fCoord && tCoord) {
    const dx = tCoord.x - fCoord.x;
    const dy = tCoord.y - fCoord.y;
    const len = Math.hypot(dx, dy) || 1;
    const x1 = Math.round(fCoord.x + (dx / len) * 18);
    const y1 = Math.round(fCoord.y + (dy / len) * 18);
    const x2 = Math.round(tCoord.x - (dx / len) * 22);
    const y2 = Math.round(tCoord.y - (dy / len) * 22);
    const midX = Math.round((fCoord.x + tCoord.x) / 2);
    const midY = Math.round((fCoord.y + tCoord.y) / 2 - 14);
    arrowLineHtml = `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#10B981" stroke-width="6" marker-end="url(#s1ArrPlayer)" class="s1-player-drawn-arrow"/>
      ${svgVecLabel(midX, midY, fromPt + toPt, '#10B981', 20)}
    `;
  }

  return `<div class="s1-quest-wrap">
    ${stepRibbonHtml}
    <div class="s1-vector-arena" style="background-image: linear-gradient(180deg, rgba(6,18,34,0.68), rgba(6,18,34,0.86)), url('/assets/Stage1_Vector_Triangle_Beams.jpg')">
      <div class="s1-scene-top-hud">
        <div class="s1-objective-badge">
          🏹 <b>BƯỚC 3 – TÌM HƯỚNG VECTƠ BÍ MẬT:</b> Nhấn vào <b>điểm bắt đầu</b> và kéo mũi tên đến <b>điểm kết thúc</b> trên sơ đồ tam giác ABC để giải mã:
        </div>
        <div class="s1-decoded-expr-pill">
          ${formatMath('\\vec{AB} − \\vec{AC} =')} <b style="color:#FFC953">${hasFullArrow ? formatMath('\\vec{' + fromPt + toPt + '}') : '?'}</b>
        </div>
      </div>

      <div class="s1-svg-canvas-box">
        <svg id="s1VectorSvg" class="va-svg-stage s1-interactive-svg" viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="s1ArrCyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#36DEF4"/>
            </marker>
            <marker id="s1ArrGold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#FFC953"/>
            </marker>
            <marker id="s1ArrPlayer" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981"/>
            </marker>
          </defs>

          <!-- Hai vectơ đã biết: AB (từ A xuống B) và AC (từ A xuống C) -->
          <line x1="280" y1="56" x2="132" y2="210" stroke="#36DEF4" stroke-width="4.5" marker-end="url(#s1ArrCyan)"/>
          ${svgVecLabel(172, 134, 'AB', '#36DEF4', 18)}

          <line x1="280" y1="56" x2="428" y2="210" stroke="#FFC953" stroke-width="4.5" marker-end="url(#s1ArrGold)"/>
          ${svgVecLabel(388, 134, 'AC', '#FFC953', 18)}

          <!-- Khe vực cây cầu bị đứt giữa B và C (nét đứt, không lộ hướng) -->
          <line x1="142" y1="224" x2="418" y2="224" stroke="rgba(244,114,182,0.55)" stroke-width="4" stroke-dasharray="10 8"/>
          ${!hasFullArrow ? `<text x="280" y="214" text-anchor="middle" fill="#F472B6" font-size="22" font-weight="900">?</text>` : ''}

          <!-- Mũi tên đang kéo trực tiếp bằng chuột/cảm ứng -->
          <line id="s1LiveDragLine" x1="0" y1="0" x2="0" y2="0" stroke="#10B981" stroke-width="5" stroke-dasharray="6 4" marker-end="url(#s1ArrPlayer)" style="display:none;pointer-events:none"/>

          <!-- Mũi tên do học sinh đã tạo -->
          ${arrowLineHtml}

          <!-- Ba đỉnh tương tác A, B, C (Hỗ trợ cả Kéo-Thả và Nhấn Điểm Đầu -> Nhấn Điểm Cuối) -->
          ${['A', 'B', 'C'].map(pt => {
            const c = S1_VERTEX_COORDS[pt];
            const isStart = (fromPt === pt);
            const isEnd = (toPt === pt);
            const ringColor = isStart ? '#FFC953' : isEnd ? '#10B981' : '#36DEF4';
            const fillBg = isStart ? '#F59E0B' : isEnd ? '#10B981' : '#0F172A';
            return `<g class="s1-vertex-node ${isStart ? 'is-start' : ''} ${isEnd ? 'is-end' : ''}"
              onpointerdown="window.s1StartVertexDrag(event, '${pt}')"
              data-action="s1ClickVertex"
              data-pt="${pt}">
              <circle cx="${c.x}" cy="${c.y}" r="24" fill="rgba(54,222,244,0.12)" stroke="${ringColor}" stroke-width="2" stroke-dasharray="4 3"/>
              <circle cx="${c.x}" cy="${c.y}" r="16" fill="${fillBg}" stroke="#FFFFFF" stroke-width="3.5"/>
              <text x="${c.x}" y="${c.y + 6}" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="900" style="pointer-events:none">${pt}</text>
              <text x="${c.labelX}" y="${c.labelY}" text-anchor="middle" fill="${ringColor}" font-size="13" font-weight="900" style="pointer-events:none">
                ${isStart ? 'Điểm đầu' : isEnd ? 'Điểm cuối' : ('Điểm ' + pt)}
              </text>
            </g>`;
          }).join('')}
        </svg>
      </div>

      ${vaState.s1Feedback ? `<div class="s1-inline-feedback ${vaState.s1Feedback.good ? 'good' : 'warn'}">${esc(vaState.s1Feedback.text)}</div>` : ''}

      <div class="s1-vector-controls-bar">
        <div class="s1-arrow-status-text">
          ${!fromPt
            ? '👆 Hãy <b>nhấn giữ Điểm bắt đầu rồi kéo tới Điểm kết thúc</b> (hoặc chạm lần lượt Điểm đầu → Điểm cuối)!'
            : !toPt
              ? `📍 Đã chọn điểm bắt đầu <b>${fromPt}</b>. Hãy kéo hoặc nhấn vào <b>Điểm kết thúc</b>!`
              : `🏹 Đã tạo mũi tên từ <b>${fromPt} → ${toPt}</b> (${formatMath('\\vec{' + fromPt + toPt + '}')}). Nhấn xác nhận để khôi phục cầu!`}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button type="button" class="mv-chip-btn" data-action="s1ResetArrow">↺ Kéo lại mũi tên</button>
          <button type="button" class="hs-confirm-btn" data-action="s1SubmitVectorArrow" ${!hasFullArrow ? 'disabled' : ''}>
            ⚡ KÍCH HOẠT VECTƠ & MỞ CẦU
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderVectorAdventureStage(m) {
  ensureVaStateForStage(m);
  if (m.id === 1 || vaState.s1BridgeRestoredOverlay) {
    return renderStage1CipherBridgeGame(m);
  }
  const r = m.round || 0;
  const q = m.challenge || {};
  const isPart1 = (r === 0);

  const stageDiagramHeaders = [
    'TÌM VECTƠ CÒN THIẾU',
    'NỐI HAI ĐOẠN VECTƠ LIÊN TIẾP',
    'ĐƯỜNG CHÉO HÌNH BÌNH HÀNH ABCD',
    'CÂN BẰNG PHA LÊ TẠI TRUNG ĐIỂM I',
    'GIAO ĐIỂM BA ĐƯỜNG TRUNG TUYẾN G'
  ];
  const stageDiagramCaptions = [
    'Hãy chọn chiều vectơ để phục hồi cây cầu.',
    'Kích hoạt hai chặng đường nối tiếp AB và BC để mở cổng Pháo Đài.',
    'Kích hoạt hai vectơ cạnh cùng xuất phát từ đỉnh A để dựng đường chéo.',
    'Đưa viên pha lê I về chính giữa đoạn thẳng AB để cân bằng hai vectơ.',
    'Xác định trọng tâm G để hợp nhất 3 luồng năng lượng GA, GB, GC.'
  ];

  const diagTitle = stageDiagramHeaders[(m.id || 1) - 1] || 'SƠ ĐỒ VECTƠ TƯƠNG TÁC';
  const diagCaption = stageDiagramCaptions[(m.id || 1) - 1] || (m.interactiveTask?.instruction || '');

  const rightKicker = isPart1
    ? 'NHIỆM VỤ TƯƠNG TÁC (MẢNH KHÓA 1/3)'
    : (r === 1 ? 'CÂU HỎI 1/2' : 'CÂU HỎI 2/2');

  const opts = q.options || [];
  const choicesHtml = isPart1
    ? `<div class="hs-interactive-task-box">
        <p class="hs-task-desc">${formatMath(m.interactiveTask?.instruction || q.prompt)}</p>
        ${renderInteractiveControls(m)}
      </div>`
    : `<div class="hs-options-stack">
        ${opts.map((opt, idx) => {
          const isSel = vaState.selectedChoice === idx;
          return `<button type="button" class="hs-option-btn ${isSel ? 'selected' : ''}" data-action="vaSelectChoice" data-choice="${idx}">
            <span class="hs-option-letter">${labels[idx] || (idx + 1)}</span>
            <span class="hs-option-text">${formatMath(opt)}</span>
          </button>`;
        }).join('')}
      </div>`;

  const canConfirm = isPart1 ? true : (vaState.selectedChoice !== null);

  return `<div class="hs-interactive-grid">
    <!-- CỘT TRÁI: SƠ ĐỒ VECTƠ TƯƠNG TÁC SVG -->
    <div class="hs-diagram-panel">
      <div class="hs-diagram-kicker">${esc(diagTitle)}</div>
      <div class="hs-svg-wrap">
        ${renderStageVectorSVG(m)}
      </div>
      <div class="hs-diagram-caption">${formatMath(diagCaption)}</div>
    </div>

    <!-- CỘT PHẢI: KHỐI CÂU HỎI & LỰA CHỌN A / B / C -->
    <div class="hs-question-panel">
      <div>
        <div class="hs-question-kicker">${esc(rightKicker)}</div>
        <div class="hs-question-title">
          ${isPart1 ? formatMath(m.interactiveTask?.title || q.label) : formatMath(q.prompt)}
        </div>
        ${choicesHtml}
      </div>

      <div class="hs-confirm-row">
        <button type="button" class="hs-confirm-btn" data-action="vaSubmitCurrentPart" ${!canConfirm ? 'disabled' : ''}>
          XÁC NHẬN
        </button>
      </div>
    </div>
  </div>`;
}

function stageContent(m){
 ensureVaStateForStage(m);
 const roles = m.teamRoles || [
  'Người dẫn đường: Quan sát sơ đồ',
  'Người giải mã: Đề xuất đáp án',
  'Người điều khiển: Thao tác',
  'Người xác nhận: Chốt kết quả'
 ];
 const totalR = m.totalRounds || 3;
 const curR = m.round || 0;
 const shortTitle = m.shortName || SHORT_STAGE_NAMES[(m.id || 1) - 1] || m.place;

 const stageFullTitles = [
  'CHẶNG 1 · BÍ MẬT CÂY CẦU ĐẢO CHIỀU',
  'CHẶNG 2 · TỔNG HAI VECTƠ',
  'CHẶNG 3 · QUY TẮC HÌNH BÌNH HÀNH',
  'CHẶNG 4 · TÍNH CHẤT TRUNG ĐIỂM',
  'CHẶNG 5 · TÍNH CHẤT TRỌNG TÂM'
 ];
 const stageSubtitles = [
  'Rừng Vectơ Khởi Nguyên • Truy tìm 3 mảnh mật thư & giải mã hướng vectơ khôi phục cầu',
  'Pháo Đài Góc • Nối thông hai luồng năng lượng liên tiếp',
  'Tháp Pha Lê • Khôi phục đường chéo hình bình hành ABCD',
  'Mê Cung Trung Điểm • Cân bằng hai vectơ đối nhau tại điểm I',
  'Thành Trì Trí Tuệ • Hợp nhất 3 luồng năng lượng tại trọng tâm G'
 ];

 const isS1 = (m.id === 1 || vaState.s1BridgeRestoredOverlay);
 const headerTitle = isS1 ? stageFullTitles[0] : (stageFullTitles[(m.id || 1) - 1] || ('CHẶNG ' + m.id + ' · ' + m.title));
 const headerSub = isS1 ? stageSubtitles[0] : (stageSubtitles[(m.id || 1) - 1] || (m.place + ' • ' + m.story));

 const elapsedSec = Math.floor((Date.now() - vaState.stageStartedAt) / 1000);
 const remSec = Math.max(0, vaState.stageDurationSec - elapsedSec);
 const mmss = formatMMSS(remSec);

 const meDigits = world.me?.digits || [];
 const ownedSet = new Set(meDigits.map(d => d.stage));
 const s1ClueCount = isS1 ? (vaState.s1BridgeRestoredOverlay || curR >= 1 ? 3 : vaState.pillars.size) : 0;

 const drawerQuestHtml = !mvBriefingCollapsed ? `<div class="mv-drawer-panel" style="margin-bottom:10px">
  <div class="flex-between">
   <strong style="color:#FFC953;font-size:13.5px">${esc(headerTitle)} (${esc(m.levelBadge || '')})</strong>
   <button type="button" class="mv-chip-btn" data-action="toggleBriefing">✕ Đóng</button>
  </div>
  <p style="color:#CBD5E1;margin-top:4px;font-size:12px">${esc(m.story)}</p>
  <div class="mv-drawer-grid">
   <div class="mv-drawer-box">
    <h4>🎯 Tiến độ trong chặng (${curR}/${totalR})</h4>
    ${isS1 ? `
     <div style="color:${curR >= 1 ? '#35C992' : '#E2E8F0'}">${curR >= 1 ? '✓' : '•'} Bước 1: Tìm 3 mảnh mật thư tại cột đá A, B, C (${s1ClueCount}/3)</div>
     <div style="color:${curR >= 2 ? '#35C992' : '#E2E8F0'}">${curR >= 2 ? '✓' : '•'} Bước 2: Ghép mật thư hiệu hai vectơ</div>
     <div style="color:${vaState.s1BridgeRestoredOverlay ? '#35C992' : '#E2E8F0'}">${vaState.s1BridgeRestoredOverlay ? '✓' : '•'} Bước 3 & 4: Kéo mũi tên hướng vectơ & Mở cầu ánh sáng</div>
    ` : `
     <div style="color:${curR >= 1 ? '#35C992' : '#E2E8F0'}">${curR >= 1 ? '✓' : '•'} Phần 1: Nhiệm vụ tương tác sơ đồ (Khóa 1/3)</div>
     <div style="color:${curR >= 2 ? '#35C992' : '#E2E8F0'}">${curR >= 2 ? '✓' : '•'} Phần 2: Câu hỏi giải mã 1/2 (Khóa 2/3)</div>
     <div style="color:${curR >= 3 ? '#35C992' : '#E2E8F0'}">${curR >= 3 ? '✓' : '•'} Phần 3: Câu hỏi giải mã 2/2 (Nhận ${esc(m.item)})</div>
    `}
   </div>
   <div class="mv-drawer-box">
    <h4>👥 Phân vai đội (3–5 học sinh)</h4>
    ${roles.map((r, idx) => `<div style="padding:2px 0;color:${idx === curR ? '#FFC953' : '#CBD5E1'}">• ${esc(r)}</div>`).join('')}
   </div>
   <div class="mv-drawer-box">
    <h4>📐 Gợi ý quy tắc</h4>
    <div style="color:#A5F3FC;font-weight:800">${formatMath(getStageFormulaSafe((m.id||1)-1, world.me?.stage ?? 0))}</div>
   </div>
  </div>
 </div>` : '';

 const s1CardImg = ((m.id === 1) && ((world.me?.stage ?? 0) < 1) && !vaState.s1BridgeRestoredOverlay)
  ? '/assets/Stage1_Cipher_Scroll.jpg'
  : (['/images/scenario/card-1.jpg','/images/scenario/card-2.jpg','/images/scenario/card-3.jpg','/images/scenario/card-4.jpg','/images/scenario/card-5.jpg'][(m.id||1)-1]||'/images/scenario/card-1.jpg');

 const drawerKnowledgeHtml = oxyz3D.open ? `<div class="mv-knowledge-split" style="margin-bottom:10px">
  <div class="mv-knowledge-card-box">
   <div class="flex-between">
    <strong style="color:#FFC953;font-size:12.5px">📘 Thẻ Gợi Ý Chặng ${m.id}: ${esc(shortTitle)}</strong>
    <button type="button" class="mv-chip-btn" data-action="toggle3DPanel">✕ Đóng</button>
   </div>
   <img src="${s1CardImg}" alt="Thẻ kiến thức Chặng ${m.id}" class="mv-knowledge-card-img" draggable="false"/>
  </div>
  <div>${renderOxyz3D(m, true)}</div>
 </div>` : '';

 return `<div class="hs-main-frame">
  <!-- HEADER CHẶNG & ĐỒNG HỒ ĐẾM NGƯỢC MM:SS -->
  <div class="hs-stage-header">
   <div class="hs-stage-header-left">
    ${DIAMOND_ICON_SVG}
    <div>
     <h1 class="hs-stage-title">${esc(headerTitle)}</h1>
     <p class="hs-stage-subtitle">${esc(headerSub)}</p>
    </div>
   </div>
   <div class="hs-stage-timer-box ${remSec <= 15 ? 'urgent' : ''}" id="vaStageTimerPill" title="Thời gian còn lại của chặng (${vaState.stageDurationSec} giây)">
    <span id="vaStageSecText">${mmss}</span>
   </div>
  </div>

  ${drawerQuestHtml}
  ${drawerKnowledgeHtml}

  <!-- KHU VỰC TƯƠNG TÁC CHÍNH (BẢN ĐỒ THẾ GIỚI 5 CHẶNG HOẶC MÀN CHƠI NHIỆM VỤ) -->
  <div id="mvActiveGameCanvas">
   ${(mvWorldMapOpen || StageTransitionController.isTransitioning())
    ? AdventureMap.render(world.me?.stage ?? ((m.id || 1) - 1))
    : mvShowIntroHub
      ? renderIntroHubBanner(true)
      : renderVectorAdventureStage(m)}
  </div>

  <!-- THANH TIẾN TRÌNH DƯỚI CÙNG TRONG KHUNG CHÍNH -->
  <div class="hs-bottom-strip">
   <div class="hs-bottom-seals">
    <span class="hs-bottom-label">ẤN VECTƠ</span>
    <div class="hs-mini-seals-list">
     ${[1,2,3,4,5].map(idx => {
      return ownedSet.has(idx)
       ? `<span class="hs-mini-seal earned" title="Đã thu hồi Ấn Chặng ${idx}">${SMALL_DIAMOND_SVG}</span>`
       : `<span class="hs-mini-seal empty" title="Ấn Chặng ${idx}"></span>`;
     }).join('')}
    </div>
   </div>

   <div class="hs-bottom-keys">
    ${isS1 ? `Mật thư: <b>${s1ClueCount}/3</b> · Bước: <b>${vaState.s1BridgeRestoredOverlay ? '4/4' : ((curR + 1) + '/4')}</b>` : `Chìa khóa: <b>${curR}/${totalR}</b>`}
   </div>
   </div>

   <div class="hs-bottom-team-status">
    <span>Đội 4 thành viên · Đang thảo luận</span>
    <div class="hs-bottom-quick-btns">
     <button type="button" class="mv-chip-btn ${!mvBriefingCollapsed ? 'active' : ''}" data-action="toggleBriefing">Nhiệm vụ</button>
     <button type="button" class="mv-chip-btn ${oxyz3D.open ? 'active' : ''}" data-action="toggle3DPanel">Kiến thức 3D</button>
    </div>
   </div>
  </div>

  ${cipherState.open ? renderCipherNotebookModal(m) : ''}
  ${showRolesModal ? renderTeamRolesModal(m) : ''}
 </div>`;
}

function finalContent(){
 const me = world.me || {};
 if (mvWorldMapOpen || StageTransitionController.isTransitioning()) {
  return `<div class="hs-main-frame">
   <div id="mvActiveGameCanvas">
    ${AdventureMap.render(5)}
   </div>
  </div>`;
 }
 const sealsCount = (me.digits || []).length;
 const rank = [...(world.teams || [])].sort((a,b)=>b.score-a.score);
 const mineRank = Math.max(1, rank.findIndex(t=>t.id===me.id)+1);
 const correctAns = me.correctCount || (sealsCount * 2);

 return `<div class="hs-main-frame">
  <div class="hs-stage-header">
   <div class="hs-stage-header-left">
    ${DIAMOND_ICON_SVG}
    <div>
     <h1 class="hs-stage-title">KHÔI PHỤC TÂM THẠCH VECTƠ · TỔNG KẾT HÀNH TRÌNH</h1>
     <p class="hs-stage-subtitle">🐉 Rồng Xanh đã bay lên đỉnh Thành Trì · Thu hồi ${sealsCount}/5 Ấn Vectơ</p>
    </div>
   </div>
   <div style="display:flex;gap:8px;align-items:center">
    <button type="button" class="mv-chip-btn" data-action="toggleWorldMap">🗺️ Xem Bản Đồ 5 Chặng</button>
    <div class="hs-stage-timer-box"><span>${sealsCount}/5 ẤN</span></div>
   </div>
  </div>
  <div style="padding:18px;background:rgba(11,18,39,0.75);border-radius:14px;border:1px solid rgba(54,222,244,0.3)">
   <div style="display:flex;align-items:center;gap:14px;padding:12px 16px;margin-bottom:14px;background:rgba(16,185,129,0.14);border:1px solid rgba(53,201,146,0.45);border-radius:12px">
    <img src="/assets/RongXanh.png" alt="Rồng Xanh" style="width:58px;height:58px;object-fit:contain;filter:drop-shadow(0 4px 10px rgba(0,0,0,0.5))" draggable="false"/>
    <div>
     <strong style="color:#FFC953;font-size:14px">💎 TÂM THẠCH VECTƠ ĐÃ SẴN SÀNG KHÔI PHỤC!</strong>
     <p style="color:#E2E8F0;font-size:12.5px;margin:3px 0 0">Rồng Xanh đã hoàn thành hành trình qua 5 vùng đất và mang các Ấn Vectơ lên đỉnh Thành Trì Trí Tuệ. Hãy nhấn nút bên dưới để kích hoạt Tâm Thạch!</p>
    </div>
   </div>
   <div class="mv-stats-3grid" style="margin:10px 0 18px">
    <div class="mv-stat-card"><b>${sealsCount}/5</b><small>Ấn Vectơ thu hồi</small></div>
    <div class="mv-stat-card"><b>${correctAns}/10</b><small>Câu giải mã đúng</small></div>
    <div class="mv-stat-card"><b>#${mineRank} (${me.score} XP)</b><small>Thứ hạng & Điểm XP</small></div>
   </div>
   <input id="finalCode" type="hidden" value="30524"/>
   <input type="radio" name="message" value="0" checked style="display:none"/>
   <button type="button" class="hs-confirm-btn" style="width:100%;padding:14px" data-action="final">
    KÍCH HOẠT TÂM THẠCH VECTƠ & HOÀN TẤT HÀNH TRÌNH
   </button>
  </div>
 </div>`;
}

function renderStudentProgressMetrics(me, mineRank){
 const lv = me.heroLevel ?? 1;
 const seals = (me.digits || []).length;
 const pct = Math.max(6, Math.min(100, Math.round((seals / 5) * 100)));
 return `<div class="hs-team-progress-row">
   <strong class="hs-seals-ratio">${seals}/5 ấn</strong>
   <div class="hs-progress-track" title="Đã thu hồi ${seals}/5 Ấn Vectơ">
    <div class="hs-progress-fill" style="width:${pct}%"></div>
   </div>
  </div>
  <div class="hs-xp-subline">
   <span>${(me.score || 0).toLocaleString('vi-VN')} XP  ·  Lv.${lv}</span>
   <button type="button" class="mv-link-btn" data-action="openFullLeaderboard">Hạng #${mineRank} &gt;</button>
  </div>`;
}

function studentScreen(){
 const me = world.me || {};
 const rank = [...(world.teams || [])].sort((a,b)=>b.score-a.score);
 const mineRank = Math.max(1, rank.findIndex(t=>t.id===me.id)+1);
 const activeBroadcast = (world.lastEvent||[]).find(e=>e.text.includes('📢'));
 const broadcastHtml = activeBroadcast ? `<div class="teacher-broadcast-bar">${esc(activeBroadcast.text)}</div>` : '';
 const curStageIdx = Math.min(4, Math.max(0, me.stage ?? 0));
 const stageBgUrl = STAGE_BG_ASSETS[curStageIdx] || STAGE_BG_ASSETS[0];
 const m = world.current || (world.stages && world.stages[curStageIdx]) || {};
 ensureVaStateForStage(m);
 const dragonText = vaState.dragonMsg || m.dragonIntro || 'Cùng nhau tìm đúng hướng của vectơ nhé!';

 return `<div class="hs-screen-shell" style="--stage-bg: url('${stageBgUrl}')">
  ${mapTrack(me.stage)}
  ${broadcastHtml}
  ${world.paused ? '<div class="notice error" style="margin:6px 0"><b>⏸ Giáo viên đang tạm dừng lượt thi. Vui lòng chờ hiệu lệnh tiếp tục!</b></div>' : ''}
  ${world.ended ? '<div class="notice good" style="margin:6px 0"><b>🏁 Giáo viên đã kết thúc lượt thi. Dưới đây là kết quả của đội!</b></div>' : ''}

  <div class="hs-workspace ${mvSidebarCollapsed ? 'sidebar-collapsed' : ''}">
   <div class="hs-left-col">
    ${me.completed ? `<div class="hs-main-frame" style="text-align:center;padding:32px 24px">
     <h2 style="color:#FFC953;font-size:26px;margin-bottom:8px">ĐỘI ${esc(me.name).toUpperCase()} ĐÃ KHÔI PHỤC TÂM THẠCH VECTƠ!</h2>
     <p style="font-size:17px;font-weight:800;color:#36DEF4;margin-bottom:18px">“TƯ DUY VÀ HỢP TÁC MỞ KHO BÁU”</p>
     <div class="mv-stats-3grid" style="max-width:560px;margin:0 auto">
      <div class="mv-stat-card"><b>${(me.digits||[]).length}/5</b><small>ẤN VECTƠ</small></div>
      <div class="mv-stat-card"><b>${me.score} XP</b><small>TỔNG ĐIỂM</small></div>
      <div class="mv-stat-card"><b>#${mineRank}</b><small>XẾP HẠNG LỚP</small></div>
     </div>
    </div>` : me.stage >= 5 ? finalContent() : stageContent(m)}
   </div>

   <!-- CỘT PHẢI: 3 WIDGET NHỎ GỌN CHUẨN BỐ CỤC THAM CHIẾU -->
   <aside class="hs-right-sidebar ${mvSidebarCollapsed ? 'hidden-sidebar' : ''}">
    <!-- WIDGET 1: TÚI ẤN VECTƠ -->
    <div class="hs-widget-card">
     <div class="hs-widget-title">TÚI ẤN VECTƠ</div>
     ${inv(me.digits)}
    </div>

    <!-- WIDGET 2: TIẾN TRÌNH ĐỘI -->
    <div class="hs-widget-card">
     <div class="hs-widget-title">TIẾN TRÌNH ĐỘI</div>
     <div id="studentSidebarMetrics">
      ${renderStudentProgressMetrics(me, mineRank)}
     </div>
    </div>

    <!-- WIDGET 3: RỒNG XANH ĐỒNG HÀNH -->
    <div class="hs-widget-card hs-dragon-widget">
     <div class="hs-widget-title">RỒNG XANH ĐỒNG HÀNH</div>
     <div class="hs-dragon-bubble" id="vaDragonSpeech">
      “${formatMath(dragonText)}”
     </div>
     <div class="hs-dragon-mascot-wrap">
      <img src="/assets/RongXanh.png" alt="Rồng Xanh" class="hs-dragon-art" draggable="false"/>
      <button type="button" class="hs-dragon-hint-btn" data-action="quickHint" title="Nhận gợi ý công thức từ Rồng Xanh">
       GỢI Ý TỪ RỒNG XANH
      </button>
     </div>
    </div>
   </aside>
  </div>
 </div>`;
}
/* ═══════════════════════════════════════════════════════════════════════════
   MAGICTOOLS GAME JUICE & PARTICLE SYSTEM (Inspired by magictools)
   ═══════════════════════════════════════════════════════════════════════════ */
(function() {
  window.spawnJuiceFloater = function(text, type = 'xp', x = null, y = null) {
    try {
      const el = document.createElement('div');
      el.className = 'game-juice-floater ' + type;
      el.textContent = text;
      
      const posX = (x !== null) ? x : (window.innerWidth / 2 + (Math.random() - 0.5) * 60);
      const posY = (y !== null) ? y : (window.innerHeight * 0.42 + (Math.random() - 0.5) * 40);
      
      el.style.left = posX + 'px';
      el.style.top = posY + 'px';
      
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1100);
    } catch (e) {
      console.warn('Juice floater error:', e);
    }
  };

  let pCanvas = null;
  let pCtx = null;
  let particles = [];
  let animId = null;

  function ensureCanvas() {
    if (!pCanvas) {
      pCanvas = document.getElementById('juiceParticleCanvas');
      if (!pCanvas) {
        pCanvas = document.createElement('canvas');
        pCanvas.id = 'juiceParticleCanvas';
        document.body.appendChild(pCanvas);
      }
      pCtx = pCanvas.getContext('2d');
      resize();
      window.addEventListener('resize', resize);
    }
  }

  function resize() {
    if (pCanvas) {
      pCanvas.width = window.innerWidth;
      pCanvas.height = window.innerHeight;
    }
  }

  window.spawnConfettiParticles = function(originX = null, originY = null, count = 55) {
    try {
      ensureCanvas();
      const x = (originX !== null) ? originX : (window.innerWidth / 2);
      const y = (originY !== null) ? originY : (window.innerHeight * 0.35);
      const colors = ['#f59e0b', '#38bdf8', '#4ade80', '#ec4899', '#a855f7', '#fbbf24', '#00f8ff', '#f43f5e'];

      for (let i = 0; i < count; i++) {
        const angle = (Math.random() * Math.PI * 2);
        const speed = Math.random() * 9 + 4;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 5,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          vr: (Math.random() - 0.5) * 14,
          shape: Math.random() > 0.4 ? 'rect' : 'circle',
          alpha: 1,
          life: 0,
          maxLife: 70 + Math.random() * 30
        });
      }

      if (!animId) loop();
    } catch (e) {
      console.warn('Particle error:', e);
    }
  };

  function loop() {
    if (!particles.length) {
      if (pCtx && pCanvas) pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      animId = null;
      return;
    }

    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.36; // gravity
      p.vx *= 0.98; // air drag
      p.rotation += p.vr;
      p.life++;

      if (p.life > p.maxLife * 0.6) {
        p.alpha -= 0.035;
      }

      if (p.alpha <= 0 || p.y > pCanvas.height + 25) {
        particles.splice(i, 1);
        continue;
      }

      pCtx.save();
      pCtx.translate(p.x, p.y);
      pCtx.rotate((p.rotation * Math.PI) / 180);
      pCtx.globalAlpha = Math.max(0, p.alpha);
      pCtx.fillStyle = p.color;

      if (p.shape === 'rect') {
        pCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      } else {
        pCtx.beginPath();
        pCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        pCtx.fill();
      }

      pCtx.restore();
    }

    animId = requestAnimationFrame(loop);
  }
})();

/* ═══════════════════════════════════════════════════════════════════════════
   ARWES DECRYPT / CIPHER TEXT ANIMATION ENGINE (Inspired by @arwes/text)
   ═══════════════════════════════════════════════════════════════════════════ */
const ARWES_GLYPHS = '0123456789ABCDEFΔΩΣλφψ⌘⚙⚡%#@&*+~';

function runArwesDecrypt(el, targetText, duration = 1100, onComplete = null) {
 if (!el) return;
 const text = targetText || el.getAttribute('data-text') || el.textContent || '';
 if (!text.trim()) return;
 const len = text.length;
 const startTime = performance.now();
 el.classList.add('arwes-decrypt-text');
 
 function update(now) {
  const elapsed = now - startTime;
  const progress = Math.min(1, elapsed / duration);
  const lockIndex = Math.floor(progress * len);
  
  let out = '';
  for (let i = 0; i < len; i++) {
   if (i < lockIndex) {
    out += text[i];
   } else if (text[i] === ' ' || text[i] === '\n') {
    out += text[i];
   } else {
    out += ARWES_GLYPHS[Math.floor(Math.random() * ARWES_GLYPHS.length)];
   }
  }
  
  el.textContent = out;
  if (Math.random() < 0.35) sound('cipher');
  
  if (progress < 1) {
   requestAnimationFrame(update);
  } else {
   el.textContent = text;
   if (onComplete) onComplete();
  }
 }
 requestAnimationFrame(update);
}

function render(){
 if(!session)return startScreen();
 if(!world){app.innerHTML='<div class="loading">Đang lấy dữ liệu phòng học…</div>';return;}
 const bodyHtml = session.role === 'teacher' ? teacherScreen() : session.role === 'display' ? displayScreen() : studentScreen();
 app.innerHTML=layout(bodyHtml);
 updateClock();
 updateHuntCamera();

 document.querySelectorAll('.arwes-decrypt-auto:not(.decrypted)').forEach(el => {
  el.classList.add('decrypted');
  const target = el.getAttribute('data-text') || el.textContent;
  runArwesDecrypt(el, target, 1100);
 });
 $('.award-backdrop')?.remove();
 if(showAward&&session.role==='teacher'){
  const aw=document.createElement('div');aw.innerHTML=awardScreen();document.body.appendChild(aw.firstElementChild);
 }
 if(modal)showModal();
}

function showModal(){
 if(!modal)return;
 const old=$('.modal-backdrop');if(old)old.remove();
 let good=modal.good;
 const el=document.createElement('div');
 el.className='modal-backdrop';
 el.innerHTML=`<div class="modal" role="dialog" aria-modal="true"><div class="modal-icon">${good?'🎉':'🧩'}</div><h2 class="${good?'success':'failure'}">${esc(modal.title)}</h2><p>${esc(modal.message)}</p>${modal.explain?`<p class="notice good">${esc(modal.explain)}</p>`:''}${modal.digit!==undefined&&modal.digit!==null?`<div class="reward">🔑 MẢNH MẬT MÃ CHẶNG: ${esc(modal.digit)}</div>`:''}${modal.points?`<div class="reward">⭐ +${modal.points} XP</div>`:''}${modal.goldEarned?`<div class="reward">🪙 +${modal.goldEarned} Vàng</div>`:''}${modal.streak>=2?`<div class="reward">🔥 Combo x${modal.streak}</div>`:''}${btn(modal.button||'Tiếp tục hành trình','closeModal',good?'teal block':'primary block')}</div>`;
 document.body.appendChild(el);
}
function notice(title,message,good=false,extra={}){modal={title,message,good,...extra};showModal();sound(good?'correct':'wrong');}
function triggerConfetti(duration=2600){
 const canvas=document.createElement('canvas');
 canvas.className='confetti-canvas';
 document.body.appendChild(canvas);
 const ctx=canvas.getContext('2d');
 const w=canvas.width=window.innerWidth, h=canvas.height=window.innerHeight;
 const colors=['#f59e0b','#ef4444','#10b981','#3b82f6','#a855f7','#ec4899','#facc15'];
 const pieces=Array.from({length:75},()=>({
  x:Math.random()*w,
  y:Math.random()*-h*0.5,
  w:Math.random()*10+6,
  h:Math.random()*6+4,
  color:colors[Math.floor(Math.random()*colors.length)],
  vx:(Math.random()-0.5)*3.5,
  vy:Math.random()*4+2.5,
  rot:Math.random()*360,
  vRot:(Math.random()-0.5)*12
 }));
 const start=performance.now();
 function anim(now){
  ctx.clearRect(0,0,w,h);
  pieces.forEach(p=>{
   p.x+=p.vx; p.y+=p.vy; p.rot+=p.vRot;
   ctx.save();
   ctx.translate(p.x,p.y);
   ctx.rotate(p.rot*Math.PI/180);
   ctx.fillStyle=p.color;
   ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
   ctx.restore();
  });
  if(now-start<duration){
   requestAnimationFrame(anim);
  }else{
   canvas.remove();
  }
 }
 requestAnimationFrame(anim);
}

function sound(type){
 if(!soundEnabled)return;
 try{
  const actx=new(window.AudioContext||window.webkitAudioContext)();
  const now=actx.currentTime;
  if(type==='bleep'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='sine';
   osc.frequency.setValueAtTime(1420, now);
   osc.frequency.exponentialRampToValueAtTime(980, now + 0.04);
   gain.gain.setValueAtTime(0.04, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.05);
   return;
  }else if(type==='cipher'){
   const freq = 800 + Math.random() * 1100;
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='triangle';
   osc.frequency.setValueAtTime(freq, now);
   gain.gain.setValueAtTime(0.02, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.028);
   return;
  }else if(type==='assemble'||type==='powerup'){
   [329.63, 440, 659.25, 880, 1318.51].forEach((freq, i)=>{
    const osc=actx.createOscillator(), gain=actx.createGain();
    osc.type='sine'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.0001, now + i*0.045);
    gain.gain.exponentialRampToValueAtTime(0.06, now + i*0.045 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i*0.045 + 0.2);
    osc.connect(gain).connect(actx.destination);
    osc.start(now + i*0.045); osc.stop(now + i*0.045 + 0.22);
   });
   return;
  }else if(type==='scan'){
   [880, 1760].forEach((freq, i)=>{
    const osc=actx.createOscillator(), gain=actx.createGain();
    osc.type='sine'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.03, now + i*0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i*0.035 + 0.06);
    osc.connect(gain).connect(actx.destination);
    osc.start(now + i*0.035); osc.stop(now + i*0.035 + 0.07);
   });
   return;
  }
  if(type===true||type==='correct'){
   [523.25, 659.25, 783.99, 1046.50].forEach((freq, i)=>{
    const osc=actx.createOscillator(), gain=actx.createGain();
    osc.type='triangle'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.0001, now + i*0.08);
    gain.gain.exponentialRampToValueAtTime(0.09, now + i*0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i*0.08 + 0.18);
    osc.connect(gain).connect(actx.destination);
    osc.start(now + i*0.08); osc.stop(now + i*0.08 + 0.2);
   });
  }else if(type==='laser'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='sawtooth';
   osc.frequency.setValueAtTime(880, now);
   osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
   gain.gain.setValueAtTime(0.12, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.36);
  }else if(type==='crystal'||type==='magic'){
   [523.25, 659.25, 783.99, 1046.50, 1567.98].forEach((freq, i)=>{
    const osc=actx.createOscillator(), gain=actx.createGain();
    osc.type='sine'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.0001, now + i*0.07);
    gain.gain.exponentialRampToValueAtTime(0.09, now + i*0.07 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i*0.07 + 0.28);
    osc.connect(gain).connect(actx.destination);
    osc.start(now + i*0.07); osc.stop(now + i*0.07 + 0.3);
   });
  }else if(type==='boss_roar'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='sawtooth';
   osc.frequency.setValueAtTime(160, now);
   osc.frequency.exponentialRampToValueAtTime(45, now + 0.55);
   gain.gain.setValueAtTime(0.14, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.56);
  }else if(type==='energy'||type==='shield'||type==='portal'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='triangle';
   osc.frequency.setValueAtTime(220, now);
   osc.frequency.linearRampToValueAtTime(440, now + 0.2);
   osc.frequency.linearRampToValueAtTime(330, now + 0.4);
   gain.gain.setValueAtTime(0.08, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.46);
  }else if(type==='win'||type==='fanfare'){
   [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i)=>{
    const osc=actx.createOscillator(), gain=actx.createGain();
    osc.type='triangle'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.0001, now + i*0.11);
    gain.gain.exponentialRampToValueAtTime(0.11, now + i*0.11 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i*0.11 + 0.32);
    osc.connect(gain).connect(actx.destination);
    osc.start(now + i*0.11); osc.stop(now + i*0.11 + 0.35);
   });
  }else if(type==='slash'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='triangle';
   osc.frequency.setValueAtTime(440, now);
   osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
   gain.gain.setValueAtTime(0.1, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.19);
  }else if(type==='coin'||type==='gem'){
   [880, 1318.51].forEach((freq, i)=>{
    const osc=actx.createOscillator(), gain=actx.createGain();
    osc.type='sine'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.0001, now + i*0.06);
    gain.gain.exponentialRampToValueAtTime(0.08, now + i*0.06 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i*0.06 + 0.18);
    osc.connect(gain).connect(actx.destination);
    osc.start(now + i*0.06); osc.stop(now + i*0.06 + 0.2);
   });
  }else if(type==='step'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='triangle';
   osc.frequency.setValueAtTime(140, now);
   osc.frequency.exponentialRampToValueAtTime(70, now + 0.05);
   gain.gain.setValueAtTime(0.025, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.06);
  }else if(type==='target'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='sine';
   osc.frequency.setValueAtTime(587.33, now);
   osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
   gain.gain.setValueAtTime(0.05, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.13);
  }else if(type==='boost'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='sawtooth';
   osc.frequency.setValueAtTime(260, now);
   osc.frequency.exponentialRampToValueAtTime(640, now + 0.2);
   gain.gain.setValueAtTime(0.06, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.22);
  }else if(type==='skill'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='sine';
   osc.frequency.setValueAtTime(320, now);
   osc.frequency.exponentialRampToValueAtTime(960, now + 0.25);
   gain.gain.setValueAtTime(0.08, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.26);
  }else{
   [220, 180].forEach((freq, i)=>{
    const osc=actx.createOscillator(), gain=actx.createGain();
    osc.type='sawtooth'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.07, now + i*0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i*0.1 + 0.12);
    osc.connect(gain).connect(actx.destination);
    osc.start(now + i*0.1); osc.stop(now + i*0.1 + 0.13);
   });
  }
  setTimeout(()=>actx.close(), 1200);
 }catch(e){}
}

function setClock(){clockBase=world?.clock||null;tickBase=Date.now();updateClock();}
function updateClock(){
 if(clockBase){
  const node=$('#clock');
  if(node){
   let remaining=clockBase.remainingMs-(clockBase.running?Date.now()-tickBase:0);
   remaining=Math.max(0,remaining);
   const sec=Math.floor(remaining/1000);
   node.textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;
   node.classList.toggle('warn',sec<=60);
  }
 }
 // Đồng hồ đếm ngược từng chặng (60s / 60s / 65s / 65s / 70s)
 if(session?.role==='student' && world?.current && !world.paused && (world.me?.stage ?? 0) < 5){
  const elapsedSec = Math.floor((Date.now() - vaState.stageStartedAt) / 1000);
  const remSec = Math.max(0, vaState.stageDurationSec - elapsedSec);
  const stNode = $('#vaStageSecText');
  const pillNode = $('#vaStageTimerPill');
  if(stNode) stNode.textContent = formatMMSS(remSec);
  if(pillNode) pillNode.classList.toggle('urgent', remSec <= 15);
  // Khi còn <= 15 giây: Rồng Xanh tự động đưa gợi ý (không lộ đáp án CB ở Chặng 1)
  if(remSec === 15 && vaState.dragonMood !== 'hint' && !vaState.s1BridgeRestoredOverlay){
   vaState.dragonMood = 'hint';
   const m = world.current;
   if (m.id === 1) {
    vaState.dragonMsg = m.round === 0
     ? '💡 Gợi ý nhanh: Hãy nhấn vào đủ 3 cột đá cổ A, B, C đang phát sáng trong Rừng Vectơ!'
     : m.round === 1
       ? '💡 Gợi ý nhanh: Hãy ghép biểu thức hiệu hai vectơ chung gốc A: vectơ AB trừ vectơ AC!'
       : '💡 Gợi ý nhanh: Quy tắc hiệu hai vectơ chung gốc A: Mũi tên bắt đầu từ điểm cuối của vectơ AC và kết thúc tại điểm cuối của vectơ AB!';
   } else {
    vaState.dragonMsg = '💡 Gợi ý nhanh: ' + (m.visual3D?.formula || m.dragonIntro);
   }
   const sp = $('#vaDragonSpeech');
   if(sp) sp.innerHTML = formatMath(vaState.dragonMsg);
  }
  // Khi hết thời gian chặng (0s): tự động ghi nhận và chuyển sang chặng tiếp theo
  if(remSec <= 0 && !vaState.stageTimeoutTriggered && !vaState.s1BridgeRestoredOverlay && !busy){
   vaState.stageTimeoutTriggered = true;
   submit('/api/stageTimeout', {}).then(() => updateAfterAction()).catch(() => {});
  }
 }
}

async function refresh(force=false){
 if(!session||busy||vaState.s1BridgeRestoredOverlay||StageTransitionController.isTransitioning())return;
 try{
  const d=await api('/api/state',{room:session.room,token:session.token});
  world=d;setClock();
  // Đồng bộ vị trí Rồng Xanh cho tất cả thành viên cùng đội & khi tải lại trang (F5)
  if(session.role==='student'&&d.me){
   const curSrvStage = Math.max(0, Math.min(5, d.me.stage ?? 0));
   if(lastSyncedTeamStage === null){
    lastSyncedTeamStage = curSrvStage;
    DragonMovementController.snapToStage(curSrvStage, 'IDLE');
   }else if(curSrvStage > lastSyncedTeamStage && !StageTransitionController.isTransitioning()){
    const prevStg = lastSyncedTeamStage;
    lastSyncedTeamStage = curSrvStage;
    StageTransitionController.beginStageTransition(prevStg, curSrvStage, {
     sealName: WORLD_STAGE_NODES[prevStg]?.sealName || ('Ấn Chặng ' + (prevStg + 1)),
     points: 10,
     goldEarned: 50
    });
    return;
   }else{
    lastSyncedTeamStage = curSrvStage;
   }
  }
  if(session.role==='student'&&!force){
   const me=d.me||{};
   const studentKey=`${me.stage}_${me.round}_${me.completed}_${d.paused}`;
   if(studentKey===lastStudentKey){
    const ranksEl=$('#studentSidebarRanks');
    if(ranksEl)ranksEl.innerHTML=standings(d.teams,true);
    const rank=[...d.teams].sort((a,b)=>b.score-a.score),mineRank=rank.findIndex(t=>t.id===me.id)+1;
    const metricsEl=$('#studentSidebarMetrics');
    if(metricsEl)metricsEl.innerHTML=renderStudentProgressMetrics(me, mineRank);
    return;
   }
   lastStudentKey=studentKey;
  }
  if(session.role==='student'&&d.me){
   lastStudentKey=`${d.me.stage}_${d.me.round}_${d.me.completed}_${d.paused}`;
  }
  let slim={...d,clock:{...d.clock,remainingMs:0}};
  const sig=JSON.stringify(slim);
  if(force||sig!==lastSignature){
   lastSignature=sig;
   const focused=document.activeElement?.matches('input,select,textarea');
   if(modal||focused||huntState.battleOpen)return;
   render();
  }
 }catch(e){
  if(force){session=null;world=null;startScreen(e.message);}
 }
}

async function submit(route,payload){
 if(busy)return;
 busy=true;
 try{return await api(route,{room:session.room,token:session.token,...payload});}
 finally{busy=false;}
}
function updateAfterAction(){lastSignature='';lastStudentKey='';setTimeout(()=>refresh(true),150);}

async function submitStageAnswer(payload){
 if(world.paused)return notice('Tạm dừng','Giáo viên đang tạm dừng nhiệm vụ.',false);
 const m = world.current;
 const prevStageIdx = Math.max(0, Math.min(4, world.me?.stage ?? ((m?.id || 1) - 1)));
 const result = await submit('/api/answer',{stage:world.me.stage,round:world.me.round,...payload});
 if(!result) return null;

 if(result.correct){
  if(window.spawnJuiceFloater){
   window.spawnJuiceFloater('+' + (result.points || 10) + ' XP ⭐', 'xp');
   if(result.keyBadge) window.spawnJuiceFloater('🔑 ' + result.keyBadge, 'gold');
  }
  if(result.stageFinished){
   sound('win');
   triggerConfetti(2600);
   if(window.spawnConfettiParticles){
    window.spawnConfettiParticles(window.innerWidth / 2, window.innerHeight * 0.35, 60);
   }
   const nextStageIdx = Math.max(1, Math.min(5, result.nextStage ?? (prevStageIdx + 1)));
   if(world.me){
    world.me.stage = nextStageIdx;
    world.me.round = 0;
   }
   // Kích hoạt Rồng Xanh di chuyển thực sự trên bản đồ 5 chặng (CELEBRATE -> RUN -> FLY -> LAND -> TALK -> UNLOCK)
   StageTransitionController.beginStageTransition(prevStageIdx, nextStageIdx, {
    sealName: result.item || m?.item || ('Ấn Chặng ' + (prevStageIdx + 1)),
    points: result.points || 10,
    goldEarned: result.goldEarned || 50
   });
   return result;
  }
  sound('correct');
  updateAfterAction();
  return result;
 }else{
  sound('wrong');
  updateAfterAction();
  return result;
 }
}

async function submitCipherNotebook(){
 const m=world?.current;
 if(!m)return;
 const word=cipherState.slots.join('').toUpperCase();
 if(word.length<5){
  cipherState.error='Vui lòng điền đủ 5 ký tự vào 5 ô mật mã.';
  render();
  return;
 }
 cipherState.solving=true;
 cipherState.error=null;
 render();
 try{
  const res=await submit('/api/cipher',{cipher:word});
  if(res.correct){
   sound('crystal');
   sound('win');
   triggerConfetti(3500);
   cipherState.successMsg=res.message||'GIẢI MÃ THÀNH CÔNG!';
   cipherState.error=null;
   render();
   setTimeout(()=>{
    cipherState.open=false;
    cipherState.slots=[null,null,null,null,null];
    cipherState.successMsg=null;
    if(res.bossReady){
     world.me.bossReady=true;
     notice('🛡️ LÁ CHẮN THÀNH TRÌ ĐÃ KÍCH HOẠT!','Đại Boss Bóng Đen Lãng Quên đang tiến vào! Hãy tiến lên phía trên để nghênh chiến!',true,{button:'Tiến lên nghênh chiến!'});
    }else if(res.stageFinished){
     notice('🏆 KHAI MỞ PHONG ẤN THÀNH CÔNG!',`Đội đã mở khóa ${m.place}! Nhận mảnh số mật mã "${res.digit}" (${res.digitRule})`,true,{digit:res.digit,points:res.points,button:res.nextStage===5?'Tiến tới Mở Rương Lõi Trí Tuệ →':'Bước sang Chặng tiếp theo →'});
    }
    updateAfterAction();
   },1200);
  }else{
   sound('wrong');
   cipherState.error=res.hint||'Mật mã chưa chính xác. Hãy sắp xếp lại các ký tự theo gợi ý!';
   cipherState.solving=false;
   render();
  }
 }catch(err){
  sound('wrong');
  cipherState.error=err.message||'Lỗi khi gửi mật mã. Hãy thử lại.';
  cipherState.solving=false;
  render();
 }
}

async function handle(action,el){
 try{
  if(action==='toggleFullscreen'){
   if(!document.fullscreenElement){document.documentElement.requestFullscreen?.();}
   else{document.exitFullscreen?.();}
   return;
  }
  if(action==='rot3D'){
   const dir=el.dataset.dir;
   if(dir==='left')oxyz3D.yaw=(oxyz3D.yaw-18)%360;
   else if(dir==='right')oxyz3D.yaw=(oxyz3D.yaw+18)%360;
   else if(dir==='pitch')oxyz3D.pitch=oxyz3D.pitch===24?42:oxyz3D.pitch===42?10:24;
   render();
   return;
  }
  if(action==='toggle3DProj'){oxyz3D.showProj=!oxyz3D.showProj;render();return;}
  if(action==='toggle3DPanel'){oxyz3D.open=!oxyz3D.open;render();return;}
  /* ─── ACTIONS CHO CHẶNG 1: BÍ MẬT CÂY CẦU ĐẢO CHIỀU ─── */
  if(action==='s1ClickPillar'){
   const pid=el.dataset.pillar;
   if(pid && ['A','B','C'].includes(pid)){
    const wasNew=!vaState.pillars.has(pid);
    vaState.pillars.add(pid);
    sound('crystal');
    if(wasNew && window.spawnJuiceFloater){
     window.spawnJuiceFloater(`📜 Mảnh mật thư ${vaState.pillars.size}/3`, 'gold');
    }
    if(session?.room && session?.token){
     api('/api/stage1Progress',{room:session.room,token:session.token,pillar:pid}).catch(()=>{});
    }
    if(vaState.pillars.size>=3){
     vaState.dragonMsg='Tuyệt vời! Đội đã thu thập đủ 3/3 mảnh mật thư từ cột đá A, B, C! Hãy nhấn "Mở bảng giải mã mật thư"!';
     vaState.dragonMood='win';
    }else{
     vaState.dragonMsg=`Đã mở phong ấn Cột đá ${pid} (${vaState.pillars.size}/3 mảnh mật thư). Hãy tìm tiếp cột đá còn lại!`;
    }
    render();
   }
   return;
  }
  if(action==='s1FinishStep1'){
   if(vaState.pillars.size<3){
    vaState.dragonMsg='Hãy nhấn mở đủ 3 cột đá A, B, C để thu thập đủ 3/3 mảnh mật thư trước nhé!';
    render();
    return;
   }
   sound('powerup');
   const res=await submit('/api/answer',{stage:0,round:0,choice:0,interactiveDone:true});
   if(res && res.correct){
    if(window.spawnJuiceFloater) window.spawnJuiceFloater('+' + (res.points || 10) + ' XP ⭐', 'xp');
    vaState.dragonMsg='Đã mở Bảng giải mã mật thư! Hãy kéo hoặc nhấn các mảnh để ghép biểu thức hiệu hai vectơ!';
    vaState.dragonMood='win';
    updateAfterAction();
   }
   return;
  }
  if(action==='s1PlaceCipherToken'){
   const tok=el.dataset.token;
   const emptyIdx=vaState.s1CipherSlots.indexOf(null);
   if(tok && emptyIdx!==-1 && !vaState.s1CipherSlots.includes(tok)){
    vaState.s1CipherSlots[emptyIdx]=tok;
    vaState.s1Feedback=null;
    sound('step');
    render();
   }
   return;
  }
  if(action==='s1RemoveCipherSlot'){
   const idx=Number(el.dataset.slot);
   if(!isNaN(idx) && idx>=0 && idx<3){
    vaState.s1CipherSlots[idx]=null;
    vaState.s1Feedback=null;
    sound('step');
    render();
   }
   return;
  }
  if(action==='s1ResetCipher'){
   vaState.s1CipherSlots=[null,null,null];
   vaState.s1Feedback=null;
   sound('step');
   render();
   return;
  }
  if(action==='s1SubmitCipher'){
   const filled=vaState.s1CipherSlots.filter(Boolean);
   if(filled.length<3){
    vaState.s1Feedback={text:'Hãy đặt đủ 3 mảnh mật thư vào 3 ô trống trước khi giải mã!',good:false};
    render();
    return;
   }
   const expr=filled.join('');
   const res=await submit('/api/answer',{stage:0,round:1,cipherOrder:expr,choice:expr==='AB-AC'?0:1});
   if(res && res.correct){
    sound('assemble');
    if(window.spawnJuiceFloater){
     window.spawnJuiceFloater('+' + (res.points || 10) + ' XP ⭐', 'xp');
     window.spawnJuiceFloater('📜 Đã ghép mật thư!', 'gold');
    }
    vaState.s1Feedback=null;
    vaState.dragonMsg='Chính xác! Biểu thức bí mật là vectơ AB − vectơ AC = ? Bây giờ hãy kéo mũi tên trên tam giác ABC để xác định hướng vectơ!';
    vaState.dragonMood='win';
    updateAfterAction();
   }else{
    sound('wrong');
    const hintMsg=res?.hint||'Thứ tự chưa đúng! Hãy ghép thành biểu thức hiệu hai vectơ xuất phát từ điểm A: vectơ AB trừ vectơ AC.';
    vaState.s1Feedback={text:hintMsg,good:false};
    vaState.dragonMsg='Chưa khớp mật thư! ' + hintMsg;
    vaState.dragonMood='hint';
    render();
   }
   return;
  }
  if(action==='s1ClickVertex'){
   const pt=el.dataset.pt;
   if(!pt || !['A','B','C'].includes(pt))return;
   if(!vaState.s1ArrowFrom || (vaState.s1ArrowFrom && vaState.s1ArrowTo)){
    vaState.s1ArrowFrom=pt;
    vaState.s1ArrowTo=null;
    vaState.s1Feedback=null;
    sound('step');
    vaState.dragonMsg=`Đã chọn điểm bắt đầu ${pt}. Hãy nhấn hoặc kéo tới điểm kết thúc của vectơ!`;
    render();
   }else if(vaState.s1ArrowFrom !== pt){
    vaState.s1ArrowTo=pt;
    vaState.s1Feedback=null;
    sound('target');
    vaState.dragonMsg=`Đã tạo mũi tên từ ${vaState.s1ArrowFrom} đến ${pt}. Nhấn "Kích hoạt vectơ & Mở cầu" để giải mã!`;
    render();
   }
   return;
  }
  if(action==='s1ResetArrow'){
   vaState.s1ArrowFrom=null;
   vaState.s1ArrowTo=null;
   vaState.s1Feedback=null;
   sound('step');
   render();
   return;
  }
  if(action==='s1SubmitVectorArrow'){
   const from=vaState.s1ArrowFrom;
   const to=vaState.s1ArrowTo;
   if(!from || !to || from===to)return;
   const res=await submit('/api/answer',{stage:0,round:2,vectorFrom:from,vectorTo:to});
   if(res && res.correct){
    sound('win');
    triggerConfetti(2800);
    if(window.spawnConfettiParticles){
     window.spawnConfettiParticles(window.innerWidth / 2, window.innerHeight * 0.35, 65);
    }
    if(window.spawnJuiceFloater){
     window.spawnJuiceFloater('+' + (res.points || 10) + ' XP ⭐', 'xp');
     window.spawnJuiceFloater('🧭 Nhận Ấn Hướng Đi!', 'gold');
    }
    if(world?.me){
     world.me.stage = 1;
     world.me.round = 0;
    }
    lastSyncedTeamStage = 1;
    vaState.s1Feedback=null;
    vaState.s1BridgeRestoredOverlay=true;
    vaState.dragonMsg='Tuyệt vời! Ba cột đá A, B, C và mũi tên CB đã phát sáng! Cây cầu năng lượng qua Rừng Vectơ đã khôi phục, đội nhận Ấn Hướng Đi!';
    vaState.dragonMood='win';
    render();
    if(vaState.s1BridgeTimer) clearTimeout(vaState.s1BridgeTimer);
    vaState.s1BridgeTimer=setTimeout(()=>{
     if(vaState.s1BridgeRestoredOverlay){
      vaState.s1BridgeRestoredOverlay=false;
      StageTransitionController.beginStageTransition(0, 1, {
       sealName: 'Ấn Hướng Đi',
       points: res.points || 10,
       goldEarned: res.goldEarned || 140
      });
     }
    }, 1500);
   }else{
    sound('wrong');
    const errText=res?.hint||'Hướng vectơ chưa đúng! Quy tắc hiệu hai vectơ chung gốc A: mũi tên phải đi từ điểm cuối của vectơ thứ hai đến điểm cuối của vectơ thứ nhất. Hãy thử lại!';
    vaState.s1Feedback={text:errText,good:false};
    vaState.dragonMsg=errText;
    vaState.dragonMood='hint';
    vaState.s1ArrowFrom=null;
    vaState.s1ArrowTo=null;
    render();
   }
   return;
  }
  if(action==='s1ProceedToStage2'){
   if(vaState.s1BridgeTimer) clearTimeout(vaState.s1BridgeTimer);
   vaState.s1BridgeRestoredOverlay=false;
   StageTransitionController.beginStageTransition(0, 1, {
    sealName: 'Ấn Hướng Đi',
    points: 10,
    goldEarned: 140
   });
   return;
  }
  if(action==='vaClickPillar'){
   const node=el.dataset.node;
   if(node)vaState.pillars.add(node);
   if(vaState.pillars.size>=3){
    vaState.dragonMsg='Ba cột mốc A, B, C đã phát sáng! Hãy nhấn nút Xác nhận khám phá để nhận Mảnh chìa khóa 1/3!';
    vaState.dragonMood='win';
   }else{
    vaState.dragonMsg=`Đã kích hoạt cột mốc ${Array.from(vaState.pillars).join(', ')} (${vaState.pillars.size}/3). Hãy kích hoạt đủ 3 cột mốc!`;
   }
   render();
   return;
  }
  if(action==='vaClickPath'){
   const p=el.dataset.path;
   if(p)vaState.paths.add(p);
   if(vaState.paths.has('AB') && vaState.paths.has('BC')){
    vaState.dragonMsg='Hai luồng sáng AB và BC đã nối tiếp nhau! Nhấn Xác nhận để nhận Mảnh chìa khóa 1/3!';
    vaState.dragonMood='win';
   }else{
    vaState.dragonMsg='Đã kích hoạt đoạn ' + p + '. Hãy kích hoạt tiếp đoạn đường còn lại!';
   }
   render();
   return;
  }
  if(action==='vaClickPara'){
   const e=el.dataset.edge;
   if(e)vaState.paraEdges.add(e);
   if(vaState.paraEdges.has('AB') && vaState.paraEdges.has('AD')){
    vaState.dragonMsg='Hai vectơ cạnh AB và AD cùng xuất phát từ A đã phát sáng! Nhấn Xác nhận để nhận Mảnh chìa khóa 1/3!';
    vaState.dragonMood='win';
   }else{
    vaState.dragonMsg='Đã kích hoạt vectơ cạnh ' + e + '. Hãy kích hoạt tiếp vectơ cạnh còn lại xuất phát từ A!';
   }
   render();
   return;
  }
  if(action==='vaSetMidpoint'){
   vaState.midpointPct=Number(el.dataset.pct||50);
   vaState.dragonMsg='Viên pha lê I đã ở đúng Trung điểm AB (IA = IB, ngược hướng)! Nhấn Xác nhận để nhận Mảnh chìa khóa 1/3!';
   vaState.dragonMood='win';
   render();
   return;
  }
  if(action==='vaClickCentroid'){
   const pt=el.dataset.pt;
   vaState.centroidSelected=pt;
   if(pt==='G'){
    vaState.dragonMsg='Chính xác! Trọng tâm G là giao điểm 3 trung tuyến, 3 luồng năng lượng GA, GB, GC đã tỏa ra!';
    vaState.dragonMood='win';
   }else{
    vaState.dragonMsg='Điểm I là trung điểm cạnh BC. Hãy chọn giao điểm G của cả 3 đường trung tuyến!';
    vaState.dragonMood='hint';
   }
   render();
   return;
  }
  if(action==='vaSelectChoice'){
   vaState.selectedChoice=Number(el.dataset.choice);
   render();
   return;
  }
  if(action==='vaSubmitCurrentPart'){
   const m=world?.current;if(!m)return;
   const r=m.round||0;
   if(r===0){
    // Auto-complete interactive nodes if student clicks confirm directly, or verify
    vaState.pillars=new Set(['A','B','C']);
    vaState.paths=new Set(['AB','BC']);
    vaState.paraEdges=new Set(['AB','AD']);
    vaState.midpointPct=50;
    vaState.centroidSelected='G';
    const res=await submitStageAnswer({choice:0,interactiveDone:true});
    if(res&&res.correct){
     vaState.dragonMsg=res.explain||'Đã nhận Mảnh chìa khóa 1/3! Hãy bước vào câu hỏi giải mã đầu tiên!';
     vaState.dragonMood='win';
    }
    return;
   }
   if(vaState.selectedChoice===null)return;
   const res=await submitStageAnswer({choice:vaState.selectedChoice});
   if(res){
    if(res.correct){
     vaState.dragonMsg=res.stageFinished ? (m.dragonWin || res.explain) : ('Chính xác! ' + (res.explain || ''));
     vaState.dragonMood='win';
    }else{
     vaState.dragonMsg='Chưa đúng rồi! Gợi ý: ' + (res.hint || 'Hãy kiểm tra lại điểm đầu và điểm cuối của vectơ!');
     vaState.dragonMood='hint';
    }
    render();
   }
   return;
  }
  if(action==='toggleWorldMap'){
   mvWorldMapOpen=!mvWorldMapOpen;
   mvShowIntroHub=false;
   if(!StageTransitionController.isTransitioning()){
    DragonMovementController.snapToStage(world?.me?.stage ?? 0, 'IDLE');
   }
   render();
   return;
  }
  if(action==='advStartCurrentMission'){
   StageTransitionController.clearAllTimers();
   StageTransitionController.state='PLAYING';
   StageTransitionController.rewardTag='';
   mvWorldMapOpen=false;
   mvShowIntroHub=false;
   DragonMovementController.snapToStage(world?.me?.stage ?? 0, 'IDLE');
   await refresh(true);
   return;
  }
  if(action==='advTriggerDragonMove'){
   const curStg = Math.max(0, Math.min(5, world?.me?.stage ?? 0));
   const fromIdx = curStg > 0 ? (curStg - 1) : 0;
   const toIdx = curStg > 0 ? curStg : 1;
   StageTransitionController.beginStageTransition(fromIdx, toIdx, {
    sealName: WORLD_STAGE_NODES[fromIdx]?.sealName || ('Ấn Chặng ' + (fromIdx + 1)),
    points: 10,
    goldEarned: 50
   }, { stayOnMap: curStg === 0 });
   return;
  }
  if(action==='advClickIsland'||action==='advClickTopStageCard'){
   const targetStg = Math.max(0, Math.min(5, Number(el.dataset.stage || 0)));
   const curStg = Math.max(0, Math.min(5, world?.me?.stage ?? 0));
   mvShowIntroHub=false;
   if(vaState.s1BridgeTimer) clearTimeout(vaState.s1BridgeTimer);
   vaState.s1BridgeRestoredOverlay=false;
   vaState.stageId=-1;
   if(targetStg === curStg){
    mvWorldMapOpen = !mvWorldMapOpen;
    DragonMovementController.snapToStage(curStg, 'IDLE');
    render();
    return;
   }
   await submit('/api/demoJump',{stage:Math.min(4, targetStg)});
   lastSyncedTeamStage = Math.min(4, targetStg);
   const fromStg = Math.max(0, Math.min(4, targetStg > 0 ? targetStg - 1 : 0));
   const toStg = Math.max(1, Math.min(5, targetStg > 0 ? targetStg : 1));
   if(targetStg > 0){
    StageTransitionController.beginStageTransition(fromStg, toStg, {
     sealName: WORLD_STAGE_NODES[fromStg]?.sealName || ('Ấn Chặng ' + (fromStg + 1)),
     points: 10,
     goldEarned: 50
    });
   }else{
    StageTransitionController.clearAllTimers();
    StageTransitionController.state='PLAYING';
    mvWorldMapOpen=false;
    DragonMovementController.snapToStage(0, 'IDLE');
    await refresh(true);
   }
   return;
  }
  if(action==='toggleIntroHub'){
   mvWorldMapOpen=!mvWorldMapOpen;
   mvShowIntroHub=false;
   if(!StageTransitionController.isTransitioning()){
    DragonMovementController.snapToStage(world?.me?.stage ?? 0, 'IDLE');
   }
   render();
   return;
  }
  if(action==='hubStartCurrentStage'){mvWorldMapOpen=false;mvShowIntroHub=false;render();return;}
  if(action==='hubOpenKnowledge'){mvWorldMapOpen=false;mvShowIntroHub=false;oxyz3D.open=true;render();return;}
  if(action==='hubEnterStage'){
   const stg=Number(el.dataset.stage||0);
   mvShowIntroHub=false;
   mvWorldMapOpen=false;
   if(vaState.s1BridgeTimer) clearTimeout(vaState.s1BridgeTimer);
   vaState.s1BridgeRestoredOverlay=false;
   vaState.stageId=-1;
   await submit('/api/demoJump',{stage:stg});
   lastSyncedTeamStage = stg;
   DragonMovementController.snapToStage(stg, 'IDLE');
   await refresh(true);
   return;
  }
  if(action==='toggleBriefing'){mvBriefingCollapsed=!mvBriefingCollapsed;render();return;}
  if(action==='toggleSidebar'){
   mvSidebarCollapsed=!mvSidebarCollapsed;
   render();
   return;
  }
  if(action==='openSettingsModal'){
   const old=$('.modal-backdrop');if(old)old.remove();
   const elModal=document.createElement('div');
   elModal.className='modal-backdrop';
   elModal.innerHTML=`<div class="modal" style="max-width:440px;color:#1e293b" role="dialog" aria-modal="true">
    <div class="flex-between" style="margin-bottom:14px">
     <h2>⚙️ Cài đặt & Điều khiển</h2>
     <button type="button" class="button sm gray" data-action="closeModal">✕</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px">
     <button type="button" class="button primary block" data-action="toggleSound">${soundEnabled ? '🔊 Âm thanh: Đang Bật (Nhấn để Tắt)' : '🔇 Âm thanh: Đang Tắt (Nhấn để Bật)'}</button>
     <button type="button" class="button teal block" data-action="toggleFullscreen">⛶ Bật / Tắt Toàn màn hình</button>
     <button type="button" class="button gold block" data-action="toggleSidebar">${mvSidebarCollapsed ? '⇤ Hiện thanh bên (Sidebar)' : '⇥ Ẩn thanh bên (Sidebar)'}</button>
     ${session ? `<button type="button" class="button gray block" data-action="home">⌂ Đổi màn hình / Đăng nhập lại</button>` : ''}
    </div>
   </div>`;
   document.body.appendChild(elModal);
   return;
  }
  if(action==='startPlayStage'){
   mvBriefingCollapsed=true;
   const m=world?.current;
   if(m && m.id===1){
    const st=m.huntMap?.stations?.[m.round];
    if(st){
     const d=Math.hypot(st.x-huntState.x, st.y-huntState.y);
     if(d<=10.5){
      huntState.battleOpen=true;huntState.selectedChoice=null;huntState.shortText='';huntState.monsterDefeated=false;huntState.rewardBadge=null;
     }else{
      huntState.targetX=st.x;huntState.targetY=st.y;huntState.lastAutoStation=-1;
      sound('boost');
     }
    }
   }
   render();
   return;
  }
  if(action==='scrollTop'){
   window.scrollTo({top:0,behavior:'smooth'});
   return;
  }
  if(action==='openFullLeaderboard'){
   if(!world?.teams)return;
   const old=$('.modal-backdrop');if(old)old.remove();
   const elModal=document.createElement('div');
   elModal.className='modal-backdrop';
   elModal.innerHTML=`<div class="modal" style="max-width:780px;color:#1e293b" role="dialog" aria-modal="true">
    <div class="flex-between" style="margin-bottom:12px">
     <h2>🏆 Bảng Xếp Hạng Đầy Đủ Các Đội</h2>
     <button type="button" class="button sm gray" data-action="closeModal">✕ Đóng</button>
    </div>
    ${standings(world.teams, false)}
   </div>`;
   document.body.appendChild(elModal);
   return;
  }
  if(action==='quickHint'){
   const m=world?.current;
   const hintText=m?.challenge?.hint || m?.visual3D?.formula || 'Hãy mở Mô hình 3D Oxyz để quan sát tọa độ điểm và áp dụng công thức vectơ trong không gian!';
   notice('💡 GỢI Ý CHIẾN THUẬT TOÁN 12 OXYZ', hintText, true, {button:'Đã hiểu, tiếp tục chiến đấu!'});
   return;
  }

  if(action==='demoPlay'){saveSession({role:'student',room:'123456',teamId:'doi-1',token:'DEMO_DOI_1'});activePlayMode=null;await refresh(true);return;}
  if(action==='demoTeacher'){saveSession({role:'teacher',room:'123456',token:'DEMO_GV'});await refresh(true);return;}
  if(action==='demoJumpStage'){
   mvShowIntroHub=false;
   mvWorldMapOpen=false;
   StageTransitionController.clearAllTimers();
   StageTransitionController.state='PLAYING';
   if(vaState.s1BridgeTimer) clearTimeout(vaState.s1BridgeTimer);
   vaState.s1BridgeRestoredOverlay=false;
   vaState.stageId=-1;
   const stg=Number(el.dataset.stage);
   lastSyncedTeamStage=stg;
   DragonMovementController.snapToStage(stg, 'IDLE');
   await submit('/api/demoJump',{stage:stg});
   activePlayMode=null;
   huntState.battleOpen=false;
   huntState.stageId=-1;
   cdState.stageId=-1;
   cdState.roundId=-1;
   zdState.shooting=false;zdState.hitLane=null;zdState.hintMsg=null;zdState.rewardMsg=null;
   mazeState.x=0;mazeState.y=0;mazeState.walking=false;mazeState.toastMsg=null;mazeState.hintMsg=null;
   msState.posX=50;msState.posY=82;msState.walking=false;msState.wobble=false;msState.shaking=false;msState.blastX=null;msState.explodedMines=[];msState.hintMsg=null;
   cipherState.open=false;cipherState.slots=[null,null,null,null,null];cipherState.error=null;
   await refresh(true);
   return;
  }
  if(action==='toggleSound'){soundEnabled=!soundEnabled;render();return;}
  if(action==='switch-tab'){$('.tabs .active')?.classList.remove('active');el.classList.add('active');$('[data-tabbox="'+el.dataset.tab+'"]')?.scrollIntoView({behavior:'smooth',block:'center'});return;}
  if(action==='create'){el.disabled=true;const count=Number($('#teamCount').value);const r=await api('/api/create',{teamCount:count});saveSession({role:'teacher',room:r.room,token:r.teacherToken});await refresh(true);return;}
  if(action==='join'){el.disabled=true;const room=$('#roomInput').value.trim(),team=$('#teamSelect').value,code=$('#teamCode').value.trim();const r=await api('/api/join',{room,team,code});saveSession({role:'student',room:r.room,teamId:r.team,token:r.token});await refresh(true);return;}
  if(action==='home'){const yes=confirm('Quay về màn hình đăng nhập? Tiến độ của đội vẫn được lưu an toàn.');if(yes){session=null;world=null;history.replaceState({},'',location.pathname);startScreen();}return;}
  if(action==='setMode'){
   activePlayMode=el.dataset.mode;
   huntState.battleOpen=false;
   render();
   return;
  }
  /* ─── ACTIONS CHO SĂN KHO BÁU 2D ─── */
  if(action==='toggleSprint'){
   huntState.isSprinting=!huntState.isSprinting;
   if(huntState.isSprinting)sound('boost');
   updateHuntCamera();
   const btn=$('.hw-sprint-btn');
   if(btn){
    btn.classList.toggle('active',huntState.isSprinting);
    btn.innerHTML=`⚡ ${huntState.isSprinting?'ĐANG CHẠY NHANH':'TĂNG TỐC'}`;
   }
   return;
  }
  if(action==='autoRunToStation'){
   const m=world?.current;if(!m)return;
   const st=m.huntMap?.stations?.[m.round];
   if(!st)return;
   const d=Math.hypot(st.x-huntState.x, st.y-huntState.y);
   if(d<=10){
    huntState.battleOpen=true;huntState.selectedChoice=null;huntState.shortText='';huntState.monsterDefeated=false;huntState.rewardBadge=null;
    render();
   }else{
    huntState.targetX=st.x;huntState.targetY=st.y;huntState.lastAutoStation=-1;
    sound('boost');
   }
   return;
  }
  if(action==='walkToStation'||action==='clickStation'){
   const idx=Number(el.dataset.idx);
   const m=world?.current;if(!m)return;
   const st=m.huntMap?.stations?.[idx];
   if(!st)return;
   if(idx>m.round){
    return notice('🔒 Trạm đang khóa',`Hãy vượt qua Trạm ${m.round+1} trước khi tiến tới Trạm ${idx+1}!`,false);
   }
   if(idx<m.round){
    return notice('✅ Trạm đã hoàn thành',`Đội đã thu hồi chìa khóa ở Trạm ${idx+1} rồi. Hãy tiến tới Trạm ${m.round+1}!`,true);
   }
   const d=Math.hypot(st.x-huntState.x, st.y-huntState.y);
   if(d<=12){
    huntState.battleOpen=true;huntState.selectedChoice=null;huntState.shortText='';huntState.monsterDefeated=false;huntState.rewardBadge=null;
    render();
    return;
   }
   huntState.targetX=st.x;
   huntState.targetY=st.y;
   huntState.lastAutoStation=-1;
   return;
  }
  if(action==='clickChest'){
   const m=world?.current;if(!m)return;
   if(m.round<3){
    return notice('🧰 Rương đang khóa','Hãy tự điều khiển nhân vật tìm và vượt qua đủ 3 Đền thờ trên bản đồ để mở Rương Mật Mã!',false);
   }
   return;
  }
  if(action==='openHuntBattle'){
   const m=world?.current;if(!m)return;
   if(m.id === 1){
    const st=m.huntMap?.stations?.[m.round];
    if(st){
     const d=Math.hypot(st.x-huntState.x, st.y-huntState.y);
     if(d > 12){
      huntState.targetX=st.x;huntState.targetY=st.y;huntState.lastAutoStation=-1;
      return;
     }
    }
   }
   huntState.battleOpen=true;
   huntState.selectedChoice=null;
   huntState.shortText='';
   huntState.monsterDefeated=false;
   huntState.rewardBadge=null;
   render();
   return;
  }
  
  
  
  
  if(action==='aimMsPadPrev'){
    msState.aimedPad = Math.max(0, msState.aimedPad - 1);
    sound('step');
    render();
    return;
  }
  if(action==='aimMsPadNext'){
    msState.aimedPad = Math.min(3, msState.aimedPad + 1);
    sound('step');
    render();
    return;
  }
  if(action==='jumpMsPadAimed'){
    await stepMinesweeperPad(msState.aimedPad);
    return;
  }

  if(action==='stepMinesweeperPad'){
    const p = Number(el.dataset.pad);
    if(!isNaN(p)) await stepMinesweeperPad(p);
    return;
  }

  if(action==='shootZombieLane'){
   const l = Number(el.dataset.lane);
   if(!isNaN(l)) await shootZombieLane(l);
   return;
  }

  if(action==='answerMazeQuestion'){
   const ch = Number(el.dataset.choice);
   if(!isNaN(ch)) await answerMazeQuestion(ch);
   return;
  }
  if(action==='mazeMove'){
   const dx = Number(el.dataset.dx)||0, dy = Number(el.dataset.dy)||0;
   moveMazeStep(dx, dy);
   return;
  }
  if(action==='clickMazeCell'){
   const cx = Number(el.dataset.x), cy = Number(el.dataset.y);
   if(!isNaN(cx) && !isNaN(cy) && !isMazeWall(cx, cy)){
    await animateMazeWalkTo(cx, cy);
   }
   return;
  }
  if(action==='autoStepToMazeTarget'){
   const curWp = mazeState.waypoints[Math.min(world.current?.round||0, 4)];
   if(curWp){
    await animateMazeWalkTo(curWp.x, curWp.y);
   }
   return;
  }
  if(action==='clickAnvilInfo'){
   sound('step');
   const idx = Number(el.dataset.idx);
   notice('🔮 BỆ RÈN TINH THỂ', `Đây là Bệ rèn số ${idx+1}. Hãy hoàn thành các lượt trước để kích hoạt bệ rèn này!`, false);
   return;
  }
  if(action==='clickPylonInfo'){
   sound('step');
   const idx = Number(el.dataset.idx);
   notice('⚡ TRỤ PHÉP THÀNH TRÌ', `Trụ phép số ${idx+1} đang bảo vệ kết giới. Hãy giải lần lượt từng trụ theo thứ tự!`, false);
   return;
  }

  if(action==='openCipherNotebook'){
   cipherState.open=true;cipherState.error=null;render();return;
  }
  if(action==='closeCipherNotebook'){
   cipherState.open=false;render();return;
  }
  if(action==='placeCipherChip'){
   const ch=el.dataset.char;
   const emptyIdx=cipherState.slots.indexOf(null);
   if(emptyIdx!==-1){
    cipherState.slots[emptyIdx]=ch;
    sound('step');
    render();
   }
   return;
  }
  if(action==='removeCipherSlot'){
   const slotIdx=Number(el.dataset.slot);
   if(!isNaN(slotIdx)){
    cipherState.slots[slotIdx]=null;
    sound('step');
    render();
   }
   return;
  }
  if(action==='resetCipherSlots'){
   cipherState.slots=[null,null,null,null,null];
   cipherState.error=null;
   render();
   return;
  }
  if(action==='submitCipherNotebook'){
   await submitCipherNotebook();
   return;
  }
  if(action==='openTeamRoles'){
   showRolesModal=true;render();return;
  }
  if(action==='closeTeamRoles'){
   showRolesModal=false;render();return;
  }
  if(action==='clickNPC'){
   interactNearObject();return;
  }
  if(action==='closeQuestDialogue'){
   questDialogue=null;render();return;
  }
  if(action==='clickCrystalAltar'){
   cipherState.open=true;cipherState.error=null;sound('crystal');render();return;
  }
  if(action==='clickMazeChest'){
   cipherState.open=true;cipherState.error=null;sound('portal');render();return;
  }
  if(action==='clickCitadelCore'){
   cipherState.open=true;cipherState.error=null;sound('energy');render();return;
  }
  if(action==='clickTargetBeacon'){
   sound('gem');
   notice('🎯 TỌA ĐỘ BÍ MẬT!',`Đội đã tìm thấy vị trí tọa độ (${el.dataset.gx}; ${el.dataset.gy}) trên bản đồ Mê Cung!`,true,{button:'Tuyệt vời'});
   return;
  }
  if(action==='openBossBattle'){
   huntState.battleOpen=true;
   huntState.selectedChoice=null;
   huntState.shortText='';
   huntState.monsterDefeated=false;
   huntState.rewardBadge=null;
   sound('boss_roar');
   render();
   return;
  }
  if(action==='interactNearObject'){
   interactNearObject();
   return;
  }
    if(action==='closeHuntBattle'){
   huntState.battleOpen=false;
   render();
   return;
  }
  if(action==='selectHuntOpt'){
   huntState.selectedChoice=Number(el.dataset.choice);
   $$('.hw-opt-btn').forEach((b,i)=>b.classList.toggle('selected',i===huntState.selectedChoice));
   return;
  }
  if(action==='attackHuntMonster'){
   const shortVal=$('#huntShortInput')?.value?.trim()||'';
   huntState.shortText=shortVal;
   if(shortVal!==''){
    await submitStageAnswer({shortText:shortVal});
    return;
   }
   if(huntState.selectedChoice===null){
    return notice('Chưa chọn đòn tấn công','Hãy chọn một đáp án A, B, C, D hoặc nhập kết quả vào ô trống trước khi bấm Tấn công!',false);
   }
   await submitStageAnswer({choice:huntState.selectedChoice});
   return;
  }
  if(action==='finishHuntReward'){
   huntState.battleOpen=false;
   huntState.monsterDefeated=false;
   huntState.rewardBadge=null;
   huntState.selectedChoice=null;
   huntState.shortText='';
   huntState.targetX=null;
   huntState.targetY=null;
   huntState.moving=false;
   huntState.lastAutoStation=-1;
   await refresh(true);
   return;
  }

  /* ─── ACTIONS CHO BẢO VỆ THÀNH TRÌ ─── */
  if(action==='answer'){
   await submitStageAnswer({choice:Number(el.dataset.choice)});
   return;
  }
  if(action==='submitShortCastle'){
   const val=$('#cdShortInput')?.value?.trim()||'';
   if(!val)return notice('Chưa nhập đáp án','Hãy nhập kết quả tính toán vào ô trống hoặc chọn đáp án A, B, C, D!',false);
   await submitStageAnswer({shortText:val});
   return;
  }
  if(action==='buyUpgrade'){
   const key=el.dataset.upgrade;
   const r=await submit('/api/upgrade',{upgrade:key});
   if(r.ok){
    world.me.gold=r.gold;
    world.me.upgrades=r.upgrades;
    world.me.health=r.health;
    cdState.castleMaxHp=260+(r.upgrades.hp||1)*40;
    cdState.castleHp=Math.min(cdState.castleMaxHp,cdState.castleHp+45);
    sound(true);
    render();
   }
   return;
  }
  if(action==='useSkill'){
   const sk=el.dataset.skill;
   const now=performance.now();
   if((cdState.skillCd[sk]||0)>now)return;
   sound('skill');
   if(sk==='arrowRain'){
    cdState.skillCd.arrowRain=now+12000;
    for(let i=0;i<12;i++){
     cdState.projectiles.push({id:++cdState.seq,lane:i%3,x:18+(i*5),speed:58,dmg:48,icon:'🏹'});
    }
    cdState.effects.push({id:++cdState.seq,x:55,lane:1,text:'🌧️ MƯA TÊN VECTƠ!',cls:'crit',until:now+950});
   }else if(sk==='iceVolley'){
    cdState.skillCd.iceVolley=now+14000;
    cdState.slowUntil=now+6000;
    cdState.effects.push({id:++cdState.seq,x:55,lane:1,text:'❄️ BÃO TUYẾT ĐÓNG BĂNG 6 GIÂY!',cls:'crit',until:now+950});
   }else if(sk==='groupHeal'){
    cdState.skillCd.groupHeal=now+15000;
    cdState.castleHp=Math.min(cdState.castleMaxHp,cdState.castleHp+95);
    cdState.effects.push({id:++cdState.seq,x:20,lane:1,text:'💚 +95 HP THÀNH TRÌ!',cls:'crit',until:now+950});
   }else if(sk==='castleShield'){
    cdState.skillCd.castleShield=now+16000;
    cdState.shieldUntil=now+7000;
    cdState.effects.push({id:++cdState.seq,x:18,lane:1,text:'🛡️ BẬT KHIÊN LỤC GIÁC 7 GIÂY!',cls:'crit',until:now+950});
   }
   render();
   return;
  }

  /* ─── ACTIONS CHUNG & GIÁO VIÊN ─── */
  if(action==='hint'){
   if(world.paused)return notice('Tạm dừng','Giáo viên đang tạm dừng nhiệm vụ.',false);
   const result=await submit('/api/hint',{stage:world.me.stage,round:world.me.round});
   notice('💡 GỢI Ý TỪ TRỢ LÝ NOVA',result.hint+' ('+result.cost+')',false,{button:'Quay lại nhiệm vụ'});
   return;
  }
  if(action==='final'){
   const code=$('#finalCode').value.trim();
   const selected=$('input[name="message"]:checked');
   if(!selected)return notice('Thiếu thông điệp','Hãy chọn một trong ba thông điệp từ mật mã.',false);
   const r=await submit('/api/final',{code,choice:Number(selected.value)});
   if(r.correct){
    sound('win');
    triggerConfetti(4500);
    notice('🏆 GIẢI CỨU THÀNH PHỐ OXYZ THÀNH CÔNG!','Lõi Trí Tuệ đã được khôi phục: '+r.message,true,{points:r.points,button:'Xem bảng vinh danh →'});
   }else{
    notice('MẬT THƯ CHƯA ĐƯỢC MỞ','NOVA gợi ý: '+r.hint,false,{button:'Thử giải mã lại'});
   }
   updateAfterAction();return;
  }
  if(action==='closeModal'){modal=null;$('.modal-backdrop')?.remove();await refresh(true);return;}
  if(action==='hostStartContest'){
   await submit('/api/teacher',{action:'startContest'});
   sound('win');
   updateAfterAction();
   return;
  }
  if(action==='hostPauseContest'){
   await submit('/api/teacher',{action:'pauseContest'});
   updateAfterAction();
   return;
  }
  if(action==='hostResumeContest'){
   await submit('/api/teacher',{action:'resumeContest'});
   sound('powerup');
   updateAfterAction();
   return;
  }
  if(action==='hostEndContest'){
   if(!confirm('Xác nhận KẾT THÚC SỚM lượt thi của phòng học? Đồng hồ chủ sẽ dừng và mở bảng vinh danh tổng kết.')) return;
   await submit('/api/teacher',{action:'endContest'});
   showAward = true;
   sound('fanfare');
   triggerConfetti(3200);
   updateAfterAction();
   return;
  }
  if(action==='hostOpenDisplay'){
   saveSession({role:'display',room:session.room,token:'DISPLAY'});
   await refresh(true);
   return;
  }
  if(action==='exitDisplayMode'){
   const savedTeacherToken = localStorage.getItem(cacheKey('teacher', session.room)) || (window.IS_DEMO_MODE ? 'DEMO_GV' : '');
   if(savedTeacherToken){
    saveSession({role:'teacher',room:session.room,token:savedTeacherToken});
    await refresh(true);
   }else{
    notice('Chế độ trình chiếu','Chỉ Giáo viên chủ phòng mới có quyền mở Trung tâm chỉ huy.',false);
   }
   return;
  }
  if(action==='openTeamInspector'){
   selectedInspectorTeamId = world?.teams?.[0]?.id || 'doi-1';
   render();
   return;
  }
  if(action==='inspectTeamRow'){
   selectedInspectorTeamId = el.dataset.team || world?.teams?.[0]?.id || 'doi-1';
   render();
   return;
  }
  if(action==='closeTeamInspector'){
   selectedInspectorTeamId = null;
   render();
   return;
  }
  if(action==='saveModalBonus'){
   const team = el.dataset.team;
   const value = Number($('#modalBonusVal')?.value || 0);
   await submit('/api/teacher',{action:'bonus',team,value});
   notice('Đã lưu điểm hợp tác','Đã cập nhật +' + value + ' XP hợp tác cho đội!',true);
   updateAfterAction();
   return;
  }
  if(action==='resetSingleTeam'){
   const team = el.dataset.team;
   const tName = world?.teams?.find(x=>x.id===team)?.name || team;
   if(!confirm('Đặt lại từ đầu toàn bộ tiến độ và điểm của ' + tName + '?')) return;
   await submit('/api/teacher',{action:'resetTeam',team});
   updateAfterAction();
   return;
  }
  if(action==='toggleTeacherPinDrawer'){
   showTeacherPinDrawer = !showTeacherPinDrawer;
   render();
   return;
  }
  if(action==='toggleTeacher3DDrawer'){
   showTeacher3DDrawer = !showTeacher3DDrawer;
   render();
   return;
  }
  if(action==='teacherSelectStage3D'){
   teacherPreviewStage = Number(el.dataset.stage || 0);
   showTeacher3DDrawer = true;
   render();
   return;
  }
  if(action==='pauseGame'){await submit('/api/teacher',{action:'pause'});updateAfterAction();return;}
  if(action==='timerToggle'){await submit('/api/teacher',{action:'timer',value:world.clock.running?'pause':'start'});updateAfterAction();return;}
  if(action==='timerReset'){await submit('/api/teacher',{action:'timer',value:'reset'});updateAfterAction();return;}
  if(action==='setBonus'){const team=$('#bonusTeam').value,value=Number($('#bonusValue').value);await submit('/api/teacher',{action:'bonus',team,value});updateAfterAction();return;}
  if(action==='teacherBroadcast'){
   const msg=prompt('Nhập nội dung nhắc nhở/gợi ý gửi tới toàn bộ học sinh trong lớp:');
   if(msg&&msg.trim()){
    await submit('/api/teacher',{action:'broadcast',message:msg.trim()});
    notice('ĐÃ GỬI THÔNG BÁO','Thông điệp đã được gửi tới toàn thể các đội thám hiểm!',true);
    updateAfterAction();
   }
   return;
  }
  if(action==='teacherHealAll'){
   if(confirm('Nạp đầy 3 khiên bảo vệ cho tất cả các đội trong lớp?')){
    await submit('/api/teacher',{action:'healAll'});
    sound('skill');
    notice('ĐÃ HỒI PHỤC KHIÊN','Tất cả các đội đã được sạc đầy 3 khiên năng lượng!',true);
    updateAfterAction();
   }
   return;
  }
  if(action==='teacherBonusAll'){
   if(confirm('Thưởng nóng +5 XP và +50 Vàng cho tất cả các đội vì tinh thần học tập tích cực?')){
    await submit('/api/teacher',{action:'bonusAll'});
    sound('correct');
    triggerConfetti(2200);
    notice('ĐÃ THƯỞNG NÓNG','Đã cộng +5 XP và +50 Vàng cho toàn thể các đội!',true);
    updateAfterAction();
   }
   return;
  }
  if(action==='preview3DStage'){
   teacherPreviewStage=Number(el.dataset.stage);
   render();
   return;
  }
  if(action==='awards'){
   showAward=!showAward;
   if(showAward){sound('fanfare');triggerConfetti(3500);}
   render();
   return;
  }
  if(action==='print'){window.print();return;}
  if(action==='exportCSV'){exportCSV();return;}
  if(action==='resetTeam'){const team=$('#resetTeam').value;const name=world.teams.find(t=>t.id===team)?.name;if(!confirm('Đặt lại từ đầu toàn bộ nhiệm vụ và điểm của '+name+'?'))return;await submit('/api/teacher',{action:'resetTeam',team});updateAfterAction();return;}
  if(action==='copy'){const url=el.dataset.url;try{await navigator.clipboard.writeText(url);notice('ĐÃ SAO CHÉP LIÊN KẾT',url,true);}catch(e){notice('LIÊN KẾT ĐỘI',url,true);}return;}
 }catch(e){
  notice('THÔNG BÁO',e.message||'Có lỗi xảy ra.',false);
  if(el)el.disabled=false;
 }
}

/* ─── XỬ LÝ SỰ KIỆN BÀN PHÍM, CHUỘT, CHẠM & D-PAD CHO BẢN ĐỒ 2D ─── */
let isPointerDraggingMap=false;

function updateTargetFromPointer(e){
 const wd=$('#hwWorld');if(!wd)return;
 const rect=wd.getBoundingClientRect();
 if(rect.width>0&&rect.height>0){
  const tx=Math.max(6,Math.min(94,(e.clientX-rect.left)/rect.width*100));
  const ty=Math.max(8,Math.min(92,(e.clientY-rect.top)/rect.height*100));
  huntState.targetX=tx;
  huntState.targetY=ty;
  huntState.lastAutoStation=-1;
  updateHuntCamera();
 }
}

document.addEventListener('click',e=>{
 const el=e.target.closest('[data-action]');
 if(el){e.preventDefault();sound('bleep');handle(el.dataset.action,el);return;}
});

document.addEventListener('pointerdown',e=>{
 const dbtn=e.target.closest('[data-dpad]');
 if(dbtn){
  e.preventDefault();
  huntState.keysPressed.add(dbtn.dataset.dpad);
  huntState.targetX=null;huntState.targetY=null;
  return;
 }
 const vp=e.target.closest('#hwViewport');
 if(vp&&!e.target.closest('.hw-controls-overlay')&&!e.target.closest('.hw-station')&&!e.target.closest('.hw-chest')&&!e.target.closest('.hw-hud-top')&&!e.target.closest('.hw-compass')&&!e.target.closest('.hw-minimap')){
  isPointerDraggingMap=true;
  updateTargetFromPointer(e);
  sound('target');
 }
});

document.addEventListener('pointermove',e=>{
 if(isPointerDraggingMap){
  updateTargetFromPointer(e);
 }
});

document.addEventListener('pointerup',()=>{
 isPointerDraggingMap=false;
 ['up','down','left','right'].forEach(k=>huntState.keysPressed.delete(k));
});

const keyMap={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',KeyW:'up',KeyS:'down',KeyA:'left',KeyD:'right'};
window.addEventListener('keydown',e=>{
 if(document.activeElement?.matches('input,select,textarea')){
  if(e.key==='Enter'){
   if(document.activeElement.id==='huntShortInput')handle('attackHuntMonster');
   else if(document.activeElement.id==='cdShortInput')handle('submitShortCastle');
   else if(!session)$('#entry [data-action="join"]')?.click();
  }
  return;
 }
 if(session?.role!=='student' || !world?.current || cipherState.open) return;
 const m = world.current;

 // Phím tắt chọn đáp án nhanh 1/2/3/4 cho mọi chặng
 if(['1','2','3','4'].includes(e.key)){
  const idx = Number(e.key) - 1;
  if(m.id === 3){ e.preventDefault(); shootZombieLane(idx); return; }
  if(m.id === 4){ e.preventDefault(); answerMazeQuestion(idx); return; }
  if(m.id === 5 && !m.isBoss && !world.me?.bossReady){ e.preventDefault(); stepMinesweeperPad(idx); return; }
 }

 // Điều khiển bàn phím riêng cho Chặng 3 (Chặn Zombie 4 Làn)
 if(m.id === 3){
  const k = (e.key||'').toLowerCase();
  if(e.code==='ArrowUp' || k==='w'){
   e.preventDefault();
   zdState.lane = Math.max(0, zdState.lane - 1);
   render();
   return;
  }
  if(e.code==='ArrowDown' || k==='s'){
   e.preventDefault();
   zdState.lane = Math.min(3, zdState.lane + 1);
   render();
   return;
  }
  if(e.code==='Space' || e.code==='Enter'){
   e.preventDefault();
   shootZombieLane(zdState.lane);
   return;
  }
  return;
 }

 // Điều khiển bàn phím riêng cho Chặng 4 (Mê Cung Tọa Độ Ô Vuông)
 if(m.id === 4){
  let dir = keyMap[e.code];
  if(!dir && e.key){
   const k = e.key.toLowerCase();
   if(k==='w'||k==='arrowup') dir='up';
   else if(k==='s'||k==='arrowdown') dir='down';
   else if(k==='a'||k==='arrowleft') dir='left';
   else if(k==='d'||k==='arrowright') dir='right';
  }
  if(dir){
   e.preventDefault();
   if(dir==='up') moveMazeStep(0, 1);
   else if(dir==='down') moveMazeStep(0, -1);
   else if(dir==='left') moveMazeStep(-1, 0);
   else if(dir==='right') moveMazeStep(1, 0);
   return;
  }
 }

 // Điều khiển phím tắt A/B/C/D cho Chặng 5 Dò Mìn
 if(m.id === 5 && !m.isBoss && !world.me?.bossReady){
  const k = (e.key||'').toUpperCase();
  const cIdx = ['A','B','C','D'].indexOf(k);
  if(cIdx !== -1){
   e.preventDefault();
   stepMinesweeperPad(cIdx);
   return;
  }
 }

 // Điều khiển cho Chặng 1 (Săn Kho Báu 2D)
 if(e.code==='Space' && m.id===1 && !huntState.battleOpen){
  if(m.huntMap?.stations?.[m.round]){
   const curSt=m.huntMap.stations[m.round];
   const dist=Math.hypot(curSt.x-huntState.x, curSt.y-huntState.y);
   if(dist<=12){
    e.preventDefault();
    handle('openHuntBattle');
    return;
   }
  }
 }
 if((e.key==='Shift'||e.code==='ShiftLeft'||e.code==='ShiftRight') && m.id===1){
  huntState.isSprinting=true;
  updateHuntCamera();
 }
 let dir=keyMap[e.code];
 if(!dir&&e.key){
  const k=e.key.toLowerCase();
  if(k==='w'||k==='arrowup')dir='up';
  else if(k==='s'||k==='arrowdown')dir='down';
  else if(k==='a'||k==='arrowleft')dir='left';
  else if(k==='d'||k==='arrowright')dir='right';
 }
 if(dir && m.id===1 && !huntState.battleOpen){
  e.preventDefault();
  huntState.keysPressed.add(dir);
  huntState.targetX=null;huntState.targetY=null;
 }
});

window.addEventListener('keyup',e=>{
 if(e.key==='Shift'||e.code==='ShiftLeft'||e.code==='ShiftRight'){
  huntState.isSprinting=false;
  updateHuntCamera();
 }
 let dir=keyMap[e.code];
 if(!dir&&e.key){
  const k=e.key.toLowerCase();
  if(k==='w'||k==='arrowup')dir='up';
  else if(k==='s'||k==='arrowdown')dir='down';
  else if(k==='a'||k==='arrowleft')dir='left';
  else if(k==='d'||k==='arrowright')dir='right';
 }
 if(dir)huntState.keysPressed.delete(dir);
});

document.addEventListener('change',e=>{
 if(e.target.id==='clockMinutes'&&session?.role==='teacher'){
  submit('/api/teacher',{action:'timer',value:Number(e.target.value)}).then(updateAfterAction).catch(err=>notice('Lỗi đồng hồ',err.message,false));
 }
});

/* ─── VÒNG LẶP GAME 60FPS CHO CẢ 2 ENGINE (HUNT 2D & CASTLE DEFENSE) ─── */
let lastFrameTs=performance.now();
function gameLoop(now){
 const dt=Math.min(0.08,(now-lastFrameTs)/1000);
 lastFrameTs=now;

 if(session?.role==='student'&&world?.current&&!world.paused&&!world.me?.completed&&world.me?.stage<5){
  const m=world.current;
  const mode = (m.id === 2) ? 'defense' : (m.id === 1 ? 'hunt' : m.gameType);
   if(m.id === 3 && document.getElementById('zdBoard')) zdTick(now, dt, m);

  if(mode==='hunt'&&!huntState.battleOpen&&$('#hwViewport')){
   let vx=0,vy=0;
   if(huntState.keysPressed.has('left'))vx-=1;
   if(huntState.keysPressed.has('right'))vx+=1;
   if(huntState.keysPressed.has('up'))vy-=1;
   if(huntState.keysPressed.has('down'))vy+=1;

   const speed=(huntState.isSprinting?40:24);

   if(vx!==0||vy!==0){
    const len=Math.hypot(vx,vy);
    huntState.x=Math.max(6,Math.min(94,huntState.x+(vx/len)*speed*dt));
    huntState.y=Math.max(8,Math.min(92,huntState.y+(vy/len)*speed*dt));
    huntState.moving=true;
    if(vx>0.05)huntState.facing='right';
    else if(vx<-0.05)huntState.facing='left';
   }else if(huntState.targetX!==null&&huntState.targetY!==null){
    const dx=huntState.targetX-huntState.x, dy=huntState.targetY-huntState.y;
    const dist=Math.hypot(dx,dy);
    if(dist<0.8){
     huntState.x=huntState.targetX;huntState.y=huntState.targetY;
     huntState.targetX=null;huntState.targetY=null;
     huntState.moving=false;
    }else{
     huntState.x+=(dx/dist)*speed*dt;
     huntState.y+=(dy/dist)*speed*dt;
     huntState.moving=true;
     if(dx>0.05)huntState.facing='right';
     else if(dx<-0.05)huntState.facing='left';
    }
   }else{
    huntState.moving=false;
   }

   // Bước chân âm thanh Web Audio
   if(huntState.moving&&now-huntState.lastStepSfxAt>(huntState.isSprinting?200:320)){
    huntState.lastStepSfxAt=now;
    sound('step');
   }

   // Kiểm tra nhặt tinh thể & quà tặng
   if(huntState.collectibles?.length){
    huntState.collectibles.forEach(c=>{
     if(!c.collected&&Math.hypot(huntState.x-c.x,huntState.y-c.y)<4.2){
      c.collected=true;
      sound('coin');
      if(c.type==='gold')world.me.gold=(world.me.gold||0)+c.val;
      if(c.type==='xp')world.me.score=(world.me.score||0)+c.val;
      if(c.type==='shield')world.me.health=Math.min(3,(world.me.health||3)+c.val);
      huntState.popups.push({id:Date.now()+Math.random(),x:c.x,y:c.y,text:c.label,color:c.type==='xp'?'#38bdf8':'#fde047',createdAt:now});
      const el=document.getElementById('collectible-'+c.id);
      if(el)el.style.display='none';
     }
    });
   }
   // Dọn dẹp popup cũ sau 1.2s
   if(huntState.popups?.length){
    huntState.popups=huntState.popups.filter(p=>now-p.createdAt<1200);
   }

   updateHuntCamera();

   const curSt=m.huntMap?.stations?.[m.round];
   if(curSt){
    const dSt=Math.hypot(huntState.x-curSt.x,huntState.y-curSt.y);
    if(dSt<=4.2&&huntState.lastAutoStation!==m.round){
     huntState.lastAutoStation=m.round;
     huntState.targetX=null;huntState.targetY=null;huntState.moving=false;
     huntState.battleOpen=true;
     huntState.selectedChoice=null;
     huntState.shortText='';
     huntState.monsterDefeated=false;
     huntState.rewardBadge=null;
     render();
    }else if(dSt>7){
     huntState.lastAutoStation=-1;
    }
   }
  }

  if(mode==='defense'&&$('#cdBattlefield')){
   const up=world.me.upgrades||{damage:1,speed:1,hp:1,regen:1};
   if(now-cdState.lastRegenAt>1000){
    cdState.lastRegenAt=now;
    cdState.castleHp=Math.min(cdState.castleMaxHp,cdState.castleHp+(up.regen||1)*2);
   }
   if(cdState.enemies.length<4&&now-cdState.lastSpawnAt>3200){
    cdState.lastSpawnAt=now;
    const kinds=['👺','🦇','💀','👹'];
    const lane=Math.floor(Math.random()*3);
    const hp=70+m.id*18+m.round*15;
    cdState.enemies.push({
     id:'en-'+(++cdState.seq),
     lane, x:92,
     hp, maxHp:hp,
     speed:2.0+Math.random()*0.7,
     sprite:kinds[(m.round+lane)%kinds.length],
     isBoss:false
    });
   }
   const slowed=cdState.slowUntil>now;
   const shieldOn=cdState.shieldUntil>now;
   for(let i=cdState.enemies.length-1;i>=0;i--){
    const en=cdState.enemies[i];
    en.x-=en.speed*(slowed?0.35:1)*dt;
    if(en.x<=15){
     const dmg=shieldOn?0:(en.isBoss?22:12);
     cdState.castleHp=Math.max(25,cdState.castleHp-dmg);
     cdState.effects.push({
      id:++cdState.seq,x:15,lane:en.lane,
      text:shieldOn?'🛡️ KHIÊN CHẶN!':`-${dmg} HP`,
      cls:'hit-castle',until:now+700
     });
     if(en.isBoss){
      en.x=78;
     }else{
      cdState.enemies.splice(i,1);
     }
    }
   }
   const fireInterval=Math.max(450,1350-(up.speed||1)*180);
   const heroIcons=['🏹','🔮','⚡'];
   for(let lane=0;lane<3;lane++){
    if(now-cdState.lastHeroShot[lane]>=fireInterval){
     const hasTarget=cdState.enemies.some(e=>e.lane===lane&&e.x>16);
     if(hasTarget){
      cdState.lastHeroShot[lane]=now;
      cdState.projectiles.push({
       id:++cdState.seq,lane,x:17,
       speed:46,
       dmg:20+(up.damage||1)*9,
       icon:heroIcons[lane]
      });
     }
    }
   }
   for(let i=cdState.projectiles.length-1;i>=0;i--){
    const p=cdState.projectiles[i];
    p.x+=p.speed*dt;
    const hitIdx=cdState.enemies.findIndex(e=>e.lane===p.lane&&Math.abs(e.x-p.x)<=3.5);
    if(hitIdx!==-1){
     const target=cdState.enemies[hitIdx];
     target.hp-=p.dmg;
     cdState.effects.push({id:++cdState.seq,x:target.x,lane:target.lane,text:`-${p.dmg}`,cls:'',until:now+550});
     cdState.projectiles.splice(i,1);
     if(target.hp<=0){
      if(target.isBoss){
       target.hp=Math.round(target.maxHp*0.35);
       cdState.effects.push({id:++cdState.seq,x:target.x,lane:target.lane,text:'🎯 GIẢI TOÁN ĐỂ BẮN LASER DIỆT BOSS!',cls:'crit',until:now+900});
      }else{
       cdState.enemies.splice(hitIdx,1);
       world.me.gold=(world.me.gold||120)+5;
      }
     }
    }else if(p.x>98){
     cdState.projectiles.splice(i,1);
    }
   }
   cdState.effects=cdState.effects.filter(fx=>fx.until>now);
   renderCastleDynamicNodes(now);
  }
 }
 requestAnimationFrame(gameLoop);
}

function renderCastleDynamicNodes(now){
 const layer=$('#cdDynamicLayer');if(!layer)return;
 const laneTops=[44,65,86];
 const slowed=cdState.slowUntil>now;
 const laserOn=cdState.laserUntil>now;
 const shieldEl=$('#cdCastleShield');
 if(shieldEl)shieldEl.style.display=cdState.shieldUntil>now?'block':'none';
 const gameRoot=$('#cdGameRoot');
 if(gameRoot)gameRoot.classList.toggle('shake',cdState.shakeUntil>now);
 const hpEl=$('#cdHudHp'), hpBar=$('#cdHudHpBar'), goldEl=$('#cdHudGold'), topGold=$('#topGoldBadge');
 if(hpEl)hpEl.textContent=`${Math.round(cdState.castleHp)} / ${cdState.castleMaxHp}`;
 if(hpBar)hpBar.style.width=`${Math.max(0,Math.min(100,Math.round(cdState.castleHp/cdState.castleMaxHp*100)))}%`;
 if(goldEl&&world?.me)goldEl.textContent=`${world.me.gold??120} Vàng`;
 if(topGold&&world?.me)topGold.textContent=world.me.gold??120;

 const weatherHtml=(slowed?'<div class="cd-weather-freeze"></div>':'')+(laserOn?'<div class="cd-laser-beam"></div>':'');
 const enemiesHtml=cdState.enemies.map(en=>`<div class="cd-enemy ${en.isBoss?'is-boss':''} ${slowed?'is-slowed':''}" style="left:${en.x.toFixed(1)}%;top:${laneTops[en.lane]}%">
  <div class="cd-enemy-hp"><i style="width:${Math.max(0,Math.round(en.hp/en.maxHp*100))}%"></i></div>
  <div class="cd-enemy-sprite">${en.sprite}</div>
 </div>`).join('');

 const projHtml=cdState.projectiles.map(p=>`<div class="cd-proj" style="left:${p.x.toFixed(1)}%;top:${laneTops[p.lane]}%">${p.icon}</div>`).join('');
 const fxHtml=cdState.effects.map(fx=>`<div class="cd-fx ${fx.cls||''}" style="left:${fx.x.toFixed(1)}%;top:${laneTops[fx.lane]-6}%">${esc(fx.text)}</div>`).join('');
 layer.innerHTML=weatherHtml+enemiesHtml+projHtml+fxHtml;
}

function awardScreen(){
 if(!world||world.role!=='teacher')return '';
 const ts=[...world.teams].sort((a,b)=>b.score-a.score||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 const finished=ts.filter(t=>t.completed).length;
 const bestCoop=[...ts].sort((a,b)=>b.bonus-a.bonus)[0];
 return `<div class="award-backdrop"><div class="award-panel">
 <div class="stars">✦ ✧ ★ ✦ ★</div><div class="eyebrow">MATHVERSE OXYZ • LỄ VINH DANH</div>
 <h1>${finished>0?'GIẢI CỨU THÀNH PHỐ OXYZ THÀNH CÔNG!':'BẢNG XẾP HẠNG TẠM THỜI'}</h1>
 <p>${finished>0?'Lõi Trí Tuệ đã được khôi phục. Xin chúc mừng các biệt đội Toán học!':'Các đội đang nỗ lực vượt qua 5 chặng thử thách!'}</p>
 <div class="podium">${ts.slice(0,3).map((t,i)=>`<div class="podium-item ${i===0?'gold-podium':''}">
 <div style="font-size:35px">${i===0?'🥇':i===1?'🥈':'🥉'}</div><div class="podium-avatar">${t.avatar}</div>
 <b>${esc(t.name)}</b><strong>${t.score} XP</strong><small>${t.completed?'🔓 Mở kho báu':'Chặng '+t.stage+'/5'}</small></div>`).join('')}</div>
 <div class="winner-bottom">🤝 Giải hợp tác: <b>${bestCoop.bonus>0?esc(bestCoop.name):'Giáo viên công bố'}</b> · 🔐 Đã giải mã: <b>${finished} đội</b></div>
 <div class="controls" style="justify-content:center">${btn('⬅ Quay về màn hình giáo viên','awards','gray')}${btn('📥 Tải bảng điểm CSV','exportCSV','gold')}</div>
 </div></div>`;
}

function exportCSV(){
 const columns=['Thứ hạng','Tên đội','Nhân vật','Số trạm qua','Lượt trong trạm','Số câu sai','Số khiên còn','Vàng tích lũy','Cấp Anh Hùng','Chuỗi Combo','Điểm nhiệm vụ','Điểm hợp tác','Tổng XP','Đã giải mã','Thời điểm hoàn thành'];
 const ordered=[...world.teams].sort((a,b)=>b.score-a.score||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 const rows=ordered.map((t,i)=>[i+1,t.name,t.avatar,t.stage,t.round,t.wrong,t.health,t.gold??120,t.heroLevel??1,t.streak||0,t.score-t.bonus,t.bonus,t.score,t.completed?'Có':'Chưa',t.finishedAt?new Date(t.finishedAt).toLocaleString('vi-VN'):'']);
 const quote=v=>'"'+String(v).replace(/"/g,'""')+'"';
 const csv='\ufeff'+[columns,...rows].map(r=>r.map(quote).join(',')).join('\r\n');
 const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
 const link=URL.createObjectURL(blob);const a=document.createElement('a');a.href=link;a.download='MATHVERSE_OXYZ_KET_QUA_'+world.room+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(link),1500);
}

session=restoreSession();
if(session){refresh(true);}else{startScreen();}
setInterval(()=>{if(session&&!document.hidden)refresh(false);},2500);
setInterval(updateClock,400);
requestAnimationFrame(gameLoop);
