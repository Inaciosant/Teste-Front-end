class AppRelatedProducts extends HTMLElement {
  constructor() {
    super();

    this.products = this.getProducts();
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this.handleClick);
    
    const track = this.querySelector("[data-related-track]");
    if (track) {
      track.addEventListener("scroll", this.handleScroll.bind(this));
    }
    
    this.refreshIcons();
    // Initial progress computation next frame to let layout settle
    setTimeout(() => this.handleScroll(), 50);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
    const track = this.querySelector("[data-related-track]");
    if (track) {
      track.removeEventListener("scroll", this.handleScroll.bind(this));
    }
  }

  handleScroll() {
    const track = this.querySelector("[data-related-track]");
    const progressBar = this.querySelector("[data-related-progress]");
    
    if (!track || !progressBar) return;
    
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const progress = maxScrollLeft > 0 ? (track.scrollLeft / maxScrollLeft) * 100 : 0;
    
    progressBar.style.width = `${progress}%`;
  }

  getProducts() {
    return [
      {
        id: 1,
        title: "Blusa de moletom oversized com mangas bufantes",
        image: "./assets/images/products/Product1.jpg",
        price: "159,92",
        oldPrice: "199,90",
        installments: "10x de R$ 15,99 sem juros",
        badge: "20% off"
      },
      {
        id: 1,
        title: "Blusa de moletom oversized com mangas bufantes",
        image: "./assets/images/products/Product1.jpg",
        price: "159,92",
        oldPrice: "199,90",
        installments: "10x de R$ 15,99 sem juros",
        badge: "20% off"
      },
      {
        id: 1,
        title: "Blusa de moletom oversized com mangas bufantes",
        image: "./assets/images/products/Product1.jpg",
        price: "159,92",
        oldPrice: "199,90",
        installments: "10x de R$ 15,99 sem juros",
        badge: "20% off"
      },
      {
        id: 1,
        title: "Blusa de moletom oversized com mangas bufantes",
        image: "./assets/images/products/Product1.jpg",
        price: "159,92",
        oldPrice: "199,90",
        installments: "10x de R$ 15,99 sem juros",
        badge: "20% off"
      }
    ];
  }

  refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  handleClick(event) {
    const actionTarget = event.target.closest("[data-action]");

    if (!actionTarget) {
      return;
    }

    const action = actionTarget.dataset.action;

    if (action !== "related-prev" && action !== "related-next") {
      return;
    }

    const track = this.querySelector("[data-related-track]");

    if (!track) {
      return;
    }

    const delta = action === "related-next" ? 320 : -320;
    track.scrollBy({ left: delta, behavior: "smooth" });
  }

  renderCards() {
    return this.products
      .map(
        (product) => `
          <div class="w-[248px] shrink-0 sm:w-[270px] lg:w-[302px]">
            <product-card
              href="./produto.html?id=${product.id}"
              title="${product.title}"
              image="${product.image}"
              price="${product.price}"
              old-price="${product.oldPrice}"
              installments="${product.installments}"
              badge="${product.badge}"
            ></product-card>
          </div>
        `
      )
      .join("");
  }

  render() {
    this.innerHTML = `
      <section class="w-full bg-[#f3f3f3] pb-14">
        <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-20 xl:px-24">
          <div class="mb-5 flex items-start md:items-center justify-between gap-4">
            <h2 class="min-w-0 max-w-[140px] break-words md:max-w-none font-geist text-[1.4rem] leading-[1.1] md:text-[2rem] md:leading-tight text-zinc-900">Produtos relacionados</h2>

            <a href="#" class="md:hidden inline-flex shrink-0 rounded-full border border-[#e1e0d7] px-4 py-1.5 text-[12px] text-zinc-700 transition-colors hover:bg-[#e1e0d7] mt-1">
              Veja mais!
            </a>

            <div class="hidden items-center gap-2 md:flex">
              <button type="button" data-action="related-prev" class="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#d8d7cf] text-zinc-500 transition-colors hover:bg-white">
                <i data-lucide="chevron-left" class="h-4 w-4"></i>
              </button>
              <button type="button" data-action="related-next" class="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#d8d7cf] text-zinc-500 transition-colors hover:bg-white">
                <i data-lucide="chevron-right" class="h-4 w-4"></i>
              </button>
            </div>
          </div>

          <div data-related-track class="flex gap-4 overflow-x-auto pb-4 hide-scrollbar lg:gap-4 lg:pb-2">
            ${this.renderCards()}
          </div>

          <div class="mt-2 text-center lg:hidden">
            <div class="relative mx-auto h-[4px] w-[80px] overflow-hidden rounded-full bg-[#f1f1ee]">
              <div data-related-progress class="absolute left-0 top-0 h-full w-[25%] rounded-full bg-[#E7D158] transition-[width] duration-150 ease-out"></div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("app-related-products", AppRelatedProducts);
