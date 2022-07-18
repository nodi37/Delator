<script>
export default {
    name: 'DefaultItem',
    props: ['title', 'icon', 'path']
}
</script>

<template>
    <v-list class="pa-0">
        <v-list-item :to="path">
            <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t(title) }}</v-list-item-title>
        </v-list-item>
    </v-list>
</template>            
