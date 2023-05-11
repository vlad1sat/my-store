<template>
    <div v-show="isShowBasket" class="basket-background">
        <div class="basket">
            <close-button @close="closeBasket()"></close-button>
            <h2 class="basket-title">{{basketText.Title}}</h2>
            <p v-if="!basketGoods.length" class="basket-no-goods">{{ basketText.AbsenceGoods }}</p>
            <div class="basket-goods">
                <div v-for="basketGood in basketGoods" :key="basketGood.id" class="basket-good">
                    <div>
                        <img :src="basketGood.image" width="90" height="120" class="basket-img" alt="picture good">
                        <h3 class="basket-title-good">{{ basketGood.title }}</h3>
                    </div>
                    <h3 class="basket-price">{{  (basketGood.price * basketGood.count).toFixed(2) }} {{ basketText.PriseSymbol }}</h3>
                    <div class="basket-count-goods">
                        <p class="count-goods">{{ basketGood.count }} {{ basketText.CountSymbol }}</p>
                        <button style="margin-left: 10px" class="bn-basket-count-goods bn-basket-move" @click="countGood(basketGood, basketText.Plus)">{{ basketText.Plus }}</button>
                        <button class="bn-basket-count-goods bn-basket-move" @click="countGood(basketGood, basketText.Minus)">{{ basketText.Minus }}</button>
                    </div>
                    <button class="basket-bn-delete" @click="deleteGoodFromBasket(basketGood)">{{ basketText.Delete }}</button>
                </div>
            </div>
            <h2 v-if="basketGoods.length" class="basket-total-sum">{{ basketText.TotalSum }} {{ totalSum }} {{ basketText.PriseSymbol }}</h2>
            <button class="basket-bn-buy" :disabled="!basketGoods.length" @click="buyBasket()">{{ basketText.Buy }}</button>
        </div>
    </div>
</template>

<script lang="ts">
import CloseButton from "@/components/auxiliaryComponents/close-button.vue";
import {defineComponent, PropType} from "vue";
import IBasketGood from "@/interfaces/IBasketGood";
import {BasketText} from "@/constApp/BaseText";
import {BorderCountGoods} from "@/constApp/FunctionalApp";
import {setToStorage} from "@/logicStorage/ActionsWithStorage";
import {LocalStorage} from "@/constApp/LocalStorage";

export default defineComponent({
    name: "TheBasket",
    components: {CloseButton},

    props: {
        isShowBasket: {
            type: Boolean,
            required: true
        },

        basketGoods: {
            required: true,
            type: Array as PropType<IBasketGood[]>
        }
    },

    data(): { basketText: typeof BasketText } {
        return {
            basketText: BasketText
        };
    },

    computed: {
        totalSum(): number {
            return +this.basketGoods.reduce((sum: number, good: IBasketGood) => sum += good.price * good.count, 0).toFixed(2);
        }
    },

    methods: {
        countGood(basketGood: IBasketGood, identification: string): void {
            const border = BorderCountGoods;

            if (identification === this.basketText.Plus) {
                basketGood.count < border.Max ? ++basketGood.count : alert('Превышен лимит товаров');
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
           this.$emit('deleteGoodFromBasket', this.basketGoods.filter((basketGood: IBasketGood) => good.id !== basketGood.id));
        },

        closeBasket(): void {
            this.$emit('closeBasket', false);
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
        font-family: 'Inter', sans-serif;
        color: #7F89F8;
        text-transform: uppercase;
        font-weight: bold;
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

    .basket-no-goods {
        margin-top: 230px;
        font-weight: 900;
        font-size: 26px;
        text-align: center;
    }

    .bn-basket-close {
        width: 40px;
        height: 40px;
        background: Transparent no-repeat url("elementsDesign/close.svg");
        margin: 20px 0 0 430px;
        border: none;
        position: absolute;
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
        font-weight: 900;
        font-size: 32px;
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
    }

    .basket-bn-delete {
        width: 100px;
        height: 30px;
        background-color: #7F89F8;
        border: none;
        font-size: 16px;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        font-weight: bold;
        text-transform: uppercase;
        margin-left: 75px;
    }

    .basket-bn-delete:hover {
        transform: scale(1.1);
        cursor: pointer;
    }

    .basket-bn-buy {
        width: 200px;
        height: 40px;
        background-color: #7F89F8;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        font-weight: bold;
        text-transform: uppercase;
        border: none;
        font-size: 24px;
        position: fixed;
        top: 780px;
        left: 850px;
    }

    .basket-bn-buy:hover:enabled {
        transform: scale(1.1);
        cursor: pointer;
    }

    .basket-bn-buy:disabled {
        background-color: #AAAFEE;
    }

    .basket-total-sum {
        margin: 0;
        padding-left: 125px;
    }
</style>