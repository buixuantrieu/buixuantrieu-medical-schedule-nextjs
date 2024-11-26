import { useGetMessageDetail } from "@/api/chat/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Socket } from "socket.io-client";

export default function BoxChat({ socket, userId, isShow }: { socket: Socket; userId: string; isShow: boolean }) {
  const [messageText, setMessageText] = useState("");
  const [isShowBoxChat, setIsShowBoxChat] = useState(false);

  const { data: messageList } = useGetMessageDetail(userId, "1194c7c9-6525-4b7d-90a3-2402a05dacc6");

  useEffect(() => {
    socket.on("receiverMessage", (data) => {
      setIsShowBoxChat(true);
      console.log(data);
    });
  }, []);
  const handleSendMessage = () => {
    socket.emit("sendMessage", { senderId: userId, messageText, receiverId: "1194c7c9-6525-4b7d-90a3-2402a05dacc6" });
  };
  useEffect(() => {
    setIsShowBoxChat(isShow);
  }, [isShow]);
  console.log(messageList);

  const renderMessage = useMemo(
    () =>
      messageList?.data.map((item: any, index: number) => {
        return (
          <Fragment key={`message-${item.id}`}>
            {item.senderId == userId ? (
              <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">
                {item.messageText}
              </div>
            ) : (
              <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
                {item.messageText}
              </div>
            )}
          </Fragment>
        );
      }),
    [messageList]
  );
  return (
    <Card className={`${!isShowBoxChat && "hidden"} w-[350px]`}>
      <CardHeader className="border-b">
        <div className="flex items-center">
          <div className="flex flex-1 items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-[50%]">
              <AvatarImage src="" alt="" />
              <AvatarFallback className="rounded-lg">HL</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Bùi Xuân Triều</span>
            </div>
          </div>
          <div className="w-max flex gap-1 items-center">
            <div className="w-2 h-2 rounded-[50%] bg-green-600"></div>
            <div className="text-[10px]">Đang hoạt động</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] flex flex-col gap-2 mt-2">{renderMessage}</div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 justify-between w-full">
          <Input className="flex-1" onChange={(e) => setMessageText(e.target.value)} />
          <Button onClick={handleSendMessage} disabled={!messageText} className="w-max">
            <Send />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
