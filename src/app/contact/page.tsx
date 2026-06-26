import { fetchSectors } from '@/lib/cms';
import { ContactClient } from './ContactClient';

export default async function ContactPage() {
  const sectors = await fetchSectors();
  return <ContactClient sectors={sectors} />;
}
