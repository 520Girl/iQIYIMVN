# 基于苹果cms 开发的移动端

## 介绍
基于苹果cms 开发的移动端
## 功能
1. eslint prettier 对代码书写进行规范
2. husky commit-lint 对提交的git 进行规范
3. 拖拽
4. 视频播放

## 环境
- PHP >= 7.3
- MySQL >= 5.7
- Apache/Nginx
- node.js >= 18
- pnpm >= 9
- nuxt >= 3
- vue >= 3
  
## 安装
1. pnpm install

这是一个基于苹果CMS开发的移动端项目，主要特点如下：

1. 技术栈:
- 前端框架: Nuxt 3 + Vue 3
- 包管理器: pnpm
- UI组件库: Varlet UI
- 状态管理: Pinia
- 视频播放: Artplayer
- 滚动处理: Better-scroll
- 样式处理: Sass + Tailwind CSS + BEM 命名规范
- 代码规范: ESLint + Prettier
- Git提交规范: Husky + Commitlint

## 项目亮点

1. **自适应布局**
   - 使用 postcss-px-to-viewport 实现移动端适配
   - 采用 flex + grid 布局

2. **性能优化**
   - 路由懒加载
   - 组件按需加载
   - 图片懒加载
   - 代码分割

3. **用户体验**
   - 平滑的滚动效果
   - 下拉刷新/上拉加载更多
   - 骨架屏加载
   - 暗黑模式支持

4. **代码质量**
   - TypeScript 类型检查
   - ESLint + Prettier 代码规范
   - Git 提交规范
   - BEM 命名规范

## 项目难点

1. **视频播放优化**
   - 自定义播放器控制
   - 播放进度保存
   - 视频预加载

2. **滚动性能**
   - 使用 Better-Scroll 优化滚动体验
   - 处理复杂的嵌套滚动场景
   - 实现平滑的下拉刷新效果

3. **状态管理**
   - 复杂状态的管理和持久化
   - 多组件间的状态同步

4. **主题切换**
   - 实现暗黑模式
   - CSS 变量管理
   - 主题切换过渡效果

以下是建议的README.md内容:

```markdown:README.md
# 基于苹果CMS的移动端应用

## 项目介绍
基于苹果CMS开发的移动端应用，支持视频播放、漫画阅读、小说阅读等功能，采用现代化的前端技术栈，提供流畅的用户体验。

## 主要功能
1. 视频播放与管理
   - 支持多种视频格式
   - 自定义播放器控制
   - 播放历史记录

2. 漫画阅读
   - 支持多种阅读模式
   - 阅读进度保存
   - 章节管理

3. 小说阅读
   - 支持多种阅读主题
   - 阅读进度同步
   - 书架管理

4. 其他功能
   - 下拉刷新/上拉加载
   - 暗黑模式
   - 多语言支持
   - 响应式布局

## 技术栈
- 框架：Nuxt 3 + Vue 3
- UI组件：Varlet UI
- 状态管理：Pinia
- 视频播放：Artplayer
- 滚动处理：Better-scroll
- 样式处理：Sass + Tailwind CSS
- 工程化：
  - ESLint + Prettier (代码规范)
  - Husky + Commitlint (Git提交规范)
  - TypeScript (类型检查)

## 环境要求
- PHP >= 7.3
- MySQL >= 5.7
- Apache/Nginx
- Node.js >= 18
- pnpm >= 9
- Nuxt >= 3
- Vue >= 3

## 安装部署
1. 安装依赖
```bash
pnpm install
```

2. 开发环境运行
```bash
pnpm dev
```

3. 生产环境构建
```bash
pnpm build
```

## 项目亮点
1. 性能优化
   - 代码分割
   - 路由懒加载
   - 组件按需加载
   - 图片懒加载

2. 用户体验
   - 平滑的滚动效果
   - 主题切换
   - 响应式设计
   - 手势操作支持

3. 工程化实践
   - 严格的代码规范
   - Git提交规范
   - TypeScript类型检查
   - 自动化构建和部署

## 目录结构
```
├── assets/          # 静态资源
├── components/      # 组件
├── layouts/         # 布局
├── pages/          # 页面
├── plugins/        # 插件
├── store/          # 状态管理
├── types/          # TypeScript类型定义
├── utils/          # 工具函数
└── nuxt.config.ts  # Nuxt配置
```

## 开发团队
- 维护者：[Galloping steak]
- 贡献者：欢迎提交PR

## 许可证
[License Type]
```

这个README.md提供了项目的完整概述，包括功能特点、技术栈、环境要求、安装步骤等信息，可以帮助其他开发者快速了解和上手项目。你可以根据实际情况调整内容。
