<template>
    <header class="header">
        <p class="header-text header-phone">PHONE: 8900000000</p>
        <p class="header-text header-name-store">VLAD1SAT STORE</p>
        <button class="header-magnifier" @click="isShowSort = !isShowSort"></button>
        <button class="header-favorites" @click="openFavorites()" :class="{ 'open-favorites': isShowFavorites}"></button>
        <button class="header-basket" @click="openBasket()"></button>
    </header>
    <main>
        <div style="padding-top: 150px"></div>
<!--        search-->
        <div v-if="isShowSort" class="search-modal">
            <button class="bn-basket-close bn-basket-move" @click="isShowSort = !isShowSort"></button>
            <h2 class="search-text search-text-title">SETUP</h2>
            <div class="search-main-window">
                <div class="search-div">
                    <h2 class="search-text">Поиск по странице</h2>
                    <input placeholder="Введите название интересуещего товара" v-model="searcher" class="search-input"/>
                </div>
                <div>
                    <h2 class="search-text">сортировка по:</h2>
                    <select v-model="sort" class="search-sort">
                        <option disabled>Выберите сортировку</option>
                        <option value="1">prise</option>
                        <option value="2">alphabet</option>
                        <option>–</option>
                    </select>
                </div>
                <div>
                    <h2 class="search-text">фильтрация по:</h2>
                    <select v-model="filterCategory" class="search-sort">
                        <option disabled>Выберите фильтрацию</option>
                        <option v-for="(category, index) in categories" :key="index">{{ category }}</option>
                        <option>–</option>
                    </select>
                </div>
                <button class="search-bn" @click="cleanFilter()">Clean</button>
            </div>
        </div>

        <p v-if="!appGoods.length" class="div-good-text text-no-goods">Товаров нет</p>

        <good-card v-for="good in appGoods"
                   :key="good.id"
                   :good="good"
                   @openGood="openGood">
        </good-card>


<!--basket-->
        <the-basket @closeBasket="closeBasket"
                    :is-show-basket="isShowBasket"
                    :basket-goods="basketGoods">

        </the-basket>

        <!--        good-->
        <the-modal-good @closeGood="closeGood"
                        :is-show-good="isShowGood"
                        :goods="goods"
                        :basket-goods="basketGoods"
                        :selected-good="selectedGood">
        </the-modal-good>

<!--        <div v-if="isShowGood" class="modal-background">
            <div class="modal-good-completely">
                <button class="bn-modal-close bn-modal-move" @click="closeGood()"></button>
                <div>
                    <h2 class="modal-text modal-title">{{ selectedGood.title }}</h2>
                    <h3 class="modal-text modal-category">{{ selectedGood.category }}</h3>
                </div>
                <img :src="selectedGood.image" class="modal-picture" alt="picture-cloth" width="230" height="330">
                <h3 class="modal-text modal-price">{{ selectedGood.price }} $</h3>
                <p class="modal-text modal-description">{{ selectedGood.description }}</p>
                <div>
                    <h2 class="modal-text modal-rating">Rating:</h2>
                    <p class="modal-text modal-rate">rate: {{ selectedGood.rating.rate }}</p>
                    <img :src="imageRating" alt="emotion" width="44" height="44" class="modal-smile">
                    <p class="modal-text modal-count">Count: {{selectedGood.rating.count }}</p>
                </div>
                <button class="bn-modal modal-text bn-modal-move" @click="addToFavoriteGood(selectedGood)">add to favorite</button>
                <button class="bn-modal modal-text bn-modal-move" @click="addToBasket(selectedGood)">BUY</button>
            </div>
        </div>-->
    </main>
    <footer>

    </footer>
</template>

