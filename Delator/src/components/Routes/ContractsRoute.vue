<script>
//import store from '@/store';
import axios from 'axios';
import SearchBar from '../UI/SearchBar.vue';
import ItemCard2 from '../UI/ItemCard2/ItemCard2.vue';
import ConfirmDialog from '../UI/ConfirmDialog.vue';
import TitledDialog from '../UI/TitledDialog.vue';
import LoadingBar from '../UI/LoadingBar.vue';
import LoadMoreIndicator from '../UI/LoadMoreIndicator.vue';
import NothingMoreBar from '../UI/NothingMoreBar.vue';
import AddContractForm from '../Forms/Add/AddContractForm.vue';
import ItemCartTitle from '../UI/ItemCard2/ItemCartTitle.vue';
import store from '@/store';

export default {
    name: 'ContractsRoute',
    data: () => ({
        contracts: [],
        usersData: [],
        contractsItems: [],
        skip: 0,
        searchKeyword: '',
        userId: '',
        companyId: '',
        dialogVisible: false,
        confirmDialog: false,
        nothingMore: false,
        isLoading: false
    }),
    methods: {
        onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
            if (scrollTop + clientHeight >= scrollHeight) {
                this.fetchContracts();
            }
        },
        addedContract(data) {
            this.confirmDialog = false;
            this.contracts = [...this.contracts, data]
        },
        async deleteContract(cId) {
            const contract = this.contractsItems.find(contract => contract._id === cId);

            const ok = await this.$refs.confirm.show({
                text: `${this.$t('delete')} ${this.$t('contract')} ${this.$t('between')} ${contract.companyName} ${this.$t('and')} ${contract.userName}`,
                confirmBtnText: 'delete',
                cancelBtnText: 'cancel',
                confirmBtnColor: 'error',
                cancelBtnColor: 'primary'
            });
            if (ok) {
                axios.delete(process.env.VUE_APP_API_PATH + `/employment-contract/delete/${cId}`)
                    .then(res => {
                        this.contractsItems = this.contractsItems.filter(contract => contract._id != cId);
                    })
                    .catch(error => {
                        console.log(error)
                        alert(this.$t('error'));
                    });
            }
        },
        async fetchContracts() {
            if (!this.nothingMore && !this.isLoading) {
                this.isLoading = true;
                const skipQuery = this.skip ? `skip=${this.skip}` : '';
                const keywordQuery = !!this.searchKeyword ? `&keyword=${this.searchKeyword}` : '';
                const userIdQuery = !!this.userId ? `&userId=${this.userId}` : '';
                const companyIdQuery = !!this.companyId ? `&companyId=${this.companyId}` : '';

                axios.get(process.env.VUE_APP_API_PATH + `/employment-contract/get-many?${skipQuery}${keywordQuery}${companyIdQuery}${userIdQuery}`, { withCredentials: true })
                    .then(res => {
                        const arr = res.data.data;
                        this.nothingMore = arr.length < 10 ? true : false;
                        this.contracts = [...this.contracts, ...arr.slice(0, 9)];
                    })
                    .catch(error => {
                        console.log(error);
                        this.nothingMore = true;
                    })
                    .finally(() => {
                        this.isLoading = false;
                        this.skip += 9;
                    });
            }
        },
        async fetchUserData(userId) {
            const existingData = this.usersData.find(user => user._id === userId);
            if (!existingData) {
                axios.get(process.env.VUE_APP_API_PATH + `/user/get/${userId}`, { withCredentials: true })
                    .then(res => {
                        const userData = res.data.data;
                        this.usersData = [...this.usersData, userData];
                    }).catch(err => {
                        console.log(err);
                        alert(this.$t('error-occured'));
                    });
            }
        }
    },
    watch: {
        searchKeyword() {
            store.dispatch('setMenuTitle', this.$t('contracts'));
            this.userId = '';
            this.companyId = '';
            this.contracts = [];
            this.skip = 0;
            this.nothingMore = false;
            this.fetchContracts();
        },
        contracts(arr) {
            arr.forEach(contract => this.fetchUserData(contract.userId));
        },
        usersData(usersArr) {
            //UserData is loaded after contract data
            //Contract card components needs data from both
            //When new usersData is coming it means that new contract has been loaded too
            //This function shoud create new object to create new contract card component
            this.contractsItems = this.contracts.map(contract => {
                const userData = usersArr.find(user => user._id === contract.userId);
                const userName = userData.name + ' ' + userData.lastName;
                return { ...contract, userName: userName };
            });
        }
    },
    components: {
        SearchBar,
        ConfirmDialog,
        TitledDialog,
        LoadingBar,
        LoadMoreIndicator,
        NothingMoreBar,
        AddContractForm,
        ItemCard2,
        ItemCartTitle
    },
    mounted: function () {
        const queryKeys = Object.keys(this.$route.query);
        if (queryKeys.length > 0) {
            const { companyId, userId, userName, userLastName } = this.$route.query;
            const title = userName ? this.$t('contracts') + `: ${userName} ${userLastName}` : this.$t('contracts');
            store.dispatch('setMenuTitle', title);
            this.companyId = companyId || '';
            this.userId = userId || '';
        } else {
            store.dispatch('setMenuTitle', this.$t('contracts'));
        }
        this.fetchContracts();
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
                    <v-btn @click="confirmDialog = !confirmDialog" heihght="100%" block
                        color="pink darken-1 white--text">
                        {{ $t('add') }}</v-btn>
                </v-col>
            </v-row>
        </v-container>

        <div class="scroll-container" @scroll="onScroll">

            <ItemCard2 v-for="contract in contractsItems" :key="contract._id" class="mb-2">

                <template v-slot:content>
                    <ItemCartTitle title="employee-name" :value="contract.userName" />
                    <ItemCartTitle title="company-name" :value="contract.companyName" />
                </template>

                <template v-slot:actions>
                    <v-btn color="primary"
                        @click="$router.push({ name: 'contractEditor', params: { contractId: contract._id } })">
                        {{ $t('properties') }}
                    </v-btn>
                    <v-btn color="#FF1744" class="white--text" @click="deleteContract(contract._id)">
                        {{ $t('delete') }}
                    </v-btn>
                </template>

            </ItemCard2>


            <LoadMoreIndicator v-if="!isLoading && !nothingMore" />
            <LoadingBar v-if="isLoading" />
            <NothingMoreBar v-if="nothingMore" />

        </div>

        <ConfirmDialog ref="confirm" />
        <TitledDialog v-model="confirmDialog" title="add-contract">
            <AddContractForm v-on:addedContract="addedContract" />
        </TitledDialog>

    </div>

</template> 