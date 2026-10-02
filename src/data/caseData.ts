import firePaintImg from '../assets/images/evidence_fire_paint_1790927470943.jpg';
import cctvVaultingImg from '../assets/images/evidence_cctv_vaulting_1790927436854.jpg';
import vintageTrunkImg from '../assets/images/evidence_vintage_trunk_1790927448364.jpg';
import contourPenImg from '../assets/images/evidence_contour_pen_1790927459018.jpg';
import mobsterAlleyImg from '../assets/images/evidence_mobster_alley_1790927482372.jpg';
import burnerPhoneImg from '../assets/images/evidence_burner_phone_1790927495664.jpg';

export interface EvidenceItem {
  id: string;
  code: string; // e.g. "證物 01"
  name: string; // e.g. "國防級防火漆"
  image: string;
  locationFound: string; // 地點
  explanation: string; // 上層：說明 (鑑識發現與客觀調查)
  speculation: string; // 下層：推測 (幾乎完美的解析，以警方檢方角度敘述)
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
    code: "證物 01",
    name: "國防級防火漆",
    image: firePaintImg,
    locationFound: "透天住宅二樓 隔壁房間與走廊隔間牆內層",
    explanation: "鑑識小組勘驗火場，發現阿城房間內部裝潢與家具全數炭化焚毀，但相鄰的威仔父母房及走廊牆壁內部，卻塗抹了軍工航太規格之「國防級耐熱膨脹型防火塗料」，有效耐火時限長達 120 分鐘以上，火勢完全被精準圍堵於單一房間內。",
    speculation: "此特種防火塗料市面民宅極少流通，且塗布工法精密專業，顯示起火點並非意外失火，而是縱火者精心計算燃燒路徑的「精準定點縱火」。縱火者唯一目的在於徹底銷毀自己房間內的一切身分痕跡，同時竭盡全力確保同住家屬人身安全無虞。"
  },
  {
    id: "evidence-02",
    code: "證物 02",
    name: "火場翻窗黑影",
    image: cctvVaultingImg,
    locationFound: "透天後巷私人監控攝影機（時間戳 23:48:12）",
    explanation: "火場二樓窗口竄出濃煙之際，後巷監視器捕捉到一黑色矯健身影自窗台翻出，單手支撐鐵皮雨遮輕巧借力後縱身落地，在不足 3 秒內疾馳消失於巷道陰影中，地面無任何失足或跌撞痕跡。",
    speculation: "平日鄰居與家屬筆錄均指稱阿城年過四十、體態臃腫且行動遲緩病弱；然而畫面中逃生者展現出極高之軀幹平衡力、核心爆發力與受身技巧，完全符合受過高強度搏擊或軍警特勤訓練之人體力學特徵，平日之「發福遲緩」形象疑為刻意扮演之假象。"
  },
  {
    id: "evidence-03",
    code: "證物 03",
    name: "爸爸代保管的舊木箱",
    image: vintageTrunkImg,
    locationFound: "一樓儲藏室深處，由威仔父親妥善封存之老式皮木箱",
    explanation: "鑑識人員持搜索票解鎖該陳年厚重木箱，箱內整齊收納一套 S 號極為貼身的剪裁西裝、一雙磨損嚴重的 Everlast 專業真皮拳擊手套，以及數張十年前地下搏擊擂台冠軍照。",
    speculation: "受害者阿城青年時期實為精通綜合格鬥之精壯武術高手。從合身衣物與拳套骨架尺寸推算，其真實骨架身形根本不可能是重達上百公斤的重度肥胖者，證實其寄宿該家庭十餘年間，長期利用特定手法遮蔽或重塑體型。"
  },
  {
    id: "evidence-04",
    code: "證物 04",
    name: "防水修容筆與窗框擦痕",
    image: contourPenImg,
    locationFound: "二樓臥室逃生窗框邊緣及外側雨遮接縫處",
    explanation: "窗框金屬轉角處刮取到高濃度油脂性深色膏狀殘留物，外側雨遮接縫處尋獲一支黑色金屬管身之「極致防水雙頭陰影修容棒」。經刑事局理化檢驗，窗框油膏成分與該修容棒完全吻合。",
    speculation: "修容棒磨損程度極高，顯示係常態性高頻率使用。結合窗框擦痕分析，逃生者於火場翻窗時因高溫大量出汗與金屬劇烈蹭擦，導致頸部與下顎線兩側的假陰影妝容剝落脫色。阿城十幾年來令人印象深刻的「雙下巴與鬆垮臉頰」，實為每日以專業影視彩妝技巧手工描摹出的精巧易容。"
  },
  {
    id: "evidence-05",
    code: "證物 05",
    name: "巷口打探的黑衣人",
    image: mobsterAlleyImg,
    locationFound: "社區路口超商與巷弄交界處監視器（時間戳 18:20）",
    explanation: "火警發生當天傍晚 18:20 許，路口超商監控錄得兩名身著黑雨衣、神態兇戾之可疑男子，反覆向周邊雜貨攤販出示一張泛黃照片，照片人物正是多年前身形精瘦的阿城，並低聲探詢其出沒規律。",
    speculation: "此二人具備顯著幫派堂口討債或尋仇特徵。證實阿城多年前結怨之仇家勢力已突破盲區、精準摸排至此處透天住宅。受害人平日極深居簡出，一旦發現行蹤暴露，必然明白危險即將波及收留他的無辜恩人全家。"
  },
  {
    id: "evidence-06",
    code: "證物 06",
    name: "起火前通話紀錄",
    image: burnerPhoneImg,
    locationFound: "後巷廢棄物桶內查扣之拋棄式無記名預付卡手機",
    explanation: "火災發生前約一小時（22:45），該拋棄式手機接獲一通來自境外加密跳板之衛星來電。後巷目擊證人筆錄證實，曾聽聞阿城以極度冷靜且具壓迫感的語氣警告話筒彼端：「帳我自己還，離這家人遠一點。」隨後將通話切斷並拔除 SIM 卡。",
    speculation: "通話語氣證明阿城與追殺者之間存在無可調和的昔日恩怨。受害者深知仇家手段殘酷，絕不會放過收留他的屋主全家。為阻止仇家踏入家門，其於接獲通話後立即採取極端反制措施，以縱火「假死」引開追殺目標。"
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
        text: "阿城不小心引燃易燃物，消防隊及時撲滅。",
        isCorrect: false
      },
      {
        id: "q1-b",
        text: "阿城預先塗抹國防級防火漆保護家人，精準燒毀自己房間物證。",
        isCorrect: true
      },
      {
        id: "q1-c",
        text: "仇家放火尋仇，剛好只燒到一間房間。",
        isCorrect: false
      }
    ]
  },
  {
    id: 2,
    questionNumber: "Q2",
    question: "窗框上的修容膏擦痕與舊木箱裡的小號西裝代表什麼？",
    options: [
      {
        id: "q2-a",
        text: "阿城最近迷上影視特效化妝與 Cosplay。",
        isCorrect: false
      },
      {
        id: "q2-b",
        text: "阿城身材精壯且精通武術，十幾年來的雙下巴全是用彩妝畫出來的偽裝。",
        isCorrect: true
      },
      {
        id: "q2-c",
        text: "阿城打算把舊衣服拿去二手拍賣。",
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
        text: "他欠下巨額賭債，想放火詐領保險金逃跑。",
        isCorrect: false
      },
      {
        id: "q3-b",
        text: "仇家找上門，他決定用縱火專業「假死銷毀身分」，引開仇恨以保護家人。",
        isCorrect: true
      }
    ]
  }
];

