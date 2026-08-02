"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { COMMUNITY_DESTINATION, onboardingCopy } from "./onboarding-copy";
import styles from "./OnboardingFlow.module.css";

const DRAFT_KEY = "djai-academy-onboarding-draft-v1";
const COMPLETE_KEY = "djai-academy-onboarding-complete-v1";
const initialForm = {
  acceptedGuidelines: false,
  name: "",
  ageRange: "",
  profession: "",
  experience: "",
  knowsProgramming: "",
  programmingLanguages: "",
  goals: [],
  otherGoal: "",
  acceptedDeclaration: false
};

function classNames(...names) {
  return names.filter(Boolean).join(" ");
}

export default function OnboardingFlow({ locale = "en" }) {
  const copy = onboardingCopy[locale] || onboardingCopy.en;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);
  const headingRef = useRef(null);
  const totalSteps = copy.steps.length;
  const current = copy.steps[step];

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      if (window.localStorage.getItem(COMPLETE_KEY) === "true") {
        window.location.replace(COMMUNITY_DESTINATION);
        return;
      }

      try {
        const draft = JSON.parse(window.localStorage.getItem(DRAFT_KEY) || "null");
        if (draft?.form) setForm({ ...initialForm, ...draft.form });
        if (Number.isInteger(draft?.step)) setStep(Math.min(Math.max(draft.step, 0), totalSteps - 1));
      } catch {
        window.localStorage.removeItem(DRAFT_KEY);
      }
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, [totalSteps]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ form, step }));
  }, [form, hydrated, step]);

  useEffect(() => {
    if (hydrated) headingRef.current?.focus();
  }, [hydrated, step]);

  function update(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setError("");
    setSubmitFailed(false);
  }

  function toggleGoal(goal) {
    setForm((previous) => ({
      ...previous,
      goals: previous.goals.includes(goal)
        ? previous.goals.filter((item) => item !== goal)
        : [...previous.goals, goal]
    }));
    setError("");
    setSubmitFailed(false);
  }

  function stepIsValid(index) {
    if (index === 0) return form.acceptedGuidelines;
    if (index === 1) return form.name.trim() && form.ageRange && form.profession.trim();
    if (index === 2) {
      return form.experience
        && form.knowsProgramming
        && (form.knowsProgramming === "no" || form.programmingLanguages.trim());
    }
    if (index === 3) return form.goals.length > 0 && (!form.goals.includes("other") || form.otherGoal.trim());
    return form.acceptedDeclaration;
  }

  function nextStep() {
    if (!stepIsValid(step)) {
      setError(copy.required);
      return;
    }
    setStep((value) => Math.min(value + 1, totalSteps - 1));
    setError("");
  }

  function previousStep() {
    setStep((value) => Math.max(value - 1, 0));
    setError("");
    setSubmitFailed(false);
  }

  function finishLocally() {
    window.localStorage.removeItem(DRAFT_KEY);
    window.localStorage.setItem(COMPLETE_KEY, "true");
  }

  async function submit(event) {
    event.preventDefault();
    if (!stepIsValid(4)) {
      setError(copy.required);
      return;
    }

    setSubmitting(true);
    setError("");
    setSubmitFailed(false);

    try {
      const response = await fetch("/api/academy-onboarding/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale: copy.locale })
      });
      if (!response.ok) throw new Error("Unable to save onboarding response");
      finishLocally();
      window.location.assign(COMMUNITY_DESTINATION);
    } catch {
      finishLocally();
      setSubmitFailed(true);
      setError(copy.submitError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.sidebar} aria-label={copy.eyebrow}>
          <div className={styles.brandRow}>
            <Image src="/djai-logo-small.webp" alt={copy.brandAlt} width={180} height={97} priority />
            <a className={styles.language} href={copy.languageHref} hrefLang={locale === "en" ? "th" : "en"}>
              {copy.languageLabel}
            </a>
          </div>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>Learn. Build. Grow.</h1>
          <ol className={styles.stepList}>
            {copy.steps.map((item, index) => (
              <li
                className={classNames(index === step && styles.active, index < step && styles.complete)}
                aria-current={index === step ? "step" : undefined}
                key={item.label}
              >
                <span>{index < step ? "✓" : index + 1}</span>
                <b>{item.label}</b>
              </li>
            ))}
          </ol>
        </aside>

        <form className={styles.content} onSubmit={submit} noValidate>
          <p className={styles.progressLabel}>
            {copy.progress.replace("{current}", step + 1).replace("{total}", totalSteps)}
          </p>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuemin="1"
            aria-valuemax={totalSteps}
            aria-valuenow={step + 1}
            aria-label={copy.progress.replace("{current}", step + 1).replace("{total}", totalSteps)}
          >
            <span className={styles.progressBar} style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
          </div>

          <section className={styles.step} key={step}>
            <h2 ref={headingRef} tabIndex="-1">{current.title}</h2>
            <p className={styles.intro}>{current.intro}</p>

            {step === 0 && (
              <>
                <ol className={styles.guidelines}>
                  {current.guidelines.map((item, index) => (
                    <li key={item.title}>
                      <span className={styles.number}>{index + 1}</span>
                      <div><strong>{item.title}</strong><p>{item.text}</p></div>
                    </li>
                  ))}
                </ol>
                <label className={styles.agreement}>
                  <input
                    type="checkbox"
                    checked={form.acceptedGuidelines}
                    onChange={(event) => update("acceptedGuidelines", event.target.checked)}
                  />
                  {current.agreement}
                </label>
              </>
            )}

            {step === 1 && (
              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span>{current.name}</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    placeholder={current.namePlaceholder}
                    autoComplete="name"
                    maxLength="100"
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span>{current.age}</span>
                  <select value={form.ageRange} onChange={(event) => update("ageRange", event.target.value)} required>
                    <option value="">{current.agePlaceholder}</option>
                    {current.ageOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                  </select>
                </label>
                <label className={styles.field}>
                  <span>{current.profession}</span>
                  <input
                    type="text"
                    value={form.profession}
                    onChange={(event) => update("profession", event.target.value)}
                    placeholder={current.professionPlaceholder}
                    maxLength="120"
                    required
                  />
                </label>
              </div>
            )}

            {step === 2 && (
              <>
                <p className={styles.question}>{current.experience}</p>
                <div className={styles.choiceGrid}>
                  {current.experienceOptions.map(([value, label, detail]) => (
                    <label className={styles.choice} key={value}>
                      <input
                        type="radio"
                        name="experience"
                        value={value}
                        checked={form.experience === value}
                        onChange={(event) => update("experience", event.target.value)}
                      />
                      <strong>{label}</strong><small>{detail}</small>
                    </label>
                  ))}
                </div>
                <p className={classNames(styles.question, styles.spacedQuestion)}>{current.programming}</p>
                <div className={styles.compactChoices}>
                  {[['yes', current.yes], ['no', current.no]].map(([value, label]) => (
                    <label className={styles.choice} key={value}>
                      <input
                        type="radio"
                        name="knowsProgramming"
                        value={value}
                        checked={form.knowsProgramming === value}
                        onChange={(event) => {
                          const value = event.target.value;
                          setForm((previous) => ({
                            ...previous,
                            knowsProgramming: value,
                            programmingLanguages: value === "no" ? "" : previous.programmingLanguages
                          }));
                          setError("");
                          setSubmitFailed(false);
                        }}
                      />
                      <strong>{label}</strong>
                    </label>
                  ))}
                </div>
                {form.knowsProgramming === "yes" && (
                  <label className={classNames(styles.field, styles.spacedQuestion)}>
                    <span>{current.languages}</span>
                    <input
                      type="text"
                      value={form.programmingLanguages}
                      onChange={(event) => update("programmingLanguages", event.target.value)}
                      placeholder={current.languagesPlaceholder}
                      maxLength="180"
                      required
                    />
                  </label>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <div className={styles.choiceGrid}>
                  {current.goalOptions.map(([value, label]) => (
                    <label className={styles.choice} key={value}>
                      <input
                        type="checkbox"
                        value={value}
                        checked={form.goals.includes(value)}
                        onChange={() => toggleGoal(value)}
                      />
                      <strong>{label}</strong>
                    </label>
                  ))}
                </div>
                {form.goals.includes("other") && (
                  <label className={classNames(styles.field, styles.spacedQuestion)}>
                    <span>{current.other}</span>
                    <input
                      type="text"
                      value={form.otherGoal}
                      onChange={(event) => update("otherGoal", event.target.value)}
                      placeholder={current.otherPlaceholder}
                      maxLength="240"
                      required
                    />
                  </label>
                )}
              </>
            )}

            {step === 4 && (
              <>
                <ol className={styles.declaration}>
                  {current.declaration.map((item, index) => (
                    <li key={item}>
                      <span className={styles.number}>{index + 1}</span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ol>
                <label className={styles.agreement}>
                  <input
                    type="checkbox"
                    checked={form.acceptedDeclaration}
                    onChange={(event) => update("acceptedDeclaration", event.target.checked)}
                  />
                  {current.agreement}
                </label>
                <p className={styles.privacy}>{copy.privacy}</p>
              </>
            )}

            {error && <p className={styles.error} role="alert">{error}</p>}
            {submitFailed && (
              <div className={styles.fallbackActions}>
                <button className={styles.back} type="submit">{copy.retry}</button>
                <a className={styles.continueLink} href={COMMUNITY_DESTINATION}>{copy.continueAnyway}</a>
              </div>
            )}
          </section>

          <div className={styles.actions}>
            {step > 0 && <button className={styles.back} type="button" onClick={previousStep}>{copy.back}</button>}
            {step < totalSteps - 1 ? (
              <button className={styles.primary} type="button" onClick={nextStep}>{copy.next}</button>
            ) : (
              <button className={styles.primary} type="submit" disabled={submitting}>
                {submitting ? copy.submitting : current.enter}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
