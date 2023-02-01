
# Nginx

## 安装
nginx的功能是根据加载的模块来实现的，所以使用什么功能就要有对应的功能
- 源码安装
- rpm包安装

## 命令
```bash
systemctl enable nginx // 开机启动
systemctl disable nginx // 关闭开启启动

nginx -s reload
nginx -s reopen # 重启
nginx -s stop
nginx -s quit
nginx -T # 查看最终配置
nginx -t
```

## 配置
nginx.conf
```nginx

user nginx;

# 进程数， 一般和cpu核数一样
worker_processes 1;

# 每个 worker 子进程最大连接数
worker_rlimit_nofile 65535;

error_log /var/log/nginx/error.log warn;

pid /var/log/nginx/nginx.pid;

events {
    multi_accept       on;
    # 每个进程的最大并发数
    worker_connections 65535;
}


http {
    include ./mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
    '$status $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /var/log/nginx/access.log main;
    log_not_found off;

    charset utf-8;
    # 开启高效传输模式
    sendfile on;
    # 减少网络报文段的数量
    tcp_nopush on;
    vhost_traffic_status_zone;
    vhost_traffic_status_filter_by_host on;

    # 保持连接的时间，单位秒
    keepalive_timeout 65;
    # 
    send_timeout 120s;

    # 访问限制 连接限制和请求限制定义
    limit_req_zone $binary_remote_addr zone=req_zone:1m rate=10r/s;

    # 缓存
    proxy_cache_path /var/cache/nginx/cache levels=1:2 keys_zone=imgcache:100m inactive=1d max_size=10g;


    include ./conf.d/*.conf;
}

```

server.conf

```nginx

# 负载均衡 轮询策略、最小连接数策略、最快响应时间策略、客户端 ip 绑定策略
upstream whirl_services {
    keepalive 32; # 限制每个 worker 子进程与上游服务器空闲长连接的最大数量
    keepalive_requests 50; # 单个长连接可以处理的最多 HTTP 请求个数
    keepalive_timeout 30s; # 空闲长连接的最长保持时间
    server localhost:9999 max_conns=1000 fail_timeout=10s max_fails=2;
}

server {
    # listen 443 ssl http2;
    # listen [::]:443 ssl http2;
    listen 443 ssl http2;
    server_name whirl.jiangbo.fun;
    root /www/whirl/dist/;
    client_max_body_size 100m;

    # SSL
    ssl_certificate ./ssl/8352831_whirl.jiangbo.fun.pem;
    ssl_certificate_key ./ssl/8352831_whirl.jiangbo.fun.key;

    # LOG
    access_log  /www/whirl/log/access.log main;
    error_log   /www/whirl/log/error.log error;

    # 静态文件
    # = 精确匹配；^~ 匹配到就停止搜索； ~ 正则区分大小写；~*正则不区分大小写
    # return 和 rewrite
    location / {
        # gzip 压缩, 可以直接打包好 gzip文件
        gzip on;
        gzip_types text/plain text/css text/javascript application/javascript application/x-javascript application/xml;

        # 安全
        deny 172.168.22.11;   # 禁止访问的ip地址，可以为all
        allow 172.168.33.44；# 允许访问的ip地址，可以为all

        # 缓存
        # expires 7d;
        add_header Cache-Control max-age=no-cache;

        # 指定静态资源目录位置 location /image { root /opt/nginx/static;}当用户访问 www.test.com/image/1.png 时，实际在服务器找的路径是 /opt/nginx/static/image/1.png
        root /www/whirl/dist/;

        # 末尾一定要添加 /； location /image { alias /opt/nginx/static/image/;}当用户访问 www.test.com/image/1.png 时，实际在服务器找的路径是 /opt/nginx/static/image/1.png
        # alias /opt/nginx/static/image/;

        
        index index.html;
    }

    location /api/ {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Real-Port $remote_port;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        proxy_pass http://whirl_services/;
    }

}

```

## 静态文件
```nginx

# favicon.ico
location = /favicon.ico {
    log_not_found off;
    access_log    off;
}

# robots.txt
location = /robots.txt {
    log_not_found off;
    access_log    off;
}

# assets, media
location ~* \.(?:css(\.map)?|js(\.map)?|jpe?g|png|gif|ico|cur|heic|webp|tiff?|mp3|m4a|aac|ogg|midi?|wav|mp4|mov|webm|mpe?g|avi|ogv|flv|wmv)$ {
    expires    7d;
    access_log off;
}

# svg, fonts
location ~* \.(?:svgz?|ttf|ttc|otf|eot|woff2?)$ {
    add_header Access-Control-Allow-Origin "*";
    expires    7d;
    access_log off;
}

# gzip
gzip            on;
gzip_vary       on;
gzip_proxied    any;
gzip_comp_level 6;
gzip_types      text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;
```


## 代理
```nginx

proxy_http_version                 1.1;
proxy_cache_bypass                 $http_upgrade;

# Proxy headers
proxy_set_header Upgrade           $http_upgrade;
proxy_set_header Connection        $connection_upgrade;
proxy_set_header Host              $host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header Forwarded         $proxy_add_forwarded;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host  $host;
proxy_set_header X-Forwarded-Port  $server_port;

# Proxy timeouts
proxy_connect_timeout              60s;
proxy_send_timeout                 60s;
proxy_read_timeout                 60s;
```

