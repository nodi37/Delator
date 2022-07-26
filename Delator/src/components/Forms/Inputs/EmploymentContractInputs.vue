<script>
import store from '@/store';
import CompanySelector from '../Selectors/CompanySelector.vue';
import UserSelector from '../Selectors/UserSelector.vue';

export default {
    name: 'EmploymentContract',
    props: ['value', 'inputsDisabled'],
    data: () => ({
        menu: false,
        menu1: false,
        //dimensionInputDisabled: false,
        fromDateString: '',
        toDateString: '',
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
        },
        langLocale() {
            return store.getters.currentLanguage.localeTag;
        },
        fromDateLocaleString() {
            return new Date(this.model.fromDate).toLocaleDateString(this.langLocale);
        },
        toDateLocaleString() {
            return new Date(this.model.toDate).toLocaleDateString(this.langLocale);
        },
        contractTypes() {
            return store.state.contractTypes;
        }
    },
    watch: {
        // 'model.contractType': function (val) {
        //     if (val === 'full-time') {
        //         this.model.employmentDimension = 1;
        //         this.dimensionInputDisabled = true;
        //     } else {
        //         this.dimensionInputDisabled = false;
        //     }
        // },
        fromDateString(val) {
            const fromDateObj = new Date(val);
            const toDateObj = new Date(this.model.toDate);

            if (fromDateObj > toDateObj) {
                this.model.fromDate = fromDateObj.toISOString();
                this.model.toDate = fromDateObj.toISOString();
            } else {
                this.model.fromDate = fromDateObj.toISOString();
            }

        },
        toDateString(val) {
            const toDateObj = new Date(val);
            const fromDateObj = new Date(this.model.fromDate);

            if (fromDateObj > toDateObj) {
                this.model.fromDate = toDateObj.toISOString();
                this.model.toDate = toDateObj.toISOString();
            } else {
                this.model.toDate = toDateObj.toISOString();
            }
        },
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

        <UserSelector v-model="model.userEmail" :rules="[rules.required]" :multiple="false" :label="$t('user')"
            :inputsDisabled="inputsDisabled" />

        <span>{{ $t('and') + ': ' }}</span>

        <CompanySelector v-model="model.companyId" :rules="[rules.required]" :multiple="false" :label="$t('company')"
            :inputsDisabled="inputsDisabled" />

        <!-- <v-autocomplete v-model="model.contractType" :items="contractTypes" :item-text="value => $t(value)"
            :label="$t('contract-type')" outlined /> 

        <v-text-field pattern="\d*" suffix="%" outlined dense :rules="[rules.percent]"
            @input="(val) => model.employmentDimension = val / 100"
            :value="model.employmentDimension ? model.employmentDimension * 100 : ''"
            :label="$t('employment-dimension')" :disabled="inputsDisabled || dimensionInputDisabled" /> -->

        <v-text-field outlined dense :rules="[rules.isNumber, rules.required]" v-model.trim="model.hourlyWage"
            :label="$t('hourly-wage')" :disabled="inputsDisabled" />

        <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px"
            min-width="auto">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="fromDateLocaleString" :rules="[rules.required]" :label="$t('date-from')" readonly outlined v-bind="attrs"
                    v-on="on" />
            </template>
            <v-date-picker v-model="fromDateString" no-title @input="menu = false" :first-day-of-week="1"
                :locale="langLocale"></v-date-picker>
        </v-menu>

        <v-menu v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px"
            min-width="auto">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="toDateLocaleString" :rules="[rules.required]" :label="$t('date-to')" hide-details readonly outlined
                    v-bind="attrs" v-on="on" :disabled="model.permamentContract" />
            </template>
            <v-date-picker v-model="toDateString" no-title @input="menu1 = false" :first-day-of-week="1"
                :locale="langLocale"></v-date-picker>
        </v-menu>

        <v-checkbox v-model="model.permamentContract" :label="$t('permament-contract')"></v-checkbox>

    </div>
</template>


