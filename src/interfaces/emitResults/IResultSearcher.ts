import IGoodApp from "@/interfaces/IGoodApp";

export default interface IResultSearcher {
    filterGoods: IGoodApp[] | [],
    isOnFilter: boolean
};