import fs from "node:fs";
import path from "node:path";
import cors from "cors";
import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
// import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { defaultData } from "./data";
import { app, server } from "./lib/socket";
import router from "./routes/routes";
import Config from "./util/config";

const uploadsDir = path.join(process.cwd(), "uploads");
const PORT = Config.getInstance().get("port");
// const limiter = rateLimit({
// 	windowMs: 3 * 60 * 1000,
// 	limit: 100,
// 	standardHeaders: "draft-8",
// 	legacyHeaders: true,
// });

app.use(express.json({ limit: "5mb" }));

app.use(cors());
app.use(helmet());
// app.use(limiter);

app.use((req: Request, _: Response, next: NextFunction) => {
	console.log("🏈 Solicitud recibida:", req.method, req.url);
	console.log("🏈 body", req.body);
	console.log("🏈 params", req.params);
	console.log("🏈 query", req.query);
	next();
});

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	if (err.status === 413 || err.code === "LIMIT_FILE_SIZE") {
		res.status(413).json({ message: "El archivo supera el tamaño permitido" });
	} else {
		console.error("Error inesperado:", err);
		res.status(500).json({ message: "Error interno del servidor" });
	}
};

app.use(errorHandler);

app.use("/api/v1/", router);
app.use("/static", express.static("uploads"));
// http://localhost:8080/static/user/picture-1751172971949-811478341.jpeg

server.listen(PORT, async () => {
	await defaultData();

	if (!fs.existsSync(uploadsDir)) {
		fs.mkdirSync(uploadsDir, { recursive: true });
	}

	console.log(`server is running on PORT: ${PORT}`);
});

//  npx tunnelmole 8080
