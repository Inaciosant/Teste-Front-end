class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.mobileCompactQuery = window.matchMedia("(max-width: 1023px)");
    this.handleCompactViewportChange = this.handleCompactViewportChange.bind(this);
  }

  static get observedAttributes() {
    return ["title", "image", "price", "old-price", "installments", "badge", "compact-mobile", "href"];
  }

  connectedCallback() {
    this.render();
    this.updateHostLayout();
    this.mobileCompactQuery.addEventListener("change", this.handleCompactViewportChange);
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
      this.updateHostLayout();
    }
  }

  disconnectedCallback() {
    this.mobileCompactQuery.removeEventListener("change", this.handleCompactViewportChange);
  }

  handleCompactViewportChange() {
    this.updateHostLayout();
  }

  updateHostLayout() {
    if (!this.hasAttribute("compact-mobile")) {
      this.style.width = "";
      this.style.maxWidth = "";
      this.style.justifySelf = "";
      return;
    }

    if (this.mobileCompactQuery.matches) {
      this.style.width = "100%";
      this.style.maxWidth = "156px";
      this.style.justifySelf = "center";
      return;
    }

    this.style.width = "";
    this.style.maxWidth = "";
    this.style.justifySelf = "";
  }

  render() {
    const title = this.getAttribute("title") || "";
    const image = this.getAttribute("image") || "";
    const price = this.getAttribute("price") || "";
    const oldPrice = this.getAttribute("old-price") || "";
    const installments = this.getAttribute("installments") || "";
    const badge = this.getAttribute("badge") || "";
    const compactMobile = this.hasAttribute("compact-mobile");
    const href = this.getAttribute("href") || "";

    const articleClass = compactMobile
      ? "flex h-full max-[1023px]:h-[285px] flex-col overflow-hidden rounded-[24px] max-[1023px]:rounded-[8px] bg-[#f1f0eb] font-geist transition-shadow hover:shadow-md"
      : "flex h-full flex-col overflow-hidden rounded-[24px] bg-[#f1f0eb] font-geist transition-shadow hover:shadow-md";
    const imageWrapClass = compactMobile
      ? "relative h-[250px] md:h-[280px] max-[1023px]:h-[156px] w-full shrink-0 bg-[#d9dbd8]"
      : "relative h-[250px] md:h-[280px] w-full shrink-0 bg-[#d9dbd8]";
    const badgeClass = compactMobile
      ? "absolute left-4 top-4 max-[1023px]:left-2 max-[1023px]:top-2 rounded-full bg-white px-3.5 py-1.5 max-[1023px]:px-2 max-[1023px]:py-1 text-[12px] max-[1023px]:text-[10px] font-medium text-zinc-800 shadow-sm"
      : "absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-medium text-zinc-800 shadow-sm";
    const contentClass = compactMobile
      ? "flex flex-1 flex-col px-5 pt-5 pb-6 max-[1023px]:px-2.5 max-[1023px]:pt-2.5 max-[1023px]:pb-3"
      : "flex flex-1 flex-col px-5 pt-5 pb-6";
    const titleClass = compactMobile
      ? "mb-4 max-[1023px]:mb-2 text-[14px] max-[1023px]:text-[12px] font-normal leading-relaxed max-[1023px]:leading-[1.35] text-zinc-600"
      : "mb-4 text-[14px] font-normal leading-relaxed text-zinc-600";
    const priceRowClass = compactMobile
      ? "mb-1.5 max-[1023px]:mb-1 flex items-center gap-3 max-[1023px]:gap-2"
      : "mb-1.5 flex items-center gap-3";
    const oldPriceClass = compactMobile
      ? "text-[14px] max-[1023px]:text-[11px] text-zinc-400 line-through"
      : "text-[14px] text-zinc-400 line-through";
    const priceClass = compactMobile
      ? "text-[16px] max-[1023px]:text-[14px] text-zinc-900"
      : "text-[16px] text-zinc-900";
    const installmentClass = compactMobile
      ? "text-[12px] max-[1023px]:text-[11px] text-zinc-600"
      : "text-[12px] text-zinc-600";

    const cardMarkup = `
      <article class="${articleClass}">
        <div class="${imageWrapClass}">
          <img
            src="${image}"
            alt="${title.replace(/<br\s*\/?>/gi, " ")}"
            class="h-full w-full object-cover object-top"
          />
          <div class="${badgeClass}">
            ${badge}
          </div>
        </div>

        <div class="${contentClass}">
          <h3 class="${titleClass}">
            ${title}
          </h3>

          <div class="mt-auto">
            <div class="${priceRowClass}">
              <span class="${oldPriceClass}">${oldPrice}</span>
              <span class="${priceClass}">${price}</span>
            </div>

            <p class="${installmentClass}">
              ${installments}
            </p>
          </div>
        </div>
      </article>
    `;

    if (href) {
      this.innerHTML = `
        <a href="${href}" class="block h-full w-full no-underline">
          ${cardMarkup}
        </a>
      `;
      return;
    }

    this.innerHTML = cardMarkup;
  }
}

customElements.define("product-card", ProductCard);
