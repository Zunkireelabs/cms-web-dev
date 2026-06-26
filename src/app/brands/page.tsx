import { fetchBrands } from '@/lib/cms';
import { BrandsClient } from './BrandsClient';

export default async function BrandsPage() {
  const brands = await fetchBrands();
  return <BrandsClient brands={brands} />;
}
