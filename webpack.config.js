const path = require("path");
module.exports = {
    entry: path.join(__dirname, "./src/reactable.jsx"),
    mode: "production",
    module: {
        rules: [
            {
                test: /.js$|.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: require.resolve("babel-loader"),
                    options: {
                        presets: ["es2015", "react", "stage-0"],
                    }
                }]
            },
        ]
    },
    output: {
        path: path.join(__dirname, './lib'),
        filename: 'reactable.js',
        library: "reactable",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        },
        extensions: ['.js', '.jsx'],
    },
    externals: {
        "react": {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    }
};