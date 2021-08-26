import express, {Request, Response} from "express";
const router_root = express.Router()

router_root.get('/', async (req:Request, res:Response) => {
  res.send("ok route.")
})

export {router_root}