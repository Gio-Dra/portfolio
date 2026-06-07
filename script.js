const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const galleryImages = document.querySelectorAll(".gallery-grid img");

if (galleryImages.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <div class="image-lightbox-panel" role="dialog" aria-modal="true" aria-label="Expanded project image">
      <button class="image-lightbox-close" type="button" aria-label="Close expanded image">x</button>
      <img alt="">
      <p class="image-lightbox-caption"></p>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector(".image-lightbox-caption");
  const closeButton = lightbox.querySelector(".image-lightbox-close");

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  galleryImages.forEach((image) => {
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", "Expand image");

    const openLightbox = () => {
      const caption = image.closest("figure")?.querySelector("figcaption")?.textContent.trim() || "";

      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = caption;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeButton.focus();
    };

    image.addEventListener("click", openLightbox);
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox();
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
