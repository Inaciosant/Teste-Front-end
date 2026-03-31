class AppRelatedProducts extends HTMLElement {
  constructor() {
    super();

    this.products = this.getProducts();
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this.handleClick);
    this.refreshIcons();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
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
          <div class="mb-5 flex items-center justify-between">
            <h2 class="font-geist text-[2rem] leading-tight text-zinc-900">Produtos relacionados</h2>

            <div class="hidden items-center gap-2 md:flex">
              <button type="button" data-action="related-prev" class="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#d8d7cf] text-zinc-500 transition-colors hover:bg-white">
                <i data-lucide="chevron-left" class="h-4 w-4"></i>
              </button>
              <button type="button" data-action="related-next" class="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#d8d7cf] text-zinc-500 transition-colors hover:bg-white">
                <i data-lucide="chevron-right" class="h-4 w-4"></i>
              </button>
            </div>
          </div>

          <div data-related-track class="flex gap-4 overflow-x-auto pb-2 hide-scrollbar lg:gap-4">
            ${this.renderCards()}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("app-related-products", AppRelatedProducts);
