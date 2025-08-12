import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Routes, Route } from 'react-router';

const app = express();

app.get('*', (req, res) => {
  const html = renderToString(
    <StaticRouter location={req.url}>
      <Routes>
        <Route path="/" element={<h1>Hello SSR minimal</h1>} />
        <Route path="/home" element={<h1>Home</h1>} />
      </Routes>
    </StaticRouter>
  );

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!doctype html><html><body><div id="root">${html}</div></body></html>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`SSR minimal on http://localhost:${PORT}`));
