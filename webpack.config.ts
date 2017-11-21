import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
    entry: {
        "app": path.resolve(__dirname, "./src/index.ts")  
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "game.js",
        publicPath: "/dist",
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loaders: ["ts-loader"],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts"],
        modules: ["node_modules"],
        alias: {
            "~": path.join(path.resolve(__dirname, "./lib")),
        }
    }
}

export default config;
