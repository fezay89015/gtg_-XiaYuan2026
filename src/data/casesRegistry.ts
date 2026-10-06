import {
  CASE_SUMMARY,
  EVIDENCE_ITEMS,
  DEDUCTION_QUIZ,
  EVIDENCE_07_CONFESSION,
  SINS_ANALYSIS,
  PROMO_EVENT_INFO,
  EvidenceItem,
  DeductionQuestion,
  SinAnalysisItem
} from './caseData';

// Case 01 Assets
import firePaintImg from '../assets/images/evidence_fire_paint_1790927470943.jpg';

// Case 02 Assets (Wings / 折翅的蝴蝶)
import wingsPianoLidImg from '../assets/images/wings_piano_lid_1791256176906.jpg';
import wingsRoseBouquetImg from '../assets/images/wings_rose_bouquet_1791256193132.jpg';
import wingsMedicineBoxImg from '../assets/images/wings_medicine_box_1791256207332.jpg';
import wingsEpipenSofaImg from '../assets/images/wings_epipen_sofa_1791256220443.jpg';
import wingsTornGownImg from '../assets/images/wings_torn_gown_1791256232904.jpg';
import wingsHospitalChartImg from '../assets/images/wings_hospital_chart_1791256245277.jpg';
import wingsPianistImg from '../assets/images/wings_pianist_portrait_1791256259033.jpg';

export interface CaseDossier {
  id: string;
  slug: string;
  aliases: string[];
  caseCode: string;
  badgeText: string;
  mainTitle: string;
  titleEn: string;
  subTitle: string;
  tagline: string;
  shortDescription: string;
  targetPhoto: string;
  targetPhotoCaption: string;
  themeStyle: {
    accentColor: string; // 'red' | 'amber'
    boardBorder: string;
    badgeBg: string;
    cardBorderHighlight: string;
    vignetteGradient: string;
  };
  summary: typeof CASE_SUMMARY;
  evidence: EvidenceItem[];
  quiz: DeductionQuestion[];
  confession: typeof EVIDENCE_07_CONFESSION;
  sins: SinAnalysisItem[];
  promo: typeof PROMO_EVENT_INFO;
}

/* ====================================================================
 * CASE 01: 深夜透天火場離奇蒸發案 · 消失的阿城叔 (CR-2026-0930)
 * 直連網址: ?case=acheng
 * ==================================================================== */
export const CASE_01_ACHENG: CaseDossier = {
  id: 'case-01',
  slug: 'acheng',
  aliases: ['acheng', '1', 'fire', 'midnight-fire'],
  caseCode: 'CR-2026-0930',
  badgeText: '懸案 01 · 焚室金蟬脫殼',
  mainTitle: '《深夜透天火場離奇蒸發案》',
  titleEn: 'THE SUSPICIOUS MIDNIGHT FIRE',
  subTitle: '消失的阿城叔',
  tagline: '深夜透天惡火單室炭化，百公斤肥漢憑空蒸發，起獲高規格防火漆與防水眉筆！',
  shortDescription: '深夜民宅竄出惡火，僅單一臥室焚毀。無骨骸遺留，平日臃腫借住之阿城人間蒸發。現場矛盾線索直指精心策劃之金蟬脫殼。',
  targetPhoto: 'https://github.com/user-attachments/assets/13dc3d56-9e03-49a5-9cea-d3f0b8e24788',
  targetPhotoCaption: 'TARGET PHOTO // 失蹤人·阿城叔',
  themeStyle: {
    accentColor: 'red',
    boardBorder: 'border-[#c4b195]',
    badgeBg: 'bg-red-800 text-white',
    cardBorderHighlight: 'border-red-700 ring-red-700/25',
    vignetteGradient: 'from-[#120e0a]/40 via-[#120e0a]/65 to-[#120e0a]/85'
  },
  summary: CASE_SUMMARY,
  evidence: EVIDENCE_ITEMS,
  quiz: DEDUCTION_QUIZ,
  confession: EVIDENCE_07_CONFESSION,
  sins: SINS_ANALYSIS,
  promo: PROMO_EVENT_INFO
};

