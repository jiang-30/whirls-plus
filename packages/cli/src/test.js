import axios from "axios";
import download from "download";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mirror =
  "https://github.com/jiang-30/whirls-plus/releases/download/0.0.1/dist.zip";

const currentTag = "0.0.1";

axios
  .get("https://api.github.com/repos/jiang-30/whirls-plus/releases/latest")
  .then((res) => {
    console.log(res.data.tag_name);
  })
  .catch((err) => {
    console.log(err);
  });

// 2. 下载
download(mirror, resolve(__dirname, `../template/${currentTag}`), {
  extract: true,
}).then((res) => {
  console.log("download", res);
});
