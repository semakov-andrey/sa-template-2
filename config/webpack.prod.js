
// del.sync(path.resolve(__dirname, dirs.production));

// module.exports = merge(common, {
//   mode: 'production',
//   output: {   
//     filename: 'scripts/main.js', 
//     path: path.resolve(__dirname, dirs.production),
//     publicPath: '/'
//   },
//   optimization: {
//     minimizer: [
//       new PostCSSAssetsPlugin({
//         test: /\.css$/,
//         log: false,
//         plugins: [
//           autoprefixer({ browsers: packageJSON.config.browserList }),
//           cssnano({
//             preset: ['default', {
//               discardComments: {
//                 removeAll: true,
//               },
//               minifyFontValues: {
//                 removeQuotes: false
//               }
//             }]
//           })
//         ],
//       })
//     ]
//   }
// });
