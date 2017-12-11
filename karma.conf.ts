// karma.conf.ts
module.exports = (config) => {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        browsers : ["Chrome"],
        basePath: "./src/",
        files: [
            {pattern: "libs/gs-json/utils/**/*.ts" },
            {pattern: "gs-modelling/**/*.ts" },
        ],
        karmaTypescriptConfig: {
            compilerOptions: {
                target: "ES6",
                module: "commonjs",
            },
        },
        plugins: [
            require("karma-typescript"),
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-jasmine-html-reporter"),
            require("karma-coverage-istanbul-reporter"),
        ],
        client:{
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: [ "html", "lcovonly" ],
            fixWebpackSourcePaths: true,
        },
        autoWatch: true,
        preprocessors: {
            "**/*.ts": ["karma-typescript"], // *.tsx for React Jsx
        },
        reporters: ["progress", "karma-typescript", "kjhtml"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        singleRun: false,
    });
};
