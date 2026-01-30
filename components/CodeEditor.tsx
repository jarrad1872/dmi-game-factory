'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import Editor, { Monaco, OnMount } from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
}

// Using any for editor ref to avoid monaco-editor type dependency
type EditorInstance = Parameters<OnMount>[0];

export default function CodeEditor({ 
  code, 
  onChange, 
  language = 'html',
  readOnly = false 
}: CodeEditorProps) {
  const editorRef = useRef<EditorInstance | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleEditorMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    setIsLoading(false);

    // Configure editor
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      wordWrap: 'on',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
      renderLineHighlight: 'all',
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      smoothScrolling: true,
      padding: { top: 16, bottom: 16 },
      bracketPairColorization: { enabled: true },
    });

    // Define custom theme
    monaco.editor.defineTheme('dmi-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'FF6B00' },
        { token: 'string', foreground: '4FC3F7' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'tag', foreground: 'FF6B00' },
        { token: 'attribute.name', foreground: '9CDCFE' },
        { token: 'attribute.value', foreground: '4FC3F7' },
        { token: 'delimiter', foreground: '808080' },
      ],
      colors: {
        'editor.background': '#0d1117',
        'editor.foreground': '#e6edf3',
        'editorLineNumber.foreground': '#484f58',
        'editorLineNumber.activeForeground': '#e6edf3',
        'editor.selectionBackground': '#3392FF44',
        'editor.lineHighlightBackground': '#161b2233',
        'editorCursor.foreground': '#FF6B00',
        'editor.selectionHighlightBackground': '#3392FF22',
        'editorBracketMatch.background': '#3392FF33',
        'editorBracketMatch.border': '#3392FF',
        'scrollbarSlider.background': '#484f5855',
        'scrollbarSlider.hoverBackground': '#484f5888',
        'scrollbarSlider.activeBackground': '#484f58aa',
      },
    });

    monaco.editor.setTheme('dmi-dark');

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Trigger save (handled by parent)
      const event = new CustomEvent('editor-save');
      window.dispatchEvent(event);
    });

    // Format on Shift+Alt+F
    editor.addCommand(
      monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF, 
      () => {
        editor.getAction('editor.action.formatDocument')?.run();
      }
    );
  }, []);

  const handleChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  }, [onChange]);

  // Format code helper
  const formatCode = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  }, []);

  // Expose format function via ref
  useEffect(() => {
    (window as any).formatEditorCode = formatCode;
    return () => {
      delete (window as any).formatEditorCode;
    };
  }, [formatCode]);

  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117] z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin w-8 h-8 border-2 border-dmi-orange border-t-transparent rounded-full" />
            <span className="text-sm text-gray-400">Loading editor...</span>
          </div>
        </div>
      )}
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={handleChange}
        onMount={handleEditorMount}
        loading={null}
        options={{
          readOnly,
          domReadOnly: readOnly,
        }}
      />
    </div>
  );
}
