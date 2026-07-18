import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "ผลงาน DJAI | เว็บไซต์ เกม Web3 และซอฟต์แวร์ธุรกิจ",
  description:
    "ดูผลงานที่ DJAI ได้รับอนุญาตให้แสดง ครอบคลุมเว็บไซต์ เกม mini-game NFT marketplace crypto product และ Web3 ecosystem",
  alternates: {
    canonical: "/portfolio/",
    languages: {
      en: "/portfolio/en/",
      th: "/portfolio/"
    }
  },
  openGraph: {
    title: "ผลงาน DJAI",
    description:
      "ตัวอย่างผลงานเว็บไซต์ เกม Web3 product และแพลตฟอร์มธุรกิจที่ DJAI ได้พัฒนา",
    url: "/portfolio/",
    siteName: "DJAI Academy",
    images: ["/portfolio/optimized/websites/Siamese_Cat_Cafe.webp"],
    type: "website"
  }
};

const categories = [
  {
    id: "websites",
    label: "เว็บไซต์",
    title: "เว็บไซต์ธุรกิจ เว็บไซต์สินค้า และเว็บไซต์ท้องถิ่น",
    summary:
      "ตัวอย่างเว็บไซต์และ landing page สำหรับ logistics, hospitality, F&B, retail, renovation และแบรนด์ชุมชน",
    projects: [
      {
        name: "Siam Silk Road Global Logistic",
        image: "/portfolio/optimized/websites/Siam_Silk_Road_Global_Logistic.webp",
        href: "https://ssrgc.com/",
        description:
          "เว็บไซต์บริษัท trading และ logistics ในประเทศไทยที่ช่วยนำเสนอความน่าเชื่อถือด้านการค้าระหว่างประเทศ โดยเฉพาะตลาด Central Asia และภูมิภาคใกล้เคียง",
        services: ["Corporate website", "Logistics positioning", "B2B trust"]
      },
      {
        name: "KuSolution Roof Landing Page",
        image: "/portfolio/optimized/websites/Kusolution.webp",
        href: "https://roof.kusolutions.co/",
        description:
          "Landing page สำหรับธุรกิจซ่อมแซมหลังคา พร้อม flow วิเคราะห์ปัญหารั่วและนำผู้ใช้ไปสู่การติดต่อเพื่อสร้าง lead",
        services: ["Landing page", "Lead generation", "Inspection workflow"]
      },
      {
        name: "Siamese Cat Cafe",
        image: "/portfolio/optimized/websites/Siamese_Cat_Cafe.webp",
        href: "https://siamesecat.cafe/",
        description:
          "เว็บไซต์สำหรับ Siamese Cat Cafe ใกล้ Mega Bangna นำเสนอประสบการณ์คาเฟ่ แมวที่ได้รับการอุปการะ และเรื่องราวของแบรนด์",
        services: ["Local business", "Hospitality SEO", "Brand story"]
      },
      {
        name: "Siamese Cat Creative Club",
        image: "/portfolio/optimized/websites/Siamese_Cat_Creative_Club.webp",
        href: "https://creative.siamesecat.cafe/",
        description:
          "เว็บไซต์ศูนย์กิจกรรมสร้างสรรค์สำหรับเด็ก ครอบคลุม after-school program, weekend activity, package และ course discovery",
        services: ["Education website", "Program pages", "Family UX"]
      },
      {
        name: "Siamese Cat Hotel",
        image: "/portfolio/optimized/websites/Siamese_Cat_Hotel.webp",
        href: "https://hotel.siamesecat.cafe/",
        description:
          "เว็บไซต์ cat hotel ภายใต้ Siamese Cat Group ช่วยขยายแบรนด์จากคาเฟ่สู่บริการ pet hospitality พร้อมแนวทางการจองที่ชัดเจน",
        services: ["Hospitality website", "Service expansion", "Booking intent"]
      },
      {
        name: "Protein Drink Landing Page",
        image: "/portfolio/optimized/websites/Protein_Drink.webp",
        href: "https://spylt-website-react.vercel.app/",
        description:
          "Product landing page สำหรับเครื่องดื่มโปรตีนคาเฟอีน เน้น visual ของสินค้า benefit-led messaging และ conversion สำหรับสาย fitness",
        services: ["Product landing", "Consumer brand", "Conversion copy"]
      },
      {
        name: "Misfit Ecommerce Site",
        image: "/portfolio/optimized/websites/misfit_Ecommerce.webp",
        href: "https://stunning-cranachan-2cdc35.netlify.app/",
        description:
          "ตัวอย่าง ecommerce storefront สำหรับสินค้ branded items ออกแบบเพื่อการ browse สินค้า visual merchandising และเส้นทางการซื้อที่เรียบง่าย",
        services: ["Ecommerce", "Product catalog", "Retail UX"]
      },
      {
        name: "Luna Homemade Bakery",
        image: "/portfolio/optimized/websites/Luna_Bakery.webp",
        href: "https://lunahomemadebakery.com/",
        description:
          "เว็บไซต์ bakery และ cafe สำหรับ Luna Homemade Bakery ที่โคราช ช่วยเล่าแบรนด์ สินค้า และเรื่องราวของธุรกิจท้องถิ่น",
        services: ["F&B website", "Cafe branding", "Local discovery"]
      }
    ]
  },
  {
    id: "games",
    label: "เกม",
    title: "เกม Mini-game และระบบ Interactive Product",
    summary:
      "ผลงานด้าน metaverse, on-chain game, viral mini-game, Telegram game และระบบ engagement สำหรับ community",
    projects: [
      {
        name: "XANA Metaverse",
        image: "/portfolio/optimized/games/Xana_Metaverse.webp",
        description:
          "โปรเจกต์ metaverse ecosystem ขนาดใหญ่ที่พัฒนาร่วมกับ Noborderz รวมถึง mobile app, NFT duel, marketplace infrastructure และ ecosystem feature หลายส่วน",
        services: ["Metaverse", "Mobile app", "NFT ecosystem"]
      },
      {
        name: "Flipper On-chain Game",
        image: "/portfolio/optimized/games/Flipper_Game_Onchain_odds_coin_flip_game.webp",
        description:
          "เกม coin-flip ที่ใช้แนวคิด transparent on-chain odds เพื่อให้ผู้เล่นตรวจสอบ probability logic ได้ แทนการเชื่อระบบที่ซ่อนอยู่",
        services: ["On-chain game", "Transparent odds", "Crypto UX"]
      },
      {
        name: "Pump Dump Price Prediction Game",
        image: "/portfolio/optimized/games/Pump_Dump_Price_Prediction_Game.webp",
        description:
          "เกมทำนายราคาภายใน 30 วินาทีโดยอิง BTC และ ETH real market data พร้อม gameplay loop ที่เร็วและ reward ชัดเจน",
        services: ["Prediction game", "Market data", "Realtime gameplay"]
      },
      {
        name: "Kong Banana Tapping Game",
        image: "/portfolio/optimized/games/Kong_Banana.webp",
        description:
          "Telegram tap-to-earn mini-game พร้อม Banana token reward, referral, energy boost, sound feedback และ game economy ที่ออกแบบให้เล่นต่อเนื่อง",
        services: ["Telegram mini-game", "Tap-to-earn", "Community growth"]
      },
      {
        name: "Siamese Cat Vs Dog",
        image: "/portfolio/optimized/games/Siamese_Cat_Vs_Dog.webp",
        description:
          "Viral marketing mini-game สำหรับคาเฟ่แมวในไทย มี 5 stage, 3 difficulty, pixel asset, leaderboard และระบบ reward เพื่อกระตุ้นการแชร์",
        services: ["Mini-game", "Viral marketing", "Pixel art"]
      }
    ]
  },
  {
    id: "web3-crypto-apps",
    label: "Web3 และ Crypto Apps",
    title: "Crypto product, NFT marketplace และ Web3 ecosystem",
    summary:
      "ตัวอย่างงานด้าน token economy, NFT marketplace, meme-token launch, RWA concept และ crypto infrastructure",
    projects: [
      {
        name: "Cazi Cazi Full Ecosystem",
        image: "/portfolio/optimized/crypto_apps/Cazi_Cazi_Full_Ecosystem.webp",
        description:
          "Play-to-earn crypto game ecosystem พร้อม staking, yield farming, token economy planning, game logic และ infrastructure ของโปรเจกต์",
        services: ["P2E game", "Token economy", "Staking and farming"]
      },
      {
        name: "Felicite The Space Cat",
        image: "/portfolio/optimized/crypto_apps/Felicite.webp",
        description:
          "Solana meme-token brand ที่เล่าเรื่องแมวตัวแรกในอวกาศ พร้อม artwork โดยศิลปินจริง launch design และ narrative direction",
        services: ["Token brand", "Artwork direction", "Launch story"]
      },
      {
        name: "Lolipop NFT Marketplace",
        image: "/portfolio/optimized/crypto_apps/Lolipop_NFT_Marketplace.webp",
        description:
          "NFT marketplace บน Ethereum, Base และ BSC พร้อม visual system แบบ playful, token utility, hold-to-earn และ purchase reward",
        services: ["NFT marketplace", "Multi-chain", "Reward mechanics"]
      },
      {
        name: "Sharky Sharkx",
        image: "/portfolio/optimized/crypto_apps/sharky_sharkx.webp",
        description:
          "Meme-coin concept พร้อม artwork ที่วาดโดยคนจริง brand design, launch support และการช่วยเตรียม centralized exchange listing",
        services: ["Meme-token brand", "Art direction", "Launch support"]
      },
      {
        name: "Web3 RWA Real Estate",
        image: "/portfolio/optimized/crypto_apps/Web3_RWA_Realestate.webp",
        description:
          "แนวคิด real-world asset สำหรับ tokenizing real estate พร้อม Web3 product planning, architecture และ execution strategy",
        services: ["RWA", "Real estate tokenization", "Product architecture"]
      }
    ]
  }
];

