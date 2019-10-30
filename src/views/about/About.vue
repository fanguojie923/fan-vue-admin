<template>
    <div class="container">
        <div>
            about
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                activeName: 'first',
                showTeam: false,
            }
        },
        mounted() {
            if (document.body.clientWidth > 1200 && document.body.clientWidth < 1330) {
                this.showTeam = true
            }
        },
        methods: {
            handleArticle(link) {
                window.open(link)
            },
        },
    }
</script>

<style scoped lang="scss">
    .container {
        padding: 20px;

    }
</style>
