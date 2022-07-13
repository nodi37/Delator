<script>
export default {
    name: 'TabsComponent',
    data: () => ({
        tab: 0
    }),
    props: ['tabs']
}
</script>
<template>
    <v-card>
        <v-tabs v-model="tab" dark icons-and-text>
            <v-tabs-slider></v-tabs-slider>

            <v-tab v-for="tab in tabs" :key="tab.name">
                {{ $t(tab.name) }}
                <v-icon>{{ tab.icon }}</v-icon>
            </v-tab>

        </v-tabs>

        <v-tabs-items v-model="tab">
            <slot name="tab-items">
                <!-- <v-tab-item>
                    Use v-tab-item in template
                </v-tab-item> -->
            </slot>
        </v-tabs-items>

    </v-card>
</template>