const flatProjects = categories.flatMap((category) =>
  category.projects.map((project) => ({
    ...project,
    category: category.label
  }))
);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ผลงาน DJAI",
  url: "https://www.djai.academy/portfolio/",
  description:
    "ตัวอย่างผลงานที่ DJAI ได้รับอนุญาตให้แสดง ครอบคลุมเว็บไซต์ เกม Web3 crypto product และ digital platform",
  publisher: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://www.djai.academy/"
  },
  hasPart: flatProjects.map((project) => ({
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    image: `https://www.djai.academy${project.image}`,
    genre: project.category,
    ...(project.href ? { url: project.href } : {})
  }))
};

function ProjectCard({ project }) {
  return (
    <article className="portfolio-card">
      <div className="portfolio-card-image">
        <img
          src={project.image}
          alt={`ภาพตัวอย่างโปรเจกต์ ${project.name}`}
          width="1200"
          height="675"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="portfolio-card-body">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="portfolio-tags">
          {project.services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
        {project.href && (
          <a className="portfolio-live-link" href={project.href}>
            เปิดเว็บไซต์จริง
          </a>
        )}
      </div>
    </article>
  );
}

export default function ThaiPortfolioPage() {
  return (
    <>
      <SiteHeader locale="th" currentRoute="portfolio" />
      <main className="portfolio-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="portfolio-hero">
          <p className="eyebrow">Selected authorized work</p>
          <h1>ผลงาน DJAI</h1>
          <p>
            ตัวอย่างเว็บไซต์ เกม Web3 product และแพลตฟอร์ม interactive ที่ DJAI ได้รับอนุญาต
            ให้แสดงต่อสาธารณะ นี่เป็นเพียงบางส่วนของงานที่เราเคยทำ ไม่ใช่ทั้งหมด
          </p>
          <div className="portfolio-hero-actions">
            <a className="button primary" href="https://www.djai.academy/service/">
              พัฒนาโปรเจกต์กับ DJAI
            </a>
            <a className="button secondary dark" href="https://www.djai.academy/blog/">
              อ่านบทความ
            </a>
          </div>
        </section>

        <section className="portfolio-stats" aria-label="Portfolio summary">
          <div>
            <strong>{flatProjects.length}</strong>
            <span>โปรเจกต์ที่เลือกแสดง</span>
          </div>
          <div>
            <strong>{categories.length}</strong>
            <span>หมวดผลงาน</span>
          </div>
          <div>
            <strong>Public</strong>
            <span>แสดงเฉพาะงานที่ได้รับอนุญาต</span>
          </div>
        </section>

        <nav className="portfolio-category-nav" aria-label="Portfolio categories">
          {categories.map((category) => (
            <a href={`#${category.id}`} key={category.id}>
              {category.label}
            </a>
          ))}
        </nav>

        {categories.map((category) => (
          <section className="portfolio-section" id={category.id} key={category.id}>
            <div className="portfolio-section-heading">
              <p className="eyebrow">{category.label}</p>
              <h2>{category.title}</h2>
              <p>{category.summary}</p>
            </div>
            <div className="portfolio-grid">
              {category.projects.map((project) => (
                <ProjectCard project={project} key={project.name} />
              ))}
            </div>
          </section>
        ))}

        <section className="portfolio-cta">
          <div>
            <p className="eyebrow">อยากสร้างงานลักษณะนี้?</p>
            <h2>DJAI ช่วยออกแบบ พัฒนา และ launch โปรเจกต์กับคุณได้</h2>
            <p>
              เรารับพัฒนาเว็บไซต์ เครื่องมือ เกม แอป automation, Web3 product และ AI-powered system
              สำหรับ founder ธุรกิจท้องถิ่น และทีมที่กำลังเติบโต
            </p>
          </div>
          <div className="portfolio-cta-actions">
            <a className="button primary" href="https://www.djai.academy/service/">
              ดูบริการ
            </a>
            <a className="button ghost light" href="mailto:contact@djai.academy">
              contact@djai.academy
            </a>
          </div>
        </section>
      </main>
      <SiteFooter locale="th" />
    </>
  );
}
