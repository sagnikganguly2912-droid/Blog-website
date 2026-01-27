// document.querySelectorAll(".comments button").forEach(button => {
//     button.addEventListener("click", () => {
//         const comments = button.parentElement;
//         const nameInput = comments.querySelector(".name");
//         const textArea = comments.querySelector("textarea");
//         const list = comments.querySelector(".comment-list");

//         const name = nameInput.value.trim();
//         const text = textArea.value.trim();

//         if (!name || !text) {
//             alert("Please enter your name and comment.");
//             return;
//         }

//         const comment = document.createElement("div");
//         comment.className = "comment";
//         comment.innerHTML = `<strong>${name}</strong><br>${text}`;

//         list.appendChild(comment);

//         nameInput.value = "";
//         textArea.value = "";
//     });
// });

function pad2(n){ return String(n).padStart(2, "0"); }

function formatNow(){
  const d = new Date();
  const dd = pad2(d.getDate());
  const mm = pad2(d.getMonth() + 1);
  const yy = d.getFullYear();
  const hh = pad2(d.getHours());
  const mi = pad2(d.getMinutes());
  return `${dd}-${mm}-${yy} ${hh}:${mi}`;
}

function escapeHTML(str){
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.querySelectorAll(".comments").forEach((section) => {
  const postId = section.dataset.post;
  const form = section.querySelector(".comment-form");
  const nameInput = section.querySelector(".comment-name");
  const msgInput = section.querySelector(".comment-message");
  const list = section.querySelector(".comment-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const msg = msgInput.value.trim();

    if (!name || !msg) {
      alert("Please enter both name and message.");
      return;
    }

    // Create comment element
    const li = document.createElement("li");
    li.className = "comment-item";

    li.innerHTML = `
      <div class="comment-head">
        <span class="comment-author">${escapeHTML(name)}</span>
        <span class="comment-time">${formatNow()}</span>
      </div>
      <p class="comment-body">${escapeHTML(msg)}</p>
    `;

    list.prepend(li);

    // Clear inputs
    nameInput.value = "";
    msgInput.value = "";

    // Optional: lightweight persistence per session (not required)
    // (kept off by default to keep your submission simple)
  });
});
