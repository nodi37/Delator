<script>
import axios from 'axios';

export default {
    name: 'CompanyInputs',
    props: ['value', 'label', 'multiple', 'inputsDisabled'],
    data: () => ({
        search: '',
        usersData: [],
        usersLoading: false,
    }),
    methods: {
        fetchUsers(value) {
            console.log('FetchUsers')
            this.usersLoading = true;
            const keyword = !!value ? `&keyword=${value}` : '';
            axios.get(process.env.VUE_APP_API_PATH + `/user/get-many?limit=5${keyword}`, { withCredentials: true })
                .then(res => {
                    const data = res.data.data;
                    if (!!data) {
                        data.forEach((doc) => {
                            const user = this.usersData.find(user => user.email === doc.email);
                            if (!user) {
                                console.log('Not duplicate')
                                this.usersData.push(doc);
                            } else {
                                console.log('Duplicate, skipping fetchUsers')
                            }
                        });
                    }
                }).catch(err => console.log(err))
                .finally(() => this.usersLoading = false);
        },
        fetchSingleUser(value) {
            const user = this.usersData.find(user => user.email === value);
            if (!user) {
                console.log('FetchSinge')
                this.usersLoading = true;
                axios.get(process.env.VUE_APP_API_PATH + `/user/get-many?email=${value}`, { withCredentials: true })
                    .then(res => {
                        this.usersData.push(res.data.data[0]);
                    }).catch(err => console.log(err))
                    .finally(() => this.usersLoading = false);
            } else {
                console.log('Skip fetchSingle')
            }
        },
        prepareAutocompleteItemNames: (doc) => `${doc.name + ' ' + doc.lastName}(${doc.email})`,
    },
    watch: {
        model(val) {
            if (!!val) {
                if (this.multiple) {
                    val.forEach((email) => {
                        this.fetchSingleUser(email);
                    });
                } else {
                    this.fetchSingleUser(val);
                }
            }
        },
        search: function (newVal) {
            if (!!newVal) {
                this.fetchUsers(newVal);
            }
        },
        usersData(val) {
            console.log('Users data:')
            console.log(val)
        },
    },
    computed: {
        model: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    }
}
</script>

<template>

    <v-combobox v-model="model" :loading="usersLoading" :search-input.sync="search" :items="usersData"
        :item-text="prepareAutocompleteItemNames" item-value="email" :return-object="false" :label="$t(label)"
        :disabled="inputsDisabled" :no-data-text="$t('no-data')" deletable-chips clearable :multiple="multiple" outlined
        small-chips>
    </v-combobox>

</template>
