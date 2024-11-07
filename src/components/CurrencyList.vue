<template>
  <ul class="currency-list">
    <li v-for="currency in currencies" :key="currency.r030">
      <RouterLink
        :to="{
          name: 'EditCurrency',
          params: {
            currencyCode: currency.r030,
          },
        }"
      >
        <span>{{ currency.txt }}: {{ currency.rate }}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  currencies: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.currency-list {
  padding: 12px;
}
</style>
