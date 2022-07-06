<script>
export default {
  name: 'LoadingBar'
}
</script>

<template>
          <v-progress-linear
            transition="scale-transition"
            class="my-16"
            color="primary"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
</template>