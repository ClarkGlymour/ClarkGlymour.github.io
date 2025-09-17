fetch("bibliography.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("bibliography");
    data.forEach(entry => {
      const div = document.createElement("div");
      div.className = "entry";

      div.innerHTML = `
        <h3>${entry.title} (${entry.year})</h3>
        <p><em>${entry.authors}</em></p>
        <p>
          <a href="${entry.link}" target="_blank">[Link]</a>
          ${entry.pdf ? `<a href="${entry.pdf}" target="_blank">[PDF]</a>` : ""}
          <button class="abstract-btn">Show Abstract</button>
        </p>
        <p class="abstract" style="display:none;">${entry.abstract}</p>
      `;

      div.querySelector(".abstract-btn").addEventListener("click", e => {
        const abs = div.querySelector(".abstract");
        abs.style.display = abs.style.display === "none" ? "block" : "none";
        e.target.textContent = abs.style.display === "none" ? "Show Abstract" : "Hide Abstract";
      });

      container.appendChild(div);
    });
  });