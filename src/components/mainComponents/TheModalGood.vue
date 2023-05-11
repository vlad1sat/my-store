<template>
    <div v-show="isShowGood" class="modal-background">
        <div class="modal-good-completely">
            <close-button @close="closeGood()"></close-button>
            <div>
                <h2 class="modal-text modal-title">{{ selectedGood.title }}</h2>
                <h3 class="modal-text modal-category">{{ selectedGood.category }}</h3>
            </div>
            <img :src="selectedGood.image" class="modal-picture" alt="picture-cloth" width="230" height="330">
            <h3 class="modal-text modal-price">{{ selectedGood.price }} {{ modalText.PriseSymbol }}}</h3>
            <p class="modal-text modal-description">{{ selectedGood.description }}</p>
            <div>
                <h2 class="modal-text modal-rating">{{ modalText.RATING.Rating }}</h2>
                <p class="modal-text modal-rate">{{ modalText.RATING.Rate }} {{ selectedGood.rating.rate }}</p>
                <img :src="imageRating" alt="emotion" width="44" height="44" class="modal-smile">
                <p class="modal-text modal-count">{{ modalText.RATING.Count }} {{selectedGood.rating.count }}</p>
            </div>
            <good-button-action @click-button="addToFavoriteGood"
                                      :text-button="modalText.ButtonFavorite">
            </good-button-action>
            <good-button-action @click-button="addToBasket"
                                      :text-button="modalText.ButtonBasket">
            </good-button-action>
        </div>
    </div>
</template>

<script lang="ts">
import goodButtonAction from "@/components/auxiliaryComponents/good-button-action.vue";
import CloseButton from "@/components/auxiliaryComponents/close-button.vue";
import {defineComponent, PropType} from "vue";
import IGoodApp from "@/interfaces/IGoodApp";
import IBasketGood from "@/interfaces/IBasketGood";
import IResultCloseGood from "@/interfaces/emitResults/IResultCloseGood";
import {ModalGoodText} from "@/constApp/BaseText";
import IDataModalGood from "@/interfaces/dataComponents/IDataModalGood";
import {EMPTY_GOOD} from "@/constApp/FunctionalApp";
import {setToStorage} from "@/logicStorage/ActionsWithStorage";
import {LocalStorage} from "@/constApp/LocalStorage";

export default defineComponent({
    name: "TheModalGood",
    components: {CloseButton, goodButtonAction},

    props: {
        isShowGood: Boolean,
        selectedGood: {
            type: Object as PropType<IGoodApp>,
            required: true
        },

        basketGoods: {
            type: Array as PropType<IBasketGood[]>,
            required: true
        },

        goods: {
            type: Array as PropType<IGoodApp[]>,
            required: true
        },
    },

    data(): IDataModalGood {
        return {
            imageRating: require("../../smile.svg"),
            modalText: ModalGoodText,
        }
    },

    methods: {
        addToFavoriteGood(): void {
            this.goods.find(baseGood => {
                if (baseGood.id === this.selectedGood.id) {
                    baseGood.isLikeBnActive = true;
                }
            });

            alert(`${this.modalText.AddFavorite}`);
        },

        addToBasket(): void {
            const basketGood: IBasketGood = {
                title: this.selectedGood.title,
                id: this.selectedGood.id,
                count: 1,
                price: this.selectedGood.price,
                image: this.selectedGood.image
            };

            if (basketGood.title.split(' ').length > 6) {
                basketGood.title = basketGood.title.split(' ').slice(0, 6).join(' ') + '...';
            }

            this.pushInBasket(basketGood);
            this.closeGood();
        },

        pushInBasket(basketGood: IBasketGood): void {
            let isInBasket = false;
            this.basketGoods.find((goodBasket: IBasketGood) => {
                if (goodBasket.id === basketGood.id) {
                    ++goodBasket.count;
                    isInBasket = true;
                }
            });

            if (!isInBasket) {
                this.basketGoods.push(basketGood);
            }

            setToStorage(LocalStorage.BasketGoods, this.basketGoods);
        },

        closeGood(): void {
            const result: IResultCloseGood = {
                isShowGood: false,
                selectedGood: EMPTY_GOOD,
            };

            this.$emit('closeGood', result);
        }
    },

    watch: {
        isShowGood() {
            this.imageRating = this.selectedGood.rating.rate >= 4.0 ? require("../../smile.svg") : require("../../bad.svg");
        }
    }

})
</script>

<style scoped>
    .modal-good-completely {
        width: 1200px;
        height: 800px;
        position: absolute;
        left: calc(50% - 1200px/2);
        top: calc(37% - 700px/2 + 72px);
        background-color: #FFFFFF;
        cursor: default;
    }

    .modal-text {
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        color: #7F89F8;
        font-size: 24px;
        text-transform: uppercase;
    }

    .modal-category {
        font-size: 16px;
        text-align: center;
        font-weight: 500;
    }

    .modal-title {
        font-size: 32px;
        margin: 20px 50px;
        text-align: center;
    }

    .modal-picture {
        margin-left: 490px;
    }

    .modal-price {
        text-align: center;
        margin: 23px 0 15px 0;
    }

    .modal-description {
        font-size: 20px;
        text-align: center;
        font-weight: 500;
        margin-top: 10px;
        padding: 10px 50px;
        text-transform: none;
    }

    .modal-background {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(3, 3, 3, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-rating {
        text-align: center;
        margin-bottom: 0;
        font-size: 26px;
    }

    .modal-rate {
        float: left;
        padding: 10px 10px 10px 200px;
        margin: 0 0 0 15px;
    }

    .modal-smile {
        float: left;
    }

    .modal-count {
        margin: 0;
        padding: 7px 0 0 800px;
    }
</style>