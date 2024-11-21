import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

function Notfound() {
  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center">
      <h1 className="font-bold text-[32px]">404</h1>
      <Image
        src="/images/error.gif"
        width={300}
        height={200}
        alt="notFound"
        priority
        className="w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] h-auto"
      />
      <p className="text-[13px] sm:text-[16px]">Xin lỗi, trang bạn đang tìm không tồn tại.</p>
      <Button className="mt-4">
        <Link href={ROUTES.USER.HOME}>Quay lại trang chủ</Link>
      </Button>
    </div>
  );
}
export default Notfound;
