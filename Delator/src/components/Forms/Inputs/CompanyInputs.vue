<script>
import store from '@/store';
import compressImage from '@/helpers/imageCompressor';
import axios from 'axios';

export default {
    name: 'CompanyInputs',
    props: ['value'],
    data: () => ({
        preloaded: false,
        search: '',
        administratorsData: [],
        administratorsIds: [],
        administratorsLoading: false,
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
                this.model.formData.logo = await compressImage(img, 400);
            } else {
                this.model.formData.logo = '';
            }
        },
        fetchUsers(value) {
            this.administratorsLoading = true;
            const keyword = !!value ? `&keyword=${value}` : '';
            axios.get(process.env.VUE_APP_API_PATH + `/user?limit=5${keyword}`)
                .then(res => {
                    res.data.data.forEach((doc) => {
                        if (!this.administratorsData.includes(doc)) {
                            this.administratorsData.push(doc);
                        }
                    });
                }).catch(err => console.log(err))
                .finally(() => this.administratorsLoading = false);
        },
        fetchSingleUser(value) {
            this.administratorsLoading = true;
            axios.get(process.env.VUE_APP_API_PATH + `/user/${value}`)
                .then(res => {
                    if (!this.administratorsData.includes(res.data.data)) {
                        this.administratorsData.push(res.data.data);
                    }
                }).catch(err => console.log(err))
                .finally(() => this.administratorsLoading = false);
        },
        prepareAutocompleteItemNames: (doc) => `${doc.name}(${doc.email})`,
    },
    watch: {
        'model.formData.orgNumber': function (val) {
            if (!!val) {
                const orgNumString = val.toString();
                if (this.model.formData.name.length < 1 && orgNumString.length === 9) {
                    this.model.inputsDisabled = true;
                    axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${val}`)
                        .then(res => {
                            this.model.formData.name = res.data.navn;
                            this.model.formData.description = res.data.naeringskode1.beskrivelse;
                        })
                        .catch(err => console.log('Cant fetch company'))
                        .finally(this.model.inputsDisabled = false);
                }
            }
        },
        'model.formData.administrators': function (val) {
            if (!this.preloaded && !!val) {
                this.preloaded = true;
                val.forEach((doc) => {
                    this.fetchSingleUser(doc.id);
                    if (!this.administratorsIds.includes(doc.id)) {
                        this.administratorsIds.push(doc.id);
                    }
                });
            }
        },
        search: function (newVal) {
            this.fetchUsers(newVal);
        },
        administratorsIds: function (idsArray) {
            class AdminObj {
                constructor(id) {
                    this.id = id
                }
            }
            this.model.formData.administrators = idsArray.map((id) => new AdminObj(id));
        }
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
    mounted() {
        this.fetchUsers();
    }
}
</script>

<template>
    <div>
        <v-text-field pattern="\d*" outlined dense counter="9" :rules="[rules.isNumber, rules.orgNumber]"
            v-model.trim="model.formData.orgNumber" :label="$t('org-number')" :disabled="model.inputsDisabled" />

        <v-text-field outlined dense :rules="[rules.required]" v-model.trim="model.formData.name"
            :label="$t('company-name')" :disabled="model.inputsDisabled" />

        <v-textarea auto-grow outlined rows="3" row-height="15" :label="$t('description')"
            v-model="model.formData.description" :disabled="model.inputsDisabled">
        </v-textarea>

        <v-autocomplete v-model="administratorsIds" :loading="administratorsLoading" :search-input.sync="search"
            :items="administratorsData" :item-text="prepareAutocompleteItemNames" item-value="_id"
            :label="$t('administrators')" :disabled="model.inputsDisabled" :no-data-text="$t('no-data')" deletable-chips
            clearable multiple outlined small-chips>
        </v-autocomplete>

        <v-text-field type="number" outlined dense :rules="[rules.isNumber]" v-model.trim="model.formData.defHourlyRate"
            :label="$t('def-hourly-rate')" :disabled="model.inputsDisabled" />

        <v-text-field type="number" outlined dense :rules="[rules.isNumber]"
            v-model.trim="model.formData.defTotalBreakTime" :label="$t('def-total-break-time')"
            :disabled="model.inputsDisabled" />

        <v-select outlined dense :label="$t('settlement-method')" :items="settlementMethods" :item-text="$t('title')"
            item-value="no" v-model="model.formData.settlementMethod" :disabled="model.inputsDisabled" />

        <v-text-field type="number" outlined dense :rules="[rules.isNumber]" v-model.trim="model.formData.stdHrsPerDay"
            :label="$t('def-hours-per-day')" :disabled="model.inputsDisabled" />

        <v-text-field pattern="\d*" outlined dense :rules="[rules.percent]"
            @input="(val)=>model.formData.overtimeAllowance = val / 100"
            :value="model.formData.overtimeAllowance ? model.formData.overtimeAllowance * 100 : ''"
            :label="$t('overtime-allowance')" :disabled="model.inputsDisabled" />

        <v-text-field pattern="\d*" outlined dense :rules="[rules.percent]"
            @input="(val)=>model.formData.freeDaysAllowance = val / 100"
            :value="model.formData.freeDaysAllowance ? model.formData.freeDaysAllowance * 100 : ''"
            :label="$t('free-days-allowance')" :disabled="model.inputsDisabled" />

        <v-select outlined dense :rules="[rules.required]" :label="$t('pricing-plan')" :items="pricingPlans"
            :item-text="$t('title')" item-value="no" v-model="model.formData.pricingPlan"
            :disabled="model.inputsDisabled" />

        <v-file-input outlined dense accept="image/*" :label="$t('logo')" @change="prepareLogo" prepend-icon="mdi-image"
            :disabled="model.inputsDisabled" />
    </div>
</template>
