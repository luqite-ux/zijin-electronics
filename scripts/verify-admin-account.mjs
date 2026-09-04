#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

for (const candidate of [path.resolve('.env.local'), path.resolve('.env'), 'D:/Cursor/Grand/huanqiu-admin/.env']) {
  if (!existsSync(candidate)) continue
  for (const line of readFileSync(candidate, 'utf8').split(/\r?\n/)) {
    const index = line.indexOf('=')
    if (index < 1 || line.trim().startsWith('#')) continue
    const key = line.slice(0, index).trim()
    let value = line.slice(index + 1).trim()
    if (/^["']/.test(value) && value.at(-1) === value[0]) value = value.slice(1, -1)
    process.env[key] ||= value
  }
  break
}

const tenantId = 'b83cad82-ebcb-44b2-bfac-92e665fec2df'
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
const { data, error } = await client.from('admin_users').select('email,is_active,must_change_password').eq('tenant_id', tenantId)
if (error) throw error
if (data.length !== 1 || !data[0].is_active || data[0].must_change_password) throw new Error(`Admin account verification failed: count=${data.length}`)
console.log(JSON.stringify({ verified: true, email: data[0].email, active: data[0].is_active, mustChangePassword: data[0].must_change_password }))
