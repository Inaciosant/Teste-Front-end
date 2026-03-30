class ProductShowcase extends HTMLElement {
  constructor() {
    super();
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
    this.initCarousel();
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  disconnectedCallback() {
    this.swiper?.destroy(true, true);
  }

  initCarousel() {
    const container = this.querySelector("[data-showcase-swiper]");
    const prevButton = this.querySelector("[data-showcase-prev]");
    const nextButton = this.querySelector("[data-showcase-next]");

    if (!container || !window.Swiper) {
      return;
    }

    this.swiper = new window.Swiper(container, {
      slidesPerView: "auto",
      spaceBetween: 24,
      navigation: {
        prevEl: prevButton,
        nextEl: nextButton
      },
      breakpoints: {
        1024: {
          allowTouchMove: false
        }
      }
    });
  }

  renderCards() {
    return this.products
      .map(
        (product) => `
          <div data-showcase-item class="swiper-slide showcase-card-item min-w-0 shrink-0">
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

          <div data-showcase-swiper class="swiper w-full overflow-hidden pb-2">
            <div class="swiper-wrapper">
              ${this.renderCards()}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("product-showcase", ProductShowcase);
