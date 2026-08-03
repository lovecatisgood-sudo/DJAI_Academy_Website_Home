import Image from "next/image";
import {
  LOGIN_DESTINATION,
  SIGNUP_DESTINATION,
  onboardingCopy
} from "./onboarding-copy";
import styles from "./OnboardingFlow.module.css";

export default function OnboardingFlow({ locale = "en" }) {
  const copy = onboardingCopy[locale] || onboardingCopy.en;
  const guidelines = copy.steps[0].guidelines;

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="academy-welcome-title">
        <div className={styles.brandRow}>
          <Image src="/djai-logo-small.webp" alt={copy.brandAlt} width={180} height={97} priority />
          <a className={styles.language} href={copy.languageHref} hrefLang={locale === "en" ? "th" : "en"}>
            {copy.languageLabel}
          </a>
        </div>

        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1 id="academy-welcome-title">{copy.teaser.title}</h1>
            <p className={styles.lead}>{copy.teaser.body}</p>
            <p className={styles.accountNote}>{copy.teaser.accountNote}</p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href={SIGNUP_DESTINATION}>{copy.teaser.createAccount}</a>
              <a className={styles.secondaryAction} href={LOGIN_DESTINATION}>{copy.teaser.signIn}</a>
            </div>
          </div>

          <aside className={styles.process} aria-label={copy.teaser.processTitle}>
            <h2>{copy.teaser.processTitle}</h2>
            <ol>
              {copy.teaser.process.map((item, index) => (
                <li key={item}>
                  <span>{index + 1}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className={styles.guidelineSection} aria-labelledby="community-guidelines-title">
        <p className={styles.sectionEyebrow}>{copy.teaser.guidelinesEyebrow}</p>
        <h2 id="community-guidelines-title">{copy.teaser.guidelinesTitle}</h2>
        <p className={styles.sectionIntro}>{copy.teaser.guidelinesBody}</p>
        <div className={styles.guidelines}>
          {guidelines.map((guideline, index) => (
            <article key={guideline.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{guideline.title}</h3>
              <p>{guideline.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
