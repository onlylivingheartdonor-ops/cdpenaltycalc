import CDPenaltyCalculator from "./CDPenaltyCalculator"
import { RELATED_LINKS as RELATED } from "./lib/links"

const staticCss = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .cd-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .cd-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .cd-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .cd-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .cd-title em { font-style: italic; color: #0891b2; }
  .cd-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .cd-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }
  .cd-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .cd-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .cd-input-wrap { position: relative; }
  .cd-prefix { position: absolute; left: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .cd-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .4rem 0 .4rem 1.2rem; outline: none; }
  .cd-input:focus { border-color: #0891b2; }
  .cd-select { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: .9rem; color: #1a1a1a; padding: .4rem 0; outline: none; cursor: pointer; }
  .cd-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background .15s; }
  .cd-calc-btn:hover { background: #0891b2; }
  .cd-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .cd-result-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .cd-result-cell { background: #fff; padding: 1rem; }
  .cd-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .cd-result-val { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #1a1a1a; }
  .cd-result-val.red { color: #b91c1c; }
  .cd-result-val.green { color: #0891b2; }
  .cd-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .cd-info-item { padding: .75rem; border-left: 2px solid #7dd3e8; }
  .cd-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .cd-info-body { font-size: 12px; color: #888; line-height: 1.5; }
  .cd-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .cd-prose p:last-child { margin-bottom: 0; }
  .cd-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .cd-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .cd-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #7dd3e8; line-height: 1; margin-bottom: .4rem; }
  .cd-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .cd-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .cd-faq-item { border-bottom: 1px solid #e0dbd3; padding: 1rem 0; }
  .cd-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
  .cd-faq-q { font-size: 13px; font-weight: 500; color: #1a1a1a; margin-bottom: .4rem; }
  .cd-faq-a { font-size: 13px; color: #555; line-height: 1.7; }
  .sub-nav { font-size: 12px; margin-bottom: 1.5rem; }
  .sub-nav a { color: #0891b2; text-decoration: none; }
  .sub-nav a:hover { text-decoration: underline; }
  .cd-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .cd-related-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
  .cd-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .cd-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .cd-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .cd-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .cd-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 640px) {
    .cd-field-row, .cd-result-grid, .cd-info-grid, .cd-tip-grid { grid-template-columns: 1fr; }
  }
`

const FAQ = [
  {
    q: "What is a CD early withdrawal penalty?",
    a: "A CD early withdrawal penalty is a fee banks charge when you withdraw money from a Certificate of Deposit before its maturity date. The penalty is typically expressed as a number of months' worth of interest — usually 3 months for CDs with terms under 12 months, and 6 months for longer terms. Some banks use a flat percentage or a different calculation, so always check your specific CD's terms."
  },
  {
    q: "How is the penalty calculated?",
    a: "Most banks calculate the penalty as a certain number of months of interest on the full balance (principal plus interest earned so far). For example, on a $10,000 CD at 4% APY broken after 8 months, a 6-month penalty would forfeit roughly $200 — which could wipe out most or all of the interest you earned. This calculator uses the standard formula: (principal + accrued interest) × (monthly rate) × (penalty months)."
  },
  {
    q: "When does breaking a CD make sense?",
    a: "Breaking a CD makes financial sense in three scenarios: First, if interest rates have risen significantly and you can reinvest at a much higher rate — the extra interest from the new CD may outweigh the penalty. Second, if you genuinely need the cash for an emergency or important purchase. Third, if you're in a very low penalty window (e.g., close to maturity). Always run the numbers — this calculator helps you do exactly that."
  },
  {
    q: "What's the difference between standard and federal penalty types?",
    a: "Standard penalties are what most banks use: 3 months' interest for CDs under 12 months, 6 months for longer terms. Federal Regulation D used to mandate a minimum 30-day penalty on certain time deposits — though Reg D has been relaxed, some banks still reference it. 'Federal' here represents a 30-day interest penalty. Custom allows you to enter any specific dollar penalty your bank charges."
  },
  {
    q: "What is a no-penalty CD?",
    a: "No-penalty CDs allow you to withdraw your money early without paying a fee. The tradeoff is a lower interest rate — typically 0.5–1.0% below standard CDs. These are offered by online banks like Ally, Marcus, and CIT Bank. They make sense if you value liquidity but still want a guaranteed rate. Use this calculator to compare: if a standard CD's penalty risk is low, the higher rate might still win."
  },
  {
    q: "What is a CD ladder and how does it help?",
    a: "A CD ladder spreads your money across multiple CDs with staggered maturity dates — e.g., 6-month, 1-year, 18-month, and 2-year CDs. As each CD matures, you reinvest it in a new long-term CD. This gives you regular access to a portion of your funds (every 6 months in this example) without penalties, while still earning higher long-term rates on most of your money."
  }
]

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: staticCss }} />
      <main className="cd-wrap">

        <p className="sub-nav"><a href="https://moneywisecalculator.com">← More free tools at MoneyWise Calculator</a></p>

        <div className="cd-header">
          <p className="cd-eyebrow">Savings & CDs</p>
          <h1 className="cd-title">CD Penalty<br /><em>Calculator</em></h1>
        </div>

        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}>
          Free tool to calculate early withdrawal penalties on Certificates of Deposit. Enter your CD details to see interest earned, penalty amount, net proceeds, and whether breaking the CD makes financial sense.
        </p>

        {/* INTERACTIVE TOOL — client component */}
        <CDPenaltyCalculator />

        {/* HOW IT WORKS */}
        <div className="cd-card">
          <p className="cd-section-title">How this calculator works</p>
          <div className="cd-prose">
            <p>This calculator uses standard bank formulas to estimate your early withdrawal penalty. It first calculates how much interest you've earned so far using simple monthly compounding. Then it applies the penalty based on your selected method: standard bank penalties (3 months for CDs beyond halfway, 6 months before halfway), the former federal minimum (30 days), or a custom dollar amount you specify.</p>
            <p>The net proceeds shown is what you would actually walk away with after the penalty — your original deposit plus any interest earned minus the penalty. If the penalty exceeds your earned interest, you'll lose a portion of your original principal. This is the real cost of breaking a CD, and knowing it upfront helps you make better decisions.</p>
            <p>The calculator uses the banking industry standard formula: (principal + accrued interest) × (monthly interest rate) × (penalty months). This matches how most major banks — including Chase, Bank of America, Wells Fargo, and online banks like Ally and Marcus — calculate their early withdrawal penalties.</p>
          </div>
          <div className="cd-info-grid">
            <div className="cd-info-item">
              <p className="cd-info-title">The halfway rule</p>
              <p className="cd-info-body">Many banks reduce the penalty after you pass the halfway point of your CD term. A 24-month CD broken at month 13 typically pays a 3-month penalty instead of 6 months. This calculator applies that rule automatically for standard penalties.</p>
            </div>
            <div className="cd-info-item">
              <p className="cd-info-title">Interest vs. principal loss</p>
              <p className="cd-info-body">If the penalty exceeds your earned interest, you lose part of your original deposit. For example, a $10,000 CD broken very early might earn $50 in interest but face a $200 penalty — you'd get back $9,850, losing $150 of principal.</p>
            </div>
            <div className="cd-info-item">
              <p className="cd-info-title">Rate change opportunity</p>
              <p className="cd-info-body">If market rates have risen 1–2% above your CD's rate, breaking early to reinvest might make sense. The higher interest on a new CD can offset the penalty within 12–24 months. Run both scenarios to compare.</p>
            </div>
            <div className="cd-info-item">
              <p className="cd-info-title">Brick-and-mortar vs. online</p>
              <p className="cd-info-body">Online banks typically offer higher CD rates but may have stricter penalty terms. Traditional banks sometimes offer penalty waivers for certain circumstances (death, disability). Always check your specific deposit agreement.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="cd-card">
          <p className="cd-section-title">Why CD penalties deserve attention</p>
          <div className="cd-prose">
            <p>CDs are marketed as safe, predictable investments — and they are. But the early withdrawal penalty is a hidden cost that most people don't fully understand until they need the money. A 6-month interest penalty on a 5-year CD can wipe out over a year's worth of earnings. In some cases, especially early in the term, you can actually lose part of your original principal.</p>
            <p>The average CD penalty on a $20,000 deposit at 4.5% is roughly $300–$450. That's not trivial — it's a week's groceries, a car payment, or a significant chunk of what you earned in interest. For longer-term CDs with higher rates, penalties can exceed $1,000.</p>
            <p>The key is knowing the number before you need to withdraw. This calculator gives you that number instantly, so you can compare: is the penalty worth paying? Sometimes yes — an emergency expense or a much higher reinvestment rate justifies the cost. Sometimes no — and knowing that prevents an expensive mistake.</p>
          </div>
        </div>

        {/* STRATEGIES */}
        <div className="cd-card">
          <p className="cd-section-title">Strategies to reduce or avoid CD penalties</p>
          <div className="cd-tip-grid">
            <div>
              <p className="cd-tip-num">01</p>
              <p className="cd-tip-title">Build a CD ladder</p>
              <p className="cd-tip-body">Stagger maturity dates across 1, 2, 3, 4, and 5 years. When the 1-year CD matures, reinvest it in a new 5-year CD. You get long-term rates plus annual access to 20% of your money with no penalty.</p>
            </div>
            <div>
              <p className="cd-tip-num">02</p>
              <p className="cd-tip-title">Choose no-penalty CDs</p>
              <p className="cd-tip-body">Ally, Marcus, and CIT Bank offer no-penalty CDs. Rates are 0.5–1.0% lower than standard CDs, but you can withdraw any time without fees. Ideal for emergency funds or uncertain time horizons.</p>
            </div>
            <div>
              <p className="cd-tip-num">03</p>
              <p className="cd-tip-title">Consider a high-yield savings account</p>
              <p className="cd-tip-body">HYSA rates often trail CDs by 0.5–1.0%, but there are zero penalties for withdrawal. If you might need the money within a year, the slightly lower rate is worth the liquidity.</p>
            </div>
            <div>
              <p className="cd-tip-num">04</p>
              <p className="cd-tip-title">Wait for the penalty window</p>
              <p className="cd-tip-body">If you're close to the halfway point of your CD term, waiting could cut your penalty in half — from 6 months to 3 months. On a large CD, that's potentially hundreds of dollars saved.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="cd-card">
          <p className="cd-section-title">Frequently asked questions</p>
          {FAQ.map((item, i) => (
            <div className="cd-faq-item" key={i}>
              <p className="cd-faq-q">{item.q}</p>
              <p className="cd-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* RELATED */}
        <div className="cd-card">
          <p className="cd-section-title">Related tools</p>
          <p className="cd-related-label">More free tools from the MoneyWise Calculator network</p>
          <div className="cd-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="cd-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="cd-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Penalty structures vary by financial institution. Always check your specific CD's deposit agreement before making a withdrawal decision. This site uses cookies and analytics. By using this site, you agree to our{" "}
            <a href="/privacy" style={{ color: "#888" }}>Privacy Policy</a> and{" "}
            <a href="/terms" style={{ color: "#888" }}>Terms of Service</a>.
            <div className="cd-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://moneywisecalculator.com">MoneyWise Calculator</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}