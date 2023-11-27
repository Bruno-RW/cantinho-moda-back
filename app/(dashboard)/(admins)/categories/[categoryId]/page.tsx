import db from "@/lib/db";

import CategoryForm from "@/components/forms/CategoryForm";

const EditUserPage = async ({ params }: { params: { categoryId: string } }) => {
  const user = await db.user.findUnique({ where: { id: Number(params.categoryId) } });

  return <CategoryForm initialData={user} />;
}
export default EditUserPage;