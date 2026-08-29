import { Link } from "react-router-dom";

export default function OakEIPNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link to="/oakeip" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="OakEIP logo" className="h-8 w-8 object-contain" />
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-black">OakEIP</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              Enterprise Intelligence Platform
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/oakeip/pricing" className="hidden sm:block">
            <span className="inline-flex items-center justify-center rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 text-xs bg-transparent text-emerald-700 hover:bg-emerald-50 mr-2">
              Pricing
            </span>
          </Link>
          
          <Link to="/oakeip/request-demo">
            <span className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 text-xs bg-emerald-600 text-white hover:bg-emerald-700 ml-2">
              Request Demo
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
