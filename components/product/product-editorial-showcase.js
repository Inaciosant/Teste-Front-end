class ProductEditorialShowcase extends HTMLElement {
  constructor() {
    super();
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
    setTimeout(() => this.initCarousels(), 100);
    
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  disconnectedCallback() {
    this.swipers?.forEach((swiper) => swiper.destroy(true, true));
  }

  initCarousels() {
    this.swipers = [];
    this.querySelectorAll("[data-editorial-carousel]").forEach((carousel) => {
      const container = carousel.querySelector("[data-editorial-swiper]");
      if (!container || !window.Swiper) return;

      const swiper = new window.Swiper(container, {
        slidesPerView: "auto",
        spaceBetween: 16,
        grabCursor: true,
        watchSlidesProgress: true,
        navigation: {
          prevEl: carousel.querySelector("[data-editorial-prev]"),
          nextEl: carousel.querySelector("[data-editorial-next]")
        }
      });
      this.swipers.push(swiper);
    });
  }

  renderCards() {
    return this.products.map(product => `
      <div data-editorial-item class="swiper-slide !h-auto !w-[240px] md:!w-[280px] pb-5 pt-2">
        <product-card
          title="${product.title}"
          image="${product.image}"
          price="${product.price}"
          old-price="${product.oldPrice}"
          installments="${product.installments}"
          badge="${product.badge}"
          class="h-full w-full block transition-transform duration-300 hover:-translate-y-1"
        ></product-card>
      </div>
    `).join("");
  }

  renderCarousel(title) {
    return `
      <div data-editorial-carousel class="flex h-full flex-col justify-start bg-transparent md:bg-white pt-2">
        <div class="mb-6 hidden md:flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <h3 class="font-geist text-xl font-normal text-zinc-900">${title}</h3>
            <a href="#" class="inline-flex rounded-full border border-zinc-200 px-4 py-[5px] text-[11px] font-medium text-zinc-600 transition-colors hover:bg-zinc-50">
              Veja mais!
            </a>
          </div>
          <div class="flex items-center gap-2">
            <button data-editorial-prev class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 disabled:opacity-20">
              <i data-lucide="chevron-left" class="h-[18px] w-[18px]"></i>
            </button>
            <button data-editorial-next class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 disabled:opacity-20">
              <i data-lucide="chevron-right" class="h-[18px] w-[18px]"></i>
            </button>
          </div>
        </div>

        <div class="w-full overflow-hidden">
          <div data-editorial-swiper class="swiper w-full !overflow-hidden relative z-10">
            <div class="swiper-wrapper">
              ${this.renderCards()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    this.innerHTML = `
      <section class="col-span-12 w-full pt-10 pb-16 overflow-hidden bg-white">
        <div class="grid w-full grid-cols-1 lg:grid-cols-2 lg:grid-rows-[520px_520px] gap-y-8 lg:gap-y-0">
          
          <div class="flex flex-col w-full h-full relative z-20">
            <div class="mb-4 flex flex-wrap items-center justify-between gap-3 px-4 md:hidden relative z-30">
              <h3 class="font-geist text-lg font-normal leading-tight text-zinc-900 sm:text-xl">Óculos</h3>
              <a href="#" class="inline-flex shrink-0 rounded-full border border-zinc-200 px-3 py-[5px] text-[11px] font-medium text-zinc-600">Veja mais!</a>
            </div>
            <article class="relative flex-1 min-h-[400px] lg:min-h-0 overflow-hidden lg:rounded-tr-[60px] w-full z-10">
              <img src="./assets/images/banners/68575d20045d21102c3dd58478aa6f81ae38c4f0.jpg" class="h-full w-full object-cover object-center" />
              <div class="absolute inset-0 bg-black/30"></div>
              <div class="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-12 text-center">
                <p class="mb-4 text-sm text-white font-light">Confira nossas diversas cores de lente</p>
                <a href="#" class="inline-flex rounded-full border border-[#E7D158] px-8 py-2.5 text-[12px] text-[#E7D158] uppercase font-bold hover:bg-[#E7D158] hover:text-black transition-colors">Veja mais!</a>
              </div>
            </article>
          </div>

          <div class="-mt-24 md:mt-0 flex flex-col justify-center min-w-0 px-4 lg:pl-12 lg:pr-4 relative z-30">
            ${this.renderCarousel("Óculos")}
          </div>

          <div class="-mt-24 md:mt-0 flex flex-col justify-center order-last lg:order-none min-w-0 px-4 lg:pr-12 lg:pl-4 relative z-30">
            ${this.renderCarousel("Winter 24 Collection")}
          </div>

          <div class="flex flex-col w-full h-full relative z-20">
            <div class="mb-4 flex flex-wrap items-center justify-between gap-3 px-4 md:hidden relative z-30">
              <h3 class="min-w-0 max-w-[65%] font-geist text-base font-normal leading-tight text-zinc-900 sm:max-w-none sm:text-xl">Winter 24 Collection</h3>
              <a href="#" class="inline-flex shrink-0 rounded-full border border-zinc-200 px-3 py-[5px] text-[11px] font-medium text-zinc-600">Veja mais!</a>
            </div>
            <article class="relative flex-1 min-h-[400px] lg:min-h-0 overflow-hidden lg:rounded-bl-[60px] w-full z-10">
              <img src="./assets/images/banners/2.jpg" class="h-full w-full object-cover object-top" />
              <div class="absolute inset-0 bg-black/40"></div>
              <div class="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-16 text-center">
                <span class="mb-3 text-[10px] uppercase tracking-[0.4em] text-white/80">Collection</span>
                <h3 class="mb-6 text-5xl font-light text-white leading-none tracking-tighter">WINTER 24</h3>
                <a href="#" class="inline-flex rounded-full border border-[#E7D158] px-8 py-2.5 text-[12px] text-[#E7D158] uppercase font-bold hover:bg-[#E7D158] hover:text-black transition-colors">Veja mais!</a>
              </div>
            </article>
          </div>

        </div>
      </section>
    `;
  }
}

customElements.define("product-editorial-showcase", ProductEditorialShowcase);
