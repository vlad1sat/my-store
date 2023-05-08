<template>
    <div v-if="isShowGood" class="modal-background">
        <div class="modal-good-completely">
            <close-button @close="closeGood()"></close-button>
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
            <good-button-action @clickButton="addToFavoriteGood"
                                      :text-button="'add to favorite list'">
            </good-button-action>
            <good-button-action @clickButton="addToBasket"
                                      :text-button="'add to basket'">
            </good-button-action>
        </div>
    </div>
</template>

<script>
import goodButtonAction from "@/components/auxiliaryComponents/goodButtonAction.vue";
import closeButton from "@/components/auxiliaryComponents/closeButton.vue";
import CloseButton from "@/components/auxiliaryComponents/closeButton.vue";

export default {
    name: "TheModalGood",
    components: {CloseButton, goodButtonAction},

    props: {
        isShowGood: Boolean,
        selectedGood: Object,
        basketGoods: Array,
        goods: Array,
    },

    data() {
        return {
            imageRating: require("../../smile.svg"),
        }
    },

    methods: {
        addToFavoriteGood() {
            this.goods.find(baseGood => {
                if (baseGood.id === this.selectedGood.id) {
                    baseGood.isLikeBnActive = true;
                }
            });

            alert("Товар успешно добавлен в избранное!");
        },

        addToBasket() {
            const good = {
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
            this.basketGoods.forEach(goodBasket => {
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

        closeGood() {
            this.$emit('closeGood', {
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
                },
            });
        },
    },

    watch: {
        isShowGood() {
            this.imageRating = this.selectedGood.rating.rate >= 4.0 ? require("../../smile.svg") : require("../../bad.svg");
        }
    }

}
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