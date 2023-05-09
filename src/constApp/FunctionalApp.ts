import IGoodApp from "@/interfaces/IGoodApp";
import {TBorderCountGoods} from "@/constApp/TypesConst";

const BorderCountGoods: TBorderCountGoods = {
    Min: 1,
    Max: 100,
};

const EMPTY_GOOD: IGoodApp = {
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

export {BorderCountGoods, EMPTY_GOOD};