<template>
    <div v-if="isShowGood" class="modal-background">
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
import goodButtonAction from "@/components/auxiliaryComponents/goodButtonAction.vue";
import CloseButton from "@/components/auxiliaryComponents/closeButton.vue";

import {defineComponent, PropType} from "vue";

import IGoodApp from "@/interfaces/IGoodApp";
import IBasketGood from "@/interfaces/IBasketGood";
import IResultCloseGood from "@/interfaces/emitResults/IResultCloseGood";

import {ModalGoodText} from "@/enumsApp/BaseText";
import IDataModalGood from "@/interfaces/dataComponents/IDataModalGood";

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

            alert("Товар успешно добавлен в избранное!");
        },

        addToBasket(): void {
            //fix
            const good: IBasketGood = {
                title: this.selectedGood.title,
                id: this.selectedGood.id,
                count: 1,
                price: this.selectedGood.price,
                image: this.selectedGood.image
            };

            if (good.title.split(' ').length > 6) {
                good.title = good.title.split(' ').slice(0, 6).join(' ') + '...';
            }

            let isInBasket = false;
            this.basketGoods.forEach((goodBasket: IBasketGood) => {
                if (goodBasket.id === good.id) {
                    isInBasket = true;
                    ++goodBasket.count;
                }
            })

            if (!isInBasket) {
                this.basketGoods.push(good)
            }

            this.closeGood();
        },

        closeGood(): void {
            const result: IResultCloseGood = {
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
            };

            this.$emit('closeGood', result);
        },
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