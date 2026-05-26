"use client"

import { useState } from "react"

export default function CDPenaltyCalculator() {
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
    if (!principal || !term || !rate || !elapsed || elapsed > term) return
    
    const monthlyRate = rate / 12
    const interestEarned = principal * monthlyRate * elapsed
    
    let penalty = 0
    if (penaltyType === "standard") {
      const penaltyMonths = elapsed < term / 2 ? 6 : 3
      penalty = (principal + interestEarned) * monthlyRate * penaltyMonths
    } else if (penaltyType === "federal") {
      penalty = (principal + interestEarned) * monthlyRate * 1
    } else if (penaltyType === "custom") {
      penalty = parseFloat(customPenalty) || 0
    }
    
    const netProceeds = principal + interestEarned - penalty
    setResults({
      interestEarned: Math.round(interestEarned),
      penalty: Math.round(penalty),
      netProceeds: Math.round(netProceeds),
      percentLost: penalty > 0 ? (penalty / interestEarned * 100) : 0
    })
  }

  return (
    <div className="cd-card">
      <div className="cd-field-row">
        <div>
          <label className="cd-field-label">Deposit amount</label>
          <div className="cd-input-wrap">
            <span className="cd-prefix">$</span>
            <input 
              className="cd-input" 
              type="number" 
              placeholder="0.00" 
              value={deposit} 
              onChange={e => setDeposit(e.target.value)} 
            />
          </div>
        </div>
        <div>
          <label className="cd-field-label">CD term (months)</label>
          <input 
            className="cd-input" 
            type="number" 
            placeholder="e.g., 12, 24, 36" 
            value={termMonths} 
            onChange={e => setTermMonths(e.target.value)} 
          />
        </div>
      </div>

      <div className="cd-field-row">
        <div>
          <label className="cd-field-label">Interest rate (APY)</label>
          <div className="cd-input-wrap">
            <input 
              className="cd-input" 
              type="number" 
              step="0.01" 
              placeholder="4.5" 
              value={interestRate} 
              onChange={e => setInterestRate(e.target.value)} 
            />
            <span style={{ position: "absolute", right: "0", top: ".4rem", fontSize: "1rem", color: "#aaa" }}>%</span>
          </div>
        </div>
        <div>
          <label className="cd-field-label">Months already held</label>
          <input 
            className="cd-input" 
            type="number" 
            placeholder="0" 
            value={monthsElapsed} 
            onChange={e => setMonthsElapsed(e.target.value)} 
          />
        </div>
      </div>

      <div className="cd-field-row">
        <div>
          <label className="cd-field-label">Penalty type</label>
          <select 
            className="cd-select" 
            value={penaltyType} 
            onChange={e => setPenaltyType(e.target.value)}
          >
            <option value="standard">Standard (3–6 months interest)</option>
            <option value="federal">Federal Regulation D (30 days)</option>
            <option value="custom">Custom penalty amount</option>
          </select>
        </div>
        {penaltyType === "custom" && (
          <div>
            <label className="cd-field-label">Custom penalty amount</label>
            <div className="cd-input-wrap">
              <span className="cd-prefix">$</span>
              <input 
                className="cd-input" 
                type="number" 
                placeholder="0.00" 
                value={customPenalty} 
                onChange={e => setCustomPenalty(e.target.value)} 
              />
            </div>
          </div>
        )}
      </div>

      <button className="cd-calc-btn" onClick={calculate}>
        Calculate penalty →
      </button>

      {results && (
        <div className="cd-results">
          <div className="cd-result-grid">
            <div className="cd-result-cell">
              <p className="cd-result-label">Interest earned</p>
              <p className="cd-result-val green">${results.interestEarned.toLocaleString("en-US")}</p>
            </div>
            <div className="cd-result-cell">
              <p className="cd-result-label">Penalty</p>
              <p className="cd-result-val red">${results.penalty.toLocaleString("en-US")}</p>
            </div>
            <div className="cd-result-cell">
              <p className="cd-result-label">Net proceeds</p>
              <p className="cd-result-val">${results.netProceeds.toLocaleString("en-US")}</p>
            </div>
          </div>
          {results.penalty > 0 && results.interestEarned > 0 && (
            <p style={{ fontSize: "12px", color: "#888", marginTop: "-.5rem", marginBottom: "1rem" }}>
              Penalty consumes {results.percentLost.toFixed(0)}% of interest earned.
              {results.penalty > results.interestEarned && " You would lose part of your principal."}
            </p>
          )}
        </div>
      )}
    </div>
  )
}