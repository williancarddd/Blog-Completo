import { Model } from "sequelize/types/lib/model";
import { Article } from "../Admin/Articles/Article";
import { Categorie } from "../Admin/Categories/Categorie";

interface ISearch {
  name?: string,
  error: boolean,
  data_article?: Model<any, any> | null
}

export async function search_article_to_categorie(slug_categorie:string): Promise<ISearch> {
  try{
    const result =  await Categorie.findOne({
      where: {slug: slug_categorie},
      include: {model: Article},
      
    })
    return {error: false, data_article: result}
  } catch(err) {
    return {error: true, name: err.name}
  }
}