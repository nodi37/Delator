<script>
export default {
  name: 'SettingsLayout',
  data: () => ({
    langs: ['en', 'no'],
  })
}

</script>

<template>
  <div>
    <v-icon>mdi-brightness-medium</v-icon>

    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>

    <v-switch @change="() => this.$vuetify.theme.dark = !this.$vuetify.theme.dark"></v-switch>

  </div>
</template>