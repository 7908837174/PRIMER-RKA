// This file is used by Vercel to create a serverless function
// It imports the compiled Express app from the dist directory

const app = require('../dist/index').default;

module.exports = app;