[English](#soon-admin) | [中文](#soon-admin-1)

# Soon-Admin

### Introduction 📖

Soon-Admin is full stuck admin system written by Typescript。

- 🧑‍🤝‍🧑Frontend [soon-admin-vue3](https://github.com/leafio/soon-admin-vue3)
- 🧑‍🤝‍🧑Frontend [soon-admin-react-nextjs](https://github.com/leafio/soon-admin-react-nextjs) 
- 👭Backend soon-admin-express `(this project)`

### Features 🔨

- framework: Express , ts-node
- ORM:  prisma
- database: sqlite , please change database by yourself
- auth:  express-jwt , support api level control
- i18n:  soon-i18n 
- code style: prettier eslint
- git: husky、lint-staged

### Usage 📔

- **Clone：**

```bash
git clone https://github.com/leafio/soon-admin-express.git
```

- **Install：**

```bash
yarn install
```

- **Run：**

```bash
yarn dev
```

- **Build：**

```bash
yarn build
```

- **Lint：**

```bash
# eslint check
yarn lint:eslint

# prettier format
yarn lint:prettier
```

### Project Directory 📚

```text
soon-admin-express
├─ .husky                  # 
├─ prisma                  # 
├─ public                  # static files
├─ src
│  ├─ apis                 # 
│  ├─ i18n                 # 
│  ├─ middlewares          # 
│  ├─ service              # data operations
│  ├─ utils                # helper functions
│  ├─ index.ts             # project entry file
│  └─ prisma.ts            # prisma instance
├─ .env.development        # 
├─ .env.production         # 
├─ .gitignore              # 
├─ .prettierignore         # 
├─ .prettierrc             # 
├─ eslint.config.mjs       # 
├─ package.json            # project info and dependencies
├─ README.md               # introduction
├─ tsconfig.json           #
└─ .type.d.ts              # global ts types

```

### Support Me 🍵

If you like this project, just star it.🚀

> I'm looking for a frontend job in Shanghai , hope a offer for me.
> Email: leafnote@outlook.com

<br />

[English](#soon-admin) | [中文](#soon-admin-1)

# Soon-Admin

### 介绍 📖

Soon-Admin 是一套完全以typescript开发的后台管理系统。

- 🧑‍🤝‍🧑前端[soon-admin-vue3](https://github.com/leafio/soon-admin-vue3) 
- 🧑‍🤝‍🧑前端 [soon-admin-react-nextjs](https://github.com/leafio/soon-admin-react-nextjs)
- 👭后端soon-admin-express `(本项目)`

### 项目功能 🔨

- 使用 Express , ts-node开发
- ORM采用 prisma
- 数据库采用 sqlite ,请自行替换成自己需要的数据库
- 权限授权采用 express-jwt , 支持接口级权限控制
- 使用 soon-i18n 实现国际化 , 有良好的type提示约束 , 不到3K
- 使用 Prettier 统一格式化代码 , 集成 ESLint代码校验规范
- 使用 husky、lint-staged 规范提交信息

### 安装使用步骤 📔

- **Clone：**

```bash
git clone https://github.com/leafio/soon-admin-express.git
```

- **Install：**

```bash
yarn install
```

- **Run：**

```bash
yarn dev
```

- **Build：**

```bash
yarn build
```

- **Lint：**

```bash
# eslint 检测代码
yarn lint:eslint

# prettier 格式化代码
yarn lint:prettier
```

### 文件资源目录 📚

```text
soon-admin-express
├─ .husky                  # husky 配置文件
├─ prisma                  # Prisma 相关配置文件
├─ public                  # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ apis                 # API接口层
│  ├─ i18n                 # i18n
│  ├─ middlewares          # 中间件
│  ├─ service              # 数据处理层
│  ├─ utils                # 常用工具库
│  ├─ index.ts             # 项目入口文件
│  └─ prisma.ts            # Prisma实例
├─ .env.development        # 开发环境配置
├─ .env.production         # 生产环境配置
├─ .gitignore              # 忽略 git 提交
├─ .prettierignore         # 忽略 Prettier 格式化
├─ .prettierrc             # Prettier 格式化配置
├─ eslint.config.mjs       # Eslint 校验配置文件
├─ package.json            # 依赖包管理
├─ README.md               # README 介绍
├─ tsconfig.json           # typescript 全局配置
└─ .type.d.ts              # 全局 ts 声明

```

### 项目支持 🍵

喜欢 soon-admin 的话 , 在 github 上给个 star 吧.

> 我目前在找前端的工作，位置上海。有岗位机会的话，可以联系我。
> Email: leafnote@outlook.com
