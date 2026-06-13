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

export const MOCK_QUESTIONS: MockQuestion[] = [
  {
    id: 1,
    scene: "普通场景",
    title: "同事请你帮忙",
    content: "你的同事小李经常在工作时间找你聊天，今天他又过来说：「晚上帮我做个PPT吧，我对这个不太熟。」你手头本身也很忙，该怎么回应？",
  },
  {
    id: 2,
    scene: "压力场景",
    title: "当众被质疑",
    content: "部门会议上，你在汇报方案时，一位资深同事当众说：「你这个想法太理想化了，根本不切实际，我从来没见过这么天真的方案。」大家都在看着，你怎么回应？",
  },
  {
    id: 3,
    scene: "普通场景",
    title: "朋友借钱",
    content: "多年未联系的大学同学突然发来微信：「最近手头紧，能不能借我五千块，下个月还你。」你并不宽裕，该怎么回应？",
  },
  {
    id: 4,
    scene: "压力场景",
    title: "领导临时加任务",
    content: "周五下午，临近下班时领导突然说：「这个方案客户周一要，周末你加加班赶出来吧。」你本已安排好了周末的重要家庭聚会，该怎么回应？",
  },
  {
    id: 5,
    scene: "普通场景",
    title: "邻居噪音投诉",
    content: "楼上邻居深夜经常发出噪音，你上去善意提醒，对方却说：「我家孩子要练琴，你理解一下。」你怎么回应？",
  },
  {
    id: 6,
    scene: "压力场景",
    title: "被中介套路",
    content: "租房中介带你去看了房子，看完后催你当场签合约：「这套房很抢手的，你不签马上就被别人定了，定金不退。」你还没下定决心，该怎么回应？",
  },
];

export interface MockEvaluation {
  score: number;
  strengths: string[];
  weaknesses: string[];
  reference: string[];
  tip: string;
}

export function getMockEvaluation(_questionId: number): MockEvaluation {
  const evaluations: MockEvaluation[] = [
    {
      score: 7,
      strengths: ["回应语气较为温和，没有生硬拒绝", "尝试解释了当前的工作状态"],
      weaknesses: ["没有给出具体的替代方案", "边界感不够明确，容易被继续请求"],
      reference: [
        "「我今晚确实要赶自己的方案，不过我可以把之前做PPT的模板发给你，应该能帮上忙。」",
        "「这个周末我可能有点时间，你先列出大纲，咱们到时候快速过一遍？」",
      ],
      tip: "设置边界时，「理由+替代方案」的组合更有说服力，让对方感受到你的诚意而非敷衍。",
    },
    {
      score: 6,
      strengths: ["没有被情绪带跑，保持了一定的冷静", "有尝试维护自己观点的倾向"],
      weaknesses: ["防御性回应较强，缺乏建设性", "没有利用好这个展示机会"],
      reference: [
        "「谢谢您的反馈，确实有些细节需要更务实。能否请您会后指点一下具体哪些部分可以更落地？」",
        "「您提到的理想化问题我也考虑过，这里有个备选方案更保守一些，您看看是否更可行？」",
      ],
      tip: "面对当众质疑，「感谢+请教」的回应既化解对抗，又将压力转化为展示开放心态的机会。",
    },
    {
      score: 8,
      strengths: ["表达真诚，没有编造借口", "给出了合理的拒绝理由"],
      weaknesses: ["回应略显简短，可以适当表达关心"],
      reference: [
        "「不好意思，我最近手头也比较紧，实在帮不上忙。建议你试试XX平台的借款服务，利率比较低。」",
        "「五千块我现在确实拿不出，但几百块可以应急。需要的话我现在转你。」",
      ],
      tip: "拒绝时，「真诚理由+有限帮助」的组合比完全拒绝更让人接受，也维护了关系。",
    },
    {
      score: 5,
      strengths: ["意识到需要平衡工作与生活", "有尝试说明自己的安排"],
      weaknesses: ["表达方式偏弱势，容易被继续施压", "没有提出可行的替代时间表"],
      reference: [
        "「领导，周末家庭聚会是早就定好的，家里长辈专门从外地过来。我可以在周五晚上和周一早上各加半天班，确保周一上午提交，您看行吗？」",
        "「我理解这个任务的紧急性。能否把截止时间延到周二？这样我和另一位同事分担一下，周末各出一部分。」",
      ],
      tip: "面对上级施压，「共情+替代方案+时间承诺」比单纯说「不」更容易被接受。",
    },
    {
      score: 7,
      strengths: ["态度友善，没有激化矛盾", "提出了合理的协商诉求"],
      weaknesses: ["语气略显犹豫，立场不够坚定", "没有提及具体的解决标准"],
      reference: [
        "「我理解练琴很重要。我们能否约定一个时间，比如晚上九点后就不练了？这样大家都能休息好。」",
        "「孩子练琴是好事，不过晚上十点后确实影响休息。要不周末白天多练会儿，晚上咱们互相体谅一下？」",
      ],
      tip: "邻里沟通中，「理解对方+具体建议+互利共赢」是最有效的策略。",
    },
    {
      score: 6,
      strengths: ["没有当场被焦虑情绪影响做决定", "有尝试争取思考时间"],
      weaknesses: ["回应略显被动，没有主动出击", "没有利用市场竞争争取条件"],
      reference: [
        "「谢谢您的推荐，这套房子确实不错。但我还需要和家人商量一下，明天下午之前给您答复。如果那时候还在，我就签。」",
        "「我已经看了几套类似的，还在对比。您能否把这套保留到今天晚上？我对比完马上给答复。」",
      ],
      tip: "面对「限时压力」，「争取时间+替代选择」是破解套路的关键，不要被虚假的紧迫感绑架。",
    },
  ];
  // cycle through based on question id
  return evaluations[(_questionId - 1) % evaluations.length];
}

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
