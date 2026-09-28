import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Fingerprint,
  LockKeyhole,
  RotateCw,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';
import HeroArtifact from '../components/HeroArtifact';
import './LandingPage.css';

const MIN_NET_WORTH = 1_000_000;
const MIN_INCOME = 200_000;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export default function LandingPage() {
  const [simNetWorth, setSimNetWorth] = useState(2_450_000);
  const [simIncome, setSimIncome] = useState(380_000);

  const netWorthPass = simNetWorth >= MIN_NET_WORTH;
  const incomePass = simIncome >= MIN_INCOME;
  const overallPass = netWorthPass && incomePass;

  const simulationText = useMemo(
    () =>
      [
        'local_evaluation {',
        `  liquid_net_worth >= ${MIN_NET_WORTH}: ${netWorthPass ? 'true' : 'false'}`,
        `  annual_income >= ${MIN_INCOME}: ${incomePass ? 'true' : 'false'}`,
        `  all_constraints_satisfied: ${overallPass ? 'true' : 'false'}`,
        '}',
      ].join('\n'),
    [incomePass, netWorthPass, overallPass],
  );

  return (
    <main className="landing-page">
      <div className="landing-noise" aria-hidden="true" />

      <section className="landing-hero landing-shell" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-mark" /> Private accreditation / field note 01</p>
          <h1 id="hero-heading">Open the gate. <em>Keep the numbers.</em></h1>
          <p className="hero-lede">
            VentureGate is a privacy-first interface for proving an accreditation condition without turning a person&apos;s financial life into a file attachment.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/verify">
              Start a private check <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a className="button button-quiet" href="#simulator">
              Explore the simulator <ChevronRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-footnote">
            <LockKeyhole size={14} aria-hidden="true" />
            <span>No tax returns, bank statements, or W-2s are requested by this landing page.</span>
          </div>
        </div>

        <div className="hero-art-column">
          <HeroArtifact />
          <p className="artifact-note"><span>CSS perspective study</span> Drag across the vault to change its point of view.</p>
        </div>
      </section>

      <section className="route-strip landing-shell" aria-label="VentureGate destinations">
        <p>Find your way in</p>
        <div className="route-links">
          <Link to="/verify">Verification terminal <ArrowUpRight size={14} aria-hidden="true" /></Link>
          <Link to="/registry">Public registry <ArrowUpRight size={14} aria-hidden="true" /></Link>
          <Link to="/admin">Syndicate admin <ArrowUpRight size={14} aria-hidden="true" /></Link>
          <Link to="/about">Privacy notes <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="manifesto-section landing-shell" aria-labelledby="manifesto-heading">
        <div className="section-index">A / Why this exists</div>
        <div className="manifesto-grid">
          <h2 id="manifesto-heading">Financial eligibility should be a door, not a dossier.</h2>
          <div className="manifesto-body">
            <p>
              Private offerings often ask people to disclose far more than the decision requires. VentureGate narrows the exchange to a yes-or-no condition: enough evidence to evaluate eligibility, no unnecessary balance sheet on display.
            </p>
            <p className="muted-copy">
              The interface is a companion to a real verification flow, not a replacement for legal review or an investment decision.
            </p>
          </div>
        </div>
      </section>

      <section className="simulator-section landing-shell" id="simulator" aria-labelledby="simulator-heading">
        <div className="simulator-header">
          <div>
            <p className="eyebrow">A controlled preview</p>
            <h2 id="simulator-heading">Try the constraint, not the disclosure.</h2>
          </div>
          <div className={`status-badge ${overallPass ? 'is-pass' : 'is-fail'}`} role="status" aria-live="polite">
            {overallPass ? <Check size={16} aria-hidden="true" /> : <AlertTriangle size={16} aria-hidden="true" />}
            <span>{overallPass ? 'Both conditions pass' : 'One or more conditions fail'}</span>
          </div>
        </div>

        <div className="simulator-layout">
          <form className="simulator-controls" aria-label="Accreditation simulation controls">
            <div className="control-heading">
              <ScanLine size={18} aria-hidden="true" />
              <span>Adjust the local inputs</span>
            </div>

            <div className="range-control">
              <div className="range-label-row">
                <label htmlFor="sim-net-worth">Liquid net worth</label>
                <output htmlFor="sim-net-worth">{formatCurrency(simNetWorth)}</output>
              </div>
              <input
                id="sim-net-worth"
                type="range"
                min="200000"
                max="5000000"
                step="50000"
                value={simNetWorth}
                onChange={(event) => setSimNetWorth(Number(event.target.value))}
                aria-describedby="net-worth-help"
              />
              <div className="range-meta" id="net-worth-help">
                <span>Threshold {formatCurrency(MIN_NET_WORTH)}</span>
                <span className={netWorthPass ? 'pass-text' : 'fail-text'}>{netWorthPass ? 'Pass' : 'Below threshold'}</span>
              </div>
            </div>

            <div className="range-control">
              <div className="range-label-row">
                <label htmlFor="sim-income">Annual income</label>
                <output htmlFor="sim-income">{formatCurrency(simIncome)}</output>
              </div>
              <input
                id="sim-income"
                type="range"
                min="50000"
                max="1000000"
                step="25000"
                value={simIncome}
                onChange={(event) => setSimIncome(Number(event.target.value))}
                aria-describedby="income-help"
              />
              <div className="range-meta" id="income-help">
                <span>Threshold {formatCurrency(MIN_INCOME)}</span>
                <span className={incomePass ? 'pass-text' : 'fail-text'}>{incomePass ? 'Pass' : 'Below threshold'}</span>
              </div>
            </div>

            <p className="simulation-disclaimer">
              <RotateCw size={14} aria-hidden="true" /> This is a simulation only. It does not create a proof, contact a network, or determine actual accreditation.
            </p>
          </form>

          <div className={`evaluation-panel ${overallPass ? 'is-pass' : 'is-fail'}`} aria-label="Simulation result">
            <div className="evaluation-topline">
              <span>Local condition readout</span>
              <Fingerprint size={18} aria-hidden="true" />
            </div>
            <div className="evaluation-result">
              <span className="result-symbol" aria-hidden="true">{overallPass ? '◉' : '⊘'}</span>
              <div>
                <strong>{overallPass ? 'Conditions satisfied' : 'Conditions not satisfied'}</strong>
                <p>{overallPass ? 'The selected values meet both example thresholds.' : 'Move both inputs above their example thresholds to continue.'}</p>
              </div>
            </div>
            <pre className="evaluation-code" aria-label="Readable simulation output"><code>{simulationText}</code></pre>
            <p className="evaluation-footnote">Example thresholds are shown for interface exploration and may not match any offering or applicable legal standard.</p>
          </div>
        </div>
      </section>

      <section className="how-section landing-shell" aria-labelledby="how-heading">
        <div className="how-intro">
          <div className="section-index">B / How it works</div>
          <h2 id="how-heading">A smaller exchange between person and gate.</h2>
          <p>When connected to an appropriate verification flow, only the result needed by the receiving party should travel onward.</p>
        </div>
        <ol className="process-list">
          <li>
            <span className="process-number">01</span>
            <div><h3>Set the condition</h3><p>A syndicate defines the eligibility rule it needs to evaluate.</p></div>
            <ShieldCheck size={22} aria-hidden="true" />
          </li>
          <li>
            <span className="process-number">02</span>
            <div><h3>Keep evidence local</h3><p>The person supplies the relevant inputs inside the intended private flow.</p></div>
            <LockKeyhole size={22} aria-hidden="true" />
          </li>
          <li>
            <span className="process-number">03</span>
            <div><h3>Share the minimum</h3><p>The receiving party gets a verification outcome, not a casual copy of the underlying numbers.</p></div>
            <Fingerprint size={22} aria-hidden="true" />
          </li>
        </ol>
      </section>

      <section className="closing-section landing-shell" aria-labelledby="closing-heading">
        <div className="closing-mark" aria-hidden="true"><span /><span /><span /></div>
        <div>
          <p className="eyebrow">A considered first step</p>
          <h2 id="closing-heading">Build trust with less to carry.</h2>
          <p>Enter the verification terminal when you are ready to explore the actual product flow.</p>
        </div>
        <Link className="button button-primary" to="/verify">Open verification <ArrowRight size={17} aria-hidden="true" /></Link>
      </section>

      <p className="landing-disclaimer landing-shell">VentureGate is a software interface concept. Nothing on this page is financial, legal, or investment advice, and no network attestation is represented here.</p>
    </main>
  );
}
