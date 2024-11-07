<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      Next
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:currentPage"]);

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("update:currentPage", props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("update:currentPage", props.currentPage + 1);
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 10px;
}
</style>
