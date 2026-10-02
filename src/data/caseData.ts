import firePaintImg from '../assets/images/evidence_fire_paint_1790927470943.jpg';
import cctvVaultingImg from '../assets/images/evidence_cctv_vaulting_1790927436854.jpg';
import vintageTrunkImg from '../assets/images/evidence_vintage_trunk_1790927448364.jpg';
import contourPenImg from '../assets/images/evidence_contour_pen_1790927459018.jpg';
import mobsterAlleyImg from '../assets/images/evidence_mobster_alley_1790927482372.jpg';
import burnerPhoneImg from '../assets/images/evidence_burner_phone_1790927495664.jpg';

export interface EvidenceItem {
  id: string;
  code: string;
  type: string;
  name: string;
  image: string;
  locationFound: string;
  explanationPoints: string[];
  speculationPoints: string[];
}

export interface DeductionQuestion {
  id: number;
  questionNumber: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

export interface SinAnalysisItem {
  id: string;
  factNumber: string;
  factTitle: string;
  factSummary: string;
  sinName: string;
  category: string;
  description: string;
}

export const CASE_SUMMARY = {
  mainTitle: "《深夜透天火場離奇蒸發案》",
  subTitle: "案件代號：消失的下顎線",
  caseCode: "CR-2026-0930",
  classification: "極機密 // 檢察官內部偵查",
  briefLines: [
    "深夜透天民宅竄出惡火，火勢詭異地僅侷限於單一臥室。",
    "房內陳設全數炭化，但灰燼中未檢出任何人類骨骼或生理殘留。",
    "同住家人平安脫困，而長年借住於該房的「阿城」卻人間蒸發……"
  ],
  leadInvestigator: "地方檢察署 承辦檢察官",
  incidentDate: "2026 年 9 月 30 日 深夜 23:45",
  incidentLocation: "市郊透天住宅 · 二樓借住臥室",
  mainSuspicion: "烈火未延燒鄰房，亦無任何受困逃生跡象",
  missingPerson: "阿城（42歲，外觀肥胖、行動遲緩）"
};

export const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: "evidence-01",
    code: "物證 01",
    type: "現場物證",
    name: "軍用級防火漆",
    image: firePaintImg,
    locationFound: "二樓臥室與相鄰房之隔間牆內層",
    explanationPoints: [
      "臥室全數炭化全毀，但相鄰隔間牆內層塗有軍規耐高溫阻燃塗料。",
      "耐火阻燃時限達 120 分鐘以上，使火勢被精確圍堵於單一房間。"
    ],
    speculationPoints: [
      "市售民宅極少流通此漆，證實起火係縱火者精心佈局之「定點焚屋」。",
      "旨在徹底銷毀自身物件，同時確保隔壁恩人全家安全無虞。"
    ]
  },
  {
    id: "evidence-02",
    code: "線索 02",
    type: "監視影像",
    name: "火場翻窗黑影",
    image: cctvVaultingImg,
    locationFound: "後巷私人監控攝影機（時間戳 23:48:12）",
    explanationPoints: [
      "窗口竄出濃煙時，監視器拍到黑影翻出窗台、借力雨遮輕巧落地。",
      "該員落地後 3 秒內極速沒入暗巷，動作俐落，無跌撞痕跡。"
    ],
    speculationPoints: [
      "鄰居指稱阿城體態臃腫病弱，但逃逸者展現特勤級爆發力與受身技巧。",
      "檢方研判逃逸者即為阿城本人，平日遲緩形象實為刻意扮演。"
    ]
  },
  {
    id: "evidence-03",
    code: "物證 03",
    type: "起獲物證",
    name: "爸爸代保管的舊木箱",
    image: vintageTrunkImg,
    locationFound: "一樓儲藏室深處，由威仔父親妥善封存之老式皮木箱",
    explanationPoints: [
      "開箱起獲一套 S 號窄身剪裁西裝、真皮拳擊手套及地下擂台冠軍照。",
      "裝備磨損深沉，與阿城平日百公斤臃腫外貌形成極端反差。"
    ],
    speculationPoints: [
      "阿城早年為格鬥頂尖高手，依真實骨架尺寸推算根本並非肥胖體型。",
      "證實寄宿十餘年期間，長年透過特定手法刻意掩蓋其真實體態。"
    ]
  },
  {
    id: "evidence-04",
    code: "物證 04",
    type: "微物採樣",
    name: "防水眉筆與窗框擦痕",
    image: contourPenImg,
    locationFound: "逃生窗框邊緣金屬角及外側雨遮隙縫",
    explanationPoints: [
      "窗框刮取到深褐色油膏；雨遮起獲一支磨損嚴重之極致防水眉筆。",
      "理化檢驗證實，窗框油膏成分與該防水眉筆之深色膏體 100% 吻合。"
    ],
    speculationPoints: [
      "翻窗逃生時因火場高溫出汗劇烈刮蹭，致使面部假陰影脫色剝落。",
      "證實令眾人信以為真的「肥厚雙下巴」，實為每日以防水眉筆手工繪製之易容。"
    ]
  },
  {
    id: "evidence-05",
    code: "線索 05",
    type: "可疑行蹤",
    name: "巷口打探的黑衣人",
    image: mobsterAlleyImg,
    locationFound: "社區路口超商與巷道交界處監視器（時間戳 18:20）",
    explanationPoints: [
      "起火當日傍晚，超商監控錄得兩名黑衣男子持照片向攤商打探阿城。",
      "經影像比對，照片中人物正是多年前體格精瘦之阿城本人。"
    ],
    speculationPoints: [
      "黑衣人具備黑道堂口索命特徵，昔日仇家已精準摸排至恩人家門口。",
      "阿城察覺行蹤洩漏，深知危險即將波及收留他的無辜恩人全家。"
    ]
  },
  {
    id: "evidence-06",
    code: "線索 06",
    type: "通聯紀錄",
    name: "起火前通話紀錄",
    image: burnerPhoneImg,
    locationFound: "後巷廢棄物桶內查獲之拋棄式無記名預付卡手機",
    explanationPoints: [
      "起火前一小時接獲境外加密來電，通話結束後 SIM 卡即被拔除。",
      "證人證實阿城於後巷冰冷警告：「帳我自己還，離這家人遠一點。」"
    ],
    speculationPoints: [
      "通話證實仇家即將殺到，阿城隨即採取極端定點縱火「假死蒸發」。",
      "目的在銷毀身分並將追殺目標誘離此處，全力保全收留恩人家。"
    ]
  }
];

