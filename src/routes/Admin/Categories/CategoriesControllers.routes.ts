import express, {Request, Response} from 'express'
import { create_new_categorie } from './create_categorie'
import { delete_categorie } from './delete_categorie'
import { select_all_categorie } from './select_all_categories'
import {  select_one_categorie } from './select_one_categorie'
import { update_categorie } from './update_categorie'

const router_categories = express.Router()

interface IData{ 
  title_page: String,
  data_categorie?: object,
}
router_categories.get('/', async(req:Request, res:Response): Promise<void> => {
  const data: IData = {
    title_page: 'BlogTecnor - All categories'
  }
  const result_search = await select_all_categorie()
  if(!result_search.error){
    data.data_categorie = result_search.result_data
    
    return res.render('Admin/Categories/index_categories', data)
  } else {
    return res.render('/')
  }
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
  if(!result.error) {
    return res.redirect('/admin/categories')
  } else {
    return res.redirect('/')
  }
})

router_categories.post('/delete/:id', async (req:Request, res:Response) => {
  const id:number = Number.parseInt(req.params.id)
  if(!isNaN(id)){
    const result_delet = await delete_categorie(id)
    if(!result_delet.error){
      return res.redirect('/admin/categories')
    } else {
      console.log('erro ao deletar')
      return res.redirect('/')
    }
  }
  console.log("não é um número")
  return res.redirect('/')
})

router_categories.post('/edit/:id', async (req:Request, res:Response) => {
  const id:number = Number.parseInt(req.params.id)
  const new_title = req.body.new_title
  if(!isNaN(id)) {
    const result_update = await update_categorie(id, new_title)
    if(!result_update.error ){
      return res.redirect("/admin/categories")
    } else {
      return res.redirect('/')
    }
  } else {
    return res.redirect('/')
  }
})

router_categories.get('/edit/:id', async (req: Request, res:Response) => {
  const id:number = Number.parseInt(req.params.id)
  if(!isNaN(id)) {
    const result_find = await select_one_categorie(id)
    if(!result_find.error) {
      const data: IData = {title_page: 'Edit categorie'}
      data.data_categorie = result_find.result_one_categorie
      return res.render('Admin/Categories/edit_categorie', data)
    } else {
      return res.redirect('/')
    }
  }  else {
    return res.redirect('/')
  }
})
export {router_categories}