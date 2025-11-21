import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { readFileSync } from 'fs';
import { join } from 'path';

const app = new Hono();

// Serve static files from the dist directory
app.use('/assets/*', serveStatic({ root: './dist' }));
app.use('/favicon.ico', serveStatic({ root: './dist' }));

// Serve the Astro-built HTML
app.get('*', (c) => {
  try {
    const html = readFileSync(
      join(process.cwd(), 'dist', 'index.html'),
      'utf-8'
    );
    return c.html(html);
  } catch (error) {
    return c.text('Error loading page', 500);
  }
});

const port = 3000;
console.log(`Server running on http://localhost:${port}`);

export default app;
