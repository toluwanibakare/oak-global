-- OakEIP Platform Products & Content Schema
-- Run this in Supabase SQL Editor to add product/content tables and seed data

-- ============================================
-- Products/Modules Table (replaces hardcoded arrays)
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  tagline VARCHAR(255),
  description TEXT,
  icon VARCHAR(50),
  color_theme VARCHAR(50),
  image_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_flagship BOOLEAN DEFAULT false,
  platform_category VARCHAR(50) DEFAULT 'core',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Product Features
-- ============================================
CREATE TABLE IF NOT EXISTS product_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  feature_text TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Product Benefits
-- ============================================
CREATE TABLE IF NOT EXISTS product_benefits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  benefit_text TEXT NOT NULL,
  metric_value VARCHAR(50),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Product Detail Sections (BUILD/RUN/IMPROVE, frameworks, differentiators)
-- ============================================
CREATE TABLE IF NOT EXISTS product_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  subtitle VARCHAR(255) NOT NULL,
  detail_text TEXT NOT NULL,
  detail_type VARCHAR(50),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Platform Differentiators (Why OakEIP section)
-- ============================================
CREATE TABLE IF NOT EXISTS platform_differentiators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Industries Served
-- ============================================
CREATE TABLE IF NOT EXISTS industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Commercial Engagement Models
-- ============================================
CREATE TABLE IF NOT EXISTS engagement_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  details JSONB,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Indexes for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(platform_category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_product_features_product ON product_features(product_id);
CREATE INDEX IF NOT EXISTS idx_product_benefits_product ON product_benefits(product_id);
CREATE INDEX IF NOT EXISTS idx_product_details_product ON product_details(product_id);

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_differentiators ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement_models ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read product_features" ON product_features FOR SELECT USING (true);
CREATE POLICY "Public read product_benefits" ON product_benefits FOR SELECT USING (true);
CREATE POLICY "Public read product_details" ON product_details FOR SELECT USING (true);
CREATE POLICY "Public read platform_differentiators" ON platform_differentiators FOR SELECT USING (is_active = true);
CREATE POLICY "Public read industries" ON industries FOR SELECT USING (is_active = true);
CREATE POLICY "Public read engagement_models" ON engagement_models FOR SELECT USING (is_active = true);

-- Admin write policies (using service role)
CREATE POLICY "Service role write products" ON products FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role write product_features" ON product_features FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role write product_benefits" ON product_benefits FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role write product_details" ON product_details FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role write platform_differentiators" ON platform_differentiators FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role write industries" ON industries FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role write engagement_models" ON engagement_models FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- Trigger for updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Seed Data: Products (7 modules from update.txt)
-- ============================================
INSERT INTO products (slug, name, tagline, description, icon, color_theme, image_url, sort_order, is_flagship, platform_category) VALUES
('oakforge', 'OakForge', 'Management System Establishment & Operations', 'Build, configure, operate and improve management systems through the complete BUILD → RUN → IMPROVE lifecycle.', 'fa-hammer', 'from-emerald-700 to-emerald-900', 'https://images.pexels.com/photos/3182766/pexels-photo-3182766.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 1, true, 'core'),
('oakaudix', 'OakAudix', 'Audit Management', 'Plan, execute, evidence and manage audits and audit-related improvement activities.', 'fa-clipboard-check', 'from-emerald-600 to-teal-700', 'https://images.pexels.com/photos/3861077/pexels-photo-3861077.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 2, false, 'core'),
('oakcomply', 'OakComply', 'Compliance Management', 'Connect compliance obligations with organisational responsibilities, controls, evidence and follow-up.', 'fa-shield-halved', 'from-blue-600 to-indigo-700', 'https://images.pexels.com/photos/7433857/pexels-photo-7433857.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 3, false, 'core'),
('oakhse360', 'OakHSE360', 'Health, Safety & Environment', 'Support structured HSE management, operational controls, inspections, observations and improvement.', 'fa-leaf', 'from-emerald-600 to-green-700', 'https://images.pexels.com/photos/37510660/pexels-photo-37510660.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 4, false, 'core'),
('oakrisk', 'OakRisk', 'Risk Management', 'Provide a governed environment for identifying, assessing, managing and monitoring organisational risks.', 'fa-triangle-exclamation', 'from-red-800 to-rose-950', 'https://images.pexels.com/photos/8636589/pexels-photo-8636589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 5, false, 'core'),
('oakstrategy', 'OakStrategy', 'Strategy & Performance', 'Connect strategic direction with objectives, measures and organisational execution.', 'fa-chess-king', 'from-purple-700 to-indigo-800', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 6, false, 'strategy'),
('luminabi', 'Lumina BI', 'Business Intelligence', 'Provide management insight from governed enterprise information.', 'fa-chart-line', 'from-sky-600 to-blue-700', 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 7, false, 'intelligence')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color_theme = EXCLUDED.color_theme,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_flagship = EXCLUDED.is_flagship,
  platform_category = EXCLUDED.platform_category;

-- ============================================
-- Seed Data: Product Features
-- ============================================
INSERT INTO product_features (product_id, feature_text, sort_order)
SELECT id, 'Governed establishment architecture (F1–F6 lifecycle)', 1 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'RUN journey: Requirement → Applicability → Process → Control → Activity → Occurrence → Evidence → Review → Acceptance → Effectiveness → Trace', 2 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Multi-subsidiary: One canonical model + multiple governed contexts', 3 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'IMPROVE cycle: BUILD → RUN → LEARN → IMPROVE → BUILD/RUN AGAIN', 4 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Evidence lifecycle: Expected → Submitted → Under Review → Accepted', 5 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Human effectiveness evaluation (Not Evaluated / Effective / Partially Effective / Ineffective / Unable to Determine)', 6 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Knowledge-driven, process-based audits', 1 FROM products WHERE slug = 'oakaudix'
UNION ALL SELECT id, 'Automated finding tracking & CAPA tasks', 2 FROM products WHERE slug = 'oakaudix'
UNION ALL SELECT id, 'Curated clause-level audit questionnaires', 3 FROM products WHERE slug = 'oakaudix'
UNION ALL SELECT id, 'Evidence collection & validation repositories', 4 FROM products WHERE slug = 'oakaudix'
UNION ALL SELECT id, 'Comprehensive audit package seals & hashes', 5 FROM products WHERE slug = 'oakaudix'
UNION ALL SELECT id, 'Assurance dashboards & review boards', 6 FROM products WHERE slug = 'oakaudix'
UNION ALL SELECT id, 'Regulatory obligations register', 1 FROM products WHERE slug = 'oakcomply'
UNION ALL SELECT id, 'Gap identification & remediation plans', 2 FROM products WHERE slug = 'oakcomply'
UNION ALL SELECT id, 'Recurring compliance calendars & alerts', 3 FROM products WHERE slug = 'oakcomply'
UNION ALL SELECT id, 'Continuous regulatory change feeds', 4 FROM products WHERE slug = 'oakcomply'
UNION ALL SELECT id, 'Controlled document policy linkups', 5 FROM products WHERE slug = 'oakcomply'
UNION ALL SELECT id, 'Conformance evidence registers', 6 FROM products WHERE slug = 'oakcomply'
UNION ALL SELECT id, 'Incident & near-miss reporting', 1 FROM products WHERE slug = 'oakhse360'
UNION ALL SELECT id, 'Hazard logging & control assessments', 2 FROM products WHERE slug = 'oakhse360'
UNION ALL SELECT id, 'Site safety permits to work', 3 FROM products WHERE slug = 'oakhse360'
UNION ALL SELECT id, 'Environmental KPI & emissions logs', 4 FROM products WHERE slug = 'oakhse360'
UNION ALL SELECT id, 'Safety inspections & site audits', 5 FROM products WHERE slug = 'oakhse360'
UNION ALL SELECT id, 'Contractor safety verification portals', 6 FROM products WHERE slug = 'oakhse360'
UNION ALL SELECT id, 'Seven risk domains analysis', 1 FROM products WHERE slug = 'oakrisk'
UNION ALL SELECT id, 'Scenario intelligence engine', 2 FROM products WHERE slug = 'oakrisk'
UNION ALL SELECT id, 'Resilience scoring metrics', 3 FROM products WHERE slug = 'oakrisk'
UNION ALL SELECT id, 'Risk simulator & forecaster', 4 FROM products WHERE slug = 'oakrisk'
UNION ALL SELECT id, 'Appetite & threshold alerts', 5 FROM products WHERE slug = 'oakrisk'
UNION ALL SELECT id, 'Combined assurance dashboard', 6 FROM products WHERE slug = 'oakrisk'
UNION ALL SELECT id, 'Strategic objective planning & alignment', 1 FROM products WHERE slug = 'oakstrategy'
UNION ALL SELECT id, 'Objective & key results (OKR) framework', 2 FROM products WHERE slug = 'oakstrategy'
UNION ALL SELECT id, 'Performance measurement & dashboards', 3 FROM products WHERE slug = 'oakstrategy'
UNION ALL SELECT id, 'Strategy-to-execution traceability', 4 FROM products WHERE slug = 'oakstrategy'
UNION ALL SELECT id, 'Governed management insight & reporting', 1 FROM products WHERE slug = 'luminabi'
UNION ALL SELECT id, 'Cross-module analytics & correlation', 2 FROM products WHERE slug = 'luminabi'
UNION ALL SELECT id, 'Executive dashboards & board packs', 3 FROM products WHERE slug = 'luminabi'
UNION ALL SELECT id, 'Evidence-based decision support', 4 FROM products WHERE slug = 'luminabi';

-- ============================================
-- Seed Data: Product Benefits
-- ============================================
INSERT INTO product_benefits (product_id, benefit_text, metric_value, sort_order)
SELECT id, 'Faster ISO implementation', '60% faster', 1 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Pre-configured blueprints', NULL, 2 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Continuous program alignment', NULL, 3 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Executive dashboard visibility', NULL, 4 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Less audit preparation effort', '45% less', 1 FROM products WHERE slug = 'oakaudix'
UNION ALL SELECT id, 'Consolidated evidence and CAPA spine', NULL, 2 FROM products WHERE slug = 'oakaudix'
UNION ALL SELECT id, 'Eliminates audit process variance', NULL, 3 FROM products WHERE slug = 'oakaudix'
UNION ALL SELECT id, 'Automated regulatory reporting', NULL, 4 FROM products WHERE slug = 'oakaudix'
UNION ALL SELECT id, 'Zero compliance blind spots', NULL, 1 FROM products WHERE slug = 'oakcomply'
UNION ALL SELECT id, 'Drastically reduced regulatory penalties', NULL, 2 FROM products WHERE slug = 'oakcomply'
UNION ALL SELECT id, 'Instant evidence of conformance', NULL, 3 FROM products WHERE slug = 'oakcomply'
UNION ALL SELECT id, 'Direct linkage to company policies', NULL, 4 FROM products WHERE slug = 'oakcomply'
UNION ALL SELECT id, 'Minimized workplace incidents', NULL, 1 FROM products WHERE slug = 'oakhse360'
UNION ALL SELECT id, 'Full environmental standard compliance', NULL, 2 FROM products WHERE slug = 'oakhse360'
UNION ALL SELECT id, 'Better contractor risk visibility', NULL, 3 FROM products WHERE slug = 'oakhse360'
UNION ALL SELECT id, 'Improved internal safety culture', NULL, 4 FROM products WHERE slug = 'oakhse360'
UNION ALL SELECT id, 'Proactive threat mitigation', NULL, 1 FROM products WHERE slug = 'oakrisk'
UNION ALL SELECT id, 'Accurate resilience scoring', NULL, 2 FROM products WHERE slug = 'oakrisk'
UNION ALL SELECT id, 'Grounded decision support', NULL, 3 FROM products WHERE slug = 'oakrisk'
UNION ALL SELECT id, 'Simulate worst-case scenarios', NULL, 4 FROM products WHERE slug = 'oakrisk'
UNION ALL SELECT id, 'Strategy-execution alignment', NULL, 1 FROM products WHERE slug = 'oakstrategy'
UNION ALL SELECT id, 'Measurable organizational performance', NULL, 2 FROM products WHERE slug = 'oakstrategy'
UNION ALL SELECT id, 'Governed decision-making', NULL, 3 FROM products WHERE slug = 'oakstrategy'
UNION ALL SELECT id, 'Management insight from governed data', NULL, 1 FROM products WHERE slug = 'luminabi'
UNION ALL SELECT id, 'Cross-domain correlation', NULL, 2 FROM products WHERE slug = 'luminabi'
UNION ALL SELECT id, 'Executive-ready reporting', NULL, 3 FROM products WHERE slug = 'luminabi'
UNION ALL SELECT id, 'Evidence-based decisions', NULL, 4 FROM products WHERE slug = 'luminabi';

-- ============================================
-- Seed Data: Product Details (BUILD/RUN/IMPROVE, frameworks, differentiators)
-- ============================================
INSERT INTO product_details (product_id, subtitle, detail_text, detail_type, sort_order)
SELECT id, 'BUILD — Establish the Management System', 'OakForge''s governed establishment architecture provides a structured path through: F1 — Foundation & Scope, F2 — Gap Assessment, F3 — Control Design, F4 — Documented Information, F5 — Readiness & Certification, F6 — Handover & Closure. The objective is not simply to produce documents. It is to establish a structured management-system foundation that can subsequently operate within the organisation.', 'lifecycle', 1 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'RUN — See How the Management System Operates', 'The RUN journey connects: Requirement → Applicability → Process → Control → Activity → Occurrence → Evidence → Review → Acceptance → Effectiveness → Trace. This allows management to move beyond "Do we have the required procedure?" and ask "How is this requirement actually operating in our organisation?"', 'lifecycle', 2 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Multi-Subsidiary Organisations', 'One enterprise model. Multiple governed operating contexts. Instead of creating separate copies of the same management-system structure for every subsidiary, OakForge uses: One canonical enterprise model + multiple governed applicability and operating contexts. Each context can subsequently have its own operational occurrences, evidence, acceptance and effectiveness evaluation.', 'framework', 3 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'IMPROVE — Turn Operational Learning into Better Management Systems', 'A genuine operational weakness may lead to an improvement decision. That improvement may reveal the need to: change an activity; strengthen a control; improve a process; revise documented information; or return to BUILD to reconfigure the management system. This creates a controlled cycle: BUILD → RUN → LEARN → IMPROVE → BUILD / RUN AGAIN.', 'lifecycle', 4 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Evidence You Can Trust', 'OakForge treats evidence as a governed lifecycle rather than simply an uploaded attachment: Expected (What is expected to happen?) → Submitted (What evidence has been submitted?) → Under Review (Has the evidence been examined?) → Accepted (Has it been formally accepted?). This distinction prevents a common management-system weakness: Uploaded ≠ Reviewed ≠ Accepted ≠ Effective.', 'differentiator', 5 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Human Effectiveness Evaluation', 'OakForge does not pretend that effectiveness can always be determined automatically. Effectiveness remains a governed human conclusion: Not Evaluated, Effective, Partially Effective, Ineffective, Unable to Determine. The evaluator records the relevant criteria, basis, rationale, date, conclusion, provenance, history.', 'differentiator', 6 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Trace — Follow the Complete Story', 'OakForge provides a read-only Trace journey from: Requirement → Applicability → Process → Control → Activity → Occurrence → Evidence → Review → Acceptance → Effectiveness. Trace helps management, assurance teams and process owners understand not just what exists, but how the management-system story connects.', 'differentiator', 7 FROM products WHERE slug = 'oakforge'
UNION ALL SELECT id, 'Audit Assurance Flow', 'Fully tracks programs, plans, scopes, checklists, executions, findings, and reviews. Feeds findings directly into corrective action workflows.', 'framework', 1 FROM products WHERE slug = 'oakaudix'
UNION ALL SELECT id, 'Knowledge Studio Curator', 'Reuses curated checklist standards, previous evidence structures, and criteria benchmarks directly during live audits.', 'framework', 2 FROM products WHERE slug = 'oakaudix'
UNION ALL SELECT id, 'Obligation Registry', 'Tracks all regional, national, and international standards relevant to your tenancy. Ensures every clause has an accountable owner.', 'framework', 1 FROM products WHERE slug = 'oakcomply'
UNION ALL SELECT id, 'Compliance Calendars', 'Establishes scheduled checks and regulatory alerts to prevent overdue actions and minimize compliance exposures.', 'framework', 2 FROM products WHERE slug = 'oakcomply'
UNION ALL SELECT id, 'OHS & Incident Workflows', 'Guides investigators from the initial incident report through root-cause analysis up to implementing verified controls.', 'framework', 1 FROM products WHERE slug = 'oakhse360'
UNION ALL SELECT id, 'Contractor Management', 'Extends safety policies and compliance checklists to external contractors to prevent operational loopholes.', 'framework', 2 FROM products WHERE slug = 'oakhse360'
UNION ALL SELECT id, 'Decision Simulator', 'Enables risk officers to model hypothetical market disruptions or operational events to test company thresholds before committing capital.', 'framework', 1 FROM products WHERE slug = 'oakrisk'
UNION ALL SELECT id, 'Resilience Indexing', 'Calculates live company-wide governance strength and risk maturity based on verified audit records and control checks.', 'framework', 2 FROM products WHERE slug = 'oakrisk';

-- ============================================
-- Seed Data: Platform Differentiators
-- ============================================
INSERT INTO platform_differentiators (title, description, icon, sort_order) VALUES
('Connected Rather Than Fragmented', 'Bring related organisational information into a common governed architecture.', 'fa-puzzle-piece', 1),
('Operational Rather Than Document-Centric', 'Move from "we have a procedure" to "we can demonstrate how the process operates."', 'fa-cogs', 2),
('Governance by Design', 'Tenant isolation, controlled authority, evidence governance, auditability and segregation-of-duties principles are embedded in the platform architecture.', 'fa-shield-alt', 3),
('Multi-Entity Ready', 'One canonical model can serve multiple governed organisational contexts.', 'fa-sitemap', 4),
('Human Judgement Preserved', 'The platform supports management decisions without pretending that every governance decision can or should be automated.', 'fa-user-tie', 5),
('Modular and Extensible', 'OakEIP can grow as an organisation''s digital management requirements mature.', 'fa-cube', 6);

-- ============================================
-- Seed Data: Industries Served (expanded from update.txt)
-- ============================================
INSERT INTO industries (name, description, icon, sort_order) VALUES
('Oil & Gas', 'Risk management, compliance, HSE for energy sector operations.', 'fa-droplet', 1),
('Energy', 'Operational excellence, regulatory compliance, and asset integrity.', 'fa-bolt', 2),
('Manufacturing', 'Operational excellence, ISO standards, and quality management.', 'fa-industry', 3),
('Engineering', 'Project governance, risk management, and compliance frameworks.', 'fa-cogs', 4),
('Logistics', 'Supply chain risk, compliance, and operational safety.', 'fa-truck', 5),
('Construction', 'Site safety, regulatory compliance, and quality assurance.', 'fa-hard-hat', 6),
('Professional Services', 'Governance, risk, and compliance for knowledge-based organisations.', 'fa-briefcase', 7),
('Government & Public Sector', 'Public sector governance, transparency frameworks, and audit readiness.', 'fa-landmark', 8);

-- ============================================
-- Seed Data: Commercial Engagement Models
-- ============================================
INSERT INTO engagement_models (name, description, details, sort_order) VALUES
('Controlled Pilot', 'Experience OakEIP using a defined organisational scope and real management-system activities before expanding to a broader enterprise deployment.', '{"scope": "1 organisation → selected management-system scope → 2–4 representative processes → real operational activities → evidence → effectiveness → management insight", "duration": "8–12 weeks", "outcome": "Validated operating model ready for scale"}', 1),
('Flexible Enterprise Pricing', 'OakEIP pricing is structured according to organisational complexity, number of legal entities, operating contexts, selected products, implementation scope, and support requirements.', '{"factors": ["organisational complexity", "number of legal entities", "operating contexts", "selected products", "implementation scope", "support requirements"], "model": "Tailored proposal after pilot"}', 2);

-- ============================================
-- Grant permissions for anon/public access
-- ============================================
GRANT SELECT ON products TO anon;
GRANT SELECT ON product_features TO anon;
GRANT SELECT ON product_benefits TO anon;
GRANT SELECT ON product_details TO anon;
GRANT SELECT ON platform_differentiators TO anon;
GRANT SELECT ON industries TO anon;
GRANT SELECT ON engagement_models TO anon;