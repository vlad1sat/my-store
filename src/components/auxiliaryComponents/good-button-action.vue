<template>
    <button class="bn-modal" @click="clickButton()">{{ textButton }}</button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "good-button-action",

    props: {
        textButton: {
            type: String,
            required: true
        }
    },

    methods: {
        clickButton(): void {
            this.$emit('click-button');
        }
    }
})
</script>

<style scoped>
    .bn-modal {
        width: 150px;
        height: 50px;
        color: #FFFFFF;
        background-color: #7F89F8;
        border: none;
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        margin-top: 30px;
        font-size: 20px;
        text-transform: uppercase;
    }

    .bn-modal:hover {
        transform: scale(1.01);
        cursor: pointer;
    }
</style>