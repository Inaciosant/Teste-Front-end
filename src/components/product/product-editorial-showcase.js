class ProductEditorialShowcase extends HTMLElement {
  constructor() {
    super();
    this.handleResize = this.handleResize.bind(this);
    this.products = Array.from({ length: 6 }, () => ({
      title: "Blusa de moletom oversized com mangas bufantes",
      image: "./assets/images/products/Product1.jpg",
      price: "159,92",
      oldPrice: "199,90",
      installments: "10x de R$ 15,99 sem juros",
      badge: "20% off"
    }));
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
    this.updateAllControls();
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  disconnectedCallback() {
    this.querySelectorAll("[data-editorial-track]").forEach((track) => {
      track.removeEventListener("scroll", this.handleResize);
    });
    window.removeEventListener("resize", this.handleResize);
  }

  bindEvents() {
    this.querySelectorAll("[data-editorial-carousel]").forEach((carousel) => {
      const track = carousel.querySelector("[data-editorial-track]");
      const prev = carousel.querySelector("[data-editorial-prev]");
      const next = carousel.querySelector("[data-editorial-next]");

      if (!track) return;

      const scrollByCard = (direction) => {
        const firstCard = track.querySelector("[data-editorial-item]");
        if (!firstCard) return;

        const styles = window.getComputedStyle(track);
        const gap = Number.parseFloat(styles.columnGap || styles.gap || "16");
        const amount = firstCard.getBoundingClientRect().width + gap;
        track.scrollBy({ left: direction * amount, behavior: "smooth" });
      };

      prev?.addEventListener("click", () => scrollByCard(-1));
      next?.addEventListener("click", () => scrollByCard(1));
      track.addEventListener("scroll", () => this.updateControls(carousel), { passive: true });
    });

    window.addEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.updateAllControls();
  }

  updateAllControls() {
    this.querySelectorAll("[data-editorial-carousel]").forEach((carousel) => {
      this.updateControls(carousel);
    });
  }

  updateControls(carousel) {
    const track = carousel.querySelector("[data-editorial-track]");
    const prev = carousel.querySelector("[data-editorial-prev]");
    const next = carousel.querySelector("[data-editorial-next]");

    if (!track || !prev || !next) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= 4;
    const atEnd = track.scrollLeft >= maxScroll - 4;

    prev.disabled = atStart;
    next.disabled = atEnd;
    prev.classList.toggle("opacity-40", atStart);
    next.classList.toggle("opacity-40", atEnd);
    prev.classList.toggle("cursor-not-allowed", atStart);
    next.classList.toggle("cursor-not-allowed", atEnd);
  }

  renderCards() {
    return this.products
      .map(
        (product) => `
          <div data-editorial-item class="editorial-card-item w-[260px] md:w-[280px] min-w-0 shrink-0 snap-start pb-4">
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

  renderCarousel(title) {
    return `
      <div data-editorial-carousel class="flex h-full flex-col justify-center bg-white pb-6 lg:pb-0">
        <div class="mb-6 flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <h3 class="font-geist text-xl font-normal text-zinc-900">${title}</h3>
            <a href="#" class="inline-flex rounded-full border border-zinc-200 px-4 py-[5px] text-[11px] font-medium text-zinc-600 transition-colors hover:bg-zinc-50">
              Veja mais!
            </a>
          </div>

          <div class="hidden items-center gap-2 md:flex">
            <button data-editorial-prev type="button" aria-label="Anterior" class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed">
              <i data-lucide="chevron-left" class="h-[18px] w-[18px]"></i>
            </button>
            <button data-editorial-next type="button" aria-label="Próximo" class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed">
              <i data-lucide="chevron-right" class="h-[18px] w-[18px]"></i>
            </button>
          </div>
        </div>

        <div data-editorial-track class="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pt-2 pb-6">
          ${this.renderCards()}
        </div>
      </div>
    `;
  }

  render() {
    this.innerHTML = `
      <section class="col-span-12 w-full pt-10 pb-16 overflow-hidden">
        <div class="grid w-full grid-cols-1 lg:grid-cols-2 lg:grid-rows-[520px_520px] gap-y-10 lg:gap-y-0">
          
          <!-- Imagem Óculos -->
          <article class="relative min-h-[400px] lg:min-h-0 overflow-hidden bg-zinc-200 lg:rounded-r-[40px] z-10 w-full">
            <img src="./assets/images/banners/68575d20045d21102c3dd58478aa6f81ae38c4f0.jpg" alt="Banner com óculos vermelhos" class="h-full w-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/40"></div>
            <div class="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center font-geist">
              <p class="mb-4 text-[14px] text-white">Confira nossas diversas cores de lente</p>
              <a href="#" class="inline-flex rounded-full border border-[#E7D158] px-8 py-2.5 text-[12px] text-[#E7D158] transition-colors hover:bg-[#E7D158] hover:text-black">
                Veja mais!
              </a>
            </div>
          </article>

          <!-- Carrossel Óculos -->
          <div class="flex flex-col justify-center overflow-hidden min-w-0 px-4 md:px-8 lg:pr-20 lg:pl-10 xl:pr-24 xl:pl-16">
            ${this.renderCarousel("Óculos")}
          </div>

          <!-- Carrossel Winter 24 -->
          <div class="flex flex-col justify-center overflow-hidden order-last lg:order-none min-w-0 px-4 md:px-8 lg:pl-20 lg:pr-10 xl:pl-24 xl:pr-16">
            ${this.renderCarousel("Winter 24 Collection")}
          </div>

          <!-- Imagem Winter 24 -->
          <article class="relative min-h-[400px] lg:min-h-0 overflow-hidden bg-zinc-300 lg:rounded-l-[40px] z-10 w-full">
            <img src="./assets/images/banners/2.jpg" alt="Banner Winter 24" class="h-full w-full object-cover object-[center_top]" />
            <div class="absolute inset-0 bg-black/40"></div>
            <div class="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center font-geist">
              <span class="mb-3 text-[11px] uppercase tracking-[0.42em] text-white/90">Collection</span>
              <h3 class="mb-5 text-[2.4rem] tracking-wide font-light text-white leading-none">WINTER 24</h3>
              <a href="#" class="inline-flex rounded-full border border-[#E7D158] px-8 py-2.5 text-[12px] text-[#E7D158] transition-colors hover:bg-[#E7D158] hover:text-black">
                Veja mais!
              </a>
            </div>
          </article>

        </div>
      </section>
    `;
  }
}

customElements.define("product-editorial-showcase", ProductEditorialShowcase);
