<script>
import router from '@/router';
import axios from 'axios'

export default {
    name: 'LogoutItem',
    methods: {
        logout() {
            axios.get(process.env.VUE_APP_API_PATH + `/auth/logout`, { withCredentials: true })
                .then(res => {
                    if (res.data.success) {
                        localStorage.removeItem('userId');
                        router.push({ name: 'login' });
                    }
                });
        }
    }
}
</script>

<template>
    <v-list-item class="mb-0" color="red" :input-value="true" @click="logout">
        <v-list-item-icon>
            <v-icon>
                mdi-logout-variant
            </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
            {{ $t('logout') }}
        </v-list-item-title>
    </v-list-item>
</template>