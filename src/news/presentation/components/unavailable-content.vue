<script setup lang="js">
  import {useI18n} from "vue-i18n";
  import {toRefs} from "vue";

  /**
   * Presentation fallback component for infrastructure/application errors.
   *
   * @remarks
   * This component displays error objects produced by failed use-case execution.
   */

  /**
   * @typedef {Object} UnavailableContentProps
   * @property {unknown[]} errors
   */

  const { t } = useI18n();

  /** @type {UnavailableContentProps} */
  const props = defineProps({ errors: { type: Array, required: true }});
  const { errors } = toRefs(props);
</script>

<template>
  <div>
    <div><h4>{{ t('unavailable-news') }}</h4></div>
    <div v-for="error in errors">
      <h6>{{ error }}</h6>
    </div>
  </div>
</template>

<style scoped>

</style>