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
  targetPhoto: 'https://github.com/user-attachments/assets/2bdd9a5d-ee61-4342-8de1-9ea2e831ad8e',
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
    "本案發生於國際巡迴獨奏會前夕，後台專屬休息室。",
    "頂尖鋼琴家林詩涵在登台前突然爆發急性過敏休克、右手重創且禮服遭破壞。",
    "現場留有同門師妹送來的雛菊花束與多項極度矛盾之現場證物，檢方已扣押現場六大物證，請進行案情論證……"
  ],
  leadInvestigator: "地方檢察署 重案特偵組檢察官",
  incidentDate: "2026 年 10 月 5 日 晚間 19:15",
  incidentLocation: "國家音樂廳後台 · 專屬休息琴房",
  mainSuspicion: "右手嚴重受創但左手完全無傷，且致命花束與過敏急救針之時機極度異常",
  missingPerson: "林詩涵（28歲，國際知名青年鋼琴演奏家）"
};

const CASE_02_EVIDENCE: EvidenceItem[] = [
  {
    id: "evidence-w-01",
    code: "物證 01",
    type: "重型琴蓋",
    name: "單側重傷的右手（重型琴蓋）",
    image: 'https://github.com/user-attachments/assets/0b7c5fb5-981a-4fc9-9499-8794cfde65fa',
    locationFound: "音樂廳後台休息室 鋼琴鍵盤",
    sinTag: "二十解｜宿世今生故作誤為之罪",
    clueNote: "詩涵右手韌帶被重型琴蓋壓傷，無法登台，左手完全沒有防禦性傷口。",
    explanationPoints: [
      "琴蓋內側採集到詩涵左手的抓拉指紋，受力方向為由內向下滑動。",
      "右手韌帶嚴重挫裂傷但左手完全無傷，受力型態與外力襲擊完全相悖。"
    ],
    speculationPoints: [
      "詩涵將右手單獨放在琴鍵上，左手抓住琴蓋往下拉，親手壓傷右手。",
      "藉此製造後台遭外人襲擊之假象，行自殘嫁禍之實。"
    ]
  },
  {
    id: "evidence-w-02",
    code: "物證 02",
    type: "化妝包工具",
    name: "撕裂的高訂禮服（化妝包拆線刀）",
    image: 'https://github.com/user-attachments/assets/02322a84-4c6e-45bc-b5d0-733a9edfef0f',
    locationFound: "化妝包內夾層 與 禮服腰部接縫處",
    sinTag: "卅二解｜欺妄言語哄騙痴愚之罪",
    clueNote: "高訂禮服腰部縫線被撕裂，短時間無法修補穿著。",
    explanationPoints: [
      "禮服內側接縫的線頭，有等距離被挑斷的痕跡。",
      "詩涵化妝包裡的拆線刀，沾有同色蠶絲纖維。"
    ],
    speculationPoints: [
      "有人事先用拆線刀挑鬆內線，讓禮服一活動就撕裂。",
      "破壞痕跡工整又刻意，像是人為製造的「禮服遭惡意破壞」假象。"
    ]
  },
  {
    id: "evidence-w-03",
    code: "物證 03",
    type: "過敏致病源",
    name: "雛菊花束（過敏休克）",
    image: 'https://github.com/user-attachments/assets/8bb3018b-13ef-49ec-adab-639960a0012b',
    locationFound: "休息室旁茶几上的花籃",
    sinTag: "十六解｜教唆詞訟誣害陷害之罪",
    clueNote: "師妹送來的雛菊花束，導致詩涵爆發嚴重過敏性休克、喉頭水腫。",
    explanationPoints: [
      "調閱病歷顯示詩涵早就存有菊科過敏史。",
      "師妹表示是聽大學系上友人轉述詩涵「最愛雛菊」才送花。"
    ],
    speculationPoints: [
      "詩涵是否曾向系上朋友透露這個「喜好」，讓不知情的師妹送來花束？",
      "會不會是故意讓師妹送來過敏原，好讓眾人懷疑師妹？"
    ]
  },
  {
    id: "evidence-w-04",
    code: "物證 04",
    type: "預藏急救品",
    name: "沙發縫隙的急救針（EpiPen）",
    image: 'https://github.com/user-attachments/assets/970e574f-0955-4f62-98d6-4e188b2a0b74',
    locationFound: "休息室沙發靠背深層縫隙",
    sinTag: "十一解｜語言詭譎德行偏和之罪",
    clueNote: "混亂過後收拾休息室，警方在沙發靠背縫隙深處尋獲使用過的 EpiPen 急救針。",
    explanationPoints: [
      "針上採到詩涵的指紋與皮膚組織殘留。",
      "針筒已使用過，符合急性休克的急救處置。"
    ],
    speculationPoints: [
      "詩涵隨身帶著 EpiPen，花粉過敏發作後及時打針保命。",
      "慌亂中塞進沙發縫隙，拿性命當賭注演這場自導自演的局。"
    ]
  },
  {
    id: "evidence-w-05",
    code: "物證 05",
    type: "隨身行李密件",
    name: "貼紙藥袋與筆記（行李箱木盒）",
    image: 'https://github.com/user-attachments/assets/6e8048dd-2d66-4551-98f1-e3346f8482a7',
    locationFound: "休息室私人隨身行李箱內之木盒",
    sinTag: "十三解｜恣欲貪謀克害良民之罪",
    clueNote: "隨身行李中搜出木盒，裡面全是歷年各大醫院藥袋，用紙膠帶貼好寫著父母留下來陪她的紀錄。",
    explanationPoints: [
      "藥袋上記著每次住院的時間，以及父母當時的溫柔反應。",
      "筆記寫著：「媽媽留下來陪我 3 小時」、「爸爸摸了我的頭」。"
    ],
    speculationPoints: [
      "得獎後父母的關心很快消退，記著「父母溫柔」的藥袋，才是她最珍視的戰利品。",
      "為了喚回那份短暫的溫柔，她不惜用極端手段，換取父母的注意與陪伴。"
    ]
  },
  {
    id: "evidence-w-06",
    code: "物證 06",
    type: "就醫規律",
    name: "比賽與演出前後的住院頻率（健保病歷）",
    image: 'https://github.com/user-attachments/assets/b54c9cd6-37b8-422f-9fcc-bb26b325d024',
    locationFound: "健保就醫紀錄",
    sinTag: "十二解｜心如蛇蠍明瞞暗騙之罪",
    clueNote: "病歷顯示詩涵在重大比賽前夕或得獎慶功過後，常常因急診或受傷住院。",
    explanationPoints: [
      "過往就醫紀錄中，大小表演與比賽前，幾乎都有急診或住院紀錄。",
      "每次診斷多為突發急性病痛、輕度挫傷或過敏，發作時機一再重複。"
    ],
    speculationPoints: [
      "重大比賽與關鍵演出前夕反覆發病，是否有刻意逃避或心理壓力？",
      "這些反覆就醫的時機背後，是否藏著外界沒察覺的反常行為或特定動機？"
    ]
  }
];

