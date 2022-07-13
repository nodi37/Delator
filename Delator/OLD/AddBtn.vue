<script>
export default {
    name: 'AddBtn'
}
</script>

<template>
    <v-btn @click="$emit('onClick')" fab large absolute bottom right class="white--text mb-12" color="pink darken-1">
        <v-icon dark>
            mdi-plus
        </v-icon>
    </v-btn>
</template>