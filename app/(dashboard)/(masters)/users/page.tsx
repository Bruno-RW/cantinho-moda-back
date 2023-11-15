import { AiOutlinePlus } from "react-icons/ai";

import db from "@/lib/db";

import Button from "@/components/ui/custom/Button";
import Heading from "@/components/ui/custom/Heading";
import ApiList from "@/components/ui/custom/ApiList";
import Separator from "@/components/ui/custom/Separator";
// import DataTable from "@/components/ui/DataTable";

const UsersPage = async () => {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Users" description="Manage users" />

        <Button className="bg-border-shadow px-3" href="/users/new">
          <AiOutlinePlus size={20} />
        </Button>
      </div>

      <Separator />

      {/* <DataTable /> */}

      <Heading subtitle="API" description="API calls for users" />

      <Separator />

      <ApiList entityName="users" entityIdName="userId" /> 
    </>
  );
}
export default UsersPage;