<script>
import axios from 'axios';
import ItemCard from '@/components/UI/ItemCard';
import ConfirmDialog from '@/components/UI/ConfirmDialog';
import TitledDialog from '@/components/UI/TitledDialog';
import SearchBar from '@/components/UI/SearchBar';
import AddUserForm from '@/components/Forms/Add/AddUserForm.vue';
import LoadMoreIndicator from '@/components/UI/LoadMoreIndicator.vue';
import NothingMoreBar from '@/components/UI/NothingMoreBar.vue';
import LoadingBar from '@/components/UI/LoadingBar.vue';

export default {
    name: 'UsersRoute',
    data: () => ({
        users: [],
        skip: 0,
        searchKeyword: '',
        dialogVisible: false,
        confirmDialog: false,
        nothingMore: false,
        isLoading: false
    }),
    methods: {
        onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
            if (scrollTop + clientHeight >= scrollHeight) {
                this.fetchUsers();
            }
        },
        addedUser(data) {
            this.confirmDialog = false;
            this.users = [...this.users, data]
        },
        async fetchUsers() {
            if (!this.nothingMore && !this.isLoading) {
                this.isLoading = true;
                const skipQuery = this.skip ? `skip=${this.skip}` : '';
                const keywordQuery = !!this.searchKeyword ? `&keyword=${this.searchKeyword}` : '';
                axios.get(process.env.VUE_APP_API_PATH + `/user/get-many?${skipQuery}${keywordQuery}`, { withCredentials: true })
                    .then(res => {
                        const arr = res.data.data;
                        this.nothingMore = arr.length < 10 ? true : false;
                        this.users = [...this.users, ...arr.slice(0, 9)];
                    })
                    .catch(error => this.nothingMore = true)
                    .finally(() => {
                        this.isLoading = false;
                        this.skip += 9;
                    });
            }
        },
        async deleteUser(userId) {
            const user = this.users.find(val => val._id === userId);
            const ok = await this.$refs.confirm.show({
                text: `${this.$t('delete')} ${user.name} ${user.lastName}(${user.email})`,
                confirmBtnText: 'delete',
                cancelBtnText: 'cancel',
                confirmBtnColor: 'error',
                cancelBtnColor: 'primary'
            });
            if (ok) {
                try {
                    const user = await axios.delete(process.env.VUE_APP_API_PATH + `/user/delete/${userId}`, { withCredentials: true });
                    await axios.delete(process.env.VUE_APP_API_PATH + `/user-settings/delete/${user.data.data.settingsId}`, { withCredentials: true });
                    this.users = this.users.filter(user => user._id != userId);
                } catch (error) {
                    console.log(error);
                    alert(this.$t('server-error'));
                }
            }
        }
    },
    watch: {
        searchKeyword() {
            this.users = [];
            this.skip = 0;
            this.nothingMore = false;
            this.fetchUsers();
        }
    },
    components: {
        ItemCard,
        ConfirmDialog,
        TitledDialog,
        SearchBar,
        AddUserForm,
        NothingMoreBar,
        LoadingBar,
        LoadMoreIndicator
    },
    mounted: function () {
        this.fetchUsers();
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

            <ItemCard v-for="user in users" :key="user._id" :name="user.name + ' ' + user.lastName"
                :description="user.email" :imgSrc="user.photo" :createDate="user.createDate" class="mb-2">
                <template v-slot:actions>
                    <v-btn color="#757575" class="white--text" @click="$router.push({ name: 'contractsRoute', query: { userId: user._id, userName: user.name, userLastName: user.lastName }})">
                        {{ $t('contracts') }}
                    </v-btn>
                    <v-btn color="#00796B" class="white--text" @click="$router.push({ name: 'reportsRoute', query: { userId: user._id, userName: user.name, userLastName: user.lastName }})">
                        {{ $t('reports') }}
                    </v-btn>
                    <v-btn color="primary" @click="{ $router.push({ name: 'userEditor', params: { userId: user._id, userName: user.name, userLastName: user.lastName } })}">
                        {{ $t('properties') }}
                    </v-btn>
                    <v-btn color="#FF1744" class="white--text" @click="deleteUser(user._id)">
                        {{ $t('delete') }}
                    </v-btn>
                </template>

            </ItemCard>
            <LoadMoreIndicator v-if="!isLoading && !nothingMore" />
            <LoadingBar v-if="isLoading" />
            <NothingMoreBar v-if="nothingMore" />

        </div>

        <ConfirmDialog ref="confirm" />
        <TitledDialog v-model="confirmDialog" title="add-user">
            <AddUserForm v-on:addedUser="addedUser" />
        </TitledDialog>

    </div>

</template> 