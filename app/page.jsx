"use client"

import { useState } from "react"
import { RELATED_LINKS as RELATED } from "./lib/links"

const css = `
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
  .cd-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; transition: border-color .2s; }
  .cd-input.no-prefix { padding-left: 0; }
  .cd-input:focus { border-color: #0891b2; }
  .cd-select { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .4rem 0; outline: none; cursor: pointer; }
  .cd-select:focus { border-color: #0891b2; }
  .cd-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background .2s; }
  .cd-calc-btn:hover { background: #0891b2; }
  .cd-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .cd-result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .cd-result-cell { background: #fff; padding: 1rem 1.25rem; }
  .cd-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .cd-result-val { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #1a1a1a; }
  .cd-result-val.red { color: #b91c1c; }
  .cd-result-val.green { color: #0891b2; }
  .cd-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .cd-prose p:last-child { margin-bottom: 0; }
  .cd-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .cd-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .cd-info-item { padding: .75rem; border-left: 2px solid #7dd3e8; }
  .cd-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .cd-info-body { font-size: 12px; color: #888; line-height: 1.5; }
  .cd-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .cd-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #7dd3e8; line-height: 1; margin-bottom: .4rem; }
  .cd-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .cd-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .cd-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .cd-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .cd-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .cd-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .cd-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .cd-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) {
    .cd-field-row, .cd-result-grid, .cd-info-grid, .cd-tip-grid { grid-template-columns: 1fr; }
  }
`

function fmt(num) {
  return "$" + Math.round(num).toLocaleString("en-US")
}

