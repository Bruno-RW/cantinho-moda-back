import { AiOutlinePlus } from "react-icons/ai";

import db from "@/lib/db";

import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Separator from "@/components/ui/Separator";

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

      {/* <DataTable searchKey="fullName" columns={UserColumn} data={data} /> */}

      <Heading subtitle="API" description="API calls for users" />

      <Separator />

      {/* <ApiList entityName="users" entityIdName="userId" />  */}
    </>
  );
};
export default UsersPage;
