import { useState, useEffect } from 'react';
import { Sliders, Check, ArrowRight, Sparkles } from 'lucide-react';

interface PricingCalculatorProps {
  onSelectPackage: (packageName: string, estimatedPrice: number, selectedFeatures: string[]) => void;
}

export default function PricingCalculator({ onSelectPackage }: PricingCalculatorProps) {
  // Service options
  const [services, setServices] = useState([
    { id: 'strategy', label: 'Brand & Market Strategy', baseCost: 1200, checked: true },
    { id: 'uxui', label: 'UX/UI Interactive Design', baseCost: 1800, checked: true },
    { id: 'dev', label: 'Custom Front-end & React Dev', baseCost: 2000, checked: true },
    { id: 'motion', label: 'Motion & Interactive WebGL', baseCost: 1000, checked: false },
    { id: 'backend', label: 'Custom Database & Backend Integration', baseCost: 1500, checked: false },
  ]);

  // Timeline (1 to 6 months)
  const [timelineMonths, setTimelineMonths] = useState(2);

  // Deliverable speed toggle
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1 = standard, 1.3 = express delivery

  // Estimated calculation
  const [calculatedCost, setCalculatedCost] = useState(0);

  // Recalculate price
  useEffect(() => {
    const servicesCost = services
      .filter((s) => s.checked)
      .reduce((sum, s) => sum + s.baseCost, 0);

    // Standard formula: cost * speed multiplier * duration modifier
    // Standard duration modifier: slightly cheaper monthly cost for longer commitments
    const durationModifier = timelineMonths === 1 ? 1.1 : timelineMonths >= 4 ? 0.85 : 1;
    
    const monthlyEstimate = Math.round(servicesCost * speedMultiplier * durationModifier);
    setCalculatedCost(monthlyEstimate);
  }, [services, timelineMonths, speedMultiplier]);

  const toggleService = (id: string) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  const handleApplyToBooking = () => {
    const activeFeatures = services
      .filter((s) => s.checked)
      .map((s) => s.label);
    
    // Suggest standard/custom package
    let tierName = 'Custom Digital Scope';
    if (calculatedCost < 4500) {
      tierName = 'Custom Product Launch Scale';
    } else if (calculatedCost < 9000) {
      tierName = 'Custom Scale & Capture Scope';
    } else {
      tierName = 'Custom Agile Enterprise Team';
    }

    onSelectPackage(tierName, calculatedCost, activeFeatures);

    // Scroll to booking form
    const bookingForm = document.getElementById('book-call');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-md p-6 sm:p-8 md:p-10 text-left">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-white">Custom Package Builder</h3>
            <p className="text-xs text-neutral-400 mt-0.5">Customize your engagement scope & timeline in real-time</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 px-3 py-1 text-[11px] font-mono tracking-wider uppercase text-amber-300">
          <Sparkles className="h-3 w-3" />
          <span>Interactive Estimator</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Selection panel */}
        <div className="lg:col-span-7 space-y-6">
          {/* Services checkbox list */}
          <div>
            <label className="text-xs font-mono tracking-wider text-neutral-400 uppercase block mb-3.5">
              Select Services Scope
            </label>
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`flex items-center justify-between rounded-xl border p-3.5 cursor-pointer transition-all ${
                    service.checked
                      ? 'border-indigo-500/30 bg-indigo-500/5 text-white'
                      : 'border-white/5 bg-neutral-950/20 text-neutral-400 hover:border-white/10 hover:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                        service.checked
                          ? 'border-indigo-500 bg-indigo-500 text-white'
                          : 'border-neutral-700 bg-transparent'
                      }`}
                    >
                      {service.checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-sm font-medium">{service.label}</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    +${service.baseCost}/mo
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono tracking-wider text-neutral-400 uppercase block">
                Engagement Duration
              </label>
              <span className="text-sm font-semibold text-white">
                {timelineMonths} {timelineMonths === 1 ? 'Month' : 'Months'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              value={timelineMonths}
              onChange={(e) => setTimelineMonths(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-2">
              <span>1 Month (Express Launch)</span>
              <span>3 Months</span>
              <span>6 Months (Retainer Discount)</span>
            </div>
          </div>

          {/* Delivery speed modifier */}
          <div>
            <label className="text-xs font-mono tracking-wider text-neutral-400 uppercase block mb-3">
              Delivery Speed Requirement
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSpeedMultiplier(1)}
                className={`rounded-xl border p-3.5 text-center transition-all ${
                  speedMultiplier === 1
                    ? 'border-indigo-500 bg-indigo-500/5 text-white'
                    : 'border-white/5 bg-neutral-950/20 text-neutral-400 hover:border-white/10'
                }`}
              >
                <div className="text-sm font-semibold">Standard Pace</div>
                <div className="text-[10px] text-neutral-500 mt-1">Normal engineering cycles</div>
              </button>

              <button
                type="button"
                onClick={() => setSpeedMultiplier(1.35)}
                className={`rounded-xl border p-3.5 text-center transition-all ${
                  speedMultiplier === 1.35
                    ? 'border-indigo-500 bg-indigo-500/5 text-white'
                    : 'border-white/5 bg-neutral-950/20 text-neutral-400 hover:border-white/10'
                }`}
              >
                <div className="text-sm font-semibold text-amber-300 flex items-center justify-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  Express Delivery
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">Accelerated sprint delivery (+35%)</div>
              </button>
            </div>
          </div>
        </div>

        {/* Calculation results card */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between">
          <div className="rounded-2xl bg-neutral-950/60 border border-white/5 p-6 space-y-6 text-center lg:text-left">
            <div>
              <p className="text-xs font-mono tracking-wider text-neutral-400 uppercase mb-1">
                Estimated Monthly Retainer
              </p>
              <div className="flex items-baseline justify-center lg:justify-start gap-1">
                <span className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">
                  ${calculatedCost.toLocaleString()}
                </span>
                <span className="text-sm text-neutral-400 font-mono">/month</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-5">
              <p className="text-xs font-mono tracking-wider text-neutral-400 uppercase mb-3">
                Selected Package Deliverables
              </p>
              <ul className="space-y-2.5 text-xs text-neutral-300 text-left">
                {services.filter(s => s.checked).map(s => (
                  <li key={s.id} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{s.label}</span>
                  </li>
                ))}
                {services.filter(s => s.checked).length === 0 && (
                  <li className="text-neutral-500 italic text-center">
                    Please select at least one service to get an estimate.
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>Interactive design delivery ({timelineMonths} mo duration)</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              disabled={services.filter(s => s.checked).length === 0}
              onClick={handleApplyToBooking}
              className="w-full rounded-xl bg-white text-neutral-950 py-3.5 text-xs font-bold transition-all hover:bg-neutral-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Book Call for this Package</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="text-[11px] text-neutral-500 mt-4 leading-relaxed text-center lg:text-left">
            *This is an initial design engineering estimation based on general complexity. Final pricing and timeline commitments are formally locked in after a strategic kickoff consult.
          </p>
        </div>
      </div>
    </div>
  );
}
