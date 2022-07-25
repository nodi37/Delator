<script>
import store from '@/store'
export default {
    name: 'SettingsRoute',
    data: () => ({
        langs: ['en', 'no', 'pl'],
    }),
    methods: {
    },
    computed: {
        lang() {
            return store.state.userSettings.language;
        }
    },
    components: {
    }
}
</script>
<template>
    <div>
        <v-icon>mdi-brightness-medium</v-icon>
        <!-- this is bad, no setter, to change -->
        <select v-model="lang">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
                {{ lang }}
            </option>
        </select>

        <v-switch @change="() => this.$vuetify.theme.dark = !this.$vuetify.theme.dark"></v-switch>
    </div>
</template>