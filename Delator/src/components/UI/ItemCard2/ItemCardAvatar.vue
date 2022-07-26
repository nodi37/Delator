<script>
export default {
    name: 'ItemCardAvatar',
    props: ['imgSrc', 'alt']
}
</script>

<template>
    <v-list-item-avatar size="80" rounded>
        <img class="card-avatar-img" v-if="imgSrc" :src="imgSrc" :alt="alt">
        <span v-else>{{ alt }}</span>
    </v-list-item-avatar>
</template>
<style>
.card-avatar-img {
    object-fit: cover;
}
</style>