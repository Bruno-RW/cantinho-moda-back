import { AiOutlinePlus } from "react-icons/ai";

import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Separator from "@/components/ui/Separator";

const UsersPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Users" subtitle="Manage users" />

        <Button className="px-3" href="/users/new">
          <AiOutlinePlus size={20} />
        </Button>
      </div>

      <Separator />
    </div>
  );
};
export default UsersPage;
