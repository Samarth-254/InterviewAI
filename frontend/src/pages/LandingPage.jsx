import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lottie } from 'lottie-react';
import aiVoiceAssistantAnimation from '../assets/lottie/aiVoiceAssistant.json';
import { useAuth } from '../context/AuthContext';
import {
  Mic,
  Volume2,
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Users,
  Compass,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Play,
  Clock,
  Zap,
} from 'lucide-react';

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroTab, setHeroTab] = useState('fresher');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleStartCta = () => {
    if (isAuthenticated) {
      navigate('/interview/select');
    } else {
      navigate('/signup');
    }
  };

  const heroScenarios = {
    fresher: {
      tag: 'LEVEL: FRESHER CALIBRATED',
      question: "Since you're practicing SDE fundamentals, which data structure would you choose to look up unique IDs in O(1) time?",
      candidate: "I would use a HashSet for average O(1) lookups and automatic duplicate rejection.",
      evaluation: "✓ Foundational Mastered • Scored 8.8 / 10",
    },
    frontend: {
      tag: 'LEVEL: FRONTEND CALIBRATED',
      question: "In React, when would you pass an empty dependency array [] to useEffect versus omitting it?",
      candidate: "An empty array runs once on mount for data fetching; omitting it runs after every render.",
      evaluation: "✓ Lifecycle Mastered • Scored 9.0 / 10",
    },
    system: {
      tag: 'LEVEL: SYSTEM DESIGN',
      question: "When configuring an in-memory cache under peak traffic, how do you decide between LRU and LFU eviction?",
      candidate: "LRU favors access recency for bursty traffic; LFU suits long-term recurring key patterns.",
      evaluation: "✓ Trade-off Analyzed • Scored 9.2 / 10",
    },
  };

  const activeScenario = heroScenarios[heroTab];

  const tracks = [
    {
      id: 'technical',
      title: 'Technical & Coding',
      icon: Terminal,
      desc: 'Role-calibrated questions on Data Structures, Web Development, APIs, and clean code principles.',
      badge: 'Most Popular',
      topics: ['DSA & Core Logic', 'React & Frontend', 'APIs & Databases', 'Clean Code Principles'],
    },
    {
      id: 'system_design',
      title: 'System Design',
      icon: Cpu,
      desc: 'Architectural trade-offs, scalability, caching strategies, and distributed systems thinking.',
      badge: 'Mid & Senior',
      topics: ['Scalability & Caching', 'Database Sharding', 'Microservices vs Monolith', 'Rate Limiting'],
    },
    {
      id: 'behavioral',
      title: 'Behavioral (STAR Method)',
      icon: Users,
      desc: 'Master the STAR method to articulate leadership, conflict resolution, and handling tough failures.',
      badge: 'All Levels',
      topics: ['STAR Response Framework', 'Conflict Resolution', 'Team Collaboration', 'Handling Pressure'],
    },
    {
      id: 'hr_culture_fit',
      title: 'HR & Culture Fit',
      icon: Compass,
      desc: 'Sharpen your personal elevator pitch, career goals, working style, and culture alignment.',
      badge: 'Essential',
      topics: ['Elevator Pitch', 'Company Culture Fit', 'Growth Mindset', 'Handling Ambiguity'],
    },
  ];

  const levels = [
    {
      level: 'College Freshers & Students',
      yoe: '0 - 1 Years Experience',
      focus: 'Foundational Mastery & Guided Mentorship',
      points: [
        'Accessible, concept-focused questions without intimidating jargon',
        'Supportive hints and pedagogical scaffolding when you are unsure',
        'Strictly avoids senior-level traps like implementing hash maps from scratch',
        'Evaluated against realistic entry-level hiring benchmarks',
      ],
      highlight: true,
    },
    {
      level: 'Mid-Level Engineers',
      yoe: '2 - 4 Years Experience',
      focus: 'Practical Engineering & Production Scenarios',
      points: [
        'Real-world edge cases, component lifecycles, and indexing',
        'API contracts, input validation, and asynchronous flow',
        'Balancing speed vs code maintainability',
        'Deep dives into actual technologies used in your stack',
      ],
      highlight: false,
    },
    {
      level: 'Senior & Staff Leads',
      yoe: '5+ Years Experience',
      focus: 'High-Scale Tradeoffs & Architectural Vision',
      points: [
        'Distributed systems, fault tolerance, and eventual consistency',
        'Trade-offs under 10x traffic spikes and failure recovery',
        'Cross-functional leadership and executive-level communication',
        'Probing edge cases and ambiguous business requirements',
      ],
      highlight: false,
    },
  ];

  const faqs = [
    {
      q: 'How does the voice conversation work?',
      a: 'InterviewAI uses advanced low-latency speech recognition and natural voice synthesis. When you start a round, you speak aloud via your microphone just like a real phone or Google Meet interview with human interviewer Arjun.',
    },
    {
      q: 'Why is it better for college students and freshers?',
      a: 'Most interview prep platforms bombard freshers with senior-level distributed systems or hardcore compiler internals. InterviewAI detects your experience level and caps difficulty at foundational concepts, providing supportive hints when you stumble.',
    },
    {
      q: 'Do I get feedback after the interview?',
      a: 'Yes! Immediately after wrapping up your 10-minute session, you receive an in-depth scorecard evaluating your Communication, Technical Depth, Problem Solving, and Examples Quality, along with actionable strengths, weaknesses, and a downloadable PDF report.',
    },
    {
      q: 'Is InterviewAI completely free to practice?',
      a: 'Yes! You can create an account and practice full 10-minute mock interviews across Technical, System Design, Behavioral, and HR tracks with zero subscription fees.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-base)', minHeight: '100vh', color: 'var(--text-primary)', paddingTop: '70px' }}>
      {/* ── PERMANENTLY FIXED NAVBAR AT TOP (STAYS PINNED WHEN SCROLLING) ── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 9999,
          backgroundColor: 'rgba(10, 10, 10, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-hairline)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          height: '70px',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '1.15rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0A0A0A',
                boxShadow: '0 0 16px rgba(255, 90, 31, 0.5)',
              }}
            >
              <Mic size={17} strokeWidth={2.5} />
            </div>
            <span>INTERVIEW<span style={{ color: 'var(--accent)' }}>AI</span></span>
          </Link>

          {/* Desktop Navigation Links — with generous spacing */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
            className="landing-nav-links"
          >
            <a href="#tracks" style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 500, padding: '4px 0' }}>Tracks</a>
            <a href="#levels" style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 500, padding: '4px 0' }}>Freshers Calibration</a>
            <a href="#how-it-works" style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 500, padding: '4px 0' }}>How It Works</a>
            <a href="#faq" style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 500, padding: '4px 0' }}>FAQ</a>
          </nav>

          {/* Desktop Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }} className="landing-nav-links">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '9px 20px', fontSize: '0.82rem' }}>
                Dashboard <ArrowRight size={15} />
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary" style={{ padding: '9px 20px', fontSize: '0.82rem' }}>
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '8px',
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-hairline)',
              padding: '16px 20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <a
              href="#tracks"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}
            >
              • Interview Tracks
            </a>
            <a
              href="#levels"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}
            >
              • Freshers Calibration
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}
            >
              • How It Works
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}
            >
              • FAQ
            </a>
            <div style={{ height: '1px', backgroundColor: 'var(--border-hairline)', margin: '4px 0' }} />
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Go to Dashboard <ArrowRight size={16} />
              </Link>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Start Practicing Free
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* ── SHORT STRICT TWO-COLUMN HERO SECTION (FITS FULLY ON SCREEN) ── */}
      <section
        style={{
          minHeight: 'calc(100vh - 70px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft Ambient Top Glow (Subtle & Refined Opacity) */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(980px, 95vw)',
            height: '380px',
            background: 'radial-gradient(ellipse 65% 50% at 50% 15%, rgba(255, 110, 40, 0.16) 0%, rgba(255, 90, 31, 0.05) 45%, transparent 75%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        {/* Expansive Ambient Aurora (Toned-down soft glow) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'radial-gradient(ellipse 85% 60% at 50% 0%, rgba(255, 100, 35, 0.12) 0%, rgba(255, 90, 31, 0.03) 50%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />

        {/* Subtle Tech Dot Grid with Vignette Mask */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 25%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 25%, transparent 80%)',
            pointerEvents: 'none',
            opacity: 0.45,
          }}
        />

        {/* Soft Blurred Backlight Behind Console Card */}
        <div
          style={{
            position: 'absolute',
            right: '-6%',
            top: '8%',
            width: '520px',
            height: '520px',
            background: 'radial-gradient(circle, rgba(255, 100, 35, 0.11) 0%, transparent 70%)',
            filter: 'blur(100px)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        {/* Subtle Supporting Glow on Left Side */}
        <div
          style={{
            position: 'absolute',
            left: '-10%',
            bottom: '-5%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(255, 95, 30, 0.07) 0%, transparent 70%)',
            filter: 'blur(110px)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(20px, 4vw, 40px)',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* ── LEFT COLUMN: Text & CTAs ── */}
            <div style={{ textAlign: 'left' }}>
              {/* Pill Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 90, 31, 0.08)',
                  border: '1px solid rgba(255, 90, 31, 0.25)',
                  marginBottom: '16px',
                }}
              >
                <span className="anim-live-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--status-success)', display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Real-Time Voice AI Interviewer
                </span>
              </div>

              {/* Headline */}
              <h1
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  marginBottom: '14px',
                }}
              >
                Ace Tech Interviews <br />
                <span style={{ color: 'var(--accent)' }}>With Spoken AI Practice.</span>
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.55,
                  marginBottom: '24px',
                  maxWidth: '520px',
                }}
              >
                Conduct 10-minute spoken mock interviews with <strong>Arjun</strong> — our conversational voice AI calibrated specifically for <strong>college freshers</strong> to seniors. No sudden difficulty spikes.
              </p>

              {/* Action Buttons */}
              <div
                className="hero-cta-group"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  flexWrap: 'wrap',
                  marginBottom: '24px',
                }}
              >
                <button
                  onClick={handleStartCta}
                  className="btn btn-primary"
                  style={{
                    padding: '12px 26px',
                    fontSize: '0.9rem',
                    boxShadow: '0 6px 20px rgba(255, 90, 31, 0.3)',
                  }}
                >
                  Start Practicing Free <ArrowRight size={16} />
                </button>
                <a
                  href="#tracks"
                  className="btn btn-secondary"
                  style={{ padding: '12px 20px', fontSize: '0.9rem' }}
                >
                  Explore Tracks
                </a>
              </div>

              {/* Quick Trust Checklist */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: 'var(--text-dim)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--status-success)' }} /> 10-min spoken rounds
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--status-success)' }} /> Freshers friendly
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--status-success)' }} /> Instant scorecard
                </span>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Compact Animated Live Voice Console with Lottie ── */}
            <div>
              <div
                style={{
                  background: 'linear-gradient(180deg, var(--bg-surface) 0%, rgba(18, 18, 18, 0.98) 100%)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.65)',
                  position: 'relative',
                }}
              >
                {/* Console Top Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--border-hairline)',
                    paddingBottom: '12px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="anim-live-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-success)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700 }}>
                      ARJUN • AI INTERVIEWER
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 600 }}>
                    {activeScenario.tag}
                  </div>
                </div>

                {/* Animated Lottie Voice Sphere + Equalizer Bars */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    margin: '6px 0 16px',
                  }}
                >
                  {/* Lottie Animation Orb */}
                  <div style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                    <Lottie animationData={aiVoiceAssistantAnimation} loop={true} />
                  </div>

                  {/* Equalizer Frequency Bars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '36px' }}>
                    <div className="anim-soundwave-bar" style={{ animationDelay: '0.0s' }} />
                    <div className="anim-soundwave-bar" style={{ animationDelay: '0.2s' }} />
                    <div className="anim-soundwave-bar" style={{ animationDelay: '0.4s' }} />
                    <div className="anim-soundwave-bar" style={{ animationDelay: '0.1s' }} />
                    <div className="anim-soundwave-bar" style={{ animationDelay: '0.3s' }} />
                    <div className="anim-soundwave-bar" style={{ animationDelay: '0.5s' }} />
                    <div className="anim-soundwave-bar" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>

                {/* Dialogue Turn: AI Question */}
                <div
                  style={{
                    background: 'var(--bg-base)',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', color: 'var(--accent)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
                    <Volume2 size={13} />
                    <span>AUDIO STREAM ACTIVE • LATENCY 0.3s</span>
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                    &ldquo;{activeScenario.question}&rdquo;
                  </p>
                </div>

                {/* Dialogue Turn: Candidate Answer */}
                <div
                  style={{
                    background: 'rgba(255, 90, 31, 0.08)',
                    border: '1px solid rgba(255, 90, 31, 0.25)',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    marginBottom: '14px',
                  }}
                >
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                    &ldquo;{activeScenario.candidate}&rdquo;
                  </p>
                  <div style={{ marginTop: '6px', color: 'var(--status-success)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                    {activeScenario.evaluation}
                  </div>
                </div>

                {/* Quick Interactive Scenario Switcher Chips */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-hairline)',
                    paddingTop: '12px',
                    gap: '6px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[
                      { id: 'fresher', label: 'Fresher DSA' },
                      { id: 'frontend', label: 'React / UI' },
                      { id: 'system', label: 'System Design' },
                    ].map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => setHeroTab(chip.id)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer',
                          border: heroTab === chip.id ? '1px solid var(--accent)' : '1px solid var(--border-hairline)',
                          backgroundColor: heroTab === chip.id ? 'rgba(255, 90, 31, 0.2)' : 'var(--bg-base)',
                          color: heroTab === chip.id ? 'var(--accent)' : 'var(--text-dim)',
                        }}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleStartCta}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Try Live <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 SPECIALIZED TRACKS ── */}
      <section id="tracks" style={{ padding: '70px 0', borderTop: '1px solid var(--border-hairline)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Interview Tracks
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', marginTop: '8px', marginBottom: '10px' }}>
              Cover Every Step of The Hiring Loop
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              From initial technical screenings to deep-dive architecture rounds and behavioral panels.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.id}
                  className="card card-interactive"
                  onClick={handleStartCta}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '6px',
                          backgroundColor: 'var(--bg-base)',
                          border: '1px solid var(--border-hairline)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent)',
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <span className="badge badge-active">{track.badge}</span>
                    </div>

                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{track.title}</h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
                      {track.desc}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {track.topics.map((t, i) => (
                        <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: 'var(--accent)' }}>•</span> {t}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                    Start Track <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CALIBRATION FOR EVERY LEVEL ── */}
      <section id="levels" style={{ padding: '70px 0', borderTop: '1px solid var(--border-hairline)', backgroundColor: '#0D0D0D' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Adaptive Difficulty Engine
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', marginTop: '8px', marginBottom: '10px' }}>
              Calibrated For Where You Are
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              Our dynamic engine adapts questions and feedback directly to your experience bracket.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {levels.map((item, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderLeftColor: item.highlight ? 'var(--accent)' : 'var(--border-hairline)',
                  backgroundColor: item.highlight ? 'rgba(255, 90, 31, 0.03)' : 'var(--bg-surface)',
                  position: 'relative',
                }}
              >
                {item.highlight && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '20px',
                      backgroundColor: 'var(--accent)',
                      color: '#0A0A0A',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Freshers Focus
                  </div>
                )}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
                    {item.yoe}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>{item.level}</h3>
                  <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '16px' }}>
                    {item.focus}
                  </p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                        <CheckCircle2 size={15} style={{ color: item.highlight ? 'var(--accent)' : 'var(--text-dim)', flexShrink: 0, marginTop: '2px' }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-hairline)' }}>
                  <button
                    onClick={handleStartCta}
                    className="btn btn-secondary"
                    style={{ width: '100%', fontSize: '0.8rem' }}
                  >
                    Practice at this Level
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '70px 0', borderTop: '1px solid var(--border-hairline)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Simple 3-Step Process
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', marginTop: '8px', marginBottom: '10px' }}>
              How InterviewAI Works
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              No awkward typed chatbot scripts. Just real, spoken voice practice in three easy steps.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            <div className="card card-neutral">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1, marginBottom: '10px' }}>
                01
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Select Role & Track</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Set your target role (Frontend, SDE, Fullstack, Data, Marketing) and experience level. The conversation engine automatically generates matching topic banks.
              </p>
            </div>

            <div className="card card-neutral">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1, marginBottom: '10px' }}>
                02
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Speak in Live Audio</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Click start to begin a 10-minute real-time voice call. Arjun greets you, listens to your answers, asks calibrated follow-ups, and gives gentle hints when needed.
              </p>
            </div>

            <div className="card card-neutral">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1, marginBottom: '10px' }}>
                03
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Instant Report & Scoring</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Receive a detailed report with overall score, communication breakdown, technical depth analysis, actionable strengths, and a downloadable PDF report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section id="faq" style={{ padding: '70px 0', borderTop: '1px solid var(--border-hairline)', backgroundColor: '#0D0D0D' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Common Questions
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', marginTop: '8px' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={17} style={{ color: 'var(--accent)' }} /> : <ChevronDown size={17} style={{ color: 'var(--text-dim)' }} />}
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 20px 18px',
                        color: 'var(--text-muted)',
                        fontSize: '0.88rem',
                        lineHeight: 1.55,
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        marginTop: '4px',
                        paddingTop: '10px',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ── */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-hairline)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', marginBottom: '14px' }}>
            Ready to Ace Your Next Round?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.55, marginBottom: '28px' }}>
            Join candidates practicing with real-time voice AI. Get confident, articulate your thoughts clearly, and track your progress over time.
          </p>
          <button
            onClick={handleStartCta}
            className="btn btn-primary"
            style={{
              padding: '13px 30px',
              fontSize: '0.92rem',
              boxShadow: '0 6px 22px rgba(255, 90, 31, 0.25)',
            }}
          >
            Start Free Practice Now <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: '1px solid var(--border-hairline)',
          padding: '30px 0 24px',
          backgroundColor: 'var(--bg-base)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 600 }}>
            <span>INTERVIEW<span style={{ color: 'var(--accent)' }}>AI</span></span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
            <Link to="/login" style={{ color: 'var(--text-dim)' }}>Sign In</Link>
            <Link to="/signup" style={{ color: 'var(--text-dim)' }}>Sign Up</Link>
            <Link to="/dashboard" style={{ color: 'var(--text-dim)' }}>Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
