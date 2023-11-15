const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex relative flex-col w-full h-screen">
        {children}
    </section>
  );
}
export default AuthLayout;