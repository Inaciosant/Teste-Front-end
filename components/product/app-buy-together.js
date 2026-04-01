class AppBuyTogether extends HTMLElement {
  constructor() {
    super();

    this.items = this.getItems();
    this.selectedIds = new Set([this.items[0].id]);
    this.selectedSizes = Object.fromEntries(
      this.items.map((item) => [item.id, ""]),
    );
    this.mobileTrack = null;
    this.openOptionsId = null;

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMobileTrackScroll = this.handleMobileTrackScroll.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this.handleClick);
    this.addEventListener("change", this.handleChange);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("change", this.handleChange);

    if (this.mobileTrack) {
      this.mobileTrack.removeEventListener(
        "scroll",
        this.handleMobileTrackScroll,
      );
    }
  }

  getItems() {
    return [
      {
        id: 101,
        title: "Blusa de moletom oversized com mangas bufantes",
        oldPrice: 199.9,
        price: 159.92,
        installments: "10x de R$ 15,99 sem juros",
        image: "./assets/images/products/Product1.jpg",
        sizes: ["PP", "P", "M", "G"],
      },
      {
        id: 102,
        title: "Blusa de moletom oversized com mangas bufantes",
        oldPrice: 199.9,
        price: 159.92,
        installments: "10x de R$ 15,99 sem juros",
        image: "./assets/images/products/Product1.jpg",
        sizes: ["PP", "P", "M", "G"],
      },
      {
        id: 103,
        title: "Blusa de moletom oversized com mangas bufantes",
        oldPrice: 199.9,
        price: 159.92,
        installments: "10x de R$ 15,99 sem juros",
        image: "./assets/images/products/Product1.jpg",
        sizes: ["PP", "P", "M", "G"],
      },
      {
        id: 104,
        title: "Blusa de moletom oversized com mangas bufantes",
        oldPrice: 199.9,
        price: 159.92,
        installments: "10x de R$ 15,99 sem juros",
        image: "./assets/images/products/Product1.jpg",
        sizes: ["PP", "P", "M", "G"],
      },
    ];
  }

  formatPrice(value) {
    return Number(value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  addSelectedToCart() {
    if (!window.Cart || typeof window.Cart.add !== "function") {
      return;
    }

    const selected = this.items.filter((item) => this.selectedIds.has(item.id));

    if (!selected.length) {
      const feedback = this.querySelector("[data-buy-feedback]");
      if (feedback) {
        feedback.textContent =
          "Selecione pelo menos um produto para continuar.";
      }
      return;
    }

    selected.forEach((item) => {
      window.Cart.add({
        id: `combo-${item.id}`,
        name: item.title,
        price: item.price,
        size: this.selectedSizes[item.id] || item.sizes[0],
        image: item.image,
        quantity: 1,
      });
    });

    const feedback = this.querySelector("[data-buy-feedback]");
    if (feedback) {
      feedback.textContent = "Produtos adicionados ao carrinho.";
    }
  }

  handleChange(event) {
    const select = event.target;

    if (!select.matches("[data-action='size-select']")) {
      return;
    }

    const itemId = Number(select.dataset.id || "0");
    this.selectedSizes[itemId] = select.value;
  }

  handleClick(event) {
    const actionTarget = event.target.closest("[data-action]");

    if (!actionTarget) {
      return;
    }

    const action = actionTarget.dataset.action;

    if (action === "toggle-combo-item") {
      const itemId = Number(actionTarget.dataset.id || "0");
      if (this.selectedIds.has(itemId)) {
        this.selectedIds.delete(itemId);
      } else {
        this.selectedIds.add(itemId);
      }
      this.render();
      return;
    }

    if (action === "combo-prev" || action === "combo-next") {
      const track = this.querySelector("[data-combo-track]");
      if (!track) {
        return;
      }

      const delta = action === "combo-next" ? 320 : -320;
      track.scrollBy({ left: delta, behavior: "smooth" });
      return;
    }

    if (action === "open-combo-options" || action === "open-mobile-options") {
      const itemId = Number(actionTarget.dataset.id || "0");
      this.openOptionsId = itemId;
      this.render();
      return;
    }

    if (action === "close-combo-options" || action === "close-mobile-options") {
      this.openOptionsId = null;
      this.render();
      return;
    }

    if (action === "add-selected-combo") {
      this.addSelectedToCart();
    }
  }

  setupMobileTrack() {
    if (this.mobileTrack) {
      this.mobileTrack.removeEventListener(
        "scroll",
        this.handleMobileTrackScroll,
      );
    }

    this.mobileTrack = this.querySelector("[data-combo-mobile-track]");

    if (!this.mobileTrack) {
      return;
    }

    this.mobileTrack.addEventListener("scroll", this.handleMobileTrackScroll, {
      passive: true,
    });
    this.updateMobileProgress();
  }

  handleMobileTrackScroll() {
    this.updateMobileProgress();
  }

  updateMobileProgress() {
    const track =
      this.mobileTrack || this.querySelector("[data-combo-mobile-track]");
    const progress = this.querySelector("[data-combo-mobile-progress]");

    if (!track || !progress) {
      return;
    }

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const progressValue = maxScrollLeft > 0 ? (track.scrollLeft / maxScrollLeft) * 100 : 0;
    
    progress.style.width = `${progressValue}%`;
  }

  renderDesktopCards() {
    const firstSelected = this.items.find((item) =>
      this.selectedIds.has(item.id),
    );
    const leadId = firstSelected?.id;
    const configurableId =
      this.items.find((item) => item.id !== leadId)?.id || null;

    return this.items
      .map((item, index) => {
        const isSelected = this.selectedIds.has(item.id);
        const isConfigurable = item.id === configurableId;
        const isOptionsOpen = isConfigurable && this.openOptionsId === item.id;

        return `
          <article class="h-[454px] w-[302px] shrink-0 overflow-hidden rounded-[24px] bg-[#ecebe6]">
            <div class="relative overflow-hidden bg-[#d9dbd8]">
              <button
                type="button"
                data-action="toggle-combo-item"
                data-id="${item.id}"
                class="absolute left-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                  isSelected
                    ? "border-transparent bg-white text-zinc-700"
                    : "border-[#d9d7cf] bg-white/80 text-transparent"
                }"
              >
                <i data-lucide="check" class="h-3.5 w-3.5"></i>
              </button>
              <img src="${item.image}" alt="${item.title}" class="h-[250px] w-full object-cover object-top md:h-[280px] lg:h-[316px]" />

              ${
                index > 0
                  ? `
                    <div class="absolute bottom-2 left-2 right-2">
                      ${
                        isConfigurable
                          ? `
                          <div class="relative h-[286px] w-[286px] md:h-[286px] lg:h-[300px]">

  <button
    type="button"
    data-action="${isOptionsOpen ? "close-combo-options" : "open-combo-options"}"
    data-id="${item.id}"
    class="absolute bottom-0 left-0 right-0 z-20 inline-flex h-[36px] w-full items-center justify-between rounded-full border border-[#dedcd3] bg-[#f5f5f2] px-4 font-geist text-[0.82rem] text-zinc-600 transition-all duration-300 ease-out ${
      isOptionsOpen
        ? "opacity-0 pointer-events-none scale-95"
        : "opacity-100 scale-100"
    }"
  >
    Escolher opções
    <i data-lucide="chevron-down" class="h-4 w-4 text-zinc-500 transition-transform ${isOptionsOpen ? "rotate-180" : ""}"></i>
  </button>

  <div class="absolute inset-0 z-20 origin-bottom transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
    isOptionsOpen
      ? "translate-y-0 scale-y-100 opacity-100 pointer-events-auto"
      : "translate-y-full scale-y-95 opacity-0 pointer-events-none"
  }">
    <div class="h-full overflow-y-auto rounded-[18px] bg-[#f1f1ef] p-3 shadow-[0_14px_30px_rgba(0,0,0,0.22)]">
      
      <div class="mb-2 flex items-center justify-between">
        <p class="font-geist text-[0.9rem] text-zinc-500">Escolher opções</p>
        <button type="button" data-action="close-combo-options" class="inline-flex h-6 w-6 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-200">
          <i data-lucide="x" class="h-4 w-4"></i>
        </button>
      </div>

      <div class="space-y-2">
        <button type="button" class="inline-flex h-[32px] w-full items-center justify-between rounded-full bg-[#d6d5d2] px-4 font-geist text-[0.82rem] text-zinc-600">
          Cores disponíveis
          <i data-lucide="chevron-down" class="h-4 w-4"></i>
        </button>

        <button type="button" class="inline-flex h-[32px] w-full items-center justify-between rounded-full bg-[#d6d5d2] px-4 font-geist text-[0.82rem] text-zinc-600">
          Escolha seu CHARMS
          <i data-lucide="chevron-down" class="h-4 w-4"></i>
        </button>

        <button type="button" class="inline-flex h-[32px] w-full items-center justify-between rounded-full bg-[#d6d5d2] px-4 font-geist text-[0.82rem] text-zinc-600">
          Iniciais
          <i data-lucide="chevron-down" class="h-4 w-4"></i>
        </button>

        <button type="button" class="inline-flex h-[32px] w-full items-center justify-between rounded-full border border-[#c6c5c1] bg-[#ececea] px-4 font-geist text-[0.82rem] text-zinc-500">
          Inserir imagem para personalizar
          <i data-lucide="image-plus" class="h-4 w-4"></i>
        </button>

        <input
          type="text"
          placeholder="Digite aqui o que iremos gravar"
          class="h-[32px] w-full rounded-full border border-[#c6c5c1] bg-[#ececea] px-4 font-geist text-[0.82rem] text-zinc-600 outline-none placeholder:text-zinc-500"
        />

        <button type="button" class="inline-flex h-[32px] w-full items-center justify-between rounded-full bg-[#d6d5d2] px-4 font-geist text-[0.82rem] text-zinc-600">
          Modelo da imagem
          <i data-lucide="chevron-down" class="h-4 w-4"></i>
        </button>
      </div>
      
    </div>
  </div>
</div>
                          `
                          : `
                            <select
                              data-action="size-select"
                              data-id="${item.id}"
                              class="h-[36px] w-full appearance-none rounded-full border border-[#dedcd3] bg-[#f5f5f2] px-4 pr-8 font-geist text-[0.82rem] text-zinc-600"
                            >
                              <option value="" disabled ${
                                this.selectedSizes[item.id] ? "" : "selected"
                              }>
                                Tamanho
                              </option>
                              ${item.sizes
                                .map(
                                  (size) =>
                                    `<option value="${size}" ${
                                      this.selectedSizes[item.id] === size
                                        ? "selected"
                                        : ""
                                    }>${size}</option>`,
                                )
                                .join("")}
                            </select>
                          `
                      }
                    </div>
                  `
                  : ""
              }
            </div>

            <div class="px-5 pb-5 pt-5">
              <h3 class="font-geist text-[1rem] leading-snug text-zinc-600">${item.title}</h3>
              <div class="mt-2.5 flex items-center gap-3">
                <span class="font-geist text-[0.82rem] text-zinc-400 line-through">${this.formatPrice(
                  item.oldPrice,
                )}</span>
                <span class="align-middle font-geist text-[14px] leading-[20px] font-normal tracking-[0em] text-zinc-900">${this.formatPrice(item.price)}</span>
              </div>
              <p class="mt-1 font-geist text-[0.82rem] text-zinc-600">${item.installments}</p>
            </div>
          </article>
        `;
      })
      .join("");
  }

  renderMobileSummaryCard() {
    const firstSelected = this.items.find((item) =>
      this.selectedIds.has(item.id),
    );
    const item = firstSelected || this.items[0];
    const isSelected = this.selectedIds.has(item.id);

    return `
      <article class="rounded-[16px] bg-[#ecebe6] p-2.5">
        <div class="flex items-start gap-3">
          <div class="relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-[10px] bg-[#d9dbd8]">
            <button
              type="button"
              data-action="toggle-combo-item"
              data-id="${item.id}"
              class="absolute left-1.5 top-1.5 z-10 inline-flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                isSelected
                  ? "border-transparent bg-white text-zinc-700"
                  : "border-[#d9d7cf] bg-white/80 text-transparent"
              }"
            >
              <i data-lucide="check" class="h-3 w-3"></i>
            </button>
            <img src="${item.image}" alt="${item.title}" class="h-full w-full object-cover object-top" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="line-clamp-2 font-geist text-[0.78rem] leading-[1.35] text-zinc-600">${item.title}</h3>
            <div class="mt-1.5 flex items-center gap-2">
              <span class="font-geist text-[0.76rem] text-zinc-400 line-through">${this.formatPrice(
                item.oldPrice,
              )}</span>
              <span class="align-middle font-geist text-[14px] leading-[20px] font-normal tracking-[0em] text-zinc-900">${this.formatPrice(item.price)}</span>
            </div>
            <p class="mt-0.5 font-geist text-[0.76rem] text-zinc-600">${item.installments}</p>
          </div>
        </div>
      </article>
    `;
  }

  renderMobileCarouselCards() {
    const firstSelected = this.items.find((item) =>
      this.selectedIds.has(item.id),
    );
    const leadId = firstSelected?.id;
    const carouselItems = this.items.filter((item) => item.id !== leadId);
    const itemsToRender = carouselItems.length ? carouselItems : this.items;
    const configurableId = itemsToRender[0]?.id || null;

    return itemsToRender
      .map((item) => {
        const isSelected = this.selectedIds.has(item.id);
        const isConfigurable = item.id === configurableId;
        const isOptionsOpen = isConfigurable && this.openOptionsId === item.id;

        return `
          <article class="h-[430px] w-[260px] shrink-0 snap-start overflow-hidden rounded-[24px] bg-[#ecebe6]">
            <div class="relative overflow-hidden bg-[#d9dbd8]">
              <button
                type="button"
                data-action="toggle-combo-item"
                data-id="${item.id}"
                class="absolute left-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                  isSelected
                    ? "border-transparent bg-white text-zinc-700"
                    : "border-[#d9d7cf] bg-white/80 text-transparent"
                }"
              >
                <i data-lucide="check" class="h-3.5 w-3.5"></i>
              </button>

              <img src="${item.image}" alt="${item.title}" class="h-[250px] w-full object-cover object-top" />

              <div class="absolute bottom-2 left-2 right-2">
                ${
                  isConfigurable
                    ? `
                    <div class="relative h-[230px] w-full">

                      <button
                        type="button"
                        data-action="${isOptionsOpen ? "close-mobile-options" : "open-mobile-options"}"
                        data-id="${item.id}"
                        class="absolute bottom-0 left-0 right-0 z-20 inline-flex h-[36px] w-full items-center justify-between rounded-full border border-[#dedcd3] bg-[#f5f5f2] px-4 font-geist text-[0.82rem] text-zinc-600 transition-all duration-300 ease-out ${
                          isOptionsOpen
                            ? "opacity-0 pointer-events-none scale-95"
                            : "opacity-100 scale-100"
                        }"
                      >
                        Escolher opções
                        <i data-lucide="chevron-down" class="h-4 w-4 text-zinc-500 transition-transform ${isOptionsOpen ? "rotate-180" : ""}"></i>
                      </button>

                      <div class="absolute inset-0 z-20 origin-bottom transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOptionsOpen
                          ? "translate-y-0 scale-y-100 opacity-100 pointer-events-auto"
                          : "translate-y-full scale-y-95 opacity-0 pointer-events-none"
                      }">
                        <div class="h-full overflow-y-auto rounded-[18px] bg-[#f1f1ef] p-3 shadow-[0_14px_30px_rgba(0,0,0,0.22)]">
                          
                          <div class="mb-2 flex items-center justify-between">
                            <p class="font-geist text-[0.9rem] text-zinc-500">Escolher opções</p>
                            <button type="button" data-action="close-mobile-options" class="inline-flex h-6 w-6 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-200">
                              <i data-lucide="x" class="h-4 w-4"></i>
                            </button>
                          </div>

                          <div class="space-y-2">
                            <button type="button" class="inline-flex h-[32px] w-full items-center justify-between rounded-full bg-[#d6d5d2] px-4 font-geist text-[0.82rem] text-zinc-600">
                              Cores disponíveis
                              <i data-lucide="chevron-down" class="h-4 w-4"></i>
                            </button>

                            <button type="button" class="inline-flex h-[32px] w-full items-center justify-between rounded-full bg-[#d6d5d2] px-4 font-geist text-[0.82rem] text-zinc-600">
                              Escolha seu CHARMS
                              <i data-lucide="chevron-down" class="h-4 w-4"></i>
                            </button>

                            <button type="button" class="inline-flex h-[32px] w-full items-center justify-between rounded-full bg-[#d6d5d2] px-4 font-geist text-[0.82rem] text-zinc-600">
                              Iniciais
                              <i data-lucide="chevron-down" class="h-4 w-4"></i>
                            </button>

                            <button type="button" class="inline-flex h-[32px] w-full items-center justify-between rounded-full border border-[#c6c5c1] bg-[#ececea] px-4 font-geist text-[0.82rem] text-zinc-500">
                              Inserir imagem para personalizar
                              <i data-lucide="image-plus" class="h-4 w-4"></i>
                            </button>

                            <input
                              type="text"
                              placeholder="Digite aqui o que iremos gravar"
                              class="h-[32px] w-full rounded-full border border-[#c6c5c1] bg-[#ececea] px-4 font-geist text-[0.82rem] text-zinc-600 outline-none placeholder:text-zinc-500"
                            />

                            <button type="button" class="inline-flex h-[32px] w-full items-center justify-between rounded-full bg-[#d6d5d2] px-4 font-geist text-[0.82rem] text-zinc-600">
                              Modelo da imagem
                              <i data-lucide="chevron-down" class="h-4 w-4"></i>
                            </button>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                    `
                    : `
                      <select
                        data-action="size-select"
                        data-id="${item.id}"
                        class="h-[36px] w-full appearance-none rounded-full border border-[#dedcd3] bg-[#f5f5f2] px-4 pr-8 font-geist text-[0.82rem] text-zinc-600"
                      >
                        <option value="" disabled ${
                          this.selectedSizes[item.id] ? "" : "selected"
                        }>
                          Tamanho
                        </option>
                        ${item.sizes
                          .map(
                            (size) =>
                              `<option value="${size}" ${
                                this.selectedSizes[item.id] === size
                                  ? "selected"
                                  : ""
                              }>${size}</option>`,
                          )
                          .join("")}
                      </select>
                    `
                }
              </div>
            </div>

            <div class="px-5 pb-5 pt-5">
              <h3 class="font-geist text-[0.95rem] leading-snug text-zinc-600">${item.title}</h3>
              <div class="mt-2.5 flex items-center gap-2">
                <span class="font-geist text-[0.82rem] text-zinc-400 line-through">${this.formatPrice(
                  item.oldPrice,
                )}</span>
                <span class="align-middle font-geist text-[14px] leading-[20px] font-normal tracking-[0em] text-zinc-900">${this.formatPrice(item.price)}</span>
              </div>
              <p class="mt-1 font-geist text-[0.82rem] text-zinc-600">${item.installments}</p>
            </div>
          </article>
        `;
      })
      .join("");
  }

  render() {
    this.innerHTML = `
      <section class="w-full bg-[#f3f3f3] pb-12">
        <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-20 xl:px-24">
          <div class="mb-4 flex items-center justify-between gap-3">
            <h2 class="font-geist text-[2rem] text-zinc-900">Compre junto</h2>
            <div class="hidden items-center gap-2 lg:flex">
              <button type="button" data-action="combo-prev" class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d7d5cc] text-zinc-600 transition-colors hover:bg-white">
                <i data-lucide="chevron-left" class="h-4 w-4"></i>
              </button>
              <button type="button" data-action="combo-next" class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d7d5cc] text-zinc-600 transition-colors hover:bg-white">
                <i data-lucide="chevron-right" class="h-4 w-4"></i>
              </button>
            </div>
          </div>

          <div class="space-y-3 lg:hidden">
            ${this.renderMobileSummaryCard()}

            <div data-combo-mobile-track class="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 hide-scrollbar">
              ${this.renderMobileCarouselCards()}
            </div>

            <div class="relative mx-auto h-[4px] w-[80px] overflow-hidden rounded-full bg-[#f1f1ee]">
              <div data-combo-mobile-progress class="absolute left-0 top-0 h-full w-[25%] rounded-full bg-[#E7D158] transition-[width] duration-150 ease-out"></div>
            </div>
          </div>

          <div data-combo-track class="hidden gap-5 overflow-x-auto pb-2 hide-scrollbar lg:flex lg:gap-5">
            ${this.renderDesktopCards()}
          </div>

          <div class="mt-5 rounded-[16px] bg-[#ecebe6] p-4 lg:flex lg:items-center lg:justify-between lg:px-6">
            <p data-buy-feedback class="font-geist text-[0.95rem] text-zinc-500 lg:text-center">
              Selecione o produto desejado acima para adicionar à sua compra
            </p>
            <button
              type="button"
              data-action="add-selected-combo"
              class="mt-3 inline-flex h-[44px] min-w-[220px] items-center justify-center rounded-full bg-[#E7D158] px-8 font-geist text-[0.95rem] text-zinc-900 transition-colors hover:bg-[#dcca52] lg:mt-0"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </section>
    `;

    this.refreshIcons();
    this.setupMobileTrack();
  }
}

customElements.define("app-buy-together", AppBuyTogether);
