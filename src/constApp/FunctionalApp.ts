import IGoodApp from "@/interfaces/IGoodApp";
import {TBorderCountGoods, TPositionSearcher, TSearcherData} from "@/constApp/TypesConst";

const BorderCountGoods: Readonly<TBorderCountGoods> = {
    Min: 1,
    Max: 100,
    Rounding: 2
};

const SearcherData: Readonly<TSearcherData> = {
    EMITS: {
        Close: 'close-searcher',
        ChangeGoods: 'change-view-goods'
    },
    Delimiter: '–',
    SortPrice: 'price',
    SortAlphabet: 'alphabet'
}

const EMPTY_GOOD: Readonly<IGoodApp> = {
    category: '',
    description: '',
    id: NaN,
    image: '',
    price: 0,
    title: '',
    rating: {
        rate: 0,
        count: 0
    },
    isLikeBnActive: false,
};

const BasePositionSearcher: Readonly<TPositionSearcher> = {
    Left: 1300,
    Top: 180
};

export {BorderCountGoods, EMPTY_GOOD, SearcherData, BasePositionSearcher};