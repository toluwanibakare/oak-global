import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus } from "lucide-react";
import PageTransition from "../components/PageTransition";

const Button = ({ variant = "default", size = "default", className = "", children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50";
  const sizeClasses = size === "sm" ? "h-9 px-4 text-xs" : size === "lg" ? "h-12 px-8 text-base" : "h-10 px-5 py-2 text-sm";
  
  const hasCustomStyles = className.includes("bg-") || className.includes("text-") || className.includes("border-");
  let variantClasses = "";
  if (!hasCustomStyles) {
    if (variant === "default") variantClasses = "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow";
    if (variant === "outline") variantClasses = "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 hover:border-neutral-300";
    if (variant === "ghost") variantClasses = "bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900";
  }

  return (
    <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ className = "", children }) => {
  return (
    <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-colors ${className}`}>
      {children}
    </div>
  );
};

const CONTACT = "/oakeip/request-demo";

const pricingPlans = [
  {
    name: "OakEIP Foundation",
    price: "₦3.6m",
    status: "Available",
    statusColor: "text-emerald-600 bg-emerald-50",
    desc: "For smaller organisations beginning their digital management-system and governance transformation.",
    features: "Establish a controlled digital foundation for management systems, governance, evidence, actions and organisational visibility.",
    impl: "Implementation: ₦1.5m-₦2.5m\n(scoped separately)",
    cta: "Contact Sales"
  },
  {
    name: "OakEIP Management",
    price: "₦7.5m",
    status: "Available",
    statusColor: "text-emerald-600 bg-emerald-50",
    desc: "For organisations seeking structured management-system, governance and performance management.",
    features: "Build, operate and continuously improve your management system and organisational controls in one environment.",
    impl: "Implementation: ₦3m-₦5m\n(scoped separately)",
    cta: "Contact Sales"
  },
  {
    name: "OakEIP Assurance",
    price: "₦14.4m",
    status: "Available",
    statusColor: "text-emerald-600 bg-emerald-50",
    desc: "For organisations requiring integrated management-system, audit, compliance, evidence and corrective-action capabilities.",
    features: "Connect management systems, audit, compliance, evidence and improvement in one integrated environment.",
    impl: "Implementation: ₦5m-₦9m\n(scoped separately)",
    cta: "Contact Sales"
  },
  {
    name: "OakEIP Enterprise",
    price: "From ₦30m",
    status: "Selected plans",
    statusColor: "text-sky-700 bg-sky-50",
    desc: "For larger, multi-site or operationally complex organisations.",
    features: "An integrated enterprise environment for management systems, assurance, QHSE, risk, strategy and business intelligence.",
    impl: "Implementation: ₦10m-₦20m\n(scoped separately)",
    cta: "Contact Sales"
  },
  {
    name: "OakEIP Enterprise Plus",
    price: "From ₦60m",
    status: "Custom",
    statusColor: "text-indigo-700 bg-indigo-50",
    desc: "For large groups, complex enterprises and strategic deployments.",
    features: "A strategic enterprise agreement combining broad platform capabilities, multiple sites, advanced analytics, integrations, enhanced support and optional managed services.",
    impl: "Implementation: ₦20m-₦50m\n(scoped separately)",
    cta: "Request a Quotation"
  }
];

const featureRows = [
  { name: "OakEIP Core Platform", values: ["Y", "Y", "Y", "Y", "Y"] },
  { name: "OakForge - Management System", values: ["Core", "Advanced", "Advanced", "Enterprise", "Strategic"] },
  { name: "Documents & Evidence", values: ["Y", "Y", "Y", "Y", "Y"] },
  { name: "CAPA & Improvement", values: ["Y", "Y", "Y", "Y", "Y"] },
  { name: "KPI & Metrics", values: ["Basic", "Y", "Y", "Advanced", "Advanced"] },
  { name: "Dashboards", values: ["Basic", "Y", "Y", "Advanced", "Advanced"] },
  { name: "OakAudix - Audit", values: ["-", "Core", "Y", "Y", "Y"] },
  { name: "OakComply - Compliance", values: ["-", "Core", "Y", "Y", "Y"] },
  { name: "OakHSE360 - HSE", values: ["-", "Optional", "Optional", "Y", "Y"] },
  { name: "OakRisk360 - Risk", values: ["-", "Optional", "Optional", "Y", "Y"] },
  { name: "OakStrategy - Strategy", values: ["-", "Optional", "Optional", "Y", "Y"] },
  { name: "Lumina BI", values: ["Basic", "Standard", "Standard", "Advanced", "Enterprise"] },
  { name: "Multi-site Operations", values: ["Limited", "Optional", "Y", "Y", "Y"] },
  { name: "Advanced Integrations", values: ["-", "Optional", "Optional", "Y", "Y"] },
  { name: "Enterprise Support", values: ["-", "-", "Optional", "Y", "Y"] },
  { name: "Managed Services", values: ["Optional", "Optional", "Optional", "Optional", "Y"] },
];

const FeatureCell = ({ val }) => {
  if (val === "Y") return <Check className="h-4 w-4 text-emerald-600 mx-auto" />;
  if (val === "-") return <Minus className="h-4 w-4 text-neutral-300 mx-auto" />;
  if (val === "Optional" || val === "Basic" || val === "Limited") return <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-semibold">{val}</span>;
  if (val === "Core" || val === "Standard") return <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">{val}</span>;
  return <span className="text-sky-700 bg-sky-50 px-2 py-0.5 rounded text-[11px] font-semibold">{val}</span>;
};

const AddonCard = ({ title, subtitle, items }) => (
  <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
    <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
    {subtitle && <p className="text-sm text-neutral-500 mt-2 mb-6 leading-relaxed">{subtitle}</p>}
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between items-start border-t border-neutral-100 pt-4 first:border-0 first:pt-0">
          <div>
            <div className="font-bold text-neutral-800">{item.name}</div>
            {item.desc && <div className="text-sm text-neutral-500 mt-1 leading-relaxed">{item.desc}</div>}
            <div className={`text-xs mt-2 font-medium px-2 py-0.5 inline-block rounded ${item.statusColor || 'text-emerald-700 bg-emerald-50'}`}>{item.status || 'Available'}</div>
          </div>
          <div className="text-right ml-6 shrink-0">
            <div className="font-bold text-neutral-900">{item.price}</div>
            <div className="text-xs text-neutral-500 mt-0.5">{item.period || 'per year'}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function OakEIPPricingPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
        <main>
          {/* Hero */}
          <section className="bg-white border-b border-neutral-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-50 via-white to-emerald-50 opacity-70 pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-6">
                Commercial Pricing
              </Badge>
              <h1 className="max-w-3xl mx-auto text-4xl font-extrabold tracking-tight md:text-5xl text-neutral-900">
                Transparent pricing for enterprise governance.
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-600 leading-relaxed">
                Flexible enterprise pricing designed around organisational complexity, capabilities,
                sites and transformation requirements.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to={CONTACT}>
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg border-0">
                    Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to={CONTACT}>
                  <Button size="lg" variant="outline" className="border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 shadow-sm">
                    Request a Demo
                  </Button>
                </Link>
              </div>
              <p className="mt-8 text-sm text-neutral-500 max-w-xl mx-auto">
                Prices exclude applicable taxes. Implementation, training and custom integration services are scoped separately.
              </p>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="py-20 border-b border-neutral-200 bg-neutral-50">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="grid gap-6 md:grid-cols-5">
                {pricingPlans.map((p, idx) => (
                  <div key={p.name} className={`flex flex-col bg-white border border-neutral-200 rounded-2xl p-8 text-left shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden ${idx === 1 ? 'ring-2 ring-emerald-500' : ''}`}>
                    {idx === 1 && (
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{p.name}</h3>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-3xl font-extrabold text-neutral-900">{p.price.split(' ')[0]}</span>
                      {p.price.includes('/') && <span className="text-lg font-medium text-neutral-500">/ year</span>}
                    </div>
                    <div className="mb-6">
                      <span className={`inline-flex items-center rounded text-[11px] font-bold px-2.5 py-0.5 ${p.statusColor}`}>
                        {p.status}
                      </span>
                    </div>
                    
                    <div className="text-sm font-semibold text-neutral-900 mb-2">{p.desc}</div>
                    <div className="text-sm text-neutral-600 mb-8 flex-1 leading-relaxed">{p.features}</div>
                    
                    <div className="text-xs text-neutral-500 mb-6 p-3 bg-neutral-50 rounded-lg whitespace-pre-line border border-neutral-100">{p.impl}</div>
                    <Link to={CONTACT} className="block w-full mt-auto">
                      <Button className={`w-full h-12 text-sm font-bold ${p.cta === 'Contact Sales' ? 'bg-sky-700 hover:bg-sky-800 text-white shadow-md' : 'bg-white border-2 border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'}`}>
                        {p.cta}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-10 bg-white border border-neutral-200 rounded-xl p-6 text-sm text-neutral-600 shadow-sm flex items-start gap-4">
                <div className="bg-sky-100 text-sky-700 p-2 rounded-lg shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div className="leading-relaxed">
                  Published prices are indicative annual SaaS subscription prices. Final pricing may vary based on organisational scope, selected capabilities, number of sites, implementation requirements, integrations, support level and applicable commercial terms. <strong className="text-neutral-900 font-semibold">Enterprise pricing is individually scoped.</strong>
                </div>
              </div>
            </div>
          </section>

          {/* Features Table */}
          <section className="py-20 border-b border-neutral-200 bg-white overflow-x-auto">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-900">Compare Capabilities</h2>
                <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">Detailed feature breakdown across all OakEIP tiers.</p>
              </div>
              <div className="min-w-[900px] bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200">
                      <th className="py-5 px-6 font-bold text-neutral-900 w-1/3">Capability</th>
                      <th className="py-5 px-4 font-bold text-neutral-900 text-center">Foundation</th>
                      <th className="py-5 px-4 font-bold text-neutral-900 text-center">Management</th>
                      <th className="py-5 px-4 font-bold text-neutral-900 text-center">Assurance</th>
                      <th className="py-5 px-4 font-bold text-neutral-900 text-center">Enterprise</th>
                      <th className="py-5 px-4 font-bold text-neutral-900 text-center">Enterprise Plus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {featureRows.map((row, i) => (
                      <tr key={i} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="py-4 px-6 font-semibold text-neutral-800">{row.name}</td>
                        {row.values.map((val, j) => (
                          <td key={j} className="py-4 px-4 text-center">
                            <FeatureCell val={val} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Additional Info Modules */}
          <section className="py-20 bg-neutral-50">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-900">Extend Your Platform</h2>
                <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">Customise your OakEIP deployment with specialised modules and services.</p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 mb-8">
                <AddonCard 
                  title="Additional modules" 
                  subtitle="Add specialist capability to a package where it is not already bundled."
                  items={[
                    { name: "OakAudix - Audit Management", desc: "Audit programmes, planning, execution, findings and audit packs.", price: "₦3m–₦5m" },
                    { name: "OakComply - Compliance Management", desc: "Legal register, obligations, applicability, evaluations and compliance CAPA.", price: "₦3m–₦5m" },
                    { name: "OakHSE360 - HSE Management", desc: "Incidents, investigations, permits, inspections, OHS and environment.", price: "₦4m–₦7.5m" },
                    { name: "OakRisk360 - Risk Management", desc: "Enterprise risk and opportunity across governed risk domains.", price: "₦3m–₦5m" },
                    { name: "OakStrategy - Strategy Management", desc: "Strategic themes, objectives, KPIs and execution governance.", price: "₦2.5m–₦4m" },
                    { name: "Lumina BI Advanced", desc: "Advanced business intelligence, analytics and executive reporting.", status: "Available with selected plans", statusColor: "text-sky-700 bg-sky-50", price: "₦3m–₦6m" }
                  ]}
                />
                <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm h-fit sticky top-24">
                  <div className="w-12 h-12 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">Additional sites</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">Additional sites available. Pricing depends on site complexity and scope.</p>
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 text-sm text-neutral-700 leading-relaxed">
                    Site pricing is configured commercially by site complexity - small, medium, complex and group/enterprise deployments are quoted individually.
                  </div>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 mb-8">
                <AddonCard 
                  title="Implementation" 
                  subtitle="Implementation and onboarding are separately scoped based on organisational complexity, modules, sites, configuration, data migration and training requirements."
                  items={[
                    { name: "Foundation implementation", desc: "Onboarding, configuration and enablement for Foundation.", price: "₦1.5m–₦2.5m", period: "one-off" },
                    { name: "Management implementation", desc: "Management-system configuration, migration and enablement.", price: "₦3m–₦5m", period: "one-off" },
                    { name: "Assurance implementation", desc: "Integrated management, audit and compliance implementation.", price: "₦5m–₦9m", period: "one-off" },
                    { name: "Enterprise implementation", desc: "Multi-site enterprise implementation and integration.", price: "₦10m–₦20m", period: "one-off" },
                    { name: "Enterprise Plus implementation", desc: "Strategic group deployment and transformation programme.", price: "₦20m–₦50m", period: "one-off" }
                  ]}
                />
                <AddonCard 
                  title="Support" 
                  subtitle="Standard support is included with every annual subscription."
                  items={[
                    { name: "Standard Support", desc: "Included with every annual subscription.", price: "Included", period: "" },
                    { name: "Premium Support", desc: "Priority response and extended coverage.", price: "10%–15%", period: "% of annual SaaS" },
                    { name: "Enterprise Support", desc: "Named success management and enhanced service levels.", price: "15%–25%", period: "% of annual SaaS" }
                  ]}
                />
              </div>

              <div className="grid gap-8 md:grid-cols-2 mb-8">
                <AddonCard 
                  title="Professional services" 
                  subtitle="Oak Global professional services are quoted independently of software subscription."
                  items={[
                    { name: "Transformation Assessment", desc: "Structured assessment of organisational and management-system maturity.", price: "Quote-based", period: "" },
                    { name: "Management-System Transformation", desc: "End-to-end management-system design and transformation delivery.", price: "Quote-based", period: "" },
                    { name: "ISO / QHSE Consulting", desc: "ISO and QHSE advisory and certification-readiness consulting.", price: "Quote-based", period: "" },
                    { name: "Compliance Consulting", desc: "Legal and regulatory compliance advisory.", price: "Quote-based", period: "" },
                    { name: "Risk Consulting", desc: "Enterprise and operational risk advisory.", price: "Quote-based", period: "" },
                    { name: "Audit Services", desc: "Independent internal and supplier audit delivery.", price: "Quote-based", period: "" },
                    { name: "Training", desc: "Role-based platform and management-system training.", price: "Quote-based", period: "" },
                    { name: "Platform Implementation", desc: "Configuration and deployment of the OakEIP platform.", price: "Quote-based", period: "" },
                    { name: "Data Migration", desc: "Legacy data extraction, cleansing and controlled migration.", price: "Quote-based", period: "" },
                    { name: "Integration", desc: "Integration with enterprise systems and data sources.", price: "Quote-based", period: "" },
                    { name: "Advisory Services", desc: "Ongoing governance and management advisory.", price: "Quote-based", period: "" },
                    { name: "Managed Services", desc: "Oak Global operated management-system and compliance services.", price: "Quote-based", period: "" }
                  ]}
                />
                <AddonCard 
                  title="Managed services" 
                  subtitle="Operated services are engaged on a monthly retainer basis and are not part of the SaaS subscription."
                  items={[
                    { name: "Managed Compliance", desc: "Oak Global operates your compliance monitoring and reporting.", price: "₦1m–₦3m", period: "per month" },
                    { name: "Managed QHSE / Management System", desc: "Operated management-system and QHSE service.", price: "₦1.5m–₦5m", period: "per month" },
                    { name: "Enterprise Governance Support", desc: "Enterprise governance, assurance and reporting support.", price: "₦3m–₦10m", period: "per month" }
                  ]}
                />
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">OakEIP Structured Pilot</h3>
                  <p className="text-neutral-600 mb-5 leading-relaxed max-w-3xl">OakEIP pilots are structured engagements designed around a defined business use case, scope, success criteria and implementation plan.</p>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-extrabold text-emerald-700">₦1.5m–₦3.5m</span>
                    <span className="text-sm font-medium text-neutral-500">per pilot</span>
                  </div>
                  <div className="text-sm text-neutral-500 mt-2 bg-neutral-50 p-3 rounded-lg border border-neutral-100 inline-block">Typical duration 8-12 weeks. Conversion credit may be configured for a specific commercial offer.</div>
                </div>
                <Link to={CONTACT} className="shrink-0 w-full md:w-auto">
                  <Button size="lg" className="bg-neutral-900 text-white hover:bg-neutral-800 w-full shadow-lg px-10">
                    Start a Pilot
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  );
}
