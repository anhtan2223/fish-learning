import React, { useState, useCallback } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Button, Space, Tooltip, Typography } from 'antd';
import { PlayCircleOutlined, CopyOutlined, UndoOutlined, RedoOutlined, ExpandOutlined, CompressOutlined } from '@ant-design/icons';

interface CodeEditorProps {
  onChange?: (value: string | undefined) => void;
  initialValue?: string;
}

const CustomEditor: React.FC<CodeEditorProps> = ({ onChange  , initialValue = "for i in range(5):\n\tprint('Python')" }) => {
  const [code, setCode] = useState<string | undefined>(initialValue);
  const [editor, setEditor] = useState<any>(null);
  const [compileResult, setCompileResult] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
    // For now, we'll just set a dummy result
    setCompileResult('Python\nPython\nPython\nPython\nPython');
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

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (typeof window !== 'undefined') {
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  };

  return (
    <div className={`flex flex-col ${isExpanded ? 'fixed inset-0 z-50 bg-white dark:bg-dark' : ''}`}>
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
        <Tooltip title={isExpanded ? "Compress" : "Expand"}>
          <Button icon={isExpanded ? <CompressOutlined /> : <ExpandOutlined />} onClick={handleToggleExpand} />
        </Tooltip>
      </Space>
      <MonacoEditor
        height={isExpanded ? "calc(100vh - 200px)" : "300px"}
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
      <Typography.Text strong className="mt-4 mb-2">Compile Result:</Typography.Text>
      <div className={`p-4 rounded overflow-auto ${isExpanded ? 'h-[calc(100vh-500px)]' : 'h-[100px]'}`}>
        <pre>{compileResult}</pre>
      </div>
    </div>
  );
};

export default CustomEditor;
