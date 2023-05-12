import {SearcherText} from "@/constApp/BaseText";

export default interface IDataSearcher {
    searcher: string,
    sort: string,
    filterCategory: string,
    categoriesApp: Function,
    readonly searcherText: typeof SearcherText
};
