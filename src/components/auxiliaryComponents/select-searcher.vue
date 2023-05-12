<template>
    <div>
        <h2 class="search-text">{{ title }}</h2>
        <select v-model="selector" class="search-sort" @mouseover="isMove = false" @mouseout="isMove = true">
            <option disabled>CHOOSE SORT</option>
            <option v-for="elData in dataSelect">{{ elData }}</option>
            <option selected>–</option>
        </select>
    </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import {defineComponent} from "vue";
import IDataSelectSearcher from "@/interfaces/dataComponents/IDataSelectSearcher";

export default defineComponent({
    name: "select-searcher",

    props: {
        title: {
            type: String,
            required: true
        },

        dataSelect: {
            type: Array as PropType<string[]>,
            required: true
        }
    },

    data(): IDataSelectSearcher {
        return {
            selector: '–',
            isMove: true,
        };
    },

    watch: {
        selector(): void {
            this.$emit('change-selector', this.selector);
        },

        isMove(): void {
            this.$emit('change-is-move', this.isMove);
        }
    }
});
</script>

<style scoped>
    .search-sort {
        width: 200px;
        height: 30px;
        font-size: 16px;
        color: #7F89F8;
        font-family: 'Inter', sans-serif;
        border: #7F89F8 3px solid;
        border-radius: 7px;
    }
</style>