<template>
    <the-header :is-show-favorites="stateApp.isShowFavorites"
                :is-show-sort="stateApp.isShowSort"
                @open-basket="openBasket"
                @view-favorites="viewFavorites"
                @view-sort="viewSort">
    </the-header>
    <main>
        <div style="padding-top: 150px"></div>
        <the-searcher :is-show-sort="stateApp.isShowSort"
                      :goods="goods"
                      @close-searcher="closeSearcher"
                      @change-view-goods="changeViewGoods">
        </the-searcher>
        <p v-if="!appGoods.length" class="div-good-text text-no-goods">Don't have goods</p>
        <good-card v-for="good in appGoods"
                   :key="good.id"
                   :good="good"
                   @open-good="openGood">
        </good-card>
        <the-basket @close-basket="closeBasket"
                    @delete-good-from-basket="deleteGoodFromBasket"
                    :is-show-basket="stateApp.isShowBasket"
                    :basket-goods="basketGoods">

        </the-basket>
        <the-modal-good @close-good="closeGood"
                        :is-show-good="stateApp.isShowGood"
                        :goods="goods"
                        :basket-goods="basketGoods"
                        :selected-good="selectedGood">
        </the-modal-good>
    </main>
</template>

<script lang="ts">
import TheModalGood from "@/components/mainComponents/TheModalGood.vue";
import TheBasket from "@/components/mainComponents/TheBasket.vue";
import GoodCard from "@/components/mainComponents/GoodCard.vue";
import TheHeader from "@/components/mainComponents/TheHeader.vue";
import TheSearcher from "@/components/mainComponents/TheSearcher.vue";
import {defineComponent} from "vue";
import IResultOpenGood from "@/interfaces/emitResults/IResultOpenGood";
import IBasketGood from "@/interfaces/IBasketGood";
import IResultSearcher from "@/interfaces/emitResults/IResultSearcher";
import IDataApp from "@/interfaces/dataComponents/IDataApp";
import IGoodApp from "@/interfaces/IGoodApp";
import IResultOpenBasket from "@/interfaces/emitResults/IResultOpenBasket";
import IResultCloseGood from "@/interfaces/emitResults/IResultCloseGood";
import {EMPTY_GOOD} from "@/constApp/FunctionalApp";
import {LocalStorage} from "@/constApp/LocalStorage";
import {getToStorage, setToStorage} from "@/logicStorage/ActionsWithStorage";
import {goodsApiStorage} from "@/logicStorage/DataStorage";

export default defineComponent({
    components: {TheSearcher, TheHeader, GoodCard, TheBasket, TheModalGood},
    data(): IDataApp {
        return {
            goods: [],

            stateApp: {
                isShowGood: false,
                isShowBasket: false,
                isShowFavorites: false,
                isShowSort: false,
                isLoadGoodsInStorage: false,
            },

            selectedGood: EMPTY_GOOD,

            basketGoods: [],

            stateFilter: {
                filterGoods: [],
                isOnFilter: false,
            },
        };
    },

    mounted() {
        goodsApiStorage().then(() => {
            this.goods = getToStorage(LocalStorage.Goods);
            this.basketGoods = getToStorage(LocalStorage.BasketGoods);
        });
    },

    computed: {
        appGoods(): IGoodApp[] {
            const result = (this.stateFilter.isOnFilter ? this.stateFilter.filterGoods : this.goods).slice();

            if (this.stateApp.isShowFavorites) {
                return result.filter((good: IGoodApp) => good.isLikeBnActive);
            }

            return result;
        }
    },

    methods: {
        openGood(data: IResultOpenGood): void {
            this.selectedGood = data.selectedGood;

            const state = this.stateApp;
            state.isShowGood = data.isShowGood;
            state.isShowSort = data.isShowSort;
        },

        viewSort(stateShow: boolean): void {
            this.stateApp.isShowSort = stateShow;
        },

        closeGood(data: IResultCloseGood): void {
            this.stateApp.isShowGood = data.isShowGood
            this.selectedGood = data.selectedGood;
        },

        viewFavorites(stateFavorite: boolean): void {
            this.stateApp.isShowFavorites = stateFavorite;
        },

        openBasket(data: IResultOpenBasket): void {
            this.stateApp.isShowBasket = data.isShowBasket;
            this.stateApp.isShowSort = data.isShowSort;
        },

        closeBasket(stateBasket: boolean): void {
            this.stateApp.isShowBasket = stateBasket;
        },

        deleteGoodFromBasket(goods: IBasketGood[]): void {
            this.basketGoods = goods;
            setToStorage(LocalStorage.BasketGoods, this.basketGoods);
        },

        closeSearcher(stateSort: boolean): void {
            this.stateApp.isShowSort = stateSort;
        },

        changeViewGoods(data: IResultSearcher): void {
            const state = this.stateFilter;

            state.filterGoods = data.filterGoods;
            state.isOnFilter = data.isOnFilter;
        },
    },

    watch: {
        goods(newValue: IGoodApp[]): void {
            this.stateFilter.filterGoods = newValue;
        }
    }
})
</script>

<style>
    body {
        margin: 0;
        background-color: #FFFBF1;
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        text-transform: uppercase;
    }

    .center-img {
        text-align: center;
    }
</style>

<style>
    .text-no-goods {
        font-size: 40px;
        color: #7F89F8;
        text-align: center;
        margin-top: 80px;
    }
</style>