// 本文件实现了 Obsidian 插件的主要逻辑，包括初始化插件、命令注册、设置面板以及示例弹窗的实现。
// 此版本中对错误处理、参数化配置、性能优化和代码注释等方面进行了完善。

import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// 请记得重命名这些类和接口！

// 插件设置接口
interface MyPluginSettings {
    mySetting: string;
}

// 插件默认设置
const DEFAULT_SETTINGS: MyPluginSettings = {
    mySetting: 'default'
};

// 参数：粘贴延时时间（毫秒）
const PASTE_DELAY = 100;

// 插件主类，继承自 Plugin
export default class MyPlugin extends Plugin {
    settings: MyPluginSettings;

    // 插件加载时调用的异步方法
    async onload() {
        console.log('插件加载中...');

        // 加载插件设置，捕获可能的异常
        try {
            await this.loadSettings();
        } catch (error) {
            console.error('加载插件设置失败：', error);
        }

        // 注册事件：监听编辑器的粘贴事件，当粘贴图片时更新系统默认插入的 Markdown 图片语法
        // 更新逻辑：等待系统完成默认粘贴后，对生成的 Markdown 语法中的空 alt 文本进行替换，插入图片名字（包含扩展名）
        this.registerEvent(
            this.app.workspace.on('editor-paste', async (evt: ClipboardEvent, editor: Editor) => {
                // 获取剪贴板数据，兼容不同浏览器
                const clipboardData = evt.clipboardData || (window as any).clipboardData;
                if (!clipboardData) return;
                const files = clipboardData.files;
                
                // 如果剪贴板中包含文件，则延时操作等待系统完成默认粘贴行为
                if (files.length > 0) {
                    setTimeout(() => {
                        try {
                            // 获取当前编辑器全部内容
                            const content = editor.getValue();
                            // 正则匹配 Markdown 图片语法，查找 alt 为空的情况
                            // 格式：![](图片URL)
                            const updatedContent = content.replace(/!\[\s*\]\((.*?)\)/g, (match, url) => {
                                // 从 URL 中提取文件名（包含扩展名）
                                // 注意：这里假设 URL 使用 "/" 作为分隔符
                                const parts = url.split('/');
                                const fileName = parts[parts.length - 1];
                                // 用图片文件名替换空 alt 文本
                                return `![${fileName}](${url})`;
                            });
                            // 如果进行了修改，则更新编辑器内容
                            if (updatedContent !== content) {
                                editor.setValue(updatedContent);
                            }
                        } catch (error) {
                            console.error('更新 Markdown 图片语法出错：', error);
                        }
                    }, PASTE_DELAY);
                }
            })
        );
    }

    // 插件卸载时调用的函数
    async onunload() {
        console.log('插件卸载中...');
    }

    // 异步加载插件设置，合并默认设置与存储的设置数据
    async loadSettings() {
        try {
            const data = await this.loadData();
            this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
        } catch (error) {
            console.error('读取存储的设置时出错：', error);
            this.settings = DEFAULT_SETTINGS;
        }
    }

    // 异步保存插件设置到存储
    async saveSettings() {
        try {
            await this.saveData(this.settings);
        } catch (error) {
            console.error('保存插件设置时出错：', error);
        }
    }
}

// 示例弹窗类，继承自 Modal
class SampleModal extends Modal {
    // 构造函数，接收应用实例
    constructor(app: App) {
        super(app);
    }

    // 当弹窗打开时调用的方法
    onOpen() {
        const { contentEl } = this;
        // 设置弹窗内容
        contentEl.setText('Woah!');
    }

    // 当弹窗关闭时调用的方法
    onClose() {
        const { contentEl } = this;
        // 清空弹窗内容
        contentEl.empty();
    }
}

// 示例设置面板类，继承自 PluginSettingTab
class SampleSettingTab extends PluginSettingTab {
    plugin: MyPlugin;

    // 构造函数，接收应用实例和插件实例
    constructor(app: App, plugin: MyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    // 显示设置面板的内容
    display(): void {
        const { containerEl } = this;

        // 清空之前的设置内容
        containerEl.empty();

        // 添加一个设置项
        new Setting(containerEl)
            .setName('设置项 #1')
            .setDesc('这是个秘密')
            .addText(text => text
                .setPlaceholder('输入你的秘密')
                .setValue(this.plugin.settings.mySetting)
                .onChange(async (value) => {
                    // 更新插件设置并保存
                    this.plugin.settings.mySetting = value;
                    try {
                        await this.plugin.saveSettings();
                    } catch (error) {
                        console.error('保存设置失败：', error);
                    }
                }));
    }
}
