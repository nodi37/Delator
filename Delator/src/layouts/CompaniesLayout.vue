<script>
import store from '@/store';
import TitleDescAvatarCard from '@/components/TitleDescAvatarCard';
import ConfirmDialog from '@/components/ConfirmDialog';
import TitledDialog from '@/components/TitledDialog';
import SearchBar from '@/components/UI/SearchBar';
import AddComapnyForm from '@/components/AddCompanyForm';

export default {
    name: 'CompaniesLayout',
    data: () => ({
        dialogVisible: false,
        searchKeyword: '',
        addCompanyDialog: false
    }),
    methods: {
        async deleteCompany(companyId) {
            const companyName = store.getters.getCompanyById(companyId).name;
            const ok = await this.$refs.confirm.show({
                text: this.$t('delete') + ' ' + companyName,
                confirmBtnText: 'delete',
                cancelBtnText: 'cancel',
                confirmBtnColor: 'error',
                cancelBtnColor: 'primary'
            });
            if (ok) {
                store.dispatch('deleteCompany', companyId);
            }
        }
    },
    watch: {
        searchKeyword() {
            console.log(this.searchKeyword)
        }
    },
    computed: {
        companies() {
            return store.getters.companies;
        }
    },
    components: {
        TitleDescAvatarCard,
        ConfirmDialog,
        TitledDialog,
        SearchBar,
        AddComapnyForm
    },
    mounted: () => {
        store.dispatch('fetchCompanies');
    }
}
</script>
<template>
    <div>
        <v-row class="mb-4">
            <v-col cols="10">
                <SearchBar v-model="searchKeyword" />
            </v-col>
            <v-col cols="2">
                <v-btn @click="addCompanyDialog=!addCompanyDialog" heihght="100%" block color="pink darken-1 white--text">{{ $t('add') }}</v-btn>
            </v-col>
        </v-row>

        <TitleDescAvatarCard v-for="company in companies" :key="company._id" :title="company.name"
            :description="company.description" :imgSrc="company.logo" class="mb-2">
            <template v-slot:actions>
                <v-btn color="secondary"
                    @click="$router.push({ name: 'companyUsers', params: { companyId: company._id } })">
                    {{ $t('employees') }}
                </v-btn>
                <v-btn color="primary"
                    @click="$router.push({ name: 'companyEditor', params: { companyId: company._id } })">
                    {{ $t('properties') }}
                </v-btn>
                <v-btn color="error" @click="deleteCompany(company._id)">
                    {{ $t('delete') }}
                </v-btn>
            </template>
        </TitleDescAvatarCard>
        <ConfirmDialog ref="confirm" />
        <TitledDialog v-model="addCompanyDialog" title="add-company">
            <AddComapnyForm></AddComapnyForm>
        </TitledDialog>
    </div>
</template> 