#!/usr/bin/env node
import { Command } from "commander";
import { resolve, dirname } from 'path'
import { fileURLToPath } from "url";
import { version } from '../package.json'
import { initHandler } from './command/init'

const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program
  .name("whirls")
  .usage('[command] [options]')
  .description("whirls 脚手架")
  .version(version);


// 创建项目
program
  .command("init")
  .description("创建项目")
  .argument("<project_name>", "项目名称")
  .option("-f, --force", "覆盖同名目录")
  .action((projectName, options) => {
    options.templatePath = resolve(__dirname, '../template')
    options.configPath = resolve(__dirname, '../config.json')
    initHandler(resolve(process.cwd(), projectName), options)
  });


// 代码生成
program
  .command("generate")
  .description("代码生成")
  .option("-c, --config <path>", "配置文件")
  .option("-f, --force", "覆盖同名目录")
  .action((option) => {
    console.log(option)
  });


// 解析参数
program.parse();
