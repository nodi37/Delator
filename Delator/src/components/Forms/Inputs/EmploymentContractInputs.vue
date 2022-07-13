<script>
import store from '@/store';
import CompanySelector from '../Selectors/CompanySelector.vue';
import UserSelector from '../Selectors/UserSelector.vue';

export default {
    name: 'EmploymentContract',
    props: ['value', 'inputsDisabled'],
    data: () => ({
        rules: {
            required: value => !!value || 'This field is equired.',
            isNumber: value => { if (!!value) { return !isNaN(value) || 'This field should be a number.' } else { return true } },
            percent: value => { if (!!value) { return (value >= 0 && value <= 100) || 'This field should be a number between 0-100.' } else { return true } },
            orgNumber: value => { if (!!value) { return (value.toString().length === 9) || 'Organization number shoud be 9 digits.' } else { return true } },
        }
    }),
    computed: {
        model: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        },
        settlementMethods() {
            return store.state.settlementMethods;
        }
    },
    components: {
        CompanySelector,
        UserSelector
    }
}
</script>

<template>
    <div>

        <span>{{ $t('contract-between') + ': ' }}</span>

        <UserSelector v-model="model.userEmail" :multiple="false" label="user" :inputsDisabled="inputsDisabled" />

        <span>{{ $t('and') + ': ' }}</span>

        <CompanySelector v-model="model.companyId" :multiple="false" label="company" :inputsDisabled="inputsDisabled" />

        <v-text-field type="text" outlined dense :rules="[rules.required]" v-model.trim="model.contractType"
            :label="$t('contract-type')" :disabled="inputsDisabled" />

        <v-text-field outlined dense :rules="[rules.isNumber]" v-model.trim="model.hourlyWage"
            :label="$t('hourly-wage')" :disabled="inputsDisabled" />

        <v-text-field pattern="\d*" outlined dense :rules="[rules.percent]"
            @input="(val) => model.employmentDimension = val / 100"
            :value="model.employmentDimension ? model.employmentDimension * 100 : ''"
            :label="$t('employment-dimension')" :disabled="inputsDisabled" />

    </div>
</template>


