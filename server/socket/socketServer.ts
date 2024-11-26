import { createMessage, onConnection } from "@services/chatService";
import { Server } from "socket.io";

export function setupSocketServer(server: any): Server {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });
  const userSocket: { [userId: string]: string } = {};
  io.on("connection", (socket: any) => {
    socket.on("login", async (userId: string) => {
      userSocket[userId] = socket.id;
      await onConnection(userId);
    });
    socket.on("sendMessage", async (data: { senderId: string; receiverId: string; messageText: string }) => {
      await createMessage(data.senderId, data.receiverId, data.messageText);
      io.to(userSocket[data.receiverId]).emit("receiverMessage", {
        messageText: data.messageText,
      });
    });
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
}
