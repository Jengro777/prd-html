import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "dist");
const excluded = new Set([
  ".git",
  ".agents",
  ".claude",
  ".codex",
  ".aws",
  "dist",
  "scripts",
  "serve",
  "serve.vsh",
  "wrangler.toml",
  ".gitignore",
]);

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );

const encodePath = (value) =>
  value.split("/").map(encodeURIComponent).join("/");

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

const copyTree = (source, destination) => {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (excluded.has(entry.name) || entry.name.toLowerCase().endsWith(".zip") || entry.name.toLowerCase().endsWith(".vsh")) {
      continue;
    }
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyTree(sourcePath, destinationPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
};

copyTree(root, output);

const makeIndex = (directory) => {
  const indexPath = path.join(directory, "index.html");
  if (fs.existsSync(indexPath)) return;

  const entries = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith("."))
    .sort((left, right) => {
      if (left.isDirectory() !== right.isDirectory()) {
        return left.isDirectory() ? -1 : 1;
      }
      return left.name.localeCompare(right.name, "zh-CN");
    });

  const directories = entries.filter((entry) => entry.isDirectory());
  const pages = entries.filter(
    (entry) =>
      entry.isFile() &&
      entry.name.toLowerCase().endsWith(".html") &&
      entry.name !== "index.html",
  );
  const relativeDirectory = path
    .relative(output, directory)
    .split(path.sep)
    .join("/");
  const title = relativeDirectory || "PRD-HTML";
  const links = [
    ...directories.map(
      (entry) => `<a class="item item--dir" href="${escapeHtml(
        encodeURIComponent(entry.name),
      )}/"><span class="badge">目录</span><span class="name">${escapeHtml(
        entry.name,
      )}</span><span class="arrow">→</span></a>`,
    ),
    ...pages.map(
      (entry) => `<a class="item" data-path="${escapeHtml(
        entry.name,
      )}" href="${escapeHtml(encodeURIComponent(entry.name))}"><span class="badge">HTML</span><span class="name">${escapeHtml(
        entry.name,
      )}</span><span class="arrow">→</span></a>`,
    ),
  ].join("");

  const parentLink =
    directory === output
      ? ""
      : `<a class="back" href="../index.html">← 上一级</a>`;
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} · 目录</title>
  <style>
    :root{--p:#42b7ae;--pb:#e6f7f6;--bg:#f5f7fa;--t:#333;--m:#999;--b:#e5e7eb}
    *{box-sizing:border-box;margin:0;padding:0}
    body{min-height:100vh;background:var(--bg);color:var(--t);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
    header{background:#fff;border-bottom:1px solid var(--b);padding:20px 18px}
    .wrap{max-width:960px;margin:auto}.back{display:inline-block;margin-bottom:14px;color:#666;font-size:13px;text-decoration:none}.back:hover,h1{color:#222}h1{font-size:22px;overflow-wrap:anywhere}.desc{margin-top:6px;color:var(--m);font-size:12px}
    main{max-width:960px;margin:auto;padding:20px 16px 48px}.tools{display:flex;justify-content:space-between;gap:12px;margin-bottom:12px}.search{width:min(340px,100%);height:38px;padding:0 12px;border:1px solid var(--b);border-radius:8px;background:#fff;outline:none;font:inherit;font-size:13px}.search:focus{border-color:var(--p);box-shadow:0 0 0 2px rgba(66,183,174,.12)}
    .list{border:1px solid #f0f1f2;border-radius:12px;background:#fff;overflow:hidden}.item{display:flex;align-items:center;gap:10px;min-height:46px;padding:9px 14px;border-bottom:1px solid #f5f6f7;color:#555;text-decoration:none}.item:last-child{border-bottom:0}.item:hover{background:#fafafa;color:#222}.badge{display:inline-flex;height:20px;align-items:center;padding:0 6px;border-radius:4px;background:var(--pb);color:#338f88;font-size:9px;font-weight:700}.item--dir .badge{background:#f0f1f2;color:#666}.name{flex:1;min-width:0;font-size:13px;overflow-wrap:anywhere}.arrow{color:#b5bbc3}.empty{display:none;padding:50px 20px;color:var(--m);text-align:center;font-size:13px}
    @media(max-width:600px){h1{font-size:19px}.tools{flex-direction:column}.search{width:100%}}
  </style>
</head>
<body>
  <header><div class="wrap">${parentLink}<h1>${escapeHtml(title)}</h1><p class="desc">目录索引 · 新增页面会在下次构建时自动出现</p></div></header>
  <main><div class="tools"><input class="search" id="search" type="search" placeholder="搜索目录或页面"><span class="desc">${directories.length} 个目录 · ${pages.length} 个页面</span></div><div class="list">${links || '<div class="empty" style="display:block">暂无页面</div>'}</div><div class="empty" id="empty">没有匹配内容</div></main>
  <script>
    const input=document.getElementById("search"),items=[...document.querySelectorAll(".item")],empty=document.getElementById("empty");
    input.addEventListener("input",()=>{const q=input.value.trim().toLowerCase();let n=0;for(const item of items){const ok=!q||item.textContent.toLowerCase().includes(q);item.style.display=ok?"":"none";if(ok)n++}empty.style.display=n?"none":"block"});
  </script>
</body>
</html>`;
  fs.writeFileSync(indexPath, html);
};

const walk = (directory) => {
  makeIndex(directory);
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && !entry.name.startsWith(".")) {
      walk(path.join(directory, entry.name));
    }
  }
};

walk(output);
console.log(`Built ${output}`);
