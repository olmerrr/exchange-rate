<template>
  <div>
    <h1>Exchange Rate</h1>

    <CurrencySearch v-model:searchQuery="searchQuery" />

    <CurrencyList :currencies="paginatedCurrencies" />

    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="goToPage"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCurrencyStore } from "@/stores/currencyStore";
import { usePagination } from "@/composable/usePagination";

import Pagination from "@/components/Pagination.vue";
import CurrencySearch from "@/components/CurrencySearch.vue";
import CurrencyList from "@/components/CurrencyList.vue";

const store = useCurrencyStore();
const searchQuery = ref("");

onMounted(() => {
  store.loadCurrencies();
});

const filteredCurrencies = computed(() => {
  return store.getCurrencies.filter((currency) =>
    currency.txt.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const {
  currentPage,
  totalPages,
  paginatedItems: paginatedCurrencies,
  goToPage,
} = usePagination(filteredCurrencies, 10);
</script>
