/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-26 19:00:05
 * @LastEditTime: 2020-06-26 19:21:40
 */
const req = require.context("../../icons/svg", false, /\.svg$/);
// const requireAll = (req) => {
//     req.keys().map((modulePath, index) => {
//         let moduleName = modulePath.match(/^\.\/(.*)\.\w+$/, '$1');
//         return moduleName;
//     })
// }
// const svgIcon = requireAll(req);
// console.log(svgIcon,"svgIcon")
// export default svgIcon;

const requireAll = requireContext => requireContext.keys()

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map(i => {
  return i.match(re)[1]
})

export default svgIcons
