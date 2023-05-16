import {TBasket, TGoodCard, THeader, TModalGood, TRating, TSearcher} from "@/constApp/TypesConst";

const PRISE_SYMBOL: string = '$';
const FILTER_CATEGORIES: string[] = ['price', 'alphabet'];
const AbsenceGoods: string = 'Don\'t have goods';

const RATING: Readonly<TRating> = {
    Rating: 'Rating',
    Rate: 'RATE:',
    Count: 'COUNT:',
};

const ModalGoodText: Readonly<TModalGood> = {
    ButtonFavorite: 'add to favorite list',
    ButtonBasket: 'add to basket',
    PriseSymbol: PRISE_SYMBOL,
    AddFavorite: 'Товар успешно добавлен в избранное!',
    RATING,
};

const GoodCardText: Readonly<TGoodCard> = {
    RATING,
    Category: 'CATEGORY:'
};

const BasketText: Readonly<TBasket> = {
    Title: 'Basket',
    CountSymbol: 'шт.',
    Plus: '+',
    Minus: '–',
    PriseSymbol: PRISE_SYMBOL,
    Delete: 'Delete',
    TotalSum: 'Total sum:',
    Buy: 'Buy',
    Limit: 'Превышен лимит товаров',
    BuyText: 'Вы успешно заказати товары!\nОжидайте подтверждения операции!\nСумма заказа:'
};

const HeaderText: Readonly<THeader> = {
    Phone: 'PHONE: 8900000000',
    Name:'VLAD1SAT STORE'
};

const SearcherText: Readonly<TSearcher> = {
    Title: 'SETUP',
    Sort: 'sort by',
    Find: 'find by page',
    CategoriesFilter: FILTER_CATEGORIES,
    Filter: 'filter by:',
    Clean: 'Clean',
    Placeholder: 'Введите название интересуещего товара'
};

export { ModalGoodText, GoodCardText, BasketText, HeaderText, SearcherText, AbsenceGoods };