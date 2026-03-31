class AppProductDetailPage extends HTMLElement {
  constructor() {
    super();

    this.products = this.getProducts();
    this.product = this.resolveProductFromUrl();
    this.selectedImageIndex = 0;
    this.selectedSize = this.product.sizes[0] || "P";
    this.selectedColor = this.product.colors[0]?.name || "Areia";
    this.descriptionExpanded = false;

    this.cepDigits = "";
    this.freightResultsOpen = false;
    this.freightDialogOpen = false;
    this.baseFreightOptions = this.getFreightOptions();

    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this.handleClick);
    this.addEventListener("input", this.handleInput);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("input", this.handleInput);
  }

  getProducts() {
    return [
      {
        id: 1,
        title: "Blusa de moletom oversized com mangas bufantes",
        ref: "00000000000",
        oldPrice: 199.9,
        price: 159.92,
        installments: "10x de R$ 15,99 sem juros",
        availability: "Pronta entrega",
        sizes: ["PP", "P", "M", "G", "GG"],
        colors: [
          { name: "Areia", image: "./assets/images/products/Product1.jpg" },
          { name: "Branco", image: "./assets/images/products/Product1.jpg" },
          { name: "Off", image: "./assets/images/products/Product2.jpg" }
        ],
        images: [
          "./assets/images/products/Product1.jpg",
          "./assets/images/products/Product2.jpg",
          "./assets/images/products/Product1.jpg",
          "./assets/images/products/Product2.jpg"
        ],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu lectus eros. Suspendisse facilisis nunc nec posuere vulputate. Nulla vel feugiat erat, sit amet laoreet velit. Cras ac orci eu tortor placerat placerat. Aliquam commodo vestibulum lacus, non euismod lorem lacinia id. Donec in quam id leo eleifend sagittis. Donec ac sagittis felis." 
      }
    ];
  }

  getFreightOptions() {
    return [
      {
        id: "sedex-1",
        title: "SEDEX - até 2 dias úteis - R$ 9,29",
        subtitle: "Para todo Brasil com transporte Aéreo."
      },
      {
        id: "sedex-2",
        title: "SEDEX - até 2 dias úteis - R$ 9,29",
        subtitle: "Para todo Brasil com transporte Aéreo."
      },
      {
        id: "sedex-3",
        title: "SEDEX - até 2 dias úteis - R$ 9,29",
        subtitle: "Para todo Brasil com transporte Aéreo."
      }
    ];
  }

  resolveProductFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id") || "1");
    return this.products.find((product) => product.id === id) || this.products[0];
  }

  formatPrice(value) {
    return Number(value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  formatInstallments(installmentsText) {
    return String(installmentsText || "");
  }

  maskCep(value) {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 8);

    if (digits.length > 5) {
      return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }

    return digits;
  }

  getCurrentImage() {
    return this.product.images[this.selectedImageIndex] || this.product.images[0];
  }

  getSecondaryImage() {
    const nextIndex = (this.selectedImageIndex + 1) % this.product.images.length;
    return this.product.images[nextIndex] || this.product.images[0];
  }

  refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  openFreightDialog() {
    const modal = this.querySelector("[data-freight-modal]");
    const panel = this.querySelector("[data-freight-modal-panel]");

    if (!modal || !panel) {
      return;
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0");
      panel.classList.remove("translate-y-4");
      panel.classList.add("translate-y-0");
    });

    document.body.style.overflow = "hidden";
    this.freightDialogOpen = true;
  }

  closeFreightDialog() {
    const modal = this.querySelector("[data-freight-modal]");
    const panel = this.querySelector("[data-freight-modal-panel]");

    if (!modal || !panel) {
      return;
    }

    modal.classList.add("opacity-0");
    panel.classList.remove("translate-y-0");
    panel.classList.add("translate-y-4");

    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }, 220);

    document.body.style.overflow = "";
    this.freightDialogOpen = false;
  }

  applyFreightPanelState(options = {}) {
    const { animate = false } = options;
    const panel = this.querySelector("[data-freight-inline-panel]");
    const items = this.querySelectorAll("[data-freight-inline-item]");

    if (!panel) {
      return;
    }

    if (this.freightResultsOpen) {
      panel.classList.remove("max-h-0", "opacity-0", "mt-0", "pointer-events-none");
      panel.classList.add("max-h-[360px]", "opacity-100", "mt-3", "pointer-events-auto");

      items.forEach((item, index) => {
        item.style.transitionDelay = animate ? `${index * 70}ms` : "0ms";
        requestAnimationFrame(() => {
          item.classList.remove("opacity-0", "translate-y-3");
          item.classList.add("opacity-100", "translate-y-0");
        });
      });
      return;
    }

    panel.classList.remove("max-h-[360px]", "opacity-100", "mt-3", "pointer-events-auto");
    panel.classList.add("max-h-0", "opacity-0", "mt-0", "pointer-events-none");

    items.forEach((item) => {
      item.style.transitionDelay = "0ms";
      item.classList.remove("opacity-100", "translate-y-0");
      item.classList.add("opacity-0", "translate-y-3");
    });
  }

  buyCurrentProduct() {
    if (!window.Cart || typeof window.Cart.add !== "function") {
      return;
    }

    window.Cart.add({
      id: `product-${this.product.id}`,
      name: this.product.title,
      price: this.product.price,
      size: this.selectedSize,
      image: this.getCurrentImage(),
      color: this.selectedColor,
      quantity: 1
    });
  }

  openWhatsapp() {
    const text = encodeURIComponent(
      `Olá! Quero comprar: ${this.product.title} | Tamanho: ${this.selectedSize} | Cor: ${this.selectedColor}`
    );
    window.open(`https://wa.me/5516999999999?text=${text}`, "_blank");
  }

  rerender() {
    this.render();
  }

  handleInput(event) {
    const input = event.target;

    if (!input.matches("[data-cep-input]")) {
      return;
    }

    const maskedValue = this.maskCep(input.value);
    input.value = maskedValue;
    this.cepDigits = maskedValue.replace(/\D/g, "");

    this.freightResultsOpen = this.cepDigits.length === 8;
    this.applyFreightPanelState({ animate: true });
  }

  handleClick(event) {
    const actionTarget = event.target.closest("[data-action]");

    if (!actionTarget) {
      const modal = this.querySelector("[data-freight-modal]");
      if (event.target === modal) {
        this.closeFreightDialog();
      }
      return;
    }

    const action = actionTarget.dataset.action;

    if (action === "gallery-prev") {
      this.selectedImageIndex =
        (this.selectedImageIndex - 1 + this.product.images.length) % this.product.images.length;
      this.rerender();
      return;
    }

    if (action === "gallery-next") {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % this.product.images.length;
      this.rerender();
      return;
    }

    if (action === "select-thumb") {
      const nextIndex = Number(actionTarget.dataset.index || "0");
      this.selectedImageIndex = nextIndex;
      this.rerender();
      return;
    }

    if (action === "select-size") {
      this.selectedSize = actionTarget.dataset.value || this.selectedSize;
      this.rerender();
      return;
    }

    if (action === "select-color") {
      this.selectedColor = actionTarget.dataset.value || this.selectedColor;
      this.rerender();
      return;
    }

    if (action === "toggle-description") {
      this.descriptionExpanded = !this.descriptionExpanded;
      this.rerender();
      return;
    }

    if (action === "calculate-freight") {
      if (this.cepDigits.length !== 8) {
        const input = this.querySelector("[data-cep-input]");
        input?.classList.add("border-red-300", "bg-red-50/60");
        setTimeout(() => input?.classList.remove("border-red-300", "bg-red-50/60"), 1200);
        return;
      }

      this.openFreightDialog();
      return;
    }

    if (action === "close-freight-dialog") {
      this.closeFreightDialog();
      return;
    }

    if (action === "toggle-freight-inline") {
      this.freightResultsOpen = false;
      this.applyFreightPanelState({ animate: false });
      return;
    }

    if (action === "buy-product") {
      this.buyCurrentProduct();
      return;
    }

    if (action === "buy-whatsapp") {
      this.openWhatsapp();
    }
  }

  renderFreightInlineOptions() {
    const secondaryOptions = this.baseFreightOptions.slice(1);

    if (!secondaryOptions.length) {
      return "";
    }

    return secondaryOptions
      .map(
        (option) => `
          <article data-freight-inline-item class="border-b border-[#e3e2dd] py-3 transition-all duration-300 ease-out opacity-0 translate-y-3 last:border-b-0">
            <p class="font-geist text-[0.92rem] text-zinc-700">${option.title}</p>
            <p class="mt-1 font-geist text-[0.86rem] text-zinc-500">${option.subtitle}</p>
          </article>
        `
      )
      .join("");
  }

  renderFreightDialogOptions() {
    return this.baseFreightOptions
      .map(
        (option) => `
          <article class="border-b border-[#e3e2dd] py-4 last:border-b-0">
            <p class="font-geist text-[0.95rem] text-zinc-700">${option.title}</p>
            <p class="mt-1 font-geist text-[0.9rem] text-zinc-500">${option.subtitle}</p>
          </article>
        `
      )
      .join("");
  }

  render() {
    const currentImage = this.getCurrentImage();
    const secondaryImage = this.getSecondaryImage();
    const descriptionPreview = this.product.description.slice(0, 210);
    const primaryFreightOption = this.baseFreightOptions[0] || null;

    this.innerHTML = `
      <section class="w-full bg-[#f3f3f3] pb-10">
        <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-20 xl:px-24">
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-4">
            <div class="lg:col-span-8">
              <div class="lg:hidden">
                <article class="relative h-[340px] overflow-hidden rounded-[26px] bg-[#d9dbd8] sm:h-[420px]">
                  <img src="${currentImage}" alt="${this.product.title}" class="h-full w-full object-cover object-top" />
                  <span class="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[0.75rem] font-geist text-zinc-700 sm:left-4 sm:top-4">20% off</span>
                </article>
              </div>

              <div class="hidden h-[443px] w-full max-w-[902px] grid-cols-2 gap-4 lg:grid">
                <article class="relative h-full overflow-hidden rounded-[26px] bg-[#d9dbd8]">
                  <img src="${currentImage}" alt="${this.product.title}" class="h-full w-full object-cover object-top" />
                  <span class="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[0.75rem] font-geist text-zinc-700">20% off</span>

                  <button type="button" data-action="gallery-prev" class="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/65 text-zinc-700 transition-colors hover:bg-white">
                    <i data-lucide="chevron-left" class="h-4 w-4"></i>
                  </button>
                  <button type="button" data-action="gallery-next" class="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/65 text-zinc-700 transition-colors hover:bg-white">
                    <i data-lucide="chevron-right" class="h-4 w-4"></i>
                  </button>
                </article>

                <article class="h-full overflow-hidden rounded-[26px] bg-[#d9dbd8]">
                  <img src="${secondaryImage}" alt="${this.product.title}" class="h-full w-full object-cover object-top" />
                </article>
              </div>

              <div class="mt-4 flex gap-3 overflow-x-auto pb-1 hide-scrollbar lg:w-full lg:max-w-[902px] lg:flex-wrap lg:overflow-visible lg:pb-0">
                ${this.product.images
                  .map(
                    (image, index) => `
                      <button type="button" data-action="select-thumb" data-index="${index}" class="h-[86px] w-[86px] shrink-0 overflow-hidden rounded-[14px] border transition-colors sm:h-[92px] sm:w-[92px] ${
                        this.selectedImageIndex === index
                          ? "border-zinc-700"
                          : "border-transparent hover:border-zinc-300"
                      }">
                        <img src="${image}" alt="Thumb ${index + 1}" class="h-full w-full object-cover object-top" />
                      </button>
                    `
                  )
                  .join("")}
              </div>

              <article class="mt-5 hidden rounded-[24px] bg-[#e9e8e3] p-6 lg:block lg:w-full lg:max-w-[902px]">
                <h3 class="font-geist text-[2rem] leading-tight text-zinc-900">Descrição do produto</h3>
                <p class="mt-2 font-geist text-[0.95rem] leading-relaxed text-zinc-600">
                  ${this.descriptionExpanded ? this.product.description : `${descriptionPreview}...`}
                </p>
                <button type="button" data-action="toggle-description" class="mt-5 inline-flex h-[40px] items-center gap-1 rounded-full bg-white px-6 font-geist text-[0.92rem] text-zinc-700">
                  ${this.descriptionExpanded ? "Ver menos" : "Ver mais"}
                  <i data-lucide="chevron-down" class="h-4 w-4 transition-transform ${
                    this.descriptionExpanded ? "rotate-180" : ""
                  }"></i>
                </button>
              </article>

            </div>

            <aside class="lg:col-span-4 lg:flex lg:justify-start h-full">
              <article class="w-full rounded-[24px] bg-[#ebeae5] p-6 lg:min-h-[781px] lg:w-[362px] lg:max-w-none">
              <div class="flex h-full flex-col">
              <h1 class="font-geist text-[20px] leading-[27px] font-normal tracking-[0em] text-zinc-900">${this.product.title}</h1>
              <p class=" font-geist text-[0.9rem] text-zinc-400">Ref.: ${this.product.ref}</p>

              <div class="mt-4 flex items-end gap-2">
                <span class="align-middle font-geist text-[14px] leading-[27px] font-normal tracking-[0em] text-zinc-400 line-through">${this.formatPrice(
                  this.product.oldPrice
                )}</span>
                <span class="align-middle font-geist text-[20px] leading-[27px] font-normal tracking-[0em] text-zinc-900">${this.formatPrice(this.product.price)}</span>
              </div>
              <p class="mt-1 align-middle font-geist text-[14px] leading-[20px] font-normal tracking-[0em] text-zinc-700">${this.formatInstallments(this.product.installments)}</p>

              <p class="mt-5 font-geist text-[0.95rem] text-zinc-500">
                Disponibilidade:
                <span class="text-zinc-800">${this.product.availability}</span>
              </p>

              <div>
                <p class="mb-2 mt-5 font-geist text-[0.95rem] text-zinc-500">Tamanho</p>
                <div class="flex flex-wrap gap-2">
                  ${this.product.sizes
                    .map(
                      (size) => `
                        <button
                          type="button"
                          data-action="select-size"
                          data-value="${size}"
                          class="inline-flex h-[42px] min-w-[42px] items-center justify-center rounded-[10px] border px-4 font-geist text-[0.95rem] transition-colors ${
                            this.selectedSize === size
                              ? "border-zinc-800  text-zinc-900"
                              : "border-[#d8d3c0] bg-transparent text-zinc-500 hover:bg-white/70"
                          }"
                        >
                          ${size}
                        </button>
                      `
                    )
                    .join("")}
                </div>
              </div>

              <div>
                <p class="mb-2 font-geist text-[0.95rem] text-zinc-500">Cor</p>
                <div class="flex gap-2">
                  ${this.product.colors
                    .map(
                      (color) => `
                        <button
                          type="button"
                          data-action="select-color"
                          data-value="${color.name}"
                          class="overflow-hidden rounded-[8px] border p-0.5 transition-colors ${
                            this.selectedColor === color.name
                              ? "border-zinc-800"
                              : "border-transparent hover:border-zinc-300"
                          }"
                        >
                          <img src="${color.image}" alt="${color.name}" class="h-[40px] w-[40px] rounded-[6px] object-cover object-top" />
                        </button>
                      `
                    )
                  .join("")}
                </div>
              </div>

              <div class="mt-5 flex flex-col gap-3">
                <button type="button" class="inline-flex h-[40px] w-full items-center justify-center gap-2 rounded-full bg-[#e6e5de] font-geist text-[0.92rem] text-zinc-600">
                  <i data-lucide="ruler" class="h-3.5 w-3.5"></i>
                  Guia de medidas
                </button>

                <button type="button" data-action="buy-product" class="inline-flex h-[54px] w-full items-center justify-center rounded-full bg-[#E7D158] font-geist text-[1.08rem] text-zinc-900 transition-colors hover:bg-[#dcca52]">
                  Comprar
                </button>

                <button type="button" data-action="buy-whatsapp" class="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full border border-[#e0ded4] bg-white font-geist text-[0.96rem] text-zinc-800 transition-colors hover:bg-zinc-50">
                  <img src="./assets/icons/zap.svg" alt="" class="h-4 w-4" />
                  Comprar no WhatsApp
                </button>
              </div>

              <div class="mt-5 border-t border-[#d8d3c7] pt-4">
                <div class="mb-2 flex items-center justify-between gap-3">
                  <span class="font-geist text-[0.88rem] text-zinc-500">Calcular prazos e preços</span>
                  <button type="button" class="inline-flex shrink-0 font-geist text-[0.84rem] text-zinc-600 underline underline-offset-2">Não sei meu CEP</button>
                </div>

                <div class="mt-1.5 flex min-w-0 items-center gap-2 rounded-full bg-[#f1f1ee] p-1">
                  <input
                    type="text"
                    data-cep-input
                    value="${this.maskCep(this.cepDigits)}"
                    placeholder="Digite seu CEP"
                    class="h-[40px] min-w-0 flex-1 rounded-full border border-transparent bg-transparent px-4 font-geist text-[0.92rem] text-zinc-700 outline-none"
                  />
                  <button
                    type="button"
                    data-action="calculate-freight"
                    class="inline-flex h-[40px] w-[102px] shrink-0 items-center justify-center rounded-full bg-[#e5e4de] px-3 font-geist text-[0.88rem] text-zinc-700 transition-colors hover:bg-[#dbdad2] sm:w-[112px] sm:text-[0.9rem]"
                  >
                    Consultar
                  </button>
                </div>

                <div data-freight-inline-panel class="overflow-hidden transition-all duration-500 ease-out max-h-0 opacity-0 mt-0 pointer-events-none">
                  <div class="mb-2 mt-1 flex items-center justify-between">
                    <div class="flex min-w-0 items-center gap-2">
                      ${
                        primaryFreightOption
                          ? `
                            <p class="max-w-[165px] truncate font-geist text-[0.92rem] text-zinc-700 sm:max-w-[190px]">
                              ${primaryFreightOption.title}
                            </p>
                          `
                          : ""
                      }
                      <button type="button" data-action="toggle-freight-inline" class="inline-flex items-center gap-1 font-geist text-[0.82rem] text-zinc-600">
                        <i data-lucide="x" class="h-3.5 w-3.5"></i>
                      </button>
                    </div>
                  </div>
                  <div class="rounded-[12px]  px-3 py-1.5">
                    ${this.renderFreightInlineOptions()}
                  </div>
                </div>
              </div>

              <div class="mt-auto pt-4">
                <p class="mb-2 font-geist justify-end   text-[0.88rem] text-zinc-500">Compartilhar</p>
                <div class="flex items-center gap-3 text-zinc-700">
                  <button type="button" class="inline-flex h-5 w-5 items-center justify-center"><img src="./assets/icons/shared/pinteres.svg" alt="Pinterest" class="h-4 w-4" /></button>
                  <button type="button" class="inline-flex h-5 w-5 items-center justify-center"><img src="./assets/icons/shared/face.svg" alt="Facebook" class="h-4 w-4" /></button>
                  <button type="button" class="inline-flex h-5 w-5 items-center justify-center"><img src="./assets/icons/shared/email.svg" alt="E-mail" class="h-4 w-4" /></button>
                  <button type="button" class="inline-flex h-5 w-5 items-center justify-center"><img src="./assets/icons/shared/telegram.svg" alt="Telegram" class="h-4 w-4" /></button>
                </div>
              </div>
              </div>
              </article>
            </aside>
          </div>

          <article class="mt-5 rounded-[24px] bg-[#e9e8e3] p-6 lg:hidden">
            <h3 class="font-geist text-[2rem] leading-tight text-zinc-900">Descrição do produto</h3>
            <p class="mt-2 font-geist text-[0.95rem] leading-relaxed text-zinc-600">
              ${this.descriptionExpanded ? this.product.description : `${descriptionPreview}...`}
            </p>
            <button type="button" data-action="toggle-description" class="mt-5 inline-flex h-[40px] items-center gap-1 rounded-full bg-white px-6 font-geist text-[0.92rem] text-zinc-700">
              ${this.descriptionExpanded ? "Ver menos" : "Ver mais"}
              <i data-lucide="chevron-down" class="h-4 w-4 transition-transform ${
                this.descriptionExpanded ? "rotate-180" : ""
              }"></i>
            </button>
          </article>
        </div>

        <div data-freight-modal class="fixed inset-0 z-[170] hidden items-center justify-center bg-[rgba(10,10,11,0.82)] px-4 opacity-0 transition-opacity duration-200">
          <div data-freight-modal-panel class="w-full max-w-[700px] translate-y-4 rounded-[18px] bg-[#efefef] p-4 shadow-2xl transition-transform duration-300">
            <div class="mb-3 flex items-center justify-between rounded-[10px] bg-[#f8f8f8] px-4 py-3">
              <h3 class="font-geist text-[2rem] text-[#E7D158]">Frete</h3>
              <button type="button" data-action="close-freight-dialog" class="inline-flex h-8 w-8 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-700">
                <i data-lucide="x" class="h-4 w-4"></i>
              </button>
            </div>

            <p class="mb-3 font-geist text-[0.95rem] text-zinc-600">Confira abaixo as opções de prazos e preços para o frete.</p>

            <div class="rounded-[12px] bg-[#f8f8f8] px-4 py-2">
              ${this.renderFreightDialogOptions()}
            </div>
          </div>
        </div>
      </section>
    `;

    this.applyFreightPanelState({ animate: false });
    this.refreshIcons();
  }
}

customElements.define("app-product-detail-page", AppProductDetailPage);
