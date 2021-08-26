import express, {Request, Response} from 'express'
import { create_new_categorie } from './create_categorie'
const router_categories = express.Router()

interface IData{ 
  title_page: String
}
router_categories.get('/', async(req:Request, res:Response): Promise<void> => {
  const data: IData = {
    title_page: 'BlogTecnor - All categories'
  }
  return res.render('Admin/Categories/index_categories', data)
})

router_categories.get('/new', async (req:Request, res:Response) => {
  const data: IData = {
    title_page: 'BlogTecnor - Create new categorie',
  }
  return res.render("admin/Categories/new_categorie", data)
})

router_categories.post('/new', async (req: Request, res:Response) => {
  const categorie_title:string = req.body.categorie_title.trim()
  const result = await create_new_categorie(categorie_title)
  console.log(result)
  if(!result.error) {
    return res.redirect('/admin/categories')
  } else {
    return res.redirect('/')
  }
})

export {router_categories}