/* ====================================================================
 * CASE 02: 檢方偵查報告書：折翅的蝴蝶 · 頂尖鋼琴家自毀疑雲 (CR-2026-1005)
 * 直連網址: ?case=wings
 * ==================================================================== */
const CASE_02_SUMMARY = {
  mainTitle: "《檢方偵查報告書：折翅的蝴蝶》",
  subTitle: "案件代號：頂尖鋼琴家自毀疑雲",
  caseCode: "CR-2026-1005",
  classification: "極機密 // 檢察官內部偵查報告",
  briefLines: [
    "本案發生於國際巡迴獨奏會前夕，後台 VIP 休息室。",
    "頂尖鋼琴家林詩涵在登台前突然爆發急性過敏休克、右手重創且禮服爆裂。",
    "現場留有同門師妹送來的賀花與多項極度矛盾之現場證物，檢方已扣押現場六大物證，請進行案情論證……"
  ],
  leadInvestigator: "地方檢察署 重案特偵組檢察官",
  incidentDate: "2026 年 10 月 5 日 晚間 19:15",
  incidentLocation: "國家音樂廳後台 · VIP 專屬休息琴房",
  mainSuspicion: "左手完全無傷，且致命花束與過敏急救針之時機極度異常",
  missingPerson: "林詩涵（28歲，國際知名青年鋼琴演奏家）"
};

const CASE_02_EVIDENCE: EvidenceItem[] = [
  {
    id: "evidence-w-01",
    code: "物證 01",
    type: "現場重物",
    name: "壓傷的右手（重型琴蓋）",
    image: wingsPianoLidImg,
    locationFound: "音樂廳後台 VIP 琴房三角鋼琴鍵盤前",
    clueNote: "獨奏會前夕，詩涵在琴房被重型琴蓋壓傷右手，左手毫髮無傷？",
    explanationPoints: [
      "琴蓋內側採集到左手抓拉指紋，受力方向為由內向下滑動。",
      "詩涵左手無任何防禦傷，受力型態與外力襲擊完全相悖。"
    ],
    speculationPoints: [
      "詩涵將右手單獨放在琴鍵上，左手抓住重型琴蓋往下拉，親手壓傷右手。",
      "藉此製造後台遭外人襲擊之假象，行自殘嫁禍之實。"
    ]
  },
  {
    id: "evidence-w-02",
    code: "物證 02",
    type: "過敏致病源",
    name: "皺葉薔薇花束（過敏休克）",
    image: wingsRoseBouquetImg,
    locationFound: "化妝台正中央祝賀花籃與卡片",
    clueNote: "師妹送來祝賀的皺葉薔薇，導致詩涵引發嚴重過敏性休克？",
    explanationPoints: [
      "師妹表示是聽樂團友人轉述詩涵喜好，才特意訂購該花送祝賀。",
      "鑑識調閱詩涵多年急診病歷，證實她早就明知自己對該花重度過敏。"
    ],
    speculationPoints: [
      "詩涵旁敲側擊讓友人轉告不知情的師妹，故意接觸花朵誘發休克。",
      "自導自演陷害同門師妹「惡意送毒花害人」，毀其前途。"
    ]
  },
  {
    id: "evidence-w-03",
    code: "物證 03",
    type: "起獲密件",
    name: "紙膠帶藥袋與筆記（暗櫃木盒）",
    image: wingsMedicineBoxImg,
    locationFound: "更衣室暗櫃深處隱密手工木盒",
    clueNote: "琴房暗櫃搜出木盒，整齊收集著歷年醫院藥袋與滿滿筆記？",
    explanationPoints: [
      "藥袋用紙膠帶整齊封貼，寫著日期與筆記。",
      "筆記寫著：「媽媽留下來陪我 3 小時」、「爸爸摸了我的頭」。"
    ],
    speculationPoints: [
      "得獎後父母關心轉瞬即逝，記錄著「父母溫柔」的藥袋才是她珍藏的戰利品。",
      "為了奪取微薄且短暫的關愛，不惜傷害無辜善意之同儕。"
    ]
  },
  {
    id: "evidence-w-04",
    code: "物證 04",
    type: "預藏急救品",
    name: "沙發縫隙的急救針（EpiPen）",
    image: wingsEpipenSofaImg,
    locationFound: "休息室真皮沙發座墊深層縫隙夾層",
    clueNote: "休息室沙發縫隙深處，發現一支已使用過的過敏急救針？",
    explanationPoints: [
      "拋棄式腎上腺素急救針上採集到詩涵指紋與皮膚組織。",
      "針筒安全保護蓋預先被拔除，處於伸手即可注射之待命狀態。"
    ],
    speculationPoints: [
      "過敏休克可能致死，她預先藏好急救針當保險。",
      "算準倒下後有人會叫救護車，拿性命當賭注演這場局。"
    ]
  },
  {
    id: "evidence-w-05",
    code: "物證 05",
    type: "破壞工具",
    name: "爆裂的禮服腰線（化妝包拆線刀）",
    image: wingsTornGownImg,
    locationFound: "化妝包內夾層與高訂禮服腰部接縫處",
    clueNote: "高訂禮服腰部縫線爆裂，化妝包內發現帶有同色纖維的拆線刀？",
    explanationPoints: [
      "顯微鏡顯示禮服內側接縫線頭有等距離人為挑斷痕跡。",
      "化妝包內拆線刀刀刃附有同色高級蠶絲纖維殘留。"
    ],
    speculationPoints: [
      "詩涵自己悄悄挑鬆內線，活動時自然爆開。",
      "製造禮服遭後台黑手蓄意破壞的假象，藉以博取大眾同情。"
    ]
  },
  {
    id: "evidence-w-06",
    code: "物證 06",
    type: "就醫規律",
    name: "比賽前後的「住院規律」（健保病歷）",
    image: wingsHospitalChartImg,
    locationFound: "雲端健保紀錄與琴房隨身病歷夾",
    clueNote: "病歷顯示重大比賽「前」與得獎「後」，都有頻繁的急診紀錄？",
    explanationPoints: [
      "比賽前住院能避開沒得獎被父母嚴厲斥責的巨大壓力。",
      "得獎後住院則能讓即將冷漠離開的父母長時間留在病床邊。"
    ],
    speculationPoints: [
      "精算心理時機，用自殘與裝病將父母短暫的關愛無限延長。",
      "以虛假傷病暗中欺騙外界同情，心機深沉令人扼腕。"
    ]
  }
];

