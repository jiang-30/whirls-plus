
## build 配置
修改打包目录
build 构建优化


## Nginx

### 安装
nginx的功能是根据加载的模块来实现的，所以使用什么功能就要有对应的功能
- 源码安装
- rpm包安装
### 命令
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
### 配置
nginx.conf
```nginx

user nginx;

# 进程数， 一般和cpu核数一样
worker_processes 4;

# 每个 worker 子进程最大连接数
worker_rlimit_nofile_number 20480;

error_log /var/log/nginx/error.log warn;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

pid /var/log/nginx/nginx.pid;

events {
    # 每个进程的最大并发数
    worker_connections 1024;
}


http {
    include ./mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
    '$status $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    vhost_traffic_status_zone;
    vhost_traffic_status_filter_by_host on;

    # 开启高效传输模式
    sendfile on;
    # 减少网络报文段的数量
    tcp_nopush on;

    # 保持连接的时间，单位秒
    keepalive_timeout 65;
    # 
    send_timeout 120s;

    gzip on;

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
    server localhost:9999;
}

server {
    listen 443 ssl http2;
    server_name whirl.jiangbo.fun;
    ssl_certificate ./ssl/8352831_whirl.jiangbo.fun.pem;
    ssl_certificate_key ./ssl/8352831_whirl.jiangbo.fun.key;


    client_max_body_size 100m;

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

### https
https 配置
```nginx
listen 443 ssl http2 default_server;   # SSL 访问端口号为 443
server_name lion.club;         # 填写绑定证书的域名(我这里是随便写的)
ssl_certificate /etc/nginx/https/lion.club_bundle.crt;   # 证书地址
ssl_certificate_key /etc/nginx/https/lion.club.key;      # 私钥地址
ssl_session_timeout 10m;
ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # 支持ssl协议版本，默认为后三个，主流版本是[TLSv1.2]
```

### gzip
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

### 缓存

#### 浏览器缓存

#### 代理缓冲


### 跨域

### 动态指令
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

## Docker

### 网络
- bridge 通过 docker0 虚拟网卡连接， 每个容器有独立的ip
- container 与已有容器共享网络资源
- host 和宿主机共享网络资源



### dockerfile

通过 docker build 就可以根据这个 dockerfile 来生成镜像。然后执行 docker run 把这个镜像跑起来

> 两个镜像的生成过程写到了一个 dockerfile 里，这是 docker 支持的多阶段构建, 第一个 FROM 里我们写了 as build_image，这是把第一个镜像命名为 build_image。
>
> 第二个镜像 COPY 的时候就可以指定 --from=build_image 来从那个镜像复制内容了

```docker
# build stage
FROM node:14.15.0 as build-stage

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-perl as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

- FROM：基于一个基础镜像来修改
- WORKDIR：指定当前工作目录
- COPY：把容器外的内容复制到容器内
- EXPOSE：声明当前容器要访问的网络端口，比如这里起服务会用到 8080
- RUN：在容器内执行命令
- CMD：容器启动的时候执行的命令


## 自动部署
