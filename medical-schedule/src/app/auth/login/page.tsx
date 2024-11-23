import LoginForm from "./login-form";
export default function Login() {
  return (
    <div className="flex items-center justify-center p-6 pb-12 sm:py-[40px] lg:py-[60px]  ">
      <div className="w-max p-4 border rounded sm:p-6  backdrop-blur-sm xl:p-12 ">
        <h1 className="text-[16px] font-medium text-center mb-2 xl:text-[18px]">Đăng nhập</h1>
        <LoginForm />
      </div>
    </div>
  );
}
