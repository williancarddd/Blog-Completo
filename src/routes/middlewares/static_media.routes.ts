import path from "path";
import  express from "express";
const router_static_media = express.Router()

router_static_media.use('/', express.static(path.resolve("public")))

export {router_static_media}
