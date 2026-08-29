import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Boxes,
  Brain,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Factory,
  FileText,
  Gauge,
  Gavel,
  GraduationCap,
  HardHat,
  Layers,
  LineChart,
  Network,
  Recycle,
  Scale,
  Ship,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Workflow,
  Zap,
} from "lucide-react";

const Button = ({ variant = "default", size = "default", className = "", children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50";
  const sizeClasses = size === "sm" ? "h-9 px-3 text-xs" : size === "lg" ? "h-11 px-8 text-base" : "h-10 px-4 py-2 text-sm";
  
  // If custom bg or text are passed via className, we don't apply variant styles to prevent conflicts
  const hasCustomStyles = className.includes("bg-") || className.includes("text-") || className.includes("border-");
  
  let variantClasses = "";
  if (!hasCustomStyles) {
    if (variant === "default") variantClasses = "bg-neutral-900 text-white hover:bg-neutral-800";
    if (variant === "outline") variantClasses = "border border-neutral-200 bg-transparent text-neutral-900 hover:bg-neutral-100";
    if (variant === "ghost") variantClasses = "bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900";
  }

  return (
    <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ variant = "default", className = "", children, ...props }) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500";
  let variantClasses = "border-transparent bg-neutral-900 text-white";
  if (variant === "secondary") variantClasses = "border-transparent bg-neutral-100 text-neutral-900";
  
  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

const CONTACT = "/oakeip/request-demo";

const lifecycle = [
  { icon: Compass, label: "Strategy", note: "Direction, objectives, portfolio" },
  { icon: Zap, label: "Transformation", note: "Change programmes & readiness" },
  { icon: Workflow, label: "Implementation", note: "Management system build" },
  { icon: CalendarCheck, label: "Operations", note: "Daily discipline & calendars" },
  { icon: ClipboardCheck, label: "Audit & Assurance", note: "Process-based auditing" },
  { icon: Scale, label: "Compliance", note: "Obligations & regulators" },
  { icon: Recycle, label: "Improvement", note: "CAPA, benefits, ROI" },
  { icon: Brain, label: "Executive Intelligence", note: "Predictive & decision insight" },
  { icon: Target, label: "Business Excellence", note: "Maturity & excellence index" },
];

const products = [
  {
    icon: Layers,
    name: "OakForge",
    tag: "Design. Build. Implement. Improve.",
    body: "Enterprise strategy, transformation and management-system lifecycle - blueprints, programmes, operations, management review and the Executive Command Centre.",
  },
  {
    icon: ClipboardCheck,
    name: "OakAudix",
    tag: "Enterprise Assurance",
    body: "Knowledge-driven, process-based audit planning, execution, evidence intelligence, findings and management review.",
  },
  {
    icon: Scale,
    name: "OakComply",
    tag: "Regulatory Compliance",
    body: "Obligation registers, regulatory change, compliance calendars, controls and evidence of conformance.",
  },
  {
    icon: HardHat,
    name: "OakHSE360",
    tag: "Health, Safety & Environment",
    body: "Incidents, hazards, risk, permits to work, inspections and HSE performance across sites and contractors.",
  },
];

const services = [
  { icon: Gauge, name: "Executive Intelligence", body: "Drill-downs, forecasting, board packs." },
  { icon: Gavel, name: "Enterprise Governance", body: "Decisions, actions, strategic KPIs." },
  { icon: BookOpen, name: "Knowledge Studio", body: "Governed ISO knowledge packages." },
  { icon: Target, name: "Enterprise Excellence", body: "Operational efficiency and business alignment." },
  { icon: FileText, name: "Documentation Center", body: "Controlled documents & publications." },
  { icon: GraduationCap, name: "Learning Center", body: "Role-based paths and assessments." },
];

const outcomes = [
  { value: "60%", label: "Faster ISO implementation", note: "Blueprint-driven programme delivery" },
  { value: "45%", label: "Less audit preparation effort", note: "Reusable governed knowledge" },
  { value: "1", label: "Single source of assurance", note: "One evidence and CAPA spine" },
  { value: "9.3", label: "Management review, assembled", note: "Inputs from all six domains" },
];

const industries = [
  { icon: Factory, label: "Manufacturing" },
  { icon: Boxes, label: "Engineering & EPC" },
  { icon: Zap, label: "Oil, Gas & Energy" },
  { icon: Truck, label: "Logistics & Supply Chain" },
  { icon: Building2, label: "Construction & Infrastructure" },
  { icon: Ship, label: "Maritime & Ports" },
  { icon: ShieldCheck, label: "Regulated Services" },
  { icon: Network, label: "Professional Services" },
];

const standards = [
  "ISO 9001",
  "ISO 14001",
  "ISO 45001",
  "ISO 27001",
  "ISO 22000",
  "ISO 50001",
  "ISO 31000",
  "ISO 19011",
  "ISO 55001",
  "Integrated Management Systems",
];

const differentiators = [
  {
    icon: Layers,
    title: "One integrated operating platform",
    body: "Strategy, implementation, operations, assurance and intelligence share one canonical data model - not four disconnected tools.",
  },
  {
    icon: BookOpen,
    title: "Knowledge-driven by design",
    body: "Governed clause, requirement and evidence knowledge flows into every audit, gap assessment and document draft.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade tenancy",
    body: "Multi-tenant isolation, RBAC capability catalogue, full audit trail and immutable governance baselines.",
  },
  {
    icon: LineChart,
    title: "Executive-first intelligence",
    body: "Predictive readiness, decision impact analysis and board-ready packs generated from live operational evidence.",
  },
  {
    icon: Recycle,
    title: "Closed-loop improvement",
    body: "Findings, gaps, incidents and obligations converge in one CAPA and benefit-realisation pipeline.",
  },
  {
    icon: TrendingUp,
    title: "Maturity you can measure",
    body: "Capability maturity, health indices and an organisational excellence index tracked over time.",
  },
];

export default function OakEIPPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-emerald-800 bg-gradient-to-br from-emerald-700 via-emerald-600 to-sky-800 text-white">
          
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 72%)",
            }}
          />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div>
              <Badge className="bg-emerald-600 text-white border-white/20 bg-white/10">
                Enterprise Platform Baseline v1.0
              </Badge>
              <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl text-white">
                The enterprise operating platform for governance, assurance and excellence.
              </h1>
              <p className="mt-4 max-w-xl text-lg text-emerald-50">
                OakEIP connects strategy, management system implementation, daily operations, audit,
                compliance, HSE and executive intelligence in one governed platform - so leadership
                decides from evidence, not spreadsheets.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to={CONTACT}>
                  <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 shadow-md font-bold border-0">
                    Request a demo <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>
                <Link to={CONTACT}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    Book an executive briefing
                  </Button>
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500">
                {["Multi-tenant & ISO-aware", "Board-ready reporting", "Evidence grounded in governed knowledge"].map(
                  (i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-neutral-9000" /> {i}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Architecture visual */}
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                Platform architecture
              </div>
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {products.map((p) => (
                    <div
                      key={p.name}
                      className="rounded-lg border border-neutral-100 bg-neutral-50 px-3 py-3 text-center"
                    >
                      <p.icon className="mx-auto h-4 w-4 text-neutral-9000" />
                      <div className="mt-1.5 text-xs font-semibold">{p.name}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white shadow-sm px-3 py-3">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400">
                    Shared enterprise services
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {services.map((s) => (
                      <span
                        key={s.name}
                        className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] text-neutral-700"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white shadow-sm px-3 py-3">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400">
                    Platform foundation
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["Identity", "Tenancy", "RBAC", "Workflow", "Audit Trail", "Analytics", "Storage"].map(
                      (f) => (
                        <span
                          key={f}
                          className="rounded-md border border-neutral-200 px-2 py-1 text-[11px] text-neutral-700"
                        >
                          {f}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why OakEIP */}
        <section className="border-b border-neutral-200 bg-neutral-50/50">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Why OakEIP
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                One continuous enterprise lifecycle - not a collection of applications.
              </h2>
              <p className="mt-4 text-neutral-600">
                Most platforms address a single stage. OakEIP carries the organisation end to end,
                with each stage feeding evidence forward to the next.
              </p>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-9">
              {lifecycle.map((s, idx) => (
                <div
                  key={s.label}
                  className="relative rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:border-sky-300"
                >
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-sky-100 text-sky-700">
                      <s.icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-400">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-3 text-sm font-semibold leading-tight">{s.label}</div>
                  <p className="mt-1 text-xs text-neutral-500">{s.note}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 h-1 w-full rounded-full bg-gradient-to-r from-sky-600 via-emerald-500 to-sky-100" />
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-b border-neutral-200">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((o, idx) => (
              <div key={o.label}>
                <div className={`text-4xl font-bold tracking-tight ${idx % 2 === 0 ? 'text-sky-700' : 'text-emerald-600'}`}>{o.value}</div>
                <div className="mt-2 font-semibold">{o.label}</div>
                <p className="mt-1 text-sm text-neutral-500">{o.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core capabilities */}
        <section className="border-b border-neutral-200 bg-neutral-50/50">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Core platform capabilities
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Four enterprise capabilities on one governed foundation.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {products.map((p) => (
                <div key={p.name} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-700">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold">{p.name}</h3>
                        <Badge variant="secondary">{p.tag}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-neutral-600">{p.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-14 text-xl font-semibold tracking-tight">
              Shared enterprise services, available to every capability
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div key={s.name} className="rounded-xl border border-neutral-200 bg-white p-5">
                  <s.icon className="h-5 w-5 text-sky-700" />
                  <div className="mt-3 font-semibold">{s.name}</div>
                  <p className="mt-1 text-sm text-neutral-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Enterprise differentiators
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Built for organisations that must prove how they operate.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((d) => (
                <div key={d.title} className="border-l-2 border-sky-200 pl-5">
                  <d.icon className="h-5 w-5 text-sky-700" />
                  <h3 className="mt-3 font-semibold">{d.title}</h3>
                  <p className="mt-1.5 text-sm text-neutral-600">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-slate-900 text-neutral-900 border-t border-slate-800">
          
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900">
              See OakEIP against your own management system.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-700">
              We run executive briefings using your standards, sites and obligations - so you see
              real readiness, not a generic demo environment.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <Link to={CONTACT}>
                <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 border-0">
                  Book an executive briefing <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <Link to={CONTACT}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 shadow-sm"
                >
                  Request a demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      
    </div>
  );
}
