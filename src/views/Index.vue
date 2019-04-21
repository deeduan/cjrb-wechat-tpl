<template>
    <div class="container">
        this is index
        <van-button type="primary">主要按钮</van-button>
    </div>
</template>

<script>
    import {tLogin} from "../api/test";

    export default {
        name: "Index",
        created: function () {
            this.init();
            console.log(this.$store.state.openId);
        },
        methods: {
            init: function () {
                let that = this;
                tLogin({user_name:'段正淳'}).then(function (response) {
                    console.log(response);
                    return false;
                });
            }
        }
    }
</script>

<style scoped>

</style>
