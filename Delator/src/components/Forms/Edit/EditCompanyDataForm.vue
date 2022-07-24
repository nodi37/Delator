<script>
import CompanyDataInputs from '@/components/Forms/Inputs/CompanyDataInputs';
import axios from 'axios';

export default {
    name: 'EditCompanyDataForm',
    data: () => ({
        companyId: null,
        inputsDisabled: false,
        formData: {
            orgNumber: '',
            companyName: '',
            companyDescription: '',
            logo: '',
        }

    }),
    props: ['companyData'],
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.inputsDisabled = true;
                axios.patch(process.env.VUE_APP_API_PATH + `/company/edit/${this.companyId}`, this.formData, { withCredentials: true })
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
        CompanyDataInputs
    },
    mounted() {
        this.companyId = this.companyData._id;
        this.formData = this.companyData;
    }
}
</script>

<template>
    <v-form @submit.prevent="submit" ref="form">

        <CompanyDataInputs v-model="formData" :inputsDisabled="inputsDisabled"/>

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