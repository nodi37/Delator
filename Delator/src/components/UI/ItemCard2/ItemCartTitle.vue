<script>
export default {
    name: 'ItemCardTitle',
    props: ['title', 'value']
}
</script>

<template>
    <v-list-item-title class="text-h5 mb-1">
        <template v-if="title">{{ $t(title) + ': ' }} </template> {{ value }}
    </v-list-item-title>
</template>