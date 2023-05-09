import IGoodApp from "@/interfaces/IGoodApp";
import IBasketGood from "@/interfaces/IBasketGood";
import IResultSearcher from "@/interfaces/emitResults/IResultSearcher";

export default interface IDataApp {
    goods: IGoodApp[] | [],

    stateApp: StateApp,

    selectedGood: IGoodApp,

    basketGoods: IBasketGood[] | [],

    stateFilter: IResultSearcher,
};

type StateApp = {
    isShowGood: boolean,
    isShowBasket: boolean,
    isShowFavorites: boolean,
    isShowSort: boolean,
};