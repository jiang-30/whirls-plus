import download from "download";
import axios from "axios";
import { resolve } from "path";
import { existsSync } from "fs";
import {} from "url";
// @ts-ignore
import { readJson, writeJson } from "fs-extra/esm";
import type { IConfig, IOption } from "../command/init";

export async function downloadTemplate(option: IOption) {
  // 1. 读取配置文件
  const config: IConfig = await readJson(option.configPath);

  // 2. 查询最新的模版
  const { data } = await axios.get(config.tagUrl);

  const currentTemplatePath = resolve(option.templatePath, data.tag_name);
  if (data.tag_name !== config.currentTag || !existsSync(currentTemplatePath)) {
    // 3. 下载最新模版
    await download(
      `${config.mirrorUrl}/${data.tag_name}/${config.name}.zip`,
      currentTemplatePath,
      {
        extract: true,
      }
    );

    // 4. 更新配置文件
    config.currentTag = data.tag_name;
    await writeJson(option.configPath, config, { spaces: 2 });
  }

  return `${data.tag_name}/${config.name}`;
}
