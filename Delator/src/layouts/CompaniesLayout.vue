<script>
import axios from 'axios';
import store from '@/store';
import TitleDescAvatarCard from '@/components/TitleDescAvatarCard';
import ConfirmDialog from '@/components/ConfirmDialog';
import TitledDialog from '@/components/TitledDialog';
import SearchBar from '@/components/UI/SearchBar';
import AddComapnyForm from '@/components/AddCompanyForm';
import NothingMoreBar from '@/components/UI/NothingMoreBar.vue';
import LoadingBar from '@/components/UI/LoadingBar.vue';

export default {
    name: 'CompaniesLayout',
    data: () => ({
        companies: [],
        skip: 0,
        searchKeyword: '',
        dialogVisible: false,
        addCompanyDialog: false,
        nothingMore: false,
        isLoading: true
    }),
    methods: {
        onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
            if (scrollTop + clientHeight >= scrollHeight) {
                this.fetchCompanies();
            }
        },
        addedCompany(data) {
            this.addCompanyDialog = false;
            this.companies = [...this.companies, data]
        },
        async fetchCompanies() {
            if (!this.nothingMore) {
                this.isLoading = true;
                const skipQuery = this.skip ? `skip=${this.skip}` : '';
                const keywordQuery = !!this.searchKeyword ? `&keyword=${this.searchKeyword}` : '';
                axios.get(`http://localhost:3001/v1/company?${skipQuery}${keywordQuery}`)
                    .then(res => {
                        const arr = res.data.data;
                        this.nothingMore = arr.length < 10 ? true : false;
                        this.companies = [...this.companies, ...arr.slice(0, 9)];
                    })
                    .catch(error => this.nothingMore = true)
                    .finally(() => {
                        this.isLoading = false;
                        this.skip += 9;
                    });
            }
        },
        async deleteCompany(companyId) {
            const companyName = this.companies.find(val => val._id === companyId).name;
            const ok = await this.$refs.confirm.show({
                text: this.$t('delete') + ' ' + companyName,
                confirmBtnText: 'delete',
                cancelBtnText: 'cancel',
                confirmBtnColor: 'error',
                cancelBtnColor: 'primary'
            });
            if (ok) {
                axios.delete(`http://localhost:3001/v1/company/${companyId}`)
                    .then(res => {
                        this.companies = this.companies.filter(val => val._id != companyId);
                    })
                    .catch(error => alert($t('error')));
            }
        }
    },
    watch: {
        searchKeyword() {
            this.companies = [];
            this.skip = 0;
            this.nothingMore = false;
            this.fetchCompanies();
        }
    },
    components: {
        TitleDescAvatarCard,
        ConfirmDialog,
        TitledDialog,
        SearchBar,
        AddComapnyForm,
        NothingMoreBar,
        LoadingBar
    },
    mounted: function () {
        this.fetchCompanies();
        store.dispatch('setMenuItem', 1);
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
                <v-btn @click="addCompanyDialog = !addCompanyDialog" heihght="100%" block
                    color="pink darken-1 white--text">{{ $t('add') }}</v-btn>
            </v-col>
        </v-row>
        <div class="scroll-container pa-2" @scroll="onScroll">
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
            <LoadingBar v-if="isLoading" />
            <NothingMoreBar v-if="nothingMore" />
        </div>
        <ConfirmDialog ref="confirm" />
        <TitledDialog v-model="addCompanyDialog" title="add-company">
            <AddComapnyForm v-on:addedCompany="addedCompany"></AddComapnyForm>
        </TitledDialog>
    </div>
</template> 
<style>
.scroll-container {
    max-height: 80vh;
    overflow: scroll;
}
</style>