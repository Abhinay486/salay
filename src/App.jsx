import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // State for base pay and rates
  const [basePay, setBasePay] = useState('')
  const [daRate, setDaRate] = useState('')
  const [hraRate, setHraRate] = useState('')
  const [irRate, setIrRate] = useState('')
  
  // State for earnings
  const [hma, setHma] = useState('')
  const [others, setOthers] = useState('')
  const [cca, setCca] = useState('')
  
  // State for deductions
  const [zppf, setZppf] = useState(4000)
  const [apgli, setApgli] = useState(2200)
  const [gis, setGis] = useState(60)
  const [pt, setPt] = useState(200)
  const [ehs, setEhs] = useState(225)
  const [ewf, setEwf] = useState(0)
  const [swf, setSwf] = useState(0)
  const [advtax, setAdvtax] = useState(2000)
  
  // Calculated values
  const [calculations, setCalculations] = useState({
    da: 0,
    hra: 0,
    ir: 0,
    grossPay: 0,
    totalDeductions: 0,
    netPay: 0
  })

  // Prevent Arrow keys from changing number inputs; allow normal scrolling
  const inputEvents = {
    onKeyDown: (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'PageUp' || e.key === 'PageDown') {
        e.preventDefault()
      }
    },
  }

  // Blur focused number input before wheel default to avoid value changes but keep page scrolling
  const handleWheelCapture = () => {
    const el = document.activeElement
    if (el && el.tagName === 'INPUT' && el.getAttribute('type') === 'number') {
      el.blur()
    }
  }

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value)
  }

  // Calculate all values whenever any input changes
  useEffect(() => {
    const basePayNum = Number(basePay) || 0;
    const daRateNum = Number(daRate) || 0;
    const hraRateNum = Number(hraRate) || 0;
    const irRateNum = Number(irRate) || 0;
    const hmaNum = Number(hma) || 0;
    const othersNum = Number(others) || 0;
    const ccaNum = Number(cca) || 0;
    
    const da = basePayNum * daRateNum / 100;
    const hra = basePayNum * hraRateNum / 100;
    const ir = basePayNum * irRateNum / 100;
    const grossPay = basePayNum + da + hra + ir + hmaNum + othersNum + ccaNum
    const totalDeductions = zppf + apgli + gis + pt + ehs + ewf + swf + advtax
    const netPay = grossPay - totalDeductions

    setCalculations({
      da,
      hra,
      ir,
      grossPay,
      totalDeductions,
      netPay
    })
  }, [basePay, daRate, hraRate, irRate, hma, others, cca, zppf, apgli, gis, pt, ehs, ewf, swf, advtax])

  return (
  <div className="app-container" onWheelCapture={handleWheelCapture}>
      <div className="page-header">
        <h1 className="page-title">Salary Calculator</h1>
        <p className="page-subtitle">Calculate your salary breakdown with deductions</p>
      </div>
      <div className="calculator-wrapper">
        {/* Base Pay Input */}
        <div className="base-pay-section">
          <label className="base-pay-label">Base Pay</label>
          <div className="input-wrapper">
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              value={basePay}
              onChange={(e) => setBasePay(e.target.value)}
              placeholder="Enter base pay"
              className="base-pay-input"
              {...inputEvents}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="content-card">
          <div className="content-grid">
            {/* Earnings Section */}
            <div className="earnings-section">
              <h2 className="section-title earnings-title">Earnings</h2>
              <div className="items-list">
                <div className="item-row">
                  <span className="item-label">Base Pay</span>
                  <span className="item-value">{formatCurrency(Number(basePay) || 0)}</span>
                </div>

                <div className="item-row">
                  <div className="rate-input-group">
                    <span className="item-label">DA</span>
                    <input
                      type="number"
                      
                      value={daRate}
                      onChange={(e) => setDaRate(e.target.value)}
                      className="rate-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                    <span className="item-label">%</span>
                  </div>
                  <span className="item-value">{formatCurrency(calculations.da)}</span>
                </div>

                <div className="item-row">
                  <div className="rate-input-group">
                    <span className="item-label">HRA</span>
                    <input
                      type="number"
                      
                      value={hraRate}
                      onChange={(e) => setHraRate(e.target.value)}
                      className="rate-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                    <span className="item-label">%</span>
                  </div>
                  <span className="item-value">{formatCurrency(calculations.hra)}</span>
                </div>

                <div className="item-row">
                  <div className="rate-input-group">
                    <span className="item-label">IR</span>
                    <input
                      type="number"
                      
                      value={irRate}
                      onChange={(e) => setIrRate(e.target.value)}
                      className="rate-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                    <span className="item-label">%</span>
                  </div>
                  <span className="item-value">{formatCurrency(calculations.ir)}</span>
                </div>

                <div className="item-row">
                  <span className="item-label">HMA</span>
                  <div className="amount-input-wrapper">
                    <span className="input-currency">₹</span>
                    <input
                      type="number"
                      value={hma}
                      onChange={(e) => setHma(e.target.value)}
                      className="amount-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                  </div>
                </div>

                <div className="item-row">
                  <span className="item-label">OTHERS</span>
                  <div className="amount-input-wrapper">
                    <span className="input-currency">₹</span>
                    <input
                      type="number"
                      value={others}
                      onChange={(e) => setOthers(e.target.value)}
                      className="amount-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                  </div>
                </div>

                <div className="item-row">
                  <span className="item-label">CCA</span>
                  <div className="amount-input-wrapper">
                    <span className="input-currency">₹</span>
                    <input
                      type="number"
                      value={cca}
                      onChange={(e) => setCca(e.target.value)}
                      className="amount-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                  </div>
                </div>

                <div className="total-row earnings-total">
                  <span className="total-label">GROSS PAY</span>
                  <span className="total-value">{formatCurrency(calculations.grossPay)}</span>
                </div>
              </div>
            </div>

            {/* Deductions Section */}
            <div className="deductions-section">
              <h2 className="section-title deductions-title">Deductions</h2>
              <div className="items-list">
                <div className="item-row">
                  <span className="item-label">ZPPF</span>
                  <div className="amount-input-wrapper">
                    <span className="input-currency">₹</span>
                    <input
                      type="number"
                      value={zppf}
                      onChange={(e) => setZppf(e.target.value === '' ? '' : Number(e.target.value))}
                      className="amount-input deduction-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                  </div>
                </div>

                <div className="item-row">
                  <span className="item-label">APGLI</span>
                  <div className="amount-input-wrapper">
                    <span className="input-currency">₹</span>
                    <input
                      type="number"
                      value={apgli}
                      onChange={(e) => setApgli(e.target.value === '' ? '' : Number(e.target.value))}
                      className="amount-input deduction-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                  </div>
                </div>

                <div className="item-row">
                  <span className="item-label">GIS</span>
                  <div className="amount-input-wrapper">
                    <span className="input-currency">₹</span>
                    <input
                      type="number"
                      value={gis}
                      onChange={(e) => setGis(e.target.value === '' ? '' : Number(e.target.value))}
                      className="amount-input deduction-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                  </div>
                </div>

                <div className="item-row">
                  <span className="item-label">PT</span>
                  <div className="amount-input-wrapper">
                    <span className="input-currency">₹</span>
                    <input
                      type="number"
                      value={pt}
                      onChange={(e) => setPt(e.target.value === '' ? '' : Number(e.target.value))}
                      className="amount-input deduction-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                  </div>
                </div>

                <div className="item-row">
                  <span className="item-label">EHS</span>
                  <div className="amount-input-wrapper">
                    <span className="input-currency">₹</span>
                    <input
                      type="number"
                      value={ehs}
                      onChange={(e) => setEhs(e.target.value === '' ? '' : Number(e.target.value))}
                      className="amount-input deduction-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                  </div>
                </div>

                <div className="item-row">
                  <span className="item-label">EWF</span>
                  <div className="amount-input-wrapper">
                    <span className="input-currency">₹</span>
                    <input
                      type="number"
                      value={ewf}
                      onChange={(e) => setEwf(e.target.value === '' ? '' : Number(e.target.value))}
                      className="amount-input deduction-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                  </div>
                </div>

                <div className="item-row">
                  <span className="item-label">SWF</span>
                  <div className="amount-input-wrapper">
                    <span className="input-currency">₹</span>
                    <input
                      type="number"
                      value={swf}
                      onChange={(e) => setSwf(e.target.value === '' ? '' : Number(e.target.value))}
                      className="amount-input deduction-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                  </div>
                </div>

                <div className="item-row">
                  <span className="item-label">ADVTAX</span>
                  <div className="amount-input-wrapper">
                    <span className="input-currency">₹</span>
                    <input
                      type="number"
                      value={advtax}
                      onChange={(e) => setAdvtax(e.target.value === '' ? '' : Number(e.target.value))}
                      className="amount-input deduction-input"
                      placeholder="0"
                      {...inputEvents}
                    />
                  </div>
                </div>

                <div className="total-row deductions-total">
                  <span className="total-label">TOTAL DEDUCTIONS</span>
                  <span className="total-value">{formatCurrency(calculations.totalDeductions)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Pay Section */}
          <div className="net-pay-section">
            <h2 className="net-pay-label">NET PAY</h2>
            <div className="net-pay-value">{formatCurrency(calculations.netPay)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
