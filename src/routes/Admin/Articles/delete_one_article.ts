import { where } from "sequelize/types";
import { Article } from "./Article";

interface  IDeleteOneArticle{
  name?: String,
  error: boolean
}

export async function delete_one_article(id_article:number ): Promise<IDeleteOneArticle> {
  try{
    await Article.destroy({
      where:{id: id_article}
    })
    return {error: false}
  } catch (Err) {
    return {error: true, name: Err.name}
  }
}