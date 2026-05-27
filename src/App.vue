<template>
  <v-app>
    <v-main>
      <Monitor />
      <v-btn
        class="m-2"
        icon="mdi-theme-light-dark"
        location="top right"
        position="absolute"
        @click="$vuetify.theme.cycle()"
      />
    </v-main>
  </v-app>
</template>

<script setup>
import Monitor from "@/components/Monitor.vue";
</script>
