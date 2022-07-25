<script>
import store from '@/store';
import axios from 'axios';
import EditCompanyDataForm from '@/components/Forms/Edit/EditCompanyDataForm.vue';
import EditCompanySettingsForm from '@/components/Forms/Edit/EditCompanySettingsForm.vue';
import TabsComponent from '@/components/UI/TabsComponent.vue';
import InfoBoard from '@/components/UI/InfoBoard.vue';

export default {
    name: 'CompanyProperties',
    data: () => ({
        companyData: {},
        companySettings: [],
        publicInfoBoard: [],
        settingsInfoBoard: [],
        editMode: false,
        addMode: false,
        tabs: [
            { name: 'public-info', icon: 'mdi-information-outline' },
            { name: 'settings', icon: 'mdi-cog' },
        ],
    }),
    methods: {
        async loadCompanyData() {
            return axios.get(process.env.VUE_APP_API_PATH + `/company/get/${this.$route.params.companyId}`, { withCredentials: true })
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
        async loadCompanySettings() {
            return axios.get(process.env.VUE_APP_API_PATH + `/company-settings/get/${this.companyData.settingsId}`, { withCredentials: true })
                .then(res => {
                    this.companySettings = res.data.data;
                    this.settingsInfoBoard = [
                        { type: 'text', name: 'hourly-wage', value: this.companySettings.startingHourlyWage },
                        { type: 'text', name: 'hours-per-day', value: this.companySettings.hoursPerDayCount },
                        { type: 'text', name: 'break-time', value: this.companySettings.breakTime },
                        { type: 'percent', name: 'free-days-allowance', value: this.companySettings.freeDaysAllowance },
                        { type: 'percent', name: 'overtime-allowance', value: this.companySettings.overtimeAllowance },
                    ]
                });
        },
        edditedCompany() {
            this.editMode = false;
            this.loadCompanyData();
        },
        edditedSettings() {
            this.editMode = false;
            this.loadCompanySettings();
        },

    },
    computed: {
        pricingPlans() {
            return store.state.pricingPlans;
        },
        settlementMethods() {
            return store.state.settlementMethods;
        }
    },
    mounted: async function () {
        await this.loadCompanyData();
        await this.loadCompanySettings();
    },
    components: {
        EditCompanyDataForm,
        EditCompanySettingsForm,
        TabsComponent,
        InfoBoard
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
                        <EditCompanySettingsForm class="pa-4" v-if="editMode" v-on:edditedSettings="edditedSettings"
                            v-on:cancel="editMode = false" :companySettings="companySettings" />

                        <InfoBoard v-else :data="settingsInfoBoard">
                            <template>
                                <p v-if="companySettings.administratorsEmails" class="subtitle-1">
                                    <b>
                                        {{ $t('administrators') }}:
                                    </b>
                                    <span v-for="email in companySettings.administratorsEmails" :key="email">
                                        {{ email }},
                                    </span>
                                </p>
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