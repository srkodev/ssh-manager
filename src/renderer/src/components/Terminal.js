// src/components/Terminal.js
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import io from 'socket.io-client';
import 'xterm/css/xterm.css';

const XtermTerminal = ({ connection }) => {
  const terminalRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialisation du terminal xterm.js avec l'option copyOnSelect activée
    const term = new Terminal({
      cursorBlink: true,
      fontFamily: 'monospace',
      fontSize: 14,
      theme: {
        background: '#1e1e1e',
        foreground: '#ffffff'
      },
      copyOnSelect: true,
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    // Ajout d'un écouteur pour copier automatiquement le texte sélectionné
    term.onSelectionChange(() => {
      const selectedText = term.getSelection();
      if (selectedText && window.myClipboard && window.myClipboard.writeText) {
        window.myClipboard.writeText(selectedText);
      }
    });

    // Connexion au serveur Socket.io
    socketRef.current = io('http://localhost:3001');

    // Lancer la session SSH en envoyant les informations de connexion
    socketRef.current.emit('startSSH', {
      host: connection.host,
      port: connection.port,
      username: connection.username,
      password: connection.password
    });

    // Lorsque le serveur envoie des données, les afficher dans le terminal
    socketRef.current.on('output', (data) => {
      term.write(data);
    });

    // Relayer les saisies utilisateur vers le serveur
    term.onData((data) => {
      socketRef.current.emit('input', data);
    });

    // Nettoyage lors de la destruction du composant
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      term.dispose();
    };
  }, [connection]);

  return (
    <div
      ref={terminalRef}
      style={{ height: '100%', width: '100%', userSelect: 'text' }}
      className="w-full h-full"
    />
  );
};

export default XtermTerminal;
