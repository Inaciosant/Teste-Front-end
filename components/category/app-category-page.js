class AppCategoryPage extends HTMLElement {
  constructor() {
    super();
    this.products = this.buildProducts();
    this.priceBounds = { min: 50, max: 250 };
    this.desktopFiltersOpen = false;
    this.selectedSize = "PP";
    this.selectedColor = "Amarelo";
    this.minPrice = "";
    this.maxPrice = "";
    this.sortOrder = "default";
    this.visibleCount = 8;

    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
    this.handleMobileApply = this.handleMobileApply.bind(this);
    this.handleMobileClear = this.handleMobileClear.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this.handleClick);
    this.addEventListener("input", this.handleInput);
    this.addEventListener("change", this.handleChange);
    this.addEventListener("focusin", this.handleFocusIn);
    this.addEventListener("focusout", this.handleFocusOut);
    this.addEventListener("category-mobile-filter-apply", this.handleMobileApply);
    this.addEventListener("category-mobile-filter-clear", this.handleMobileClear);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("input", this.handleInput);
    this.removeEventListener("change", this.handleChange);
    this.removeEventListener("focusin", this.handleFocusIn);
    this.removeEventListener("focusout", this.handleFocusOut);
    this.removeEventListener("category-mobile-filter-apply", this.handleMobileApply);
    this.removeEventListener("category-mobile-filter-clear", this.handleMobileClear);
  }

  buildProducts() {
    const baseImage = "./assets/images/products/Product1.jpg";

    return [
      this.createProduct(1, "PP", "Amarelo", 159.92, baseImage),
      this.createProduct(2, "PP", "Amarelo", 159.92, baseImage),
      this.createProduct(3, "PP", "Amarelo", 159.92, baseImage),
      this.createProduct(4, "PP", "Amarelo", 159.92, baseImage),
      this.createProduct(5, "PP", "Amarelo", 159.92, baseImage),
      this.createProduct(6, "PP", "Amarelo", 159.92, baseImage),
      this.createProduct(7, "PP", "Amarelo", 159.92, baseImage),
      this.createProduct(8, "PP", "Amarelo", 159.92, baseImage),
      this.createProduct(9, "PP", "Amarelo", 169.92, baseImage),
      this.createProduct(10, "PP", "Amarelo", 149.92, baseImage),
      this.createProduct(11, "P", "Branco", 179.92, baseImage),
      this.createProduct(12, "M", "Azul", 139.92, baseImage),
      this.createProduct(13, "G", "Areia", 189.92, baseImage),
      this.createProduct(14, "GG", "Cinza", 199.92, baseImage),
      this.createProduct(15, "P", "Amarelo", 154.92, baseImage),
      this.createProduct(16, "M", "Amarelo", 164.92, baseImage)
    ];
  }

  createProduct(id, size, color, price, image) {
    const oldPrice = price + 40;

    return {
      id,
      title: "Blusa de moletom oversized com mangas bufantes",
      image,
      price,
      oldPrice,
      installments: `10x de R$ ${(price / 10).toFixed(2).replace(".", ",")} sem juros`,
      badge: "20% off",
      size,
      color
    };
  }

  isDesktop() {
    return window.matchMedia("(min-width: 1024px)").matches;
  }

  handleClick(event) {
    const actionTarget = event.target.closest("[data-action]");

    if (!actionTarget) {
      return;
    }

    const action = actionTarget.dataset.action;

    if (action === "toggle-filters") {
      if (this.isDesktop()) {
        this.desktopFiltersOpen = !this.desktopFiltersOpen;
        this.applyDesktopFilterState({ animate: true });
        this.refreshIcons();
        return;
      }

      const mobileFilter = this.querySelector("app-filter-mobile");
      mobileFilter?.open({
        priceRange: this.getPriceRangeKey(),
        size: this.selectedSize,
        color: this.selectedColor
      });
      return;
    }

    if (action === "select-size") {
      this.selectedSize = actionTarget.dataset.value || "";
      this.visibleCount = 8;
      this.render();
      return;
    }

    if (action === "select-color") {
      this.selectedColor = actionTarget.dataset.value || "";
      this.visibleCount = 8;
      this.render();
      return;
    }

    if (action === "clear-filters") {
      this.clearFilters();
      return;
    }

    if (action === "apply-price-filter") {
      this.visibleCount = 8;
      this.render();
      return;
    }

    if (action === "remove-size-chip") {
      this.selectedSize = "";
      this.visibleCount = 8;
      this.render();
      return;
    }

    if (action === "remove-color-chip") {
      this.selectedColor = "";
      this.visibleCount = 8;
      this.render();
      return;
    }

    if (action === "load-more") {
      this.visibleCount += 4;
      this.render();
    }
  }

  handleInput(event) {
    const target = event.target;

    if (target.matches("[data-field='price-min-range']")) {
      this.handleMinRangeInput(target);
      return;
    }

    if (target.matches("[data-field='price-max-range']")) {
      this.handleMaxRangeInput(target);
      return;
    }

    if (target.matches("[data-field='min-price']") || target.matches("[data-field='max-price']")) {
      this.syncTextInputsToSlider();
    }
  }

  handleChange(event) {
    const target = event.target;

    if (target.matches("[data-field='sort-order']")) {
      this.sortOrder = target.value;
      this.visibleCount = 8;
      this.render();
      return;
    }

    if (target.matches("[data-field='min-price']") || target.matches("[data-field='max-price']")) {
      this.syncTextInputsToSlider();
      return;
    }
  }

  handleFocusIn(event) {
    if (!event.target.matches("[data-field='sort-order']")) {
      return;
    }

    const icon = this.querySelector("[data-sort-icon]");
    icon?.classList.add("rotate-180");
  }

  handleFocusOut(event) {
    if (!event.target.matches("[data-field='sort-order']")) {
      return;
    }

    const icon = this.querySelector("[data-sort-icon]");
    icon?.classList.remove("rotate-180");
  }

  handleMobileApply(event) {
    const detail = event.detail || {};

    this.applyPriceRange(detail.priceRange || "all");
    this.selectedSize = detail.size || "";
    this.selectedColor = detail.color || "";
    this.visibleCount = 8;
    this.render();
  }

  handleMobileClear() {
    this.clearFilters();
  }

  clearFilters() {
    this.selectedSize = "";
    this.selectedColor = "";
    this.minPrice = "";
    this.maxPrice = "";
    this.visibleCount = 8;
    this.render();
  }

  onlyNumbers(value) {
    return String(value || "").replace(/\D/g, "");
  }

  clampPrice(value) {
    return Math.min(this.priceBounds.max, Math.max(this.priceBounds.min, Number(value)));
  }

  getSliderMinValue() {
    if (this.minPrice === "") {
      return this.priceBounds.min;
    }

    return this.clampPrice(this.minPrice);
  }

  getSliderMaxValue() {
    if (this.maxPrice === "") {
      return this.priceBounds.max;
    }

    return this.clampPrice(this.maxPrice);
  }

  handleMinRangeInput(target) {
    const maxRange = this.querySelector("[data-field='price-max-range']");
    const currentMax = Number(maxRange?.value || this.getSliderMaxValue());
    let nextMin = this.clampPrice(target.value);

    if (nextMin >= currentMax) {
      nextMin = currentMax - 1;
    }

    this.minPrice = String(nextMin);
    this.maxPrice = String(currentMax);

    target.value = String(nextMin);
    if (maxRange) {
      maxRange.value = String(currentMax);
    }

    this.updatePriceFields(nextMin, currentMax);
    this.updatePriceSliderUI();
  }

  handleMaxRangeInput(target) {
    const minRange = this.querySelector("[data-field='price-min-range']");
    const currentMin = Number(minRange?.value || this.getSliderMinValue());
    let nextMax = this.clampPrice(target.value);

    if (nextMax <= currentMin) {
      nextMax = currentMin + 1;
    }

    this.maxPrice = String(nextMax);
    this.minPrice = String(currentMin);

    target.value = String(nextMax);
    if (minRange) {
      minRange.value = String(currentMin);
    }

    this.updatePriceFields(currentMin, nextMax);
    this.updatePriceSliderUI();
  }

  updatePriceFields(minValue, maxValue) {
    const minInput = this.querySelector("[data-field='min-price']");
    const maxInput = this.querySelector("[data-field='max-price']");

    if (minInput) {
      minInput.value = String(minValue);
    }

    if (maxInput) {
      maxInput.value = String(maxValue);
    }
  }

  syncTextInputsToSlider() {
    const minInput = this.querySelector("[data-field='min-price']");
    const maxInput = this.querySelector("[data-field='max-price']");
    const minRange = this.querySelector("[data-field='price-min-range']");
    const maxRange = this.querySelector("[data-field='price-max-range']");

    if (!minInput || !maxInput || !minRange || !maxRange) {
      return;
    }

    const minRaw = this.onlyNumbers(minInput.value);
    const maxRaw = this.onlyNumbers(maxInput.value);

    let nextMin = minRaw ? this.clampPrice(minRaw) : this.priceBounds.min;
    let nextMax = maxRaw ? this.clampPrice(maxRaw) : this.priceBounds.max;

    if (nextMin >= nextMax) {
      if (document.activeElement === minInput) {
        nextMax = Math.min(this.priceBounds.max, nextMin + 1);
      } else {
        nextMin = Math.max(this.priceBounds.min, nextMax - 1);
      }
    }

    this.minPrice = String(nextMin);
    this.maxPrice = String(nextMax);

    minRange.value = String(nextMin);
    maxRange.value = String(nextMax);
    this.updatePriceFields(nextMin, nextMax);
    this.updatePriceSliderUI();
  }

  applyPriceRange(rangeKey) {
    if (rangeKey === "0-100") {
      this.minPrice = "0";
      this.maxPrice = "100";
      return;
    }

    if (rangeKey === "100-200") {
      this.minPrice = "100";
      this.maxPrice = "200";
      return;
    }

    if (rangeKey === "200-300") {
      this.minPrice = "200";
      this.maxPrice = "300";
      return;
    }

    this.minPrice = "";
    this.maxPrice = "";
  }

  getPriceRangeKey() {
    const min = Number(this.minPrice || "0");
    const max = Number(this.maxPrice || "0");

    if (!this.minPrice && !this.maxPrice) {
      return "all";
    }

    if (min === 0 && max === 100) {
      return "0-100";
    }

    if (min === 100 && max === 200) {
      return "100-200";
    }

    if (min === 200 && max === 300) {
      return "200-300";
    }

    return "all";
  }

  formatNumber(value) {
    return Number(value || 0).toFixed(2).replace(".", ",");
  }

  updatePriceSliderUI() {
    const minRange = this.querySelector("[data-field='price-min-range']");
    const maxRange = this.querySelector("[data-field='price-max-range']");
    const activeTrack = this.querySelector("[data-price-active-track]");
    const minLabel = this.querySelector("[data-price-label-min]");
    const maxLabel = this.querySelector("[data-price-label-max]");

    if (!minRange || !maxRange || !activeTrack) {
      return;
    }

    const min = Number(minRange.value);
    const max = Number(maxRange.value);
    const rangeSize = this.priceBounds.max - this.priceBounds.min;
    const startPercent = ((min - this.priceBounds.min) / rangeSize) * 100;
    const endPercent = ((max - this.priceBounds.min) / rangeSize) * 100;

    activeTrack.style.left = `${startPercent}%`;
    activeTrack.style.width = `${endPercent - startPercent}%`;

    if (minLabel) {
      minLabel.textContent = `R$ ${this.formatNumber(min)}`;
    }

    if (maxLabel) {
      maxLabel.textContent = `R$ ${this.formatNumber(max)}`;
    }
  }

  refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  applyDesktopFilterState(options = {}) {
    const { animate = false } = options;
    const panel = this.querySelector("[data-desktop-filters-panel]");
    const blocks = this.querySelectorAll("[data-filter-block]");
    const toggleButton = this.querySelector("[data-filter-toggle]");
    const toggleIcon =
      this.querySelector("[data-filter-toggle-icon]") || toggleButton?.querySelector("svg");

    if (!panel) {
      return;
    }

    if (toggleButton) {
      toggleButton.setAttribute("aria-expanded", String(this.desktopFiltersOpen));
    }

    if (toggleIcon) {
      toggleIcon.classList.toggle("rotate-180", this.desktopFiltersOpen);
    }

    if (this.desktopFiltersOpen) {
      panel.classList.remove("pointer-events-none", "max-h-0", "opacity-0", "mb-0");
      panel.classList.add("pointer-events-auto", "max-h-[760px]", "opacity-100", "mb-8");

      blocks.forEach((block, index) => {
        if (animate) {
          block.style.transitionDelay = `${index * 70}ms`;
        } else {
          block.style.transitionDelay = "0ms";
        }

        requestAnimationFrame(() => {
          block.classList.remove("opacity-0", "translate-y-4");
          block.classList.add("opacity-100", "translate-y-0");
        });
      });
      this.updatePriceSliderUI();
      return;
    }

    panel.classList.remove("pointer-events-auto", "max-h-[760px]", "opacity-100", "mb-8");
    panel.classList.add("pointer-events-none", "max-h-0", "opacity-0", "mb-0");

    blocks.forEach((block) => {
      block.style.transitionDelay = "0ms";
      block.classList.remove("opacity-100", "translate-y-0");
      block.classList.add("opacity-0", "translate-y-4");
    });

    this.updatePriceSliderUI();
  }

  getFilteredProducts() {
    let filtered = [...this.products];

    if (this.selectedSize) {
      filtered = filtered.filter((product) => product.size === this.selectedSize);
    }

    if (this.selectedColor) {
      filtered = filtered.filter((product) => product.color === this.selectedColor);
    }

    if (this.minPrice) {
      const min = Number(this.minPrice);
      filtered = filtered.filter((product) => product.price >= min);
    }

    if (this.maxPrice) {
      const max = Number(this.maxPrice);
      filtered = filtered.filter((product) => product.price <= max);
    }

    if (this.sortOrder === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (this.sortOrder === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }

  renderDesktopFilters() {
    const sizeOptions = ["PP", "P", "M", "G", "GG"];
    const colorOptions = [
      "Amarelo",
      "Areia",
      "Azul",
      "Branco",
      "Caqui",
      "Cinza",
      "Dourado",
      "Fucsia",
      "Laranja",
      "Lilás",
      "Marfim",
      "Marrom",
      "Marsala",
      "Mostarda",
      "Nude",
      "Off"
    ];

    return `
      <section data-desktop-filters-panel class="hidden overflow-hidden transition-all duration-500 ease-out lg:block max-h-0 opacity-0 mb-0 pointer-events-none">
        <div class="mb-5 flex items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-3">
            <span class="font-geist text-[1.05rem] text-zinc-800">Filtrar por</span>
            ${this.selectedSize ? `
              <button type="button" data-action="remove-size-chip" class="inline-flex items-center gap-2 rounded-[10px] bg-[#efefea] px-4 py-2 font-geist text-[0.95rem] text-zinc-600">
                ${this.selectedSize}
                <i data-lucide="x" class="h-3.5 w-3.5 text-zinc-400"></i>
              </button>
            ` : ""}
            ${this.selectedColor ? `
              <button type="button" data-action="remove-color-chip" class="inline-flex items-center gap-2 rounded-[10px] bg-[#efefea] px-4 py-2 font-geist text-[0.95rem] text-zinc-600">
                ${this.selectedColor}
                <i data-lucide="x" class="h-3.5 w-3.5 text-zinc-400"></i>
              </button>
            ` : ""}
          </div>

          <button type="button" data-action="clear-filters" class="inline-flex items-center gap-2 font-geist text-[1rem] text-zinc-700 underline underline-offset-2">
            Limpar tudo
            <i data-lucide="x" class="h-4 w-4 text-zinc-400"></i>
          </button>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <article data-filter-block class="rounded-[26px] bg-[#f1f1ee] p-5 transition-all duration-400 ease-out opacity-0 translate-y-4">
            <h3 class="mb-5 font-geist text-[1.08rem] font-normal text-zinc-900">Faixa de Preço</h3>
            <div class="mb-3 flex items-center justify-between font-geist text-[0.96rem] text-zinc-500">
              <span data-price-label-min>R$ ${this.formatNumber(this.getSliderMinValue())}</span>
              <span data-price-label-max>R$ ${this.formatNumber(this.getSliderMaxValue())}</span>
            </div>

            <div class="relative mb-8">
              <div class="absolute left-0 right-0 top-[8px] h-1 rounded-full bg-[#d8d3c0]"></div>
              <div data-price-active-track class="absolute top-[8px] h-1 rounded-full bg-[#E7D158]"></div>
              <input
                type="range"
                min="${this.priceBounds.min}"
                max="${this.priceBounds.max}"
                step="1"
                value="${this.getSliderMinValue()}"
                data-field="price-min-range"
                class="category-price-range"
                aria-label="Preço mínimo"
              />
              <input
                type="range"
                min="${this.priceBounds.min}"
                max="${this.priceBounds.max}"
                step="1"
                value="${this.getSliderMaxValue()}"
                data-field="price-max-range"
                class="category-price-range"
                aria-label="Preço máximo"
              />
            </div>

            <div class="mb-4 mt-3 grid grid-cols-2 gap-3">
              <input
                type="text"
                data-field="min-price"
                value="${this.minPrice}"
                placeholder="Mínimo"
                class="h-[44px] rounded-[10px] border border-[#d9d4bf] bg-transparent px-3 font-geist text-[0.95rem] text-zinc-700 outline-none transition-colors focus:border-zinc-400"
              />
              <input
                type="text"
                data-field="max-price"
                value="${this.maxPrice}"
                placeholder="Máximo"
                class="h-[44px] rounded-[10px] border border-[#d9d4bf] bg-transparent px-3 font-geist text-[0.95rem] text-zinc-700 outline-none transition-colors focus:border-zinc-400"
              />
            </div>

            <button type="button" data-action="apply-price-filter" class="h-[48px] w-full rounded-full border border-transparent bg-[#E7D158] px-4 text-center font-geist text-[1rem] text-zinc-900 outline-none transition-colors hover:bg-[#dcc74f]">
              Filtrar
            </button>
          </article>

          <article data-filter-block class="rounded-[26px] bg-[#f1f1ee] p-5 transition-all duration-400 ease-out opacity-0 translate-y-4">
            <h3 class="mb-5 font-geist text-[1.08rem] font-normal text-zinc-900">Tamanho</h3>
            <div class="flex flex-wrap gap-2">
              ${sizeOptions
                .map((option) => {
                  const isActive = this.selectedSize === option;

                  return `
                    <button
                      type="button"
                      data-action="select-size"
                      data-value="${option}"
                      class="inline-flex h-[40px] items-center justify-center rounded-[10px] border px-4 font-geist text-[0.95rem] transition-colors ${
                        isActive
                          ? "border-zinc-800 bg-white text-zinc-900"
                          : "border-[#d8d3c0] bg-transparent text-zinc-600 hover:bg-white/60"
                      }"
                    >
                      ${option}
                    </button>
                  `;
                })
                .join("")}
            </div>
          </article>

          <article data-filter-block class="rounded-[26px] bg-[#f1f1ee] p-5 transition-all duration-400 ease-out opacity-0 translate-y-4">
            <h3 class="mb-5 font-geist text-[1.08rem] font-normal text-zinc-900">Cor</h3>
            <div class="grid grid-cols-4 gap-2">
              ${colorOptions
                .map((option) => {
                  const isActive = this.selectedColor === option;

                  return `
                    <button
                      type="button"
                      data-action="select-color"
                      data-value="${option}"
                      class="inline-flex h-[40px] items-center justify-center rounded-[10px] border px-2 font-geist text-[0.92rem] transition-colors ${
                        isActive
                          ? "border-zinc-800 bg-white text-zinc-900"
                          : "border-[#d8d3c0] bg-transparent text-zinc-600 hover:bg-white/60"
                      }"
                    >
                      ${option}
                    </button>
                  `;
                })
                .join("")}
            </div>
          </article>
        </div>
      </section>
    `;
  }

  renderCards(products) {
    if (!products.length) {
      return `
        <div class="col-span-full text-center">
          <p class="font-geist text-[1.8rem] text-zinc-500">Nenhuma blusa encontrada com esse filtro.</p>
        </div>
      `;
    }

    return products
      .map(
        (product) => `
          <product-card
            compact-mobile
            href="./produto.html?id=${product.id}"
            title="${product.title}"
            image="${product.image}"
            price="${this.formatNumber(product.price)}"
            old-price="${this.formatNumber(product.oldPrice)}"
            installments="${product.installments}"
            badge="${product.badge}"
          ></product-card>
        `
      )
      .join("");
  }

  render() {
    const filteredProducts = this.getFilteredProducts();
    const visibleProducts = filteredProducts.slice(0, this.visibleCount);
    const hasMore = filteredProducts.length > visibleProducts.length;

    this.innerHTML = `
      <style>
        .category-price-range {
          -webkit-appearance: none;
          appearance: none;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 20px;
          background: transparent;
          pointer-events: none;
        }

        .category-price-range::-webkit-slider-runnable-track {
          height: 4px;
          background: transparent;
        }

        .category-price-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: auto;
          margin-top: -6px;
          height: 16px;
          width: 16px;
          border-radius: 999px;
          border: 2px solid #ffffff;
          background: #E7D158;
          box-shadow: 0 0 0 1px #d8d3c0;
          cursor: pointer;
        }

        .category-price-range::-moz-range-track {
          height: 4px;
          background: transparent;
        }

        .category-price-range::-moz-range-thumb {
          pointer-events: auto;
          height: 16px;
          width: 16px;
          border-radius: 999px;
          border: 2px solid #ffffff;
          background: #E7D158;
          box-shadow: 0 0 0 1px #d8d3c0;
          cursor: pointer;
        }
      </style>
      <section class="w-full bg-[#f3f3f3] pb-14">
        <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-20 xl:px-24">
          <div class="mb-7 flex flex-col gap-4 pt-2 lg:flex-row lg:items-center lg:justify-between">
            <h1 class="font-geist text-[2.2rem] font-normal text-zinc-900 sm:text-[2.4rem]">Blusas</h1>

            <div class="flex w-full items-center gap-3 lg:w-auto">
              <button
                type="button"
                data-filter-toggle
                data-action="toggle-filters"
                aria-expanded="${this.desktopFiltersOpen ? "true" : "false"}"
                class="inline-flex h-[44px] shrink-0 items-center gap-2 rounded-full bg-[#E7D158] px-5 font-geist text-[1rem] text-zinc-900 transition-colors hover:bg-[#dcc74f]"
              >
                Filtros
                <i data-filter-toggle-icon data-lucide="chevron-down" class="h-4 w-4 transition-transform duration-300 ${this.desktopFiltersOpen ? "rotate-180" : ""}"></i>
              </button>

              <div class="relative min-w-0 flex-1 sm:min-w-[220px] lg:flex-none">
                <select
                  data-field="sort-order"
                  class="h-[44px] w-full min-w-0 appearance-none rounded-full border border-[#d8d3c0] bg-transparent pl-4 pr-10 font-geist text-[0.94rem] text-zinc-600 outline-none transition-colors focus:border-zinc-400"
                >
                  <option value="default" ${this.sortOrder === "default" ? "selected" : ""}>Ordenação padrão</option>
                  <option value="price-asc" ${this.sortOrder === "price-asc" ? "selected" : ""}>Menor preço</option>
                  <option value="price-desc" ${this.sortOrder === "price-desc" ? "selected" : ""}>Maior preço</option>
                </select>
                <i data-sort-icon data-lucide="chevron-down" class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-transform duration-300"></i>
              </div>
            </div>
          </div>

          ${this.renderDesktopFilters()}

          <div class="grid grid-cols-2 gap-[10.33px] sm:gap-4 lg:grid-cols-4 lg:gap-6">
            ${this.renderCards(visibleProducts)}
          </div>

          ${
            hasMore
              ? `
                <div class="mt-10 flex justify-center">
                  <button
                    type="button"
                    data-action="load-more"
                    class="inline-flex h-[48px] min-w-[250px] items-center justify-center rounded-full border border-transparent bg-[#e8e8e3] px-10 font-geist text-[1rem] text-zinc-800 transition-colors hover:bg-[#ddddd6]"
                  >
                    Carregar mais produtos
                  </button>
                </div>
              `
              : ""
          }
        </div>

        <app-filter-mobile></app-filter-mobile>
      </section>
    `;

    this.applyDesktopFilterState({ animate: false });
    this.refreshIcons();
  }
}

customElements.define("app-category-page", AppCategoryPage);
