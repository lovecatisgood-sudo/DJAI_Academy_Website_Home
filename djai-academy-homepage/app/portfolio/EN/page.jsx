import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata = {
  title: "DJAI Portfolio | Websites, Games and Web3 Product Work",
  description:
    "Explore selected DJAI portfolio projects across websites, games, Web3 apps, NFT marketplaces, crypto products, and business platforms.",
  alternates: {
    canonical: "/portfolio/EN/",
    languages: {
      en: "/portfolio/EN/",
      th: "/portfolio/th/"
    }
  },
  openGraph: {
    title: "DJAI Portfolio",
    description:
      "Selected DJAI work across websites, games, Web3 products, tools, and digital business platforms.",
    url: "/portfolio/EN/",
    siteName: "DJAI Academy",
    images: ["/portfolio/websites/Siamese_Cat_Cafe.png"],
    type: "website"
  }
};

const categories = [
  {
    id: "websites",
    label: "Websites",
    title: "Corporate, product and local business websites",
    summary:
      "Live websites and landing pages for logistics, hospitality, food and beverage, retail, renovation, and community brands.",
    projects: [
      {
        name: "Siam Silk Road Global Logistic",
        image: "/portfolio/websites/Siam_Silk_Road_Global_Logistic.png",
        href: "https://ssrgc.com/",
        description:
          "A corporate website for a Thailand-based trading and logistics company that supports international trade, especially across Central Asia and nearby markets.",
        services: ["Corporate website", "Logistics positioning", "B2B lead trust"]
      },
      {
        name: "KuSolution Roof Landing Page",
        image: "/portfolio/websites/Kusolution.png",
        href: "https://roof.kusolutions.co/",
        description:
          "A renovation landing page built around roof-leak assessment, damage analysis, and a direct lead-generation path for service inquiries.",
        services: ["Landing page", "Lead generation", "Inspection workflow"]
      },
      {
        name: "Siamese Cat Cafe",
        image: "/portfolio/websites/Siamese_Cat_Cafe.png",
        href: "https://siamesecat.cafe/",
        description:
          "A consumer website for Siamese Cat Cafe near Mega Bangna, presenting the cafe experience, adopted cats, and local brand story in a search-friendly format.",
        services: ["Local business site", "Hospitality SEO", "Brand storytelling"]
      },
      {
        name: "Siamese Cat Creative Club",
        image: "/portfolio/websites/Siamese_Cat_Creative_Club.png",
        href: "https://creative.siamesecat.cafe/",
        description:
          "A creative learning center website for kids' after-school programs, weekend activities, long-hour packages, and course discovery.",
        services: ["Education website", "Program pages", "Family audience UX"]
      },
      {
        name: "Siamese Cat Hotel",
        image: "/portfolio/websites/Siamese_Cat_Hotel.png",
        href: "https://hotel.siamesecat.cafe/",
        description:
          "A cat hotel website for the Siamese Cat Group, extending the cafe brand into pet hospitality with a clearer service and booking experience.",
        services: ["Hospitality website", "Service expansion", "Booking intent"]
      },
      {
        name: "Protein Drink Landing Page",
        image: "/portfolio/websites/Protein_Drink.png",
        href: "https://spylt-website-react.vercel.app/",
        description:
          "A product landing page for a caffeinated protein drink, focused on visual product appeal, benefit-led messaging, and fitness audience conversion.",
        services: ["Product landing page", "Consumer brand", "Conversion copy"]
      },
      {
        name: "Misfit Ecommerce Site",
        image: "/portfolio/websites/misfit_Ecommerce.png",
        href: "https://stunning-cranachan-2cdc35.netlify.app/",
        description:
          "An ecommerce storefront concept for branded items, designed around product browsing, visual merchandising, and a clean shopping path.",
        services: ["Ecommerce", "Product catalog", "Retail UX"]
      },
      {
        name: "Luna Homemade Bakery",
        image: "/portfolio/websites/Luna_Bakery.png",
        href: "https://lunahomemadebakery.com/",
        description:
          "A warm bakery and cafe website for Luna Homemade Bakery in Korat, Thailand, created to present the brand, products, and local business story.",
        services: ["F&B website", "Cafe branding", "Local discovery"]
      }
    ]
  },
  {
    id: "games",
    label: "Games",
    title: "Games, mini-games and interactive product systems",
    summary:
      "Interactive work across metaverse apps, on-chain game mechanics, viral mini-games, Telegram games, and product-led community engagement.",
    projects: [
      {
        name: "XANA Metaverse",
        image: "/portfolio/games/Xana_Metaverse.webp",
        description:
          "A large-scale metaverse ecosystem project developed with Noborderz, including mobile app work, NFT duel experiences, marketplace infrastructure, and broader ecosystem features.",
        services: ["Metaverse", "Mobile app", "NFT ecosystem"]
      },
      {
        name: "Flipper On-chain Game",
        image: "/portfolio/games/Flipper_Game_Onchain_odds_coin_flip_game.png",
        description:
          "A coin-flip game concept using transparent on-chain odds so players can inspect probability mechanics instead of trusting hidden game logic.",
        services: ["On-chain game", "Transparent odds", "Crypto UX"]
      },
      {
        name: "Pump Dump Price Prediction Game",
        image: "/portfolio/games/Pump_Dump_Price_Prediction_Game.webp",
        description:
          "A 30-second market prediction game where players predict short-term BTC or ETH direction using real market data and a fast reward loop.",
        services: ["Prediction game", "Market data", "Realtime gameplay"]
      },
      {
        name: "Kong Banana Tapping Game",
        image: "/portfolio/games/Kong_Banana.webp",
        description:
          "A Telegram tap-to-earn mini-game with Banana token rewards, referral mechanics, energy boosts, sound feedback, and a balanced growth economy.",
        services: ["Telegram mini-game", "Tap-to-earn", "Community growth"]
      },
      {
        name: "Siamese Cat Vs Dog",
        image: "/portfolio/games/Siamese_Cat_Vs_Dog.png",
        description:
          "A viral marketing mini-game for a Thailand cat cafe, built with five stages, three difficulty levels, custom pixel assets, leaderboards, and reward-driven sharing.",
        services: ["Mini-game", "Viral marketing", "Pixel art"]
      }
    ]
  },
  {
    id: "web3-crypto-apps",
    label: "Web3 and Crypto Apps",
    title: "Crypto products, NFT marketplaces and Web3 ecosystems",
    summary:
      "Selected crypto and Web3 work covering token economies, NFT marketplaces, meme-token launches, real-world asset concepts, and full product infrastructure.",
    projects: [
      {
        name: "Cazi Cazi Full Ecosystem",
        image: "/portfolio/crypto_apps/Cazi_Cazi_Full_Ecosystem.png",
        description:
          "A play-to-earn crypto game ecosystem with staking, yield farming, token-economy planning, game logic, and supporting product infrastructure.",
        services: ["P2E game", "Token economy", "Staking and farming"]
      },
      {
        name: "Felicite The Space Cat",
        image: "/portfolio/crypto_apps/Felicite.png",
        description:
          "A Solana meme-token brand built around the story of the first cat in space, with original artist-made artwork, launch design, and narrative direction.",
        services: ["Token brand", "Artwork direction", "Launch story"]
      },
      {
        name: "Lolipop NFT Marketplace",
        image: "/portfolio/crypto_apps/Lolipop_NFT_Marketplace.png",
        description:
          "An NFT marketplace across Ethereum, Base, and BSC with a playful visual system, token utility, hold-to-earn mechanics, and purchase rewards.",
        services: ["NFT marketplace", "Multi-chain", "Reward mechanics"]
      },
      {
        name: "Sharky Sharkx",
        image: "/portfolio/crypto_apps/sharky_sharkx.png",
        description:
          "A meme-coin concept with human-made artwork, brand design, launch support, and centralized exchange listing assistance.",
        services: ["Meme-token brand", "Art direction", "Launch support"]
      },
      {
        name: "Web3 RWA Real Estate",
        image: "/portfolio/crypto_apps/Web3_RWA_Realestate.png",
        description:
          "A real-world asset project concept for tokenizing real estate, supported by Web3 product planning, architecture, and execution strategy.",
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
  name: "DJAI Portfolio",
  url: "https://djai.academy/portfolio/EN/",
  description:
    "Selected authorized DJAI portfolio projects across websites, games, Web3 apps, crypto products, and digital platforms.",
  publisher: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://djai.academy/"
  },
  hasPart: flatProjects.map((project) => ({
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    image: `https://djai.academy${project.image}`,
    genre: project.category,
    ...(project.href ? { url: project.href } : {})
  }))
};

function ProjectCard({ project, eager = false }) {
  return (
    <article className="portfolio-card">
      <div className="portfolio-card-image">
        <img
          src={project.image}
          alt={`${project.name} project screenshot`}
          loading={eager ? "eager" : "lazy"}
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
            View live website
          </a>
        )}
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader locale="en" currentRoute="portfolio" />
      <main className="portfolio-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="portfolio-hero">
          <p className="eyebrow">Selected authorized work</p>
          <h1>DJAI Portfolio</h1>
          <p>
            A focused showcase of websites, games, Web3 products, and interactive platforms that
            DJAI is authorized to present publicly. These are selected examples, not every project
            the team has delivered.
          </p>
          <div className="portfolio-hero-actions">
            <a className="button primary" href="https://djai.academy/service/EN/">
              Build With DJAI
            </a>
            <a className="button secondary dark" href="https://djai.academy/blog/EN/">
              Read Build Guides
            </a>
          </div>
        </section>

        <section className="portfolio-stats" aria-label="Portfolio summary">
          <div>
            <strong>{flatProjects.length}</strong>
            <span>selected projects</span>
          </div>
          <div>
            <strong>{categories.length}</strong>
            <span>portfolio categories</span>
          </div>
          <div>
            <strong>Public</strong>
            <span>client-authorized showcase</span>
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
              {category.projects.map((project, projectIndex) => (
                <ProjectCard
                  project={project}
                  eager={category.id === "websites" && projectIndex < 4}
                  key={project.name}
                />
              ))}
            </div>
          </section>
        ))}

        <section className="portfolio-cta">
          <div>
            <p className="eyebrow">Need a similar build?</p>
            <h2>DJAI can design, develop, and launch the product with you.</h2>
            <p>
              We build websites, tools, games, apps, automations, Web3 products, and AI-powered
              systems for founders, local businesses, and growing teams.
            </p>
          </div>
          <div className="portfolio-cta-actions">
            <a className="button primary" href="https://djai.academy/service/EN/">
              View Services
            </a>
            <a className="button ghost light" href="mailto:contact@djai.academy">
              contact@djai.academy
            </a>
          </div>
        </section>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
