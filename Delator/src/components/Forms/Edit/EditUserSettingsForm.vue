<script>
import UserSettingsInputs from '@/components/Forms/Inputs/UserSettingsInputs';
import axios from 'axios';

export default {
    name: 'EditUserSettingsForm',
    data: () => ({
        settingsId: '',
        inputsDisabled: false,
        formData: {
            language: '',
            newPassword: ''
        }

    }),
    props: ['userSettings'],
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.inputsDisabled = true;
                axios.patch(process.env.VUE_APP_API_PATH + '/user-settings/edit/' + this.settingsId, this.formData, { withCredentials: true })
                    .then(res => this.$emit('editedUserSettings', res.data.data))
                    .catch(err => {
                        console.log(err);
                        alert(this.$t('error-occured'));
                    })
                    .finally(() => this.inputsDisabled = false);
            }
        },
        clearForm() {
            this.formData = {};
        }
    },
    mounted() {
        this.settingsId = this.userSettings._id;
        this.formData = this.userSettings;
    },
    components: {
        UserSettingsInputs
    }
}
</script>

<template>
    <v-form @submit.prevent="submit" ref="form">

        <UserSettingsInputs v-model="formData" :inputsDisabled="inputsDisabled"/>

        <div class="d-flex justify-end">
            <v-btn @click="$emit('cancel')" color="warning" class="white--text mr-4">
                {{ $t('cancel') }}
            </v-btn>
            <v-btn @click="clearForm" color="#BDBDBD" class="white--text mr-4">
                {{ $t('clear') }}
            </v-btn>
            <v-btn type="submit" color="#00E676" class="white--text">
                {{ $t('save') }}
            </v-btn>
        </div>

    </v-form>
</template>