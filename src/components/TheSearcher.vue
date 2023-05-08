<template>
    <div v-if="isShowSort" class="search-modal">
        <button class="bn-basket-close bn-basket-move"
                @click="closeSearcher()">
        </button>
        <h2 class="search-text search-text-title">SETUP</h2>
        <div class="search-main-window">
            <div class="search-div">
                <h2 class="search-text">Поиск по странице</h2>
                <input placeholder="Введите название интересуещего товара" v-model="searcher" class="search-input"/>
            </div>
            <div>
                <h2 class="search-text">сортировка по:</h2>
                <select v-model="sort" class="search-sort">
                    <option disabled>Выберите сортировку</option>
                    <option value="1">prise</option>
                    <option value="2">alphabet</option>
                    <option>–</option>
                </select>
            </div>
            <div>
                <h2 class="search-text">фильтрация по:</h2>
                <select v-model="filterCategory" class="search-sort">
                    <option disabled>Выберите фильтрацию</option>
                    <option v-for="(category, index) in categories" :key="index">{{ category }}</option>
                    <option>–</option>
                </select>
            </div>
            <button class="search-bn" @click="cleanFilter()">Clean</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheSearcher",

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
            return new Set(this.goods.map(good => good.category))
        },
    },

    methods: {
        cleanFilter() {
            this.sort = '–';
            this.filterCategory = '–';
            this.searcher = '';
        },

        closeSearcher() {
            this.$emit('closeSearcher', false);
        },

        changeViewGoodsSearcher(searcher) {
            let result = this.goods.slice();

            if (searcher) {
                result = result.filter(good => good.title.toLowerCase().startsWith(this.searcher.toLowerCase()));
            }

            this.sendResultSearch(result);
        },

        changeViewGoodsSort(sort) {
            let result = this.goods.slice();

            if (sort !== '–') {
                if (sort === "1") {
                    result = result.sort((el1, el2) => el1.price - el2.price);
                } else {
                    result = result.sort((el1, el2) => el1.title.localeCompare(el2.title))
                }
            }

            this.sendResultSearch(result);
        },

        changeViewGoodsFilter(filter) {
            let result = this.goods.slice();

            if (filter !== '–') {
                result = result.filter(good => good.category === this.filterCategory);
            }

            this.sendResultSearch(result);
        },

        sendResultSearch(result) {
            this.$emit('changeViewGoods', {
                filterGoods: result,
                isOnFilter: true,
            });
        },

    },

    watch: {
        searcher(newValue) {
            this.changeViewGoodsSearcher(newValue);
        },

        sort(newValue) {
            this.changeViewGoodsSort(newValue);
        },

        filterCategory(newValue) {
            this.changeViewGoodsFilter(newValue);
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
        background: Transparent no-repeat url("../close.svg");
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

    .search-sort {
        width: 200px;
        height: 30px;
        font-size: 16px;
        color: #7F89F8;
        font-family: 'Inter', sans-serif;
        border: #7F89F8 2px solid;
        border-radius: 7px;
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
