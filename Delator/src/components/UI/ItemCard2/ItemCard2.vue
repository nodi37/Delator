<script>
export default {
    name: 'ItemCard',
}
</script>
<template>
    <v-card elevation="3">
        <v-list-item>
            <v-list-item-content>
                <slot name="content">

                </slot>
            </v-list-item-content>
            <slot name="avatar">

            </slot>
        </v-list-item>
        <v-card-actions>
            <slot name="actions">

            </slot>
        </v-card-actions>
    </v-card>
</template>
