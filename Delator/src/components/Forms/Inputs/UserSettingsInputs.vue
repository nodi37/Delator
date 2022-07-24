<script>
import store from '@/store';
export default {
    name: 'UserSettingsInputs',
    props: ['value', 'inputsDisabled'],
    data: () => ({
        rules: {
            minLength: value => { if (!!value) { return value.length>7 || 'Password needs to have at least 8 characters' } else { return true } },
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
        langs() {
            return store.state.languages
        }
    }
}
</script>

<template>
    <div>

        <v-select v-model="model.language" :items="langs" item-value="shortName" item-text="fullName"
            prepend-icon="mdi-translate" :label="$t('language')" outlined dense :disabled="inputsDisabled" />

        <v-text-field v-model.trim="model.newPassword" :rules="[rules.minLength]" prepend-icon="mdi-form-textbox-password" :label="$t('password')"
            outlined dense :disabled="inputsDisabled" />

    </div>
</template>
