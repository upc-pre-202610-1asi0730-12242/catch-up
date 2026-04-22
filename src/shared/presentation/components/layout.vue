<script setup>
import {computed, onMounted, ref} from "vue";
import LanguageSwitcher from "./language-switcher.vue";
import FooterContent from "./footer-content.vue";
import {newsStore} from "../../../news/application/news.store.js";
import SourceList from "../../../news/presentation/components/source-list.vue";
import ArticleList from "../../../news/presentation/components/article-list.vue";
import UnavailableContent from "../../../news/presentation/components/unavailable-content.vue";

const drawerVisible = ref(false);

const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value;
}

const sources = computed(() => newsStore.sources);
const errors = computed(() => newsStore.errors);
let articles = computed(() => newsStore.articles);
const rerenderKey = ref(0);

const setSource = source => {
  newsStore.setCurrentSource(source);
  articles = computed(() => newsStore.articles);
  rerenderKey.value += 1; // Force re-render of ArticleList
  toggleDrawer();
};

onMounted(() => {
  newsStore.loadSources();
  rerenderKey.value += 1; // Force re-render of ArticleList
});

</script>

<template>
<div>
  <div>
    <pv-menubar>
      <template #start>
        <pv-button icon="pi pi-bars" label="CatchUp" text @click="toggleDrawer" />
        <source-list v-model:sources="sources"
                     v-model:visible="drawerVisible"
                     v-on:source-selected="setSource($event)"/>
      </template>
      <template #end>
        <language-switcher></language-switcher>
      </template>
    </pv-menubar>
  </div>
</div>
<div>
  <article-list v-if="articles" v-model:articles="articles" :key="rerenderKey"/>
  <unavailable-content v-else :errors="errors"></unavailable-content>
</div>
<footer-content></footer-content>
</template>

<style scoped>

</style>