"use client";

import { useState } from "react";
import { RELATED_LINKS as RELATED } from "./lib/links";

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
  .cd-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; }
  .cd-input:focus { border-color: #0891b2; }
  .cd-select { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .4rem 0; outline: none; cursor: pointer; }
  .cd-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; text-transform: uppercase; cursor: pointer; border-radius: 2px; }
  .cd-calc-btn:hover { background: #0891b2; }
  .cd-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .cd-result-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .cd-result-cell { background: #fff; padding: 1rem 1.25rem; }
  .cd-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .cd-result-val { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #1a1a1a; }
  .cd-result-val.red { color: #b91c1c; }
  .cd-result-val.green { color: #0891b2; }
  .cd-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .cd-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .cd-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #7dd3e8; line-height: 1; margin-bottom: .4rem; }
  .cd-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .cd-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .cd-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .cd-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; }
  .cd-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .cd-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .cd-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .cd-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) { .cd-field-row, .cd-result-grid, .cd-tip-grid { grid-template-columns: 1fr; } }
`;

function fmt(num) { return "$" + Math.round(num).toLocaleString("en-US"); }

export default function Page() {
  const [deposit, setDeposit] = useState("");
  const [termMonths, setTermMonths] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthsElapsed, setMonthsElapsed] = useState("");
  const [penaltyType, setPenaltyType] = useState("standard");
  const [customPenalty, setCustomPenalty] = useState("");
  const [results, setResults] = useState(null);

  const calculate = () => {
    const principal = parseFloat(deposit);
    const term = parseFloat(termMonths);
    const rate = parseFloat(interestRate) / 100;
    const elapsed = parseFloat(monthsElapsed);
    if (!principal || !term || !rate || !elapsed) return;
    const monthlyRate = rate / 12;
    const interestEarned = principal * monthlyRate * elapsed;
    let penalty = 0;
    if (penaltyType === "standard") penalty = (principal + interestEarned) * monthlyRate * (elapsed < term * 0.5 ? 6 : 3);
    else if (penaltyType === "federal") penalty = (principal + interestEarned) * monthlyRate * 1;
    else if (penaltyType === "custom") penalty = parseFloat(customPenalty) || 0;
    const netProceeds = principal + interestEarned - penalty;
    setResults({ interestEarned: Math.round(interestEarned), penalty: Math.round(penalty), netProceeds: Math.round(netProceeds) });
  };

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
            <div><label className="cd-field-label">Deposit amount</label><div className="cd-input-wrap"><span className="cd-prefix">$</span><input className="cd-input" type="number" value={deposit} onChange={e => setDeposit(e.target.value)} /></div></div>
            <div><label className="cd-field-label">CD term (months)</label><input className="cd-input" type="number" value={termMonths} onChange={e => setTermMonths(e.target.value)} /></div>
          </div>
          <div className="cd-field-row">
            <div><label className="cd-field-label">Interest rate (APY)</label><div className="cd-input-wrap"><input className="cd-input" type="number" step="0.01" value={interestRate} onChange={e => setInterestRate(e.target.value)} /><span className="cd-suffix">%</span></div></div>
            <div><label className="cd-field-label">Months already held</label><input className="cd-input" type="number" value={monthsElapsed} onChange={e => setMonthsElapsed(e.target.value)} /></div>
          </div>
          <div className="cd-field-row">
            <div><label className="cd-field-label">Penalty type</label><select className="cd-select" value={penaltyType} onChange={e => setPenaltyType(e.target.value)}><option value="standard">Standard (3-6 months interest)</option><option value="federal">Federal Regulation D (30 days)</option><option value="custom">Custom penalty</option></select></div>
            {penaltyType === "custom" && <div><label className="cd-field-label">Custom penalty</label><div className="cd-input-wrap"><span className="cd-prefix">$</span><input className="cd-input" type="number" value={customPenalty} onChange={e => setCustomPenalty(e.target.value)} /></div></div>}
          </div>
          <button className="cd-calc-btn" onClick={calculate}>Calculate penalty →</button>
          {results && (<div className="cd-results"><div className="cd-result-grid"><div className="cd-result-cell"><p className="cd-result-label">Interest earned</p><p className="cd-result-val green">{fmt(results.interestEarned)}</p></div><div className="cd-result-cell"><p className="cd-result-label">Penalty</p><p className="cd-result-val red">{fmt(results.penalty)}</p></div><div className="cd-result-cell"><p className="cd-result-label">Net proceeds</p><p className="cd-result-val">{fmt(results.netProceeds)}</p></div></div></div>)}
        </div>
        <div className="cd-card"><p className="cd-section-title">How CD penalties work</p><div className="cd-prose"><p>CDs offer higher rates than savings accounts in exchange for locking your money up. Withdraw early and the bank charges a penalty — usually 3-6 months of interest. Terms under 12 months often have 3-month penalties; longer terms have 6-month penalties.</p></div></div>
        <div className="cd-card"><p className="cd-section-title">Strategies to avoid penalties</p><div className="cd-tip-grid"><div><p className="cd-tip-num">01</p><p className="cd-tip-title">Build a CD ladder</p><p className="cd-tip-body">Stagger maturity dates so one CD matures every 6 months.</p></div><div><p className="cd-tip-num">02</p><p className="cd-tip-title">Choose no-penalty CDs</p><p className="cd-tip-body">Lower rates but full liquidity. Ally and Marcus offer these.</p></div><div><p className="cd-tip-num">03</p><p className="cd-tip-title">Use a HYSA instead</p><p className="cd-tip-body">Slightly lower rates but zero penalties for withdrawal.</p></div><div><p className="cd-tip-num">04</p><p className="cd-tip-title">Wait for penalty reduction</p><p className="cd-tip-body">Many banks reduce penalty from 6 to 3 months after halfway through the term.</p></div></div></div>
        <div className="cd-card"><p className="cd-section-title">Related tools</p><div className="cd-related-links">{RELATED.map((r, i) => (<a key={i} className="cd-related-link" href={r.href}>{r.label}</a>))}</div><div className="cd-disclaimer">Estimates only. Penalty structures vary by bank. Check your specific CD terms.<div className="cd-footer-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a></div></div></div>
      </main>
    </>
  );
}