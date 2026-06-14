export const AVATARS = [
  "😺", "🐶", "🐼", "🐨", "🦁",
  "🦊", "🐰", "🐸", "🐙", "🦄",
];

export interface MockQuestion {
  id: number;
  scene: "普通场景" | "压力场景";
  title: string;
  content: string;
}

export interface MockEvaluation {
  score: number;
  strengths: string[];
  weaknesses: string[];
  reference: string[];
  tip: string;
}

// 题目变体 + 专属点评 一一对应
interface QuestionVariant {
  question: MockQuestion;
  evaluation: MockEvaluation;
}

// 6个场景，每个场景3个变体，共18题
export const QUESTION_VARIANTS: QuestionVariant[][] = [
  // 场景1：普通场景 - 帮忙请求类
  [
    {
      question: {
        id: 1,
        scene: "普通场景",
        title: "同事请你帮忙做PPT",
        content: "你的同事小李经常在工作时间找你聊天，今天他又过来说：「晚上帮我做个PPT吧，我对这个不太熟。」你手头本身也很忙，该怎么回应？",
      },
      evaluation: {
        score: 7,
        strengths: ["回应语气较为温和，没有生硬拒绝", "尝试解释了当前的工作状态"],
        weaknesses: ["没有给出具体的替代方案", "边界感不够明确，容易被继续请求"],
        reference: [
          "「我今晚确实要赶自己的方案，不过我可以把之前做PPT的模板发给你，应该能帮上忙。」",
          "「这个周末我可能有点时间，你先列出大纲，咱们到时候快速过一遍？」",
        ],
        tip: "设置边界时，「理由+替代方案」的组合更有说服力，让对方感受到你的诚意而非敷衍。",
      },
    },
    {
      question: {
        id: 1,
        scene: "普通场景",
        title: "室友让你带饭",
        content: "合租室友几乎每天让你下班带饭，今天又说：「帮我带份盖浇饭回来，我懒得下楼了。」你刚加完班很累，该怎么回应？",
      },
      evaluation: {
        score: 7,
        strengths: ["表达了自身疲惫的状态，理由真实可信", "没有一味迁就对方的习惯性请求"],
        weaknesses: ["语气可能略显生硬，缺少缓冲", "没有提出长期解决这个问题的方案"],
        reference: [
          "「今天加班太累了，实在不想绕路。要不咱们周末一起去超市囤点速食？这样你也不用天天等外卖。」",
          "「我今天直接回家休息了。你试试手机点餐，现在半小时就能送到，比我带回来还快。」",
        ],
        tip: "面对习惯性请求，「当下拒绝+长期替代方案」比每次都找借口更有效果，也能改善关系。",
      },
    },
    {
      question: {
        id: 1,
        scene: "普通场景",
        title: "亲戚找你修电脑",
        content: "远房表叔发来微信：「你学计算机的吧？帮我远程看一下电脑，开不了机了。」你其实并不擅长硬件维修，该怎么回应？",
      },
      evaluation: {
        score: 6,
        strengths: ["诚实表达了自己的能力边界", "没有不懂装懂，避免造成更大麻烦"],
        weaknesses: ["直接拒绝可能让对方感到被敷衍", "没有提供任何替代帮助渠道"],
        reference: [
          "「表叔，我学的是软件开发，硬件这块确实不太熟。我帮您查一下附近靠谱的维修店电话，或者您试试品牌官方售后？」",
          "「开不了机原因很多，我没法远程判断。建议您先试试拔掉电源按住开机键30秒放电，不行的话我帮您预约上门维修。」",
        ],
        tip: "被高估能力时，「澄清专业边界+转介到正确渠道」既保护了自己，也真正帮到了对方。",
      },
    },
  ],
  // 场景2：压力场景 - 当众质疑类
  [
    {
      question: {
        id: 2,
        scene: "压力场景",
        title: "当众被质疑方案天真",
        content: "部门会议上，你在汇报方案时，一位资深同事当众说：「你这个想法太理想化了，根本不切实际，我从来没见过这么天真的方案。」大家都在看着，你怎么回应？",
      },
      evaluation: {
        score: 6,
        strengths: ["没有被情绪带跑，保持了一定的冷静", "有尝试维护自己观点的倾向"],
        weaknesses: ["防御性回应较强，缺乏建设性", "没有利用好这个展示机会"],
        reference: [
          "「谢谢您的反馈，确实有些细节需要更务实。能否请您会后指点一下具体哪些部分可以更落地？」",
          "「您提到的理想化问题我也考虑过，这里有个备选方案更保守一些，您看看是否更可行？」",
        ],
        tip: "面对当众质疑，「感谢+请教」的回应既化解对抗，又将压力转化为展示开放心态的机会。",
      },
    },
    {
      question: {
        id: 2,
        scene: "压力场景",
        title: "被客户当众否定",
        content: "项目提案会上，客户方负责人当着双方团队说：「你们这个方案完全不符合我们的需求，我觉得你们根本没理解我们要什么。」全场安静，你怎么回应？",
      },
      evaluation: {
        score: 5,
        strengths: ["没有当场反驳或辩解", "意识到需要先了解客户真实需求"],
        weaknesses: ["回应过于被动，缺少主动引导", "没有展现专业自信，可能让客户更不信任"],
        reference: [
          "「非常抱歉让您有这种感觉，说明我们在需求对齐上确实出了问题。能否请您花5分钟具体说说最核心的三个需求？我们现场调整方向。」",
          "「感谢您的直接反馈，这正是我们开这个会的目的。我们准备了两套方案，看来需要以B方案为主重新讨论。能否请您看看B方案是否更接近您的预期？」",
        ],
        tip: "客户当众否定时，「道歉+请求具体反馈+展示备选」能快速扭转局面，把否定变成深入沟通的机会。",
      },
    },
    {
      question: {
        id: 2,
        scene: "压力场景",
        title: "被领导当众批评",
        content: "周会上，领导突然点名说：「小张，你这周的数据报表出了好几个错，这么基础的工作都做不好，是不是态度有问题？」全组人都在，你怎么回应？",
      },
      evaluation: {
        score: 6,
        strengths: ["没有当场争辩或推卸责任", "态度上表现出愿意改进的意愿"],
        weaknesses: ["回应过于软弱，没有澄清事实", "没有区分「能力问题」和「态度问题」的指责"],
        reference: [
          "「领导，报表出错是我的疏忽，我下午重新核对一遍，下班前提交修正版。另外我想确认一下，是不是数据源接口最近有变动？我排查一下根本原因。」",
          "「感谢您的提醒，这确实不应该。我会后马上检查，同时建立二次校验机制，避免再出现类似问题。能否请您指点一下您发现的主要问题点？」",
        ],
        tip: "被当众批评时，「承认具体错误+立即行动计划+请教改进方向」能把「态度指责」转化为「能力改进」的建设性对话。",
      },
    },
  ],
  // 场景3：普通场景 - 金钱请求类
  [
    {
      question: {
        id: 3,
        scene: "普通场景",
        title: "朋友借钱",
        content: "多年未联系的大学同学突然发来微信：「最近手头紧，能不能借我五千块，下个月还你。」你并不宽裕，该怎么回应？",
      },
      evaluation: {
        score: 8,
        strengths: ["表达真诚，没有编造借口", "给出了合理的拒绝理由"],
        weaknesses: ["回应略显简短，可以适当表达关心"],
        reference: [
          "「不好意思，我最近手头也比较紧，实在帮不上忙。建议你试试XX平台的借款服务，利率比较低。」",
          "「五千块我现在确实拿不出，但几百块可以应急。需要的话我现在转你。」",
        ],
        tip: "拒绝时，「真诚理由+有限帮助」的组合比完全拒绝更让人接受，也维护了关系。",
      },
    },
    {
      question: {
        id: 3,
        scene: "普通场景",
        title: "朋友找你做担保",
        content: "发小打电话说：「我要买房贷款，银行需要担保人，你最靠谱了，帮我签个字呗。」你担心风险，该怎么回应？",
      },
      evaluation: {
        score: 6,
        strengths: ["意识到担保的法律风险", "没有因为情面而草率答应"],
        weaknesses: ["拒绝理由不够具体，可能让对方觉得你在找借口", "没有提供其他替代方案帮助对方"],
        reference: [
          "「兄弟，担保这事涉及法律责任，万一你还不上我得兜底，这风险我实在承担不起。不过我可以帮你问问有没有其他贷款渠道，或者看看能不能增加首付比例减少贷款额。」",
          "「我爸妈之前给人担保吃过亏，所以家里立了规矩不做担保。但我可以帮你梳理一下收入证明，争取提高你自己的贷款额度。」",
        ],
        tip: "拒绝高风险请求时，「明确风险边界+情感支持+替代帮助」既保护了自己，也维护了友谊。",
      },
    },
    {
      question: {
        id: 3,
        scene: "普通场景",
        title: "朋友让你帮忙搬家",
        content: "周末早上，朋友发来消息：「今天搬家，过来帮我搭把手吧，东西不多。」你本已安排了重要的事，该怎么回应？",
      },
      evaluation: {
        score: 7,
        strengths: ["坦诚说明已有安排，没有编造借口", "态度友好，没有让对方感到被冷落"],
        weaknesses: ["没有提供任何替代帮助方式", "如果每次都拒绝，可能影响友谊"],
        reference: [
          "「今天实在抽不开身，有个早就定好的事。不过我帮你叫个搬家公司吧，费用我出一半，比咱们自己搬快多了。」",
          "「我今天去不了，但下周我帮你一起收拾新家，咱们再约个时间？」",
        ],
        tip: "拒绝帮忙时，「说明原因+替代补偿（出钱/改期）」能让对方感受到你的重视，而非敷衍。",
      },
    },
  ],
  // 场景4：压力场景 - 上级施压类
  [
    {
      question: {
        id: 4,
        scene: "压力场景",
        title: "领导临时加任务",
        content: "周五下午，临近下班时领导突然说：「这个方案客户周一要，周末你加加班赶出来吧。」你本已安排好了周末的重要家庭聚会，该怎么回应？",
      },
      evaluation: {
        score: 5,
        strengths: ["意识到需要平衡工作与生活", "有尝试说明自己的安排"],
        weaknesses: ["表达方式偏弱势，容易被继续施压", "没有提出可行的替代时间表"],
        reference: [
          "「领导，周末家庭聚会是早就定好的，家里长辈专门从外地过来。我可以在周五晚上和周一早上各加半天班，确保周一上午提交，您看行吗？」",
          "「我理解这个任务的紧急性。能否把截止时间延到周二？这样我和另一位同事分担一下，周末各出一部分。」",
        ],
        tip: "面对上级施压，「共情+替代方案+时间承诺」比单纯说「不」更容易被接受。",
      },
    },
    {
      question: {
        id: 4,
        scene: "压力场景",
        title: "被要求周末出差",
        content: "周四下午，领导说：「明天临时有个紧急客户要见，你周末去一趟上海吧，周日晚回来。」你周末有重要的家庭活动，该怎么回应？",
      },
      evaluation: {
        score: 6,
        strengths: ["理解任务的紧急性", "没有直接拒绝，而是寻求折中"],
        weaknesses: ["提出的替代方案可能不够具体", "没有评估远程沟通的可行性"],
        reference: [
          "「领导，这个客户确实重要。我查了一下，周五晚上有高铁，我可以周五晚到上海，周六见完客户当天回来，周日家庭活动不耽误。您看这样安排行吗？」",
          "「周末家里确实有重要安排走不开。能否先安排视频沟通？我这边准备充分的材料，如果视频能推进，我可以下周随时过去当面确认。」",
        ],
        tip: "面对出差要求，「时间优化（当天来回）」或「远程替代+后续补位」是两种有效的协商策略。",
      },
    },
    {
      question: {
        id: 4,
        scene: "压力场景",
        title: "被要求接手烂摊子",
        content: "领导把你叫到办公室：「小李的项目做不下去了，你经验丰富，接下来由你接手，下周给出新方案。」你手头已经满负荷，该怎么回应？",
      },
      evaluation: {
        score: 5,
        strengths: ["没有当场抱怨或拒绝", "表现出愿意承担责任的态度"],
        weaknesses: ["没有说明当前工作负荷", "没有争取资源支持或调整其他任务"],
        reference: [
          "「领导，我愿意接下这个项目。但我目前手头有A和B两个项目在进行中，如果同时推进三个，质量可能都受影响。能否把A项目暂时移交给小王？这样我可以全力接手小李的项目。」",
          "「这个项目我可以接，但需要明确几个问题：一是原项目的遗留问题和资料能否这两天整理好给我？二是我需要一位助手协助执行，能否安排人手？三是 deadline 能否延到两周后，确保方案质量？」",
        ],
        tip: "接手额外任务时，「接受+资源要求+时间调整」能避免自己陷入被动，也展现了你统筹规划的能力。",
      },
    },
  ],
  // 场景5：普通场景 - 邻里沟通类
  [
    {
      question: {
        id: 5,
        scene: "普通场景",
        title: "邻居噪音投诉",
        content: "楼上邻居深夜经常发出噪音，你上去善意提醒，对方却说：「我家孩子要练琴，你理解一下。」你怎么回应？",
      },
      evaluation: {
        score: 7,
        strengths: ["态度友善，没有激化矛盾", "提出了合理的协商诉求"],
        weaknesses: ["语气略显犹豫，立场不够坚定", "没有提及具体的解决标准"],
        reference: [
          "「我理解练琴很重要。我们能否约定一个时间，比如晚上九点后就不练了？这样大家都能休息好。」",
          "「孩子练琴是好事，不过晚上十点后确实影响休息。要不周末白天多练会儿，晚上咱们互相体谅一下？」",
        ],
        tip: "邻里沟通中，「理解对方+具体建议+互利共赢」是最有效的策略。",
      },
    },
    {
      question: {
        id: 5,
        scene: "普通场景",
        title: "邻居占用公共区域",
        content: "隔壁邻居把鞋柜、杂物堆在楼道公共区域，你委婉提醒，对方说：「这又不碍你事，大家都这么放的。」你怎么回应？",
      },
      evaluation: {
        score: 6,
        strengths: ["主动沟通而非忍气吞声", "态度平和，没有指责对方"],
        weaknesses: ["回应缺乏说服力，容易被对方反驳", "没有引用具体规定或共同利益"],
        reference: [
          "「不是碍不碍我的事，主要是消防通道不能堆杂物，物业上周才发了整改通知。咱们一起清理一下，我帮您搬？」",
          "「我理解大家东西多没地方放。但万一发生火灾，楼道堵塞会影响逃生。要不咱们一起跟物业申请在楼下加几个储物柜？费用平摊。」",
        ],
        tip: "邻里纠纷中，「引用规则/安全理由+主动提供解决方案」比个人抱怨更有说服力。",
      },
    },
    {
      question: {
        id: 5,
        scene: "普通场景",
        title: "邻居宠物扰民",
        content: "楼下邻居养的大狗经常在深夜吠叫，影响你休息。你上门沟通，对方说：「狗叫是正常的，你戴个耳塞不就行了。」你怎么回应？",
      },
      evaluation: {
        score: 6,
        strengths: ["主动上门沟通，没有直接投诉", "保持了基本的礼貌"],
        weaknesses: ["没有提出具体的解决标准", "容易被对方的敷衍态度带偏"],
        reference: [
          "「我理解狗叫确实不好控制，但每晚持续吠叫已经影响到我第二天的工作了。能否晚上把狗放在里屋，或者试试止吠器？很多养狗的朋友说效果不错。」",
          "「耳塞我试过了，不太管用。其实咱们小区有宠物管理条例，晚上10点后需要控制噪音。我不是要举报，就是想咱们商量个办法，比如晚上把狗送到宠物托管？」",
        ],
        tip: "面对敷衍型邻居，「具体影响描述+可行建议+暗示规则底线」能让对方认真对待你的诉求。",
      },
    },
  ],
  // 场景6：压力场景 - 销售套路类
  [
    {
      question: {
        id: 6,
        scene: "压力场景",
        title: "被中介套路",
        content: "租房中介带你去看了房子，看完后催你当场签合约：「这套房很抢手的，你不签马上就被别人定了，定金不退。」你还没下定决心，该怎么回应？",
      },
      evaluation: {
        score: 6,
        strengths: ["没有当场被焦虑情绪影响做决定", "有尝试争取思考时间"],
        weaknesses: ["回应略显被动，没有主动出击", "没有利用市场竞争争取条件"],
        reference: [
          "「谢谢您的推荐，这套房子确实不错。但我还需要和家人商量一下，明天下午之前给您答复。如果那时候还在，我就签。」",
          "「我已经看了几套类似的，还在对比。您能否把这套保留到今天晚上？我对比完马上给答复。」",
        ],
        tip: "面对「限时压力」，「争取时间+替代选择」是破解套路的关键，不要被虚假的紧迫感绑架。",
      },
    },
    {
      question: {
        id: 6,
        scene: "压力场景",
        title: "被推销强制消费",
        content: "理发店剪完头发，理发师说：「办个会员卡吧，充3000送1500，今天剪发免费。」你并不想办卡，对方却一直劝说，该怎么回应？",
      },
      evaluation: {
        score: 7,
        strengths: ["没有因为面子而勉强办卡", "保持了消费自主权"],
        weaknesses: ["拒绝方式可能让对方继续纠缠", "没有明确终止对话"],
        reference: [
          "「谢谢推荐，但我消费比较随性，不喜欢办卡。今天剪发多少钱我直接付，麻烦您结账。」",
          "「我不办预付卡，这是原则。剪发技术不错，下次需要剪发我还来找你。现在帮我结账吧。」",
        ],
        tip: "面对纠缠式推销，「明确原则+立即行动（结账/离开）」比反复解释更有效，不给对方继续施压的空间。",
      },
    },
    {
      question: {
        id: 6,
        scene: "压力场景",
        title: "被保险推销员纠缠",
        content: "保险推销员打电话说：「这款重疾险今天最后一天优惠，过了今天就涨价30%，你现在就定下来吧。」你还需要考虑，对方不断施压，该怎么回应？",
      },
      evaluation: {
        score: 6,
        strengths: ["没有因为限时优惠而仓促决定", "意识到需要充分了解产品"],
        weaknesses: ["没有主动结束通话", "没有要求书面材料以便后续决策"],
        reference: [
          "「保险是大事，我需要时间研究条款。请您把产品资料和报价发到我邮箱，我看完再联系您。今天不会做决定，谢谢理解。」",
          "「我不在电话里做任何决定。请您发详细的产品说明书和费率表给我，我会找专业人士帮我看看。有需要我会主动联系您。」",
        ],
        tip: "电话推销施压时，「要求书面材料+明确决策流程+掌握主动权」能彻底瓦解对方的紧迫感策略。",
      },
    },
  ],
];

