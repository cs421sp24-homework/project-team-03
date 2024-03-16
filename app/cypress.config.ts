import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173/project-team-03', //local website link
    // baseUrl: 'https://cs421sp24-homework.github.io/project-team-03/', //deployed website
  },
});
