<script>
import CompanySettingsInputs from '@/components/Forms/Inputs/CompanySettingsInputs';
import axios from 'axios';

export default {
    name: 'EditCompanySettingsForm',
    data: () => ({
        settingsId: null,
        inputsDisabled: false,
        formData: {
            pricingPlan: '',
            administratorsEmails: [],
            startingHourlyWage: '',
            settlementMethod: '',
            overtimeAllowance: '',
            freeDaysAllowance: '',
            hoursPerDayCount: '',
            breakTime: ''
        }

    }),
    props: ['companySettings'],
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.inputsDisabled = true;
                axios.patch(process.env.VUE_APP_API_PATH + `/company-settings/edit/${this.settingsId}`, this.formData, { withCredentials: true })
                    .then(res => this.$emit('edditedSettings', res.data.data))
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
        CompanySettingsInputs
    },
    mounted() {
        this.settingsId = this.companySettings._id;
        this.formData = this.companySettings;
    }
}
</script>

<template>
    <v-form @submit.prevent="submit" ref="form">

        <CompanySettingsInputs v-model="formData" :inputsDisabled="inputsDisabled"/>

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