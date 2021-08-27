import express , {Request, Response} from 'express'
import { multer_define } from '../../middlewares/upload_thumnail.routes'
import { select_all_categorie } from '../Categories/select_all_categories'
import { create_new_article } from './create_new_article'
import { delete_one_article } from './delete_one_article'
import { select_all_articles } from './select_all_article'
import { select_one_article } from './select_one_article'
import { update_one_article } from './update_one_article'
const router_articles = express.Router()

interface IData {
  title_page: string,
  data_article?: object,
  all_categories?: object
}

router_articles.get('/', async (req:Request, res:Response) => {
  const data: IData = {
    title_page: 'BlogTecnor - List All Article'
  }
  const result_search =  await select_all_articles()
  if(!result_search.error){
    data.data_article = result_search.data_article
    return  res.render('Admin/Articles/index_articles', data)
  } else {
    return res.render('/')
  }
})

router_articles.get('/new', async (req: Request, res:Response) => {
  const data:IData = {
    title_page: 'BlogTecnor - Creating new article'
  }
  data.all_categories = await (await select_all_categorie()).result_data
  return res.render('Admin/Articles/new_article', data)
})

router_articles.post('/new', multer_define.single('thumbnail_article'), async (req: Request , res:Response) => {
  const title_article = req.body.title_article
  const select_categorie = Number.parseInt(req.body.select_categorie)
  const body_article = req.body.body_article
  const name_file = req.file?.filename
  if(req.file){
    const result_create = await create_new_article(
        title_article,
        body_article,
        select_categorie,
        name_file || 'error',
    )
    if(!result_create.error){
      return res.redirect('/admin/articles')
    }
  }
  return res.redirect('/')
})


router_articles.post('/delete/:id', async (req:Request, res:Response) => {
  const id = Number.parseInt(req.params.id)
  const result_delete = await delete_one_article(id)
  if(!result_delete.error) {
    return res.redirect('/admin/articles')
  }
  return res.redirect('/')
})

router_articles.get('/update/:id' , async (req: Request, res:Response) => {
  const id = Number.parseInt(req.params.id)
  const data: IData= {
    title_page: 'BlogTecnor-Update article',
  }
  const result_article = await select_one_article({id: id})
  if (!result_article.error) {
    data.data_article =  result_article.data_one_article || {}
    res.render('Admin/Articles/edit_article', data)
  } else {
    res.redirect('/')
  }
})

router_articles.post('/update/:id', async (req: Request, res:Response) => {
  const id = Number.parseInt(req.params.id)
  const title_article = req.body.title_article
  const body_article = req.body.body_article
  const result_update = await update_one_article(title_article, body_article, id)
  if(!result_update.error){
    return res.redirect('/admin/articles')
  } else {
    return res.redirect('/')
  }
})
export {router_articles}