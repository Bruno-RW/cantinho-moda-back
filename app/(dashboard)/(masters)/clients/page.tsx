import db from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

import ClientData from "@/components/tables/client/ClientData";
import { ClientColumnsProps } from "@/components/tables/client/ClientColumns";

const ClientPage = async () => {
  const client = await db.client.findMany();

  const formattedClient: ClientColumnsProps[] = client.map(client => ({
    id: client.id,
    name: client.name,
    email: client.email,
    createdAt: formatDateTime(client.createdAt),
    updatedAt: formatDateTime(client.updatedAt)
  }));

  return <ClientData data={formattedClient} />;
}
export default ClientPage;