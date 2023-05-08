<template>
    <the-header :is-show-favorites="stateApp.isShowFavorites"
                :is-show-sort="stateApp.isShowSort"
                @openBasket="openBasket"
                @viewFavorites="viewFavorites"
                @viewSort="viewSort">
    </the-header>
    <main>
        <div style="padding-top: 150px"></div>
        <the-searcher :is-show-sort="stateApp.isShowSort"
                      :goods="goods"
                      @closeSearcher="closeSearcher" @changeViewGoods="changeViewGoods">
        </the-searcher>
        <p v-if="!appGoods.length" class="div-good-text text-no-goods">Товаров нет</p>
        <good-card v-for="good in appGoods"
                   :key="good.id"
                   :good="good"
                   @openGood="openGood">
        </good-card>
        <the-basket @closeBasket="closeBasket"
                    @deleteGoodFromBasket="deleteGoodFromBasket"
                    :is-show-basket="stateApp.isShowBasket"
                    :basket-goods="basketGoods">

        </the-basket>
        <the-modal-good @closeGood="closeGood"
                        :is-show-good="stateApp.isShowGood"
                        :goods="goods"
                        :basket-goods="basketGoods"
                        :selected-good="selectedGood">
        </the-modal-good>
    </main>
</template>

<script>
import TheModalGood from "@/components/mainComponents/TheModalGood.vue";
import TheBasket from "@/components/mainComponents/TheBasket.vue";
import GoodCard from "@/components/mainComponents/GoodCard.vue";
import TheHeader from "@/components/mainComponents/TheHeader.vue";
import TheSearcher from "@/components/mainComponents/TheSearcher.vue";

import getDataGoods from "@/getGoods";

    export default {
        components: {TheSearcher, TheHeader, GoodCard, TheBasket, TheModalGood},
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

                stateFilter: {
                    filterGoods: [],
                    isOnFilter: false,
                },
            };
        },

        mounted() {
            getDataGoods().then(res => (this.goods = res));
        },

        computed: {
            appGoods() {
                let result = (this.stateFilter.isOnFilter ? this.stateFilter.filterGoods : this.goods).slice();

                if (this.stateApp.isShowFavorites) {
                    return result.filter(good => good.isLikeBnActive);
                }

                return result;
            }
        },

        methods: {
            openGood(data) {
                this.selectedGood = data.selectedGood;

                const state = this.stateApp;
                state.isShowGood = data.isShowGood;
                state.isShowSort = data.isShowSort;
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

            openBasket(data) {
                this.stateApp.isShowBasket = data.isShowBasket;
                this.stateApp.isShowSort = data.isShowSort;
            },

            closeBasket(data) {
                this.stateApp.isShowBasket = data;
            },

            deleteGoodFromBasket(data) {
                this.basketGoods = data;
            },

            closeSearcher(data) {
                this.stateApp.isShowSort = data;
            },

            changeViewGoods(data) {
                const state = this.stateFilter;
                state.filterGoods = data.filterGoods;
                this.stateFilter.isOnFilter = data.isOnFilter;
            },
        },

        watch: {
            goods(newValue) {
                this.stateFilter.filterGoods = newValue;
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
