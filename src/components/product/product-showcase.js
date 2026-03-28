class ProductShowcase extends HTMLElement {
  constructor() {
    super();
    this.handleResize = this.handleResize.bind(this);
    this.handleTrackScroll = this.handleTrackScroll.bind(this);
    this.products = [
      {
        title: "Blusa de moletom oversized com mangas bufantes",
        image: "./assets/images/products/Product1.jpg",
        price: "159,92",
        oldPrice: "199,90",
        installments: "10x de R$ 15,99 sem juros",
        badge: "20% off"
      },
      {
        title: "Blusa de moletom oversized com mangas bufantes",
        image: "./assets/images/products/Product1.jpg",
        price: "159,92",
        oldPrice: "199,90",
        installments: "10x de R$ 15,99 sem juros",
        badge: "20% off"
      },
      {
        title: "Blusa de moletom oversized com mangas bufantes",
        image: "./assets/images/products/Product1.jpg",
        price: "159,92",
        oldPrice: "199,90",
        installments: "10x de R$ 15,99 sem juros",
        badge: "20% off"
      },
      {
        title: "Blusa de moletom oversized com mangas bufantes",
        image: "./assets/images/products/Product1.jpg",
        price: "159,92",
        oldPrice: "199,90",
        installments: "10x de R$ 15,99 sem juros",
        badge: "20% off"
      }
    ];
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
    this.updateControls();
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  disconnectedCallback() {
    this.track?.removeEventListener("scroll", this.handleTrackScroll);
    window.removeEventListener("resize", this.handleResize);
  }

  bindEvents() {
    this.track = this.querySelector("[data-showcase-track]");
    this.prevButton = this.querySelector("[data-showcase-prev]");
    this.nextButton = this.querySelector("[data-showcase-next]");

    if (!this.track) {
      return;
    }

    const scrollByCard = (direction) => {
      const firstCard = this.track.querySelector("[data-showcase-item]");
      if (!firstCard) {
        return;
      }

      const trackStyles = window.getComputedStyle(this.track);
      const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "24");
      const amount = firstCard.getBoundingClientRect().width + gap;
      this.track.scrollBy({ left: direction * amount, behavior: "smooth" });
    };

    this.prevButton?.addEventListener("click", () => scrollByCard(-1));
    this.nextButton?.addEventListener("click", () => scrollByCard(1));

    this.track.addEventListener("scroll", this.handleTrackScroll, { passive: true });
    window.addEventListener("resize", this.handleResize);
  }

  handleTrackScroll() {
    this.updateControls();
  }

  handleResize() {
    this.updateControls();
  }

  updateControls() {
    if (!this.track || !this.prevButton || !this.nextButton) {
      return;
    }

    const maxScroll = this.track.scrollWidth - this.track.clientWidth;
    const atStart = this.track.scrollLeft <= 4;
    const atEnd = this.track.scrollLeft >= maxScroll - 4;

    this.prevButton.disabled = atStart;
    this.nextButton.disabled = atEnd;
    this.prevButton.classList.toggle("opacity-40", atStart);
    this.nextButton.classList.toggle("opacity-40", atEnd);
    this.prevButton.classList.toggle("cursor-not-allowed", atStart);
    this.nextButton.classList.toggle("cursor-not-allowed", atEnd);
  }

  renderCards() {
    return this.products
      .map(
        (product) => `
          <div data-showcase-item class="showcase-card-item min-w-0 shrink-0 snap-start">
            <product-card
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
      <section class="col-span-12 bg-white py-12 md:py-14">
        <div class="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6 lg:px-20 xl:px-24">
          <div class="flex items-center justify-between gap-6">
            <div class="flex items-center gap-4">
              <h2 class="font-geist text-[1.05rem] text-zinc-900 md:text-[1.15rem]">New in</h2>
              <a href="#" class="inline-flex rounded-full border border-[#d8cc5b] px-4 py-1.5 text-[11px] text-zinc-900 transition-colors hover:bg-[#d8cc5b]">
                Veja mais!
              </a>
            </div>

            <div class="hidden items-center gap-3 md:flex">
              <button data-showcase-prev type="button" aria-label="Anterior" class="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:bg-zinc-100">
                <i data-lucide="chevron-left" class="h-4 w-4"></i>
              </button>
              <button data-showcase-next type="button" aria-label="Próximo" class="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:bg-zinc-100">
                <i data-lucide="chevron-right" class="h-4 w-4"></i>
              </button>
            </div>
          </div>

          <div data-showcase-track class="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2">
            ${this.renderCards()}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("product-showcase", ProductShowcase);
