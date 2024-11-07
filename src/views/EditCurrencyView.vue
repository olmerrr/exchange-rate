<template>
  <div v-if="currency">
    <h1>Edit exchange rate: {{ currency.txt }} ({{ currency.r030 }})</h1>
    <div class="edit-currency">
      <div>
        <label for="rate">Exchange Rate:</label>
        <input
          id="rate"
          v-model="currency.rate"
          type="number"
          step="0.01"
          min="0"
          @input="checkIfModified"
        />
      </div>
    </div>

    <button @click="saveCurrency" :disabled="!isModified">Save Rate</button>
  </div>

  <div v-else>
    <p>Currency not found</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCurrencyStore } from "@/stores/currencyStore";

const store = useCurrencyStore();
const route = useRoute();
const router = useRouter();

const currencyCode = route.params.currencyCode;

const currency = ref(null);
const originalRate = ref(null);
const isModified = ref(false);

onMounted(() => {
  store.loadCurrencies();

  const foundCurrency = store.getCurrencies.find(
    (currency) =>
      currency.r030 === currencyCode ||
      String(currency.r030) === String(currencyCode)
  );

  if (foundCurrency) {
    currency.value = { ...foundCurrency };
    originalRate.value = foundCurrency.rate;
  } else {
    console.error("Error");
  }
});

const checkIfModified = () => {
  isModified.value = currency.value.rate !== originalRate.value;
};

const saveCurrency = () => {
  if (currency.value && isModified.value) {
    const index = store.getCurrencies.findIndex(
      (c) => c.r030 === currency.value.r030
    );

    if (index !== -1) {
      store.getCurrencies[index] = { ...currency.value };
      localStorage.setItem("currencies", JSON.stringify(store.getCurrencies));

      let modifiedCurrencies =
        JSON.parse(localStorage.getItem("modifiedCurrencies")) || [];
      const existingCurrencyIndex = modifiedCurrencies.findIndex(
        (c) => c.r030 === currency.value.r030
      );

      if (existingCurrencyIndex !== -1) {
        modifiedCurrencies[existingCurrencyIndex] = { ...currency.value };
      } else {
        modifiedCurrencies.push({ ...currency.value });
      }

      localStorage.setItem(
        "modifiedCurrencies",
        JSON.stringify(modifiedCurrencies)
      );

      router.push({ name: "Modified" });
    }
  }
};
</script>

<style scoped>
.edit-currency {
  display: flex;
}
.message {
  color: #888;
  font-size: 0.9em;
  margin-top: 10px;
}
</style>
