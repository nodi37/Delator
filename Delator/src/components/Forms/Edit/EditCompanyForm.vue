<script>
import CompanyInputs from '@/components/Forms/Inputs/CompanyInputs';
import axios from 'axios';

export default {
    name: 'EditCompanyForm',
    data: () => ({
        companyId: null,
        inputsDisabled: false,
        formData: {
            pricingPlan: '',

            orgNumber: '',
            companyName: '',
            companyDescription: '',
            administratorsIds: [],
            logo: '',

            startingHourlyWage: '',
            settlementMethod: '',
            overtimeAllowance: '',
            freeDaysAllowance: '',
            hoursPerDayCount: '',
            breakTime: ''
        }

    }),
    props: ['companyData'],
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.inputsDisabled = true;
                axios.patch(process.env.VUE_APP_API_PATH + `/company/${this.companyId}`, this.formData, { withCredentials: true })
                    .then(res => this.$emit('edditedCompany', res.data.data))
                    .catch(err => {
                        console.log(err);
                        alert(this.$t('error-occured'));
                    })
                    .finally(() => this.inputsDisabled = false);
            }
        },
        clearForm() {
            this.formData = {};
        }
    },
    components: {
        CompanyInputs
    },
    mounted() {
        this.companyId = this.companyData._id;
        this.formData = this.companyData;
    }
}
</script>

<template>
    <v-form @submit.prevent="submit" ref="form">

        <CompanyInputs v-model="formData" :inputsDisabled="inputsDisabled"/>

        <div class="d-flex justify-end">
            <v-btn @click="$emit('cancel')" color="warning" class="white--text mr-4">
                {{ $t('cancel') }}
            </v-btn>
            <v-btn @click="clearForm" color="#BDBDBD" class="white--text mr-4">
                {{ $t('clear') }}
            </v-btn>
            <v-btn type="submit" color="#00E676" class="white--text">
                {{ $t('save') }}
            </v-btn>
        </div>

    </v-form>
</template>