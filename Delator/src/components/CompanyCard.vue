<script>
export default {
    name: 'CompanyCard',
    props: ['title', 'description', 'imgSrc', 'createDate']
}
</script>
<template>
    <v-card elevation="3">
        <v-list-item>
            <v-list-item-avatar size="80" rounded>
                <img class="card-avatar-img" v-if="imgSrc" :src="imgSrc" :alt="title">
                <span v-else>{{ title }}</span>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                    {{ title }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ $t('created') +': ' + new Date(createDate).toLocaleDateString() }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-card-actions>
            <slot name="actions">
            </slot>
        </v-card-actions>
    </v-card>
</template>
<style>
.card-avatar-img {
    object-fit: cover;
}
</style>