import db from "@/lib/db";

import ClientForm from "@/components/forms/ClientForm";

const EditClientPage = async ({ params }: { params: { clientId: string } }) => {
  const client = await db.client.findUnique({ where: { id: Number(params.clientId) } });

  return <ClientForm initialData={client} />;
}
export default EditClientPage;