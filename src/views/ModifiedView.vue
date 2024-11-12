<template>
  <div>
    <h1>Changed Rates</h1>
    <CurrencyList :currencies="paginatedModifiedCurrencies" />

    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="currentPage = $event"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePagination } from "@/composable/usePagination";
import CurrencyList from "@/components/CurrencyList.vue";
import Pagination from "@/components/Pagination.vue";

const modifiedCurrencies = ref([]);

onMounted(() => {
  const savedModifiedCurrencies = JSON.parse(
    localStorage.getItem("modifiedCurrencies")
  );

  modifiedCurrencies.value = savedModifiedCurrencies || [];
});

const {
  currentPage,
  paginatedItems: paginatedModifiedCurrencies,
  totalPages,
} = usePagination(modifiedCurrencies);
</script>
