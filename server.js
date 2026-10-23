// server.js - Production entry point for Hostinger Node.js environment
const path = require('path');
const fs = require('fs');

process.on('uncaughtException', (err) => {
  console.error('[FATAL uncaughtException]:', err && err.stack ? err.stack : err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[FATAL unhandledRejection]:', reason && reason.stack ? reason.stack : reason);
});

process.on('exit', (code) => {
  console.log('[NODE EXIT EVENT] Exit code:', code);
});

['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGQUIT'].forEach(sig => {
  process.on(sig, () => {
    console.log(`[NODE SIGNAL RECEIVED]: ${sig}`);
  });
});

if (typeof WebAssembly !== 'undefined' && WebAssembly.instantiate) {
  const origInstantiate = WebAssembly.instantiate;
  WebAssembly.instantiate = function(...args) {
    try {
      const res = origInstantiate.apply(this, args);
      if (res && typeof res.catch === 'function') {
        return res.catch((err) => {
          console.error('[DEBUG WebAssembly.instantiate Promise rejection]:', err && err.stack ? err.stack : err);
          throw err;
        });
      }
      return res;
    } catch (err) {
      console.error('[DEBUG WebAssembly.instantiate Sync error]:', err && err.stack ? err.stack : err);
      throw err;
    }
  };
}

const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneServer)) {
  console.log(`[BOOT] Loading standalone server from ${standaloneServer} on port ${process.env.PORT || 3000}`);
  require(standaloneServer);
} else {
  const { createServer } = require('http');
  const { parse } = require('url');
  const next = require('next');

  const port = parseInt(process.env.PORT, 10) || 3000;
  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, '127.0.0.1', (err) => {
      if (err) throw err;
      console.log(`> Ready on http://127.0.0.1:${port}`);
    });
  });
}

