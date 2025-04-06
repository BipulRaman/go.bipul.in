const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    port: 8081,
    hot: true, // Enable hot module replacement
    host: "0.0.0.0", // Allow access from outside the container
    static: {
      directory: path.join(__dirname, "public"),
    },
    watchFiles: ["src/**/*"], // Watch for changes in the 'src' directory
    devMiddleware: {
      writeToDisk: false, // Serve files from memory
    },
    client: {
      overlay: true, // Show errors and warnings in the browser
    },
  },
  watchOptions: {
    poll: 1000, // Enable polling with a 1-second interval
    ignored: /node_modules/, // Ignore changes in 'node_modules'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};