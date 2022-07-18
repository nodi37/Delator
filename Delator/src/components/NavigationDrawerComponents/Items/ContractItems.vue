<script>
export default {
    name: 'ContractItems',
    props: ['items']
}
</script>

<template>
    <v-list class="pa-0">
        <v-list-group v-for="item in items" :key="item.title" :value="true">
            <template v-slot:activator>
                <v-list-item-avatar size="30">
                    <v-img :src="item.logo"></v-img>
                </v-list-item-avatar>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </template>

            <v-list-item sub-list :to="{ name: 'companyEditor', params: { companyId: item.companyId } }">
                <v-list-item-icon>
                    <v-icon>
                        mdi-store-clock-outline
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    {{ $t('work-schedule') }}
                </v-list-item-title>
            </v-list-item>


            <v-list-item sub-list :to="{ name: 'companyEditor', params: { companyId: item.companyId } }">
                <v-list-item-icon>
                    <v-icon>
                        mdi-file-chart-outline
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    {{ $t('reports') }}
                </v-list-item-title>
            </v-list-item>

            <v-list-item sub-list :to="{ name: 'companyEditor', params: { companyId: item.companyId } }">
                <v-list-item-icon>
                    <v-icon>
                        mdi-file-sign
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    {{ $t('contract') }}
                </v-list-item-title>
            </v-list-item>

            <v-list-item sub-list :to="{ name: 'companyEditor', params: { companyId: item.companyId } }">
                <v-list-item-icon>
                    <v-icon>
                        mdi-coffee
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    {{ $t('holidays') }}
                </v-list-item-title>
            </v-list-item>

        </v-list-group>
    </v-list>
</template>            
