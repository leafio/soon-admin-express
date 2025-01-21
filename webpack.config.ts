// module.exports = {
//   entry: './src/index.ts', // 你的入口文件，通常是 app.js 或 server.js
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'index.js' // 打包后的文件名
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       }
//     ]
//   }, resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//   },
//   target: 'node', // 因为是 Node.js 应用，所以设置 target 为 'node'
//   node: {
//     __dirname: false,
//     __filename: false
//   },
//   //   plugins: [
//   //     new NodemonPlugin({
//   //       script: 'dist/bundle.js', // 监控这个文件的变化并自动重启服务
//   //       ext: 'js', // 监控 js 文件的变化
//   //       watch: ['dist'], // 监控这个目录下的文件变化
//   //       env: {
//   //         NODE_ENV: 'development'
//   //       }
//   //     })
//   //   ]
// };

import path from "path"
import webpack from "webpack"
// in case you run into any typescript error when configuring `devServer`
// import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: "production",
  entry: "./src/index.ts", // 你的入口文件，通常是 app.js 或 server.js
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js", // 打包后的文件名
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  target: "node", // 因为是 Node.js 应用，所以设置 target 为 'node'
}

export default config
