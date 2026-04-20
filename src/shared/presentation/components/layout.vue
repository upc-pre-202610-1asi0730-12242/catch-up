<script setup>
import {ref} from "vue";
import LanguageSwitcher from "./language-switcher.vue";
import FooterContent from "./footer-content.vue";

const drawerVisible = ref(false);

const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value;
}

</script>

<template>
<div>
  <div>
    <pv-menubar>
      <template #start>
        <pv-button icon="pi pi-bars" label="CatchUp" text @click="toggleDrawer" />
        <!-- TODO: Add source list -->
      </template>
      <template #end>
        <language-switcher></language-switcher>
      </template>
    </pv-menubar>
  </div>
</div>
<div>
  <!-- TODO: Add article list -->
</div>
<footer-content></footer-content>
</template>

<style scoped>

</style>