<script>
import store from '@/store';
import NavigationDrawerList from '@/components/NavigationDrawerComponents/NavigationDrawerList.vue';
import DrawerUserProfile from '@/components/NavigationDrawerComponents/DrawerUserProfile.vue';
import LoadingBar from '@/components/UI/LoadingBar.vue';

export default {
  name: 'AppView',
  data: () => ({
    drawer: false,
    isAppLoading: true,
    isDataLoaded: false
  }),
  components: {
    NavigationDrawerList,
    DrawerUserProfile,
    LoadingBar
  },
  async mounted() {
    try {
      await store.dispatch('loadCompaniesSettings');
      await store.dispatch('loadEmploymentContracts');
      this.isDataLoaded = true;
    } catch (error) {
      this.isDataLoaded = false;
    } finally {
      this.isAppLoading = false;
    }
  }
}
</script>
<template>

  <v-app v-if="isDataLoaded">

    <v-navigation-drawer v-model="drawer" absolute temporary app>

      <DrawerUserProfile />

      <v-divider></v-divider>

      <NavigationDrawerList />

    </v-navigation-drawer>

    <v-app-bar flat dense color="secondary" class="white--text" app>
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Delator</v-toolbar-title>
    </v-app-bar>

    <v-main class="ma-1">
      <router-view></router-view>
    </v-main>
  </v-app>

  <v-card v-else>
    <LoadingBar v-if="isAppLoading" />
    <h1 v-else>Error</h1>
  </v-card>

</template>

<style>
.v-main {
  max-height: 100%;
  height: 100%
}

.no-scroll-container {
  max-height: 100%;
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