export const DEDUCTION_QUIZ: DeductionQuestion[] = [
  {
    id: 1,
    questionNumber: "Q1",
    question: "為什麼火勢異常集中於阿城房間，隔壁家人房間完全未受波及？",
    options: [
      {
        id: "q1-a",
        text: "阿城暗地在房內提煉高純度易燃化學製劑，因操作不慎引發自體爆燃。",
        isCorrect: false
      },
      {
        id: "q1-b",
        text: "阿城預先粉刷了軍用級防火漆，所以火勢只精準燒毀阿城個人房間。",
        isCorrect: true
      },
      {
        id: "q1-c",
        text: "仇家聘請特種傭兵使用精準燃燒榴彈，自窗外發射定點消滅目標臥室。",
        isCorrect: false
      }
    ]
  },
  {
    id: 2,
    questionNumber: "Q2",
    question: "窗框上的防水眉筆油膏擦痕與舊木箱裡的小號西裝代表什麼？",
    options: [
      {
        id: "q2-a",
        text: "阿城以前曾熱衷於動漫次文化與 Cosplay，長年收藏特製服飾與角色假髮。",
        isCorrect: false
      },
      {
        id: "q2-b",
        text: "阿城過去身材精壯且精通武術，十幾年來的臃腫雙下巴全是眉筆畫出的假象。",
        isCorrect: true
      },
      {
        id: "q2-c",
        text: "阿城暗地裡擔任頂尖特勤易容保鑣，利用特製戲服與化妝接案執行秘密委託。",
        isCorrect: false
      }
    ]
  },
  {
    id: 3,
    questionNumber: "Q3",
    question: "阿城電話嗆聲後放火讓自己憑空蒸發的真實動機為何？",
    options: [
      {
        id: "q3-a",
        text: "阿城積欠跨國地下博弈巨額賭債，企圖透過製造假死現場詐領高額保險金。",
        isCorrect: false
      },
      {
        id: "q3-b",
        text: "仇家找上門，阿城決定運用縱火專業「假死銷毀身分」，引開殺機以保護家人。",
        isCorrect: true
      },
      {
        id: "q3-c",
        text: "阿城其實是隱姓埋名的臥底刑警，收線在即必須徹底銷毀所有民間生活跡證。",
        isCorrect: false
      }
    ]
  }
];

