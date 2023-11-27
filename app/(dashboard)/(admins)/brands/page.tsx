import db from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

import BrandsData from "@/components/tables/brands/BrandsData";
import { BrandsColumnsProps } from "@/components/tables/brands/BrandsColumns";

const BrandsPage = async () => {
  const brands = await db.brand.findMany();

  const formattedBrands: BrandsColumnsProps[] = brands.map(brand => ({
    id: brand.id,
    name: brand.name,
    description: brand.manufacturer,
    createdAt: formatDateTime(brand.createdAt),
    updatedAt: formatDateTime(brand.updatedAt)
  }));

  return <BrandsData data={formattedBrands} />;
}
export default BrandsPage;