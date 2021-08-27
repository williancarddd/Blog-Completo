import { Categorie } from "../Categories/Categorie";
import { Article } from "./Article";

interface ISelectAllArticles {
  name?: string,
  error: boolean,
  data_article?: object
}

export async function select_all_articles(attr?:Array<string>): Promise<ISelectAllArticles> {
  try {
    const result_search  = await Article.findAll({
      include:{model: Categorie},
      attributes: attr || undefined,
      order: [['id', 'desc']]
    })
    console.log(attr)
    return {error: false, data_article: result_search}
  } catch (err) {
    return {error: true, name: err.name}
  }
}