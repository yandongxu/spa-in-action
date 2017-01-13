<template>
    <div id="app">
        <h1>{{ title }}</h1>
        <list></list>
    </div>
</template>

<script>
import List from './List.vue';
export default {
    name: 'App',
    data () {
        return {
            title: 'Application title'
        };
    },

    components: {
        List
    }
};
</script>
