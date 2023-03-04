import AES from "crypto-js/aes";
import Encoder from "crypto-js/enc-utf8";
import ECB from "crypto-js/mode-ecb";
import PAD from "crypto-js/pad-pkcs7";

export function encrypt(content: string) {
  const key = Encoder.parse("uBdUx82vPHkDKb284d7NkjFoNcKWBuka");
  const message = Encoder.parse(content);
  const result = AES.encrypt(message, key, {
    mode: ECB,
    padding: PAD,
  }).toString();

  return result;
}

// key 是密钥，可以是接口返回的

// iv 是密钥偏移量，一般都是接口返回的

// mode：支持 CBC、CFB、CTR、ECB、OFB，默认 CBC
// ECB 模式下，向量 iv 是没有用的。ECB 加密原理：根据加密块的大小分成若干块，之后将每块使用相同的秘钥单独加密即可
// padding ：支持 Pkcs7、AnsiX923、Iso10126、NoPadding、ZeroPadding，默认 Pkcs7
