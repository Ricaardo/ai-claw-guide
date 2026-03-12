import { defineConfig } from 'vitepress'

const docSidebar = [
  {
    text: '快速开始',
    items: [
      { text: '新手路线图', link: '/guide/' },
    ],
  },
  {
    text: 'OpenClaw',
    items: [
      {
        text: '安装部署',
        collapsed: false,
        items: [
          { text: 'macOS 一键脚本', link: '/openclaw/install-macos-script' },
          { text: 'macOS 零基础指南', link: '/openclaw/install-macos' },
          { text: 'Windows 一键脚本', link: '/openclaw/install-windows-script' },
          { text: 'Windows 零基础指南', link: '/openclaw/install-windows' },
          { text: 'Linux 一键脚本', link: '/openclaw/install-linux-script' },
          { text: '云端部署', link: '/openclaw/deploy-cloud' },
        ],
      },
      {
        text: '配置',
        collapsed: false,
        items: [
          { text: '模型配置', link: '/openclaw/model-config' },
          { text: '聊天渠道总表', link: '/openclaw/channel-overview' },
          { text: '聊天渠道详细说明', link: '/openclaw/channel-guide' },
          { text: 'Skills 安装与推荐', link: '/openclaw/skills' },
        ],
      },
      { text: '排障与维护', link: '/openclaw/troubleshooting' },
      { text: '进阶玩法', link: '/openclaw/advanced' },
    ],
  },
  {
    text: 'Qclaw',
    items: [
      { text: 'macOS 安装（内测）', link: '/qclaw/install-macos' },
      { text: 'Windows 状态说明', link: '/qclaw/windows-status' },
    ],
  },
]

export default defineConfig({
  lang: 'zh-CN',
  title: 'AI Claw Guide',
  description: 'OpenClaw 与 Qclaw 安装、配置、部署全流程指南',

  themeConfig: {
    nav: [
      { text: '快速开始', link: '/guide/' },
      { text: 'OpenClaw', link: '/openclaw/install-macos-script' },
      { text: 'Qclaw', link: '/qclaw/install-macos' },
      { text: '资源导航', link: '/resources' },
    ],

    sidebar: {
      '/guide/': docSidebar,
      '/openclaw/': docSidebar,
      '/qclaw/': docSidebar,
      '/resources': [
        {
          text: '资源导航',
          items: [
            { text: '技能库与插件市场', link: '/resources#技能库与插件市场' },
            { text: '官方文档与教程', link: '/resources#官方文档与教程' },
            { text: 'AI 模型提供商', link: '/resources#ai-模型提供商' },
            { text: '实用技巧与最佳实践', link: '/resources#实用技巧与最佳实践' },
            { text: '社区工具', link: '/resources#社区工具' },
            { text: '相关开源项目', link: '/resources#相关开源项目' },
            { text: '学习资源', link: '/resources#学习资源' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: '目录',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
  },
})
