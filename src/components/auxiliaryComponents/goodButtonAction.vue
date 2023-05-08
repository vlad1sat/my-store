<template>
    <button class="bn-modal modal-text bn-modal-move" @click="clickButton()">{{ textButton }}</button>
</template>

<script>
export default {
    name: "modalGoodButtonAction",

    props: {
        textButton: String,
    },

    methods: {
        clickButton() {
            this.$emit('clickButton');
        }
    }
}
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