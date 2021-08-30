import { where } from "sequelize/types";
import { Article } from "./Article";
import fs from 'fs'
interface  IDeleteOneArticle{
  name?: String,
  error: boolean
}

export async function delete_one_article(id_article:number ): Promise<IDeleteOneArticle> {
  try{
    const search_name_thumbnail_for_delete = await Article.findByPk(id_article)
    const name_tb= search_name_thumbnail_for_delete?.getDataValue('name_thumbnail')
    await Article.destroy({
      where:{id: id_article}
    })
    try {
      if (name_tb != 'standart.png') fs.unlinkSync(`./public/thumbnails/${name_tb}`)
    } catch(err) {
      console.log('err delete archive', err)
    }
    return {error: false}
  } catch (Err) {
    return {error: true, name: Err.name}
  }
}