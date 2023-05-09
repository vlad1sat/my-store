import {TBasket, TGoodCard, THeader, TModalGood, TRating, TSearcher} from "@/constApp/TypesConst";

const PRISE_SYMBOL: string = '$';
const FILTER_CATEGORIES: string[] = ['prise', 'alphabet'];

const RATING: TRating = {
    Rating: 'Rating',
    Rate: 'RATE:',
    Count: 'COUNT:',
};

const ModalGoodText: TModalGood = {
    ButtonFavorite: 'add to favorite list',
    ButtonBasket: 'add to basket',
    PriseSymbol: PRISE_SYMBOL,
    AddFavorite: 'Товар успешно добавлен в избранное!',
    RATING,
}

const GoodCardText: TGoodCard = {
    RATING,
    Category: 'CATEGORY:'
}

const BasketText: TBasket = {
    Title: 'Basket',
    AbsenceGoods: 'Don\'t have goods',
    CountSymbol: 'шт.',
    Plus: '+',
    Minus: '-',
    PriseSymbol: PRISE_SYMBOL,
    Delete: 'Delete',
    TotalSum: 'Total sum:',
    Buy: 'Buy',
    BuyText: 'Вы успешно заказати товары!\nОжидайте подтверждения операции!\nСумма заказа:'
}

const HeaderText: THeader = {
    Phone: 'PHONE: 8900000000',
    Name:'VLAD1SAT STORE'
}

const SearcherText: TSearcher = {
    Title: 'SETUP',
    Sort: 'sort by',
    Find: 'find by page',
    CategoriesFilter: FILTER_CATEGORIES,
    Filter: 'filter by:',
    Clean: 'Clean',
    Placeholder: 'Введите название интересуещего товара'
}

export { ModalGoodText, GoodCardText, BasketText, HeaderText, SearcherText };