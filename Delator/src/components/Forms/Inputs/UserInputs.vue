<script>
import compressImage from '@/helpers/imageCompressor';
export default {
    name: 'UserInputs',
    props: ['value', 'inputsDisabled'],
    data: () => ({
        rules: {
            required: value => !!value || 'This field is equired.',
            isNumber: value => { if (!!value) { return !isNaN(value) || 'This field should be a number.' } else { return true } },
            percent: value => { if (!!value) { return (value >= 0 && value <= 100) || 'This field should be a number between 0-100.' } else { return true } },
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
        }
    }),
    methods: {
        async preparePhoto(img) {
            if (!!img) {
                this.model.photo = await compressImage(img, 400);
            } else {
                this.model.photo = '';
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
    
    }
}
</script>

<template>
    <div>
        <v-text-field outlined dense v-model.trim="model.name" :label="$t('name')"
            :disabled="inputsDisabled" />

        <v-text-field outlined dense v-model.trim="model.lastName"
            :label="$t('last-name')" :disabled="inputsDisabled" />

        <v-text-field outlined dense :rules="[rules.required, rules.email]" v-model.trim="model.email"
            :label="$t('email')" :disabled="inputsDisabled" />

        <v-text-field pattern="\d*" outlined dense :rules="[rules.isNumber]" v-model.trim="model.phoneNumber"
            :label="$t('phone-number')" :disabled="inputsDisabled" />

        <v-file-input outlined dense accept="image/*" :label="$t('photo')" @change="preparePhoto"
            prepend-icon="mdi-image" :disabled="inputsDisabled" />

    </div>
</template>
