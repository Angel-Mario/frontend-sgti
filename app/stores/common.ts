import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: (): CommonState => ({
    open: null,
  }),

  getters: {
    isOpen: (state): boolean => !!state.open,
  },

  actions: {
    openClose() {
      this.open = !this.isOpen
    },
  },
})
