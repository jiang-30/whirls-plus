import format from "string-template";

/**
 * number 需要判断 value == undefined 的情况 if (value == undefined) { value = 0; }
 */

type IValidatorType = "number" | "string";

type IValidatorTrigger = "change" | "blur";

interface IValidatorItem {
  [key: string]: any;
}

/**
 * async-validator验证规则构建器
 * @description number min/max/integer/float
 * @description array min/max/length
 */
export default class Validator {
  /**
   * 数据类型
   */
  type: IValidatorType;
  /**
   * 触发方式
   */
  trigger: IValidatorTrigger;
  /**
   * 校验字段名称
   */
  private _fieldName: string;
  /**
   * 是否是必须的
   */
  private _required: boolean = false;
  /**
   * 规则列表
   */
  private _list: IValidatorItem[];
  /**
   * 模板字符串参数
   */
  private _params: Record<string, any>;

  /**
   * @param fieldName 字段名
   * @param trigger 触发方式
   * @param type 数据类型
   */
  constructor(
    fieldName: string,
    trigger: IValidatorTrigger,
    type: IValidatorType
  ) {
    this._fieldName = fieldName;
    this._list = [];
    this._params = {
      field: fieldName,
    };
    this.type = type;
    this.trigger = trigger;
  }

  /**
   * @static
   * @param { string } fieldName - 名称
   * @param { ('change' | 'blur') } [trigger=change] - 触发方式
   * @param { ('number' | 'string' | 'array') } [type=string] - 数值类型
   */
  static builder(
    fieldName: string,
    trigger: IValidatorTrigger = "change",
    type: IValidatorType = "string"
  ) {
    const instance = new Validator(fieldName, trigger, type);
    return instance;
  }

  /**
   * 返回规则集
   * @param { string } [message] - 校验规则描述会替换单个校验提示，自定义函数的message不会替换
   */
  build(message: string) {
    // 格式化校验规则
    this._list.forEach((item) => {
      item.required = this._required;
      item.trigger = this.trigger;
      item.type = this.type;
      item.message = format(message, this._params);
      if (this.type == "number") {
        item.transform = (value: string) => {
          return Number(value);
        };
      }
    });

    // 数字校验
    // if (type === 'number') {
    //   this._list.push({
    //     message: `${this._fieldName}必须是数字`,
    //   })
    // }

    // 必填校验
    if (this._required) {
      this._list.unshift({
        type: this.type,
        required: this._required,
        trigger: this.trigger,
        message: `请录入${this._fieldName}`,
      });
    }
    return this._list;
  }

  private isString() {
    return this.type === "string";
  }

  private isNumber() {
    return this.type === "number";
  }

  /**
   * 添加一个规则
   */
  add(rule: IValidatorItem) {
    this._list.push(rule);
    return this;
  }

  /**
   * 是否必填
   */
  required() {
    this._required = true;
    return this;
  }

  /**
   * string - 最小字符长度；
   * number - 最小值
   */
  min(num: number) {
    this._params.min = num;
    if (this.type == "number") {
    }
    this.add({
      min: num,
    });
    return this;
  }

  /**
   * string - 字符长度
   * number - 最大值
   */
  max(num: number) {
    this._params.max = num;
    this.add({
      max: num,
    });
    return this;
  }

  /**
   * string - 字符长度
   */
  length(length: number) {
    if (this.isString()) {
      this._params.length = length;
      this.add({
        len: length,
        message: `${this._fieldName}长度为${length}`,
      });
    }
    return this;
  }

  /**
   * number - 整数
   */
  integer() {
    if (this.isNumber()) {
      this.add({
        type: "integer",
        message: `${this._fieldName}必须是整数`,
      });
    }
    return this;
  }

  /**
   * number - 浮点数 decimal 小数
   * @todo 必填时，由于类型转换也会触发
   * @param { number } [decimalLength] - 保留几位小数
   */
  decimal(decimalLength?: number) {
    if (this.isNumber()) {
      this.add({
        type: "float",
        message: `${this._fieldName}必须是小数`,
      });
      if (decimalLength) {
        this.add({
          validator: (_rule: any, value: any, callback: Function) => {
            const decimalValue = value.split(".")[1];
            if (decimalValue.length != decimalLength) {
              return callback(
                new Error(`${this._fieldName}需要保留${decimalLength}位小数`)
              );
            }
            callback();
          },
        });
      }
    }
    return this;
  }

