import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Hero, ImpactMetrics, ProjectMap } from '@/components/sections';
import {
  Package,
  Hammer,
  Home,
  Building,
  Layers,
  DoorOpen,
  PaintBucket,
  Lock,
  Fence,
  Droplets,
  Trash2,
  Bath,
  Armchair,
  Building2,
  ClipboardCheck,
  Leaf,
} from 'lucide-react';

const TRADING_DOMAINS = [
  { title: 'Roofing Systems', brand: 'IKO', icon: Home },
  { title: 'Facade Solutions', brand: 'Hunter Douglas', icon: Building },
  { title: 'Ceiling Systems', brand: 'Armstrong', icon: Layers },
  { title: 'Aluminum Doors and Windows', brand: 'Tostem', icon: DoorOpen },
  { title: 'Wood, Glass, and Metal Coating', brand: 'ICA', icon: PaintBucket },
  { title: 'Door Hardware and Accessories', brand: 'Dormakaba', icon: Lock },
  { title: 'Architectural Railings', brand: 'Zolon', icon: Fence },
  { title: 'Waterproofing Systems', brand: 'Schomburg', icon: Droplets },
  { title: 'Wastewater Management Solutions', brand: 'Sintex', icon: Trash2 },
  { title: 'Sanitaryware and Bathroom Solutions', brand: 'American Standard, Grohe', icon: Bath },
  { title: 'Office Furnitures and Flooring', brand: 'SOS, AGT', icon: Armchair },
];

const CONTRACTING_SERVICES = [
  { title: 'Interior Contracting & Full-Service Solutions', icon: Building2 },
  { title: 'High-Quality Execution & Project Management', icon: ClipboardCheck },
  { title: 'Renovation, Technology & Sustainable Practices', icon: Leaf },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Products & Services Section */}
      <section className="py-20 lg:py-28 bg-neutral-off-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="section-heading">Products & Services</h2>
            <p className="section-subheading mt-4">
              Comprehensive trading and contracting solutions for every project
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Trading Card */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="bg-gradient-to-r from-brand-600 to-brand-700 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Trading</h3>
                    <p className="text-brand-100 text-sm">Premium construction materials</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {TRADING_DOMAINS.map((domain, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                      <domain.icon className="h-4 w-4 text-brand-600 flex-shrink-0" />
                      <span className="text-neutral-700">{domain.title}</span>
                      <span className="text-neutral-400">:</span>
                      <span className="text-neutral-500">{domain.brand}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/products-services/trading"
                  className="mt-6 inline-flex items-center justify-center w-full px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
                >
                  Explore Trading
                </Link>
              </div>
            </div>

            {/* Contracting Card */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="bg-gradient-to-r from-neutral-700 to-neutral-800 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Hammer className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Contracting</h3>
                    <p className="text-neutral-300 text-sm">Full-service solutions</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {CONTRACTING_SERVICES.map((service, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <service.icon className="h-4 w-4 text-brand-600" />
                      </div>
                      <span className="text-neutral-700 font-medium">{service.title}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/products-services/contracting"
                  className="mt-6 inline-flex items-center justify-center w-full px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Explore Contracting
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/products-services" className="btn-secondary">
              View All Products & Services
            </Link>
          </div>
        </Container>
      </section>

      {/* Impact Metrics Section */}
      <ImpactMetrics />

      {/* Project Overview Section */}
      <section className="py-20 lg:py-28 bg-neutral-off-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="section-heading">Project Overview</h2>
            <p className="section-subheading mt-4">
              Our projects across Nepal - highlighting locations and impact
            </p>
          </div>

          <ProjectMap />

          <div className="mt-12 text-center">
            <Link href="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-600 py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-lg text-brand-100">
              Contact us today for a free consultation and quote.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-medium text-brand-600 transition-colors hover:bg-brand-50"
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
