// Helper: render one bibliography file into a container
function loadBibliography(jsonFile, containerId) {
  fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      // --- Sort by year (descending: newest first) ---
      data.sort((a, b) => {
        // handle year stored directly
        const yearA = a.year || (a.issued && a.issued["date-parts"] ? a.issued["date-parts"][0][0] : 0);
        const yearB = b.year || (b.issued && b.issued["date-parts"] ? b.issued["date-parts"][0][0] : 0);
        return yearB - yearA; // newest first
      });
      // --- Render entries ---
      data.forEach(entry => {
        const title = entry.title || "";
        const link = entry["URL"] || "";
        const year = entry.year || (entry.issued && entry.issued["date-parts"] ? entry.issued["date-parts"][0][0] : "");
        //const pdf = entry.pdf || "";
        const abstract = entry.abstract || "";
        const journal = entry["container-title"] || "";

        // Authors (handle both CSL-JSON and plain string)
        let authors = "";
        if (Array.isArray(entry.author)) {
          authors = entry.author.map(a => `${a.given || ""} ${a.family || ""}`.trim()).join(", ");
        } else if (entry.authors) {
          authors = entry.authors;
        }

        //let year = "";
        //if (entry.year) {
        //  year = entry.year; // if someone already stored it directly
        //} else if (entry.issued && entry.issued["date-parts"]) {
        //  year = entry.issued["date-parts"][0][0]; // first element of first array
        //}

        const div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = `
            <h3>${title}${year ? ` (${year})` : ""}${journal ? `, <em>${journal}</em>` : ""}</h3>
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

// --- Search function ---
function searchPubs() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const entries = document.querySelectorAll(".entry");

  entries.forEach(entry => {
    const text = entry.textContent.toLowerCase();
    entry.style.display = text.includes(query) ? "block" : "none";
  });
}


// Load each section from its own file
loadBibliography("bibliography_statcs.json", "statcs");
loadBibliography("bibliography_physics.json", "physics");
loadBibliography("bibliography_psychneuro.json", "psychneuro");
//loadBibliography("bibliography_genomics.json", "genomics");
//loadBibliography("bibliography_socialsciences.json", "socialsciences");
//loadBibliography("bibliography_medicine.json", "medicine");
//loadBibliography("bibliography_logic.json", "logic");
//loadBibliography("bibliography_historyofscience.json", "historyofscience");
//loadBibliography("bibliography_popular.json", "popular");
//loadBibliography("bibliography_philosophy.json", "philosophy");
