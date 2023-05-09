<template>
    <button class="bn-modal modal-text bn-modal-move" @click="clickButton()">{{ textButton }}</button>
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
        margin: 5px 0 0 145px;
    }
</style>