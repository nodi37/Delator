<script>
import store from '@/store';
import compressImage from '@/helpers/imageCompressor';
import axios from 'axios';
import UserSelector from '@/components/Forms/Selectors/UserSelector.vue';

export default {
    name: 'CompanyInputs',
    props: ['value', 'inputsDisabled'],
    data: () => ({
        rules: {
            required: value => !!value || 'This field is equired.',
            isNumber: value => { if (!!value) { return !isNaN(value) || 'This field should be a number.' } else { return true } },
            percent: value => { if (!!value) { return (value >= 0 && value <= 100) || 'This field should be a number between 0-100.' } else { return true } },
            orgNumber: value => { if (!!value) { return (value.toString().length === 9) || 'Organization number shoud be 9 digits.' } else { return true } },
        }
    }),
    methods: {
        async prepareLogo(img) {
            if (!!img) {
                this.model.logo = await compressImage(img, 400);
            } else {
                this.model.logo = '';
            }
        }
    },
    watch: {
        'model.orgNumber': function (val) {
            if (!!val) {
                const orgNumString = val.toString();
                if (this.model.companyName.length < 1 && orgNumString.length === 9) {
                    this.inputsDisabled = true;
                    axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${val}`)
                        .then(res => {
                            this.model.companyName = res.data.navn;
                            this.model.description = res.data.naeringskode1.beskrivelse;
                        })
                        .catch(err => console.log('Cant fetch company'))
                        .finally(this.inputsDisabled = false);
                }
            }
        },
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
        pricingPlans() {
            return store.state.pricingPlans;
        },
        settlementMethods() {
            return store.state.settlementMethods;
        }
    },
    components: {
        UserSelector
    }
}
</script>

<template>
    <div>

        <v-select outlined dense :rules="[rules.required]" :label="$t('pricing-plan')" :items="pricingPlans"
            :item-text="$t('title')" item-value="no" v-model="model.pricingPlan" :disabled="inputsDisabled" />

        <v-text-field pattern="\d*" outlined dense counter="9" :rules="[rules.isNumber, rules.orgNumber]"
            v-model.trim="model.orgNumber" :label="$t('org-number')" :disabled="inputsDisabled" />

        <v-text-field outlined dense :rules="[rules.required]" v-model.trim="model.companyName"
            :label="$t('company-name')" :disabled="inputsDisabled" />

        <v-textarea auto-grow outlined rows="3" row-height="15" :label="$t('description')"
            v-model="model.companyDescription" :disabled="inputsDisabled">
        </v-textarea>

        <UserSelector v-model="model.administratorsIds" label="administrators" :multiple="true" />

        <v-select outlined dense :label="$t('settlement-method')" :items="settlementMethods" :item-text="$t('title')"
            item-value="no" v-model="model.settlementMethod" :disabled="inputsDisabled" />

        <v-text-field  outlined dense :rules="[rules.isNumber]" v-model.trim="model.startingHourlyWage"
            :label="$t('def-hourly-wage')" :disabled="inputsDisabled" />

        <v-text-field pattern="\d*" outlined dense :rules="[rules.percent]" suffix="%"
            @input="(val) => model.overtimeAllowance = val / 100"
            :value="model.overtimeAllowance ? model.overtimeAllowance * 100 : ''" :label="$t('overtime-allowance')"
            :disabled="inputsDisabled" />

        <v-text-field pattern="\d*" outlined dense :rules="[rules.percent]" suffix="%"
            @input="(val) => model.freeDaysAllowance = val / 100"
            :value="model.freeDaysAllowance ? model.freeDaysAllowance * 100 : ''" :label="$t('free-days-allowance')"
            :disabled="inputsDisabled" />

        <v-text-field  outlined dense :rules="[rules.isNumber]" v-model.trim="model.hoursPerDayCount"
            :label="$t('def-hours-per-day')" :disabled="inputsDisabled" />

        <v-text-field  outlined dense :rules="[rules.isNumber]" v-model.trim="model.breakTime"
            :label="$t('def-total-break-time')" :disabled="inputsDisabled" />

        <v-file-input outlined dense accept="image/*" :label="$t('logo')" @change="prepareLogo" prepend-icon="mdi-image"
            :disabled="inputsDisabled" />
    </div>

</template>
