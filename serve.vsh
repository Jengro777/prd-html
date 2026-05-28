module main

import veb
import os

pub struct Context {
	veb.Context
}

pub struct App {}

@['/:path...']
pub fn (app &App) serve(mut ctx Context, path string) veb.Result {
	ctx.set_content_type('text/html; charset=utf-8')

	root := os.getwd()

	// 处理路径：去掉首尾 /
	rel := path.trim('/')

	// 请求的文件或目录路径
	full_path := if rel == '' {
		root
	} else {
		os.join_path(root, rel)
	}

	// 安全检查：防止路径穿越
	if !full_path.starts_with(root) {
		return ctx.server_error_with_status(.forbidden)
	}

	// 如果是文件，直接返回
	if os.exists(full_path) && !os.is_dir(full_path) {
		return ctx.file(full_path)
	}

	// 如果是目录，尝试找 index.html
	index_path := os.join_path(full_path, 'index.html')
	if os.exists(index_path) && !os.is_dir(index_path) {
		return ctx.file(index_path)
	}

	// 目录不存在
	if !os.exists(full_path) {
		ctx.set_content_type('text/plain; charset=utf-8')
		return ctx.not_found()
	}

	// ---------- 生成目录浏览页面 ----------
	entries := os.ls(full_path) or {
		return ctx.server_error('无法读取目录')
	}

	mut html := '<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>目录: /${rel}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; background: #f5f5f5; }
  .header { background: #fff; border-bottom: 1px solid #e0e0e0; padding: 16px 24px; }
  .header h1 { font-size: 16px; color: #333; font-weight: 600; }
  .container { max-width: 900px; margin: 0 auto; padding: 0; }
  .breadcrumb { padding: 12px 24px; font-size: 13px; color: #666; background: #fafafa; border-bottom: 1px solid #eee; }
  .breadcrumb a { color: #2563eb; text-decoration: none; }
  .breadcrumb a:hover { text-decoration: underline; }
  .file-list { background: #fff; }
  .file-item { display: flex; align-items: center; padding: 10px 24px; border-bottom: 1px solid #f0f0f0; text-decoration: none; color: #333; }
  .file-item:hover { background: #f0f7ff; }
  .file-item .icon { width: 20px; margin-right: 10px; text-align: center; font-size: 14px; }
  .file-item .name { flex: 1; font-size: 14px; }
  .file-item .name a { color: #333; text-decoration: none; }
  .file-item:hover .name a { color: #2563eb; }
  .file-item .size { color: #999; font-size: 12px; min-width: 70px; text-align: right; }
  .file-item.dir .name a { color: #7c3aed; font-weight: 500; }
  .file-item.dir:hover .name a { color: #6d28d9; }
  .back-link { display: flex; align-items: center; padding: 10px 24px; border-bottom: 1px solid #f0f0f0; color: #2563eb; text-decoration: none; font-size: 14px; }
  .back-link:hover { background: #f0f7ff; text-decoration: underline; }
  .back-link .icon { width: 20px; margin-right: 10px; text-align: center; }
  .empty { padding: 40px; text-align: center; color: #999; font-size: 14px; }
</style>
</head>
<body>
<div class="header"><div class="container"><h1>📁 /${rel}</h1></div></div>
<div class="breadcrumb"><div class="container"><a href="/">根目录</a>'

	// 面包屑导航
	if rel != '' {
		parts := rel.split('/')
		mut accumulated := ''
		for part in parts {
			if accumulated == '' {
				accumulated = part
			} else {
				accumulated = accumulated + '/' + part
			}
			html += ' / <a href="/${accumulated}">${part}</a>'
		}
	}

	html += '</div></div><div class="file-list"><div class="container">'

	// 上级目录链接
	if rel != '' {
		idx := rel.last_index('/') or { -1 }
		parent := if idx >= 0 { rel[..idx] } else { '' }
		if parent == '' {
			html += '<a href="/" class="back-link"><span class="icon">⬆</span> 返回上级目录</a>'
		} else {
			html += '<a href="/${parent}" class="back-link"><span class="icon">⬆</span> 返回上级目录</a>'
		}
	}

	if entries.len == 0 {
		html += '<div class="empty">此目录为空</div>'
	}

	// 排序：目录在前，文件在后，按名称排序
	mut dirs := []string{}
	mut files := []string{}
	for entry in entries {
		if entry.starts_with('.') {
			continue
		}
		entry_path := os.join_path(full_path, entry)
		if os.is_dir(entry_path) {
			dirs << entry
		} else {
			files << entry
		}
	}
	dirs.sort()
	files.sort()

	// 目录
	for entry in dirs {
		entry_url := if rel == '' { '/' + entry } else { '/' + rel + '/' + entry }
		html += '<div class="file-item dir"><span class="icon">📁</span><span class="name"><a href="${entry_url}/">${entry}/</a></span><span class="size">目录</span></div>'
	}

	// 文件
	for entry in files {
		entry_path := os.join_path(full_path, entry)
		entry_url := if rel == '' { '/' + entry } else { '/' + rel + '/' + entry }
		size := os.file_size(entry_path)
		size_str := if size < 1024 {
			'${size} B'
		} else if size < 1024 * 1024 {
			'${size / 1024} KB'
		} else {
			'${size / 1024 / 1024} MB'
		}
		html += '<div class="file-item"><span class="icon">📄</span><span class="name"><a href="${entry_url}">${entry}</a></span><span class="size">${size_str}</span></div>'
	}

	html += '</div></div></body></html>'
	return ctx.ok(html)
}

fn main() {
	mut app := &App{}
	veb.run_at[App, Context](mut app,
		host: '192.168.1.168'
		port: 8080
		family: .ip
		// show_startup_message: true
	) or { panic(err) }
}
