import { ref, computed } from "vue";

export function usePagination(items, perPage) {
  const currentPage = ref(1);
  const itemsPerPage = ref(perPage || 10);

  const totalPages = computed(() =>
    Math.ceil(items.value.length / itemsPerPage.value)
  );

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return items.value.slice(start, end);
  });

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
      currentPage.value = pageNumber;
    }
  };

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedItems,
    goToPage,
  };
}
