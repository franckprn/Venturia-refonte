import type { ServiceQuadIllustration as ServiceQuadIllustrationContent } from "@/content/services/types";
import styles from "./ServiceQuadIllustrations.module.css";

/**
 * 4 mini-interfaces décoratives, une par carte du bloc 2 (« Ce qu'on
 * automatise ») — HTML/CSS uniquement, palette fermée (CLAUDE.md,
 * « Couleurs »), aucune image. `aria-hidden="true"` posé par l'appelant
 * (ServiceQuadCards.tsx) sur le conteneur commun.
 */
export function ServiceQuadIllustration({
  illustration,
}: {
  illustration: ServiceQuadIllustrationContent;
}) {
  return (
    <div className={styles.frame}>
      <div className={styles.card}>
        {illustration.kind === "product" && <ProductCard content={illustration} />}
        {illustration.kind === "emails" && <EmailsCard content={illustration} />}
        {illustration.kind === "review" && <ReviewCard content={illustration} />}
        {illustration.kind === "invoice" && <InvoiceCard content={illustration} />}
      </div>
    </div>
  );
}

function ProductCard({
  content,
}: {
  content: Extract<ServiceQuadIllustrationContent, { kind: "product" }>;
}) {
  return (
    <div className={styles.product}>
      <div className={styles.productImage} />
      <p className={styles.productName}>{content.name}</p>
      <div className={styles.productFields}>
        {content.fields.map((field) => (
          <div key={field} className={styles.productField}>
            <span>{field}</span>
            <span className={styles.badge}>{content.badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmailsCard({
  content,
}: {
  content: Extract<ServiceQuadIllustrationContent, { kind: "emails" }>;
}) {
  return (
    <div className={styles.emails}>
      {content.emails.map((email, i) => {
        const isLast = i === content.emails.length - 1;
        return (
          <div key={email.label} className={isLast ? styles.emailDark : styles.email}>
            <p className={isLast ? styles.emailLabelAccent : styles.emailLabel}>{email.label}</p>
            <p className={styles.emailSubject}>{email.subject}</p>
          </div>
        );
      })}
    </div>
  );
}

function ReviewCard({
  content,
}: {
  content: Extract<ServiceQuadIllustrationContent, { kind: "review" }>;
}) {
  return (
    <div className={styles.review}>
      <p className={styles.reviewQuestion}>{content.question}</p>
      <div className={styles.stars}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} />
        ))}
      </div>
      <span className={styles.reviewButton}>{content.buttonLabel}</span>
    </div>
  );
}

function InvoiceCard({
  content,
}: {
  content: Extract<ServiceQuadIllustrationContent, { kind: "invoice" }>;
}) {
  return (
    <div className={styles.invoice}>
      <p className={styles.invoiceHeading}>{content.heading}</p>
      <div className={styles.invoiceBars}>
        <span className={styles.invoiceBar} style={{ width: "80%" }} />
        <span className={styles.invoiceBar} style={{ width: "60%" }} />
        <span className={styles.invoiceBar} style={{ width: "70%" }} />
      </div>
      <div className={styles.invoiceRecipients}>
        {content.recipients.map((recipient) => {
          const [prefix, check] = splitTrailingCheck(recipient);
          return (
            <p key={recipient} className={styles.invoiceRecipient}>
              {prefix}
              <span className={styles.invoiceCheck}>{check}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
}

/** Sépare le "✓" final (seul caractère en --accent, CLAUDE.md — le
 *  prompt) du reste de la ligne ("→ Client ✓" → "→ Client " + "✓"). */
function splitTrailingCheck(text: string): [string, string] {
  const lastSpace = text.lastIndexOf(" ");
  return [text.slice(0, lastSpace + 1), text.slice(lastSpace + 1)];
}

function Star() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="var(--accent)" aria-hidden="true">
      <path d="M6 0.5L7.4 4.2L11.3 4.5L8.3 7L9.3 10.9L6 8.7L2.7 10.9L3.7 7L0.7 4.5L4.6 4.2Z" />
    </svg>
  );
}
