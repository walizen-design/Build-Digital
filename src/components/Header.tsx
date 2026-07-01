import { PhoneCall, Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onBookCallClick: () => void;
  onViewBookingsClick: () => void;
  bookingCount: number;
}

export default function Header({ onBookCallClick, onViewBookingsClick, bookingCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-neutral-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 font-display text-2xl font-bold tracking-widest text-white transition-opacity hover:opacity-85"
        >
          BRIND
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors cursor-pointer">
            Services
          </button>
          <button onClick={() => scrollToSection('work')} className="hover:text-white transition-colors cursor-pointer">
            Work
          </button>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors cursor-pointer">
            Pricing
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {bookingCount > 0 && (
            <button
              onClick={onViewBookingsClick}
              className="flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300 hover:bg-indigo-500/20 transition-all cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5 animate-pulse" />
              <span>{bookingCount} Booking{bookingCount > 1 ? 's' : ''}</span>
            </button>
          )}
          <button
            onClick={onBookCallClick}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-neutral-200 transition-colors duration-200 cursor-pointer"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>Book a call</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-3">
          {bookingCount > 0 && (
            <button
              onClick={onViewBookingsClick}
              className="flex items-center gap-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-xs font-medium text-indigo-300"
            >
              <Calendar className="h-3 w-3 animate-pulse" />
              <span>{bookingCount}</span>
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-neutral-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/5 bg-neutral-950 px-6 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col gap-4 text-sm font-medium text-neutral-400">
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 hover:text-white transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="text-left py-2 hover:text-white transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left py-2 hover:text-white transition-colors"
            >
              Pricing
            </button>
          </nav>
          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
            {bookingCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onViewBookingsClick();
                }}
                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 py-2.5 text-xs font-medium text-indigo-300"
              >
                <Calendar className="h-4 w-4" />
                <span>Manage {bookingCount} Booking{bookingCount > 1 ? 's' : ''}</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookCallClick();
              }}
              className="flex items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-xs font-semibold text-neutral-950 hover:bg-neutral-200 transition-colors"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Book a call</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
