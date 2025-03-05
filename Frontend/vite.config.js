import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prismjs from 'vite-plugin-prismjs';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    prismjs({
      languages: ['javascript', 'css', 'html', 'typescript'], // Specify languages you want to support
      plugins: ['line-numbers'], // Optional plugins
      theme: 'tomorrow', // Choose a theme
      css: true,
    }),
  ],
})
  