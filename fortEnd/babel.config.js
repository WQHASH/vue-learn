/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-14 11:01:31
 * @LastEditTime: 2020-07-11 23:52:25
 */
module.exports = {
  env: {
    development: {
      "sourceMaps": true,
      "retainLines": true,
      "plugins": ['dynamic-import-node']
    }
  },
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
