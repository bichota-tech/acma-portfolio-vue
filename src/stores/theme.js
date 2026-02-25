import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDark: window.matchMedia('(prefers-color-scheme: dark)').matches
    }),
    actions: {
        toggleTheme() {
            this.isDark = !this.isDark
            if (this.isDark) {
                document.body.classList.add('dark-mode')
            } else {
                document.body.classList.remove('dark-mode')
            }
        },
        setDark(value) {
            this.isDark = value
            if (this.isDark) document.body.classList.add('dark-mode')
            else document.body.classList.remove('dark-mode')
        }
    }
})