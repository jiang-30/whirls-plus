import download from "download";
import axios from "axios";
import { resolve } from "path";
import { } from 'url'
// @ts-ignore
import { readJson, writeJson } from "fs-extra/esm";
import type { IConfig, IOption } from "../command/init";

export async function downloadTemplate(option: IOption) {
  // 1. 读取配置文件
  const config: IConfig = await readJson(option.configPath);

  // 2. 查询最新的模版
  const { data } = await axios.get(config.tagUrl)

  if (data.tag_name !== config.currentTag) {
    // 3. 下载最新模版
    console.log(`${config.mirrorUrl}/${data.tag_name}/${config.name}.zip`)
    await download(`${config.mirrorUrl}/${data.tag_name}/${config.name}.zip`, resolve(option.templatePath, data.tag_name), {
      extract: true,
    });

    // 4. 更新配置文件
    config.currentTag = data.tag_name
    await writeJson(option.configPath, config);
  }

  return `${data.tag_name}/${config.name}`
}
