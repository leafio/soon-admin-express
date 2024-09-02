# Soon-Admin

### 介绍 📖

Soon-Admin 是一套完全以typescript开发的后台管理系统。

- 🧑‍🤝‍🧑前端[soon-admin-vue3](https://github.com/leafio/soon-admin-vue3)
- 👭后端soon-admin-express `(本项目)`

### 项目功能 🔨

- 使用 Express , ts-node开发
- ORM采用 prisma
- 数据库采用 sqlite ,请自行替换成自己需要的数据库
- 权限授权采用 express-jwt , 支持接口级权限控制
- 使用 grig 实现 i18n , 有良好的type提示约束 , 不到3K
- 使用 Prettier 统一格式化代码 , 集成 ESLint代码校验规范
- 使用 husky、lint-staged 规范提交信息

### 安装使用步骤 📔

- **Clone：**

```text
git clone https://github.com/leafio/soon-admin-express.git
```

- **Install：**

```text
yarn install
```

- **Run：**

```text
yarn dev
```

- **Build：**

```
yarn build
```

- **Lint：**

```text
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

### 支持一下

喜欢soon-fetch的话 , 在github上给个 **star** 吧.
Email: leafnote@outlook.com

> 我目前在找前端的工作，位置上海。有岗位机会的话，可以联系我。
