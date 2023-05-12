<template>
    <div v-show="isShowSort" class="search-modal" @mousedown="moveSearcher" ref="searcher-window">
        <close-button @close="closeSearcher()" class="close-bn-position"></close-button>
        <h2 class="search-text search-text-title">{{ searcherText.Title }}</h2>
        <div class="search-main-window">
            <div class="search-div">
                <h2 class="search-text">{{ searcherText.Find }}</h2>
                <input :placeholder="searcherText.Placeholder"
                       v-model="searcher"
                       class="search-input"/>
                <good-button-action text-button="clean searcher"
                                    class="search-bn-clean"
                                    @click-button="() => this.searcher = ''">
                </good-button-action>
            </div>
            <select-searcher :title="searcherText.Sort"
                             :data-select="searcherText.CategoriesFilter"
                             @change-selector="(data: string) => sort = data" v-model:selector-test="sort"
                             @change-is-move="changeIsMove">
            </select-searcher>
            <select-searcher :title="searcherText.Filter"
                             :data-select="categories"
                             @change-selector="(data: string) => filterCategory = data"
                             @change-is-move="changeIsMove">
            </select-searcher>
        </div>
    </div>
</template>

<script lang="ts">
import SelectSearcher from "@/components/auxiliaryComponents/select-searcher.vue";
import CloseButton from "@/components/auxiliaryComponents/close-button.vue";
import {defineComponent, PropType} from "vue";
import IGoodApp from "@/interfaces/IGoodApp";
import IResultSearcher from "@/interfaces/emitResults/IResultSearcher";
import {SearcherText} from "@/constApp/BaseText";
import IDataSearcher from "@/interfaces/dataComponents/IDataSearcher";
import GoodButtonAction from "@/components/auxiliaryComponents/good-button-action.vue";
import {SearcherData} from "@/constApp/FunctionalApp";
import {pageMoveElement, startPosition} from "@/moveSearcher/MoveSearcher";

export default defineComponent({
    name: "TheSearcher",
    components: {GoodButtonAction, CloseButton, SelectSearcher},

    props: {
        isShowSort: {
            type: Boolean,
            required: true,
        },

        goods: {
            type: Array as PropType<IGoodApp[]>,
            required: true,
        }
    },

    $refs: {
        checkboxElement: HTMLFormElement
    },

    data()/*: IDataSearcher*/ {
        return {
            categoriesApp:  this.categories,
            searcher: '',
            sort: SearcherData.Delimiter,
            filterCategory: SearcherData.Delimiter,
            searcherText: SearcherText,
            isMove: true,
        };
    },

    mounted() {
        console.log(this.searcherWindow)
    },

    computed: {
        categories(): string[] | [] {
            return Array.from(new Set(this.goods.map((good: IGoodApp) => good.category)));
        },

        searcherWindow(): HTMLDivElement {
            return this.$refs["searcher-window"] as HTMLDivElement
        },
    },

    methods: {
        closeSearcher(): void {
            startPosition(this.searcherWindow, 1300, 178);
            this.$emit(SearcherData.EMITS.Close, false);
        },

        changeViewGood(): void {
            let result = this.goods.slice();

            result = this.changeViewGoodsSearcher(result);
            result = this.changeViewGoodsSort(result);
            result = this.changeViewGoodsFilter(result);

            this.sendResultSearch(result);
        },

        changeViewGoodsSearcher(goods: IGoodApp[]): IGoodApp[] {
            return this.searcher ? goods.filter((good: IGoodApp)=> good.title.toLowerCase().startsWith(this.searcher.toLowerCase())) : goods;
        },

        changeViewGoodsSort(goods: IGoodApp[]): IGoodApp[] {
            if (this.sort !== SearcherData.Delimiter) {
                if (this.sort === SearcherData.SortPrice) {
                    return goods.sort((good1: IGoodApp, good2: IGoodApp) => good1.price - good2.price);
                }
                return goods.sort((good1: IGoodApp, good2: IGoodApp) => good1.title.localeCompare(good2.title));
            }
            return goods;
        },

        changeViewGoodsFilter(goods: IGoodApp[]): IGoodApp[] {
            if (this.filterCategory !== SearcherData.Delimiter) {
                return goods.filter((good: IGoodApp) => good.category === this.filterCategory);
            }

            return goods;
        },

        moveSearcher(event: MouseEvent): void {
            if (this.isMove) {
                pageMoveElement(this.searcherWindow);
            }
        },

        changeIsMove(data: boolean) {
            this.isMove = data;
        },

        sendResultSearch(filterGoods: IGoodApp[]): void {
            const result: IResultSearcher = {
                filterGoods,
                isOnFilter: true,
            };

            this.$emit(SearcherData.EMITS.ChangeGoods, result);
        }
    },

    watch: {
        searcher(): void {
            this.changeViewGood();
        },

        sort(): void {
            this.changeViewGood();
        },

        filterCategory(): void {
            this.changeViewGood();
        }
    }
});
</script>

<style>
    .search-text {
        font-size: 16px;
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        text-transform: uppercase;
        color: #FFFFFF;
    }
</style>

<style scoped>
    .search-modal {
        width: 500px;
        height: 380px;
        position: fixed;
        left: 1300px;
        top: 178px;
        background-color: #202024;
        cursor: default;
        z-index: 1000;
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
        color: #202024;
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

    .search-bn-clean {
        height: 35px;
        width: 200px;
        margin: 15px 0 0 110px;
        text-transform: uppercase;
        font-size: 16px;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        font-weight: bold;
    }

    .close-bn-position {
        margin: 15px 0 0 440px;
    }
</style>