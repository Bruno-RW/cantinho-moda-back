import db from "@/lib/db";

import BrandForm from "@/components/forms/BrandForm";

const EditBrandPage = async ({ params }: { params: { brandId: string } }) => {
  const brand = await db.brand.findUnique({ where: { id: Number(params.brandId) } });

  return <BrandForm initialData={brand} />;
}
export default EditBrandPage;