// 统一的题目选择逻辑：确保两轮不重复
// 使用 sessionStorage 记录全局已使用的变体
function getUsedVariants(): number[][] {
  try {
    const stored = sessionStorage.getItem("shuahu_used_variants");
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

function saveUsedVariants(used: number[][]) {
  try {
    sessionStorage.setItem("shuahu_used_variants", JSON.stringify(used));
  } catch { /* ignore */ }
}

function clearUsedVariants() {
  try {
    sessionStorage.removeItem("shuahu_used_variants");
  } catch { /* ignore */ }
}

// 核心去重逻辑：从每个场景中选一个未使用过的变体
// 如果某场景所有变体都用过了，重置该场景
export function selectQuestionsForRound(): QuestionVariant[] {
  let usedVariants = getUsedVariants();
  const selected: QuestionVariant[] = [];

  for (let sceneIdx = 0; sceneIdx < QUESTION_VARIANTS.length; sceneIdx++) {
    const variants = QUESTION_VARIANTS[sceneIdx];
    const sceneUsed = usedVariants[sceneIdx] || [];

    // 找出未使用的变体
    const available = variants
      .map((_, i) => i)
      .filter((i) => !sceneUsed.includes(i));

    let chosenIdx: number;
    if (available.length > 0) {
      // 从未使用过的变体中随机选择
      chosenIdx = available[Math.floor(Math.random() * available.length)];
    } else {
      // 所有变体都用过了，重置该场景
      chosenIdx = Math.floor(Math.random() * variants.length);
      usedVariants[sceneIdx] = [];
    }

    // 记录本次使用的变体
    if (!usedVariants[sceneIdx]) usedVariants[sceneIdx] = [];
    usedVariants[sceneIdx].push(chosenIdx);

    selected.push(variants[chosenIdx]);
  }

  saveUsedVariants(usedVariants);
  return selected;
}

// 前端获取随机题目（用于 HomePage 调用）
export function getRandomQuestions(): MockQuestion[] {
  const selected = selectQuestionsForRound();
  const questions = selected.map((v) => ({ ...v.question }));
  // 打乱顺序
  return questions.sort(() => Math.random() - 0.5);
}

// 获取题目对应的点评（通过 title 精确匹配）
export function getMockEvaluation(questionId: number, questionTitle: string): MockEvaluation {
  const sceneVariants = QUESTION_VARIANTS[questionId - 1];
  if (!sceneVariants) {
    return QUESTION_VARIANTS[0][0].evaluation;
  }

  const variant = sceneVariants.find((v) => v.question.title === questionTitle);
  if (variant) {
    return variant.evaluation;
  }

  return sceneVariants[0].evaluation;
}

// API 降级兜底：返回完整题目池 + 已使用记录，让前端统一选择去重
export function getAllQuestionVariantsForAPI(): {
  questions: MockQuestion[];
  usedVariants: number[][];
} {
  const usedVariants = getUsedVariants();
  const questions: MockQuestion[] = [];

  for (let sceneIdx = 0; sceneIdx < QUESTION_VARIANTS.length; sceneIdx++) {
    const variants = QUESTION_VARIANTS[sceneIdx];
    const sceneUsed = usedVariants[sceneIdx] || [];

    // 找出未使用的变体
    const available = variants
      .map((_, i) => i)
      .filter((i) => !sceneUsed.includes(i));

    let chosenIdx: number;
    if (available.length > 0) {
      chosenIdx = available[Math.floor(Math.random() * available.length)];
    } else {
      chosenIdx = Math.floor(Math.random() * variants.length);
      usedVariants[sceneIdx] = [];
    }

    if (!usedVariants[sceneIdx]) usedVariants[sceneIdx] = [];
    usedVariants[sceneIdx].push(chosenIdx);

    questions.push({ ...variants[chosenIdx].question });
  }

  // 打乱顺序
  const shuffled = questions.sort(() => Math.random() - 0.5);

  return { questions: shuffled, usedVariants };
}

// API 降级后保存已使用记录
export function saveAPIUsedVariants(used: number[][]) {
  saveUsedVariants(used);
}

// 兼容旧版调用（仅用于 API evaluate 降级兜底）
export function getMockEvaluationById(questionId: number): MockEvaluation {
  const sceneVariants = QUESTION_VARIANTS[questionId - 1];
  if (sceneVariants) {
    return sceneVariants[0].evaluation;
  }
  return QUESTION_VARIANTS[0][0].evaluation;
}

// 兼容旧版导出
export const MOCK_QUESTIONS: MockQuestion[] = QUESTION_VARIANTS.map((v) => v[0].question);

export function getMockReport(totalScore: number) {
  const rating =
    totalScore >= 48 ? "优秀" :
    totalScore >= 36 ? "良好" :
    totalScore >= 24 ? "一般" : "待提升";

  return {
    totalScore,
    rating,
    dimensions: [
      { name: "分寸把控", score: Math.min(5, Math.max(1, (totalScore / 60) * 5 + (Math.random() - 0.5))) },
      { name: "拒绝能力", score: Math.min(5, Math.max(1, (totalScore / 60) * 5 + (Math.random() - 0.5) * 1.2)) },
      { name: "临场应变", score: Math.min(5, Math.max(1, (totalScore / 60) * 5 + (Math.random() - 0.5) * 0.8)) },
      { name: "表达逻辑", score: Math.min(5, Math.max(1, (totalScore / 60) * 5 + (Math.random() - 0.5))) },
      { name: "共情能力", score: Math.min(5, Math.max(1, (totalScore / 60) * 5 + (Math.random() - 0.5) * 1.5)) },
      { name: "气场状态", score: Math.min(5, Math.max(1, (totalScore / 60) * 5 + (Math.random() - 0.5) * 0.6)) },
    ].map((d) => ({ ...d, score: Math.round(d.score * 10) / 10 })),
    summary:
      totalScore >= 48
        ? "你在各类场景中展现了出色的沟通能力，能够灵活应对不同压力水平的话术挑战。表达得体、逻辑清晰，同时具备较强的共情意识。"
        : totalScore >= 36
        ? "你的沟通基础不错，在普通场景中表现较为自如。但在高压场景下，容易出现防御性回应或立场不够坚定的情况，需要加强应变能力。"
        : totalScore >= 24
        ? "你在沟通中展现出一定的诚意，但在设置边界、拒绝请求、以及应对突发质疑方面还有明显不足。表达逻辑和气场也需要进一步提升。"
        : "本轮答题中，你在多数场景下显得较为被动，容易受对方情绪或压力影响。建议从基础的边界设定和自信表达开始系统练习。",
    suggestions: [
      "练习「三明治法则」——肯定+拒绝+替代方案，让拒绝更有温度",
      "面对质疑时，先深呼吸3秒再回应，避免情绪性反击",
      "日常积累3-5个万能开场白，应对突发沟通场景",
      "录音复盘自己的日常对话，识别口头禅和语气弱点",
      "每周选择一个场景做角色扮演练习，逐步建立 muscle memory",
    ],
  };
}
