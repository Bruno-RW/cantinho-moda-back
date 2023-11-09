import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col w-full gap-y-3 my-2 mx-3">
        <Header />
        <section className="flex flex-col gap-y-3 mx-5">{children}</section>
      </main>
    </>
  );
};
export default DashboardLayout;