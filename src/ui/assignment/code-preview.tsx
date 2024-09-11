import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Typography, Card } from 'antd';

interface CodePreviewProps {
  code: string;
  language?: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ code, language = 'python' }) => {
  return (
    <Card className="w-full">
      <MonacoEditor
        height="100px"
        language={language}
        value={code}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          folding: true,
          lineNumbers: 'on',
          wordWrap: 'on',
          automaticLayout: true,
          fontSize: 14,
          tabSize: 4,
        }}
        theme="vs-dark"
      />
    </Card>
  );
};

export default CodePreview;