const CASE_02_QUIZ: DeductionQuestion[] = [
  {
    id: 1,
    questionNumber: "Q1",
    question: "關於「壓傷的右手與撕裂禮服」：為什麼右手重傷、左手無傷，禮服線頭又被挑斷？",
    options: [
      {
        id: "w-q1-a",
        text: "後台黑手強行將詩涵按在鋼琴上，並用剪刀刺破禮服。",
        isCorrect: false
      },
      {
        id: "w-q1-b",
        text: "詩涵用左手拉琴蓋壓傷右手，再用拆線刀挑鬆禮服內線，自導自演遭襲。",
        isCorrect: true
      },
      {
        id: "w-q1-c",
        text: "這是一場純粹的後台意外，琴蓋鬆脫掉落，禮服剛好品質不良。",
        isCorrect: false
      }
    ]
  },
  {
    id: 2,
    questionNumber: "Q2",
    question: "關於「雛菊花束與沙發急救針」：詩涵為何會接觸到過敏的雛菊，急救針又為何塞在沙發深處？",
    options: [
      {
        id: "w-q2-a",
        text: "師妹故意送雛菊誘發過敏陷害詩涵，並把詩涵的急救針塞進沙發深處，意圖使詩涵無法自救。",
        isCorrect: false
      },
      {
        id: "w-q2-b",
        text: "詩涵旁敲側擊讓師妹送來過敏雛菊，因花粉過敏發作後打針保命並藏於沙發，拿性命賭博陷害師妹。",
        isCorrect: true
      },
      {
        id: "w-q2-c",
        text: "詩涵的休克其實與花無關，是當天吃到過敏食物引起的，而急救針是醫護人員急救後留下的。",
        isCorrect: false
      }
    ]
  },
  {
    id: 3,
    questionNumber: "Q3",
    question: "關於「藥袋與住院規律」：詩涵與師妹之間的動機與真相是什麼？",
    options: [
      {
        id: "w-q3-a",
        text: "詩涵欠下巨額賭債，想透過自殘與休克詐領人身保險金。",
        isCorrect: false
      },
      {
        id: "w-q3-b",
        text: "逃避沒得獎的斥責，並在得獎熱度退去後，利用自殘與受害者姿態將父母短暫的關愛無限延長。",
        isCorrect: true
      },
      {
        id: "w-q3-c",
        text: "詩涵其實患有夢遊症，在休息室小睡期間無意識發生了這些意外。",
        isCorrect: false
      }
    ]
  }
];

