<script>
import axios from 'axios';
//import store from '@/store';
import ItemCard from '@/components/UI/ItemCard';
import ConfirmDialog from '@/components/UI/ConfirmDialog';
import TitledDialog from '@/components/UI/TitledDialog';
import SearchBar from '@/components/UI/SearchBar';
import AddCompanyForm from '@/components/Forms/Add/AddCompanyForm.vue';
import LoadMoreIndicator from '@/components/UI/LoadMoreIndicator.vue';
import NothingMoreBar from '@/components/UI/NothingMoreBar.vue';
import LoadingBar from '@/components/UI/LoadingBar.vue';

export default {
    name: 'CompaniesRoute',
    data: () => ({
        companies: [],
        skip: 0,
        searchKeyword: '',
        dialogVisible: false,
        addCompanyDialog: false,
        nothingMore: false,
        isLoading: false
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
            if (!this.nothingMore && !this.isLoading) {
                this.isLoading = true;
                const skipQuery = this.skip ? `skip=${this.skip}` : '';
                const keywordQuery = !!this.searchKeyword ? `&keyword=${this.searchKeyword}` : '';
                axios.get(process.env.VUE_APP_API_PATH + `/company/get-many?${skipQuery}${keywordQuery}`, { withCredentials: true })
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
                axios.delete(process.env.VUE_APP_API_PATH + `/company/${companyId}`)
                    .then(res => {
                        this.companies = this.companies.filter(val => val._id != companyId);
                    })
                    .catch(error => {
                        console.log(error)
                        alert(this.$t('error'));
                    });
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
        ItemCard,
        ConfirmDialog,
        TitledDialog,
        SearchBar,
        AddCompanyForm,
        NothingMoreBar,
        LoadingBar,
        LoadMoreIndicator
    },
    mounted: function () {
        this.fetchCompanies();
    }
}

</script>
<template>
    <div class="no-scroll-container">
        <v-container fluid>
            <v-row>
                <v-col cols="10">
                    <SearchBar v-model="searchKeyword" />
                </v-col>
                <v-col cols="2">
                    <v-btn @click="addCompanyDialog = !addCompanyDialog" heihght="100%" block
                        color="pink darken-1 white--text">
                        {{ $t('add') }}</v-btn>
                </v-col>
            </v-row>
        </v-container>

        <div class="scroll-container" @scroll="onScroll">

            <ItemCard v-for="company in companies" :key="company._id" :name="company.companyName"
                :description="company.companyDescription" :imgSrc="company.logo" :createDate="company.createDate"
                class="mb-2">

                <template v-slot:actions>
                    <v-btn color="#757575" class="white--text" @click="$router.push({ name: 'contractsRoute', query: { companyId: company._id}})">
                        {{ $t('contracts') }}
                    </v-btn>
                    <v-btn color="#00796B" class="white--text" @click="$router.push({ name: 'reportsRoute', query: { companyId: company._id }})">
                        {{ $t('reports') }}
                    </v-btn>
                    <v-btn color="primary"
                        @click="$router.push({ name: 'companyEditor', params: { companyId: company._id } })">
                        {{ $t('properties') }}
                    </v-btn>
                    <v-btn color="error" @click="deleteCompany(company._id)">
                        {{ $t('delete') }}
                    </v-btn>
                </template>

            </ItemCard>
            <LoadMoreIndicator v-if="!isLoading && !nothingMore" />
            <LoadingBar v-if="isLoading" />
            <NothingMoreBar v-if="nothingMore" />

        </div>

        <ConfirmDialog ref="confirm" />
        <TitledDialog v-model="addCompanyDialog" title="add-company">
            <AddCompanyForm v-on:addedCompany="addedCompany" />
        </TitledDialog>

    </div>

</template> 