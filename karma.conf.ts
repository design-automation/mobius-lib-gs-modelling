// karma.conf.ts
module.exports = (config) => {
    config.set({

        basePath: "./",
        browsers: ["Chrome"],
        files: [
            {included: true,   nocache: false, pattern: "src/gs-modelling/**/*.ts", served: true, watched: true,
},
        ],
        frameworks: ["jasmine", "karma-typescript"],
        karmaTypescriptConfig: {
            bundlerOptions: {
                transforms: [
                    require("karma-typescript-es6-transform")(),
                ],
            },
            compilerOptions: {
                module: "commonjs",
            },
            tsconfig: "./tsconfig.json",
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
            fixWebpackSourcePaths: true,
            reports: [ "html", "lcovonly" ],
        },
        autoWatch: true,
        preprocessors: {
            "**/*.ts": ["karma-typescript"], // *.tsx for React Jsx
        },
        reporters: ["progress", "karma-typescript", "kjhtml"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO, // LOG_INFO or LOG_DEBUG
        singleRun: false,
    });
};
