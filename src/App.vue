<template>
  <header class="header">
    <p class="header-text header-phone">PHONE: 8900000000</p>
    <p class="header-text header-name-store">VLAD1SAT STORE</p>
    <button @click=openBasket() class="header-basket"></button>
  </header>
  <main>
    <div v-for="good in goods" :key="good.id" class="div-good" @click="openGood()">
        <h2 class="div-good-text div-good-title">{{good.title}}</h2>
        <img :src="good.image" width="250" height="300" alt="cloth" class="div-good-img">
        <h2 class="div-good-text div-good-title-category pd-55">RATING:</h2>
        <p class="div-good-text div-good-base-text pd-55">RATE: {{good.rating.rate}}&nbsp;&nbsp;&nbsp;&nbsp;COUNT: {{good.rating.count}}</p>
        <h2 class="div-good-text div-good-title-category pd-55">CATEGORY:</h2>
        <p class="div-good-text div-good-base-text pd-55">{{good.category}}</p>
    </div>
  </main>
  <footer>

  </footer>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                goods: [
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
                        id:2,
                        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                        price: 22.3,
                        rating: {rate: 4.1, count: 259},
                        title:"Mens Casual Premium Slim Fit T-Shirts "
                    },
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
                        id:2,
                        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                        price: 22.3,
                        rating: {rate: 4.1, count: 259},
                        title:"Mens Casual Premium Slim Fit T-Shirts "
                    },
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
                        id:2,
                        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                        price: 22.3,
                        rating: {rate: 4.1, count: 259},
                        title:"Mens Casual Premium Slim Fit T-Shirts "
                    }]
            }
        },

        methods: {
            openBasket() {
                alert('open')
            },

            openGood() {
                alert('open')
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
    }

    .div-good-title {
        text-align: center;
        font-size: 28px;
    }

    .div-good-title-category {

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
