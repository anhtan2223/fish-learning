import React, { useState } from 'react';
import  MonacoEditor from '@monaco-editor/react';

const CustomEditor = () => {
  const [code, setCode] = useState<string | undefined>("for i in 10 : \n\tprint('Python')");

  const handleEditorChange = (value:string | undefined) => {
    setCode(value);
  };

  return (
    <div className='h-[300px]'>
      <MonacoEditor
        height="100%"
        language="python"
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          lineNumbers: 'on',
          minimap: { enabled: false }, // Ẩn minimap
          wordWrap: 'on', // Bọc từ
        }}
      />
    </div>
  );
};

export default CustomEditor;
