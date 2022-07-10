<script>
import store from '@/store';

export default {
    name: 'UserInCompanyProperties',
    props: ['value'],
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
    }
}
</script>

<template>
    <v-card outlined class="ml-4 mb-4 pa-1">
        <div class="text-overline mb-4">
            {{ model.name }}
        </div>
        <v-text-field type="number" outlined dense :rules="[rules.isNumber]" v-model.trim="model.hourlyRate"
            :label="$t('hourly-rate')" :disabled="model.inputsDisabled" />

        <v-text-field type="number" outlined dense :rules="[rules.isNumber]" v-model.trim="model.defTotalBreakTime"
            :label="$t('def-total-break-time')" :disabled="model.inputsDisabled" />

        <v-select outlined dense :label="$t('settlement-method')" :items="settlementMethods" :item-text="$t('title')"
            item-value="no" v-model="model.settlementMethod" :disabled="model.inputsDisabled" />

        <v-text-field type="number" outlined dense :rules="[rules.isNumber]" v-model.trim="model.stdHrsPerDay"
            :label="$t('def-hours-per-day')" :disabled="model.inputsDisabled" />

        <v-text-field pattern="\d*" outlined dense :rules="[rules.percent]"
            @input="(val) => model.overtimeAllowance = val / 100"
            :value="model.overtimeAllowance ? model.overtimeAllowance * 100 : ''" :label="$t('overtime-allowance')"
            :disabled="model.inputsDisabled" />

        <v-text-field pattern="\d*" outlined dense :rules="[rules.percent]"
            @input="(val) => model.freeDaysAllowance = val / 100"
            :value="model.freeDaysAllowance ? model.freeDaysAllowance * 100 : ''" :label="$t('free-days-allowance')"
            :disabled="model.inputsDisabled" />

    </v-card>
</template>


