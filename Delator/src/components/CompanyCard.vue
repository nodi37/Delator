<script>
import { computed } from 'vue'

export default {
    name: 'CompanyCard',
    props: ['name', 'description', 'imgSrc', 'createDate'],
    computed: {
        initials(){
            return this.name.split(' ').map(word=>word[0]).join('');
        }
    }
}
</script>
<template>
    <v-card elevation="3">
        <v-list-item>
            <v-list-item-avatar size="80" rounded>
                <img class="card-avatar-img" v-if="imgSrc" :src="imgSrc" :alt="initials">
                <span v-else>{{ initials }}</span>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                    {{ name }}
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