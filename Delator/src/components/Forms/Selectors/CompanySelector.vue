<script>
import axios from 'axios';


export default {
    name: 'CompanySelector',
    props: ['value', 'label', 'multiple', 'inputsDisabled'],
    data: () => ({
        search: '',
        companiesData: [],
        companiesLoading: false,
    }),
    methods: {
        fetchCompanies(value) {
            this.companiesLoading = true;
            const keyword = !!value ? `&keyword=${value}` : '';
            axios.get(process.env.VUE_APP_API_PATH + `/company?limit=5${keyword}`)
                .then(res => {
                    res.data.data.forEach((doc) => {
                        if (!this.companiesData.includes(doc)) {
                            this.companiesData.push(doc);
                        }
                    });
                }).catch(err => console.log(err))
                .finally(() => this.companiesLoading = false);
        },
        fetchSingleCompany(value) {
            this.companiesLoading = true;
            axios.get(process.env.VUE_APP_API_PATH + `/company/${value}`)
                .then(res => {
                    if (!this.companiesData.includes(res.data.data)) {
                        this.companiesData.push(res.data.data);
                    }
                }).catch(err => console.log(err))
                .finally(() => this.companiesLoading = false);
        }
    },
    watch: {
        model(val) {
            if (!!val) {
                if (this.multiple) {
                    val.forEach((id) => {
                        this.fetchSingleCompany(id);
                    });
                } else {
                    this.fetchSingleCompany(val)
                }
            }
        },
        search(newVal) {
            this.fetchCompanies(newVal);
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
        },
    },
    mounted() {
        this.fetchCompanies();
    }
}
</script>

<template>
    <v-autocomplete v-model="model" :loading="companiesLoading" :search-input.sync="search" :items="companiesData"
        item-text="companyName" item-value="_id" :label="$t(label)" :disabled="inputsDisabled"
        :no-data-text="$t('no-data')" deletable-chips clearable :multiple="multiple" outlined small-chips>
    </v-autocomplete>
</template>
