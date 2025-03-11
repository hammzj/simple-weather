import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        video: false,
        defaultCommandTimeout: 10000,
        chromeWebSecurity: false,
        env: {
            USE_HASH_ROUTER: true,
        },
        retries: {
            runMode: 1,
            openMode: 0,
        },
        baseUrl: "http://localhost:3000/simple-weather",
        reporter: "spec",
        testIsolation: true,
        experimentalInteractiveRunEvents: true,
        watchForFileChanges: false,
        specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    },

    component: {
        defaultCommandTimeout: 1000,
        devServer: {
            framework: "create-react-app",
            bundler: "webpack",
        },
        specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    },
});
