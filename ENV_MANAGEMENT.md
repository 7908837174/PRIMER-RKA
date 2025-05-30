# Environment Variables Management Guide

This guide explains how to properly manage environment variables in the PRIMER-RKA project.

## Git Ignored Files

The following files are ignored in Git to protect sensitive information:

- `.env` - Local development environment variables
- `.env.local` - Local overrides
- `.env.production` - Production environment variables
- `.env.development` - Development environment variables
- `.env.test` - Test environment variables

## Example Environment Files

We provide example environment files that can be used as templates:

- `.env.example` - Contains all required environment variables with placeholder values

## Setup Instructions

1. **First-time setup**:
   ```bash
   # In Backend1 directory
   cp .env.example .env
   # Edit .env and add your actual values
   ```

2. **Adding new environment variables**:
   - Update `.env.example` with the new variable (use a placeholder value)
   - Add the new variable to your local `.env` file
   - If deploying to Vercel, add the variable in the Vercel dashboard

## Environment Variables for Vercel Deployment

When deploying to Vercel, you need to manually add environment variables in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Click on "Settings" > "Environment Variables"
3. Add all required environment variables:
   - `NODE_ENV=production`
   - `PORT=8080`
   - `BASE_PATH=/api`
   - `MONGO_URI=mongodb+srv://your-mongodb-uri`
   - `SESSION_SECRET=your-session-secret`
   - `SESSION_EXPIRES_IN=24h`
   - `GOOGLE_CLIENT_ID=your-google-client-id` (if using Google OAuth)
   - `GOOGLE_CLIENT_SECRET=your-google-client-secret` (if using Google OAuth)
   - `GOOGLE_CALLBACK_URL=/api/auth/google/callback`
   - `FRONTEND_ORIGIN=https://primer-rka-d5zb.vercel.app`
   - `FRONTEND_GOOGLE_CALLBACK_URL=https://primer-rka-d5zb.vercel.app/auth/google/callback`
   - `VITE_API_BASE_URL=/api` (for the frontend)

## Important Notes

- **Never commit real credentials** to Git
- Use a password manager or secure team sharing method for real credentials
- Consider using different MongoDB databases for development and production
- Make sure your Google OAuth credentials are configured for both local development and production URLs
