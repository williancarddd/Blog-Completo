import { Model } from "sequelize/types";
import { Article } from "./Article";

interface ISelectOneArticle {
  name?: string,
  error: boolean,
  data_one_article?: Model<any, any> | null
}

export async function select_one_article(slug: string ): Promise<ISelectOneArticle> {
  try {
    const result_search =  await Article.findOne({
      where: {
        slug: slug
      }
    })
    return { error:false, data_one_article: result_search}
  } catch(Err) {
    return { error: true , name: Err.name}
  }
}