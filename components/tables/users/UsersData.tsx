import { UsersColumnProps, UsersColumn } from "./UsersColumn";

import DataTable from "@/components/ui/custom/DataTable";
import ApiList from "@/components/ui/custom/ApiList";

interface UsersDataProps { data: UsersColumnProps[] };

const UsersData: React.FC<UsersDataProps> = ({ data }) => {

  return (
    <>
      <DataTable entityName="users" searchKey="name" columns={UsersColumn} data={data} />

      <ApiList entityName="users" entityIdName="userId" />
    </>
  );
};
export default UsersData;