<template>
    <header class="header">
        <p class="header-text header-phone">PHONE: 8900000000</p>
        <p class="header-text header-name-store">VLAD1SAT STORE</p>
        <button class="header-basket" @click="openBasket()"></button>
    </header>
    <main>
        <p v-if="!goods.length">Товаров нет.</p>

        <div v-for="good in goods" :key="good.id" class="div-good" @click="openGood(good)">
            <h2 class="div-good-text div-good-title">{{good.title}}</h2>
            <img :src="good.image" width="250" height="300" alt="cloth" class="div-good-img">
            <h2 class="div-good-text div-good-title-category pd-55">RATING:</h2>
            <p class="div-good-text div-good-base-text pd-55">RATE: {{good.rating.rate}}&nbsp;&nbsp;&nbsp;&nbsp;COUNT: {{good.rating.count}}</p>
            <h2 class="div-good-text div-good-title-category pd-55">CATEGORY:</h2>
            <p class="div-good-text div-good-base-text pd-55">{{good.category}}</p>
        </div>

<!--basket-->
        <div class="basket-background" :class="{ showBasket: isShowBasket }">
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

<!--        good-->
        <div class="modal-background" :class="{ showGood: isShowGood }">
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
                <button class="bn-modal modal-text bn-modal-move" @click="addToBasket()">BUY</button>
            </div>
        </div>
    </main>
    <footer>

    </footer>
</template>

<script>

    export default {
        data() {
            return {
                goods:  [
                    {
                        category: "men's clothing",
                        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                        id: 1,
                        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                        price: 109.95,
                        rating: {rate: 3.9, count: 120},
                        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    },
                    {
                        category: "men's clothing",
                        description:"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
                        id: 2,
                        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                        price: 22.3,
                        rating: {rate: 4.1, count: 259},
                        title:"Mens Casual Premium Slim Fit T-Shirts "
                    },
                    {
                        category: "men's clothing",
                        description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
                        id: 4,
                        image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
                        price: 15.99,
                        rating: {rate: 2.1, count: 430},
                        title: "Mens Casual Slim Fit"
                    },
                    {
                        category: "jewelery",
                        description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
                        id: 5,
                        image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
                        price: 695,
                        rating: {rate: 4.6, count: 400},
                        title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
                    },
                    {
                        category: "men's clothing",
                        description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
                        id: 3,
                        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
                        price: 55.99,
                        rating: {rate: 4.7, count: 500},
                        title: "Mens Cotton Jacket"
                    }
                ],

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
                imageRating: require("./smile.svg"),

                isShowBasket: false,
                basketGoods: [],
            };
        },

        computed: {
            totalSum() {
                return this.basketGoods.reduce((sum, good) => sum += good.price * good.count, 0).toFixed(2);
            }
        },

        methods: {
            //goods
            openGood(good) {
                this.selectedGood = {
                    category: good.category,
                    description: good.description,
                    id: good.id,
                    image: good.image,
                    price: good.price,
                    title: good.title,
                    rating: {
                        rate: good.rating.rate,
                        count: good.rating.count,
                    },
                };

                this.imageRating = this.selectedGood.rating.rate >= 4.0 ? require("./smile.svg") : require("./bad.svg");
                this.isShowGood = true;
            },

            closeGood() {
                this.isShowGood = false;
                this.selectedGood = {
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
                };
            },

            //basket
            openBasket() {
                this.isShowBasket = true;
            },

            closeBasket() {
                this.isShowBasket = false;
            },

            addToBasket() {
                const good = {
                    title: this.selectedGood.title,
                    id: this.selectedGood.id,
                    count: 1,
                    price: this.selectedGood.price,
                    image: this.selectedGood.image
                };

                let isInBasket = false;

                if (good.title.split(' ').length > 6) {
                    good.title = good.title.split(' ').slice(0, 6).join(' ') + '...';
                }
                this.basketGoods.forEach(goodBasket => {
                    if (goodBasket.id === good.id) {
                        isInBasket = true;
                    }
                })

                if (!isInBasket) {
                    this.basketGoods.push(good)
                    console.log(this.basketGoods)
                }
                this.closeGood();
            },

            deleteGoodFromBasket(good) {
                console.log(this.basketGoods)
                this.basketGoods = this.basketGoods.filter(basketGood => good.id !== basketGood.id)
                console.log(this.basketGoods)
            },

            minusCountGood(basketGood) {
                basketGood.count > 1 ? --basketGood.count : this.deleteGoodFromBasket(basketGood);
            },

            plusCountGoods(basketGood) {
                basketGood.count < 100 ? ++basketGood.count : alert('Превышен лимит товаров')
            },

            buyBasket() {
                alert(`Вы успешно заказати товары!\nОжидайте подтверждения операции!\nСумма заказа: ${this.totalSum} $`)
                this.basketGoods = []
                this.closeBasket()
            }

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

    .header-basket {
        background: Transparent no-repeat url("basket-img.svg");
        width: 90px;
        height: 90px;
        border: none;
        margin: 30px 0 0 484px;
        cursor: pointer;
    }

    .header-basket:hover {
        transform: scale(1.1);
    }

    .header-phone:hover {
        opacity: 0.5;
    }
</style>

//good
<style>
    .div-good {
        width: 400px;
        height: 600px;
        background-color: #7F89F8;
        margin-top: 80px;
        cursor: pointer;
        margin-left: 55px;
        float: left;
    }

    .div-good:hover {
        transform: scale(1.01);
    }

    .div-good-text {
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        font-size: 20px;
        color: #FFFFFF;
        text-transform: uppercase;
    }

    .div-good-title {
        text-align: center;
        font-size: 24px;
    }

    .div-good-img {
        padding-left: 75px;
    }

    .div-good-base-text {
        font-size: 16px;
    }

    .pd-55 {
        padding-left: 55px;
    }
</style>


//modal-good
<style>
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
        visibility: hidden;
    }

    .showGood {
        visibility: visible;
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

    .bn-modal {
        width: 150px;
        height: 50px;
        color: #FFFFFF;
        background-color: #7F89F8;
        border: none;
        margin: 5px 0 0 145px;
    }

    .bn-modal-close {
        width: 40px;
        height: 40px;
        background: Transparent no-repeat url("close.svg");
        border: none;
        margin: 20px 0 0 1130px;
        position: absolute;
    }

    .bn-modal-move:hover
    {
        transform: scale(1.05);
        cursor: pointer;
    }
</style>

//basket
<style>
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
        visibility: hidden;
    }

    .showBasket {
        visibility: visible;
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
        background: Transparent no-repeat url("close.svg");
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
        top: 770px;
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
        padding-left: 130px;
    }


</style>
