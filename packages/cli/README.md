commander 解析命令和参数，用于处理用户输入的命令
inquirer 通用的命令行用户界面集合，用于交互
download "^8.0.0", 下载任何链接资源，还有解压功能
download-git-repo 下载并提取 git 仓库
log-symbols 在终端上显示 √ 或 × 等图标
chalk 终端字体颜色
ora 终端显示下载中的动画
zx 脚本工
execa
shelljs：自动化处理重复的事
update-notifier npm 在线检查更新
node-semver 是 npm 官方出品的，用来处理 npm 版本号字符串
node-ssh 用来执行跟服务器的交互
node-archiver 用来执行打包存档 zip
fs-extra 删除非空文件夹
minimist
npm-run-all

## commander 定义命令和参数

通过 program.parse(arguments)方法处理参数，没有被使用的选项会存放在 program.args 数组中。该方法的参数是可选的，默认值为 process.argv。

### 选项 option

option() 和 addOption(new Option())

- option()方法来定义选项，同时可以附加选项的简介。每个选项可以定义一个短选项名称（-后面接单个字符）和一个长选项名称（--后面接一个或多个单词），使用逗号、空格或|分隔。解析后的选项可以通过 Command 对象上的.opts()方法获取
  - boolean option('-d, --debug', 'output extra debugging')
  - option('-p, --pizza-type <type>', 'flavour of pizza', '默认值');
  - 可选参数 option('-p, --pizza-type [type]', 'flavour of pizza', '默认值');
  - requiredOption()方法可以设置选项为必填；requiredOption('-c, --cheese <type>', 'pizza must have cheese');
  - ...变长参数选项
    - .option('-c, --compress [percentage]') // 0 或 1 个参数
    - .option('--preprocess <file...>') // 至少 1 个参数
    - .option('--test [name...]') // 0 或多个参数
  - 方法
    - hideHelp() 隐藏 help 时的输出
    - default() 默认值和描述
    - choices(['small', 'medium', 'large'])) 可选项
    - env('PORT')) 从环境变量中获取值
    - preset('20').argParser(parseFloat))可选项预设值
    - conflicts('port')) 冲突
    - implies({ drink: 'small' })) 关联其他值

### 命令 command

.command()或.addCommand()

### init

- `-f, --force` 强制覆盖本地同名项目

1. 验证 name 输入是否合法
2. 验证 name 目录是否存在
3. 下载模板
4. 请输入项目名称
5.

### create

## inquirer

inquirer
.prompt([
{
type: "input",
name: "projectName",
message: '项目名称',
default: 'demo-admin',
// validate(input, answers) {
// console.log("validate",input, answers);
// return "格式不正确"
// }
},
{
type: "input",
name: "version",
message: 'version',
default: '1.0.0',
// validate(input, answers) {
// console.log("validate",input, answers);
// return "格式不正确"
// }
},
// description、git repository、keywords、author、license

      // {
      //   type: "confirm",
      //   name: "confirm",
      //   message: '项目confirm',
      //   default: true
      // },
      // {
      //   type: "type",
      //   name: "projectName",
      //   message: '项目名称',
      //   default: 'demo-admin',
      //   // validate(input, answers) {
      //   //   console.log("validate",input, answers);
      //   //   return "格式不正确"
      //   // }
      //   // filter, transformer
      // },
      // {
      //   type: "list",
      //   name: 'listKey',
      //   message: '项目名称list',
      //   default: 'list2',
      //   choices: ["list1",  "list2",  "list3", "list4", "list5", "list6"]
      // }
      // {
      //   type: "rawlist",
      //   name: 'rawlistKey',
      //   message: '项目名称rawlist',
      //   default: 'list2',
      //   choices: ["list1",  "list2",  "list3", "list4", "list5", "list6"]
      // }
      // {
      //   type: "expand",
      //   name: 'expandKey',
      //   message: '项目名称expand',
      //   default: 'list1',
      //   choices: [
      //     {
      //       key: 'list1',
      //       name: 'list1name',
      //       value: 'list1',
      //     },
      //     {
      //       key: 'list2',
      //       name: 'list2name',
      //       value: 'list2',
      //     }
      //   ]
      // },
      // {
      //   type: "checkbox",
      //   name: "checkbox",
      //   message: '功能模块checkbox',
      //   choices: [{
      //     checked: true,
      //     name: 'name',
      //     value: 'list1',
      //     disabled: "true",
      //     key: 'list'
      //   }, "list2",  "list3", "list4", "list5", "list6"]
      // },
      {
        type: "confirm",
        name: "confirm",
        message:

`项目配置
  {
    type: "confirm",
    name: "confirm",
    default: true
  }
会覆盖原有项目，是否确定`,
default: true
},
])

### 项目名称

{
type:"input",
name:"name",  
 message:"项目名称?"  
}

### 功能模块

{
type:"list",
message:"以下哪位人物的武功最高?",
name:"master",
choices:["孙悟空","大鹏金翅","牛魔王","黄袍怪","黄眉大王"]
}
