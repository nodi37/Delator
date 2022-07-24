<script>
import axios from 'axios';
import store from '@/store';
import EditUserForm from '@/components/Forms/Edit/EditUserForm.vue';
import EditUserSettingsForm from '@/components/Forms/Edit/EditUserSettingsForm.vue';
import TabsComponent from '@/components/UI/TabsComponent.vue';
import InfoBoard from '@/components/UI/InfoBoard.vue';

export default {
    name: 'UserPropeprties',
    data: () => ({
        userData: {},
        userSettings: {},
        userContracts: [],
        editMode: false,
        addMode: false,
        form: '',
        tabs: [
            { name: 'general-info', icon: 'mdi-information-outline' },
            { name: 'settings', icon: 'mdi-cog' },
        ],
        userInfoBoard: [],
        userSettingsInfoBoard: []
    }),
    methods: {
        async loadUserData() {
            return axios.get(process.env.VUE_APP_API_PATH + `/user/get/${this.$route.params.userId}`, { withCredentials: true })
                .then(res => {
                    this.userData = res.data.data;
                    const { name, lastName, email, phoneNumber, photo } = res.data.data;
                    this.userInfoBoard = [
                        { type: 'image', name: 'photo', value: photo },
                        { type: 'text', name: 'name', value: name },
                        { type: 'text', name: 'last-name', value: lastName },
                        { type: 'text', name: 'email', value: email },
                        { type: 'text', name: 'phone-number', value: phoneNumber },
                    ]
                }).catch(err => {
                    console.log(err);
                    alert(this.$t('error-occured'));
                });
        },
        async loadUserSettings() {
            return axios.get(process.env.VUE_APP_API_PATH + `/user-settings/get/${this.userData.settingsId}`, { withCredentials: true })
                .then(res => {
                    this.userSettings = res.data.data;
                    const language = store.state.languages.find(language => this.userSettings.language === language.shortName);
                    this.userSettingsInfoBoard = [
                        { type: 'text', name: 'language', value: language.fullName },
                        { type: 'text', name: 'password', value: this.$t('hidden') },
                    ];
                }).catch(err => {
                    console.log(err);
                    alert(this.$t('error-occured'));
                });
        },
        editedUser() {
            this.loadUserData();
            this.editMode = !this.editMode;
        },
        editedUserSettings() {
            this.loadUserSettings();
            this.editMode = !this.editMode;
        }
    },
    mounted: async function () {
        await this.loadUserData();
        await this.loadUserSettings();
    },
    components: {
        EditUserForm,
        EditUserSettingsForm,
        TabsComponent,
        InfoBoard,
    }
}
</script>

<template>
    <div class="no-scroll-container">
        <div class="scroll-container">

            <TabsComponent :tabs="tabs">
            
                <template v-slot:tab-items>
                    <v-tab-item>
                        <EditUserForm class="pa-4" v-if="editMode" v-on:editedUser="editedUser"
                            v-on:cancel="editMode = false" :userData="userData" />
                        <InfoBoard v-else :data="userInfoBoard">
                            <template v-slot:actions>
                                <v-btn color="primary" elevation="2" @click="editMode = !editMode">{{ $t('edit') }}
                                </v-btn>
                            </template>
                        </InfoBoard>
                    </v-tab-item>

                    <v-tab-item>
                        <EditUserSettingsForm class="pa-4" v-if="editMode" v-on:editedUserSettings="editedUserSettings"
                            v-on:cancel="editMode = false" :userSettings="userSettings" />
                        <InfoBoard v-else :data="userSettingsInfoBoard">
                            <template v-slot:actions>
                                <v-btn color="primary" elevation="2" @click="editMode = !editMode">{{ $t('edit') }}
                                </v-btn>
                            </template>
                        </InfoBoard>
                    </v-tab-item>
                </template>

            </TabsComponent>

        </div>
    </div>
</template>