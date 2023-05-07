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

<script>
export default {
    name: "GoodCard",

    props: {
        good: Object,
    },

    data() {
        return {};
    },

    methods: {
        addToFavoriteLike(good) {
            good.isLikeBnActive = !good.isLikeBnActive;
        },

        //goods
        openGood(good) {
            const selectedGood = {
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

            this.$emit('openGood', {
                selectedGood,
                isShowSort: false,
                isShowGood: true,
            })
        },
    },
}
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
        background: Transparent no-repeat url("../like-empty.svg");
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
        background: Transparent no-repeat url("../like.svg");
    }

    .text-no-goods {
        font-size: 40px;
        color: #7F89F8;
        text-align: center;
        margin-top: 80px;
    }

</style>