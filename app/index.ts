import cors from "cors";
import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import helmet from "helmet";
import router from "./routes/routes";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log("🏈 Solicitud recibida:", req.method, req.url);
	console.log("🏈 body", req.body);
	console.log("🏈 params", req.params);
	// console.log("🏈 query", req.query);
	next();
});

app.use("/api/v1/", router);

const start = (): void => {
	try {
		app.listen(3000, () => {
			console.log("Server started on port 3000");
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();
