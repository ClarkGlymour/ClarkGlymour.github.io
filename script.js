fetch("bibliography.json")
  .then(response => response.json())
  .then(data => {
    // Map JSON category values to the IDs of your <div>s
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

      // Abstract toggle
      div.querySelector(".abstract-btn").addEventListener("click", e => {
        const abs = div.querySelector(".abstract");
        abs.style.display = abs.style.display === "none" ? "block" : "none";
        e.target.textContent = abs.style.display === "none" ? "Show Abstract" : "Hide Abstract";
      });

      // Find the right section container
      const sectionId = categoryMap[entry.category];
      if (sectionId) {
        document.getElementById(sectionId).appendChild(div);
      } else {
        console.warn(`No section defined for category: ${entry.category}`);
      }
    });
  });
