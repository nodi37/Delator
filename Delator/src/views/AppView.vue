<script>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import EmployeesLayout from '../layouts/EmployeesLayout.vue';
import SettingsLayout from '../layouts/SettingsLayout.vue';

export default {
  name: 'AppView',
  data: () => ({
    drawer: false
  }),
  methods: {
    setLayout(layout) {
      this.$store.dispatch('setLayout', layout)
    }
  },
  computed: {
    layout() {
      return this.$store.getters.layout
    },
    menuItems() {
      return this.$store.state.menuItems
    }
  },
  components: {
    'dashboard-layout': DashboardLayout,
    'employees-layout': EmployeesLayout,
    'settings-layout': SettingsLayout
    // define layouts for the application
  }
}
</script>
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          <!-- -----------DODAĆ AWATAR -->
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>John Leider ------ DODAĆ IMIE </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="item in menuItems" :key="item.title" @click="setLayout(item.layout)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat dense color="secondary" class="white--text" app>
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Delator</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <!-- Component changer -->
      <component :is="layout"></component>
    </v-main>
  </v-app>
</template>
<style>
</style>