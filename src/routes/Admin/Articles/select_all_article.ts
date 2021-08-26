import { Categorie } from "../Categories/Categorie";
import { Article } from "./Article";

interface ISelectAllArticles {
  name?: string,
  error: boolean,
  data_article?: object
}

export async function select_all_articles(): Promise<ISelectAllArticles> {
  try {
    const result_search  = await Article.findAll()
    console.log(result_search)
    return {error: false, data_article: result_search}
  } catch (err) {
    return {error: true, name: err.name}
  }
}