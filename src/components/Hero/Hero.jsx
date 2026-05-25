import "./Hero.css";

export function Hero({ heroRef }) {
  return (
    <section id="top main" className="hero" ref={heroRef}>
      <div className="browser-shell">
        <div className="browser-backdrop" />

        <div className="browser">
          <div className="browser-top">
            <div className="browser-shine" />

            <div className="dots">
              <span />
              <span />
              <span />
            </div>

            <div className="plus">+</div>
          </div>

          <div className="browser-body">
            <div className="hero-copy">
              <p className="eyebrow">Hello! I'm Danah Kim 👩‍💻🌱</p>

              <h1>
                <span className="line">I connect possibilities</span>
                <span className="line">
                  through <span className="point">algorithms.</span>
                </span>
              </h1>
            </div>

            <div className="hero-bottom-row">
              <p className="hero-desc">
                기술을 사회적 가치로 연결하며,<br/>
                코드 너머의 변화를 만듭니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
