import axios from "axios";
import download from "download";
import { resolve } from "path";

const mirror =
  "https://github.com/jiang-30/whirls-plus/releases/download/0.0.1/dist.zip";

axios
  .get("https://api.github.com/repos/jiang-30/whirls-plus/releases/latest")
  .then((res) => {
    console.log(res.data.tag_name);
  })
  .catch((err) => {
    console.log(err);
  });

// 2. 下载
download(mirror, "../template", {
  extract: true,
}).then((res) => {
  console.log("download", res);
});
