import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Compass, Layers, Cpu, Check, ArrowRight, Sparkles, ArrowUpRight, PhoneCall, Calendar } from 'lucide-react';
import { Project, Booking } from './types';
import { PROJECTS, PRICING_PLANS, SERVICES } from './data';

import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import ProjectDetailModal from './components/ProjectDetailModal';
import PricingCalculator from './components/PricingCalculator';
import BookingScheduler from './components/BookingScheduler';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [prefilledPackage, setPrefilledPackage] = useState<{ name: string; estimatedPrice: number; features: string[] } | null>(null);
  const [isQuarterly, setIsQuarterly] = useState(false);
  const [activeTab, setActiveTab] = useState<'strategy' | 'design' | 'tech'>('strategy');
  const [viewBookingsOnly, setViewBookingsOnly] = useState(false);

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('brind_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing scheduled consults:', e);
      }
    }
  }, []);

  // Save booking callback
  const handleBookingSuccess = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('brind_bookings', JSON.stringify(updated));
  };

  // Cancel booking callback
  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem('brind_bookings', JSON.stringify(updated));
  };

  const handleSelectCustomPackage = (packageName: string, estimatedPrice: number, selectedFeatures: string[]) => {
    setPrefilledPackage({
      name: packageName,
      estimatedPrice,
      features: selectedFeatures,
    });
    setViewBookingsOnly(false);
  };

  const triggerBookCall = () => {
    setPrefilledPackage(null);
    setViewBookingsOnly(false);
    const element = document.getElementById('book-call');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const triggerViewBookings = () => {
    setViewBookingsOnly(true);
    const element = document.getElementById('book-call');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white antialiased overflow-x-hidden">
      
      {/* Premium Sticky Navigation Header */}
      <Header
        bookingCount={bookings.length}
        onBookCallClick={triggerBookCall}
        onViewBookingsClick={triggerViewBookings}
      />

      <main className="pb-24">
        {/* HERO SECTION - Exact layout and branding from User Prompt */}
        <div className="px-6 md:px-8 max-w-7xl mx-auto pt-8">
          <section
            id="hero"
            className="relative z-10 sm:p-8 animate-scaleIn bg-neutral-900/60 w-full bg-[url(https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/ee9b32bb-e72d-47cb-a983-ddf26a66cef2_1600w.jpg)] max-w-7xl bg-cover border-white/10 border rounded-3xl mt-8 pt-10 pr-6 pb-6 pl-6 backdrop-blur flex flex-col justify-between overflow-hidden shadow-2xl"
            style={{ minHeight: '520px' }}
          >
            {/* Background layers */}
            <div className="absolute inset-0 overflow-hidden -z-10 rounded-3xl">
              <div
                className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-slate-900 to-neutral-950 bg-[url(https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/c06498e9-85e2-4173-a1f6-86b1267897f0_1600w.jpg)] bg-cover invisible">
                <div data-us-project="OMO2zbNkRGUqAVYhB4jD"
                  style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}></div>
              </div>
              <div className="absolute -left-20 -top-24 bg-transparent w-[70%] h-[140%] blur-3xl rotate-12 invisible"
                style={{ left: 0, transform: 'translateX(0) rotate(12deg)' }}>
              </div>
              <div className="absolute -left-20 -top-24 bg-transparent w-[70%] h-[140%] blur-3xl rotate-12 invisible"
                style={{ left: 0, transform: 'translateX(0) rotate(12deg)' }}>
                <div aria-hidden="true" className="pointer-events-none select-none absolute bottom-6 left-6"
                  style={{ letterSpacing: '-0.02em' }}>
                  <span className="block leading-none" style={{ fontWeight: 600, fontSize: 'min(20vw, 280px)', lineHeight: 0.8, color: 'rgba(125, 211, 252, 0.5)' }}>BRIND</span>
                </div>
              </div>

              {/* Brand name positioned at left to align with header text */}
              <div aria-hidden="true"
                className="pointer-events-none select-none absolute bottom-6 left-6 animate-fadeIn"
                style={{ letterSpacing: '-0.02em', animationDelay: '600ms' }}>
                <span className="block leading-none font-display font-bold select-none" style={{ fontSize: 'min(16vw, 190px)', lineHeight: 0.8, color: 'rgba(255, 255, 255, 0.04)' }}>BRIND</span>
              </div>
            </div>

            {/* Content Container */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start w-full">
              {/* Left: Headline */}
              <div className="lg:col-span-7 text-left">
                <h1
                  className="text-[42px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter animate-fadeInLeft"
                  style={{ animationDelay: '300ms' }}
                >
                  Building Digital Experiences That Captivate
                </h1>
              </div>

              {/* Right: Copy + CTAs */}
              <div className="lg:col-span-5 text-left">
                <p 
                  className="sm:text-base text-sm text-neutral-300 max-w-[42ch] animate-fadeInRight leading-relaxed"
                  style={{ animationDelay: '400ms' }}
                >
                  Our team blends strategy, design, and technology to craft memorable digital experiences that drive results.
                </p>
                
                <div 
                  className="flex flex-wrap gap-4 animate-fadeInUp mt-6 items-center"
                  style={{ animationDelay: '500ms' }}
                >
                  {/* Book a Call button - exact inline styling mapped into React handlers */}
                  <button
                    onClick={triggerBookCall}
                    className="flex items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 transform active:scale-95 cursor-pointer h-[50px] px-6"
                    style={{
                      backgroundImage: 'linear-gradient(144deg, rgb(175, 64, 255), rgb(91, 66, 243) 50%, rgb(0, 221, 235))',
                      boxShadow: 'rgba(151, 65, 252, 0.2) 0px 15px 30px -5px',
                    }}
                  >
                    <span>Book a call</span>
                  </button>

                  {/* View Pricing button */}
                  <button
                    onClick={() => {
                      const el = document.getElementById('pricing');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg text-sm font-medium text-white transition-all duration-300 bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/20 px-6 h-[50px] cursor-pointer"
                  >
                    <span>View pricing</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="pt-12 flex justify-between items-center text-xs text-neutral-500 font-mono mt-auto select-none border-t border-white/5 w-full">
              <span>ESTABLISHED MMXXVI</span>
              <span className="flex items-center gap-2 text-indigo-400">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>EXPERIENCE IS THE PRODUCT</span>
              </span>
            </div>
          </section>
        </div>

        {/* METRICS & CLIENT LOGOS TRUST BAR */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 rounded-2xl border border-white/5 bg-neutral-900/10 p-8 backdrop-blur-sm">
            <div className="text-center md:text-left">
              <p className="font-display text-3xl sm:text-4xl font-bold text-white">98%</p>
              <p className="text-xs text-neutral-500 font-mono tracking-wider uppercase mt-1">Client Retention Rate</p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-display text-3xl sm:text-4xl font-bold text-white">40M+</p>
              <p className="text-xs text-neutral-500 font-mono tracking-wider uppercase mt-1">Active End Users</p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-display text-3xl sm:text-4xl font-bold text-white">$45M</p>
              <p className="text-xs text-neutral-500 font-mono tracking-wider uppercase mt-1">Client Funding Raised</p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-display text-3xl sm:text-4xl font-bold text-white">12+</p>
              <p className="text-xs text-neutral-500 font-mono tracking-wider uppercase mt-1">Creative Tech Awards</p>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION (BENTO GRID WITH DETAILED SUB-VIEW) */}
        <section id="services" className="mx-auto max-w-7xl px-6 md:px-8 mt-32 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-mono tracking-wider uppercase text-neutral-400 border border-white/5">
                Core Capabilities
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-4">
                Strategy. Design. Technology.
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md">
              We eliminate traditional organizational handoffs. Our specialists operate at the intersection of business intelligence, art, and performance engineering.
            </p>
          </div>

          {/* Interactive Bento tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Tabs Trigger list */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {SERVICES.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`flex flex-col rounded-2xl border p-5 text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-white/5 bg-neutral-900/10 hover:border-white/10 hover:bg-neutral-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                        isActive ? 'bg-indigo-500 text-white border-indigo-400' : 'bg-white/5 text-neutral-400 border-white/5'
                      }`}>
                        {item.id === 'strategy' ? <Compass className="h-5 w-5" /> : item.id === 'design' ? <Layers className="h-5 w-5" /> : <Cpu className="h-5 w-5" />}
                      </div>
                      <span className="font-display font-medium text-lg text-white">{item.title}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-3 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Tab Detail Content with custom graphics */}
            <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-neutral-900/30 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-mono tracking-widest text-indigo-400 uppercase">
                    Active capability detail
                  </span>
                  <div className="flex gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${activeTab === 'strategy' ? 'bg-indigo-500' : 'bg-neutral-800'}`} />
                    <span className={`h-1.5 w-1.5 rounded-full ${activeTab === 'design' ? 'bg-indigo-500' : 'bg-neutral-800'}`} />
                    <span className={`h-1.5 w-1.5 rounded-full ${activeTab === 'tech' ? 'bg-indigo-500' : 'bg-neutral-800'}`} />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {SERVICES.map((item) => {
                    if (item.id !== activeTab) return null;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">{item.title}</h3>
                        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                          {item.description}
                        </p>

                        <div className="border-t border-white/5 pt-6">
                          <p className="text-xs font-mono tracking-wider text-neutral-400 uppercase mb-4">Focus Deliverables</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {item.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-sm text-neutral-200">
                                <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                                </div>
                                <span className="font-medium">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap justify-between items-center gap-4">
                <p className="text-xs text-neutral-400">Need customized cross-functional deliverables?</p>
                <button
                  onClick={triggerBookCall}
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <span>Inquire about this competency</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* WORK / CASE STUDIES GALLERY SECTION */}
        <section id="work" className="mx-auto max-w-7xl px-6 md:px-8 mt-32 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-mono tracking-wider uppercase text-neutral-400 border border-white/5">
                Our Work
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-4">
                Showcasing Captivating Solutions
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm">
              Explore concrete examples of strategic design and robust system architectures implemented for digital innovators worldwide.
            </p>
          </div>

          {/* Project card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </section>

        {/* PRICING PLANS SECTION */}
        <section id="pricing" className="mx-auto max-w-7xl px-6 md:px-8 mt-32 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-mono tracking-wider uppercase text-neutral-400 border border-white/5">
                Pricing Retainers
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-4">
                Transparent & Predictable Pricing
              </h2>
            </div>

            {/* Monthly / Quarterly Cycle Switcher */}
            <div className="flex items-center gap-3 self-start md:self-end bg-neutral-900/60 p-1.5 rounded-full border border-white/5">
              <button
                onClick={() => setIsQuarterly(false)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  !isQuarterly ? 'bg-white text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setIsQuarterly(true)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isQuarterly ? 'bg-white text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>Quarterly saver</span>
                <span className="rounded bg-indigo-500/15 border border-indigo-500/20 px-1.5 py-0.5 text-[9px] font-mono text-indigo-300">
                  Save 10%
                </span>
              </button>
            </div>
          </div>

          {/* Standard Pricing tiers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
            {PRICING_PLANS.map((plan) => {
              // Apply discount for quarterly savers
              const originalPrice = plan.price;
              const activePrice = isQuarterly ? Math.round(originalPrice * 0.9) : originalPrice;
              
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 bg-neutral-900/20 backdrop-blur-sm ${
                    plan.isPopular
                      ? 'border-indigo-500/40 shadow-[0_0_40px_rgba(99,102,241,0.08)] bg-gradient-to-b from-indigo-950/10 to-transparent'
                      : 'border-white/5'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-indigo-500 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Most Popular Scope</span>
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
                      <p className="mt-2 text-xs text-neutral-400 leading-relaxed min-h-[40px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price Tag */}
                    <div className="my-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                          ${activePrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-neutral-400 font-mono">/month</span>
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-1 font-mono">
                        {isQuarterly ? `billed quarterly ($${(activePrice * 3).toLocaleString()} total)` : 'billed month-to-month'}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="border-t border-white/5 pt-6">
                      <p className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-4">Included Retainer Deliverables</p>
                      <ul className="space-y-3">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                            <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 border-t border-white/5 pt-6">
                    <button
                      onClick={() => handleSelectCustomPackage(plan.name, activePrice, plan.features)}
                      className={`w-full rounded-xl py-3 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        plan.isPopular
                          ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                          : 'bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800'
                      }`}
                    >
                      <span>Choose {plan.name}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Package Builder (PricingCalculator) */}
          <PricingCalculator onSelectPackage={handleSelectCustomPackage} />
        </section>

        {/* BOOK CALL / SCHEDULER SECTION */}
        <section id="book-call" className="mx-auto max-w-7xl px-6 md:px-8 mt-32 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-mono tracking-wider uppercase text-neutral-400 border border-white/5">
                Booking Scheduler
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-4">
                Schedule Your Discovery Session
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm">
              Choose an available day and time slot to set up a 45-minute kickoff call with our expert experience engineering leads.
            </p>
          </div>

          <BookingScheduler
            prefilledPackage={prefilledPackage}
            onBookingSuccess={handleBookingSuccess}
            existingBookings={bookings}
            onCancelBooking={handleCancelBooking}
            viewBookingsOnly={viewBookingsOnly}
          />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-neutral-950/80 pt-16 pb-12 text-left">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo Column */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-display text-3xl font-bold tracking-widest text-white">BRIND</h3>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              We operate at the nexus of strategic identity and custom experience engineering. Creating captivations that translate to measurable success metrics.
            </p>
            <div className="flex gap-4 text-xs font-mono text-indigo-400 pt-2">
              <span>● STRATEGY</span>
              <span>● DESIGN</span>
              <span>● CODE</span>
            </div>
          </div>

          {/* Nav Column */}
          <div className="md:col-span-3 space-y-3.5 text-sm">
            <h4 className="text-xs font-mono tracking-wider text-neutral-400 uppercase font-semibold">Navigator</h4>
            <div className="flex flex-col gap-2.5 text-neutral-400">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left hover:text-white transition-colors cursor-pointer">
                Top / Hero
              </button>
              <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="text-left hover:text-white transition-colors cursor-pointer">
                Services
              </button>
              <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className="text-left hover:text-white transition-colors cursor-pointer">
                Our Work Portfolio
              </button>
              <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-left hover:text-white transition-colors cursor-pointer">
                Transparent Pricing
              </button>
            </div>
          </div>

          {/* Contact details */}
          <div className="md:col-span-4 space-y-3.5 text-sm">
            <h4 className="text-xs font-mono tracking-wider text-neutral-400 uppercase font-semibold">HQ Contact</h4>
            <div className="space-y-2 text-neutral-400">
              <p>📍 120 Creative Commons, Suite 400</p>
              <p>📧 partner@brind.digital</p>
              <p>🕒 Mon - Fri, 09:00 AM - 06:00 PM EST</p>
              <p className="text-[11px] text-neutral-500 font-mono pt-2">
                © {new Date().getFullYear()} BRIND digital agency. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Case Study Detail Modal (AnimatePresence handles entry/exit cleanly) */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
