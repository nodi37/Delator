<script>
import store from '@/store';
import compressImage from '@/helpers/imageCompressor';
import axios from 'axios';

export default {
    name: 'AddCompanyForm',
    data: () => ({
        administratorsData: [],
        administratorsLoaded: false,
        inputsDisabled: false,
        rules: {
            required: value => !!value || 'This field is equired.',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
            isNumber: value => !isNaN(value) || 'This field should be a number'
        }
    }),
    props: ['company', 'administrators'],
    methods: {
        loadAdminData(arr) {
            arr.forEach(admin => {
                axios.get(process.env.VUE_APP_API_PATH + `/user/${admin.id}`, { withCredentials: true })
                    .then(res => this.administratorsData.push(res.data.data));
            });
        },
        removeAdmin(id) {
            this.administratorsData = this.administratorsData.filter(admin => admin._id !== id);
            this.model.administrators = this.model.administrators.filter(admin => admin.id !== id);
        },
        async prepareLogo(img) {
            this.inputsDisabled = true;
            if (!!img) {
                this.model.logo = await compressImage(img, 400);
            } else {
                this.model.logo = '';
            }
            this.inputsDisabled = false;
        }
    },
    watch: {
        administrators: function (newVal) {
            if (!this.administratorsLoaded) {
                this.administratorsLoaded = true;
                this.loadAdminData(newVal);
            }
        },
    },
    computed: {
        model: {
            get() {
                return this.company
            },
            set(value) {
                this.$emit('input', value)
            }
        },
        smth() {
            return ['1', '2']
        },
        pricingPlans() {
            return store.state.pricingPlans;
        },
        settlementMethods() {
            return store.state.settlementMethods;
        }
    }
}
</script>

<template>
    <v-form ref="addCompanyForm">

        <v-text-field outlined dense :rules="[rules.isNumber]" v-model.trim="model.orgNumber" :label="$t('org-number')"
            :disabled="inputsDisabled" />

        <v-text-field outlined dense :rules="[rules.required]" v-model.trim="model.name" :label="$t('company-name')"
            :disabled="inputsDisabled" />

        <v-textarea auto-grow outlined rows="3" row-height="15" :label="$t('description')" v-model="model.description"
            :disabled="inputsDisabled">
        </v-textarea>
        <!-- 
        <v-row class="ma-0 mb-8">
            <v-chip class="mr-2" v-for="admin in administratorsData" :key="admin._id"
                @click:close="removeAdmin(admin._id)" color="primary" close label outlined>
                {{ `${admin.name}(${admin.email})` }}
            </v-chip>
        </v-row> 
        <v-combobox v-model="administratorsData" outlined dense :items="smth" chips clearable :label="$t('administrators')" multiple solo>
        -->

        <v-combobox clearable dense multiple outlined :label="$t('administrators')">


        </v-combobox>


        <v-text-field outlined dense :rules="[rules.isNumber]" v-model.trim="model.defHourlyRate"
            :label="$t('def-hourly-rate')" :disabled="inputsDisabled" />

        <v-text-field outlined dense :rules="[rules.isNumber]" v-model.trim="model.defTotalBreakTime"
            :label="$t('def-total-break-time')" :disabled="inputsDisabled" />

        <v-select outlined dense :label="$t('settlement-method')" :items="settlementMethods" :item-text="$t('title')"
            item-value="no" v-model="model.settlementMethod" :disabled="inputsDisabled" />

        <v-text-field outlined dense :rules="[rules.isNumber]" v-model.trim="model.stdHrsPerDay"
            :label="$t('def-hours-per-day')" :disabled="inputsDisabled" />

        <v-text-field outlined dense :rules="[rules.isNumber]" v-model.trim="model.overtimeAllowance"
            :label="$t('overtime-allowance')" :disabled="inputsDisabled" />

        <v-text-field outlined dense :rules="[rules.isNumber]" v-model.trim="model.freeDaysAllowance"
            :label="$t('free-days-allowance')" :disabled="inputsDisabled" />

        <v-select outlined dense :label="$t('pricing-plan')" :items="pricingPlans" :item-text="$t('title')"
            item-value="no" v-model="model.pricingPlan" :disabled="inputsDisabled" />

        <v-file-input outlined dense accept="image/*" :label="$t('logo')" @change="prepareLogo" prepend-icon="mdi-image"
            :disabled="inputsDisabled" />

        <slot name="actions">

        </slot>

    </v-form>
</template>