<script>
import axios from 'axios';
import EditUserForm from '@/components/Forms/Edit/EditUserForm.vue';
import AddContractForm from '@/components/Forms/Add/AddContractForm.vue';
import TabsComponent from '@/components/UI/TabsComponent.vue';
import InfoBoard from '@/components/UI/InfoBoard.vue';

export default {
    name: 'UserPropeprties',
    data: () => ({
        userData: {},
        userContracts: [],
        editMode: false,
        addMode: false,
        form: '',
        tabs: [
            { name: 'general-info', icon: 'mdi-information-outline' },
            { name: 'contracts', icon: 'mdi-file-sign' },
        ],
        userInfoBoard: [],
        contractsInfoBoard: []
    }),
    methods: {
        loadUserData() {
            axios.get(process.env.VUE_APP_API_PATH + `/user/${this.$route.params.userId}`)
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
                });
        },
        loadContracts() {
            axios.get(process.env.VUE_APP_API_PATH + `/contract?userId=${this.$route.params.userId}`)
                .then(res => {
                    this.userContracts = res.data.data;
                });
        },
        addedUser() {
            this.loadUserData();
            this.editMode = !this.editMode;
        },
        addedContract() {
            this.loadContracts();
            this.addMode = !this.addMode;
        },
        downloadContract(id) {
            console.log("Download contract id: " + id)
        }
    },
    mounted: function () {
        this.loadUserData();
        this.loadContracts();
    },
    components: {
        EditUserForm,
        TabsComponent,
        InfoBoard,
        AddContractForm
    }
}
</script>

<template>
    <div class="no-scroll-container">
        <div class="scroll-container">
            <TabsComponent :tabs="tabs">
                <template v-slot:tab-items>
                    <v-tab-item>
                        <EditUserForm class="pa-4" v-if="editMode" v-on:addedUser="addedUser"
                            v-on:cancel="editMode = false" :userData="userData" />
                        <InfoBoard v-else :data="userInfoBoard">
                            <template v-slot:actions>
                                <v-btn color="primary" elevation="2" @click="editMode = !editMode">{{ $t('edit') }}
                                </v-btn>
                            </template>
                        </InfoBoard>
                    </v-tab-item>

                    <v-tab-item>
                        <AddContractForm v-if="addMode" v-on:addedContract="addedContract" />
                        <v-expansion-panels v-else>
                            <v-expansion-panel v-for="contract in userContracts" :key="contract._id">
                                <v-expansion-panel-header>
                                    {{ $t('contract-with') + ': ' + contract.companyName }}
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <InfoBoard :data="[
                                        { type: 'text', name: 'with', value: contract.companyName },
                                        { type: 'text', name: 'contract-type', value: contract.contractType },
                                        { type: 'percent', name: 'employment-dimension', value: contract.employmentDimension },
                                        { type: 'text', name: 'hourly-wage', value: contract.hourlyWage },
                                    ]">
                                        <template v-slot:actions>
                                            <v-btn color="#00E676" class="white--text mr-4" elevation="2"
                                                @click="downloadContract(contract._id)">
                                                {{
                                                        $t('download')
                                                }}
                                            </v-btn>

                                            <v-btn color="primary" elevation="2" @click="editMode = !editMode">{{
                                                    $t('edit')
                                            }}
                                            </v-btn>

                                        </template>
                                    </InfoBoard>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <div v-if="!addMode" class="d-flex justify-end">
                            <v-btn color="#00E676" class="white--text ma-1 mt-4" elevation="2"
                                @click="addMode = !addMode">
                                {{
                                        $t('add')
                                }}
                            </v-btn>
                        </div>
                    </v-tab-item>
                </template>
            </TabsComponent>
        </div>
    </div>
</template>