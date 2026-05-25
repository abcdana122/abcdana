import { useState } from "react";
import { pressItems } from "../../data/portfolioData";
import "./press.css";

const PRESS_PREVIEW_COUNT = 3;

function PressCard({ item, index }) {
  const content = (
    <>
      <div className="press-thumb">
        {item.image ? (
          <img src={item.image} alt={item.title} />
        ) : (
          <div className="press-thumb-placeholder" />
        )}
      </div>

      <div className="press-body">
        <div className="press-meta">
          <span>{item.id}</span>
          {item.link && <span>↗</span>}
        </div>

        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </>
  );

  if (item.link) {
    return (
      <a
        className="press-card press-card-link"
        href={item.link}
        target="_blank"
        rel="noreferrer"
        style={{ "--press-delay": `${index * 80}ms` }}
      >
        {content}
      </a>
    );
  }

  return (
    <article
      className="press-card"
      style={{ "--press-delay": `${index * 80}ms` }}
    >
      {content}
    </article>
  );
}

export function Press() {
  const [showAllPress, setShowAllPress] = useState(false);

  const visiblePressItems = showAllPress
    ? pressItems
    : pressItems.slice(0, PRESS_PREVIEW_COUNT);

  const hiddenPressCount = Math.max(
    pressItems.length - PRESS_PREVIEW_COUNT,
    0
  );

  return (
    <section id="press" className="press-panel-section snap-section">
      <div className="press-panel-title" data-reveal>
        <h2>
          <span>Seen</span>
          <span>in Media.</span>
        </h2>

        <p className="eyebrow">PRESS</p>
      </div>

      <div className="press-grid">
        {visiblePressItems.map((item, index) => (
          <PressCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {hiddenPressCount > 0 && (
        <button
          type="button"
          className="press-more-button"
          onClick={() => setShowAllPress((prev) => !prev)}
        >
          {showAllPress ? "Less" : `More +${hiddenPressCount}`}
        </button>
      )}
    </section>
  );
}