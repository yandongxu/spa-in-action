<template>
    <div>
        <div v-show="isLoading">Loading...</div>
        <table v-show="!isLoading" class="table">
            <thead>
                <tr>
                    <th>
                        <input type="checkbox"
                            v-on:click="onToggleAllItems"
                            :checked="hasAllBeenSelected" />
                    </th>
                    <th>
                        AVATAR
                    </th>
                    <th>
                        NAME
                    </th>
                    <th>
                        ADDRESS
                    </th>
                    <th>
                        ACTION
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" track-by="id"
                    v-on:click="onSelect(row.id)">
                    <td>
                        <input type="checkbox"
                            :checked="row.selected"
                            v-on:click.stop="onSelect(row.id)" />
                    </td>
                    <td>
                        <img :src="row.avatar" width="40" height="40" />
                    </td>
                    <td>{{ row.name }}</td>
                    <td>{{ row.address }}</td>
                    <td>
                        <button v-on:click.stop="onDelete(row.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <h4>OUTPUT: </h4>
        <pre>{{ $data | json }}</pre>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isLoading: false,
            dataset: [],
            selected: []

            // dataset: [
            //     {
            //         id: 1,
            //         name: 'Tom'
            //     },
            //     {
            //         id: 2,
            //         name: 'Bob'
            //     },
            //     {
            //         id: 3,
            //         name: 'Tony'
            //     },
            //     {
            //         id: 4,
            //         name: 'Jerry'
            //     }
            // ],
        };
    },

    computed: {
        hasAllBeenSelected () {
            const { dataset, selected } = this;
            return dataset.length > 0 && dataset.every(d => selected.some(sid => sid === d.id));
        },

        rows () {
            const { dataset, selected } = this;
            return dataset.map((d) => {
                return Object.assign({}, d, {
                    selected: selected.some(sid => sid === d.id)
                });
            });
        }
    },

    methods: {
        onSelect (id) {
            const { selected } = this;
            const hasBeenSelected = selected.some(sid => sid === id);
            this.selected = hasBeenSelected ?
                selected.filter(sid => sid !== id) :
                selected.concat([id]);
        },

        onToggleAllItems () {
            const { dataset, selected } = this;
            const datasetIds = dataset.map(d => d.id);
            const hasAllBeenSelected = (selected.length === datasetIds.length) &&
                selected.every(sid => datasetIds.some(did => sid === did));
            this.selected = hasAllBeenSelected ? [] : dataset.map(d => d.id);
        },

        onDelete (id) {
            this.dataset = this.dataset.filter(d => d.id !== id);
            this.selected = this.selected.filter(sid => sid !== id);
        }
    },

    created () {
        this.isLoading = true;
        fetch('/api/grid')
            .then(r => r.json())
            .then((r) => {
                this.dataset = r.data;
                this.isLoading = false;
            });
    }
};
</script>

<style scoped>
th, td {
    border: 1px solid #666;
    padding: 5px;
}
</style>
