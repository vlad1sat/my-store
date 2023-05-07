<template>
    <header class="header">
        <p class="header-text header-phone">PHONE: 8900000000</p>
        <p class="header-text header-name-store">VLAD1SAT STORE</p>
        <button class="header-magnifier" @click="viewSort()"></button>
        <button class="header-favorites" @click="openFavorites()" :class="{ 'open-favorites': isShowFavorites }"></button>
        <button class="header-basket" @click="openBasket()"></button>
    </header>
</template>

<script>
export default {
    name: "TheHeader",

    props: {
        isShowSort: Boolean,
        isShowFavorites: Boolean,
    },

    data() {
        return {};
    },

    methods: {

        viewSort() {
            this.$emit('viewSort', !this.isShowSort);
        },

        /*openFavorites() {
            this.$emit('openFavorites', !this.isShowFavorites);
        },*/

        openBasket() {
            this.$emit('openBasket', {
                isShowBasket: true,
                isShowSort: false,
            });
        },
    }
}
</script>

<style scoped>
    .header {
        height: 150px;
        width: 100%;
        background-color: #7F89F8;
        color: #FFFFFF;
        display: flex;
        position: fixed;
        border-bottom: 5px #FFFFFF solid;
        z-index: 1;
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

    .header-magnifier {
        background: Transparent no-repeat url("../magnifier.svg");
        width: 70px;
        height: 70px;
        border: none;
        cursor: pointer;
        margin: 40px 5px 0 250px;
    }

    .header-basket {
        background: Transparent no-repeat url("../basket.svg");
        width: 90px;
        height: 90px;
        border: none;
        margin: 30px 5px 0 0;
        cursor: pointer;
    }

    .header-favorites {
        background: Transparent no-repeat url("../favourites.svg");
        width: 80px;
        height: 80px;
        border: none;
        margin-top: 37px;
        cursor: pointer;
    }

    .open-favorites {
        background-image: url("../favourites-use.svg");
    }

    .header-basket:hover,
    .header-favorites:hover,
    .header-magnifier:hover {
        transform: scale(1.1);
    }

    .header-phone:hover {
        opacity: 0.5;
    }
</style>