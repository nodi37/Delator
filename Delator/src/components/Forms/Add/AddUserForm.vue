<script>
import UserInputs from '@/components/Forms/Inputs/UserInputs';
import axios from 'axios';

export default {
    name: 'AddUserForm',
    data: () => ({
        userInputData: {
            inputsDisabled: false,
            formData: {
                name: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                photo: ''
            }
        }
    }),
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.userInputData.inputsDisabled = true;
                axios.post(process.env.VUE_APP_API_PATH + '/user', this.userInputData.formData, { withCredentials: true })
                    .then(res => this.$emit('addedUser', res.data.data))
                    .catch(err => {
                        console.log(err);
                        alert(this.$t('error-occured'));
                    })
                    .finally(() => this.inputsDisabled = false);
            }
        },
        clearForm() {
            this.userInputData.formData = {};
        }
    },
    components: {
        UserInputs
    }
}
</script>

<template>
    <v-form @submit.prevent="submit" ref="form">

        <UserInputs v-model="userInputData" />

        <div class="d-flex justify-end">
            <v-btn @click="clearForm" color="#BDBDBD" class="white--text mr-4">
                {{ $t('clear') }}
            </v-btn>
            <v-btn type="submit" color="#00E676" class="white--text">
                {{ $t('save') }}
            </v-btn>
        </div>

    </v-form>
</template>