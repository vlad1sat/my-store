const PRISE_SYMBOL: string = '$';
const FILTER_CATEGORIES: string[] = ['prise', 'alphabet'];

const RATING = {
    Rating: 'Rating',
    Rate: 'RATE:',
    Count: 'COUNT:',
};

const ModalGoodText = {
    ButtonFavorite: 'add to favorite list',
    ButtonBasket: 'add to basket',
    PriseSymbol: PRISE_SYMBOL,
    RATING,
}

const GoodCardText = {
    RATING,
    Category: 'CATEGORY:'
}

const BasketText = {
    Title: 'Basket',
    AbsenceGoods: 'Don\'t have goods',
    CountSymbol: 'шт.',
    Plus: '+',
    Minus: '-',
    PriseSymbol: PRISE_SYMBOL,
    Delete: 'Delete',
    TotalSum: 'Total sum:',
    Buy: 'Buy'
}

const HeaderText = {
    Phone: 'PHONE: 8900000000',
    Name:'VLAD1SAT STORE'
}

const SearcherText = {
    Title: 'SETUP',
    Sort: 'sort by',
    Find: 'find by page',
    CategoriesFilter: FILTER_CATEGORIES,
    Filter: 'filter by:',
    Clean: 'Clean'

}

export { ModalGoodText, GoodCardText, BasketText, HeaderText, SearcherText };