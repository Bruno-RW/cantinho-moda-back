const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex relative flex-col w-full h-screen">
        {children}
    </div>
  );
}
export default AuthLayout;