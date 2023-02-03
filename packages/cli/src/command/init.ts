import ora from "ora";
// @ts-ignore
import { pathExists, readJson } from "fs-extra/esm";
import { basename, resolve } from "path";
import { exitHandler, initGit, installPackage } from "../utils";
import { confirmParams, generateParams } from "../handler/params";
import { downloadTemplate } from "../handler/download";
import { copyTemplate } from "../handler/copy";

export interface IOption {
  force: boolean;
  templatePath: string;
  configPath: string;
}

export interface IConfig {
  name: string
  tagUrl: string
  mirrorUrl: string
  currentTag: string
}

export async function initHandler(projectPath: string, option: IOption) {
  try {
    // 1. 判断路径是否已存在
    const isExist = await pathExists(projectPath);
    if (isExist && !option.force) {
      exitHandler("同名目录已存在");
    }

    // 2. 获取项目配置参数
    const params = await generateParams(basename(projectPath));

    // 3. 用户确认
    await confirmParams(isExist);

    // 4. 加载动画
    const spinner = ora("loading...").start();


    // 5. 下载最新模板, 获取模版名称
    spinner.text = '下载最新模版'
    const templateName = await downloadTemplate(option);

    // 6. 拷贝
    spinner.text = '拷贝项目模版'
    await copyTemplate(
      resolve(option.templatePath, templateName),
      projectPath,
      []
    );

    // // 8. 初始化git仓库
    // spinner.text = '初始化git仓库'
    // await initGit(projectPath);

    // // 9. 安装依赖
    // spinner.text = '安装项目依赖'
    // await installPackage(projectPath);

    // 10. 完成
    spinner.succeed("successfully");
  } catch (error) {
    exitHandler((error as Error).message);
  }
}
