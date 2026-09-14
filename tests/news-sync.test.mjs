import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const file = new URL('../lib/articles-db.ts', import.meta.url)
assert.ok(fs.existsSync(file), 'published news must have a database reader instead of a permanent empty state')
const calls = []
let rows = [{ slug: 'new-publication', title: 'Legacy', title_i18n: { en: 'English', fr: 'French' }, content: '<p>Hello</p><script>alert(1)</script><img src=x onerror=alert(1)>', published_at: '2026-09-14T00:00:00Z' }]
let failure = null
const client = { from(table) { const q = { select() { return q }, eq(k,v) { calls.push([table,k,v]); return q }, order() { return q }, range() { return Promise.resolve({data:rows,error:failure}) }, maybeSingle() { return Promise.resolve({data: table === 'tenants' ? { default_language:'en' } : rows[0] || null,error:failure}) } }; return q } }
const module = { exports: {} }
vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText, {module,exports:module.exports,require: name => name === '@/lib/supabase' ? {getSupabaseClient:()=>client,getTenantId:()=> 'tenant-zijin'} : require(name),console,URL})
const api = module.exports
assert.equal(api.pickArticleText({fr:'French',en:'English'},'de','fr','Legacy'),'French')
assert.equal(api.pickArticleText({de:' ',en:'English'},'de','fr','Legacy'),'English')
assert.equal(api.pickArticleText({},'de','fr','Legacy'),'Legacy')
const list = await api.getPublishedArticles('en')
assert.equal(list[0].title,'English')
assert.ok(calls.some(x=>x[0]==='articles'&&x[1]==='tenant_id'&&x[2]==='tenant-zijin'))
assert.ok(calls.some(x=>x[0]==='articles'&&x[1]==='is_published'&&x[2]===true))
assert.ok(!/script|onerror/.test(list[0].content))
assert.match(list[0].content,/<p>Hello<\/p>/)
await api.getArticleBySlug('new-publication')
assert.ok(calls.some(x=>x[1]==='slug'&&x[2]==='new-publication'))
rows=[]
assert.equal((await api.getPublishedArticles()).length,0)
assert.equal(await api.getArticleBySlug('missing'),null)
failure={message:'unavailable'}
await assert.rejects(api.getPublishedArticles(),/news/i)
console.log('news tenant filtering, new slugs, locale fallback, safe HTML and failure handling passed')
