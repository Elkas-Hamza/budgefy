<script setup>
import AppToastHost from './components/AppToastHost.vue'
import AppConfirmHost from './components/AppConfirmHost.vue'
</script>

<template>
  <router-view />
  <AppToastHost />
  <AppConfirmHost />
</template>
