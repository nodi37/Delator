<script>
export default {
    name: 'NothingMoreBar'
}
</script>

<template>
    <v-row class="mt-6 mb-12" align="center" transition="scale-transition">
        <v-col>
            <v-divider></v-divider>
        </v-col>
        <v-col cols="auto">
            <p class="text--disabled font-weight-light subtitle-1 ma-0">
                {{ $t('nothing-more') }}
            </p>
        </v-col>
        <v-col>
            <v-divider></v-divider>
        </v-col>
    </v-row>
</template>