<script>
import store from '@/store';
export default {
    name: 'ReportsRoute',
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
        <h1>Reports</h1>
    </div>
</template>