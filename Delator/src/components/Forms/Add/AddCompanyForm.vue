<script>
//import CompanyInputs from '@/components/Forms/Inputs/CompanyInputs';
import axios from 'axios';

export default {
    name: 'AddCompanyForm',
    data: () => ({
        companyInputData: {
            inputsDisabled: false,
            formData: {
                pricingPlan: '',

                orgNumber: '',
                companyName: '',
                companyDescription: '',
                administratorsEmails: [],
                logo: '',

                startingHourlyWage: '',
                settlementMethod: '',
                overtimeAllowance: '',
                freeDaysAllowance: '',
                hoursPerDayCount: '',
                breakTime: ''
            }
        }
    }),
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.companyInputData.inputsDisabled = true;
                axios.post(process.env.VUE_APP_API_PATH + '/company', this.companyInputData.formData, { withCredentials: true })
                    .then(res => this.$emit('addedCompany', res.data.data))
                    .catch(err => {
                        console.log(err);
                        alert(this.$t('error-occured'));
                    })
                    .finally(() => this.inputsDisabled = false);
            }
        },
        clearForm() {
            this.companyInputData.formData = {};
        }
    },
    components: {
        //CompanyInputs
    }
}
</script>

<template>
    <v-form @submit.prevent="submit" ref="form">

        <!-- <CompanyInputs v-model="companyInputData" /> -->

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