import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // https://fyhhub.github.io/informal/%E8%B8%A9%E5%9D%91%E8%AE%B0%E5%BD%95/Vite%20%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%20_plugin-vue_export-helper%20%E6%96%87%E4%BB%B6%20404%20%E9%97%AE%E9%A2%98.html
  build: {
    rollupOptions: {
      output: {
        // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
        sanitizeFileName(fileName) {
          const match = DRIVE_LETTER_REGEX.exec(fileName);
          const driveLetter = match ? match[0] : "";
          return (
            driveLetter +
            fileName.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
          );
        },
      },
    },
  },
})
