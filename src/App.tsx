import { useEffect, useState } from "react";

type Page = "home" | "interior" | "menu" | "result";
type Modal = "gallery" | "story" | "about" | "profile" | "settings" | "share" | null;

type Drink = {
  id: number;
  name: string;
  shortName: string;
  description: string;
  image: string;
  panel: string;
  type: string;
  quote: string;
};

const drinks: Drink[] = [
  {
    id: 0,
    name: "은하수를 담은 별빛",
    shortName: "달빛 라떼 · 포근함",
    description: "부드러운 은하수 거품과 은은한 별빛향이 나는 라떼",
    image: "/assets/menu/1e388.png",
    panel: "#ab91c7",
    type: "몽상가형",
    quote: "작은 순간에서도 반짝임을 발견하는 사람",
  },
  {
    id: 1,
    name: "유니콘의 눈물",
    shortName: "유니콘 파르페 · 설렘",
    description: "반짝이는 베리와 청량한 맛이 나는 파르페",
    image: "/assets/menu/7cd2c.png",
    panel: "#7a7dbf",
    type: "모험가형",
    quote: "새로운 순간에 마음껏 설레는 사람",
  },
  {
    id: 2,
    name: "태양을 삼킨 황금",
    shortName: "태양 에이드 · 열정",
    description: "황금파편과 태양을 갈아넣은 농축 에이드",
    image: "/assets/menu/548dc.png",
    panel: "#8f8cb0",
    type: "빛의 수호자형",
    quote: "따뜻한 빛으로 주변을 밝히는 사람",
  },
];

const navItems: { label: string; page?: Page; modal?: Modal }[] = [
  { label: "홈", page: "home" },
  { label: "테스트", page: "interior" },
  { label: "메뉴 도감", page: "menu" },
  { label: "이야기", modal: "story" },
  { label: "카페 소개", modal: "about" },
];

