<script>
export default {
    name: 'LoadMoreIndicator',
    data: () => ({
        isActive: false
    })
}
</script>

<template>
    <v-lazy v-model="isActive" :options="{
        threshold: .3
    }"
    transition="scale-transition"
    min-height="200">
        <div class="d-flex justify-center align-center mt-8 mb-12">
            <v-icon color="primary" x-large>
                mdi-chevron-double-down
            </v-icon>
        </div>
    </v-lazy>
</template>