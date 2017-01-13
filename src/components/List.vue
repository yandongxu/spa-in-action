<template>
    <div class="list">
        <div v-show="isFetchingList">Loading...</div>
        <div v-show="!isFetchingList">
            <ul>
                <li v-for="item in dataset"
                    track-by="id">
                    {{ item.title }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isFetchingList: false,
            dataset: {}
        };
    },

    created () {
        this.isFetchingList = true;
        fetch('/api')
            .then(r => r.json())
            .then((r) => {
                this.$set('dataset', r.data);
                this.isFetchingList = false;
            });
    }
};
</script>
