<script>
import store from '@/store';
export default {
  name: 'AppView',
  data: () => ({
    drawer: false
  }),
  methods: {

  },
  computed: {
    selectedItem: {
      get() {
        return store.state.menuSelectedItem;
      },
      set() {
        store.dispatch('setMenuItem', 0);
      }
    },
    menuItems() {
      return this.$store.getters.menuItems
    }
  },
  watch: {

  }

}
</script>
<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" absolute temporary app>

      <v-list-item>

        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          <!-- -----------DODAĆ AWATAR Z VUEX-->
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider ------ DODAĆ IMIE </v-list-item-title>
        </v-list-item-content>

      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item-group color="primary" v-model="selectedItem">
          <v-list-item v-for="(item, index) in menuItems" :key="index" @click="$router.push({ name: item.pathName })"
            :disabled="index === selectedItem">
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
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style>
.v-main {
  max-height: 100%;
  height: 100%
}

.no-scroll-container {
  max-height: 100%;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.scroll-container {
  padding: 1rem;
  overflow: scroll;
  padding-bottom: 2rem !important;
}
</style>

