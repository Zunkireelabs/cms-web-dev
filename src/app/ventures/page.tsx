import { fetchVentures, fetchBrands } from '@/lib/cms';
import { VenturesClient } from './VenturesClient';

export default async function VenturesPage() {
  const [ventures, brands] = await Promise.all([fetchVentures(), fetchBrands()]);
  return <VenturesClient ventures={ventures} brands={brands} />;
}
