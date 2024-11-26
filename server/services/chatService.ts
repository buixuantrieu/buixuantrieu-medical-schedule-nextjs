import prisma from "@lib/prisma";

const onConnection = async (userId: string) => {
  await prisma.userConnection.update({
    where: {
      userId,
    },
    data: {
      status: true,
    },
  });
};
const offConnection = async (userId: string) => {
  await prisma.userConnection.update({
    where: {
      userId,
    },
    data: {
      status: false,
    },
  });
};

const createMessage = async (senderId: string, receiverId: string, messageText: string) => {
  await prisma.message.create({
    data: {
      senderId,
      messageText,
      receiverId,
    },
  });
};
const getMessageDetail = async (senderId: string, receiverId: string) => {
  const result = await prisma.message.findMany({
    where: {
      OR: [
        {
          senderId: receiverId,
          receiverId: senderId,
        },
        {
          senderId,
          receiverId,
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

export { onConnection, offConnection, createMessage, getMessageDetail };
