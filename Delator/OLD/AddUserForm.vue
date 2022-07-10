<script>
export default {
    name: 'AddCompanyForm',
    data: () => ({
        formInvalid: true,
        form: {
            name: '',
            surname: '',
            email: '',
            phoneNumber: '',
            hourlyRate: '',
            employeeType: '',
            photo: ''
        },
        rules: {
            required: value => !!value || 'This field is equired.',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
            isNumber: value => !isNaN(value) || 'This field should be a number'
        }
    }),
    methods: {
        clearForm() {
            this.form.name = '';
            this.form.surname = '';
            this.form.email = '';
            this.form.phoneNumber = '';
            this.form.hourlyRate = '';
            this.form.employeeType = '';
            this.form.photo='';
            this.formInvalid=true;
        }
    },
    computed: {
        employeePositions() {
            return this.$store.state.employeePositions.map((value) => this.$t(value))
        }
    },
    watch: {
        'form.phoneNumber': function (value) {
            this.form.phoneNumber = value.replaceAll(' ', '');
        },
        'form.hourlyRate': function (value) {
            this.form.hourlyRate = value.replaceAll(',', '.').replaceAll(' ', '')
        },
        form: {
            handler: function () {
                console.log(this.$refs.form)
                //this.formInvalid=!this.$refs.form.validate();
            },
            deep: true
        }
    }
}

</script>

<template>
    <v-form ref="form">
        <v-text-field :rules="[rules.required]" v-model.trim="form.name" :label="$t('name')" />
        <v-text-field v-model.trim="form.surname" :label="$t('surname')" />
        <v-text-field :rules="[rules.required, rules.email]" v-model.trim="form.email" :label="$t('e-mail-adress')" />
        <v-text-field :rules="[rules.isNumber]" v-model.trim="form.phoneNumber" :label="$t('phone-number')" />
        <v-text-field :rules="[rules.isNumber]" v-model.trim="form.hourlyRate" :label="$t('hourly-rate')" />
        <v-select :label="$t('position')" :rules="[rules.required]" :items="employeePositions"
            v-model="form.employeeType" />
        <v-file-input :label="$t('photo')" prepend-icon="mdi-account-box"></v-file-input>
        <div class="d-flex justify-end">
            <v-btn @click="clearForm" color="#BDBDBD" class="white--text mr-4">{{ $t('clean') }}</v-btn>
            <v-btn color="#00E676" class="white--text" :disabled="formInvalid">{{ $t('save') }}</v-btn>
        </div>
    </v-form>
</template>