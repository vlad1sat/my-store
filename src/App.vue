<template>
    <the-header :is-show-favorites="stateApp.isShowFavorites"
                :is-show-sort="stateApp.isShowSort"
                @openBasket="openBasket"
                @viewFavorites="viewFavorites"
                @viewSort="viewSort">

    </the-header>
    <main>
        <div style="padding-top: 150px"></div>
<!--        search-->
        <div v-if="stateApp.isShowSort" class="search-modal">
            <button class="bn-basket-close bn-basket-move"
                    @click="stateApp.isShowSort = false">
            </button>
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
                    :is-show-basket="stateApp.isShowBasket"
                    :basket-goods="basketGoods">

        </the-basket>

        <!--        good-->
        <the-modal-good @closeGood="closeGood"
                        :is-show-good="stateApp.isShowGood"
                        :goods="goods"
                        :basket-goods="basketGoods"
                        :selected-good="selectedGood">
        </the-modal-good>
    </main>
    <footer>

    </footer>
</template>

<script>
import TheModalGood from "@/components/TheModalGood.vue";
import TheBasket from "@/components/TheBasket.vue";
import GoodCard from "@/components/GoodCard.vue";
import TheHeader from "@/components/TheHeader.vue";

import getDataGoods from "@/getGoods";

    export default {
        components: {TheHeader, GoodCard, TheBasket, TheModalGood},
        data() {
            return {
                goods: [],

                stateApp: {
                    isShowGood: false,
                    isShowBasket: false,
                    isShowFavorites: false,
                    isShowSort: false,
                },

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

                basketGoods: [],

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

                if (!this.stateApp.isShowFavorites) {
                    return result;
                }  else {
                    return result.filter(good => good.isLikeBnActive)
                }
            }
        },

        methods: {
            openGood(data) {
                this.selectedGood = data.selectedGood;

                const stateApp = this.stateApp;
                stateApp.isShowGood = data.isShowGood;
                stateApp.isShowSort = data.isShowSort;
            },

            viewSort(data) {
                this.stateApp.isShowSort = data;
            },

            closeGood(data) {
                this.stateApp.isShowGood = data.isShowGood
                this.stateApp.selectedGood = data.selectedGood;
            },

            viewFavorites(data) {
                this.stateApp.isShowFavorites = data;
            },



            cleanFilter() {
                this.sort = '–';
                this.filterCategory = '–';
                this.searcher = '';
            },

            openBasket(data) {
                this.stateApp.isShowBasket = data.isShowBasket;
                this.stateApp.isShowSort = data.isShowSort;
            },

            closeBasket(data) {
                this.stateApp.isShowBasket = data;
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

    .bn-basket-close {
        width: 40px;
        height: 40px;
        background: Transparent no-repeat url("close.svg");
        margin: 20px 0 0 430px;
        border: none;
        position: absolute;
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
