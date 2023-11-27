import { ClientsColumnsProps, ClientsColumns } from "./ClientsColumns";

import DataTable from "@/components/tables/DataTable";
import ApiList from "@/components/ui/custom/ApiList";

interface ClientsDataProps { data: ClientsColumnsProps[] };

const ClientsData: React.FC<ClientsDataProps> = ({ data }) => {
  return (
    <>
      <DataTable entityName="clients" searchKey="name" columns={ClientsColumns} data={data} />

      <ApiList entityName="clients" entityIdName="clientId" type="master" />
    </>
  );
}
export default ClientsData;