// 모든 화면이 공유하는 상단 메뉴입니다.
function Header({
  goTo,
  openModal,
}: {
  goTo: (page: Page) => void;
  openModal: (modal: Modal) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const selectNav = (item: (typeof navItems)[number]) => {
    if (item.page) goTo(item.page);
    if (item.modal) openModal(item.modal);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <button className="brand" onClick={() => goTo("home")} aria-label="홈으로 이동">
        <span aria-hidden="true">☾</span> Destiny Cafe
      </button>
      <button
        className="hamburger"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label="메뉴 열기"
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={menuOpen ? "nav-list is-open" : "nav-list"} aria-label="주요 메뉴">
        {navItems.map((item) => (
          <button key={item.label} onClick={() => selectNav(item)}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <button onClick={() => openModal("profile")} aria-label="프로필">
          ♙
        </button>
        <button onClick={() => openModal("settings")} aria-label="설정">
          ⚙
        </button>
      </div>
    </header>
  );
}

// 첫 화면의 텍스트와 카페 일러스트를 유연한 2열로 배치합니다.
function HomePage({ enter }: { enter: () => void }) {
  return (
    <main className="home-page">
      <div className="home-stars" aria-hidden="true" />
      <img className="moon-halo" src="/assets/home/e90ba.svg" alt="" />
      <img className="moon" src="/assets/home/33a7a.svg" alt="" />
      <img className="moon-shade" src="/assets/home/5953b.svg" alt="" />
      <section className="home-copy">
        <p className="eyebrow">A LITTLE MAGIC, A LITTLE DESTINY</p>
        <h1>
          <span>운명의</span>
          카페
        </h1>
        <div className="title-rule">
          <span />
          <em>DESTINY CAFÉ</em>
        </div>
        <p className="home-lead">
          별과 마법이 머무는 비밀스러운 카페
          <br />
          어떤 운명이 당신을 기다리고 있을까요?
        </p>
        <p className="home-sub">문을 여는 순간, 당신만의 이야기가 시작됩니다.</p>
        <button className="gold-cta" onClick={enter}>
          카페에 입장하기 <span>→</span>
        </button>
        <small>ENTER THE CAFE</small>
        <ul className="home-features">
          <li>✦ 나만의 마법 성향</li>
          <li>✦ 운명의 메뉴 발견</li>
          <li>✦ 수집된 비밀</li>
        </ul>
      </section>
      <div className="cafe-art">
        <img src="/assets/home/b5744.png" alt="달빛 아래 꽃으로 장식된 운명의 카페" />
      </div>
      <footer className="home-footer">
        <span>A SECRET PLACE BETWEEN THE STARS</span>
        <span>EST. UNDER THE MOONLIGHT · 2026</span>
      </footer>
    </main>
  );
}

// 카페 내부 화면에서 테스트 또는 갤러리로 이동할 수 있습니다.
function InteriorPage({
  startTest,
  openGallery,
}: {
  startTest: () => void;
  openGallery: () => void;
}) {
  return (
    <main className="interior-page">
      <img className="interior-bg" src="/assets/interior/9490c.png" alt="" />
      <img
        className="fairy"
        src="/assets/interior/c85c5.png"
        alt="카운터에 기대어 손님을 맞이하는 작은 요정"
      />
      <section className="welcome-card">
        <h1>어서 오세요!</h1>
        <p>
          운명의 카페에 오신 것을 환영해요.
          <br />
          오늘은 어떤 이야기를 찾아오셨나요?
        </p>
        <button className="primary-wide" onClick={startTest}>
          <span aria-hidden="true">☕</span> 심리테스트 시작하기 <span aria-hidden="true">✦</span>
        </button>
        <button className="secondary-wide" onClick={openGallery}>
          ♧ 카페 둘러보기
        </button>
        <small>작은 선택 하나가 당신의 이야기를 바꿔줄 거예요.</small>
      </section>
    </main>
  );
}

// 메뉴 카드는 같은 마크업을 재사용하며 선택 상태만 다르게 표시합니다.
function DrinkCard({
  drink,
  selected,
  onSelect,
}: {
  drink: Drink;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <article className={selected ? "drink-card selected" : "drink-card"}>
      <div className="drink-art" style={{ backgroundColor: drink.panel }}>
        <img src={drink.image} alt={drink.name} />
      </div>
      <h2>{drink.name}</h2>
      <p>{drink.description}</p>
      <button onClick={onSelect}>{selected ? "✓ 선택됨" : "이 메뉴 선택"}</button>
    </article>
  );
}

function MenuPage({
  selected,
  setSelected,
  showResult,
}: {
  selected: number;
  setSelected: (id: number) => void;
  showResult: () => void;
}) {
  return (
    <main className="menu-page">
      <div className="menu-bg" aria-hidden="true" />
      <section className="menu-content">
        <h1>당신의 운명 메뉴를 골라보세요</h1>
        <p className="menu-intro">
          마음이 이끄는 메뉴 하나를 선택해 주세요. 한번 선택하면 되돌릴 수 없습니다.
        </p>
        <div className="tabs" aria-label="메뉴 종류">
          <button className="active">✦ 음료 메뉴</button>
          <span aria-disabled="true">디저트 메뉴</span>
        </div>
        <div className="drink-grid">
          {drinks.map((drink) => (
            <DrinkCard
              key={drink.id}
              drink={drink}
              selected={selected === drink.id}
              onSelect={() => setSelected(drink.id)}
            />
          ))}
        </div>
        <div className="selected-summary">
          <span>현재 선택한 메뉴</span>
          <strong>{drinks[selected].shortName}</strong>
        </div>
        <button className="continue-button" onClick={showResult}>
          이 메뉴로 이어가기 →
        </button>
      </section>
    </main>
  );
}

// 선택 결과에 따라 제목 문구가 바뀌고, 원본 결과 장식은 그대로 사용합니다.
function ResultPage({ drink, share }: { drink: Drink; share: () => void }) {
  return (
    <main className="result-page">
      <img className="result-bg" src="/assets/result/b018d.png" alt="" />
      <section className="result-content">
        <h1>당신의 유형은...</h1>
        <img
          className="result-cup"
          src="/assets/result/c6139.png"
          alt={`${drink.name} 마법 음료`}
        />
        <div className="result-description">
          <img src="/assets/result/875fd.png" alt="" />
          <div>
            <h2>
              {drink.name} — {drink.type}
            </h2>
            <h3>“{drink.quote}”</h3>
            <p>
              감수성이 풍부하고 상상력이 뛰어나요. 남들이 지나치는 사소한 순간에도 자신만의 의미를
              발견하며, 혼자만의 시간 속에서 에너지를 충전하는 타입이에요.
            </p>
          </div>
        </div>
        <img className="result-magic" src="/assets/result/53db3.png" alt="별빛 예지 마법 카드" />
        <img className="result-chart" src="/assets/result/a59a7.png" alt="마법 성향 그래프" />
        <button className="share-button" onClick={share}>
          결과 공유하기
        </button>
      </section>
    </main>
  );
}

const gallerySlides = [
  {
    image: "/assets/interior/9490c.png",
    title: "별빛이 머무는 홀",
    copy: "달과 별이 보이는 아치형 창가에서 조용한 시간을 보내세요.",
  },
  {
    image: "/assets/home/b5744.png",
    title: "운명의 카페 외관",
    copy: "보랏빛 꽃과 따뜻한 등불이 늦은 밤의 손님을 기다립니다.",
  },
  {
    image: "/assets/menu/de081.png",
    title: "비밀 메뉴의 방",
    copy: "마음이 이끄는 단 하나의 메뉴를 고르는 마법 같은 공간입니다.",
  },
];

// 갤러리는 이전/다음 버튼과 점 표시가 모두 실제로 작동합니다.
function GalleryModal({ close }: { close: () => void }) {
  const [slide, setSlide] = useState(0);
  const move = (step: number) =>
    setSlide((current) => (current + step + gallerySlides.length) % gallerySlides.length);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={close}>
      <section
        className="modal gallery-modal"
        role="dialog"
        aria-modal="true"
        aria-label="카페 둘러보기"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={close} aria-label="닫기">
          ×
        </button>
        <img src={gallerySlides[slide].image} alt={gallerySlides[slide].title} />
        <div className="gallery-caption">
          <h2>{gallerySlides[slide].title}</h2>
          <p>{gallerySlides[slide].copy}</p>
        </div>
        <button className="slide-arrow prev" onClick={() => move(-1)} aria-label="이전 이미지">
          ‹
        </button>
        <button className="slide-arrow next" onClick={() => move(1)} aria-label="다음 이미지">
          ›
        </button>
        <div className="slide-dots">
          {gallerySlides.map((item, index) => (
            <button
              key={item.title}
              className={index === slide ? "active" : ""}
              onClick={() => setSlide(index)}
              aria-label={`${index + 1}번 이미지 보기`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoModal({
  type,
  close,
  restart,
}: {
  type: Exclude<Modal, "gallery" | null>;
  close: () => void;
  restart: () => void;
}) {
  const content = {
    story: [
      "별빛 아래 시작된 이야기",
      "운명의 카페는 잊고 있던 마음의 조각을 메뉴로 비춰 주는 비밀스러운 공간입니다.",
    ],
    about: [
      "Destiny Cafe",
      "별과 마법, 포근한 한 잔을 통해 나만의 성향을 발견하는 인터랙티브 카페입니다.",
    ],
    profile: [
      "나의 수집함",
      "아직 저장된 운명 메뉴가 없습니다. 테스트를 완료해 첫 번째 메뉴를 만나 보세요.",
    ],
    settings: [
      "카페 설정",
      "배경 음악과 알림은 준비 중입니다. 화면 이동과 모든 테스트 기능은 지금 이용할 수 있어요.",
    ],
    share: ["결과가 준비되었어요", "아래 버튼을 누르면 현재 페이지 주소를 복사할 수 있습니다."],
  }[type];

  const copyLink = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href);
    } finally {
      close();
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={close}>
      <section
        className="modal info-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={close} aria-label="닫기">
          ×
        </button>
        <span className="modal-symbol">☾</span>
        <h2 id="modal-title">{content[0]}</h2>
        <p>{content[1]}</p>
        {type === "share" ? (
          <button className="modal-action" onClick={copyLink}>
            링크 복사하기
          </button>
        ) : type === "profile" ? (
          <button className="modal-action" onClick={restart}>
            테스트 시작하기
          </button>
        ) : (
          <button className="modal-action" onClick={close}>
            확인
          </button>
        )}
      </section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [modal, setModal] = useState<Modal>(null);
  const [selected, setSelected] = useState(0);

  // 화면이 바뀔 때마다 페이지 상단으로 이동합니다.
  const goTo = (nextPage: Page) => {
    setPage(nextPage);
    setModal(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 팝업이 열려 있을 때 Esc 키로 닫을 수 있습니다.
  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, []);

  return (
    <div className="app-shell">
      <Header goTo={goTo} openModal={setModal} />
      {page === "home" && <HomePage enter={() => goTo("interior")} />}
      {page === "interior" && (
        <InteriorPage startTest={() => goTo("menu")} openGallery={() => setModal("gallery")} />
      )}
      {page === "menu" && (
        <MenuPage selected={selected} setSelected={setSelected} showResult={() => goTo("result")} />
      )}
      {page === "result" && <ResultPage drink={drinks[selected]} share={() => setModal("share")} />}
      {modal === "gallery" && <GalleryModal close={() => setModal(null)} />}
      {modal && modal !== "gallery" && (
        <InfoModal type={modal} close={() => setModal(null)} restart={() => goTo("interior")} />
      )}
    </div>
  );
}
