// Ambient declaration for side-effect CSS imports (e.g. `import "./globals.css"`).
// Next/SWC handle these at build time; this keeps the type-checker (tsgo/tsc) happy.
declare module "*.css";
