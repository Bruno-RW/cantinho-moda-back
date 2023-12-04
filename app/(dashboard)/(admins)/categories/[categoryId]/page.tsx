import db from "@/lib/db";

import CategoryForm from "@/components/forms/CategoryForm";

const EditCategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const category = await db.category.findUnique({ where: { id: Number(params.categoryId) } });

  return <CategoryForm initialData={category} />;
}
export default EditCategoryPage;