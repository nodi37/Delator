<script>
import store from '@/store';
import axios from 'axios';
import EditCompanyDataForm from '@/components/Forms/Edit/EditCompanyDataForm.vue';
import EditCompanySettingsForm from '@/components/Forms/Edit/EditCompanySettingsForm.vue';
import AddContractForm from '@/components/Forms/Add/AddContractForm.vue';
import TabsComponent from '@/components/UI/TabsComponent.vue';
import InfoBoard from '@/components/UI/InfoBoard.vue';

export default {
    name: 'CompanyProperties',
    data: () => ({
        companyData: {},
        companyContracts: [],
        companySettings: [],
        publicInfoBoard: [],
        settingsInfoBoard: [],
        editMode: false,
        addMode: false,
        tabs: [
            { name: 'public-info', icon: 'mdi-information-outline' },
            { name: 'contracts', icon: 'mdi-file-sign' },
            { name: 'settings', icon: 'mdi-cog' },
        ],
    }),
    methods: {
        loadCompanyData() {
            axios.get(process.env.VUE_APP_API_PATH + `/company/get/${this.$route.params.companyId}`, { withCredentials: true })
                .then(res => {
                    this.companyData = res.data.data;
                    this.publicInfoBoard = [
                        { type: 'image', name: 'logo', value: this.companyData.logo },
                        { type: 'text', name: 'organization-number', value: this.companyData.orgNumber },
                        { type: 'text', name: 'name', value: this.companyData.companyName },
                        { type: 'text', name: 'description', value: this.companyData.companyDescription },
                    ]
                });
        },
        loadCompanySettings() {
            axios.get(process.env.VUE_APP_API_PATH + `/company-settings/get-many?companyId=${this.$route.params.companyId}`, { withCredentials: true })
                .then(res => {
                    this.companySettings = res.data.data[0];
                    this.settingsInfoBoard = [
                        { type: 'text', name: 'hourly-wage', value: this.companySettings.startingHourlyWage },
                        { type: 'text', name: 'hours-per-day', value: this.companySettings.hoursPerDayCount },
                        { type: 'text', name: 'break-time', value: this.companySettings.breakTime },
                        { type: 'percent', name: 'free-days-allowance', value: this.companySettings.freeDaysAllowance },
                        { type: 'percent', name: 'overtime-allowance', value: this.companySettings.overtimeAllowance },
                    ]
                });
        },
        loadContracts() {
            axios.get(process.env.VUE_APP_API_PATH + `/employment-contract/get-many?companyId=${this.$route.params.companyId}`)
                .then(res => this.companyContracts = res.data.data);
        },

        edditedCompany() {
            this.editMode = false;
            this.loadCompanyData();
        },
        edditedSettings() {
            this.editMode = false;
            this.loadCompanySettings();
        },
        addedContract() {
            this.addMode = false;
            this.loadContracts();
        }
    },
    computed: {
        pricingPlans() {
            return store.state.pricingPlans;
        },
        settlementMethods() {
            return store.state.settlementMethods;
        }
    },
    mounted: function () {
        this.loadCompanyData();
        this.loadContracts();
        this.loadCompanySettings();
    },
    components: {
        EditCompanyDataForm,
        EditCompanySettingsForm,
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
                        <EditCompanyDataForm class="pa-4" v-if="editMode" v-on:edditedCompany="edditedCompany"
                            v-on:cancel="editMode = false" :companyData="companyData" />

                        <InfoBoard v-else :data="publicInfoBoard">
                            <template v-slot:actions>
                                <v-btn color="primary" elevation="2" @click="editMode = !editMode">{{ $t('edit') }}
                                </v-btn>
                            </template>
                        </InfoBoard>
                    </v-tab-item>



                    <v-tab-item>
                        <AddContractForm v-if="addMode" v-on:addedContract="addedContract" />

                        <v-expansion-panels v-else>

                            <v-expansion-panel v-for="contract in companyContracts" :key="contract._id">

                                <v-expansion-panel-header>
                                    {{ $t('contract-with') + ': ' + contract.companyName }}
                                </v-expansion-panel-header>

                                <v-expansion-panel-content>
                                    <InfoBoard :data="
                                        [
                                            { type: 'text', name: 'with', value: contract.companyName },
                                            { type: 'text', name: 'contract-type', value: contract.contractType },
                                            { type: 'percent', name: 'employment-dimension', value: contract.employmentDimension },
                                            { type: 'text', name: 'hourly-wage', value: contract.hourlyWage },
                                        ]
                                    ">
                                        <template v-slot:actions>
                                            <v-btn color="#00E676" class="white--text mr-4" elevation="2" @click="downloadContract(contract._id)">
                                                {{ $t('download') }}
                                            </v-btn>

                                            <v-btn color="primary" elevation="2" @click="editMode = !editMode">
                                            {{ $t('edit') }}
                                            </v-btn>

                                        </template>
                                    </InfoBoard>
                                </v-expansion-panel-content>

                            </v-expansion-panel>

                        </v-expansion-panels>
                        <div v-if="!addMode" class="d-flex justify-end">

                            <v-btn color="#00E676" class="white--text ma-1 mt-4" elevation="2" @click="addMode = !addMode">
                                {{ $t('add') }}
                            </v-btn>

                        </div>
                    </v-tab-item>



                    <v-tab-item>
                        <EditCompanySettingsForm class="pa-4" v-if="editMode" v-on:edditedSettings="edditedSettings"
                            v-on:cancel="editMode = false" :companySettings="companySettings" />

                        <InfoBoard v-else :data="settingsInfoBoard">
                            <template>
                                <p v-if="companySettings.pricingPlan" class="subtitle-1">
                                    <b>
                                        {{ $t('pricing-plan') }}:
                                    </b>
                                    {{
                                        $t(pricingPlans.find(doc => doc.no == companySettings.pricingPlan).title)
                                    }}
                                </p>
                                <p v-if="companySettings.settlementMethod" class="subtitle-1">
                                    <b>
                                        {{ $t('settlement-method') }}:
                                    </b>
                                    {{
                                        $t(settlementMethods.find(doc => doc.no == companySettings.settlementMethod).title)
                                    }}
                                </p>
                            </template>
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