export const EVIDENCE_07_CONFESSION = {
  code: "線索 07",
  title: "【阿城留下的自白信】",
  subTitle: "現場保險耐火暗格中起獲之親筆原信",
  sender: "阿城 留",
  letterContent: `老哥、威仔：

當你們看到這封信的時候，這間屋子應該已經燒起來了。別慌，威仔爸媽房間的牆壁裡面，我都塗了軍用級的防火漆，火絕對燒不過去，你們很安全。

老哥，謝謝你這十幾年來的收留。當年我走投無路，你明知我背景不乾淨，卻什麼都沒問就把我帶回家，讓威仔叫我一聲「阿城叔」。這十幾年，是我這輩子過得最像人、最平靜的日子。

我瞞了你們太久。年輕時我是黑道裡的「縱火佈局專家」，害過無數人；後來我背叛組織逃出來，欠下了一身血債。為了躲追殺，我把自己吃胖，每天出門前花一小時用防水眉筆在下巴畫上厚厚的陰影，畫出雙下巴、改掉了下顎線。

我以為這樣就能過一輩子，直到上週，仇家拿著照片找到這條巷子……我才突然醒過來，我竟然把危險引到了你們身邊。你們對我那麼好，我絕對不能讓那些畜生動你們一根汗毛。

這場火是我最後一次用我的「專業」。我要燒掉這個房間與我這十年來所有的假身分，讓組織以為我已經燒死在裡面。

威仔，對不起，阿城叔騙了你十幾年，我的肥胖是假的、雙下巴是假的、連親戚的身分都是假的。但我看著你長大、把你當親生兒子疼，這件事……絕對是真的。

阿城 留`
};

export const SINS_ANALYSIS: SinAnalysisItem[] = [
  {
    id: "sin-01",
    factNumber: "事實 01",
    factTitle: "年輕時任黑道縱火佈局專家",
    factSummary: "收受幫派酬金四處策劃縱火惡行，導致無辜百姓家破人亡、生靈塗炭。",
    sinName: "廿四解｜損人利己害眾成家之罪",
    category: "破家害眾之孽",
    description: "損害眾人資財性命以肥己，結下千重冤火孽障；當依解冤釋結科儀解破縱火凶煞之冤結。"
  },
  {
    id: "sin-02",
    factNumber: "事實 02",
    factTitle: "隨黑幫堂口肆虐傷害良民",
    factSummary: "少年氣盛依附暴力幫派，巧取豪奪、恐嚇威逼鄉里善良平民百姓。",
    sinName: "十三解｜恣欲貪謀克害良民之罪",
    category: "橫行殘良之罪",
    description: "縱容私欲貪念謀奪弱者、侵害純良；種下世世受逼迫之果報，急需解冤化怨釋結。"
  },
  {
    id: "sin-03",
    factNumber: "事實 03",
    factTitle: "叛離組織欠下江湖血債",
    factSummary: "私自叛逃黑幫並盜走機密資金，積累多年未還之江湖舊帳與致命宿仇。",
    sinName: "卅四解｜無心有意久債未還之罪",
    category: "血債久欠未了",
    description: "世間無論錢財或性命血債，凡久拖未還皆化厲魄追索；需立大願以正道因緣解開宿債結。"
  },
  {
    id: "sin-04",
    factNumber: "事實 04",
    factTitle: "畫假下巴偽裝欺瞞恩人家人",
    factSummary: "十年如一日以防水眉筆描摹雙下巴、假扮愚鈍肥胖，對至親善意行欺妄隱瞞之實。",
    sinName: "卅二解｜欺妄言語哄騙痴愚之罪",
    category: "欺妄隱瞞之愆",
    description: "巧言令色偽飾外貌、哄騙信己至深之親友恩人；口舌意念之妄念深重，需以赤誠自白解此偽業。"
  },
  {
    id: "sin-05",
    factNumber: "事實 05",
    factTitle: "引火涉險險將殺戮帶入恩人家門",
    factSummary: "明知昔日索命仇家即將殺到，卻隱身收留家庭，險些讓無辜恩人全家淪為殉葬者。",
    sinName: "二十解｜宿世今生故作誤為之罪",
    category: "牽連無辜之業",
    description: "明知險厄仍心存僥倖、因己之私致他人陷於萬劫深淵；雖最後以死相護，仍需行解冤法會化消生死大結。"
  }
];

export const PROMO_EVENT_INFO = {
  badge: "台中廣天宮 · 財神開基祖廟",
  title: "【金龍如意消災轉運賜財大法會】",
  subTitle: "解冤釋結 · 消除宿世愆尤 · 轉運賜財",
  description: "阿城一生為惡多端，雖以死保全恩人，但累世因果冤結與宿債仍在。每個人心中，亦常有難解的罪疚與因果窒礙。藉由正統科儀解冤釋結、虔心懺悔，方能化消累劫冤愆，迎祥納福、轉運賜財。",
  buttonText: "👉 前往法會報名系統",
  defaultUrl: "https://www.gtg.org.tw/signup-detail/xiayuan-1"
};
