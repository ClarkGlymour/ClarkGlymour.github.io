// Helper: render one bibliography file into a container
function loadBibliography(jsonFile, containerId) {
  fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      data.forEach(entry => {
        const title = entry.title || "";
        const authors = entry.authors || "";
        const year = entry.year || "";
        const link = entry.link || "";
        //const pdf = entry.pdf || "";
        const abstract = entry.abstract || "";

        const div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = `
          <h3>${title} (${year})</h3>
          <p><em>${authors}</em></p>
          <p>
            ${link ? `<a href="${link}" target="_blank">[Link]</a>` : ""}
            ${abstract ? `<button class="abstract-btn">Show Abstract</button>` : ""}
          </p>
          ${abstract ? `<p class="abstract" style="display:none;">${abstract}</p>` : ""}
        `;

        // Toggle abstract
        const btn = div.querySelector(".abstract-btn");
        if (btn) {
          btn.addEventListener("click", e => {
            const abs = div.querySelector(".abstract");
            abs.style.display = abs.style.display === "none" ? "block" : "none";
            e.target.textContent = abs.style.display === "none" ? "Show Abstract" : "Hide Abstract";
          });
        }

        document.getElementById(containerId).appendChild(div);
      });
    })
    .catch(err => console.error(`Error loading ${jsonFile}:`, err));
}

// Load each section from its own file
loadBibliography("bibliography_statcs.json", "statcs");
//loadBibliography("bibliography_physics.json", "physics");
//loadBibliography("bibliography_psychneuro.json", "psychneuro");
//loadBibliography("bibliography_genomics.json", "genomics");
//loadBibliography("bibliography_socialsciences.json", "socialsciences");
//loadBibliography("bibliography_medicine.json", "medicine");
//loadBibliography("bibliography_logic.json", "logic");
//loadBibliography("bibliography_historyofscience.json", "historyofscience");
//loadBibliography("bibliography_popular.json", "popular");
//loadBibliography("bibliography_philosophy.json", "philosophy");
