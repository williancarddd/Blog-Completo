import express, {Request, Response} from "express";
import { pagination_article } from "../Admin/Articles/pagination_article";
import { select_all_articles } from "../Admin/Articles/select_all_article";
import { select_one_article } from "../Admin/Articles/select_one_article";
import { Categorie } from "../Admin/Categories/Categorie";
import { select_all_categorie } from "../Admin/Categories/select_all_categories";
import { search_article_to_categorie } from "./search_article_to_categorie";
const router_root = express.Router()

interface IData {
  title_page: String,
  data_article?: object | null,
  data_categorie?: Object
}

router_root.get('/', async (req:Request, res:Response) => {
  const data:IData = {title_page: "BlogTecnor - Welcome "}
  const result_articles = await select_all_articles(['title', 'thumbnail_url', 'id','slug'], 8)
  const result_categorie = await select_all_categorie()
  data.data_categorie = result_categorie.result_data
  data.data_article = result_articles.data_article
  res.render('index', data)
})

router_root.get('/read/:slug', async  (req:Request, res:Response) => {
  const {slug}  = req.params
  const result_article = await select_one_article({slug:slug})
  const result_categorie = await select_all_categorie()
  
  if(!result_article.error){
    const data: IData = {
      title_page: `BlogTecnor - ${result_article.data_one_article?.getDataValue("title")}`,
      data_article: result_article.data_one_article
    }
    data.data_categorie = result_categorie.result_data
    return res.render('read_article', data)
  } else {
    return res.redirect('/')
  }
})

router_root.get('/categories/:slug', async (req:Request, res:Response) => {
  const {slug}  = req.params
  const result = await search_article_to_categorie(slug)
  const data:IData = {
    title_page: `BlogTecnor- ${result.data_article?.getDataValue('title')}`
  }
  if(!result.error) {
    data.data_article = result.data_article
    const result_categorie = await select_all_categorie()
    data.data_categorie = result_categorie.result_data
    return res.render('article_to_categorie', data)
  } else {
    return res.redirect('/')
  }
})

router_root.get('/articles/page/:num', async (req: Request, res:Response) => {
  const page = Number.parseInt(req.params.num)
  const limit = 8
  const pages_get = limit*page
  const data_pagination = await pagination_article(limit, pages_get)
  if(!data_pagination.error) {
    let next: boolean;
    // console.log(data_pagination.data_article?.count, pages_get)
    if(( pages_get + limit) >= (data_pagination.data_article?.count || 0) ){
      next = false
    } else {
      next = true 
    }

    const data_cate = await select_all_categorie()
    const title_page = 'Page-Article'
    console.log(data_pagination.data_article?.count)
    return res.render('Admin/Articles/pages_article',{
      data_article: data_pagination.data_article?.rows, 
      exists_next: next,
      page_now: page,
      data_categorie: data_cate.result_data,
      title_page: title_page
      })
  } else {
    return res.redirect('/')
  }
})

router_root.get('/session', async (req:Request, res:Response) => {
  //@ts-ignore
  req.session.email = 'ddasd'
  res.send('create')
})
router_root.get('/read', async (req:Request, res:Response) => {
  res.json(req.session?.id)
})
export {router_root}