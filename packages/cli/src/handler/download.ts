import download from "download";
import type { IConfig } from "../command/init";

export async function downloadTemplate(config: IConfig, templatePath: string) {
  // 1. 判断最新的模版

  // 2. 下载
  await download(config.mirror, templatePath, {
    extract: true,
  });

  return "chalk-5.2.0";
}
