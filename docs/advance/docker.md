

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

