# Render Environment Variables

## Your Database Connection String

```
DATABASE_URL=postgresql://phenix_nest_db_user:bnvZCoCZDQpEqZDL1uchd0Xw0rqCRHTO@dpg-d4pmc37diees738qtisg-a/phenix_nest_db
```

## How to Add to Render

1. Go to your **Web Service** in Render dashboard
2. Click on **"Environment"** tab
3. Click **"Add Environment Variable"**
4. Add these variables:

### Required Variables:

```
Key: DATABASE_URL
Value: postgresql://phenix_nest_db_user:bnvZCoCZDQpEqZDL1uchd0Xw0rqCRHTO@dpg-d4pmc37diees738qtisg-a/phenix_nest_db
```

```
Key: NEXT_PUBLIC_SOLANA_NETWORK
Value: devnet
```

```
Key: NEXT_PUBLIC_GUL_TOKEN_MINT
Value: 11111111111111111111111111111111
```

```
Key: NODE_ENV
Value: production
```

## Important Notes

- **Internal vs External URL**: 
  - If your database and web service are in the same Render account, use the **Internal Database URL** (starts with `postgresql://` but has different hostname)
  - The URL you provided is an **External URL** - it will work but may be slower
  - To get Internal URL: Go to your PostgreSQL service → "Info" tab → Copy "Internal Database URL"

- **Connection Pooling**: 
  - For better performance, you can add `?pgbouncer=true` to the end of the URL
  - Example: `postgresql://.../phenix_nest_db?pgbouncer=true`

## After Adding Variables

1. Save the environment variables
2. Render will automatically redeploy
3. Wait for deployment to complete
4. Your app should connect to the database

## Test Connection

After deployment, check the logs to ensure:
- ✅ Prisma Client generated successfully
- ✅ Database connection successful
- ✅ No connection errors

