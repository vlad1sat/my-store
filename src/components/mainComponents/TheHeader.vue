<template>
    <header class="header">
        <p class="header-text header-phone">{{ headerText.Phone }}</p>
        <p class="header-text header-name-store">{{ headerText.Name }}</p>
        <div class="header-main-bn">
            <button
                class="header-magnifier"
                @click="viewSort">
            </button>
            <button
                class="header-favorites"
                @click="viewFavorites"
                :class="{ 'open-favorites': isShowFavorites }">
            </button>
            <button
                class="header-basket"
                @click="openBasket">
            </button>
        </div>
    </header>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import IResultOpenBasket from "@/interfaces/emitResults/IResultOpenBasket";
import {HeaderText} from "@/constApp/BaseText";
import {THeader} from "@/constApp/TypesConst";

const EMITS = {
    Sort: 'view-sort',
    Favorite: 'view-favorites',
    Basket: 'open-basket'
};

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

    data(): { headerText: Readonly<THeader> } {
        return {
            headerText: HeaderText
        };
    },

    methods: {
        viewSort(): void {
            this.$emit(EMITS.Sort, !this.isShowSort);
        },

        viewFavorites(): void {
            this.$emit(EMITS.Favorite, !this.isShowFavorites);
        },

        openBasket(): void {
            const result : IResultOpenBasket = {
                isShowBasket: true,
                isShowSort: false,
            };

            this.$emit(EMITS.Basket, result);
        },
    }
});
</script>

<style scoped>
    .header {
        height: 150px;
        width: 100%;
        background-color: #202024;
        color: #FFFFFF;
        display: flex;
        position: fixed;
        border-bottom: 5px #FFFFFF solid;
        z-index: 1;
        margin: 0;
        align-items: center;
        justify-content: space-between;
    }

    .header-text {
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        text-transform: uppercase;
    }

    .header-phone {
        font-size: 24px;
        cursor: pointer;
        margin-left: 100px;
    }

    .header-name-store {
        font-size: 48px;
        text-align: center;
        cursor: default;
    }

    .header-magnifier {
        background: Transparent no-repeat url("../../elementsDesign/header/magnifier.svg");
        width: 75px;
        height: 75px;
        border: none;
        cursor: pointer;
    }

    .header-basket {
        background: Transparent no-repeat url("../../elementsDesign/header/basket.svg");
        width: 90px;
        height: 90px;
        border: none;
        cursor: pointer;
    }

    .header-favorites {
        background: Transparent no-repeat url("../../elementsDesign/header/favourites.svg");
        width: 80px;
        height: 80px;
        border: none;
        cursor: pointer;
    }

    .open-favorites {
        background-image: url("../../elementsDesign/header/favourites-use.svg");
    }

    .header-main-bn {
        padding-right: 100px;
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