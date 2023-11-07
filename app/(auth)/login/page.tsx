import FormLogin from "@/components/forms/FormLogin";

const LoginPage = () => {
  return (
    <section className="bg-border absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 py-6 px-5 rounded-md">
        <h1 className="mb-5">Login</h1>
        <FormLogin />
    </section>
  );
};
export default LoginPage;