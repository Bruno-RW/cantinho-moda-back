import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // const { userId } = auth();

  // if (!userId) redirect("/login");

  return (
    <>
      <Navbar />
      <main className="flex flex-col w-full gap-y-3 my-2 mx-3">
        <Header />
        <section className="mx-5">{children}</section>
      </main>
    </>
  );
};
export default DashboardLayout;