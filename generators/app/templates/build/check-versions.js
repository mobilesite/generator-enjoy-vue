var chalk = require('chalk');
var semver = require('semver');
var packageConfig = require('../package.json');
var shell = require('shelljs');

//执行命令行，返回执行结果
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim();
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version), // semver.clean可以提取出来一个可用的版本号，semver.clean('  =v1.2.3   ') // '1.2.3'
    versionRequirement: packageConfig.engines.node
  }
];

// shelljs的which(someCommand)方法，用来检测当前环境是否支持某命令
// Searches for command in the system's PATH. On Windows, this uses the PATHEXT variable to append the extension if it's not already executable. Returns string containing the absolute path to the command.
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  });
};

module.exports = function () {
  var warnings = [];
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i];
    // semver.satisfies(version, range)检测版本是否在某个版本范围内
    // satisfies(version, range): Return true if the version satisfies the range.
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(
        mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      );
    }
  }

  if (warnings.length) {
    // chalk.yellow对于即将要输出的内容进行加工，添加黄色。处理完成之后再提供给console.log进行输出。
    console.log(chalk.yellow('To use this template, you must update following to modules:'));
    for (var i = 0; i < warnings.length; i++) {
      console.log('  ' + warnings[i]);
    }
    process.exit(1);
  }
}
