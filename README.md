# Markdown to HTML Converter

一个简易但健壮的 Markdown 转 HTML 转换器，使用纯 JavaScript 实现，不依赖任何第三方库。

## 功能支持

- **标题**：H1-H6（1-6个#号）
- **加粗**：**text** 或 __text__
- **斜体**：*text* 或 _text_
- **无序列表**：- 或 * 开头的列表项

## 运行流程

### 1. 环境准备
确保已安装 Node.js（版本 10 或以上）。

### 2. 运行转换器
在项目根目录执行以下命令：

```bash
node main.js
```

### 3. 查看结果
转换完成后，生成的 HTML 文件将保存在 `html/` 目录下。

## 测试用例

转换器包含 5 个测试用例，覆盖不同场景：

1. **test1-basic.md** - 基础标题和带格式的段落
2. **test2-lists.md** - 连续无序列表（含加粗和斜体）
3. **test3-mixed.md** - 列表与段落交替出现
4. **test4-unclosed.md** - 未闭合的加粗或斜体标记（验证健壮性）
5. **test5-complex.md** - 多种语法混合的复杂输入

## 项目结构

```
.
├── main.js              # 主程序入口，处理文件转换
├── md2html.js           # 核心转换函数
├── test1-basic.md       # 测试用例 1
├── test2-lists.md       # 测试用例 2
├── test3-mixed.md       # 测试用例 3
├── test4-unclosed.md     # 测试用例 4
├── test5-complex.md     # 测试用例 5
└── html/                 # 输出目录（自动创建）
    ├── test1-basic.html
    ├── test2-lists.html
    ├── test3-mixed.html
    ├── test4-unclosed.html
    └── test5-complex.html
```

## 技术实现

- 使用正则表达式处理内联格式（加粗、斜体）
- 使用状态机模式处理列表的开始和结束
- 支持处理未闭合的标记（健壮性保障）
- 严格区分列表标记和斜体/加粗标记

## 使用方法

### 转换单个文件

可以修改 `main.js` 中的 `convertFile` 函数来转换单个文件：

```javascript
const inputPath = 'your-file.md';
const outputPath = 'output.html';
convertFile(inputPath, outputPath);
```

### 批量转换

默认情况下，`main.js` 会批量转换所有测试文件。你可以修改 `testFiles` 数组来添加更多文件。