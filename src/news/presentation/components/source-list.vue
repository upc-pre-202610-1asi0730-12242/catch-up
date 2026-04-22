<script setup lang="js">
  import {Source} from "../../domain/model/source.entity.js";
  import SourceItem from "./source-item.vue";
  import {toRefs} from "vue";

  /**
   * Presentation component that displays selectable news sources.
   *
   * @remarks
   * It surfaces user interactions to parent components without mutating
   * application state directly.
   */

  /**
   * @typedef {Object} SourceListProps
   * @property {boolean} visible
   * @property {Source[]} sources
   */

  /**
   * @callback SourceListEmit
   * @param {'source-selected'} event
   * @param {Source} source
   * @returns {void}
   */

  /** @type {SourceListProps} */
  const props = defineProps({ visible: Boolean, sources: { type: Array, required: true } });
  /** @type {SourceListEmit} */
  const emit  = defineEmits(['source-selected']);

  /**
   * Bubbles the selected source to the parent container.
   *
   * @param {Source} source
   * @returns {void}
   */
  function emitSourceSelectedEvent(source) {
    emit('source-selected', source);
  }

  const { visible, sources } = toRefs(props);
</script>

<template>
  <pv-drawer v-bind:visible="visible">
    <source-item v-for="source in sources"
                 :key="source.id"
                 :source="source"
                 @source-selected="emitSourceSelectedEvent(source)"/>
  </pv-drawer>
</template>

<style scoped>

</style>