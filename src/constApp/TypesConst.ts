import {BorderCountGoods} from "@/constApp/FunctionalApp";

type TRating = {
    Rating: string,
    Rate:  string,
    Count: string
}

type TModalGood = {
    ButtonFavorite: string,
    ButtonBasket: string,
    PriseSymbol: string,
    AddFavorite: string,
    RATING: TRating
}

type TGoodCard = {
    RATING: TRating,
    Category: string
}

type TBasket = {
    Title: string,
    AbsenceGoods: string,
    CountSymbol: string,
    Plus: string,
    Minus: string,
    PriseSymbol: string,
    Delete: string,
    TotalSum: string,
    Buy: string,
    BuyText: string
}

type THeader = {
    Phone: string,
    Name: string
}

type TSearcher = {
    Title: string,
    Sort: string,
    Find: string,
    CategoriesFilter: string[],
    Filter: string,
    Clean: string,
    Placeholder: string
}

type TBorderCountGoods = {
    Min: number,
    Max: number
}

export { TRating, TModalGood, TGoodCard, TBasket, THeader, TSearcher, TBorderCountGoods };