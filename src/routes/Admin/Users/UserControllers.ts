import express, {Request, Response} from 'express'
import { create_new_user_admin } from './create_new_user_admin'
import { select_all_users_admin } from './select_all_users_admin'
import { select_one_user } from './select_one_user_admin'
const router_user = express.Router()

interface IData {
  title_page: string
  data_users?: object
}

router_user.get('/', async (req: Request, res:Response) => {
  const data: IData = {
    title_page: 'List all users admin'
  }
  const data_user = await select_all_users_admin()
  if(!data_user.err){
    data.data_users = data_user.data_users
    return res.render('Admin/Users/index_users', data)
  } else {
    return res.redirect('/')
  }
})

router_user.get('/create', async(req: Request, res:Response) => {
  const data: IData = {
    title_page: 'Create new user Admin'
  }
  return res.render('Admin/Users/users_create', data)
})

router_user.post('/create', async(req: Request, res:Response) => {
  const email = req.body.email_admin.trim()
  const password = req.body.password_admin.trim()
  const result_search_email = await select_one_user(email)
  if(!result_search_email.data_user ){
    const result_create = await create_new_user_admin(email, password)
    if(!result_create.err){
      return res.redirect('/admin/users')
    } else {
      return res.redirect('/')
    }
  } else {
    res.redirect('/admin/users/create')
  }
})
export {router_user}