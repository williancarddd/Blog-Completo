import { Article } from "./Article";
import slugify from 'slugify'
import formatTitle from '@directus/format-title'
import 'dotenv/config'
interface ICreateNewArticle{
  name?:string, 
  error: boolean
}

export async function create_new_article(title_article: string, body_article:string, categorie_id: number, name_file: string) {
  try{
    await Article.create({
      title: formatTitle(title_article.replace(/[%&*$@\|/^~´`()]/g, '')),
      slug: slugify(title_article, '_'),
      body_article: body_article,
      categoryId: categorie_id,
      thumbnail_url: `http://localhost:${process.env.PORT}/public/thumbnails/${name_file}`
    })
    return {error: false}
  }catch(err) {
    return {error: true, name: err.name}
  }
}