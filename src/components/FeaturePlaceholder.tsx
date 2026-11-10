interface FeaturePlaceholderProps {
  eyebrow: string;
  title: string;
  description: string;
}

const FeaturePlaceholder = ({ eyebrow, title, description }: FeaturePlaceholderProps) => (
  <section className="feature-page" aria-labelledby="feature-title">
    <p className="eyebrow">{eyebrow}</p>
    <h1 id="feature-title">{title}</h1>
    <p className="feature-description">{description}</p>
    <div className="feature-status">
      <span className="feature-status-mark" aria-hidden="true" />
      <p>Esta sección está en preparación.</p>
    </div>
  </section>
);

export default FeaturePlaceholder;
