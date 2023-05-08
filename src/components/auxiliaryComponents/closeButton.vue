<template>
    <button class="bn-modal-close bn-modal-move" @click="close()"></button>
</template>

<script>
export default {
    name: "closeButton",

    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
    .bn-modal-close {
        width: 40px;
        height: 40px;
        background: Transparent no-repeat url("../../close.svg");
        border: none;
        position: absolute;
    }

    .bn-modal-move:hover
    {
        transform: scale(1.05);
        cursor: pointer;
    }
</style>