"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import MarkdownIt from "markdown-it";
import { Extension } from "@tiptap/core";

// CSS cho trình soạn thảo
const editorStyles = `
.ProseMirror ul {
  list-style-type: disc;
  padding-left: 1.5em;
  margin: 1em 0;
}

.ProseMirror ol {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin: 1em 0;
}

.ProseMirror li {
  margin: 0.5em 0;
}

.ProseMirror p {
  margin: 0.5em 0;
}

/* CSS cho các tiêu đề với kích thước khác nhau */
.ProseMirror h1 {
  font-size: 2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  font-weight: bold;
}

.ProseMirror h2 {
  font-size: 1.5em;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  font-weight: bold;
}

.ProseMirror h3 {
  font-size: 1.17em;
  margin-top: 1em;
  margin-bottom: 1em;
  font-weight: bold;
}

.ProseMirror h4 {
  font-size: 1em;
  margin-top: 1.33em;
  margin-bottom: 1.33em;
  font-weight: bold;
}

.ProseMirror h5 {
  font-size: 0.83em;
  margin-top: 1.67em;
  margin-bottom: 1.67em;
  font-weight: bold;
}

.ProseMirror h6 {
  font-size: 0.67em;
  margin-top: 2.33em;
  margin-bottom: 2.33em;
  font-weight: bold;
}

/* CSS cho các tiêu đề bên ngoài trình soạn thảo */
h1 {
  font-size: 2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  font-weight: bold;
}

h2 {
  font-size: 1.5em;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  font-weight: bold;
}

h3 {
  font-size: 1.17em;
  margin-top: 1em;
  margin-bottom: 1em;
  font-weight: bold;
}

h4 {
  font-size: 1em;
  margin-top: 1.33em;
  margin-bottom: 1.33em;
  font-weight: bold;
}

h5 {
  font-size: 0.83em;
  margin-top: 1.67em;
  margin-bottom: 1.67em;
  font-weight: bold;
}

h6 {
  font-size: 0.67em;
  margin-top: 2.33em;
  margin-bottom: 2.33em;
  font-weight: bold;
}
`;

// Define a custom extension for fontSize that extends the TextStyle mark
export const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => {
              return element?.style?.fontSize?.replace(/['"]+/g, "") || null;
            },
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
});

interface TiptapEditorProps {
  markdown: string;
}

const md = new MarkdownIt();
const TiptapEditor: React.FC<TiptapEditorProps> = ({ markdown }) => {
  const [editorHTML, setEditorHTML] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontSize,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    editable: true,
    onUpdate: ({ editor }) => {
      setEditorHTML(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && markdown) {
      const html = md.render(markdown);
      editor.commands.setContent(html);
    }
  }, [editor, markdown]);

  // Ghi log các lệnh có sẵn khi editor được khởi tạo
  useEffect(() => {
    if (editor) {
      console.log("Available commands:", Object.keys(editor.commands));
      console.log(
        "Available extensions:",
        editor.extensionManager.extensions.map((ext) => ext.name)
      );
    }
  }, [editor]);

  // Hàm để tìm và thay thế "[Your Full Name]" thành "Nam Nguyen" với màu xanh
  const updateFullName = () => {
    if (!editor) return;

    // Lưu trạng thái hiện tại
    const { state } = editor;
    const text = state.doc.textContent;

    // Tìm vị trí của "[Your Full Name]"
    const targetText = "[Your Full Name]";
    const index = text.indexOf(targetText);

    if (index !== -1) {
      // Tìm vị trí chính xác trong document
      let foundPos = -1;
      state.doc.descendants((node, pos) => {
        if (foundPos !== -1) return false; // Đã tìm thấy rồi, không cần tiếp tục

        if (node.isText && node.text?.includes(targetText)) {
          const textPos = pos + node.text.indexOf(targetText);
          foundPos = textPos;
          return false;
        }
        return true;
      });

      if (foundPos !== -1) {
        // Xóa text cũ và thêm text mới với màu xanh
        editor
          .chain()
          .focus()
          .setTextSelection({
            from: foundPos,
            to: foundPos + targetText.length,
          })
          .deleteSelection()
          .setColor("#0000ff") // Màu xanh dương
          .insertContent("Nam Nguyen")
          .run();
      }
    }
  };

  // Hàm để thay đổi font size
  const changeFontSize = (size: string) => {
    if (!editor) return;

    if (!size) {
      // Nếu không có kích thước, xóa định dạng font size
      editor.chain().focus().setMark("textStyle", { fontSize: null }).run();
      return;
    }

    // Đặt kích thước font cho văn bản được chọn
    editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
  };

  // Hàm xử lý danh sách có dấu đầu dòng
  const toggleBulletList = () => {
    if (!editor) return;

    try {
      // Thêm văn bản nếu không có văn bản nào được chọn
      if (editor.state.selection.empty) {
        editor.chain().focus().insertContent("Bullet list item").run();
      }

      // Áp dụng lệnh toggleBulletList
      editor.chain().focus().toggleBulletList().run();

      // In ra HTML kết quả để kiểm tra
      console.log("Editor HTML after bullet list:", editor.getHTML());
    } catch (error) {
      console.error("Error toggling bullet list:", error);
    }
  };

  // Hàm xử lý danh sách có thứ tự
  const toggleOrderedList = () => {
    if (!editor) return;

    try {
      // Thêm văn bản nếu không có văn bản nào được chọn
      if (editor.state.selection.empty) {
        editor.chain().focus().insertContent("Ordered list item").run();
      }

      // Áp dụng lệnh toggleOrderedList
      editor.chain().focus().toggleOrderedList().run();

      // In ra HTML kết quả để kiểm tra
      console.log("Editor HTML after ordered list:", editor.getHTML());
    } catch (error) {
      console.error("Error toggling ordered list:", error);
    }
  };

  if (!editor) return null;

  return (
    <div>
      {/* Thêm CSS cho editor */}
      <style dangerouslySetInnerHTML={{ __html: editorStyles }} />

      {/* Toolbar */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 4,
          marginBottom: 12,
          padding: 8,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>U</u>
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          <s>S</s>
        </button>
        <button onClick={toggleBulletList}>• List</button>
        <button onClick={toggleOrderedList}>1. List</button>
        <select
          style={{ minWidth: 70 }}
          onChange={(e) => changeFontSize(e.target.value)}
          defaultValue=""
        >
          <option value="">Font size</option>
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="20px">20</option>
          <option value="24px">24</option>
        </select>
        {/* Color */}
        <input
          type="color"
          onChange={(e) => {
            editor.chain().focus().setColor(e.target.value).run();
          }}
          title="Text color"
        />
        {/* Text align */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          ←
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          ↔
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          →
        </button>
      </div>

      {/* Editor */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 4,
          minHeight: 200,
          padding: 16,
        }}
      >
        <EditorContent editor={editor} />
      </div>

      {/* Hiển thị HTML */}
      <div style={{ marginTop: "10px" }}>
        <strong>HTML Output:</strong>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderRadius: "4px",
            overflow: "auto",
            maxHeight: "150px",
            fontSize: "12px",
          }}
        >
          {editorHTML}
        </pre>
      </div>

      <button
        onClick={updateFullName}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Click to update
      </button>
      <h1>Hello</h1>
      <h2>Hello</h2>
    </div>
  );
};

export default TiptapEditor;
