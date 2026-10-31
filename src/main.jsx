import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Building2, CheckCircle2, ChevronDown, Compass, Home, MapPin, 
  Menu, MessageCircle, Phone, Search, ShieldCheck, Sparkles, X, CalendarDays, 
  Mail, Instagram, Facebook, Plus, LogOut, LayoutDashboard, BriefcaseBusiness, 
  Inbox, Trash2, Pencil, LoaderCircle, Upload, Award, Star, UserCheck,
  Stamp, FileCheck
} from 'lucide-react';
import { supabase, supabaseReady } from './supabase';
import './styles.css';

const company = 'MK PROMOTERS AND DEVELOPERS';
const waNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '919848322201').replace(/\D/g, '');
const phone = import.meta.env.VITE_COMPANY_PHONE || '';
const email = import.meta.env.VITE_COMPANY_EMAIL || '';
const office = import.meta.env.VITE_OFFICE_ADDRESS || 'Visakhapatnam, Andhra Pradesh';
const waLink = (message = 'Hello, I would like to know more about your properties.') => waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`;

const founderWaUrl = 'https://wa.me/919848322201?text=Hello%20B.%20Madhav%20Kumar%20garu%2C%20I%20would%20like%20to%20discuss%20a%20property%20investment%20in%20Visakhapatnam.';

function RoadIcon({ size = 26, ...props }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M4 19L8 5" />
      <path d="M20 19L16 5" />
      <path d="M12 5V8" />
      <path d="M12 11V14" />
      <path d="M12 17V20" />
    </svg>
  );
}

function Logo({ light = false }) {
  return (
    <Link to="/" className={`brand ${light ? 'brand-light' : ''}`} aria-label={`${company} home`}>
      <img className="brand-logo" src="/mk-promoters-logo.jpeg" alt="MK Promoters and Developers logo" />
      <span className="brand-copy">
        <strong>MK PROMOTERS</strong>
        <small>AND DEVELOPERS</small>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />
        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className={open ? 'nav-links nav-open' : 'nav-links'}>
          <NavLink onClick={close} to="/" end>Home</NavLink>
          <a onClick={close} href="/#about">About &amp; Founder</a>
          <a onClick={close} href="/#projects">Projects</a>
          <a onClick={close} href="/#process">Why Us</a>
          <a onClick={close} href="/#testimonials">Testimonials</a>
          <a onClick={close} href="/#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo light />
          <p className="footer-desc">
            Led by Founder B. Madhav Kumar with 30+ years of real estate leadership. Delivering certified VMRDA-approved open plots and prime residential ventures across Visakhapatnam.
          </p>
          <span className="footer-note">30+ YEARS OF TRUST · 100% CLEAR TITLES</span>
        </div>
        <div>
          <h4>Quick Navigation</h4>
          <a href="/#about">Founder &amp; About Us</a>
          <a href="/#projects">Our Ventures</a>
          <a href="/#process">Why Choose MK</a>
          <a href="/#testimonials">Client Reviews</a>
        </div>
        <div>
          <h4>Get in Touch</h4>
          <p><MapPin size={16} /> {office}</p>
          {phone && <a href={`tel:${phone}`}><Phone size={16} /> {phone}</a>}
          {email && <a href={`mailto:${email}`}><Mail size={16} /> {email}</a>}
          <a href="https://www.google.com/maps/search/?api=1&query=MK+Promoters+and+Developers+Visakhapatnam" target="_blank" rel="noreferrer">
            <Compass size={16} /> Open in Google Maps
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} MK Promoters and Developers. Founded by B. Madhav Kumar. All rights reserved.</span>
        <Link to="/admin">Admin Login</Link>
      </div>
    </footer>
  );
}

const defaultProjects = [
  {
    id: 'sample-plot-1',
    title: 'Green Valley Luxury Open Plots',
    type: 'Open Plots',
    status: 'Ongoing',
    location: 'Bhogapuram, Visakhapatnam',
    description: 'VMRDA-approved gated community residential plots with 40ft blacktop roads, underground drainage, avenue plantations, and 24/7 security.',
    image_url: '/plot-photo.jpg',
    published: true
  }
];

function WhatsAppFloat() { 
  return (
    <a className="whatsapp-float" href={founderWaUrl} target="_blank" rel="noreferrer" aria-label="Chat with Founder on WhatsApp">
      <MessageCircle size={25} />
    </a>
  ); 
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-image">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="project-img" />
        ) : (
          <div className="project-placeholder">
            <Building2 size={38} />
            <span>Project photo available soon</span>
          </div>
        )}
        <span className={`status-pill ${project.status === 'Completed' ? 'status-completed' : ''}`}>
          {project.status}
        </span>
      </div>
      <div className="project-content">
        <div className="project-meta">
          <span>{project.type || 'Open Plots'}</span>
          {project.location && <span><MapPin size={13} /> {project.location}</span>}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description || 'Contact our team to review layout blueprints and schedule a site inspection.'}</p>
        <a className="text-link" href={waLink(`Hello, I would like complete details about ${project.title}.`)} target="_blank" rel="noreferrer">
          Request Details <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}

const getStoredProjects = () => {
  try {
    const saved = localStorage.getItem('mk_projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  } catch {
    return defaultProjects;
  }
};
const setStoredProjects = (data) => {
  try {
    localStorage.setItem('mk_projects', JSON.stringify(data));
  } catch {}
};

function HomePage() {
  const [projects, setProjects] = useState(getStoredProjects()); 
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({type: 'All types', status: 'All statuses', location: ''});
  const [form, setForm] = useState({name: '', phone: '', email: '', interest: 'Open Plots', message: ''});
  const [formState, setFormState] = useState({busy: false, message: '', waUrl: ''});

  useEffect(() => { 
    let active = true; 
    async function load(){ 
      if (!supabaseReady) { 
        if(active) { setProjects(getStoredProjects()); setLoading(false); } 
        return; 
      } 
      const {data, error} = await supabase.from('projects').select('*').eq('published', true).order('created_at', {ascending: false}); 
      if(active){ 
        setProjects(error || !data || data.length === 0 ? getStoredProjects() : data); 
        setLoading(false); 
      } 
    } 
    load(); 
    return () => { active = false; }; 
  }, []);

  const filtered = useMemo(() => projects.filter(p => 
    (filters.type === 'All types' || p.type === filters.type) &&
    (filters.status === 'All statuses' || p.status === filters.status) &&
    (!filters.location || `${p.location || ''} ${p.title || ''}`.toLowerCase().includes(filters.location.toLowerCase()))
  ), [projects, filters]);

  async function submit(e){
    e.preventDefault();
    setFormState({busy: true, message: '', waUrl: ''});
    const payload = {...form, id: 'enq-' + Date.now(), created_at: new Date().toISOString()};

    const waText = 
      `*New Property Enquiry*\n` +
      `--------------------------\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      (form.email ? `*Email:* ${form.email}\n` : '') +
      `*Interested in:* ${form.interest}\n` +
      (form.message ? `*Message:* ${form.message}\n` : '') +
      `--------------------------\n` +
      `_Sent via MK Promoters Website_`;
    const targetWaUrl = waLink(waText);

    if (supabaseReady) {
      const {error} = await supabase.from('enquiries').insert([payload]);
      if (error) {
        setFormState({busy: false, message: 'Could not connect to online database, forwarding to WhatsApp now…', waUrl: targetWaUrl});
        window.open(targetWaUrl, '_blank', 'noopener,noreferrer');
        return;
      }
    } else {
      try {
        const cur = JSON.parse(localStorage.getItem('mk_enquiries') || '[]');
        localStorage.setItem('mk_enquiries', JSON.stringify([payload, ...cur]));
      } catch {}
    }

    try {
      window.open(targetWaUrl, '_blank', 'noopener,noreferrer');
    } catch {}

    setFormState({
      busy: false,
      message: 'Thank you! Your enquiry has been received and forwarded to our founder’s desk.',
      waUrl: targetWaUrl
    });
    setForm({name: '', phone: '', email: '', interest: 'Open Plots', message: ''});
  }

  return (
    <>
      <Header />
      <main>
        {/* HERO SECTION — Our Experience */}
        <section className="hero-section" id="experience">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-pill-badge">
                <span className="eyebrow-dot" />
                <span>OUR EXPERIENCE</span>
              </div>
              <h1 className="hero-heading">
                Building Trust in Real Estate for <span className="gold-highlight">30+ Years.</span>
              </h1>
              <p className="hero-desc">
                We help people explore property opportunities across Visakhapatnam with a focus on careful documentation, thoughtful planning, and transparent customer service.
              </p>
              <div className="hero-actions">
                <a className="button button-navy" href="#projects">
                  Explore Our Projects <ArrowRight size={16} />
                </a>
              </div>
              <div className="hero-trust-bar">
                <span><ShieldCheck size={16} /> 30+ Years of Experience</span>
                <span><CheckCircle2 size={16} /> 100% Clear Titles &amp; VMRDA Sanctioned</span>
                <span><MapPin size={16} /> Visakhapatnam, AP</span>
              </div>
            </div>

            <div className="hero-visual-card">
              <div className="hero-photo-wrap">
                <img src="/plot-photo.jpg" alt="MK Promoters Prime Open Plot Venture" className="hero-plot-image" />
                <div className="hero-plot-badge">
                  <CheckCircle2 size={15} /> Verified VMRDA Layout
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VISION & LEGACY AND FOUNDER PROFILE SECTION */}
        <section className="about-section section-pad" id="about">
          <div className="container">
            {/* Vision & Legacy Header Block */}
            <div className="vision-legacy-block">
              <span className="eyebrow">
                <span className="eyebrow-dot" /> OUR VISION &amp; LEGACY
              </span>
              <h2>
                Property Decisions Built on <span className="gold-highlight" style={{ display: 'inline-block' }}>Trust and Transparency.</span>
              </h2>
              <p>
                Founded by B. Madhav Kumar, MK Promoters delivers clear-titled, VMRDA-compliant plots across Visakhapatnam and Andhra Pradesh, with complete transparency.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="vision-pillars-grid">
              <div className="vision-pillar-card">
                <div className="pillar-icon-box">
                  <FileCheck size={26} strokeWidth={2.2} />
                </div>
                <h4>100% Clear Title Deeds</h4>
                <p>Meticulously vetted documentation, certified link deeds, and guaranteed spot registration.</p>
              </div>
              <div className="vision-pillar-card">
                <div className="pillar-icon-box">
                  <Stamp size={26} strokeWidth={2.2} />
                </div>
                <h4>VMRDA Approved Layouts</h4>
                <p>Fully compliant with municipal and urban development authorities, meeting all legal standards.</p>
              </div>
              <div className="vision-pillar-card">
                <div className="pillar-icon-box">
                  <MapPin size={26} strokeWidth={2.2} />
                </div>
                <h4>Prime Growth Locations</h4>
                <p>Curated ventures located near Bhogapuram International Airport, national highways, and IT corridors.</p>
              </div>
              <div className="vision-pillar-card">
                <div className="pillar-icon-box">
                  <RoadIcon size={26} />
                </div>
                <h4>Thoughtful Infrastructure</h4>
                <p>40ft internal blacktop roads, underground drainage, avenue plantations, and demarcated boundaries.</p>
              </div>
            </div>

            {/* Proof Numbers Row */}
            <div className="vision-stats-row">
              <div className="vision-stat-item">
                <strong className="vision-stat-number">30+</strong>
                <span className="vision-stat-label">Years of Experience</span>
              </div>
              <div className="vision-stat-item">
                <strong className="vision-stat-number">500+</strong>
                <span className="vision-stat-label">Happy Plot Buyers</span>
              </div>
              <div className="vision-stat-item">
                <strong className="vision-stat-number">100+</strong>
                <span className="vision-stat-label">Acres Developed</span>
              </div>
              <div className="vision-stat-item">
                <strong className="vision-stat-number">100%</strong>
                <span className="vision-stat-label">Clear VMRDA Titles</span>
              </div>
            </div>

            {/* Founder Profile Section */}
            <div className="founder-profile-wrap">
              <div className="founder-profile-card">
                <div className="founder-left-col">
                  <div className="founder-photo-frame">
                    <img 
                      src="/founder-photo.png" 
                      alt="B. Madhav Kumar, Founder & Managing Director" 
                      className="founder-photo" 
                    />
                    <div className="founder-seal-mini" title="Founder Certified">
                      <Award size={18} />
                    </div>
                  </div>
                  <div className="founder-exp-pill">
                    <Sparkles size={14} /> 30+ Years of Experience
                  </div>
                </div>

                <div className="founder-right-col">
                  <span className="founder-tag-label">FOUNDER &amp; MANAGING DIRECTOR</span>
                  <h3 className="founder-name-heading">B. Madhav Kumar</h3>
                  <span className="founder-designation-sub">MK Promoters and Developers</span>
                  <p className="founder-bio-text">
                    With over 30 years of experience in real estate, land acquisition, and layout planning, B. Madhav Kumar leads MK Promoters and Developers with a commitment to responsible development and long-term customer relationships.
                  </p>
                  <div className="founder-action-row">
                    <a className="button button-founder-wa" href={founderWaUrl} target="_blank" rel="noreferrer">
                      <MessageCircle size={17} /> Speak with Our Founder
                    </a>
                    <span className="founder-note-badge">
                      <CheckCircle2 size={15} /> Direct WhatsApp Conversation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="projects-section section-pad" id="projects">
          <div className="container">
            <div className="section-heading-center">
              <span className="eyebrow">
                <span className="eyebrow-dot" /> FEATURED VENTURES
              </span>
              <h2>Curated Properties with <em>High Appreciation Potential.</em></h2>
              <p>Explore our premium open plots and gated residential communities in prime growth corridors.</p>
            </div>

            <div className="filter-bar">
              <label className="filter-search">
                <Search size={18} />
                <input 
                  value={filters.location} 
                  onChange={e => setFilters({...filters, location: e.target.value})} 
                  placeholder="Search by venture name or location (e.g. Bhogapuram, Madhurawada)..." 
                />
              </label>
              <label className="filter-select">
                <span>Property type</span>
                <select value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})}>
                  <option>All types</option>
                  <option>Open Plots</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Land</option>
                </select>
                <ChevronDown size={15} />
              </label>
              <label className="filter-select">
                <span>Status</span>
                <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
                  <option>All statuses</option>
                  <option>Ongoing</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                </select>
                <ChevronDown size={15} />
              </label>
            </div>

            {loading ? (
              <div className="empty-state"><LoaderCircle className="spin" /><p>Loading ventures…</p></div>
            ) : filtered.length ? (
              <div className="project-grid">
                {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon"><Building2 size={28} /></span>
                <h3>Our project showcase is being updated.</h3>
                <p>Project listings will appear here as they are added. In the meantime, contact Founder B. Madhav Kumar’s team to discuss available plots.</p>
                <a className="button button-navy" href={founderWaUrl} target="_blank" rel="noreferrer">
                  Ask About Available Plots <ArrowRight size={16} />
                </a>
              </div>
            )}

            <div className="projects-bottom">
              <span>Looking for custom acreage or specific layout dimensions?</span>
              <a className="text-link" href="#contact">Speak with our investment team <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="process-section section-pad" id="process">
          <div className="container">
            <div className="section-heading-center">
              <span className="eyebrow">
                <span className="eyebrow-dot" /> STREAMLINED PROCESS
              </span>
              <h2>From First Enquiry to <em>Spot Registration.</em></h2>
              <p>We ensure a smooth, transparent, and completely secure property acquisition journey.</p>
            </div>
            <div className="process-grid">
              <div className="process-card">
                <span className="step-no">01</span>
                <div className="process-icon"><Search size={22} /></div>
                <h3>Explore &amp; Shortlist</h3>
                <p>Browse our curated VMRDA-approved ventures and shortlist plots that align with your family or investment goals.</p>
              </div>
              <div className="process-card">
                <span className="step-no">02</span>
                <div className="process-icon"><CalendarDays size={22} /></div>
                <h3>Guided Site Inspection</h3>
                <p>Experience an on-site tour with our layout specialists to inspect boundaries, 40ft internal roads, and regional connectivity.</p>
              </div>
              <div className="process-card">
                <span className="step-no">03</span>
                <div className="process-icon"><ShieldCheck size={22} /></div>
                <h3>Spot Demarcation &amp; Deeds</h3>
                <p>Complete transparent documentation, review certified link deeds, and proceed to swift spot registration.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="testimonials-section section-pad" id="testimonials">
          <div className="container">
            <div className="section-heading-center">
              <span className="eyebrow">
                <span className="eyebrow-dot" /> CLIENT EXPERIENCES
              </span>
              <h2>Trusted by Families &amp; <em>Property Investors.</em></h2>
              <p>Read authentic feedback from buyers who chose MK Promoters &amp; Developers for their residential plots and commercial property investments.</p>
            </div>
            <div className="testimonials-grid">
              <div className="testimonial-card-pro">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">
                  "Investing in MK Promoters' Bhogapuram venture was one of the smoothest property decisions I've made. 100% clear VMRDA title approvals, transparent documentation, and immediate plot demarcation. Founder B. Madhav Kumar’s 30+ years of experience clearly shows."
                </p>
                <div className="testimonial-author-wrap">
                  <div className="testimonial-avatar">SK</div>
                  <div className="testimonial-author-info">
                    <strong>Srinivasa Rao K.</strong>
                    <small>✓ Verified Plot Owner</small>
                    <span>Bhogapuram Gated Venture, Vizag</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card-pro">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">
                  "What impressed us most about MK Promoters was their commitment to quality execution. The 40ft blacktop internal roads, underground drainage, and avenue plantations were delivered exactly as promised. Exceptional professionalism and integrity."
                </p>
                <div className="testimonial-author-wrap">
                  <div className="testimonial-avatar">LP</div>
                  <div className="testimonial-author-info">
                    <strong>Dr. Lakshmi Prasanna</strong>
                    <small>✓ Verified Homebuyer</small>
                    <span>Residential Layout, Madhurawada</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card-pro">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">
                  "Living abroad as an NRI, legal clarity and trustworthy communication were my top priorities. B. Madhav Kumar and his team provided regular site photo updates and guided us through registration with zero hassle. Highly recommended!"
                </p>
                <div className="testimonial-author-wrap">
                  <div className="testimonial-avatar">VR</div>
                  <div className="testimonial-author-info">
                    <strong>Venkateswara Reddy</strong>
                    <small>✓ Verified NRI Investor</small>
                    <span>Commercial &amp; Open Plots</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonials-trust-bar">
              <div className="testimonials-trust-item"><ShieldCheck size={18} /> 100% Clear Title Deeds &amp; VMRDA Approval</div>
              <div className="testimonials-trust-item"><CheckCircle2 size={18} /> Spot Registration</div>
              <div className="testimonials-trust-item"><Building2 size={18} /> Premium Infrastructure &amp; Avenue Plantations</div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section section-pad" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <span className="eyebrow eyebrow-light">
                <span className="eyebrow-dot" /> DIRECT CONSULTATION
              </span>
              <h2>Have a property in mind? <em>Let’s talk.</em></h2>
              <p>Connect directly with our advisory desk or schedule a personalized site tour with Founder B. Madhav Kumar’s team.</p>
              <div className="contact-details">
                <div>
                  <span className="contact-icon"><MapPin size={18} /></span>
                  <span>
                    <small>VISIT OUR OFFICE</small>
                    <strong>{office}</strong>
                    <a href="https://www.google.com/maps/search/?api=1&query=MK+Promoters+and+Developers+Visakhapatnam" target="_blank" rel="noreferrer">
                      Open Google Maps <ArrowRight size={14} />
                    </a>
                  </span>
                </div>
                {phone && (
                  <div>
                    <span className="contact-icon"><Phone size={18} /></span>
                    <span>
                      <small>DIRECT CALL</small>
                      <strong>{phone}</strong>
                      <a href={`tel:${phone}`}>Call our desk <ArrowRight size={14} /></a>
                    </span>
                  </div>
                )}
                {email && (
                  <div>
                    <span className="contact-icon"><Mail size={18} /></span>
                    <span>
                      <small>OFFICIAL EMAIL</small>
                      <strong>{email}</strong>
                      <a href={`mailto:${email}`}>Send an email <ArrowRight size={14} /></a>
                    </span>
                  </div>
                )}
              </div>
              <a className="button button-whatsapp" href={founderWaUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={18} /> Chat Directly on WhatsApp
              </a>
            </div>

            <form className="contact-form" onSubmit={submit}>
              <div className="form-head">
                <span>PRIORITY ENQUIRY</span>
                <h3>Schedule a Site Visit</h3>
                <p>Share your requirements and our team will get in touch promptly.</p>
              </div>
              <div className="form-row">
                <label>
                  Your full name
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Rajesh Sharma" />
                </label>
                <label>
                  Phone number
                  <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="e.g. 9848012345" />
                </label>
              </div>
              <label>
                Email address <span className="optional">(optional)</span>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" />
              </label>
              <label>
                What are you interested in?
                <select value={form.interest} onChange={e => setForm({...form, interest: e.target.value})}>
                  <option>Open Plots (Bhogapuram / Vizag)</option>
                  <option>Residential Gated Layouts</option>
                  <option>Commercial Property</option>
                  <option>Book a Free Site Visit</option>
                  <option>Consult with Founder B. Madhav Kumar</option>
                  <option>General Enquiry</option>
                </select>
              </label>
              <label>
                Message or Specific Questions
                <textarea rows="3" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us about your budget, preferred plot dimensions, or preferred location…" />
              </label>
              <button className="button button-navy form-submit" type="submit" disabled={formState.busy}>
                {formState.busy ? 'Sending…' : 'Submit Enquiry'} <ArrowRight size={17} />
              </button>
              {formState.message && (
                <div className="form-feedback" role="status" style={{marginTop:'15px',padding:'14px',background:'#ecfdf5',border:'1px solid #a7f3d0',borderRadius:'6px'}}>
                  <p style={{margin:0,fontWeight:600,color:'#065f46'}}>{formState.message}</p>
                  {formState.waUrl && (
                    <a href={formState.waUrl} target="_blank" rel="noreferrer" className="button button-whatsapp" style={{marginTop:'10px',display:'inline-flex',alignItems:'center',gap:'8px',padding:'8px 14px',fontSize:'12px',textDecoration:'none'}}>
                      <MessageCircle size={15} /> Open in WhatsApp
                    </a>
                  )}
                </div>
              )}
              <p className="privacy-note">Your contact details are strictly confidential and will never be shared.</p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function processImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 900;
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function AdminPage() {
  const navigate = useNavigate(); 
  const [session, setSession] = useState(null); 
  const [checking, setChecking] = useState(true); 
  const [login, setLogin] = useState({email: '', password: ''}); 
  const [error, setError] = useState(''); 
  const [tab, setTab] = useState('projects'); 
  const [projects, setProjects] = useState(getStoredProjects()); 
  const [enquiries, setEnquiries] = useState(() => { 
    try { return JSON.parse(localStorage.getItem('mk_enquiries') || '[]'); } 
    catch { return []; } 
  }); 
  const [saving, setSaving] = useState(false); 
  const [editing, setEditing] = useState(null); 
  const [projectForm, setProjectForm] = useState({
    title: '', type: 'Open Plots', status: 'Ongoing', location: '', description: '', image_url: '/plot-photo.jpg', published: true
  }); 
  const [uploadingImage, setUploadingImage] = useState(false);

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const dataUrl = await processImageFile(file);
      setProjectForm(prev => ({...prev, image_url: dataUrl}));
    } catch (err) {
      console.error(err);
      alert('Could not process image file. Please try another image.');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  }

  useEffect(() => {
    if (!supabaseReady) { setChecking(false); return; }
    supabase.auth.getSession().then(({data}) => { setSession(data.session); setChecking(false); });
    const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  async function refresh() {
    if (!session) return;
    if (!supabaseReady) {
      setProjects(getStoredProjects());
      try { setEnquiries(JSON.parse(localStorage.getItem('mk_enquiries') || '[]')); } catch {}
      return;
    }
    const [p, e] = await Promise.all([
      supabase.from('projects').select('*').order('created_at', {ascending: false}),
      supabase.from('enquiries').select('*').order('created_at', {ascending: false})
    ]);
    setProjects(p.data || []);
    setEnquiries(e.data || []);
  }

  useEffect(() => { refresh(); }, [session]);

  async function signIn(e) {
    e.preventDefault();
    setError('');
    const inputEmail = (login.email || '').trim().toLowerCase();
    const inputPass = (login.password || '').trim();
    if (inputEmail === 'madhavkumar22201@gmail.com' && inputPass === 'Madhav@1536') {
      setSession({user: {email: 'madhavkumar22201@gmail.com'}});
      return;
    }
    setError('Access denied: Invalid email or password.');
  }

  async function saveProject(e) {
    e.preventDefault();
    setSaving(true);
    const payload = {...projectForm};
    if (!supabaseReady) {
      let updated;
      if (editing) {
        updated = projects.map(p => p.id === editing ? {...p, ...payload} : p);
      } else {
        updated = [{...payload, id: 'proj-' + Date.now(), created_at: new Date().toISOString()}, ...projects];
      }
      setProjects(updated);
      setStoredProjects(updated);
      setSaving(false);
      setEditing(null);
      setProjectForm({title: '', type: 'Open Plots', status: 'Ongoing', location: '', description: '', image_url: '/plot-photo.jpg', published: true});
      setError('');
      return;
    }
    const result = editing ? await supabase.from('projects').update(payload).eq('id', editing) : await supabase.from('projects').insert([payload]);
    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setEditing(null);
    setProjectForm({title: '', type: 'Open Plots', status: 'Ongoing', location: '', description: '', image_url: '/plot-photo.jpg', published: false});
    setError('');
    refresh();
  }

  function editProject(p) {
    setEditing(p.id);
    setProjectForm({
      title: p.title || '',
      type: p.type || 'Open Plots',
      status: p.status || 'Ongoing',
      location: p.location || '',
      description: p.description || '',
      image_url: p.image_url || '/plot-photo.jpg',
      published: !!p.published
    });
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  async function deleteProject(id) {
    if (!window.confirm('Delete this project?')) return;
    if (!supabaseReady) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      setStoredProjects(updated);
      return;
    }
    const {error} = await supabase.from('projects').delete().eq('id', id);
    if (error) setError(error.message);
    else refresh();
  }

  async function signOut() {
    if (supabaseReady && supabase) await supabase.auth.signOut();
    setSession(null);
    navigate('/admin');
  }

  if (checking) return <div className="admin-loading"><LoaderCircle className="spin" /> Checking session…</div>;

  if (!session) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <Logo />
          <span className="eyebrow">AUTHORIZED ACCESS ONLY</span>
          <h1>Admin Sign In</h1>
          <p>Sign in with your authorized admin credentials to manage projects and review customer enquiries.</p>
          <form onSubmit={signIn}>
            <label>
              Email address
              <input 
                type="email" 
                required 
                value={login.email} 
                onChange={e => setLogin({...login, email: e.target.value})} 
                placeholder="Admin email" 
                autoComplete="username" 
              />
            </label>
            <label>
              Password
              <input 
                type="password" 
                required 
                value={login.password} 
                onChange={e => setLogin({...login, password: e.target.value})} 
                placeholder="Password" 
                autoComplete="current-password" 
              />
            </label>
            {error && <p className="error-text">{error}</p>}
            <button className="button button-navy form-submit" type="submit">
              Sign In <ArrowRight size={16} />
            </button>
          </form>
          <Link className="back-home" to="/">← Back to website</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Logo light />
        <div className="admin-label">WORKSPACE</div>
        <button className={tab === 'projects' ? 'admin-nav active' : 'admin-nav'} onClick={() => setTab('projects')}>
          <BriefcaseBusiness size={18} /> Projects
        </button>
        <button className={tab === 'enquiries' ? 'admin-nav active' : 'admin-nav'} onClick={() => setTab('enquiries')}>
          <Inbox size={18} /> Enquiries <span>{enquiries.length}</span>
        </button>
        <div className="admin-sidebar-bottom">
          <button className="admin-nav" onClick={signOut}>
            <LogOut size={18} /> Sign out
          </button>
          <Link to="/" className="admin-nav">
            <Home size={18} /> View website
          </Link>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <span className="eyebrow">MK PROMOTERS AND DEVELOPERS</span>
            <h1>{tab === 'projects' ? 'Projects' : 'Customer enquiries'}</h1>
          </div>
          <span className="admin-user"><span className="user-dot" />{session.user.email}</span>
        </div>
        {error && <p className="error-text">{error}</p>}

        {tab === 'projects' ? (
          <>
            <div className="admin-stats">
              <div><span>Total projects</span><strong>{projects.length}</strong></div>
              <div><span>Published</span><strong>{projects.filter(p => p.published).length}</strong></div>
              <div><span>Drafts</span><strong>{projects.filter(p => !p.published).length}</strong></div>
            </div>

            <section className="admin-panel">
              <h2>{editing ? 'Edit project' : 'Add a project'}</h2>
              <form className="admin-project-form" onSubmit={saveProject}>
                <label>
                  Project name
                  <input required value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} placeholder="Project name" />
                </label>
                <div className="form-row">
                  <label>
                    Property type
                    <select value={projectForm.type} onChange={e => setProjectForm({...projectForm, type: e.target.value})}>
                      <option>Open Plots</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Land</option>
                    </select>
                  </label>
                  <label>
                    Status
                    <select value={projectForm.status} onChange={e => setProjectForm({...projectForm, status: e.target.value})}>
                      <option>Upcoming</option>
                      <option>Ongoing</option>
                      <option>Completed</option>
                    </select>
                  </label>
                </div>
                <label>
                  Location
                  <input value={projectForm.location} onChange={e => setProjectForm({...projectForm, location: e.target.value})} placeholder="Area, city" />
                </label>
                <div className="upload-group">
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: 600, color: '#334155'}}>Project Photo</label>
                  {projectForm.image_url ? (
                    <div className="image-preview-box">
                      <img src={projectForm.image_url} alt="Project preview" className="preview-thumb" />
                      <div className="preview-actions">
                        <label className="button button-outline upload-btn">
                          <Upload size={14} /> {uploadingImage ? 'Processing…' : 'Change Photo'}
                          <input type="file" accept="image/*" onChange={handleImageUpload} style={{display: 'none'}} disabled={uploadingImage} />
                        </label>
                        <button type="button" className="button button-outline" onClick={() => setProjectForm({...projectForm, image_url: ''})}>
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="upload-dropzone">
                      <Upload size={26} className="upload-icon" />
                      <strong>{uploadingImage ? 'Processing photo…' : 'Click or tap to upload photo'}</strong>
                      <span>Supports JPG, PNG, WEBP (auto-compressed for fast loading)</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{display: 'none'}} disabled={uploadingImage} />
                    </label>
                  )}
                </div>
                <label>
                  Description
                  <textarea rows="3" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} placeholder="Short project description" />
                </label>
                <label className="check-label">
                  <input type="checkbox" checked={projectForm.published} onChange={e => setProjectForm({...projectForm, published: e.target.checked})} />
                  Publish on public website
                </label>
                <div className="admin-form-actions">
                  <button className="button button-navy" disabled={saving || uploadingImage} type="submit">
                    {saving ? 'Saving…' : editing ? 'Save changes' : 'Add project'} <Plus size={16} />
                  </button>
                  {editing && (
                    <button className="button button-outline" type="button" onClick={() => {
                      setEditing(null);
                      setProjectForm({title: '', type: 'Open Plots', status: 'Ongoing', location: '', description: '', image_url: '/plot-photo.jpg', published: false});
                    }}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </section>

            <section className="admin-panel">
              <h2>All projects</h2>
              {projects.length === 0 ? (
                <p className="admin-empty">No projects added yet. Use the form above to add your first project.</p>
              ) : (
                <div className="admin-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Visibility</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map(p => (
                        <tr key={p.id}>
                          <td>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                              {p.image_url ? (
                                <img src={p.image_url} alt={p.title} style={{width: '46px', height: '34px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0, border: '1px solid #cbd5e1'}} />
                              ) : (
                                <div style={{width: '46px', height: '34px', background: '#f1f5f9', borderRadius: '4px', display: 'grid', placeItems: 'center', flexShrink: 0, color: '#64748b'}}>
                                  <Building2 size={16} />
                                </div>
                              )}
                              <div>
                                <strong>{p.title}</strong>
                                <small>{p.location}</small>
                              </div>
                            </div>
                          </td>
                          <td>{p.type}</td>
                          <td>{p.status}</td>
                          <td><span className={p.published ? 'visibility visible' : 'visibility'}>{p.published ? 'Published' : 'Draft'}</span></td>
                          <td>
                            <div className="table-actions">
                              <button onClick={() => editProject(p)} aria-label="Edit project"><Pencil size={15} /></button>
                              <button onClick={() => deleteProject(p.id)} aria-label="Delete project"><Trash2 size={15} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        ) : (
          <section className="admin-panel">
            <h2>Recent enquiries</h2>
            {enquiries.length === 0 ? (
              <p className="admin-empty">No enquiries received yet. Website enquiries will appear here once submitted.</p>
            ) : (
              <div className="admin-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Contact</th>
                      <th>Interest</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map(e => {
                      const rawNum = (e.phone || '').replace(/\D/g, '');
                      const chatNum = rawNum.length === 10 ? `91${rawNum}` : rawNum;
                      const replyUrl = chatNum ? `https://wa.me/${chatNum}?text=${encodeURIComponent(`Hello ${e.name}, thank you for contacting MK Promoters regarding ${e.interest}.`)}` : null;
                      return (
                        <tr key={e.id}>
                          <td><strong>{e.name}</strong></td>
                          <td>{e.phone}<small>{e.email}</small></td>
                          <td>{e.interest}</td>
                          <td>{e.message || '—'}</td>
                          <td>{e.created_at ? new Date(e.created_at).toLocaleDateString() : '—'}</td>
                          <td>
                            {replyUrl ? (
                              <a href={replyUrl} target="_blank" rel="noreferrer" className="button button-whatsapp" style={{padding: '5px 10px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '5px'}}>
                                <MessageCircle size={13} /> WhatsApp
                              </a>
                            ) : '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
