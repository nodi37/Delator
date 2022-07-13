<script>
export default {
    //I know this is bad and wont scale
    name: 'InfoBoard',
    props: ['data']
}
</script>

<template>
    <div class="pa-2">
        <div v-for="item in data" :key="item.name">
            <p v-if="item.type === 'text'" class="subtitle-1"><b>{{ $t(item.name) }}</b>: {{ item.value }}</p>
            <p v-if="item.type === 'percent'" class="subtitle-1"><b>{{ $t(item.name) }}</b>: {{ item.value * 100 }}%</p>
            <v-avatar class="mb-2" v-if="item.type === 'image'" color="primary" rounded size="80">
                <img class="card-avatar-img" :src="item.value">
            </v-avatar>
        </div>
        <div>
            <slot>
                
            </slot>
        </div>
        <div class="d-flex justify-end">
            <slot name="actions">

            </slot>
        </div>

    </div>
</template>