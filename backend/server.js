import "dotenv/config";
import app from "./src/app.js";
import http from "http";
import connectDB from "./config/database.js";

const server = http.createServer(app);

const port = process.env.PORT || 4000;

await connectDB();

server.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
});
