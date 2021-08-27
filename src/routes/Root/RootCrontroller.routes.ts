import express, {Request, Response} from "express";
import { select_all_articles } from "../Admin/Articles/select_all_article";
import { select_one_article } from "../Admin/Articles/select_one_article";
const router_root = express.Router()

interface IData {
  title_page: String,
  data_article?: object | null
}

router_root.get('/', async (req:Request, res:Response) => {
  const data:IData = {title_page: "BlogTecnor - Welcome "}
  const result_articles = await select_all_articles(['title', 'thumbnail_url', 'id','slug'])
  data.data_article = result_articles.data_article
  res.render('index', data)
})

router_root.get('/read/:slug', async  (req:Request, res:Response) => {
  const {slug}  = req.params
  const result_article = await select_one_article(slug)
  if(!result_article.error){
    const data: IData = {
      title_page: `BlogTecnor - ${result_article.data_one_article?.getDataValue("title")}`,
      data_article: result_article.data_one_article
    }
    return res.render('read_article', data)
  } else {
    return res.redirect('/')
  }
})

export {router_root}