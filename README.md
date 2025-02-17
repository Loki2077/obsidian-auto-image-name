# Obsidian Auto Image Name 插件 / Obsidian Auto Image Name Plugin

## 概述 / Overview

**中文：**  
该插件可在 Obsidian 编辑器中自动为粘贴的图片插入文件名作为图片的 alt 文本，从而生成包含图片名称的 Markdown 图片语法。这样可以提升笔记的可读性和维护性，同时无需干预 Obsidian 默认的粘贴行为。

**English:**  
This plugin automatically inserts the image file name as the alt text for pasted images in Obsidian, resulting in Markdown image syntax that includes the image name. This improves the readability and maintainability of your notes, all without interfering with Obsidian’s default paste behavior.

---

## 功能 / Features

- 自动检测图片粘贴操作 / Auto-detect image paste actions.
- 在系统默认粘贴行为后，自动更新 Markdown 图片语法中的空 alt 文本，插入图片文件名（包含扩展名） / Automatically updates Markdown image syntax after default paste, inserting the image file name (with extension) into empty alt text fields.
- 无需阻止默认粘贴行为 / Works alongside the default paste functionality.

---

## 安装 / Installation

### 手动安装 / Manual Installation

1. 下载或克隆此仓库。
2. 将包含 `manifest.json`、`main.js`、`styles.css` 等文件的插件文件夹 `obsidian-auto-image-name` 复制到您的 Obsidian vault 内的插件目录（一般为 `.obsidian/plugins/`）。
3. 打开 Obsidian，进入设置 > 第三方插件，启用开发者模式后，启用该插件。

### 社区插件 / Community Plugin

如果插件已发布到社区插件库，您可以直接通过 Obsidian 的社区插件管理器搜索并安装 "Obsidian Auto Image Name"。

---

## 使用 / Usage

1. 打开一个 Markdown 文件进行编辑。
2. 粘贴包含图片的内容。系统会默认插入 Markdown 图片语法，例如：  
   ```markdown
   ![](/path/to/image.png)