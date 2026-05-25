import dimigoLogo from "./dimigo_logo.png";
import monadLogo from "./monad_logo.png";
import ioiLogo from "./ioi_logo.png";
import monadMain from "./monad_main.png";
import endotMain from "./endot_main.png";
import prompeMain from "./prompe_main.png";
import llmMain from "./llm_main.png";
import agriMain from "./agri_main.jpg";
import morphesMain from "./morphes_main.png";

export const navLinks = [
  { href: "#top", label: "Main" },
  { href: "#about", label: "About" },
  { href: "#awards", label: "Awards" },
  { href: "#project", label: "Project" },
  { href: "#press", label: "Articles"}
];

export const profile = {
  name: "김단아",
  title: "Problem Solver",
  rows: [
    { label: "Name", value: "김단아" },
    { label: "Birth", value: "2009.10.22" },
    { label: "School", value: "한국디지털미디어고등학교", logo: dimigoLogo, link: "https://dimigo.hs.kr" },
    { label: "Blog", value: "아단아 코딩일지", logo: monadLogo, link: "https://adanacoding.tistory.com/" },
    { label: "Proof", value: "국제정보올림피아드 겨울학교 수료", logo: ioiLogo },
  ],
};

export const projects = [
  {
    id: "01",
    category: "2025.05 ~",
    title: "MONAD",
    desc: "'가능성을 연결하다'라는 슬로건 아래, 기술과 사람을 잇기 위해 모인 IT 소셜벤처 스타트업입니다. 현재 창업동아리장 및 CEO로 활동하고 있습니다.",
    tags: ["비즈쿨창업동아리", "IT 소셜벤처"],
    image: monadMain,
    link: "https://monad.io.kr/",
  },
  {
    id: "02",
    category: "2025. 8 ~",
    title: "Endot",
    desc: "현재 600만원정도인 점자 디스플레이를 20만원 내외로 줄이기 위한 프로젝트입니다.",
    tags: ["Accessibility", "Hardware"],
    image: endotMain,
    link: "",
  },
  {
    id: "03",
    category: "2025. 10 ~",
    title: "PrompE",
    desc: "어린 아이들에게 프롬프트 엔지니어링 교육을 제공하는 서비스입니다. 그림을 통해 아이들을 AI 시대의 능동적인 사용자로 성장시킵니다.",
    tags: ["AI", "학생창업팀300+"],
    image: prompeMain,
    link: "https://promp-e.vercel.app/",
  },
  {
    id: "04",
    category: "2026. 03 ~",
    title: "페르소나 토큰 최적화",
    desc: "graphRAG를 통해 페르소나를 유지하며, 토큰 비용 또한 줄이는 방법을 찾고 있습니다.",
    tags: ["LLM", "RAG", "페르소나"],
    image: llmMain,
    link: "",
  },
  {
    id: "05",
    category: "2025. 10 ~ 2025. 12",
    title: "PyPing - ★",
    desc: "게이미피케이션을 통한 Python 교육 프로그램입니다.",
    tags: ["Python", "교육"],
    image: "",
    link: "",
  },
  {
    id: "06",
    category: "2025. 6 ~ 2025. 9",
    title: "키다리아저씨",
    desc: "현대 사회의 기부의 한계에 대해 분석 후, 정서적 후원 구조를 바탕으로 한 서비스 제작하였습니다. 초반에는 코사인 유사도를 바탕으로, 잘 맞는 아동을 매칭하는 서비스를 제작했고 이후에는 GNN을 활용해 정확도를 향상시켰습니다.",
    tags: ["기부", "GNN"],
    image: "",
    link: "",
  },
  {
    id: "07",
    category: "2025. 9 ~ 2025. 12",
    title: "Morphes",
    desc: "AI 활용 능력의 본질은 '얼마나 그 기술을 정확히 아는가'입니다. 아이디어를 완벽한 언어로 변환하는 프롬프트 작성 엔진입니다.",
    tags: ["LLM", "프롬프트엔지니어링"],
    image: morphesMain,
    link: "",
  },
  {
    id: "08",
    category: "2025. 3 ~ 2025. 7",
    title: "가중치 기반 정책 추천 알고리즘",
    desc: "우선순위를 순서로만 생각하지 않고, 배낭 알고리즘과 나이브 베이즈 등의 기법을 사용해 현대 사회에 맞는 새로운 우선순위를 제시하는 프로그램입니다.",
    tags: ["알고리즘", "배낭문제", "딥러닝"],
    image: "",
    link: "",
  }
];

