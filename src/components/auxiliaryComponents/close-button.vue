<template>
    <button
        class="bn-modal-close bn-modal-move"
        @click="closeElement">
    </button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "close-button",

    methods: {
        closeElement(): void {
            this.$emit('close');
        }
    }
});
</script>

<style scoped>
    .bn-modal-close {
        width: 40px;
        height: 40px;
        background: Transparent no-repeat url("../../elementsDesign/close.svg");
        border: none;
        position: absolute;
    }

    .bn-modal-move:hover
    {
        transform: scale(1.05);
        cursor: pointer;
    }
</style>