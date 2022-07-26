<script>
export default {
    name: 'ItemCardSubtitle',
    props: ['title', 'value']
}
</script>

<template>
    <v-list-item-subtitle>{{ $t(title) + ': ' + value }}</v-list-item-subtitle>
</template>