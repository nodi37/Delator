<script>
import CompanyInputs from '@/components/Forms/Inputs/CompanyInputs';
import axios from 'axios';

export default {
    name: 'EditCompanyForm',
    data: () => ({
        companyId: null,
        companyInputData: {
            inputsDisabled: false,
            currentAdministratorsIds: null,
            formData: {
                name: '',
                description: '',
                orgNumber: null,
                administrators: [],
                defHourlyRate: null,
                defTotalBreakTime: null,
                settlementMethod: null,
                stdHrsPerDay: null,
                overtimeAllowance: null,
                freeDaysAllowance: null,
                pricingPlan: null,
                logo: ''
            }
        }
    }),
    props: ['companyData'],
    watch: {
        companyData(val) {
            this.companyId = val._id;
            this.companyInputData.formData = val;
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.companyInputData.inputsDisabled = true;
                axios.patch(process.env.VUE_APP_API_PATH + `/company/${this.companyId}`, this.companyInputData.formData)
                    .then(res => this.$emit('savedData', res.data.data))
                    .catch(err => {
                        console.log(err);
                        alert(this.$t('error-occured'));
                    })
                    .finally(() => this.companyInputData.inputsDisabled = false);
            }
        },
        clearForm() {
            this.companyInputData.formData = {};
        }
    },
    components: {
        CompanyInputs
    }
}
</script>

<template>
    <v-form @submit.prevent="submit" ref="form">

        <CompanyInputs v-model="companyInputData" />

        <div class="d-flex justify-end">
            <v-btn @click="clearForm" color="#BDBDBD" class="white--text mr-4">
                {{ $t('clear') }}
            </v-btn>
            <v-btn type="submit" color="#00E676" class="white--text">
                {{ $t('save') }}
            </v-btn>
        </div>

    </v-form>
</template>