const CASE_02_QUIZ: DeductionQuestion[] = [
  {
    id: 1,
    questionNumber: "Q1",
    question: "關於「壓傷的右手與過敏休克」的推理：為什麼左手完全無傷，且剛好接觸了致命花束？",
    options: [
      {
        id: "w-q1-a",
        text: "師妹強行把詩涵按在鋼琴上，並拿花束塞給她。",
        isCorrect: false
      },
      {
        id: "w-q1-b",
        text: "詩涵左手拉琴蓋砸傷右手，並旁敲側擊誘導不知情的師妹送來過敏薔薇，自導自演陷害師妹。",
        isCorrect: true
      },
      {
        id: "w-q1-c",
        text: "這是一場純粹的後台意外，琴蓋剛好鬆脫掉落。",
        isCorrect: false
      }
    ]
  },
  {
    id: 2,
    questionNumber: "Q2",
    question: "關於「沙發急救針與爆裂禮服」的推理：化妝包裡的拆線刀與藏好的急救針代表什麼？",
    options: [
      {
        id: "w-q2-a",
        text: "詩涵打算在後台自己修改禮服，急救針是幫師妹準備的。",
        isCorrect: false
      },
      {
        id: "w-q2-b",
        text: "詩涵用拆線刀預先挑鬆禮服線頭製造遭破壞假象，並藏急救針作為自己賭命休克的保險。",
        isCorrect: true
      },
      {
        id: "w-q2-c",
        text: "後台清潔人員不小心把拆線刀與急救針遺留在休息室。",
        isCorrect: false
      }
    ]
  },
  {
    id: 3,
    questionNumber: "Q3",
    question: "關於「暗櫃藥袋與住院規律」的推理：詩涵自殘與陷害師妹的真實動機為何？",
    options: [
      {
        id: "w-q3-a",
        text: "她欠下巨額賭債，想透過自殘與休克詐領人身保險金。",
        isCorrect: false
      },
      {
        id: "w-q3-b",
        text: "逃避沒得獎的斥責，並在得獎熱度退去後，利用自殘與受害者姿態將父母短暫的關愛無限延長。",
        isCorrect: true
      },
      {
        id: "w-q3-c",
        text: "詩涵其實患有夢遊症，所有行為皆是無意識中發生的意外。",
        isCorrect: false
      }
    ]
  }
];

