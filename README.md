# AIGC 分镜智能体 2.0

专业级视频分镜提示词生成工具

## 功能特性

- 📷 支持上传参考图片
- 🎬 可配置镜头数量（2x2、3x3、4x4、5x5）
- ⏱️ 支持自定义视频时长
- ✨ AI智能生成专业分镜提示词
- 🎨 支持复制结果

## 快速开始

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

### 部署到 Vercel

1. 将此项目上传到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 点击 Deploy 部署

## 获取 API Key

访问 [Google AI Studio](https://makersuite.google.com/) 获取 Gemini API Key

## 使用说明

1. 输入您的 Gemini API Key
2. （可选）上传参考图片
3. 选择镜头数量和视频时长
4. 输入剧情描述
5. 点击"生成专属分镜提示词"
6. 等待生成完成，复制使用

## 技术栈

- React 18 + TypeScript
- Tailwind CSS
- Vite
- Vercel Serverless Functions
- Google Gemini API