import RegisterForm from "./register-form";

export default function Register() {
  return (
    <div className="p-6 pb-12 sm:py-[40px] sm:px-[50px] lg:py-[60px] lg:px-[120px] xl:px-[300px]">
      <div className="w-full p-4 border rounded sm:p-6  backdrop-blur-sm xl:p-12 ">
        <h1 className="text-[16px] font-medium text-center mb-2 xl:text-[18px]">Đăng kí tài khoản</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