const CASE_02_CONFESSION = {
  code: "證物 07",
  title: "【證物 07：詩涵隨身行李裡的秘密筆記】",
  subTitle: "隨身行李夾層搜出之親筆告白日記",
  sender: "詩涵 筆",
  letterContent: `對不起，師妹……真的對不起。
妳那麼善良，每次看到我都甜甜地叫我師姐，可我卻利用了妳。 我真的無計可施了……看著大賽結束後的熱度消退，爸爸媽媽的眼神又變得冰冷，我好害怕再次被他們拋下。我只能再一次選擇傷害我自己，用妳送來的雛菊、用我自己狠心砸碎的手，來換取他們再次回到我的病床邊。
從小到大，我拿了無數座金牌。如果我拿第一名，爸媽只覺得那是理所當然；如果我沒拿第一，迎來的只有冷漠與斥責。
我好累，我真的好累…… 直到有一次我高燒抽搐被送進急診室，我睜開眼睛，看到媽媽抱著我哭，爸爸推掉了所有的跨國會議，整整三天守在我的病床邊摸著我的頭，用我從沒聽過那麼溫柔的聲音跟我說話。
那一刻我才明白，原來只有在我「受傷、垂死、成為可憐受害者」的時候，他們才會真正地看我一眼。
拿自己的命當賭注很危險，但我不在乎。只要能躺在病床上，看著他們焦急關切的眼神、聽著全城媒體同情我的遭遇……這一切痛苦，就全都是值得的。
看著這張寫滿心聲的紙，我突然覺得有點可笑。寫了這麼多又怎樣呢？反正這封信就算真的交給爸爸媽媽，他們大概也只會嫌我添麻煩、連看都不想看一眼吧……又或者說，我根本也沒有勇氣把這封信交給他們。
就讓這些秘密，永遠留在這個鎖起來的木盒裡吧。
詩涵 筆`
};