function fmtDec(num) {
  return "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Page() {
  const [deposit, setDeposit] = useState("")
  const [termMonths, setTermMonths] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [monthsElapsed, setMonthsElapsed] = useState("")
  const [penaltyType, setPenaltyType] = useState("standard")
  const [customPenalty, setCustomPenalty] = useState("")
  const [results, setResults] = useState(null)

  const calculate = () => {
    const principal = parseFloat(deposit)
    const term = parseFloat(termMonths)
    const rate = parseFloat(interestRate) / 100
    const elapsed = parseFloat(monthsElapsed)
    const custom = parseFloat(customPenalty) || 0

    if (!principal || !term || !rate || !elapsed) return

    // Calculate interest earned so far
    const monthlyRate = rate / 12
    const interestEarned = principal * monthlyRate * elapsed
    
    // Interest that would have been earned over full term
    const totalInterestFullTerm = principal * monthlyRate * term
    const remainingInterest = Math.max(0, totalInterestFullTerm - interestEarned)
    
    // Penalty calculation
    let penalty = 0
    let penaltyMonths = 0
    
    if (penaltyType === "standard") {
      // Most banks: 3-6 months of interest on the amount withdrawn
      penaltyMonths = elapsed < term * 0.5 ? 6 : 3
      penalty = (principal + interestEarned) * monthlyRate * penaltyMonths
    } else if (penaltyType === "federal") {
      // Federal regulation D sometimes applies - 30 days interest for early withdrawal
      penaltyMonths = 1
      penalty = (principal + interestEarned) * monthlyRate * penaltyMonths
    } else if (penaltyType === "custom") {
      penalty = custom
    }
    
    // Net proceeds after penalty
    const netProceeds = principal + interestEarned - penalty
    const netGain = netProceeds - principal
    const penaltyPercent = (penalty / (principal + interestEarned)) * 100
    
    // Compare to leaving it untouched
    const ifLeftUntilMaturity = principal + totalInterestFullTerm
    
    setResults({
      interestEarned: Math.round(interestEarned),
      penalty: Math.round(penalty),
      penaltyPercent: penaltyPercent.toFixed(1),
      netProceeds: Math.round(netProceeds),
      netGain: Math.round(netGain),
      ifLeftUntilMaturity: Math.round(ifLeftUntilMaturity),
      remainingInterest: Math.round(remainingInterest),
      penaltyMonths,
    })
  }

  return (
    <>
      <style>{css}</style>
      <main className="cd-wrap">

        <div className="cd-header">
          <p className="cd-eyebrow">Savings & CDs</p>
          <h1 className="cd-title">CD Penalty<br /><em>Calculator</em></h1>
        </div>

        <div className="cd-card">
          <div className="cd-field-row">
            <div>
              <label className="cd-field-label" htmlFor="deposit">Original deposit amount</label>
              <div className="cd-input-wrap">
                <span className="cd-prefix">$</span>
                <input id="deposit" className="cd-input" type="number" min="0" placeholder="10000"
                  value={deposit} onChange={e => setDeposit(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
              </div>
            </div>
            <div>
              <label className="cd-field-label" htmlFor="termMonths">CD term (months)</label>
              <div className="cd-input-wrap">
                <input id="termMonths" className="cd-input no-prefix" type="number" min="1" placeholder="12"
                  value={termMonths} onChange={e => setTermMonths(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
                <span className="cd-suffix" style={{ right: "0" }}>mos</span>
              </div>
            </div>
          </div>

          <div className="cd-field-row">
            <div>
              <label className="cd-field-label" htmlFor="interestRate">Annual interest rate (APY)</label>
              <div className="cd-input-wrap">
                <input id="interestRate" className="cd-input no-prefix" type="number" min="0" step="0.01" placeholder="4.5"
                  value={interestRate} onChange={e => setInterestRate(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
                <span className="cd-suffix" style={{ right: "0" }}>%</span>
              </div>
            </div>
            <div>
              <label className="cd-field-label" htmlFor="monthsElapsed">Months already held</label>
              <div className="cd-input-wrap">
                <input id="monthsElapsed" className="cd-input no-prefix" type="number" min="0" placeholder="6"
                  value={monthsElapsed} onChange={e => setMonthsElapsed(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
                <span className="cd-suffix" style={{ right: "0" }}>mos</span>
              </div>
            </div>
          </div>

          <div className="cd-field-row">
            <div>
              <label className="cd-field-label" htmlFor="penaltyType">Penalty type</label>
              <select id="penaltyType" className="cd-select" value={penaltyType} onChange={e => setPenaltyType(e.target.value)}>
                <option value="standard">Standard bank penalty (3-6 months interest)</option>
                <option value="federal">Federal Regulation D (30 days interest)</option>
                <option value="custom">Custom penalty amount</option>
              </select>
            </div>
            {penaltyType === "custom" && (
              <div>
                <label className="cd-field-label" htmlFor="customPenalty">Custom penalty amount</label>
                <div className="cd-input-wrap">
                  <span className="cd-prefix">$</span>
                  <input id="customPenalty" className="cd-input" type="number" min="0" placeholder="0"
                    value={customPenalty} onChange={e => setCustomPenalty(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
                </div>
              </div>
            )}
          </div>

          <button className="cd-calc-btn" onClick={calculate}>Calculate early withdrawal penalty →</button>

          {results && (
            <div className="cd-results">
              <div className="cd-result-grid">
                <div className="cd-result-cell">
                  <p className="cd-result-label">Interest earned so far</p>
                  <p className="cd-result-val green">{fmt(results.interestEarned)}</p>
                </div>
                <div className="cd-result-cell">
                  <p className="cd-result-label">Early withdrawal penalty</p>
                  <p className="cd-result-val red">{fmt(results.penalty)}</p>
                  <p style={{ fontSize: "10px", color: "#888" }}>({results.penaltyPercent}% of balance)</p>
                </div>
                <div className="cd-result-cell">
                  <p className="cd-result-label">Net proceeds</p>
                  <p className="cd-result-val">{fmt(results.netProceeds)}</p>
                  <p style={{ fontSize: "10px", color: "#888" }}>After penalty</p>
                </div>
                <div className="cd-result-cell">
                  <p className="cd-result-label">Net gain</p>
                  <p className={`cd-result-val ${results.netGain > 0 ? "green" : "red"}`}>
                    {fmt(results.netGain)}
                  </p>
                </div>
              </div>

              <div className="cd-prose" style={{ marginTop: "1rem", padding: "1rem", background: "#f5f3ef", borderRadius: "4px" }}>
                <p style={{ marginBottom: 0, fontWeight: "500" }}>
                  If you leave it until maturity: <strong>{fmt(results.ifLeftUntilMaturity)}</strong>
                </p>
                <p style={{ fontSize: "12px", marginTop: ".5rem", marginBottom: 0 }}>
                  You would earn an additional {fmt(results.remainingInterest)} in interest by keeping the CD for the remaining {Math.max(0, parseFloat(termMonths) - parseFloat(monthsElapsed))} months.
                </p>
              </div>

              <div className="cd-info-grid" style={{ marginTop: "1rem" }}>
                <div className="cd-info-item">
                  <p className="cd-info-title">Penalty amount</p>
                  <p className="cd-info-body">{results.penaltyMonths} month(s) of interest on your current balance</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="cd-card">
          <p className="cd-section-title">How CD early withdrawal penalties work</p>
          <div className="cd-prose">
            <p>Certificates of Deposit (CDs) offer higher interest rates than savings accounts in exchange for locking your money up for a fixed term. If you withdraw before the term ends, the bank charges an early withdrawal penalty — usually a set number of months' worth of interest on the amount withdrawn.</p>
            <p>Standard penalties are typically:</p>
            <ul>
              <li><strong>CD terms under 12 months:</strong> 3 months of interest</li>
              <li><strong>CD terms of 12-60 months:</strong> 6 months of interest</li>
              <li><strong>Some banks:</strong> 90 days of interest regardless of term</li>
              <li><strong>Federal Regulation D:</strong> 30 days of interest in certain cases</li>
            </ul>
            <p>The penalty is calculated on your current balance (principal + earned interest), not just your original deposit. This calculator estimates your net proceeds after penalty so you can decide if early withdrawal is worth it.</p>
          </div>
        </div>

        <div className="cd-card">
          <p className="cd-section-title">Should you break your CD early?</p>
          <div className="cd-prose">
            <p>Breaking a CD early only makes sense if you need the money urgently — or if you can reinvest at a significantly higher rate. Here's when to consider it:</p>
            <p><strong>It might make sense if:</strong></p>
            <ul>
              <li>You have an emergency and need cash immediately</li>
              <li>Interest rates have risen dramatically and reinvesting (after penalty) yields more than keeping your current CD</li>
              <li>The opportunity cost of leaving money locked up is high (e.g., you found a much better investment)</li>
            </ul>
            <p><strong>It rarely makes sense if:</strong></p>
            <ul>
              <li>You're in the first few months of a long-term CD — penalties eat all your earned interest and then some</li>
              <li>You only need the money for a short time — a CD isn't an emergency fund</li>
              <li>You're breaking a CD with a high rate just to move to a slightly higher one — the penalty may wipe out the benefit</li>
            </ul>
          </div>
        </div>

        <div className="cd-card">
          <p className="cd-section-title">Real-world example</p>
          <div className="cd-prose">
            <p>You deposit $20,000 in a 24-month CD earning 5% APY. After 10 months, you need the money for a down payment on a house.</p>
            <p><strong>Interest earned:</strong> ~$833<br />
            <strong>Penalty (6 months interest):</strong> ~$508<br />
            <strong>Net proceeds:</strong> ~$20,325</p>
            <p>You keep $325 of the $833 interest you earned — the bank takes the rest as a penalty. If you had waited just 2 more months, the penalty might have dropped to 3 months ($254), leaving you with ~$579 in interest.</p>
            <p><strong>Bottom line:</strong> Breaking a CD early is expensive. Only do it when necessary.</p>
          </div>
        </div>

        <div className="cd-card">
          <p className="cd-section-title">Strategies to avoid CD penalties</p>
          <div className="cd-tip-grid">
            <div>
              <p className="cd-tip-num">01</p>
              <p className="cd-tip-title">Build a CD ladder</p>
              <p className="cd-tip-body">Open CDs with staggered maturity dates (e.g., 6, 12, 18, 24 months). One matures every 6 months, giving you penalty-free access to some of your money.</p>
            </div>
            <div>
              <p className="cd-tip-num">02</p>
              <p className="cd-tip-title">Choose no-penalty CDs</p>
              <p className="cd-tip-body">Some banks offer CDs with no early withdrawal penalty. Rates are slightly lower, but liquidity is much better. Ally and Marcus both offer these.</p>
            </div>
            <div>
              <p className="cd-tip-num">03</p>
              <p className="cd-tip-title">Use a high-yield savings account instead</p>
              <p className="cd-tip-body">If you might need the money within the CD term, a HYSA offers slightly lower rates but zero penalties for withdrawal. Run the math first.</p>
            </div>
            <div>
              <p className="cd-tip-num">04</p>
              <p className="cd-tip-title">Wait until the penalty period drops</p>
              <p className="cd-tip-body">Many banks reduce the penalty from 6 months to 3 months after you've held the CD for more than half the term. Check your bank's terms.</p>
            </div>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e0dbd3", borderRadius: "4px", padding: "1rem 1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#888" }}>
            Looking for more free financial tools?{" "}
            <a href="https://moneywisecalculator.com" style={{ color: "#0891b2", textDecoration: "underline" }}>
              Visit MoneyWiseCalculator.com
            </a>
          </p>
        </div>

        <div className="cd-card">
          <p className="cd-section-title">Related tools</p>
          <div className="cd-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="cd-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="cd-disclaimer">
            This tool provides estimates for informational purposes only. Penalty structures vary by bank and CD product — check your specific CD terms before making a withdrawal. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="cd-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}