import { Server } from "socket.io";

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    },
  });

  const roomParticipants = new Map();

  io.on("connection", (socket) => {
    socket.on("join_auction", ({ auctionId, userId }) => {
      socket.join(auctionId);

      if (!roomParticipants.has(auctionId)) {
        roomParticipants.set(auctionId, new Set());
      }
      roomParticipants.get(auctionId).add(userId);

      io.to(auctionId).emit("user_joined", {
        participantsCount: roomParticipants.get(auctionId).size,
      });
    });

    socket.on("leave_auction", ({ auctionId, userId }) => {
      socket.leave(auctionId);
      if (roomParticipants.has(auctionId)) {
        roomParticipants.get(auctionId).delete(userId);
        io.to(auctionId).emit("user_left", {
          participantsCount: roomParticipants.get(auctionId).size,
        });
      }
    });

    socket.on("disconnect", () => {
      roomParticipants.forEach((participants, auctionId) => {
        if (participants.has(socket.userId)) {
          participants.delete(socket.userId);
          io.to(auctionId).emit("user_left", {
            participantsCount: participants.size,
          });
        }
      });
    });
  });

  return io;
};
