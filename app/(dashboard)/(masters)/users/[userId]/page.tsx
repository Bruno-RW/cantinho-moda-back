import db from "@/lib/db";

import NewUserForm from "@/components/forms/UserForm";

const EditUserPage = async ({ params }: { params: { userId: string } }) => {
  const user = await db.user.findUnique({ where: { id: Number(params.userId) } });

  return <NewUserForm initialData={user} />;
};
export default EditUserPage;