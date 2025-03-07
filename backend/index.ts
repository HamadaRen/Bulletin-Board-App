import express, { Request, Response, Application } from "express";
import cors from "cors";
import { uid } from "uid";

const app:Application = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173"}))

app.get('/', (req: Request, res: Response) => {
  console.log("getリクエストを受け付けました");
  return res.status(200).json({ message: "hello world" });
})

app.post("/add", (req: Request, res: Response) => {
  console.log("postリクエストを受け付けました");
  console.log(req.body.data.inputValue);
  const { todo } = req.body.data;
  const uidValue = uid();
  return res.status(200).json({ id: uidValue, todo});
})


try {
  app.listen(PORT, () => {
    console.log(`server running at://localhost:${PORT}`);
  });
} catch (e) {
  if(e instanceof Error) {
    console.error(e.message);
  }
}