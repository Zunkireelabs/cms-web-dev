import { fetchSectors } from '@/lib/cms';
import { ServicesClient } from './ServicesClient';

export default async function ServicesPage() {
  const sectors = await fetchSectors();
  return <ServicesClient sectors={sectors} />;
}
