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
            this.usersLoading = true;
            const keyword = !!value ? `&keyword=${value}` : '';
            axios.get(process.env.VUE_APP_API_PATH + `/user?limit=5${keyword}`)
                .then(res => {
                    res.data.data.forEach((doc) => {
                        if (!this.usersData.includes(doc)) {
                            this.usersData.push(doc);
                        }
                    });
                }).catch(err => console.log(err))
                .finally(() => this.usersLoading = false);
        },
        fetchSingleUser(value) {
            this.usersLoading = true;
            axios.get(process.env.VUE_APP_API_PATH + `/user?email=${value}`)
                .then(res => {
                    if (!this.usersData.includes(res.data.data)) {
                        this.usersData.push(res.data.data);
                    }
                }).catch(err => console.log(err))
                .finally(() => this.usersLoading = false);
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
            this.fetchUsers(newVal);
        }
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
    },
    mounted() {
        this.fetchUsers();
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
