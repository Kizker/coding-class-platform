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

const net = require('net');
const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

function bootServer(targetPort) {
  process.env.PORT = String(targetPort);
  process.env.HOSTNAME = '127.0.0.1';
  try {
    fs.writeFileSync(path.join(__dirname, 'port.txt'), String(targetPort));
  } catch (e) {
    console.error('Failed to write port.txt:', e);
  }
  console.log(`[BOOT] Starting standalone Next.js server on dynamic port ${targetPort}...`);

  if (fs.existsSync(standaloneServer)) {
    require(standaloneServer);
  } else {
    const { createServer } = require('http');
    const { parse } = require('url');
    const next = require('next');

    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev });
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
      createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      }).listen(targetPort, '127.0.0.1', (err) => {
        if (err) throw err;
        console.log(`> Ready on http://127.0.0.1:${targetPort}`);
      });
    });
  }
}

// Check if explicit valid port provided in env
const envPort = parseInt(process.env.PORT, 10);
if (envPort && envPort > 0) {
  bootServer(envPort);
} else {
  // Discover free port dynamically from OS kernel
  const probe = net.createServer();
  probe.listen(0, '127.0.0.1', () => {
    const freePort = probe.address().port;
    probe.close(() => {
      bootServer(freePort);
    });
  });
}


