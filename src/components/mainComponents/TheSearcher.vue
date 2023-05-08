<template>
    <div v-if="isShowSort" class="search-modal">
        <close-button @close="closeSearcher()"></close-button>
        <h2 class="search-text search-text-title">SETUP</h2>
        <div class="search-main-window">
            <div class="search-div">
                <h2 class="search-text">Поиск по странице</h2>
                <input placeholder="Введите название интересуещего товара" v-model="searcher" class="search-input"/>
            </div>
            <select-searcher :title="'сортировка по:'"
                             :data="['prise', 'alphabet']"
                             @changeSelector="(data) => sort = data">
            </select-searcher>
            <select-searcher :title="'фильтрация по:'"
                             :data="categories"
                             @changeSelector="(data) => filterCategory = data">
            </select-searcher>
            <button class="search-bn" @click="cleanFilter()">Clean</button>
        </div>
    </div>
</template>

<script>
import SelectSearcher from "@/components/auxiliaryComponents/selectSearcher.vue";
import CloseButton from "@/components/auxiliaryComponents/closeButton.vue";

export default {
    name: "TheSearcher",

    components: {CloseButton, SelectSearcher},

    props: {
        isShowSort: Boolean,
        goods: Array,
    },

    data() {
        return {
            categoriesApp: this.categories,
            searcher: '',
            sort: '–',
            filterCategory: '–',
        };
    },

    computed: {
        categories() {
            return Array.from(new Set(this.goods.map(good => good.category)));
        },
    },

    methods: {
        cleanFilter() {
            this.searcher = '';
            this.sort = '–';
            this.filterCategory = '–';
            this.sendResultSearch(this.goods);
        },

        closeSearcher() {
            this.$emit('closeSearcher', false);
        },

        changeViewGood() {
            let result = this.goods.slice();

            result = this.changeViewGoodsSearcher(result);
            result = this.changeViewGoodsSort(result);
            result = this.changeViewGoodsFilter(result);

            this.sendResultSearch(result);
        },

        changeViewGoodsSearcher(goods) {
            return this.searcher ? goods.filter(good => good.title.toLowerCase().startsWith(this.searcher.toLowerCase())) : goods;
        },

        changeViewGoodsSort(goods) {
            if (this.sort !== '–') {
                if (this.sort === "price") {
                    return goods.sort((el1, el2) => el1.price - el2.price);
                }

                if (this.sort === "alphabet") {
                    return goods.sort((el1, el2) => el1.title.localeCompare(el2.title));
                }
            }

            return goods;
        },

        changeViewGoodsFilter(goods) {
            if (this.filterCategory !== '–') {
                return  goods.filter(good => good.category === this.filterCategory);
            }

            return goods;
        },

        sendResultSearch(result) {
            this.$emit('changeViewGoods', {
                filterGoods: result,
                isOnFilter: true,
            });
        },
    },

    watch: {
        searcher() {
            this.changeViewGood();
        },

        sort() {
            this.changeViewGood();
        },

        filterCategory() {
            this.changeViewGood();
        },
    }

}
</script>

<style scoped>
    .search-modal {
        width: 500px;
        height: 350px;
        position: fixed;
        left: 1300px;
        top: 178px;
        background-color: #FFFFFF;
        cursor: default;
        z-index: 1000;
    }

    .bn-basket-close {
        width: 40px;
        height: 40px;
        background: Transparent no-repeat url("../../close.svg");
        margin: 20px 0 0 430px;
        border: none;
        position: absolute;
    }

    .search-text {
        font-size: 16px;
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        text-transform: uppercase;
        color: #7F89F8;
    }

    .search-text-title {
        text-align: center;
        margin: 20px 0;
        font-size: 32px;
    }

    .search-input {
        width: 400px;
        height: 30px;
        font-size: 16px;
        color: #7F89F8;
        font-family: 'Inter', sans-serif;
        border: #7F89F8 2px solid;
        border-radius: 7px;
    }

    .search-main-window {
        margin-left: 35px;
    }

    .search-input:focus {
        transform: scale(1.01);
        outline: none;
    }

    .search-bn {
        margin: 10px 0 0 200px;
        width: 100px;
        height: 30px;
        background-color: #7F89F8;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        text-transform: uppercase;
        font-weight: 900;
        border: 0;
    }

    .search-bn:hover {
        transform: scale(1.05);
    }
</style>