const CASE_02_SINS: SinAnalysisItem[] = [
  {
    id: "sin-w-01",
    factNumber: "事實 01",
    factTitle: "01. 單側重傷的右手",
    factSummary: "詩涵單獨將右手放在琴鍵上，用左手抓住重型琴蓋往下拉，忍痛自殘壓碎右手，製造後台遭人惡意襲擊的假象。",
    sinName: "二十解｜宿世今生故作誤為之罪",
    category: "故作誤為自毀之愆",
    description: "明知會嚴重傷害自身體膚，仍「故作誤為」、狠心忍痛自殘。"
  },
  {
    id: "sin-w-02",
    factNumber: "事實 02",
    factTitle: "02. 撕裂的高訂禮服",
    factSummary: "詩涵用化妝包裡的拆線刀挑鬆禮服內側接縫，轉身時讓禮服自然爆開，用偽造的物件破壞哄騙外界同情。",
    sinName: "卅二解｜欺妄言語哄騙痴愚之罪",
    category: "欺妄巧飾哄騙之愆",
    description: "用精心偽造的物件破壞與言語假象，哄騙並操縱大眾與媒體的同情。"
  },
  {
    id: "sin-w-03",
    factNumber: "事實 03",
    factTitle: "03. 雛菊花束與過敏休克",
    factSummary: "詩涵明知自己對菊科嚴重過敏，卻旁敲側擊透過音樂系共同朋友轉告師妹自己「最愛雛菊」，故意深吸誘發休克，陷害善意送花的師妹「送毒花害人」。",
    sinName: "十六解｜教唆詞訟誣害陷害之罪",
    category: "設計誣害陷害之愆",
    description: "引導並設計虛假圈套，故意陷害並誣告無辜善意的同門師妹。"
  },
  {
    id: "sin-w-04",
    factNumber: "事實 04",
    factTitle: "04. 沙發縫隙的急救針（EpiPen）",
    factSummary: "詩涵隨身攜帶過敏處方急救針，深吸花粉後在大腿紮一針保命，並將針塞入沙發縫隙，拿自己的性命與身體當作操縱情感的賭注。",
    sinName: "十一解｜語言詭譎德行偏和之罪",
    category: "偏執妄為賭命之罪",
    description: "心理與行為高度偏執扭曲，將自己的生命與身體當作操縱他人情感的賭注。"
  },
  {
    id: "sin-w-05",
    factNumber: "事實 05",
    factTitle: "05. 貼滿紙膠帶的藥袋木盒",
    factSummary: "琴房暗櫃木盒裡收納著歷年藥袋，用紙膠帶精心貼好並記錄父母在病床邊的溫柔反應。為了滿足對關愛的病態貪謀，不惜毀掉無辜師妹的前途與清白。",
    sinName: "十三解｜恣欲貪謀克害良民之罪",
    category: "病態貪謀克害之孽",
    description: "為了滿足自身對關愛的病態貪謀，不惜陷害與克害無辜良民（師妹）。"
  },
  {
    id: "sin-w-06",
    factNumber: "事實 06",
    factTitle: "06. 比賽前後的住院規律",
    factSummary: "健保病歷顯示她長期精算心理時機，重大比賽前夕生病能逃避壓力，得獎慶功後生病能延長父母短暫的關注，長期用虛假傷病暗中欺騙外界。",
    sinName: "十二解｜心如蛇蠍明瞞暗騙之罪",
    category: "蛇蠍心計欺瞞之罪",
    description: "外表高雅完美，內心精明算計，長期用虛假傷病明瞞暗騙至親與外界。"
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
  tagline: '後台休息室急性休克、右手重創與禮服遭破壞，是遭人暗算還是病態奪愛？',
  shortDescription: '國際巡演前夕，鋼琴家林詩涵右手遭重琴蓋壓傷、引發嚴重過敏休克。現場扣押六大矛盾物證，直指一場以生命為賭注的自殘心計。',
  targetPhoto: 'https://github.com/user-attachments/assets/fd3cfd5a-576c-4d16-b302-1492a71bfaa3',
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

export const ADMIN_SECRET_CODES = ['gtg2026', 'admin', 'manage'];

export function isAdminCode(param: string | null | undefined): boolean {
  if (!param) return false;
  return ADMIN_SECRET_CODES.includes(param.trim().toLowerCase());
}

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
