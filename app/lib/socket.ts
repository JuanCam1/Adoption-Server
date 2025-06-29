import http from "node:http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

export function getReceiverSocketId(userId: string) {
	return userSocketMap[userId];
}

const userSocketMap: Record<string, string> = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("A user connected", socket.id);

	const userIdRaw = socket.handshake.query.userId;
	const userId = typeof userIdRaw === "string" ? userIdRaw : undefined;

	if (userId) {
		userSocketMap[userId] = socket.id;
	}

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("A user disconnected", socket.id);
		if (userId) {
			delete userSocketMap[userId];
			io.emit("getOnlineUsers", Object.keys(userSocketMap));
		}
	});
});

export { io, app, server };
