<script>
import store from '@/store';
import compressImage from '@/helpers/imageCompressor';
//import axios from 'axios';
//import EmploymentContract from './EmploymentContract.vue';

export default {
    name: 'UserInputs',
    props: ['value'],
    data: () => ({
        //preloaded: false,
        // search: '',
        // companiesData: [],
        // companiesIds: [],
        // companiesLoading: false,
        rules: {
            required: value => !!value || 'This field is equired.',
            isNumber: value => { if (!!value) { return !isNaN(value) || 'This field should be a number.' } else { return true } },
            percent: value => { if (!!value) { return (value >= 0 && value <= 100) || 'This field should be a number between 0-100.' } else { return true } },
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
        }
    }),
    methods: {
        async preparePhoto(img) {
            if (!!img) {
                this.model.formData.photo = await compressImage(img, 400);
            } else {
                this.model.formData.photo = '';
            }
        },
        // fetchCompanies(value) {
        //     this.companiesLoading = true;
        //     const keyword = !!value ? `&keyword=${value}` : '';
        //     axios.get(process.env.VUE_APP_API_PATH + `/company?limit=5${keyword}`)
        //         .then(res => {
        //             res.data.data.forEach((doc) => {
        //                 if (!this.companiesData.includes(doc)) {
        //                     this.companiesData.push(doc);
        //                 }
        //             });
        //         }).catch(err => console.log(err))
        //         .finally(() => this.companiesLoading = false);
        // },
        // fetchSingleCompany(value) {
        //     this.companiesLoading = true;
        //     axios.get(process.env.VUE_APP_API_PATH + `/company/${value}`)
        //         .then(res => {
        //             if (!this.companiesData.includes(res.data.data)) {
        //                 this.companiesData.push(res.data.data);
        //             }
        //         }).catch(err => console.log(err))
        //         .finally(() => this.companiesLoading = false);
        // },
    },
    watch: {
        // 'model.formData.employeeOf': function (val) {
        //     if (!this.preloaded && !!val) {
        //         this.preloaded = true;
        //         val.forEach((doc) => {
        //             this.fetchSingleCompany(doc.companyId);
        //             if (!this.companiesIds.includes(doc.companyId)) {
        //                 this.companiesIds.push(doc.companyId);
        //             }
        //         });
        //     }
        // },
        // search: function (newVal) {
        //     this.fetchCompanies(newVal);
        // },

        // companiesIds: function (idsArr) {
        //     class CompanyObj {
        //         constructor(companyId,
        //             name,
        //             hourlyRate,
        //             defTotalBreakTime,
        //             settlementMethod,
        //             stdHrsPerDay,
        //             overtimeAllowance,
        //             freeDaysAllowance) {
        //             this.companyId = companyId;
        //             this.name = name;
        //             this.hourlyRate = hourlyRate;
        //             this.defTotalBreakTime = defTotalBreakTime;
        //             this.settlementMethod = settlementMethod;
        //             this.stdHrsPerDay = stdHrsPerDay;
        //             this.overtimeAllowance = overtimeAllowance;
        //             this.freeDaysAllowance = freeDaysAllowance;
        //         }
        //     }

        //     this.model.formData.employeeOf = idsArr.map((id) => {
        //         const companyData = this.companiesData.find((company) => company._id === id);
        //         const userData = this.model.formData.employeeOf.find((company) => company.companyId === id);

        //         const {
        //             defTotalBreakTime,
        //             settlementMethod,
        //             stdHrsPerDay,
        //             overtimeAllowance,
        //             freeDaysAllowance } = userData ? userData : companyData;

        //         const hourlyRate = userData ? userData.hourlyRate : companyData.defHourlyRate;

        //         const newCompanyObj = new CompanyObj(
        //             id,
        //             companyData.name,
        //             hourlyRate,
        //             defTotalBreakTime,
        //             settlementMethod,
        //             stdHrsPerDay,
        //             overtimeAllowance,
        //             freeDaysAllowance)

        //         return newCompanyObj;
        //  });

        //}
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
        // privlegeLevels() {
        //     return store.state.privlegeLevels;
        // }
    },
    components: {
        //EmploymentContract
    },
    // mounted() {
    //     this.fetchCompanies();
    // }
}
</script>

<template>
    <div>
        <v-text-field outlined dense :rules="[rules.required]" v-model.trim="model.formData.name" :label="$t('name')"
            :disabled="model.inputsDisabled" />

        <v-text-field outlined dense :rules="[rules.required]" v-model.trim="model.formData.lastName"
            :label="$t('last-name')" :disabled="model.inputsDisabled" />

        <v-text-field outlined dense :rules="[rules.required, rules.email]" v-model.trim="model.formData.email"
            :label="$t('email')" :disabled="model.inputsDisabled" />

        <v-text-field pattern="\d*" outlined dense :rules="[rules.isNumber]" v-model.trim="model.formData.phoneNumber"
            :label="$t('phone-number')" :disabled="model.inputsDisabled" />

        <!-- <v-autocomplete v-model="companiesIds" :loading="companiesLoading" :search-input.sync="search"
            :items="companiesData" item-text="companyName" item-value="_id" :label="$t('contracts')"
            :disabled="model.inputsDisabled" :no-data-text="$t('no-data')" deletable-chips clearable multiple outlined
            small-chips>
        </v-autocomplete>  -->

        <!-- <EmploymentContract v-for="companyId in companiesIds" :key="companyId"
            :value="model.formData.employeeOf.find((obj) => obj.companyId === companyId)"
            :inputsDisabled="model.inputsDisabled" /> -->

        <v-file-input outlined dense accept="image/*" :label="$t('photo')" @change="preparePhoto"
            prepend-icon="mdi-image" :disabled="model.inputsDisabled" />

    </div>
</template>
