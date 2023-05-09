<template>
    <div>
        <h2 class="search-text">{{ title }}</h2>
        <select v-model="selector" class="search-sort">
            <option disabled>CHOOSE SORT</option>
            <option v-for="elData in data">{{ elData }}</option>
            <option selected>–</option>
        </select>
    </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import {defineComponent} from "vue";
import IDataSelectSearcher from "@/interfaces/dataComponents/IDataSelectSearcher";

export default defineComponent({
    name: "selectSearcher",

    props: {
        title: {
            type: String,
            required: true
        },
        data: {
            type: Array as PropType<string[]>,
            required: true
        },
    },

    data(): { selector: string } {
        return {
            selector: '–',
        }
    },

    watch: {
        selector(): void {
            this.$emit('changeSelector', this.selector);
        }
    }

})
</script>

<style scoped>
    .search-sort {
        width: 200px;
        height: 30px;
        font-size: 16px;
        color: #7F89F8;
        font-family: 'Inter', sans-serif;
        border: #7F89F8 2px solid;
        border-radius: 7px;
    }

    .search-text {
        font-size: 16px;
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        text-transform: uppercase;
        color: #7F89F8;
    }
</style>