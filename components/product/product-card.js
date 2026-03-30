class ProductCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "image", "price", "old-price", "installments", "badge"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  render() {
    const title = this.getAttribute("title") || "";
    const image = this.getAttribute("image") || "";
    const price = this.getAttribute("price") || "";
    const oldPrice = this.getAttribute("old-price") || "";
    const installments = this.getAttribute("installments") || "";
    const badge = this.getAttribute("badge") || "";

    this.innerHTML = `
      <article class="flex h-full flex-col overflow-hidden rounded-[24px] bg-[#f1f0eb] font-geist transition-shadow hover:shadow-md">
        <div class="relative h-[250px] md:h-[280px] w-full shrink-0 bg-[#d9dbd8]">
          <img
            src="${image}"
            alt="${title.replace(/<br\s*\/?>/gi, " ")}"
            class="h-full w-full object-cover object-top"
          />
          <div class="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-medium text-zinc-800 shadow-sm">
            ${badge}
          </div>
        </div>

        <div class="flex flex-1 flex-col px-5 pt-5 pb-6">
          <h3 class="mb-4 text-[14px] font-normal leading-relaxed text-zinc-600">
            ${title}
          </h3>

          <div class="mt-auto">
            <div class="mb-1.5 flex items-center gap-3">
              <span class="text-[14px] text-zinc-400 line-through">${oldPrice}</span>
              <span class="text-[16px] text-zinc-900">${price}</span>
            </div>

            <p class="text-[12px] text-zinc-600">
              ${installments}
            </p>
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define("product-card", ProductCard);
