fetch("bibliography.json")
  .then(response => response.json())
  .then(data => {
    // Map category names → div IDs
    const categoryMap = {
      "Statistics and Computer Science": "statcs",
      "Physics": "physics",
      "Psychology and Neuroscience": "psychneuro",
      "Genomics": "genomics",
      "Social Sciences": "socialsciences",
      "Medicine": "medicine",
      "Logic": "logic",
      "History of Science": "historyofscience",
      "Popular Books, Essays and Reviews": "popular",
      "Philosophical Publications": "philosophy"
    };

    data.forEach(entry => {
      // --- Transform CSL-JSON into simplified fields ---
      const title = entry.title || "";

      const authors = entry.author
        ? entry.author.map(a => `${a.given || ""} ${a.family || ""}`).join(", ")
        : "";

      const year = entry.issued && entry.issued["date-parts"]
        ? entry.issued["date-parts"][0][0]
        : "";

      const link = entry.DOI
        ? `https://doi.org/${entry.DOI}`
        : (entry.URL || "");

      const pdf = entry.pdf || "";       // optional
      const abstract = entry.abstract || "";
      const category = entry.category || "Miscellaneous";

      // --- Build the HTML entry ---
      const div = document.createElement("div");
      div.className = "entry";

      div.innerHTML = `
        <h3>${title} (${year})</h3>
        <p><em>${authors}</em></p>
        <p>
          ${link ? `<a href="${link}" target="_blank">[Link]</a>` : ""}
          ${pdf ? `<a href="${pdf}" target="_blank">[PDF]</a>` : ""}
          ${abstract ? `<button class="abstract-btn">Show Abstract</button>` : ""}
        </p>
        ${abstract ? `<p class="abstract" style="display:none;">${abstract}</p>` : ""}
      `;

      // --- Abstract toggle ---
      const btn = div.querySelector(".abstract-btn");
      if (btn) {
        btn.addEventListener("click", e => {
          const abs = div.querySelector(".abstract");
          abs.style.display = abs.style.display === "none" ? "block" : "none";
          e.target.textContent = abs.style.display === "none" ? "Show Abstract" : "Hide Abstract";
        });
      }

      // --- Place entry into correct section (or fallback) ---
      const sectionId = categoryMap[category] || "miscellaneous";
      if (document.getElementById(sectionId)) {
        document.getElementById(sectionId).appendChild(div);
      } else {
        console.warn(`No section found for category: ${category}`);
      }
    });
  });
