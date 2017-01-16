<template>
    <div id="app">
        <h1>{{ title }}</h1>
        <date-range start="" end=""></date-range>
        <!-- <grid></grid> -->
    </div>
</template>

<script>
import Grid from './Grid.vue';
import DateRange from './DateRange.vue';

export default {
    name: 'App',
    data () {
        return {
            title: 'Application title'
        };
    },

    components: {
        DateRange,
        Grid
    }
};
</script>
