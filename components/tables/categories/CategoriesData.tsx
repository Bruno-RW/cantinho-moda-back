import { CategoriesColumnsProps, CategoriesColumns } from "./CategoriesColumns";

import DataTable from "@/components/tables/DataTable";
import ApiList from "@/components/ui/custom/ApiList";

interface CategoriesDataProps { data: CategoriesColumnsProps[] };

const CategoriesData: React.FC<CategoriesDataProps> = ({ data }) => {
  return (
    <>
      <DataTable entityName="categories" searchKey="name" columns={CategoriesColumns} data={data} />

      <ApiList entityName="categories" entityIdName="categoryId" type="admin" />
    </>
  );
}
export default CategoriesData;