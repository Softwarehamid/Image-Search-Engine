const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResults = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");



let keyword = "";
let page = 1;


async function searchImages() {
  try {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("API limit or network issue");

    const data = await response.json();
    if (page === 1) searchResults.innerHTML = "";

    const results = data.results;
    if (results.length === 0) {
      searchResults.innerHTML = "<p style='text-align:center;'>No images found 😞</p>";
      return;
    }

    results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.style.textAlign = "center";

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description || "Unsplash Image";

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.appendChild(image);

      const credit = document.createElement("p");
      credit.innerHTML = `Photo by <a href="${result.user.links.html}" target="_blank" style="color: #ccc;">${result.user.name}</a>`;
      credit.style.fontSize = "14px";
      credit.style.color = "#ccc";
      credit.style.marginTop = "8px";

      imageWrapper.appendChild(imageLink);
      imageWrapper.appendChild(credit);
      searchResults.appendChild(imageWrapper);
    });

    showMoreBtn.style.display = "block";
  } catch (err) {
    console.error(err);
    searchResults.innerHTML = `<p style='text-align:center;'>Something went wrong. Try again later.</p>`;
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});

const backToTopBtn = document.getElementById("backToTop");
window.onscroll = () => {
  backToTopBtn.style.display = window.scrollY > 500 ? "block" : "none";
};

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

const typeText = "Image Search Engine";
let i = 0;
function typeWriter() {
  if (i < typeText.length) {
    document.getElementById("typewriter").innerHTML += typeText.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();


