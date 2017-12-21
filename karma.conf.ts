// karma.conf.ts
module.exports = (config) => {
    config.set({
        browsers: ["Chrome"],
        frameworks: ["jasmine", "karma-typescript"],
        basePath: "./",
        files: [
            {pattern: "src/gs-modelling/**/*.ts",
                watched: true,  included: true,  served: true, nocache: false},
        ],
        karmaTypescriptConfig: {
            compilerOptions: {
                module: "commonjs",
            },
            tsconfig: "./tsconfig.json",
            bundlerOptions: {
                transforms: [
                    require("karma-typescript-es6-transform")(),
                ],
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
        logLevel: config.LOG_INFO, //LOG_INFO or LOG_DEBUG
        singleRun: false,
    });
};
