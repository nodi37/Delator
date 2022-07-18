<script>
import store from '@/store';
import CompanyItems from './Items/CompanyItems.vue';
import ContractItems from './Items/ContractItems.vue';
import DefaultItem from './Items/DefaultItem.vue';
import LogoutItem from './Items/LogoutItem.vue';

export default {
    name: "NavigationDrawerList",
    computed: {
        companiesData() {
            return store.state.companiesData;
        },
        menuItems() {
            if (store.state.userData.superUser) {
                const superUserItems = [
                    { title: 'companies', icon: 'mdi-domain', pathName: 'companies' },
                    { title: 'users', icon: 'mdi-account', pathName: 'allUsers' },
                    { title: 'reports', icon: 'mdi-file-chart-outline', pathName: 'allUsers' },
                    { title: 'contracts', icon: 'mdi-file-sign', pathName: 'allUsers' },
                ]

                return {
                    admin: superUserItems
                }

            } else {
                const companies = store.state.companiesToManage.map(companySettings => {
                    const companyData = store.state.companiesData.find(company => company._id === companySettings.companyId);
                    return { title: companyData.companyName, logo: companyData.logo, companyId: companyData._id }
                });

                const contracts = store.state.employmentContracts.map(contract => {
                    const companyData = store.state.companiesData.find(company => company._id === contract.companyId);
                    return { title: companyData.companyName, logo: companyData.logo, companyId: companyData._id }
                });

                return {
                    companies: companies,
                    contracts: contracts
                }
            }
        }
    },
    components: {
        CompanyItems,
        ContractItems,
        LogoutItem,
        DefaultItem
    }
}
</script>
<template>
    <v-list class="pa-0" dense>
        <v-subheader>{{ $t('main') }}</v-subheader>

        <DefaultItem title="dashboard" icon="mdi-view-dashboard" :path="{ name: 'dashboard' }" />
        <DefaultItem v-if="menuItems.admin" v-for="item in menuItems.admin" :key="item.title" :title="item.title"
            :icon="item.icon" :path="{ name: item.pathName }" />

        <template v-if="menuItems.companies">
            <v-divider></v-divider>
            <v-subheader>{{ $t('manage') }}</v-subheader>
            <CompanyItems :items="menuItems.companies" />
        </template>

        <template v-if="menuItems.contracts">
            <v-divider></v-divider>
            <v-subheader>{{ $t('report-v') }}</v-subheader>
            <ContractItems :items="menuItems.contracts" />
        </template>

        <v-divider></v-divider>
        <v-subheader>{{ $t('others') }}</v-subheader>
        <DefaultItem title="settings" icon="mdi-cog" :path="{ name: 'settings' }" />
        <LogoutItem />
    </v-list>
</template>