  /**
   * 正则校验
   */
  partten(pattern: RegExp) {
    if (this.isString()) {
      this.add({
        pattern,
        _message: `${this._fieldName}格式不正确`,
      });
    }
    return this;
  }

  /**
   * 空白
   */
  notBlank() {
    if (this.isString()) {
      this.add({
        pattern: /^\S+$/,
        _message: `${this._fieldName}不能是空白`,
      });
    }
    return this;
  }
  /**
   * 数字 0123456789
   */
  pDigit() {
    if (this.isString()) {
      this.add({
        pattern: /^[0-9]+$/,
        _message: `${this._fieldName}必须是数字`,
      });
    }
    return this;
  }
  /**
   * 字母 abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
   */
  pAlpha() {
    if (this.isString()) {
      this.add({
        pattern: /^[A-Za-z]+$/,
        _message: `${this._fieldName}必须是字母`,
      });
    }
    return this;
  }
  /**
   * 数字字母 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
   */
  pAlnum() {
    if (this.isString()) {
      this.add({
        pattern: /^[A-Za-z0-9]+$/,
        _message: `${this._fieldName}必须是数字和字母组合`,
      });
    }
    return this;
  }
  /**
   * 小写字母 abcdefghijklmnopqrstuvwxyz
   */
  pLower() {
    if (this.isString()) {
      this.add({
        pattern: /^[a-z]+$/,
        _message: `${this._fieldName}必须是小写字母`,
      });
    }
    return this;
  }
  /**
   * 大写字母 ABCDEFGHIJKLMNOPQRSTUVWXYZ
   */
  pUpper() {
    if (this.isString()) {
      this.add({
        pattern: /^[A-Z]+$/,
        _message: `${this._fieldName}必须是大写字母`,
      });
    }
    return this;
  }
  /**
   * 中文字符
   */
  pChinese() {
    if (this.isString()) {
      this.add({
        pattern: /^[\p{Unified_Ideograph}]+$/u,
        _message: `${this._fieldName}必须是中文字符`,
      });
    }
    return this;
  }

  /**
   * 数字字母汉字
   */
  pDac() {
    if (this.isString()) {
      this.add({
        pattern: /^[\p{Unified_Ideograph}]+$/u,
        _message: `${this._fieldName}必须是中文字符`,
      });
    }
    return this;
  }

  /**
   * 正则字符串
   */
  pRegExp() {
    if (this.isString()) {
      this.add({
        type: "regexp",
        _message: `${this._fieldName}格式不正确`,
      });
    }
    return this;
  }

  /**
   * 11位手机号码
   */
  phone() {
    if (this.isString()) {
      this.add({
        pattern: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
        _message: `${this._fieldName}格式不正确`,
      });
    }
    return this;
  }

  /**
   * url
   */
  url() {
    if (this.isString()) {
      const pattern =
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
      this.add({
        pattern,
        _message: `${this._fieldName}格式不正确`,
      });
    }
    return this;
  }

  /**
   * 邮箱地址
   */
  email() {
    if (this.isString()) {
      const pattern =
        /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      this.add({
        pattern,
        _message: `${this._fieldName}格式不正确`,
      });
    }
    return this;
  }

  /**
   * 身份证
   */
  identity() {
    if (this.isString()) {
      const pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      this.add({
        pattern,
        _message: `${this._fieldName}格式不正确`,
      });
    }
    return this;
  }

  // 社会信用代码
  creditCode() {
    if (this.isString()) {
      const pattern = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
      this.add({
        pattern,
        _message: `${this._fieldName}格式不正确`,
      });
    }
    return this;
  }

  /**
   * 关联俩个字段相等
   */
  withEquals(obj: any, key: string, message?: string) {
    const msg = message || `与目标字段的值不相同`;
    this.add({
      validator: (_rule: any, value: any, callback: Function) => {
        const targetValue = deepGet(obj, key);
        if (targetValue && targetValue !== value) {
          callback(new Error(msg));
        } else {
          callback();
        }
      },
    });

    return this;
  }
}

// function isEmpty(val) {
//   return val === undefined || val === null || val === ''
// }

function deepGet(target: any, keystr: string, def?: any) {
  const keys = keystr.split ? keystr.split(".") : [keystr];
  const res = keys.reduce((target, key) => {
    return target && target[key];
  }, target);

  return res ? res : def ? def : res;
}
