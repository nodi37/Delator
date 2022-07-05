<script>
export default {
    name: 'NothingMoreBar'
}
</script>

<template>
    <v-row class="ma-6" align="center">
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