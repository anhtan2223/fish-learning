import React, { useState, useCallback } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Button, Space, Tooltip } from 'antd';
import { PlayCircleOutlined, CopyOutlined, UndoOutlined, RedoOutlined } from '@ant-design/icons';

interface CodeEditorProps {
  onChange?: (value: string | undefined) => void;
  initialValue?: string;
}

const CustomEditor: React.FC<CodeEditorProps> = ({ onChange  , initialValue = "for i in range(10):\n\tprint('Python')" }) => {
  const [code, setCode] = useState<string | undefined>(initialValue);
  const [editor, setEditor] = useState<any>(null);

  const handleEditorChange = useCallback((value: string | undefined) => {
    setCode(value);
    if (onChange && value !== undefined) {
      onChange(value);
    }
  }, [onChange]);

  const handleEditorDidMount = (editor: any) => {
    setEditor(editor);
  };

  const handleRunCode = () => {
    console.log('Running code:', code);
    // Implement code execution logic here
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code || '');
  };

  const handleUndo = () => {
    editor?.trigger('undo', 'undo');
  };

  const handleRedo = () => {
    editor?.trigger('redo', 'redo');
  };

  return (
    <div className='h-[300px] flex flex-col'>
      <Space className='mb-2'>
        <Tooltip title="Run Code">
          <Button icon={<PlayCircleOutlined />} onClick={handleRunCode} />
        </Tooltip>
        <Tooltip title="Copy Code">
          <Button icon={<CopyOutlined />} onClick={handleCopyCode} />
        </Tooltip>
        <Tooltip title="Undo">
          <Button icon={<UndoOutlined />} onClick={handleUndo} />
        </Tooltip>
        <Tooltip title="Redo">
          <Button icon={<RedoOutlined />} onClick={handleRedo} />
        </Tooltip>
      </Space>
      <MonacoEditor
        height="100%"
        language="python"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          fontSize: 14,
          lineNumbers: 'on',
          minimap: { enabled: false },
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          folding: true,
          tabSize: 4,
          autoIndent: 'full',
        }}
      />
    </div>
  );
};

export default CustomEditor;
