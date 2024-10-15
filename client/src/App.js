import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/mode/javascript/javascript';

const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling'],
});

function App() {
  useEffect(() => {
    const editor = CodeMirror(document.getElementById('editor'), {
      mode: 'javascript',
      theme: 'default',
      lineNumbers: true,
    });

    editor.setSize('100%', '90vh');

    editor.on('change', () => {
      const code = editor.getValue();
      socket.emit('code-change', code);
    });

    socket.on('code-update', (code) => {
      if (editor.getValue() !== code) {
        editor.setValue(code);
      }
    });
  }, []);

  return (
    <div>
      <h1>Code Sync: Real-Time Collaboration</h1>
      <div
        id="editor"
        style={{ height: '90vh', width: '100%', border: '1px solid #000' }}
      ></div>
    </div>
  );
}

export default App;
