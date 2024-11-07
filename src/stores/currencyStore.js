import { defineStore } from "pinia";

export const useCurrencyStore = defineStore("currency", {
  state: () => ({
    currencies: [],
    lastUpdated: localStorage.getItem("lastUpdated") || null,
    modifiedCurrencies: [],
  }),

  actions: {
    async fetchCurrencies(date) {
      try {
        const response = await fetch(
          `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`
        );
        const data = await response.json();

        this.currencies = data;
        this.lastUpdated = date;
        localStorage.setItem("currencies", JSON.stringify(data));
        localStorage.setItem("lastUpdated", date);
      } catch (error) {
        console.error("Error:", error);
      }
    },

    loadCurrencies() {
      const storedCurrencies = JSON.parse(localStorage.getItem("currencies"));
      const storedLastUpdated = localStorage.getItem("lastUpdated");

      if (storedCurrencies && storedLastUpdated && !this.checkIfDataStale()) {
        this.currencies = storedCurrencies;
        this.lastUpdated = storedLastUpdated;
      } else {
        const currentDate = new Date()
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "");
        this.fetchCurrencies(currentDate);
      }

      const savedModifiedCurrencies = JSON.parse(
        localStorage.getItem("modifiedCurrencies")
      );
      if (savedModifiedCurrencies) {
        this.modifiedCurrencies = savedModifiedCurrencies;
      }
    },

    setModifiedCurrencies(modifiedCurrencies) {
      this.modifiedCurrencies = modifiedCurrencies;
      localStorage.setItem(
        "modifiedCurrencies",
        JSON.stringify(modifiedCurrencies)
      );
    },

    addOrUpdateModifiedCurrency(currency) {
      const index = this.modifiedCurrencies.findIndex(
        (c) => c.r030 === currency.r030
      );

      if (index !== -1) {
        this.modifiedCurrencies[index] = { ...currency };
      } else {
        this.modifiedCurrencies.push({ ...currency });
      }

      this.setModifiedCurrencies(this.modifiedCurrencies);
    },

    checkIfDataStale() {
      if (!this.lastUpdated) {
        return true;
      }

      const today = new Date();
      const lastUpdated = new Date(this.lastUpdated);
      const diffInDays = Math.floor(
        (today - lastUpdated) / (1000 * 60 * 60 * 24)
      );

      return diffInDays > 1;
    },
  },

  getters: {
    getCurrencies: (state) => state.currencies,
    getLastUpdated: (state) => state.lastUpdated,
    getModifiedCurrencies: (state) => state.modifiedCurrencies,
  },
});
