import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isLight: false
  }),

  actions: {

    applyTheme() {
      const theme = this.isLight ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', theme)
    },

    toggleTheme() {
      this.isLight = !this.isLight
      this.applyTheme()
    },

    setDark(value) {
      this.isLight = value
      this.applyTheme()
    }

  }
})
