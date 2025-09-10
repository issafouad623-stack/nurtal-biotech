'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues and React 19 compatibility
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => (
    <div 
      className="w-full h-64 rounded-lg border flex items-center justify-center"
      style={{ backgroundColor: '#111111', borderColor: '#333333', color: '#94a3b8' }}
    >
      Loading editor...
    </div>
  )
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = "Write your article content..." }: RichTextEditorProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    // Apply dark theme styles when component mounts
    const style = document.createElement('style');
    style.textContent = `
      .ql-toolbar {
        background: #111111 !important;
        border: 1px solid #333333 !important;
        border-bottom: none !important;
        border-radius: 0.5rem 0.5rem 0 0 !important;
      }
      
      .ql-toolbar .ql-stroke {
        fill: none;
        stroke: #cbd5e1 !important;
      }
      
      .ql-toolbar .ql-fill {
        fill: #cbd5e1 !important;
        stroke: none;
      }
      
      .ql-toolbar .ql-picker-label {
        color: #cbd5e1 !important;
      }
      
      .ql-toolbar .ql-picker-options {
        background: #111111 !important;
        border: 1px solid #333333 !important;
      }
      
      .ql-toolbar .ql-picker-item:hover {
        background: #333333 !important;
        color: #ffffff !important;
      }
      
      .ql-container {
        background: #111111 !important;
        border: 1px solid #333333 !important;
        border-radius: 0 0 0.5rem 0.5rem !important;
        color: #ffffff !important;
      }
      
      .ql-editor {
        color: #ffffff !important;
        min-height: 200px;
      }
      
      .ql-editor.ql-blank::before {
        color: #94a3b8 !important;
        font-style: normal;
      }
      
      .ql-editor h1, .ql-editor h2, .ql-editor h3 {
        color: #ffffff !important;
      }
      
      .ql-editor strong {
        color: #ffffff !important;
      }
      
      .ql-editor em {
        color: #e2e8f0 !important;
      }
      
      .ql-editor a {
        color: #38bdf8 !important;
      }
      
      .ql-editor blockquote {
        border-left: 4px solid #38bdf8;
        background: rgba(14, 165, 233, 0.1);
        color: #e2e8f0 !important;
      }
      
      .ql-editor code {
        background: #333333 !important;
        color: #38bdf8 !important;
        padding: 2px 4px;
        border-radius: 3px;
      }
      
      .ql-editor pre {
        background: #1a1a1a !important;
        color: #ffffff !important;
        border: 1px solid #333333;
        border-radius: 4px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [isClient]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      ['link'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'blockquote', 'code-block', 'link', 'align'
  ];

  if (!isClient) {
    return (
      <div 
        className="w-full h-64 rounded-lg border flex items-center justify-center"
        style={{ backgroundColor: '#111111', borderColor: '#333333', color: '#94a3b8' }}
      >
        Loading editor...
      </div>
    );
  }

  return (
    <div className="w-full">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ 
          backgroundColor: '#111111',
          border: '1px solid #333333',
          borderRadius: '0.5rem'
        }}
      />
    </div>
  );
};

export default RichTextEditor;
