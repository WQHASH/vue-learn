/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-26 19:00:05
 * @LastEditTime: 2020-06-27 09:33:37
 */
const req = require.context("../../icons/svg", false, /\.svg$/);
const requireAll = (req) => {
  return req.keys().map((modulePath, index) => {
    let moduleName = modulePath.match(/\.\/(.*)\.svg/)[1];
    return moduleName;
  })
}
const svgIcon = requireAll(req);
export default svgIcon;


