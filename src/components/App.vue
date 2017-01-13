<template>
    <div id="app">
        <h1>{{ title }}</h1>
        <grid></grid>
    </div>
</template>

<script>
import Grid from './Grid.vue';

export default {
    name: 'App',
    data () {
        return {
            title: 'Application title'
        };
    },

    components: {
        Grid
    }
};
</script>
