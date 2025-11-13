import { Controller } from "@hotwired/stimulus"

// Toggles Tailwind's class-based dark mode and daisyUI theme attribute.
export default class extends Controller {
  static targets = ["icon"]

  connect() {
    this.root = document.documentElement
    this.syncTheme(this.root.classList.contains("dark"))
  }

  toggle() {
    const isDark = this.root.classList.toggle("dark")
    this.persist(isDark)
    this.syncTheme(isDark)
  }

  persist(isDark) {
    try {
      window.localStorage.setItem("theme", isDark ? "dark" : "light")
    } catch (_) {
      // localStorage can be disabled; ignore errors.
    }
  }

  syncTheme(isDark) {
    this.root.dataset.theme = isDark ? "business" : "corporate"
    if (this.hasIconTarget) {
      this.iconTarget.innerHTML = isDark ? this.sunIcon : this.moonIcon
    }
  }

  get sunIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M12 3v2.25m0 13.5V21m9-9h-2.25M5.25 12H3m15.364 6.364l-1.591-1.591M7.227 7.227L5.636 5.636m12.728 0l-1.591 1.591M7.227 16.773l-1.591 1.591M12 8.25a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5z" />
      </svg>`
  }

  get moonIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.293 13.293a8 8 0 01-10.586-10.586 0.75 0.75 0 00-.832-.982 8 8 0 1012.4 12.4 0.75 0.75 0 00-.982-.832z" />
      </svg>`
  }
}
