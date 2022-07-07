<script>
import store from '@/store';
import compressImage from '@/helpers/imageCompressor';
import axios from 'axios';

export default {
    name: 'AddCompanyForm',
    data: () => ({
        inputsDisabled: false,
        form: {
            name: '',
            logo: '',
            pricingPlan: 0
        },
        rules: {
            required: value => !!value || 'This field is equired.'
        }
    }),
    methods: {
        async prepareLogo(img) {
            this.inputsDisabled = true;
            if (!!img) {
                this.form.logo = await compressImage(img, 400);
            } else {
                this.form.logo = '';
            }
            this.inputsDisabled = false;
        },
        clearForm() {
            this.form.name = '';
            this.form.logo = '';
            this.form.pricingPlan = 0;
        },
        submitForm() {
            if (this.$refs.form.validate()) {
                this.inputsDisabled = true;
                axios.post(process.env.VUE_APP_API_PATH + '/company', {
                    name: this.form.name,
                    pricingPlan: this.form.pricingPlan,
                    logo: this.form.logo
                })
                    .then(res => this.$emit('addedCompany', res.data.data))
                    .catch(err => {
                        alert($t('error-occured'));
                        console.log(err);
                    })
                    .finally(() => this.inputsDisabled = false);
            }
        }
    },
    computed: {
        pricingPlans() {
            return store.state.pricingPlans;
        }
    }
}
</script>

<template>
    <v-form @submit.prevent="submitForm" ref="form">
        <v-text-field :rules="[rules.required]" v-model.trim="form.name" :label="$t('company-name')" :disabled="inputsDisabled"/>

        <v-select :label="$t('pricing-plan')" :items="pricingPlans" :item-text="$t('title')" item-value="no" v-model="form.pricingPlan" :disabled="inputsDisabled"/>

        <v-file-input accept="image/*" :label="$t('logo')" @change="prepareLogo" prepend-icon="mdi-image" :disabled="inputsDisabled"/>

        <div class="d-flex justify-end">
            <v-btn @click="clearForm" color="#BDBDBD" class="white--text mr-4" :disabled="inputsDisabled">{{ $t('clear') }}</v-btn>
            <v-btn type="submit" color="#00E676" class="white--text" :disabled="inputsDisabled">{{ $t('save') }}</v-btn>
        </div>
    </v-form>
</template>