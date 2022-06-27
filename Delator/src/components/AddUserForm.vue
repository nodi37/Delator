<script>
export default {
    name: 'AddUserForm',
    data: () => ({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        hourlyRate: '',
        employeeType: '',
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
            this.name =''
            this.surname =''
            this.email =''
            this.phoneNumber =''
            this.hourlyRate =''
            this.employeeType =''
        }
    },
    computed: {
        employeePositions() {
            return this.$store.state.employeePositions.map((value)=> this.$t(value))
        }
    },
    watch: {
        phoneNumber(value) {
            this.phoneNumber = value.replaceAll(' ', '')
        },
        hourlyRate(value) {
            this.hourlyRate = value.replaceAll(',', '.').replaceAll(' ', '')
        }
    }
}

//Validacja
//
</script>

<template>
    <v-form>
        <v-text-field :rules="[rules.required]" v-model.trim="name" :label="$t('name')" />
        <v-text-field v-model.trim="surname" :label="$t('surname')" />
        <v-text-field :rules="[rules.required, rules.email]" v-model.trim="email" :label="$t('e-mail-adress')" />
        <v-text-field :rules="[rules.isNumber]" v-model.trim="phoneNumber"
            :label="$t('phone-number')" />
        <v-text-field :rules="[rules.isNumber]" v-model.trim="hourlyRate" :label="$t('hourly-rate')" />
        <v-select :label="$t('position')" :rules="[rules.required]" :items="employeePositions" />
        <v-file-input :label="$t('photo')" prepend-icon="mdi-account-box"></v-file-input>
        <div class="d-flex justify-end">
            <v-btn @click="clearForm" color="#BDBDBD" class="white--text mr-4">{{ $t('clean') }}</v-btn>
            <v-btn color="#00E676" class="white--text">{{ $t('save') }}</v-btn>
        </div>
    </v-form>
</template>