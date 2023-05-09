<template>
    <div class="div-good" @click="openGood(good)">
        <h2 class="div-good-text div-good-title">{{good.title}}</h2>
        <img :src="good.image" width="250" height="300" alt="cloth" class="div-good-img">
        <h2 class="div-good-text div-good-title-category pd-55">RATING:</h2>
        <p class="div-good-text div-good-base-text pd-55">RATE: {{good.rating.rate}}&nbsp;&nbsp;&nbsp;&nbsp;COUNT: {{good.rating.count}}</p>
        <h2 class="div-good-text div-good-title-category pd-55">CATEGORY:</h2>
        <p class="div-good-text div-good-base-text pd-55" style="margin-bottom: 0; display: inline">{{good.category}}</p>
        <button class="div-good-bn-like" :class="{ 'div-good-bn-like-active': good.isLikeBnActive }" @click.stop="addToFavoriteLike(good)"></button>
    </div>
</template>

<script lang="ts">
import IGoodApp from "@/interfaces/IGoodApp";
import {PropType, defineComponent} from "vue";
import IResultOpenGood from "@/interfaces/emitResults/IResultOpenGood";

export default defineComponent({
    name: "GoodCard",

    props: {
        good: {
            type: Object as PropType<IGoodApp>,
            required: true,
        },
    },

    methods: {
        addToFavoriteLike(good: IGoodApp): void {
            good.isLikeBnActive = !good.isLikeBnActive;
        },

        openGood(selectedGood: IGoodApp): void {

            const result: IResultOpenGood = {
                selectedGood,
                isShowSort: false,
                isShowGood: true,
            };

            this.$emit('openGood', result);
        },
    },
})
</script>

<style scoped>
    .div-good {
        width: 400px;
        height: 600px;
        background-color: #7F89F8;
        margin-top: 50px;
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

    .div-good-bn-like {
        background: Transparent no-repeat url("../../like-empty.svg");
        width: 50px;
        height: 50px;
        border: none;
        cursor: pointer;
        position: relative;
        float: right;
        display: block;
    }

    .div-good-bn-like:hover {
        transform: scale(1.05);
    }

    .div-good-bn-like-active {
        background: Transparent no-repeat url("../../like.svg");
    }

</style>