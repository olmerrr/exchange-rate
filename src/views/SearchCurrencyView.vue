<template>
  <div>
    <h1>Search for exchange rates</h1>
    <input type="date" v-model="selectedDate" />

    <CurrencyList :currencies="paginatedCurrencies" />

    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="currentPage = $event"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

import { useCurrencyStore } from "@/stores/currencyStore";

import { usePagination } from "@/composable/usePagination";
import Pagination from "@/components/Pagination.vue";
import CurrencyList from "@/components/CurrencyList.vue";

const store = useCurrencyStore();
const selectedDate = ref("");

const currencies = computed(() => store.currencies || []);

const {
  currentPage,
  paginatedItems: paginatedCurrencies,
  totalPages,
} = usePagination(currencies, 10);

onMounted(() => {
  loadCurrenciesFromStorage();
});

const loadCurrenciesFromStorage = () => {
  const storedCurrencies = JSON.parse(localStorage.getItem("currencies"));
  const lastUpdated = localStorage.getItem("lastUpdated");

  if (storedCurrencies && lastUpdated && !store.checkIfDataStale()) {
    store.currencies = storedCurrencies;
    store.lastUpdated = lastUpdated;
  }
};

const fetchCurrencies = async () => {
  if (selectedDate.value) {
    const currentDate = new Date().toISOString().split("T")[0];
    if (selectedDate.value !== currentDate) {
      await store.fetchCurrencies(selectedDate.value.replace(/-/g, ""));
      saveCurrenciesToLocalStorage();
    } else {
      loadCurrenciesFromStorage();
    }
  }
};

const saveCurrenciesToLocalStorage = () => {
  localStorage.setItem("currencies", JSON.stringify(store.currencies));
  localStorage.setItem("lastUpdated", new Date().toISOString().split("T")[0]);
};

watch(selectedDate, async (newDate, oldDate) => {
  if (newDate !== oldDate) {
    await fetchCurrencies();
  }
});
</script>
