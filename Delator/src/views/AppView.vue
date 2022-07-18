<script>
import store from '@/store';
import NavigationDrawerList from '@/components/NavigationDrawerComponents/NavigationDrawerList.vue';
import DrawerUserProfile from '@/components/NavigationDrawerComponents/DrawerUserProfile.vue';
import LoadingBar from '@/components/UI/LoadingBar.vue';

export default {
  name: 'AppView',
  data: () => ({
    drawer: false,
    dataLoaded: false
  }),
  components: {
    NavigationDrawerList,
    DrawerUserProfile,
    LoadingBar
},
  async mounted() {
    const userDataLoaded = await store.dispatch('loadUserData');
    const companiesDataLoaded = await store.dispatch('loadCompaniesSettings');
    const employmentContractsLoaded = await store.dispatch('loadEmploymentContracts');
    this.dataLoaded = (userDataLoaded && companiesDataLoaded && employmentContractsLoaded);
  }
}
</script>
<template>
  <v-app v-if="dataLoaded">

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
    <LoadingBar />
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

