import {
  LogoChromeIcon,
  LogoGithubIcon,
  RocketIcon,
  Translate1Icon,
  SettingIcon,
  PaletteIcon,
  Animation1Icon,
  MobileShortcutIcon,
  SecuredIcon,
  DeviceIcon,
  FileDownloadIcon,
  SearchIcon,
  PlayCircleStrokeIcon,
} from 'tdesign-icons-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import LogoIcon from '/logo.svg';
import pkg from '../../../chrome/package.json';

const chromeStoreUrl = 'https://chromewebstore.google.com';
const githubRepo = 'https://github.com/GolderBrother/zhiwubuyan';
const githubIssues = 'https://github.com/GolderBrother/zhiwubuyan/issues';
const license = 'https://github.com/GolderBrother/zhiwubuyan?tab=MIT-1-ov-file';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-1 sm:gap-2 flex-grow">
            <img src={LogoIcon} className="logo" width={24} height={24} />
            <span className="text-sm sm:text-xl font-bold truncate sm:max-w-none">
              知无不言，为侧边栏设计的 AI 助手
            </span>
            <Badge variant="outline" className="hidden sm:block mb-1 sm:mb-4">
              {pkg.version}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="link"
              size="sm"
              className="p-1 sm:p-2 sm:mr-2"
              onClick={() => {
                window.open(githubRepo, '_blank');
              }}
            >
              <LogoGithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Github</span>
            </Button>
            <Button
              size="sm"
              className="p-1 sm:p-2"
              onClick={() => {
                window.open(chromeStoreUrl, '_blank');
              }}
            >
              <LogoChromeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">立即下载</span>
            </Button>
          </div>
        </nav>
      </header>

      {/* 主体内容 */}
      <main className="max-w-7xl mx-auto px-6">
        {/* 首屏 */}
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">
            在浏览器侧边栏轻松使用 &nbsp;
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Ollama
            </span>
            &nbsp;🚀
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            免费且开源的 Chrome 扩展程序，专为侧边栏设计
            <br />
            无缝集成 Ollama AI 服务，提供触手可及的对话体验
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg"
              onClick={() => {
                window.open(chromeStoreUrl, '_blank');
              }}
            >
              <LogoChromeIcon />从 Chrome 商店安装
            </Button>
            <Button
              variant="outline"
              className="px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg"
              onClick={() => {
                window.open(githubRepo, '_blank');
              }}
            >
              <LogoGithubIcon />在 Github 查看源码
            </Button>
          </div>

          {/* 示例图片区域 */}
          <div className="mt-16 border rounded-xl p-2 max-w-4xl mx-auto shadow-lg">
            <img src="/intro1.png" height="100%" />
            <img src="/intro2.png" height="100%" />
            <img src="/intro3.png" height="100%" />
          </div>
        </section>

        <section id="features" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">功能亮点</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <RocketIcon size={36} />,
                title: '本地模型对话',
                desc: '直接连接本地 Ollama 服务，支持多种模型',
              },
              {
                icon: <SecuredIcon size={36} />,
                title: '隐私有界',
                desc: '不收集任何个人数据，所有数据仅存在于浏览器存储中',
              },
              {
                icon: <SettingIcon size={36} />,
                title: '自由定制',
                desc: '自定义提示词、服务地址和模型参数等',
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl border shadow-sm">
                <div className="w-12 h-12 mb-4 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="more-features" className="py-20 ">
          <h2 className="text-3xl font-bold text-center mb-12">更多特性</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <PaletteIcon size={36} />,
                title: '自适应主题色',
                desc: '自适应系统深浅色变换',
              },
              {
                icon: <Animation1Icon size={36} />,
                title: '自定义提示词',
                desc: '通过 / 快速唤起自定义提示词',
              },
              {
                icon: <Translate1Icon size={36} />,
                title: '智能翻译',
                desc: '快速翻译选中内容，支持多语言互译',
              },
              {
                icon: <MobileShortcutIcon size={36} />,
                title: '快捷入口',
                desc: '侧边栏集成自定义网页快捷访问能力，支持用户自定义添加网址',
              },
              {
                icon: <FileDownloadIcon size={36} />,
                title: '对话记录管理',
                desc: '支持将聊天记录导出为本地文件进行备份，同时提供从本地文件导入恢复会话的功能',
              },
              {
                icon: <DeviceIcon size={36} />,
                title: '多设备同步',
                desc: '通过 chrome.storage.sync API 实现主题、语言等配置的多设备同步',
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl border shadow-sm">
                <div className="w-12 h-12 mb-4 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 未来计划 */}
        <section id="feature" className="py-20">
          <h2 className="text-3xl font-bold text-center  mb-4">未来计划</h2>
          <p className="text-center mb-12 text-muted-foreground">
            欢迎通过&nbsp;
            <a className="underline" href={githubIssues}>
              Github issue
            </a>
            &nbsp;提出需求与建议
          </p>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                icon: <SearchIcon size={36} />,
                title: '联网搜索支持',
                desc: '支持简单的联网搜索能力，让 AI 能够获取最新信息，回答更准确',
              },
              {
                icon: <PlayCircleStrokeIcon size={36} />,
                title: '语音朗读功能',
                desc: '支持对话内容的语音输出，提升用户体验',
              },
              {
                icon: <img src="/mcp.png" width="100" height="100" />,
                title: 'MCP 协议支持',
                desc: '对接 MCP，扩展更多可能性',
              },
            ].map((plan) => (
              <div key={plan.title} className="flex items-start gap-4 p-4 rounded-lg border">
                <div className="w-12 h-12 flex items-center justify-center">{plan.icon}</div>
                <div>
                  <h4 className="font-medium">{plan.title}</h4>
                  <p className="text-sm text-muted-foreground">{plan.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between text-gray-600">
          <div>© 2025 知无不言.</div>
          <div>
            <a href={license}>遵循 MIT 许可</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
