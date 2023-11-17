import db from "@/lib/db";

import UsersData from "@/components/tables/users/UsersData";

const UsersPage = async () => {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <UsersData data={users} />;
}
export default UsersPage;