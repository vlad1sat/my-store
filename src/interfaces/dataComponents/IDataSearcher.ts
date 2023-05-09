import {SearcherText} from "@/enumsApp/BaseText";

export default interface IDataSearcher {
    searcher: string,
    sort: string,
    filterCategory: string,
    categoriesApp: Function,
    searcherText: typeof SearcherText,
}
