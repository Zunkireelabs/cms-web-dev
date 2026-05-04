import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
import { SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Explore our comprehensive range of construction, contracting, and trading services. From general contracting to MEP installations.',
};

export default function ServicesPage() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="section-heading">Our Services</h1>
          <p className="section-subheading mt-4">
            Comprehensive solutions for all your construction needs
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {SERVICES.map((service) => (
            <div
              key={service.slug}
              id={service.slug}
              className="rounded-2xl border border-neutral-border bg-white p-8 shadow-card"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <service.icon className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-neutral-charcoal">
                {service.name}
              </h2>
              <p className="mt-3 text-neutral-600">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
      <ContactCTA />
    </section>
  );
}
