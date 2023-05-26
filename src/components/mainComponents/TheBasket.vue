<template>
    <div class="basket-background"
         @click="closeBasket">
        <div class="basket"
             @click="isNeedClose = false">
            <close-button
                @close="closeBasket"
                class="close-bn-position"
            />
            <h2 class="basket-title">{{basketText.Title}}</h2>
            <p v-if="!basketGoods.length"
               class="basket-no-goods">{{ getAbsenceGoods }}
            </p>
            <div class="basket-goods">
                <div v-for="basketGood in basketGoods"
                     :key="basketGood.id" class="basket-good">
                    <div>
                        <img :src="basketGood.image"
                             width="90"
                             height="120"
                             class="basket-img"
                             alt="picture good"
                        />
                        <h3 class="basket-title-good">{{ basketGood.title }}</h3>
                    </div>
                    <h3 class="basket-price">{{  (basketGood.price * basketGood.count).toFixed(2) }} {{ basketText.PriseSymbol }}</h3>
                    <div class="basket-count-goods">
                        <p class="count-goods">{{ basketGood.count }} {{ basketText.CountSymbol }}</p>
                        <button class="bn-basket-count-goods bn-basket-move"
                                @click="countGood(basketGood, basketText.Plus)">{{ basketText.Plus }}
                        </button>
                        <button class="bn-basket-count-goods bn-basket-move"
                                @click="countGood(basketGood, basketText.Minus)">{{ basketText.Minus }}
                        </button>
                    </div>
                    <button class="basket-bn basket-bn-delete"
                            @click="deleteGoodFromBasket(basketGood)">{{ basketText.Delete }}
                    </button>
                </div>
            </div>
            <h2 v-if="basketGoods.length"
                class="basket-total-sum">{{ basketText.TotalSum }} {{ totalSum }} {{ basketText.PriseSymbol }}
            </h2>
            <button class="basket-bn basket-bn-buy"
                    :disabled="!basketGoods.length"
                    @click="buyBasket">{{ basketText.Buy }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import CloseButton from "@/components/auxiliaryComponents/close-button.vue";
import {defineComponent, PropType} from "vue";
import IBasketGood from "@/interfaces/IBasketGood";
import {AbsenceGoods, BasketText} from "@/constApp/BaseText";
import {BorderCountGoods} from "@/constApp/FunctionalApp";
import {setToStorage} from "@/logicStorage/ActionsWithStorage";
import {LocalStorage} from "@/constApp/LocalStorage";

const EMITS = {
    DeleteGood: 'delete-good-from-basket',
    Close: 'close-basket'
};

export default defineComponent({
    name: "TheBasket",
    components: {CloseButton},

    props: {
        basketGoods: {
            required: true,
            type: Array as PropType<IBasketGood[]>
        }
    },

    data(): { basketText: typeof BasketText, isNeedClose: boolean } {
        return {
            basketText: BasketText,
            isNeedClose: true
        };
    },

    computed: {
        totalSum(): number {
            return +this.basketGoods.reduce((sum: number, good: IBasketGood) =>
                sum += good.price * good.count, 0).toFixed(BorderCountGoods.Rounding);
        },

        getAbsenceGoods() {
            return AbsenceGoods;
        },
    },

    methods: {
        countGood(basketGood: IBasketGood, identification: string): void {
            const border = BorderCountGoods;

            if (identification === this.basketText.Plus) {
                basketGood.count < border.Max ? ++basketGood.count : alert(BasketText.Limit);
                setToStorage(LocalStorage.BasketGoods, this.basketGoods);
                return;
            }

            basketGood.count > border.Min ? --basketGood.count : this.deleteGoodFromBasket(basketGood);
            setToStorage(LocalStorage.BasketGoods, this.basketGoods);
        },

        buyBasket(): void {
            alert(`${this.basketText.BuyText} ${this.totalSum} ${this.basketText.PriseSymbol}`);

            this.basketGoods.length = 0;
            setToStorage(LocalStorage.BasketGoods, this.basketGoods);
            this.closeBasket();
        },

        deleteGoodFromBasket(good : IBasketGood): void {
           this.$emit(EMITS.DeleteGood, this.basketGoods.filter((basketGood: IBasketGood) => good.id !== basketGood.id));
        },

        closeBasket(): void {
            if (!this.isNeedClose) {
                this.isNeedClose = true;
                return;
            }
            this.$emit(EMITS.Close, false);
        },
    }
});
</script>

<style scoped>
    .basket {
        width: 500px;
        height: 700px;
        position: absolute;
        left: 700px;
        top: 15%;
        background-color: #FFFFFF;
        color: #7F89F8;
        font-size: 16px;
        cursor: default;
    }

    .basket-background {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(3, 3, 3, 0.66);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
    }

    .close-bn-position {
        margin: 15px 0 0 430px;
    }

    .basket-no-goods {
        margin-top: 230px;
        font-size: 26px;
        text-align: center;
    }

    .basket-goods {
        overflow: auto;
        width: 500px;
        height: 500px;
    }

    .basket-good {
        margin-bottom: 50px;
    }

    .bn-basket-move:hover {
        transform: scale(1.05);
        cursor: pointer;
    }

    .basket-title {
        font-size: 32px;
        font-weight: 900;
        margin: 27px 0 20px 182px;
    }

    .basket-img {
        margin-left: 40px;
        float: left;
    }

    .basket-price {
        margin: 10px 0 10px 270px;
        font-size: 20px;
    }

    .basket-title-good {
        margin: 18px 0 0 150px;
        padding-top: 10px;
        display: block;
        text-align: center;
        width: 300px;
    }

    .basket-count-goods {
        display: inline;
        margin-left: 40px;
    }

    .bn-basket-count-goods {
        background-color: Transparent;
        color: #7F89F8;
        border: none;
        font-size: 20px;
        font-weight: bold;
    }

    .bn-basket-count-goods:hover {
        transform: scale(1.3);
        cursor: pointer;
    }

    .count-goods {
        display: inline;
        font-weight: bold;
    }

    .basket-bn {
        background-color: #7F89F8;
        border: none;
        font-size: 16px;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        font-weight: bold;
        text-transform: uppercase;
    }

    .basket-bn-delete {
        width: 100px;
        height: 30px;
        border: none;
        font-size: 16px;
        margin-left: 75px;
    }

    .basket-bn-delete:hover,
    .basket-bn-buy:hover:enabled {
        transform: scale(1.1);
        cursor: pointer;
    }

    .basket-bn-buy {
        width: 200px;
        height: 40px;
        font-size: 24px;
        position: fixed;
        top: 780px;
        left: 850px;
    }

    .basket-bn-buy:disabled {
        background-color: #AAAFEE;
    }

    .basket-total-sum {
        margin: 0;
        padding-left: 125px;
    }
</style>