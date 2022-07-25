<script>
import CompanyDataInputs from '@/components/Forms/Inputs/CompanyDataInputs';
import axios from 'axios';

export default {
    name: 'AddCompanyForm',
    data: () => ({
        inputsDisabled: false,
        formData: {
            orgNumber: '',
            companyName: '',
            companyDescription: '',
            logo: '',
        }
    }),
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.inputsDisabled = true;
                axios.post(process.env.VUE_APP_API_PATH + '/company/add', this.formData, { withCredentials: true })
                    .then(res => {
                        this.clearForm();
                        this.$emit('addedCompany', res.data.data);
                    }).catch(err => {
                        console.log(err);
                        alert(this.$t('error-occured'));
                    }).finally(() => this.inputsDisabled = false);
            }
        },
        clearForm() {
            this.formData = {};
        }
    },
    components: {
        CompanyDataInputs
    }
}
</script>

<template>
    <v-form @submit.prevent="submit" ref="form">

        <CompanyDataInputs v-model="formData" :inputsDisabled="inputsDisabled" />

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