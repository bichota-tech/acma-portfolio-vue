import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: window.matchMedia('(prefers-color-scheme: dark)').matches
  }),

  actions: {

    applyTheme() {
      const theme = this.isDark ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', theme)
    },

    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
    },

    setDark(value) {
      this.isDark = value
      this.applyTheme()
    }

  }
})
