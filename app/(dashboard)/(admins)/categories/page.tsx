import db from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

import CategoriesData from "@/components/tables/categories/CategoriesData";
import { CategoriesColumnsProps } from "@/components/tables/categories/CategoriesColumns";

const CateogiresPage = async () => {
  const categories = await db.category.findMany();

  const formattedCategories: CategoriesColumnsProps[] = categories.map(category => ({
    id: category.id,
    name: category.name,
    description: category.description,
    createdAt: formatDateTime(category.createdAt),
    updatedAt: formatDateTime(category.updatedAt)
  }));

  return <CategoriesData data={formattedCategories} />;
}
export default CateogiresPage;