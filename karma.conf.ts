// karma.conf.ts
module.exports = (config) => {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        browsers: ["Chrome"],
        basePath: "",
        files: [
            //{pattern: "node_modules/gs-json/**/*.ts", watched: false, served: true, included: true },
            {pattern: "src/gs-modelling/**/*.ts", watched: true, served: true, included: true},
        ],
        karmaTypescriptConfig: {
            compilerOptions: {
                moduleResolution: "node",
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
        logLevel: config.LOG_DEBUG,
        singleRun: true,
    });
};
