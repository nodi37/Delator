<script>
export default {
    name: 'DrawerUserProfile'
}
</script>
<template>
    <v-list-item>

        <v-list-item-avatar>
            <v-img :src="$store.state.userData.photo"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title>
                {{ $store.state.userData.name + ' ' + $store.state.userData.lastName }}
            </v-list-item-title>
            <v-list-item-subtitle>
                {{ $store.state.userData.email }}
            </v-list-item-subtitle>
        </v-list-item-content>

    </v-list-item>
</template>