<script>
import TheModalGood from "@/components/TheModalGood.vue";
import TheBasket from "@/components/TheBasket.vue";
import GoodCard from "@/components/GoodCard.vue";
import getDataGoods from "@/getGoods";
    export default {
        components: {GoodCard, TheBasket, TheModalGood},
        data() {
            return {
                goods: [],

                isShowGood: false,
                selectedGood: {
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
                },

                isShowBasket: false,
                basketGoods: [],

                isShowFavorites: false,

                searcher: '',

                isShowSort: '',
                sort: '–',

                categoriesApp: this.categories,
                filterCategory: '–',
            };
        },

        mounted() {
            getDataGoods().then(res => (this.goods = res));
        },

        computed: {
            categories() {
                return new Set(this.goods.map(good => good.category))
            },

            appGoods() {
                console.log('good', this.goods)
                let result = this.goods.slice();

                if (this.sort !== '–') {
                    if (this.sort === "1") {
                        result = result.sort((el1, el2) => el1.price - el2.price);
                    } else {
                        result = result.sort((el1, el2) => el1.title.localeCompare(el2.title))
                    }
                } else {
                    result = this.goods
                }

                if (this.searcher) {
                    result = result.filter(good => good.title.toLowerCase().startsWith(this.searcher.toLowerCase()) )
                }

                if (this.filterCategory !== '–') {
                    result = result.filter(good => good.category === this.filterCategory)
                }

                if (!this.isShowFavorites) {
                    return result;
                }  else {
                    return result.filter(good => good.isLikeBnActive)
                }
            }
        },

        methods: {
            openGood(data) {
                this.selectedGood = data.selectedGood;
                this.isShowGood = data.isShowGood;
                this.isShowSort = data.isShowSort;

            },

            closeGood(data) {
                this.isShowGood = data.isShowGood
                this.selectedGood = data.selectedGood;
            },

            openFavorites() {
                this.isShowFavorites = !this.isShowFavorites;
            },

            cleanFilter() {
                this.sort = '–';
                this.filterCategory = '–';
                this.searcher = '';
            },

            //basket
            openBasket() {
                this.isShowBasket = true;
                this.isShowSort = false;
            },

            closeBasket(data) {
                this.isShowBasket = data;
            },
        }
    }
</script>

<style>
  body {
      margin: 0;
      background-color: #FFF5D9;
  }
</style>

//header
<style scoped>
    .header {
        height: 150px;
        width: 100%;
        background-color: #7F89F8;
        color: #FFFFFF;
        display: flex;
        position: fixed;
        border-bottom: 5px #FFFFFF solid;
        z-index: 10;
    }

    .header-text {
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        text-transform: uppercase;
    }

    .header-phone {
        font-size: 24px;
        margin: 61px 354px 0 118px;
        cursor: pointer;
    }

    .header-name-store {
        font-size: 48px;
        cursor: default;
    }

    .header-magnifier {
        background: Transparent no-repeat url("magnifier.svg");
        width: 70px;
        height: 70px;
        border: none;
        cursor: pointer;
        margin: 40px 5px 0 250px;
    }

    .header-basket {
        background: Transparent no-repeat url("basket.svg");
        width: 90px;
        height: 90px;
        border: none;
        margin: 30px 5px 0 0;
        cursor: pointer;
    }

    .header-favorites {
        background: Transparent no-repeat url("favourites.svg");
        width: 80px;
        height: 80px;
        border: none;
        margin-top: 37px;
        cursor: pointer;
    }

    .open-favorites {
        background-image: url("favourites-use.svg");
    }

    .header-basket:hover,
    .header-favorites:hover,
    .header-magnifier:hover {
        transform: scale(1.1);
    }

    .header-phone:hover {
        opacity: 0.5;
    }
</style>

//search
<style>
    .search-modal {
        width: 500px;
        height: 350px;
        position: fixed;
        left: 1300px;
        top: 178px;
        background-color: #FFFFFF;
        cursor: default;
        z-index: 1000;
    }

    .search-text {
        font-size: 16px;
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        text-transform: uppercase;
        color: #7F89F8;
    }

    .search-text-title {
        text-align: center;
        margin: 20px 0;
        font-size: 32px;
    }

    .search-input {
        width: 400px;
        height: 30px;
        font-size: 16px;
        color: #7F89F8;
        font-family: 'Inter', sans-serif;
        border: #7F89F8 2px solid;
        border-radius: 7px;
    }

    .search-main-window {
        margin-left: 35px;
    }

    .search-input:focus {
        transform: scale(1.01);
        outline: none;
    }

    .search-sort {
        width: 200px;
        height: 30px;
        font-size: 16px;
        color: #7F89F8;
        font-family: 'Inter', sans-serif;
        border: #7F89F8 2px solid;
        border-radius: 7px;
    }

    .search-bn {
        margin: 10px 0 0 200px;
        width: 100px;
        height: 30px;
        background-color: #7F89F8;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        text-transform: uppercase;
        font-weight: 900;
        border: 0;
    }

    .search-bn:hover {
        transform: scale(1.05);
    }


</style>

//good
<style>
    .div-good-text {
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        font-size: 20px;
        color: #FFFFFF;
        text-transform: uppercase;
    }

    .text-no-goods {
        font-size: 40px;
        color: #7F89F8;
        text-align: center;
        margin-top: 80px;
    }
</style>
