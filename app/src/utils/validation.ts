// 整数
export const isInteger = (str: string) => {
  return /^[0-9]$/.test(str);
};

// 小数
export const isDecimal = (str: string, len: number) => {
  return new RegExp(`^[0-9]+\\.[0-9]{1, ${len}}$`).test(str);
};

// 数字
export const isNumber = (str: string, len: number = 0) => {
  if (len) {
    return isDecimal(str, len);
  } else {
    return isInteger(str);
  }
};

// 小写字母
export const isLower = (s: string) => {
  return /^[a-z]+$/.test(s);
};

// 大写字母
export const isUpper = (s: string) => {
  return /^[A-Z]+$/.test(s);
};

// english
export const isEnglish = (s: string) => {
  return /^[a-zA-Z]+$/.test(s);
};

// 中文
export const isChinese = (s: string) => {
  // /^[\p{Unified_Ideograph}]+$/u
  return /^[\\u4E00-\\u9FA5]+$/.test(s);
};

// 日期时间
export const isDate = (s: string) => {
  return (
    /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(s) ||
    /^(\d{4})\-(\d{2})\-(\d{2})$/.test(s)
  );
};

// 手机号码
export const isMobile = (s: string) => {
  return /^1[0-9]{10}$/.test(s);
};

// 电话号码
export const isTel = (s: string) => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};

// 邮箱
export const isEmail = (s: string) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  );
};

// 网址
export const isURL = (s: string) => {
  return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
    s
  );
};

// IP
export const isIP = (s: string) => {
  return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(
    s
  );
};

// QQ号
export const isQQ = (s: string) => {
  return /^[1-9][0-9]{4,9}$/.test(s);
};

// 邮政编码
export const isPostal = (s: string) => {
  return /[1-9]\d{5}(?!\d)/.test(s);
};

// 身份证号码
export const isIDNumber = (s: string) => {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(s);
};

// 严格的身份证校验
export const isIdentityNumber = (sId: string) => {
  if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
    console.log("你输入的身份证长度或格式错误");
    return false;
  }
  //身份证城市
  const aCity: Record<string, string> = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外",
  };

  if (!aCity[sId.substring(0, 2)]) {
    console.log("你的身份证地区非法");
    return false;
  }

  // 出生日期验证
  const sBirthday = (
      sId.substring(6, 4) +
      "-" +
      Number(sId.substring(10, 2)) +
      "-" +
      Number(sId.substring(12, 2))
    ).replace(/-/g, "/"),
    d = new Date(sBirthday);
  if (
    sBirthday !=
    d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
  ) {
    console.log("身份证上的出生日期非法");
    return false;
  }

  // 身份证号码校验
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const codes = "10X98765432";
  let sum = 0;

  for (var i = 0; i < sId.length - 1; i++) {
    sum += +sId[i] * weights[i];
  }
  var last = codes[sum % 11]; //计算出来的最后一位身份证号码
  if (sId[sId.length - 1] != last) {
    console.log("你输入的身份证号非法");
    return false;
  }

  return true;
};
