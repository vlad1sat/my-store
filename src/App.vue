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

<!--        <div class="modal-background">
            <div class="modal-good-completely">
                <h2 class="modal-text text-up modal-title">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</h2>
                <h3 class="modal-text text-up modal-category">men's clothing</h3>
                <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" class="modal-picture" alt="picture-cloth" width="250" height="350">
                <p class="modal-text modal-description">Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday</p>
                <h2 class="modal-text text-up modal-rating">Rating:</h2>
                <div>
                    <p class="modal-text text-up modal-rate">rate: 3.9</p>
                    <img src="./smile.svg" alt="smile" width="44" height="44" class="modal-smile">
                </div>
                <p class="modal-text text-up modal-count">Count: 123</p>
            </div>
        </div>-->
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


//modal-good
<style>
    .modal-good-completely {
        width: 1200px;
        height: 700px;
        position: absolute;
        left: calc(50% - 1200px/2);
        top: calc(50% - 700px/2 + 72px);
        background-color: #FFFFFF;
    }

    .modal-text {
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        color: #7F89F8;
        font-size: 24px;
    }

    .text-up {
        text-transform: uppercase;
    }

    .modal-category {
        font-size: 16px;
        text-align: center;
        font-weight: 500;
    }

    .modal-title {
        font-size: 32px;
        text-align: center;
    }

    .modal-picture {
        padding-left: 475px;
    }

    .modal-description {
        font-size: 20px;
        text-align: center;
        font-weight: 500;
        padding: 10px 50px;
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
    }

    .modal-rating {
        text-align: center;
        margin-bottom: 0;
    }

    .modal-rate {
        float: left;
        padding: 10px;
        padding-left: 200px;
        margin: 0;
        margin-left: 15px;
    }

    .modal-smile {
        float: left;
    }

    .modal-count {
        margin: 0;
        padding: 7px 0 0 800px;
    }
</style>