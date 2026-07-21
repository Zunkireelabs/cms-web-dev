import { fetchBrands, fetchProductDomains } from '@/lib/cms';
import { BrandsClient } from './BrandsClient';

export default async function BrandsPage() {
  const [brands, domains] = await Promise.all([fetchBrands(), fetchProductDomains()]);
  return <BrandsClient brands={brands} domains={domains} />;
}