export const awardTabs = [
  {
    id: "preview",
    label: "Preview",
    eyebrow: "AWARD OVERVIEW",
    items: [
      "2026 아시아태평양정보올림피아드 출전",
      "2026 화성시 청소년 의회 의장",
      "2025 국제정보올림피아드 여름/겨울학교 수료",
      "2024 IT 올림피아드 프로그래밍 부문 대상 (과기부장관상)",
    ],
  },
  {
    id: "algorithm",
    label: "Algorithm",
    eyebrow: "AWARD TRACK / ALGORITHM",
    items: [
      "2026 아시아태평양정보올림피아드 출전",
      "2026 한국정보올림피아드 1차 동상",
      "2026 제4회 디미고 프로그래밍 챌린지 출제진",
      "2025 국제정보올림피아드 여름/겨울학교 수료",
      "2025 한국정보올림피아드 2차 장려상",
      "2025 한국정보올림피아드 1차 동상",
      "2024 IT 올림피아드 프로그래밍 부문 대상 (장관상)",
      "2024 아시아태평양정보올림피아드 출전",
      "2024 한국정보올림피아드 은상",
      "2023 제1회 청소년IT경시대회 알고리즘 부문 은상",
      "2023 제1회 청소년IT경시대회 파이썬 부문 은상",
      "2023 디미고 IT 올림피아드 프로그래밍 부문 동상",
      "2023 국제정보올림피아드 여름/겨울학교 수료",
      "2023 한국정보올림피아드 은상 (전국 16등)",
    ],
  },
  {
    id: "development",
    label: "Development",
    eyebrow: "AWARD TRACK / SOFTWARE & AI",
    items: [
      "2025 Future and Dream AI Challenges 동상",
      "2025 제 7회 한국코드페어 해커톤 동상",
      "2025 파이썬 프로그래밍 교과우수상",
      "2025 AI SoftwarePlay 용인 우수상",
      "2025 고교 SW미래채움 AI챌린지 창의상",
      "2024 생성형 AI 활용대전 우수상",
      "2024 제 6회 한국코드페어 해커톤 동장",
      "2023 청소년IT경시대회 파이썬 부문 은상",
      "2023 제 5회 한국코드페어 해커톤 은상",
      "2023 가나다라 코딩대회 대상",
      "2023 SW 사고력 올림피아드 은상",
      "2022 제 4회 한국코드페어 해커톤 동상",
    ],
  },
  {
    id: "planning",
    label: "Planning",
    eyebrow: "AWARD TRACK / PLANNING & SPEAKING",
    items: [
      "2026 학생창업유망팀 300+ 서류 합격 (진행 중)",
      "2026 한국디지털미디어고등학교 학생자치법정 법정장",
      "2026 화성시 청소년 의회 의장",
      "2026 모나드 창업동아리장 (CEO)",
      "2026 제4회 디미고 프로그래밍 챌린지 운영진",
      "2025 사회 교과우수상",
      "2025 AI/디지털 네이티브 토론대회 2위",
      "2025 AGRI TED 최우수상",
      "2025 한국디지털미디어고등학교 학생자치법정 변호사",
      "2023 경기청소년 강연대회 우수상 (경기도지사상)",
    ],
  },
];

export const contact = {
  eyebrow: "CONTACT",
  title: "Let’s connect possibilities.",
  email: "abcdana122@gmail.com",
};

export const pressItems = [
  {
    id: "01",
    title: "한국코드페어 수상 관련",
    desc: "분리수거 키오스크가 시각장애인이 이용하기에 어려움이 있어 음성 인식으로 해결 (2022)",
    image: "https://img.etnews.com/photonews/2212/1604673_20221220103845_888_0003.jpg",
    link: "https://www.etnews.com/20221220000074",
  },
  {
    id: "02",
    title: "청소년 강연대회 수상 관련",
    desc: "생성형 인공지능 시대에서 갖고 있어야 할 것들에 대해 소개 (2023)",
    image: "https://cdn.econonews.co.kr/news/photo/202305/288022_273823_1712.jpg",
    link: "https://www.econonews.co.kr/news/articleView.html?idxno=288022",
  },
  {
    id: "03",
    title: "농업AI 경진대회 수상 관련",
    desc: "우리의 논을 지키고, 농촌 고령화에 대비하기 위한 인공지능 개발 (2025)",
    image: agriMain,
    link: "http://www.ansannews.co.kr/news/articleView.html?idxno=15732",
  },
  {
    id: "04",
    title: "AI 토론대회 수상 관련",
    desc: "필터버블, 인공지능 규제 관련 토론 대회 준우승 (2025)",
    image: "https://img.etnews.com/news/article/2025/11/09/news-p.v1.20251109.924eca05f5f74837b7034fd6607b6a06_P1.jpg",
    link: "https://www.ezyeconomy.com/news/articleView.html?idxno=225279#:~:text=%EC%A4%91%EB%93%B1%EB%B6%80%20%EC%B2%AD%EC%82%B0%EC%9C%A0%EC%88%98%20%ED%8C%80%2C-,%EA%B3%A0%EB%93%B1%EB%B6%80%20%EB%AA%A8%EB%82%98%EB%93%9C%20%ED%8C%80,-%2C%20%EB%8C%80%ED%95%99%EB%B6%80%20%EA%B3%B5%EA%B0%90%20%ED%8C%80%EC%9D%B4",
  },
  {
    id: "05",
    title: "화성시 뱃놀이 축제 관련",
    desc: "화성시 청소년 대표로 개막식 퍼레이드 및 퍼포먼스 참여 (2026)",
    image: "https://imgnews.pstatic.net/image/666/2026/05/23/0000108289_002_20260525130616801.jpg?type=w860",
    link: "https://n.news.naver.com/article/666/0000108289?sid=102",
  },
];
