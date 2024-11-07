<template>
  <input
    v-model="searchQuery"
    placeholder="Currency Search"
    class="currency-search"
  />
</template>

<script setup>
import { ref, watch } from "vue";

const searchQuery = ref("");

const emit = defineEmits(["update:searchQuery"]);

watch(searchQuery, (newValue) => {
  emit("update:searchQuery", newValue);
});
</script>

<style scoped>
.currency-search {
  padding: 4px 6px;
  min-width: 260px;
  border-radius: 4px;
}
</style>
