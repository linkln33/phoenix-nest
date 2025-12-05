# Add Render MCP to Your Cursor Configuration

I can see you already have MCP configured! Here's how to add Render:

## Quick Add

1. **Get your Render API Key:**
   - Go to: https://dashboard.render.com/settings#api-keys
   - Click "Create API Key"
   - Copy the key

2. **Add to your MCP config:**

   Edit `~/.cursor/mcp.json` and add this inside the `"mcpServers"` object:

   ```json
   "render": {
     "url": "https://mcp.render.com/mcp",
     "headers": {
       "Authorization": "Bearer YOUR_RENDER_API_KEY_HERE"
     }
   }
   ```

   Your file should look like:
   ```json
   {
     "mcpServers": {
       "supabase": { ... },
       "vercel": { ... },
       "render": {
         "url": "https://mcp.render.com/mcp",
         "headers": {
           "Authorization": "Bearer YOUR_RENDER_API_KEY"
         }
       },
       ...
     }
   }
   ```

3. **Restart Cursor** completely

4. **Then ask me**: "Deploy my app to Render using MCP"

## What I Can Do Once Configured

✅ Create web service from your GitHub repo  
✅ Set up PostgreSQL database  
✅ Configure all environment variables  
✅ Check deployment status  
✅ View logs and metrics  

## Your Deployment Info

**Repo**: `linkln33/phoenix-nest`  
**Build**: `npm install && npx prisma generate && npm run build`  
**Start**: `npm start`

**Env Vars**:
- `DATABASE_URL` = `postgresql://phenix_nest_db_user:bnvZCoCZDQpEqZDL1uchd0Xw0rqCRHTO@dpg-d4pmc37diees738qtisg-a/phenix_nest_db`
- `NEXT_PUBLIC_SOLANA_NETWORK` = `devnet`
- `NEXT_PUBLIC_GUL_TOKEN_MINT` = `11111111111111111111111111111111`
- `NODE_ENV` = `production`

## Note

⚠️ Render MCP cannot create **free tier** services - it requires Starter plan ($7/month) or higher.

For free tier, use manual deployment via Render Dashboard (see `RENDER_SETUP.md`).

