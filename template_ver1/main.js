const GAS_URL = "https://script.google.com/macros/s/AKfycbygMWL_WIhglJ_PnzNYVq0_NIeYOw9FJEmaMojroWWjkc7EqmVtmmVYUK0pTvZHU76w/exec";

async function loadPosts() {
  const res = await fetch(GAS_URL);
  const json = await res.json();

  const bbs = document.getElementById("bbs");
  bbs.innerHTML = "";

  if (!json.data || json.data.length === 0) {
    bbs.textContent = "まだ投稿がありません";
    return;
  }

  json.data.forEach(row => {
    const div = document.createElement("div");
    div.className = "post";

    const date = new Date(row[0]).toLocaleString();

    div.innerHTML = `
      <div class="date">${date}</div>
      <div class="title">${escapeHtml(row[1])}</div>
      <div class="name">${escapeHtml(row[2])}</div>
      <div class="comment">${escapeHtml(row[3]).replace(/\n/g,"<br>")}</div>
    `;

    bbs.appendChild(div);
  });
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");
}

loadPosts();
