<script>
export default {
    name: 'SearchBar',
    props: {
        value: ''
    },
    computed: {
        text: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }

    }
}
</script>

<template>
    <v-text-field dense hide-details v-model="text" :label="$t('search-here')" outlined clearable></v-text-field>
</template>