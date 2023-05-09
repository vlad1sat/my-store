<template>
    <header class="header">
        <p class="header-text header-phone">{{ headerText.Phone }}</p>
        <p class="header-text header-name-store">{{ headerText.Name }}</p>
        <button class="header-magnifier" @click="viewSort()"></button>
        <button class="header-favorites" @click="viewFavorites()" :class="{ 'open-favorites': isShowFavorites }"></button>
        <button class="header-basket" @click="openBasket()"></button>
    </header>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import IResultOpenBasket from "@/interfaces/emitResults/IResultOpenBasket";
import {HeaderText} from "@/constApp/BaseText";

export default defineComponent({
    name: "TheHeader",

    props: {
        isShowSort: {
            type: Boolean,
            required: true,
        },

        isShowFavorites: {
            type: Boolean,
            required: true,
        }
    },

    data(): { headerText: typeof HeaderText } {
        return {
            headerText: HeaderText
        };
    },

    methods: {
        viewSort(): void {
            this.$emit('viewSort', !this.isShowSort);
        },

        viewFavorites(): void {
            this.$emit('viewFavorites', !this.isShowFavorites);
        },

        openBasket(): void {
            const result : IResultOpenBasket = {
                isShowBasket: true,
                isShowSort: false,
            };

            this.$emit('openBasket', result);
        },
    }
});
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
        background: Transparent no-repeat url("../../magnifier.svg");
        width: 70px;
        height: 70px;
        border: none;
        cursor: pointer;
        margin: 40px 5px 0 250px;
    }

    .header-basket {
        background: Transparent no-repeat url("../../basket.svg");
        width: 90px;
        height: 90px;
        border: none;
        margin: 30px 5px 0 0;
        cursor: pointer;
    }

    .header-favorites {
        background: Transparent no-repeat url("../../favourites.svg");
        width: 80px;
        height: 80px;
        border: none;
        margin-top: 37px;
        cursor: pointer;
    }

    .open-favorites {
        background-image: url("../../favourites-use.svg");
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