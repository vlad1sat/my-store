<template>
    <div class="div-good" @click="openGood(good)">
        <h2 class="div-good-text div-good-title">{{good.title}}</h2>
        <div class="center-img">
            <img :src="good.image" alt="cloth" class="div-good-img">
        </div>
        <h2 class="div-good-text div-good-title-category pd-55">RATING:</h2>
        <p class="div-good-text div-good-base-text pd-55">
            {{goodCardText.RATING.Rate}} {{good.rating.rate}}&nbsp;&nbsp;&nbsp;&nbsp;{{goodCardText.RATING.Count}} {{good.rating.count}}</p>
        <h2 class="div-good-text div-good-title-category pd-55">{{goodCardText.Category}}</h2>
        <p class="div-good-text div-good-base-text pd-55" id="category2">{{good.category}}</p>
        <button class="div-good-bn-like"
                :class="{ 'div-good-bn-like-active': good.isLikeBnActive }"
                @click.stop="addToFavoriteLike(good)">
        </button>
    </div>
</template>

<script lang="ts">
import IGoodApp from "@/interfaces/IGoodApp";
import {PropType, defineComponent} from "vue";
import IResultOpenGood from "@/interfaces/emitResults/IResultOpenGood";
import {GoodCardText} from "@/constApp/BaseText";

export default defineComponent({
    name: "GoodCard",

    props: {
        good: {
            type: Object as PropType<IGoodApp>,
            required: true,
        }
    },

    data(): { goodCardText: typeof GoodCardText } {
        return {
            goodCardText: GoodCardText
        };
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

            this.$emit('open-good', result);
        }
    }
});
</script>

<style scoped>
    .div-good {
        width: 400px;
        height: 650px;
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
        height: 100px;
    }

    .div-good-img {
        width: auto;
        max-width: 300px;
        height: 300px;
    }

    .div-good-base-text {
        font-size: 16px;
    }

    .pd-55 {
        padding-left: 55px;
    }

    .div-good-bn-like {
        background: Transparent no-repeat url("../../elementsDesign/likes/like-empty.svg");
        width: 50px;
        height: 50px;
        border: none;
        cursor: pointer;
        position: relative;
        float: right;
        display: block;
        margin-right: 20px;
    }

    .div-good-bn-like:hover {
        transform: scale(1.05);
    }

    .div-good-bn-like-active {
        background: Transparent no-repeat url("../../elementsDesign/likes/like.svg");
    }

    #category2 {
        margin-bottom: 0;
        display: inline;
    }
</style>