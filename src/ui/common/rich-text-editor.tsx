'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button, Tooltip, Switch } from 'antd'
import { useState } from 'react'
import { 
  BoldOutlined, 
  ItalicOutlined, 
  StrikethroughOutlined, 
  OrderedListOutlined, 
  UnorderedListOutlined,
  EditOutlined,
  EyeOutlined
} from '@ant-design/icons'

const RichTextEditor = () => {
  const [content, setContent] = useState('<p>Start typing here...</p>')
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="rich-text-editor dark:bg-dark">
      <div className="menu-bar flex items-center justify-between mb-2">
        <div>
          <Tooltip title="Heading 1">
            <Button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
              H1
            </Button>
          </Tooltip>
          <Tooltip title="Heading 2">
            <Button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
              H2
            </Button>
          </Tooltip>
          <Tooltip title="Heading 3">
            <Button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
              H3
            </Button>
          </Tooltip>
          <Tooltip title="Bold">
            <Button
              icon={<BoldOutlined />}
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            />    
          </Tooltip>
          <Tooltip title="Italic">
            <Button
              icon={<ItalicOutlined />}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            />
          </Tooltip>
          <Tooltip title="Strike">
            <Button
              icon={<StrikethroughOutlined />}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            />
          </Tooltip>
          <Tooltip title="Bullet List">
            <Button
              icon={<UnorderedListOutlined />}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            />
          </Tooltip>
          <Tooltip title="Numbered List">
            <Button
              icon={<OrderedListOutlined />}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
            />
          </Tooltip>
        </div>
      </div>
      <div className='border border-gray-300 rounded-md p-2'>
        <EditorContent editor={editor} />
      </div>
      {/* Preview */}
      {/* <div className="mt-4">
        <h3>Output HTML:</h3>
        <pre className="bg-gray-100 p-2 rounded">{content}</pre>
        <h3>Preview:</h3>
        <div 
          className="rich-text-editor ProseMirror bg-white dark:bg-dark p-2 rounded border border-gray-300"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div> */}
    </div>
  )
}

export default RichTextEditor
