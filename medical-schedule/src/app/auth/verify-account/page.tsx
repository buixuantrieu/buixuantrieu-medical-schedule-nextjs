import VerifyForm from "./verify-form";


export default function InputOTPForm() {
  return (
    <div className="flex absolute justify-center items-center flex-col w-full h-[100%] gap-7">
      <p className="w-[400px] text-center text-[14px]">
        Mã OTP đã được gửi đến email của bạn, vui lòng nhập mã OTP để xác thực tài khoản!
      </p>
      <VerifyForm />
    </div>
  );
}