const CASE_02_CONFESSION = {
  code: "線索 07",
  title: "【證物 07：詩涵暗櫃裡的秘密筆記】",
  subTitle: "琴房暗櫃夾層搜出之親筆告白日記",
  sender: "詩涵 筆",
  letterContent: `爸爸、媽媽：

今天的巡迴獨奏會，我又拿到了最完美的掌聲。可是我知道，當燈光熄滅、慶功宴結束後，你們又會回到各自的公司，連頭都不回地離開我。

從小到大，我拿了無數座金牌。如果我拿第一名，你們只覺得那是理所當然；如果我沒拿第一，迎來的只有冷漠與斥責。我好累，我真的好累……

直到有一次我高燒抽搐被送進急診室，我睜開眼睛，看到媽媽抱著我哭，爸爸推掉了所有的跨國會議，整整三天守在我的病床邊摸著我的頭，用我從沒聽溫柔過的聲音跟我說話。那一刻，我突然明白了……原來只有在我「受傷、垂死、成為可憐受害者」的時候，你們才會真正地愛我。

師妹很優秀，優秀到讓我害怕。如果這次巡演我表現不好，你們的目光就會轉向她了吧？所以我讓她送來了皺葉薔薇，我用拆線刀挑開了禮服，我用左手把重重琴蓋拉下來砸碎了自己的右手……

看著急救針，我知道這很危險，但我不在乎。只要能躺在病床上，看著你們焦急關切的眼神，聽著全城媒體同情我的遭遇、唾罵傷害我的黑手……這一切痛苦，就全都是值得的。

詩涵 筆`
};

const CASE_02_SINS: SinAnalysisItem[] = [
  {
    id: "sin-w-01",
    factNumber: "事實 01",
    factTitle: "忍痛自殘砸傷右手",
    factSummary: "親手抓拉重型琴蓋砸碎右手，行自殘嫁禍之實，傷害自身髮膚。",
    sinName: "二十解｜宿世今生故作誤為之罪",
    category: "自毀殘軀之業",
    description: "故作受害誤為天災，不惜毀傷父母給予之身軀以求私利；需以解冤釋結科儀化消自殘宿怨結。"
  },
  {
    id: "sin-w-02",
    factNumber: "事實 02",
    factTitle: "設計圈套陷害善意送花師妹",
    factSummary: "誘導不知情之同門師妹送來致病過敏原，意圖將過敏休克之罪責栽贓嫁禍。",
    sinName: "十六解｜教唆詞訟誣害陷害之罪",
    category: "構陷無辜之愆",
    description: "暗設羅網構陷純善同儕，使人蒙受不白之冤與社會指責；種下世世受構陷果報，急需懺悔化解。"
  },
  {
    id: "sin-w-03",
    factNumber: "事實 03",
    factTitle: "為病態貪求關愛毀人前途",
    factSummary: "恐懼師妹才華威脅自身地位，以卑劣手段陷害師妹，意在折斷他人羽翼。",
    sinName: "十三解｜恣欲貪謀克害良民之罪",
    category: "嫉妒克害之孽",
    description: "縱容私心嫉妒、奪人前程以自保；結下深重同行嫉恨之惡業，當依正統科儀釋解。"
  },
  {
    id: "sin-w-04",
    factNumber: "事實 04",
    factTitle: "拿生命當籌碼操縱至親感情",
    factSummary: "明知過敏性休克可能致死，仍藏匿急救針賭命演戲，以性命勒索父母關愛。",
    sinName: "十一解｜語言詭譎德行偏和之罪",
    category: "偏執妄為之罪",
    description: "心行偏狹、以命索愛，玩弄至親骨肉之焦慮與痛楚；心術詭譎結下深重家庭宿怨大結。"
  },
  {
    id: "sin-w-05",
    factNumber: "事實 05",
    factTitle: "挑鬆禮服製造遭破壞假象",
    factSummary: "以拆線刀人為挑斷內線製造後台遭黑手破壞假象，哄騙大眾同情與媒體關注。",
    sinName: "卅二解｜欺妄言語哄騙痴愚之罪",
    category: "欺妄巧飾之愆",
    description: "巧設偽證、博取天下人虛妄之同情，口意行皆陷於妄業；需以赤誠發露懺悔洗滌欺妄心垢。"
  },
  {
    id: "sin-w-06",
    factNumber: "事實 06",
    factTitle: "精算比賽前後住院暗騙外界",
    factSummary: "長年以自殘與虛假病痛精算時機，以此掩飾壓力並勒索他人之陪伴與注意。",
    sinName: "十二解｜心如蛇蠍明瞞暗騙之罪",
    category: "瞞天欺世之罪",
    description: "心機重重、明瞞暗騙，令愛己護己之父母醫護深陷憂戚；此等深重業力，唯有至心懺悔方得解開。"
  }
];

