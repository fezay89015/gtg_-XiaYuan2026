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
  clueNote: string;
  explanationPoints: string[];
  speculationPoints: string[];
  sinTag?: string;
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
  subTitle: "案件代號：消失的阿誠叔",
  caseCode: "CR-2026-0930",
  classification: "極機密 // 檢察官內部偵查",
  briefLines: [
    "深夜透天民宅竄出惡火，火勢詭異地僅侷限於單一臥室。",
    "房內陳設嚴重灼燒炭化，但灰燼中未檢出任何人類骨骼或生理殘留。",
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
    name: "高規格防火漆",
    image: "https://github.com/user-attachments/assets/385ea4fd-3229-40d8-9ad1-6c3f5dd3e0c5",
    locationFound: "二樓臥室與隔壁房的隔間牆內層",
    sinTag: "四解｜起意謀害傷命之罪",
    clueNote: "塗料耐熱逾120分鐘，火場外牆毫髮無傷，是誰事先漆好的？",
    explanationPoints: [
      "臥室燒毀嚴重，但隔間牆內層塗有高規格防火漆。",
      "火勢被精確圍堵於單一房間。"
    ],
    speculationPoints: [
      "全屋僅自己房間未使用，起火是有計畫的「定點焚屋」。",
      "猜測目的是燒掉自己的東西，並確保其他房間安全無虞。"
    ]
  },
  {
    id: "evidence-02",
    code: "線索 02",
    type: "監視影像",
    name: "火場翻窗黑影",
    image: "https://github.com/user-attachments/assets/3818de33-6639-40f0-9642-c4020207a280",
    locationFound: "後巷私人監視器（23:48:12）",
    sinTag: "八解｜拋離父母棄養之罪",
    clueNote: "黑影身手敏捷，跟平日百公斤的阿城完全相反？",
    explanationPoints: [
      "窗口冒出濃煙時，監視器拍到黑影翻出窗台，借雨遮輕巧落地。",
      "落地後 3 秒內就消失在暗巷，動作俐落，無跌撞痕跡。"
    ],
    speculationPoints: [
      "鄰居都說阿城體態臃腫病弱，但逃出的人卻身手俐落。",
      "檢方研判逃逸者即為阿城本人，平日遲緩形象實為刻意扮演。"
    ]
  },
  {
    id: "evidence-03",
    code: "物證 03",
    type: "起獲物證",
    name: "爸爸代保管的舊木箱",
    image: "https://github.com/user-attachments/assets/de752d2d-3d7c-4b22-8956-2554529214e3",
    locationFound: "一樓儲藏室深處，威仔父親保管的老皮木箱",
    sinTag: "七解｜故失傷殘良民之罪",
    clueNote: "小號西裝加拳擊手套，阿城以前是格鬥高手？",
    explanationPoints: [
      "箱內有小尺寸西裝、真皮拳擊手套和地下擂台冠軍照。",
      "裝備磨損很深，跟阿城現在的臃腫外貌差很多。"
    ],
    speculationPoints: [
      "阿城早年是格鬥高手，真實體型並不胖。",
      "證實寄宿十餘年期間，長年透過特定手法刻意掩蓋其真實體態。"
    ]
  },
  {
    id: "evidence-04",
    code: "物證 04",
    type: "微物採樣",
    name: "修容筆與窗框擦痕",
    image: "https://github.com/user-attachments/assets/dc4dc2b9-0f42-4fc3-8333-cb1bb3b4597b",
    locationFound: "逃生窗框金屬角、外側雨遮縫隙",
    sinTag: "廿六解｜巧言誑騙欺世之罪",
    clueNote: "窗框深褐色油膏＝修容筆！阿城的雙下巴難道是畫的？",
    explanationPoints: [
      "窗框刮到深褐色油膏，雨遮上找到一支磨損的修容筆。",
      "檢驗結果：油膏成分與修容筆 100% 吻合。"
    ],
    speculationPoints: [
      "翻窗時流汗又刮蹭，臉上的假陰影被蹭掉了。",
      "阿城叔的「肥厚雙下巴」，其實是每天用修容筆畫出來的易容。"
    ]
  },
  {
    id: "evidence-05",
    code: "線索 05",
    type: "可疑行蹤",
    name: "巷口打探的黑衣人",
    image: "https://github.com/user-attachments/assets/de483f88-00f9-4233-8966-4e2a598140b8",
    locationFound: "社區路口超商與巷道交界的監視器（18:20）",
    sinTag: "五解｜鬥訟結仇構怨之罪",
    clueNote: "黑道持阿城以前的精瘦舊照到處打探，仇家已經找到家門口！",
    explanationPoints: [
      "起火當天傍晚，兩名黑衣男子拿照片向攤商打聽阿城。",
      "比對後確認，照片中的人就是多年前體格精瘦的阿城。"
    ],
    speculationPoints: [
      "這些人是黑道堂口的人，仇家已經找到阿城藏匿的社區。",
      "阿城發現行蹤曝光，知道危險會波及收留他的一家人。"
    ]
  },
  {
    id: "evidence-06",
    code: "線索 06",
    type: "通聯紀錄",
    name: "起火前通話紀錄",
    image: "https://github.com/user-attachments/assets/a38e044f-9d2f-43c4-8878-b1ffc8b7644c",
    locationFound: "後巷垃圾桶內的拋棄式預付卡手機",
    sinTag: "卅一解｜不念劬勞不報深恩之罪",
    clueNote: "『這筆債我自己會還，休想牽連到我的家人。』縱火假死是為了保護家人？",
    explanationPoints: [
      "近日內，威仔曾聽過阿城叔非比尋常的通話內容。",
      "起火前一小時，他接到境外加密來電，通話後 SIM 卡就被拔掉。"
    ],
    speculationPoints: [
      "仇家就要殺到，阿城才決定縱火「假死」。",
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
        text: "仇家聘請特種傭兵使用精準燃燒榴彈，自窗外發射定點消滅目標臥室。",
        isCorrect: false
      },
      {
        id: "q1-c",
        text: "阿城預先粉刷了軍用級防火漆，所以火勢只精準燒毀阿城個人房間。",
        isCorrect: true
      }
    ]
  },
  {
    id: 2,
    questionNumber: "Q2",
    question: "窗框上的修容筆油膏擦痕與舊木箱裡的小號西裝代表什麼？",
    options: [
      {
        id: "q2-a",
        text: "阿城過去身材精壯且精通武術，十幾年來的臃腫雙下巴全是修容筆畫出的假象。",
        isCorrect: true
      },
      {
        id: "q2-b",
        text: "阿城曾熱衷於動漫次文化與 Cosplay，長年收藏特製服飾與角色假髮。",
        isCorrect: false
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
        text: "阿城其實是隱姓埋名的臥底刑警，收線在即必須徹底銷毀所有民間生活跡證。",
        isCorrect: false
      },
      {
        id: "q3-b",
        text: "仇家找上門，阿城決定運用縱火專業「假死銷毀身分」，引開殺機以保護家人。",
        isCorrect: true
      },
      {
        id: "q3-c",
        text: "阿城積欠跨國地下博弈巨額賭債，企圖透過製造假死現場詐領高額保險金。",
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

你們看到這封信的時候，這間屋子應該已經燒起來了。別慌，威仔爸媽房間的牆裡我都塗了軍用級防火漆，火燒不過去，你們很安全。

老哥，謝謝你這十幾年的收留。當年我走投無路，你明知我背景不乾淨，什麼都沒問就帶我回家，還讓威仔叫我一聲「阿城叔」。這十幾年，是我這輩子過得最像人的日子。

我瞞了你們太久。年輕時我是黑道裡的「縱火佈局專家」，害過不少人；後來背叛組織逃出來，欠了一身血債。為了躲追殺，我把自己吃胖，每天用修容筆在下巴畫出厚厚的雙下巴。

我原以為這樣能過一輩子，直到上週仇家拿著照片找到這條巷子，我才醒過來：我把危險引到你們身邊了。你們對我那麼好，我絕不能讓那些畜生動你們一根汗毛。

這場火，是我最後一次用我的「專業」。我要燒掉這個房間，還有我這十年來所有的假身分，讓組織以為我已經死在裡面。

威仔，對不起，阿城叔騙了你十幾年。我的胖是假的，雙下巴是假的，連親戚的身分都是假的。但我看著你長大、把你當親生兒子疼，這件事絕對是真的。

阿城 留`
};

export const SINS_ANALYSIS: SinAnalysisItem[] = [
  {
    id: "sin-01",
    factNumber: "事實 01",
    factTitle: "年輕時任黑道縱火佈局專家",
    factSummary: "收錢替幫派策劃縱火惡行，害無辜百姓家破人亡。",
    sinName: "廿四解｜損人利己害眾成家之罪",
    category: "破家害眾之孽",
    description: "為錢財傷人性命，結下重重冤火；需以解冤釋結科儀，解開縱火之冤結。"
  },
  {
    id: "sin-02",
    factNumber: "事實 02",
    factTitle: "跟隨黑幫欺壓良民",
    factSummary: "年少依附暴力幫派，恐嚇、勒索鄉里善良百姓。",
    sinName: "十三解｜恣欲貪謀克害良民之罪",
    category: "橫行殘良之罪",
    description: "放縱私欲、欺凌弱小，種下受人逼迫的果報；需解冤化怨。"
  },
  {
    id: "sin-03",
    factNumber: "事實 03",
    factTitle: "叛離組織，欠下血債",
    factSummary: "背叛幫派、捲走機密資金，留下多年未還的舊帳與仇家。",
    sinName: "卅四解｜無心有意久債未還之罪",
    category: "血債久欠未了",
    description: "無論錢財或性命，久欠不還都會化為冤魄追討；需立願，以正道因緣解開宿債。"
  },
  {
    id: "sin-04",
    factNumber: "事實 04",
    factTitle: "造假身分，欺瞞恩人一家",
    factSummary: "幾十年如一日以假扮愚鈍肥胖，對至親善意行欺妄隱瞞之實。",
    sinName: "卅二解｜欺妄言語哄騙痴愚之罪",
    category: "欺妄隱瞞之愆",
    description: "偽裝外貌、哄騙信任自己的恩人；妄語欺瞞業重，需以誠心自白化解。"
  },
  {
    id: "sin-05",
    factNumber: "事實 05",
    factTitle: "引來仇家，險害恩人全家",
    factSummary: "明知仇家將至，仍隱身收留家庭，險些讓無辜恩人全家淪為殉葬者。",
    sinName: "二十解｜宿世今生故作誤為之罪",
    category: "牽連無辜之業",
    description: "明知有險卻心存僥倖，讓他人因己受難；雖最後以死相護，仍需解冤法會化解生死大結。"
  }
];

export const PROMO_EVENT_INFO = {
  badge: "台中廣天宮 · 財神開基祖廟",
  title: "【金龍如意消災轉運賜財大法會】",
  subTitle: "解冤釋結 · 消除宿世愆尤 · 轉運賜財",
  description: "每個人心中，亦常有難解的罪疚與因果窒礙。藉由正統科儀解冤釋結、虔心懺悔，方能化消累劫冤愆，迎祥納福、轉運賜財。",
  buttonText: "前往法會報名",
  defaultUrl: "https://www.gtg.org.tw/signup-detail/xiayuan-1?fb=20261123"
};
