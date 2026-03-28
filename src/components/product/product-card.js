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
      <article class="flex h-full flex-col rounded-[24px] bg-[#f5f3ef] p-3 font-geist shadow-[0_14px_34px_rgba(0,0,0,0.06)]">
        <div class="relative mb-4 h-[182px] overflow-hidden rounded-[20px] bg-[#d9dbd8] md:h-[188px]">
          <img
            src="${image}"
            alt="${title.replace(/<br\s*\/?>/gi, " ")}"
            class="h-full w-full object-cover object-top"
          />
          <div class="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-zinc-700">
            ${badge}
          </div>
        </div>

        <div class="px-2 pb-2">
          <h3 class="mb-3 min-h-[44px] text-[13px] leading-[1.55] text-zinc-600">
            ${title}
          </h3>

          <div class="mb-2 flex items-center gap-3">
            <span class="text-[12px] text-zinc-400 line-through">${oldPrice}</span>
            <span class="text-[0.95rem] text-zinc-900">${price}</span>
          </div>

          <p class="text-[11px] text-zinc-700">
            ${installments}
          </p>
        </div>
      </article>
    `;
  }
}

customElements.define("product-card", ProductCard);
