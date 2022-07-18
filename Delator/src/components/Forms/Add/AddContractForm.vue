<script>
import EmploymentContractInputs from '../Inputs/EmploymentContractInputs.vue';
import axios from 'axios';

export default {
    name: 'AddContractForm',
    data: () => ({
        inputsDisabled: false,
        formData: {
            userId: '',
            userName: '',
            userEmail: '',
            companyId: '',
            hourlyWage: '',
            contractType: '',
            employmentDimension: ''
        }
    }),
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                console.log(this.formData)
                this.inputsDisabled = true;
                axios.post(process.env.VUE_APP_API_PATH + '/contract', this.formData, { withCredentials: true })
                    .then(res => this.$emit('addedContract', res.data.data))
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
        EmploymentContractInputs
    }
}
</script>

<template>
    <v-form class="pa-4" @submit.prevent="submit" ref="form">

        <EmploymentContractInputs v-model="formData" :inputsDisabled="inputsDisabled" />

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