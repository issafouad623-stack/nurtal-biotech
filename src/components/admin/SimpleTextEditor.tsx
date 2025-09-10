'use client';

import { useState, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Link,
  Type
} from 'lucide-react';

interface SimpleTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SimpleTextEditor = ({ value, onChange, placeholder = "Write your article content..." }: SimpleTextEditorProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    onChange(content);
  };

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
      {/* Toolbar */}
      <div 
        className="flex items-center space-x-2 p-3 border-b rounded-t-lg"
        style={{ backgroundColor: '#111111', borderColor: '#333333' }}
      >
        <button
          type="button"
          onClick={() => formatText('bold')}
          className="p-2 rounded hover:bg-gray-700 transition-colors"
          style={{ color: '#cbd5e1' }}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => formatText('italic')}
          className="p-2 rounded hover:bg-gray-700 transition-colors"
          style={{ color: '#cbd5e1' }}
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => formatText('underline')}
          className="p-2 rounded hover:bg-gray-700 transition-colors"
          style={{ color: '#cbd5e1' }}
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-600 mx-2"></div>
        <button
          type="button"
          onClick={() => formatText('insertUnorderedList')}
          className="p-2 rounded hover:bg-gray-700 transition-colors"
          style={{ color: '#cbd5e1' }}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => formatText('insertOrderedList')}
          className="p-2 rounded hover:bg-gray-700 transition-colors"
          style={{ color: '#cbd5e1' }}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => formatText('formatBlock', 'blockquote')}
          className="p-2 rounded hover:bg-gray-700 transition-colors"
          style={{ color: '#cbd5e1' }}
        >
          <Quote className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-600 mx-2"></div>
        <select
          onChange={(e) => formatText('formatBlock', e.target.value)}
          className="px-3 py-1 rounded text-sm border-0 focus:ring-2 focus:ring-blue-500"
          style={{ backgroundColor: '#1a1a1a', color: '#cbd5e1' }}
        >
          <option value="div">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>
      </div>

      {/* Editor */}
      <div
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleInput}
        className="min-h-[200px] p-4 border border-t-0 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        style={{ 
          backgroundColor: '#111111', 
          borderColor: '#333333',
          color: '#ffffff'
        }}
        data-placeholder={placeholder}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          font-style: italic;
        }
        [contenteditable] h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
          color: #ffffff;
        }
        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.8rem 0;
          color: #ffffff;
        }
        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.6rem 0;
          color: #ffffff;
        }
        [contenteditable] ul, [contenteditable] ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        [contenteditable] blockquote {
          border-left: 4px solid #38bdf8;
          padding-left: 1rem;
          margin: 1rem 0;
          background: rgba(14, 165, 233, 0.1);
          color: #e2e8f0;
        }
        [contenteditable] strong {
          font-weight: bold;
          color: #ffffff;
        }
        [contenteditable] em {
          font-style: italic;
          color: #e2e8f0;
        }
      `}</style>
    </div>
  );
};

export default SimpleTextEditor;

