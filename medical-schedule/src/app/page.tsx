import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="w-[400px] h-[300px] border">
        <Image src="/images/logo.png" alt="Logo" width={150} height={75} priority className="aspect-[2/1]" />
      </div>
      <div className="fixed bottom-1 right-1">
        <ModeToggle />
      </div>
      <div className="dark:text-red-400 text-blue-400">ok</div>
    </div>
  );
}