## 日志
```nginx
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
'$status $body_bytes_sent "$http_referer" '
'"$http_user_agent" "$http_x_forwarded_for"';
access_log  /www/whirl/log/access.log main;
error_log   /www/whirl/log/error.log error;
log_not_found off;
```

## gzip
gzip 压缩; gizp 使用到的模块
```nginx
     # # 默认off，是否开启gzip
gzip on;
# 要采用 gzip 压缩的 MIME 文件类型，其中 text/html 被系统强制启用；
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

# ---- 以上两个参数开启就可以支持Gzip压缩了 ---- #

# 默认 off，该模块启用后，Nginx 首先检查是否存在请求静态文件的 gz 结尾的文件，如果有则直接返回该 .gz 文件内容；
gzip_static on;

# 默认 off，nginx做为反向代理时启用，用于设置启用或禁用从代理服务器上收到相应内容 gzip 压缩；
gzip_proxied any;

# 用于在响应消息头中添加 Vary：Accept-Encoding，使代理服务器根据请求头中的 Accept-Encoding 识别是否启用 gzip 压缩；
gzip_vary on;

# gzip 压缩比，压缩级别是 1-9，1 压缩级别最低，9 最高，级别越高压缩率越大，压缩时间越长，建议 4-6；
gzip_comp_level 6;

# 获取多少内存用于缓存压缩结果，16 8k 表示以 8k*16 为单位获得；
gzip_buffers 16 8k;

# 允许压缩的页面最小字节数，页面字节数从header头中的 Content-Length 中进行获取。默认值是 0，不管页面多大都压缩。建议设置成大于 1k 的字节数，小于 1k 可能会越压越大；
# gzip_min_length 1k;

# 默认 1.1，启用 gzip 所需的 HTTP 最低版本；
gzip_http_version 1.1;
```


## 跨域



## https
https 配置
```nginx
listen 443 ssl http2 default_server;   # SSL 访问端口号为 443
server_name lion.club;         # 填写绑定证书的域名(我这里是随便写的)
ssl_certificate /etc/nginx/https/lion.club_bundle.crt;   # 证书地址
ssl_certificate_key /etc/nginx/https/lion.club.key;      # 私钥地址
ssl_session_timeout 10m;
ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # 支持ssl协议版本，默认为后三个，主流版本是[TLSv1.2]

# SSL
ssl_session_timeout    1d;
ssl_session_cache      shared:SSL:10m;
ssl_session_tickets    off;

# Diffie-Hellman parameter for DHE ciphersuites
ssl_dhparam            /etc/nginx/dhparam.pem;

# Mozilla Intermediate configuration
ssl_protocols          TLSv1.2 TLSv1.3;
ssl_ciphers            ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

# OCSP Stapling
ssl_stapling           on;
ssl_stapling_verify    on;
resolver               1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220 valid=60s;
resolver_timeout       2s;


```

## 缓存

### 浏览器缓存

```nginx
# 缓存
# expires 7d;

# 协商缓存
add_header Cache-Control max-age=no-cache;
```

### 代理缓冲
```nginx
proxy_cache_path /var/cache/nginx/cache levels=1:2 keys_zone=imgcache:100m inactive=1d max_size=10g;

proxy_cache off;

proxy_cache_key $request_uri;

proxy_cache_valid 200 2m; # 说明对于状态为200和304的缓存文件的缓存时间是2分钟

add_header Nginx-Cache-Status $upstream_cache_status;
```
path 缓存文件的存放路径；
level path 的目录层级；
keys_zone 设置共享内存；
inactive 在指定时间内没有被访问，缓存会被清理，默认10分钟；

upstream_cache_status 变量
- MISS: 未命中缓存
- HIT： 命中缓存
- EXPIRED: 缓存过期
- STALE: 命中了陈旧缓存
- REVALIDDATED: Nginx验证陈旧缓存依然有效
- UPDATING: 内容陈旧，但正在更新
- BYPASS: X响应从原始服务器获取
## 安全

### 访问限制
```nginx
# 访问限制 连接限制和请求限制定义
limit_req_zone $binary_remote_addr zone=req_zone:1m rate=10r/s;
```

## 动态指令
```nginx

# 停止处理请求，直接返回响应码或重定向到其他 URL ；执行 return 指令后， location 中后续指令将不会被执行
# return 指定内容后访问是直接下载
# return 403;
# return code [text];
# return code URL;
# return URL;

# 指定正则表达式匹配规则，重写 URL
# last 重写后的 URL 发起新请求，再次进入 server 段，重试 location 的中的匹配；
# break 直接使用重写后的 URL ，不再匹配其它 location 中语句；
# redirect 返回302临时重定向；
# permanent 返回301永久重定向；
# rewirte /images/(.*\.jpg)$ /pic/$1; # $1是前面括号(.*\.jpg)的反向引用


# condition 判断条件
# if($http_user_agent ~ Chrome){
#   rewrite /(.*)/browser/$1 break;
# }
```

## 变量