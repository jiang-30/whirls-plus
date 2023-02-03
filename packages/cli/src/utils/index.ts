import shell from "shelljs";
import chalk from "chalk";
import logSymbols from "log-symbols";

// 退出脚本
export function exitHandler(messsage: string) {
  console.log(logSymbols.warning, chalk.red(messsage))
  shell.exit(1)
}

// 初始化git仓库 git init shell.exec(`cd ${shell.pwd()}/${name} && git init`)
export async function initGit(projectName: string) {
  if (shell.which('git')) {
    await shell.exec(`cd ${projectName} && git init`)
  }
}

// 安装依赖 shell.exec(`cd ${shell.pwd()}/${name} && npm config set registry ${registry} && npm install -d`).code !== 0
export async function installPackage(projectName: string) {
  if (shell.which('pnpm')) {
    await shell.exec(`cd ${projectName} && pnpm install`)
  }
}
