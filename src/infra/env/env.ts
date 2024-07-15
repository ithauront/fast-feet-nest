import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3353),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  INITIAL_ADMIN_PASSWORD: z.string(),
  AWS_BUCKET_NAME: z.string(),
  CLOUDFLARE_ID: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_KEY_ID: z.string(),
  SENDINBLUE_EMAIL_API_KEY: z.string(),
})

export type Env = z.infer<typeof envSchema>
