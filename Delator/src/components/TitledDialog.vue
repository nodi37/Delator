<script>
export default {
    name: 'TitledDialog',
    props: {
        value: {
            type: Boolean
        },
        title: {
            type: String,
            required: true
        }
    },
    computed: {
        show: {
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
    <v-dialog v-model="show" persistent max-width="600">
        <v-card>
            <v-app-bar flat dense>
                <v-btn icon @click="show = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title class="text-h6 font-weight-regular pl-0">
                    {{ $t(title) }}
                </v-toolbar-title>
            </v-app-bar>
            <v-card class="pa-4">
                <slot></slot>
            </v-card>
        </v-card>
    </v-dialog>
</template>
