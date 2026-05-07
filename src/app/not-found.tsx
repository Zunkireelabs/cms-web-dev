import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <p className="font-display text-7xl font-bold text-accent">404</p>
          <h1 className="mt-4 text-2xl font-bold text-neutral-charcoal">
            Page Not Found
          </h1>
          <p className="mt-2 text-neutral-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <Link href="/" className="btn-primary mt-8 inline-flex">
            Go Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
