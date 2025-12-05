# Using Render MCP Server for Deployment

Render's MCP (Model Context Protocol) server allows me to deploy your app directly! Here's how to set it up.

## Quick Setup (3 Steps)

### Step 1: Get Render API Key

1. Go to [Render Dashboard → API Keys](https://dashboard.render.com/settings#api-keys)
2. Click **"Create API Key"**
3. Name it: `MCP Server` (or any name)
4. **Copy the API key** - you'll need it next

### Step 2: Configure MCP in Cursor

Create or edit this file: `~/.cursor/mcp.json`

```json
{
  "mcpServers": {
    "render": {
      "url": "https://mcp.render.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_RENDER_API_KEY_HERE"
      }
    }
  }
}
```

**Replace `YOUR_RENDER_API_KEY_HERE` with the API key from Step 1.**

### Step 3: Restart Cursor

- Close and reopen Cursor completely
- This loads the Render MCP server

## Once Configured

After setup, I can deploy your app by asking me:

- **"Deploy phenix-nest to Render"**
- **"Create a web service on Render from my GitHub repo"**
- **"Set up environment variables on my Render service"**
- **"Check my Render deployment status"**

## What I Can Do with MCP

According to [Render's MCP documentation](https://render.com/docs/mcp-server):

✅ **Create Services**
- Deploy web services from GitHub repos
- Set up PostgreSQL databases
- Configure environment variables

✅ **Monitor & Debug**
- View service logs
- Check deployment status
- Query database
- View metrics

✅ **Manage**
- List all your services
- Update environment variables
- View deploy history

## Your Deployment Details

Once MCP is set up, I'll deploy with:

**Repository**: `linkln33/phoenix-nest`  
**Build Command**: `npm install && npx prisma generate && npm run build`  
**Start Command**: `npm start`

**Environment Variables**:
```
DATABASE_URL=postgresql://phenix_nest_db_user:bnvZCoCZDQpEqZDL1uchd0Xw0rqCRHTO@dpg-d4pmc37diees738qtisg-a/phenix_nest_db
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_GUL_TOKEN_MINT=11111111111111111111111111111111
NODE_ENV=production
```

## Limitations

⚠️ **Note**: Render MCP cannot:
- Create free tier services (must use Starter plan or higher)
- Delete services
- Trigger manual deploys

For free tier, you'll need to deploy manually via Render Dashboard.

## Next Steps

1. ✅ Get API key from Render
2. ✅ Add to `~/.cursor/mcp.json`
3. ✅ Restart Cursor
4. ✅ Ask me: **"Deploy my app to Render"**

## References

- [Render MCP Documentation](https://render.com/docs/mcp-server)
- [Render MCP GitHub](https://github.com/render-oss/render-mcp-server)
