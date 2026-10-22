import { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";

/* ── Quick-action data ── */
const QUICK_ACTIONS = [
  { id: "onetoken",   icon: <PhoneIcon />,    label: "OneToken" },
  { id: "scanpay",    icon: <ScanIcon />,      label: "Scan & Pay" },
  { id: "paynow",     icon: <PayNowIcon />,    label: "PayNow" },
  { id: "wealth",     icon: <BulbIcon />,      label: "Wealth Insights" },
  { id: "fx",         icon: <FxIcon />,        label: "Foreign Exchange" },
  { id: "more",       icon: <MoreIcon />,      label: "More" },
];

const DASH_ACTIONS = [
  { id: "paynow-d",  icon: <PayNowIcon />,   label: "PayNow" },
  { id: "scanpay-d", icon: <ScanIcon />,     label: "Scan & Pay" },
  { id: "bill",      icon: <BillIcon />,     label: "Bill payment" },
];

const TABS = ["Accounts", "Loans", "Insurance", "Net worth"];

export default function App() {
  const { state, signIn, signOut, getBasicUserInfo } = useAuthContext();
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (state.isAuthenticated) {
      getBasicUserInfo()
        .then(setUserInfo)
        .catch(() => {});
    }
  }, [state.isAuthenticated]);

  if (state.isLoading) return <Splash />;

  return (
    <div className="phone-wrap">
      <div className="phone">
        {state.isAuthenticated
          ? <Dashboard userInfo={userInfo} signOut={signOut} activeTab={activeTab} setActiveTab={setActiveTab} />
          : <Landing signIn={signIn} />}
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   LANDING  (pre-login)
════════════════════════════════════ */
function Landing({ signIn }) {
  return (
    <div className="screen landing">
      {/* status bar */}
      <div className="status-bar">
        <ScanFrameIcon />
        <div className="status-right">
          <BellIcon badge />
          <span className="lang">EN</span>
        </div>
      </div>

      {/* hero */}
      <div className="hero-wrap">
        <div className="red-curve" />
        <div className="hero-img-placeholder">
          <div className="hero-building-label">
            <span className="ocbc-circle">⊙</span> OCBC
          </div>
        </div>
        <div className="hero-fade" />
      </div>

      {/* quick actions */}
      <div className="quick-grid">
        {QUICK_ACTIONS.map((a) => (
          <button key={a.id} className="qa-btn" id={a.id}>
            <span className="qa-icon">{a.icon}</span>
            <span className="qa-label">{a.label}</span>
          </button>
        ))}
      </div>

      {/* login button */}
      <div className="login-bar">
        <button
          id="login-btn"
          className="login-btn"
          onClick={() => signIn()}
        >
          Log in to <span className="red-text">OCBC</span> Indonesia
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   DASHBOARD  (post-login)
════════════════════════════════════ */
function Dashboard({ userInfo, signOut, activeTab, setActiveTab }) {
  const name = userInfo?.givenName || userInfo?.displayName || userInfo?.username || "there";

  return (
    <div className="screen dash-screen">
      {/* top bar */}
      <div className="dash-topbar">
        <span className="ocbc-logo-text">OCBC</span>
        <div className="dash-top-right">
          <BellIcon />
          <button id="logout-btn" className="logout-link" onClick={() => signOut()}>Logout</button>
        </div>
      </div>

      <div className="dash-scroll">
        {/* hero banner */}
        <div className="dash-hero">
          <div className="red-curve red-curve--dash" />
          <div className="dash-hero-text">
            <h2 className="hey">Hey {name}!</h2>
            <p className="hey-sub">Welcome to a brand-new<br />experience, designed with you<br />in mind.</p>
          </div>
          <div className="dash-hero-img-placeholder" />
        </div>

        {/* quick action card */}
        <div className="action-card">
          <div className="action-card-inner">
            {DASH_ACTIONS.map((a) => (
              <button key={a.id} className="da-btn" id={a.id}>
                <span className="da-icon">{a.icon}</span>
                <span className="da-label">{a.label}</span>
              </button>
            ))}
            <button className="gear-btn"><GearIcon /></button>
          </div>
        </div>

        {/* filter tabs */}
        <div className="tabs-row">
          {TABS.map((t, i) => (
            <button
              key={t}
              id={`tab-${t.toLowerCase().replace(" ", "-")}`}
              className={`tab-pill ${activeTab === i ? "tab-pill--active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {i === 0 && <EyeIcon />} {t}
            </button>
          ))}
        </div>

        {/* account card */}
        {activeTab === 0 && (
          <div className="acct-card">
            <div className="acct-row">
              <div className="acct-badge">360</div>
              <div className="acct-info">
                <span className="acct-name">360 Account</span>
                <span className="acct-num">123-12345678-123</span>
              </div>
              <ChevronIcon />
            </div>
            <div className="acct-detail-row">
              <span className="acct-detail-label">Available balance</span>
              <span className="acct-detail-val">30,000.00 IDR</span>
            </div>
            <div className="acct-divider" />
            <div className="acct-detail-row">
              <span className="acct-detail-label">Debit card no.</span>
              <span className="acct-detail-val">123-4567-8901-234</span>
            </div>
          </div>
        )}

        {activeTab !== 0 && (
          <div className="empty-tab">
            <span>No {TABS[activeTab]} data to display</span>
          </div>
        )}

        {/* bottom cards */}
        <div className="promo-row">
          <div className="promo-card promo-card--red">
            <p className="promo-tag">MONEY LOCK</p>
            <p className="promo-title">Protect your Savings and Time Deposit accounts from scammers</p>
          </div>
          <div className="promo-card promo-card--light">
            <p className="promo-tag">SAVINGS GOAL</p>
            <p className="promo-title">Stay on track with your reality</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Splash ── */
function Splash() {
  return (
    <div className="phone-wrap">
      <div className="phone splash">
        <span className="ocbc-logo-text splash-logo">OCBC</span>
        <p className="splash-sub">Authenticating…</p>
      </div>
    </div>
  );
}

/* ════════════ SVG Icons ════════════ */
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2" width="10" height="20" rx="2"/>
      <line x1="12" y1="18" x2="12" y2="18.01"/>
    </svg>
  );
}
function ScanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V5a1 1 0 011-1h2M4 17v2a1 1 0 001 1h2M17 4h2a1 1 0 011 1v2M20 17v2a1 1 0 01-1 1h-2M7 12h10"/>
    </svg>
  );
}
function PayNowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  );
}
function BulbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17H8v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z"/>
    </svg>
  );
}
function FxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  );
}
function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"/>
    </svg>
  );
}
function BillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  );
}
function BellIcon({ badge }) {
  return (
    <span className="bell-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
      {badge && <span className="bell-badge" />}
    </span>
  );
}
function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}
function ScanFrameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22">
      <path d="M4 7V5a1 1 0 011-1h2M4 17v2a1 1 0 001 1h2M17 4h2a1 1 0 011 1v2M20 17v2a1 1 0 01-1 1h-2"/>
    </svg>
  );
}
