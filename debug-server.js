import { register } from "module";
register("ts-node/esm", import.meta.url);

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

try {
  await import('./server/index.ts');
} catch (error) {
  console.error('Import error:', error);
  console.error('Stack:', error.stack);
  process.exit(1);
} 