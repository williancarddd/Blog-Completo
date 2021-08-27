import { Article } from "./Article";
import slugify from 'slugify'
import formatTitle from '@directus/format-title'
import 'dotenv/config'
import { where } from "sequelize/types";
interface IUpdateOneArticle{
  name?:string, 
  error: boolean
}

export async function update_one_article(title_article: string, body_article:string, id_article:number): Promise<IUpdateOneArticle> {
  try{
    await Article.update({
      title: formatTitle(title_article.replace(/[%&*$@\|/^~´`()]/g, '')),
      slug: slugify(title_article, '_'),
      body_article: body_article,
    }, 
    {where:{id: id_article}})
    return {error: false}
  }catch(err) {
    return {error: true, name: err.name}
  }
}