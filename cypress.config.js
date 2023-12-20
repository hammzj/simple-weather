import {defineConfig} from "cypress";

export default defineConfig({
    e2e: {
        video: false,
        defaultCommandTimeout: 10000,
        chromeWebSecurity: false,
        env: {},
        retries: {
            runMode: 1,
            openMode: 0,
        },
        baseUrl: 'http://localhost:3000',
        reporter: "spec",
        testIsolation: true,
        experimentalInteractiveRunEvents: true,
        watchForFileChanges: false,
    },

    component: {
        defaultCommandTimeout: 1000,
        devServer: {
            framework: "create-react-app",
            bundler: "webpack",
        },
    },
});
