import { ArrowUpRight } from 'lucide-react';

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const socialLinks = [
  {
    name: 'GitHub',
    handle: 'lovecatisgood-sudo',
    href: 'https://github.com/lovecatisgood-sudo',
    image: 'social-github.png',
  },
  {
    name: 'X',
    handle: '@siamesecatdev',
    href: 'https://x.com/siamesecatdev',
    image: 'social-x.png',
  },
  {
    name: 'Instagram',
    handle: '@djcatdev',
    href: 'https://www.instagram.com/djcatdev/',
    image: 'social-instagram.png',
  },
  {
    name: 'Facebook',
    handle: 'Siamese Cat Dev',
    href: 'https://www.facebook.com/people/Siamese-Cat-Dev/61592514145429/',
    image: 'social-facebook.png',
  },
];

type SocialLinksProps = {
  language: 'th' | 'en';
};

export function HeaderSocialLinks({ language }: SocialLinksProps) {
  const thai = language === 'th';

  return (
    <nav className="header-social-links" aria-label={thai ? 'Social Media ของ Siamese Cat Dev' : 'Siamese Cat Dev social media'}>
      {socialLinks.map((social) => (
        <a
          className="header-social-link"
          href={social.href}
          key={social.name}
          target="_blank"
          rel="noreferrer"
          title={`${social.name}: ${social.handle}`}
          aria-label={thai ? `ติดตาม ${social.handle} บน ${social.name}` : `Follow ${social.handle} on ${social.name}`}
        >
          <img src={assetPath(social.image)} alt="" width="20" height="20" decoding="async" />
        </a>
      ))}
    </nav>
  );
}

export default function SocialLinks({ language }: SocialLinksProps) {
  const thai = language === 'th';

  return (
    <div className="social-follow" aria-label={thai ? 'ติดตาม Siamese Cat Dev บน Social Media' : 'Follow Siamese Cat Dev on social media'}>
      <p className="social-follow-label">
        {thai ? 'ติดตามผลงาน เครื่องมือใหม่ และเบื้องหลังการพัฒนา' : 'Follow new tools, releases, and behind-the-scenes development'}
      </p>
      <div className="social-links">
        {socialLinks.map((social) => (
          <a
            className="social-link"
            href={social.href}
            key={social.name}
            target="_blank"
            rel="noreferrer"
            aria-label={thai ? `ติดตาม ${social.handle} บน ${social.name}` : `Follow ${social.handle} on ${social.name}`}
          >
            <img src={assetPath(social.image)} alt="" width="32" height="32" loading="lazy" decoding="async" />
            <span>
              <small>{thai ? 'ติดตามบน' : 'FOLLOW ON'}</small>
              <strong>{social.name}</strong>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
