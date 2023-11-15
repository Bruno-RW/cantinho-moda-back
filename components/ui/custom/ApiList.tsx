"use client";

import ApiAlert from "@/components/ui/custom/ApiAlert";
import { useOrigin } from "@/hooks/useOrigin";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList: React.FC<ApiListProps> = ({ entityIdName, entityName }) => {
  const origin = useOrigin();

  const baseUrl = `${origin}/api`;

  return (
    <>
      <ApiAlert title="GET"    variant="public" description={`${baseUrl}/${entityName}`} />
      <ApiAlert title="GET"    variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
      
      <ApiAlert title="POST"   variant="admin"  description={`${baseUrl}/${entityName}`} />
      <ApiAlert title="PATCH"  variant="admin"  description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
      <ApiAlert title="DELETE" variant="admin"  description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
    </>
  );
};
export default ApiList;