const CASE_02_PROMO: typeof PROMO_EVENT_INFO = {
  badge: "台中廣天宮 · 財神開基祖廟",
  title: "【解冤釋結｜人生課題推理展】",
  subTitle: "解冤釋結 · 消除宿世愆尤 · 轉運賜財",
  description: "每個人心中，都有一個難以解開的罪結與遺憾。想親體驗更多懸疑推理與解冤釋結的震撼反轉嗎？藉由正統科儀解冤釋結、虔心懺悔，方能化消累劫冤愆，迎祥納福、轉運賜財。",
  buttonText: "前往法會報名",
  defaultUrl: "https://www.gtg.org.tw/signup-detail/xiayuan-1"
};

export const CASE_02_WINGS: CaseDossier = {
  id: 'case-02',
  slug: 'wings',
  aliases: ['wings', 'case2', '2', 'butterfly', 'shihhan'],
  caseCode: 'CR-2026-1005',
  badgeText: '懸案 02 · 豪門密室心計',
  mainTitle: '《檢方偵查報告書：折翅的蝴蝶》',
  titleEn: 'THE BROKEN WINGS',
  subTitle: '頂尖鋼琴家自毀疑雲',
  tagline: '後台VIP室急性休克、右手重創與禮服爆裂，是遭人暗算還是病態奪愛？',
  shortDescription: '國際巡演前夕，鋼琴家林詩涵右手遭重琴蓋壓傷、引發嚴重過敏休克。現場扣押六大矛盾物證，直指一場以生命為賭注的自殘心計。',
  targetPhoto: wingsPianistImg,
  targetPhotoCaption: 'TARGET PHOTO // 鋼琴家·林詩涵',
  themeStyle: {
    accentColor: 'amber',
    boardBorder: 'border-[#c4b195]',
    badgeBg: 'bg-stone-900 text-amber-200 border border-amber-400/40',
    cardBorderHighlight: 'border-red-700 ring-red-700/25',
    vignetteGradient: 'from-[#120e0a]/40 via-[#120e0a]/65 to-[#120e0a]/85'
  },
  summary: CASE_02_SUMMARY as any,
  evidence: CASE_02_EVIDENCE,
  quiz: CASE_02_QUIZ,
  confession: CASE_02_CONFESSION,
  sins: CASE_02_SINS,
  promo: CASE_02_PROMO
};

export const ALL_CASES: CaseDossier[] = [
  CASE_01_ACHENG,
  CASE_02_WINGS
];

export function getCaseBySlugOrAlias(param: string | null | undefined): CaseDossier | null {
  if (!param) return null;
  const clean = param.trim().toLowerCase();
  for (const c of ALL_CASES) {
    if (c.id === clean || c.slug === clean || c.aliases.includes(clean)) {
      return c;
    }
  }
  return null;
}
