<template>
    <div v-if="isShowBasket" class="basket-background">
        <div class="basket">
            <button class="bn-basket-close bn-basket-move" @click="closeBasket()"></button>
            <h2 class="basket-title">basket</h2>
            <p v-if="!basketGoods.length" class="basket-no-goods">Товаров нет</p>
            <div class="basket-goods">
                <div v-for="basketGood in basketGoods" :key="basketGood.id" class="basket-good">
                    <div>
                        <img :src="basketGood.image" width="90" height="120" class="basket-img" alt="picture good">
                        <h3 class="basket-title-good">{{ basketGood.title }}</h3>
                    </div>
                    <h3 class="basket-price">{{  (basketGood.price * basketGood.count).toFixed(2) }} $</h3>
                    <div class="basket-count-goods">
                        <p class="count-goods">{{ basketGood.count }} шт.</p>
                        <button style="margin-left: 10px" class="bn-basket-count-goods bn-basket-move" @click="plusCountGoods(basketGood)">+</button>
                        <button class="bn-basket-count-goods bn-basket-move" @click="minusCountGood(basketGood)">–</button>
                    </div>
                    <button class="basket-bn-delete" @click="deleteGoodFromBasket(basketGood)">delete</button>
                </div>
            </div>
            <h2 v-if="basketGoods.length" class="basket-total-sum">Total sum: {{ totalSum }} $</h2>
            <button class="basket-bn-buy" :disabled="!basketGoods.length" @click="buyBasket()">buy</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheBasket",

    props: {
        isShowBasket: Boolean,
        basketGoods: Array,
    },

    computed: {
        totalSum() {
            return this.basketGoods.reduce((sum, good) => sum += good.price * good.count, 0).toFixed(2);
        },
    },

    methods: {
        minusCountGood(basketGood) {
            basketGood.count > 1 ? --basketGood.count : this.deleteGoodFromBasket(basketGood);
        },

        plusCountGoods(basketGood) {
            basketGood.count < 100 ? ++basketGood.count : alert('Превышен лимит товаров')
        },

        buyBasket() {
            alert(`Вы успешно заказати товары!\nОжидайте подтверждения операции!\nСумма заказа: ${this.totalSum} $`)
            this.basketGoods.length = 0;
            this.closeBasket()
        },

        deleteGoodFromBasket(good) {
            console.log(this.basketGoods)
            this.basketGoods = this.basketGoods.filter(basketGood => good.id !== basketGood.id)
            console.log(this.basketGoods)
        },

        closeBasket() {
            this.$emit('closeBasket', false)
        }
    }
}
</script>

<style scoped>

</style>