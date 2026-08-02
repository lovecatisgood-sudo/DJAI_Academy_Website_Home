"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { COMMUNITY_DESTINATION, onboardingCopy } from "./onboarding-copy";
import styles from "./OnboardingFlow.module.css";

const DRAFT_KEY = "djai-academy-onboarding-draft-v1";
const COMPLETE_KEY = "djai-academy-onboarding-complete-v1";
const MOBILE_QUERY = "(max-width: 820px)";
const DESKTOP_STEPS = ["guidelines", "profile", "experience", "goals", "commitment"];
const MOBILE_STEPS = ["guidelines", "profile", "experience", "programming", "goals", "commitment"];
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

function subscribeToMobileViewport(callback) {
  const mediaQuery = window.matchMedia(MOBILE_QUERY);
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  }
  mediaQuery.addListener(callback);
  return () => mediaQuery.removeListener(callback);
}

function getMobileViewportSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getServerViewportSnapshot() {
  return false;
}

export default function OnboardingFlow({ locale = "en" }) {
  const copy = onboardingCopy[locale] || onboardingCopy.en;
  const isMobile = useSyncExternalStore(
    subscribeToMobileViewport,
    getMobileViewportSnapshot,
    getServerViewportSnapshot
  );
  const stepIds = isMobile ? MOBILE_STEPS : DESKTOP_STEPS;
  const [stepId, setStepId] = useState("guidelines");
  const [form, setForm] = useState(initialForm);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);
  const headingRef = useRef(null);
  const stepCopy = {
    guidelines: copy.steps[0],
    profile: copy.steps[1],
    experience: copy.steps[2],
    programming: {
      ...copy.steps[2],
      label: copy.mobile.programmingLabel,
      title: copy.mobile.programmingTitle,
      intro: copy.mobile.programmingIntro
    },
    goals: copy.steps[3],
    commitment: copy.steps[4]
  };
  const totalSteps = stepIds.length;
  const activeStepId = stepIds.includes(stepId) ? stepId : "experience";
  const stepIndex = stepIds.indexOf(activeStepId);
  const current = stepCopy[activeStepId];
  const mobileStepIndex = Math.max(MOBILE_STEPS.indexOf(stepId), 0);
  const mobileStep = stepCopy[MOBILE_STEPS[mobileStepIndex]];

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      if (window.localStorage.getItem(COMPLETE_KEY) === "true") {
        window.location.replace(COMMUNITY_DESTINATION);
        return;
      }

      try {
        const draft = JSON.parse(window.localStorage.getItem(DRAFT_KEY) || "null");
        if (draft?.form) setForm({ ...initialForm, ...draft.form });
        if (typeof draft?.stepId === "string" && [...DESKTOP_STEPS, "programming"].includes(draft.stepId)) {
          setStepId(draft.stepId);
        } else if (Number.isInteger(draft?.step)) {
          setStepId(DESKTOP_STEPS[Math.min(Math.max(draft.step, 0), DESKTOP_STEPS.length - 1)]);
        }
      } catch {
        window.localStorage.removeItem(DRAFT_KEY);
      }
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ form, stepId }));
  }, [form, hydrated, stepId]);

  useEffect(() => {
    if (!hydrated) return;
    if (isMobile) window.scrollTo(0, 0);
    headingRef.current?.focus();
  }, [activeStepId, hydrated, isMobile]);

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

  function updateProgrammingKnowledge(value) {
    setForm((previous) => ({
      ...previous,
      knowsProgramming: value,
      programmingLanguages: value === "no" ? "" : previous.programmingLanguages
    }));
    setError("");
    setSubmitFailed(false);
  }

  function renderProgrammingFields() {
    return (
      <div className={styles.programmingBlock}>
        <p className={styles.question}>{current.programming}</p>
        <div className={styles.compactChoices}>
          {[["yes", current.yes], ["no", current.no]].map(([value, label]) => (
            <label
              className={classNames(styles.choice, form.knowsProgramming === value && styles.choiceSelected)}
              key={value}
            >
              <input
                type="radio"
                name="knowsProgramming"
                value={value}
                checked={form.knowsProgramming === value}
                onChange={(event) => updateProgrammingKnowledge(event.target.value)}
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
      </div>
    );
  }

  function programmingIsValid() {
    return form.knowsProgramming
      && (form.knowsProgramming === "no" || form.programmingLanguages.trim());
  }

  function stepIsValid(id) {
    if (id === "guidelines") return form.acceptedGuidelines;
    if (id === "profile") return form.name.trim() && form.ageRange && form.profession.trim();
    if (id === "experience") return form.experience && (isMobile || programmingIsValid());
    if (id === "programming") return programmingIsValid();
    if (id === "goals") return form.goals.length > 0 && (!form.goals.includes("other") || form.otherGoal.trim());
    return form.acceptedDeclaration;
  }

  function nextStep() {
    if (!stepIsValid(activeStepId)) {
      setError(copy.required);
      return;
    }
    setStepId(stepIds[Math.min(stepIndex + 1, totalSteps - 1)]);
    setError("");
  }

  function previousStep() {
    setStepId(stepIds[Math.max(stepIndex - 1, 0)]);
    setError("");
    setSubmitFailed(false);
  }

  function finishLocally() {
    window.localStorage.removeItem(DRAFT_KEY);
    window.localStorage.setItem(COMPLETE_KEY, "true");
  }

  async function submit(event) {
    event.preventDefault();
    if (!stepIsValid("commitment")) {
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
          <h1>DJAI Academy</h1>
          <div
            className={styles.mobileProgress}
            role="progressbar"
            aria-valuemin="1"
            aria-valuemax={MOBILE_STEPS.length}
            aria-valuenow={mobileStepIndex + 1}
            aria-label={copy.progress.replace("{current}", mobileStepIndex + 1).replace("{total}", MOBILE_STEPS.length)}
          >
            <p>
              {copy.progress.replace("{current}", mobileStepIndex + 1).replace("{total}", MOBILE_STEPS.length)}
              <strong>{mobileStep.label}</strong>
            </p>
            <div className={styles.mobileProgressTrack} aria-hidden="true">
              <span style={{ width: `${((mobileStepIndex + 1) / MOBILE_STEPS.length) * 100}%` }} />
            </div>
          </div>
          <ol className={styles.stepList}>
            {DESKTOP_STEPS.map((id, index) => (
              <li
                className={classNames(id === activeStepId && styles.active, index < stepIndex && styles.complete)}
                aria-current={id === activeStepId ? "step" : undefined}
                key={id}
              >
                <span>{index < stepIndex ? "✓" : index + 1}</span>
                <b>{stepCopy[id].label}</b>
              </li>
            ))}
          </ol>
        </aside>

        <form className={styles.content} onSubmit={submit} noValidate>
          <div className={styles.desktopProgress}>
            <p className={styles.progressLabel}>
              {copy.progress.replace("{current}", stepIndex + 1).replace("{total}", totalSteps)}
            </p>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuemin="1"
              aria-valuemax={totalSteps}
              aria-valuenow={stepIndex + 1}
              aria-label={copy.progress.replace("{current}", stepIndex + 1).replace("{total}", totalSteps)}
            >
              <span className={styles.progressBar} style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }} />
            </div>
          </div>

          <section className={styles.step} key={activeStepId}>
            <h2 ref={headingRef} tabIndex="-1">{current.title}</h2>
            <p className={styles.intro}>{current.intro}</p>

            {activeStepId === "guidelines" && (
              <>
                <ol className={styles.guidelines}>
                  {current.guidelines.map((item, index) => (
                    <li key={item.title}>
                      <span className={styles.number}>{index + 1}</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p className={styles.guidelineDesktopText}>{item.text}</p>
                        <details className={styles.guidelineMobileDetails}>
                          <summary>{copy.mobile.guidelineDetails}</summary>
                          <p>{item.text}</p>
                        </details>
                      </div>
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

            {activeStepId === "profile" && (
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

            {activeStepId === "experience" && (
              <>
                <p className={styles.question}>{current.experience}</p>
                <div className={classNames(styles.choiceGrid, styles.experienceGrid)}>
                  {current.experienceOptions.map(([value, label, detail]) => (
                    <label className={classNames(styles.choice, form.experience === value && styles.choiceSelected)} key={value}>
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
                {!isMobile && renderProgrammingFields()}
              </>
            )}

            {activeStepId === "programming" && renderProgrammingFields()}

            {activeStepId === "goals" && (
              <>
                <div className={classNames(styles.choiceGrid, styles.goalGrid)}>
                  {current.goalOptions.map(([value, label]) => (
                    <label className={classNames(styles.choice, form.goals.includes(value) && styles.choiceSelected)} key={value}>
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

            {activeStepId === "commitment" && (
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
            {stepIndex > 0 && <button className={styles.back} type="button" onClick={previousStep}>{copy.back}</button>}
            {stepIndex < totalSteps - 1 ? (
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
