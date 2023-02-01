
-- env
-- kind: 'stability',  business// 监控指标的大类 稳定性指标
-- type: jsError、pv、
-- errorType: resourceError、promiseError、
-- app_name
-- app_code
-- app_version
-- user_id
-- user_name
-- page_url
-- page_route 异常的页面路由
-- page_title component 异常的页面名称
-- selector 选择器，tagName
-- filename 文件
-- position 异常行列信息
-- message 报错信息
-- stack 堆栈信息
-- referrer document.referrer
-- rtt "50",
-- startTime performance.now(),
-- screen 2049x1152 屏幕宽高
-- userAgent chrome 浏览器
-- effectiveType 4g 网络情况
-- timeStamp 时间戳


CREATE TABLE `sys_error` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
