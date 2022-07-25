<script>
import store from '@/store';
export default {
    name: 'ContractsRoute',
    data: () => ({
    }),
    methods: {
    },
    computed: {
    },
    components: {
    },
    mounted: function() {
        console.log(this.$route.query)
    }
}
</script>
<template>
    <div>
        <h1>Contracts</h1>
    </div>
</template>