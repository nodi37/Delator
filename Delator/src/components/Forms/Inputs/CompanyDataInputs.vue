<script>
import compressImage from '@/helpers/imageCompressor';
import axios from 'axios';

export default {
    name: 'CompanyDataInputs',
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
        }
    }
}
</script>

<template>
    <div>
        <v-text-field pattern="\d*" outlined dense counter="9" :rules="[rules.isNumber, rules.orgNumber]"
            v-model.trim="model.orgNumber" :label="$t('org-number')" :disabled="inputsDisabled" />

        <v-text-field outlined dense :rules="[rules.required]" v-model.trim="model.companyName"
            :label="$t('company-name')" :disabled="inputsDisabled" />

        <v-textarea auto-grow outlined rows="3" row-height="15" :label="$t('description')"
            v-model="model.companyDescription" :disabled="inputsDisabled">
        </v-textarea>

        <v-file-input outlined dense accept="image/*" :label="$t('logo')" @change="prepareLogo" prepend-icon="mdi-image"
            :disabled="inputsDisabled" />
    </div>

</template>
