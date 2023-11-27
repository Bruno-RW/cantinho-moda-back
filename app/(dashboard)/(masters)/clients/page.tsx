import db from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

import ClientsData from "@/components/tables/clients/ClientsData";
import { ClientsColumnsProps } from "@/components/tables/clients/ClientsColumns";

const ClientPage = async () => {
  const clients = await db.client.findMany();

  const formattedClient: ClientsColumnsProps[] = clients.map(client => ({
    id: client.id,
    name: client.name,
    email: client.email,
    createdAt: formatDateTime(client.createdAt),
    updatedAt: formatDateTime(client.updatedAt)
  }));

  return <ClientsData data={formattedClient} />;
}
export default ClientPage;