export const EVIDENCE_07_CONFESSION = {
  code: "證物 07",
  title: "【阿城留下的自白信】",
  subTitle: "現場保險耐火暗格中起獲之親筆原信",
  sender: "阿城 留",
  letterContent: `老哥、威仔：

當你們看到這封信的時候，這間屋子應該已經燒起來了。別慌，威仔爸媽房間的牆壁裡面，我都塗了國防級的防火漆，火絕對燒不過去，你們很安全。

老哥，謝謝你這十幾年來的收留。當年我走投無路，你明知我背景不乾淨，卻什麼都沒問就把我帶回家，讓威仔叫我一聲「阿城叔」。這十幾年，是我這輩子過得最像人、最平靜的日子。

我瞞了你們太久。年輕時我是黑道裡的「縱火佈局專家」，害過無數人；後來我背叛組織逃出來，欠下了一身血債。為了躲追殺，我把自己吃胖，每天出門前花一小時用彩妝在下巴畫上厚厚的陰影，畫出雙下巴、改掉了下顎線。

我以為這樣就能過一輩子，直到上週，仇家拿著照片找到這條巷子……我才突然醒過來，我竟然把危險引到了你們身邊。你們對我那麼好，我絕對不能讓那些畜生動你們一根汗毛。

這場火是我最後一次用我的「專業」。我要燒掉這個房間與我這十年來所有的假身分，讓組織以為我已經燒死在裡面。

威仔，對不起，阿城叔騙了你十幾年，我的肥胖是假的、雙下巴是假的、連親戚的身分都是假的。但我看著你長大、把你當親生兒子疼，這件事……絕對是真的。

阿城 留`
};

export const SINS_ANALYSIS = [
  {
    sinName: "廿四解｜損人利己害眾成家之罪",
    category: "年輕縱火害人",
    description: "年輕時身為黑道縱火佈局專家，曾造成無數家庭破裂與災厄，種下無邊宿怨之罪業。"
  },
  {
    sinName: "十三解｜恣欲貪謀克害良民之罪",
    category: "黑道時期傷害良民",
    description: "隨黑道幫派橫行鄉里，侵奪善良百姓安寧，為非作歹所積累之暴行深結。"
  },
  {
    sinName: "卅四解｜無心有意久債未還之罪",
    category: "背叛組織欠下血債",
    description: "私自脫離組織出走，背負組織反撲與無可化解的江湖血債，久未了結。"
  },
  {
    sinName: "卅二解｜欺妄言語哄騙痴愚之罪",
    category: "繪製假雙下巴欺瞞家人",
    description: "十年如一日以防水修容膏描摹雙下巴、偽裝遲鈍發福，對至親善意行欺妄隱瞞之實。"
  },
  {
    sinName: "二十解｜宿世今生故作誤為之罪",
    category: "將仇家風險引至恩人家",
    description: "明知仇家仍在四處索命，卻寄居於善良收留者之家，令無辜恩人全家涉入殺機險境。"
  }
];

export const PROMO_EVENT_INFO = {
  badge: "檢方特偵結案聯名 · 沉浸式實境體驗",
  title: "【解冤釋結｜人生課題推理展】",
  description: "每個人心中，都有一個難以解開的罪結與遺憾。想親體驗更多懸疑推理與解冤釋結的震撼反轉嗎？",
  buttonText: "👉 即刻報名體驗活動",
  defaultUrl: "https://example.com/register"
};
