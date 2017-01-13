<template>
    <div id="app">
        <h1>{{ title }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return {
                title: 'Application title'
            };
        }
    };
</script>

<style scoped>
#app {
    background-color: #ccc;
}
</style>
