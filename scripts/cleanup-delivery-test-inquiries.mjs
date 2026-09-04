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
const { data: before, error: beforeError } = await client.from('inquiries').select('id').eq('tenant_id', tenantId).or('name.ilike.%CODEX DELIVERY CHECK%,message.ilike.%CODEX DELIVERY CHECK%')
if (beforeError) throw beforeError
if (before.length) {
  const { error: deleteError } = await client.from('inquiries').delete().eq('tenant_id', tenantId).in('id', before.map((row) => row.id))
  if (deleteError) throw deleteError
}
const { data: after, error: afterError } = await client.from('inquiries').select('id').eq('tenant_id', tenantId).or('name.ilike.%CODEX DELIVERY CHECK%,message.ilike.%CODEX DELIVERY CHECK%')
if (afterError) throw afterError
if (after.length) throw new Error(`Delivery test inquiry cleanup failed: ${after.length} rows remain`)
console.log(JSON.stringify({ found: before.length, deleted: before.length, remaining: after.length }))
