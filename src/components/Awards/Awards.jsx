import { useMemo, useState } from "react";
import { awardTabs } from "../../data/portfolioData";
import "./Awards.css";

const AWARD_PREVIEW_COUNT = 4;

const parseAwardItem = (item) => {
  const match = item.match(/^(\d{4}(?:-\d{4})?)\s+(.+)$/);

  const rawTitle = match ? match[2] : item;
  const detailMatch = rawTitle.match(/^(.*?)\s*(\(.+\))$/);

  return {
    year: match ? match[1] : "ARCHIVE",
    title: detailMatch ? detailMatch[1] : rawTitle,
    detail: detailMatch ? detailMatch[2] : "",
  };
};

export function Awards() {
  const [activeAwardTab, setActiveAwardTab] = useState("preview");
  const [showAllAwards, setShowAllAwards] = useState(false);

  const activeAward = useMemo(
    () => awardTabs.find((tab) => tab.id === activeAwardTab) ?? awardTabs[0],
    [activeAwardTab]
  );

  const visibleAwardItems = showAllAwards
    ? activeAward.items
    : activeAward.items.slice(0, AWARD_PREVIEW_COUNT);

  const hiddenAwardCount = Math.max(
    activeAward.items.length - AWARD_PREVIEW_COUNT,
    0
  );

  return (
    <section id="awards" className="trophy-archive-section snap-section">
      <div className="trophy-archive-layout">
        <div className="trophy-log-zone">
          <div className="trophy-text-tabs trophy-tabs-left" data-reveal>
            {awardTabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                className={activeAwardTab === tab.id ? "active" : ""}
                onClick={() => {
                  setActiveAwardTab(tab.id);
                  setShowAllAwards(false);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="trophy-log">
            {visibleAwardItems.map((item, index) => {
              const award = parseAwardItem(item);

              return (
                <article
                  className="trophy-log-item"
                  key={`${activeAward.id}-${index}-${item}`}
                  style={{ "--item-delay": `${index * 45}ms` }}
                >
                  <span className="trophy-year">{award.year}</span>
                  <h3>
                    <span className="award-title-main">{award.title}</span>
                    {award.detail && (
                      <span className="award-title-detail">{award.detail}</span>
                    )}
                  </h3>
                </article>
              );
            })}
          </div>

          {hiddenAwardCount > 0 && (
            <button
              type="button"
              className="trophy-more-button"
              onClick={() => setShowAllAwards((prev) => !prev)}
            >
              {showAllAwards ? "Less" : `More +${hiddenAwardCount}`}
            </button>
          )}
        </div>

        <aside className="trophy-archive-side">
          <p className="eyebrow">TROPHY ARCHIVE</p>

          <h2>
            Proof
            <br />
            Archive.
          </h2>

          <p>
            저는 기술을 사회적 가치로 연결하는 방법을 고민해왔습니다.
            <br/>
            그 과정에서 일부는 수상이라는 결과로 이어졌습니다.
          </p>
        </aside>
      </div>
    </section>
  );
}
