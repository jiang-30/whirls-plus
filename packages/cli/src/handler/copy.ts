import { resolve } from "path";
// @ts-ignore
import { copy, emptyDir } from "fs-extra/esm";

export async function copyTemplate(
  templatePath: string,
  projectPath: string,
  ingorePath: string[]
) {
  // 1. 清空目录
  await emptyDir(projectPath);

  // 2. 拷贝文件
  await copy(templatePath, projectPath, {
    overwrite: false,
    preserveTimestamps: false,
    // @ts-ignore
    filter: (src) => {
      const item = ingorePath.find((item) =>
        src.startsWith(resolve(templatePath, item))
      );
      return !item;
    },
  });
}
