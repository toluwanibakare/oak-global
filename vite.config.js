import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        services: 'services.html',
        contact: 'contact.html',
        assessment: 'assessment.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})