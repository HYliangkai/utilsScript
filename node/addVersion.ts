/**
  @description 自动化增加版本号,直接通过node运行
 */
export default () => {
  let fs = require('fs')
  function get_package_json() {
    return JSON.parse(fs.readFileSync('./package.json'))
  }
  let package_json = get_package_json()
  let version = package_json.version.split('.')
  version[2] = parseInt(version[2]) + 1
  package_json.version = version.join('.')
  fs.writeFileSync('./package.json', JSON.stringify(package_json, null, '\t'))
  console.log('version: ' + `${package_json.version}` + 'updated!',)
}
