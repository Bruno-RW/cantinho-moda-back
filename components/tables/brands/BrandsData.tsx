import { BrandsColumnsProps, BrandsColumns } from "./BrandsColumns";

import DataTable from "@/components/tables/DataTable";
import ApiList from "@/components/ui/custom/ApiList";

interface BrandsDataProps { data: BrandsColumnsProps[] };

const BrandsData: React.FC<BrandsDataProps> = ({ data }) => {
  return (
    <>
      <DataTable entityName="brands" searchKey="name" columns={BrandsColumns} data={data} />

      <ApiList entityName="brands" entityIdName="brandId" type="admin" />
    </>
  );
}
export default BrandsData;