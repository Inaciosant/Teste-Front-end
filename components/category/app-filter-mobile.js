class AppFilterMobile extends HTMLElement {
  constructor() {
    super();
    this.priceBounds = { min: 50, max: 250 };
    this.minPrice = "";
    this.maxPrice = "";
    this.selectedSize = "";
    this.selectedColor = "";
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  bindEvents() {
    this.root = this.querySelector("[data-filter-mobile-root]");
    this.panel = this.querySelector("[data-filter-mobile-panel]");

    this.addEventListener("click", (event) => {
      const actionTarget = event.target.closest("[data-action]");

      if (!actionTarget) {
        if (event.target === this.root) {
          this.close();
        }
        return;
      }

      const action = actionTarget.dataset.action;

      if (action === "close-filter-mobile") {
        this.close();
        return;
      }

      if (action === "select-size-mobile") {
        this.selectedSize = actionTarget.dataset.value === this.selectedSize ? "" : actionTarget.dataset.value;
        this.renderAccordions();
        return;
      }

      if (action === "select-color-mobile") {
        this.selectedColor = actionTarget.dataset.value === this.selectedColor ? "" : actionTarget.dataset.value;
        this.renderAccordions();
        return;
      }

      if (action === "apply-filter-mobile") {
        this.dispatchEvent(
          new CustomEvent("category-mobile-filter-apply", {
            bubbles: true,
            composed: true,
            detail: {
              priceRange: (!this.minPrice && !this.maxPrice) ? "all" : `${this.minPrice || this.priceBounds.min}-${this.maxPrice || this.priceBounds.max}`,
              size: this.selectedSize || "",
              color: this.selectedColor || ""
            }
          })
        );
        this.close();
        return;
      }

      if (action === "clear-filter-mobile") {
        this.minPrice = "";
        this.maxPrice = "";
        this.selectedSize = "";
        this.selectedColor = "";
        
        this.renderAccordions();

        this.dispatchEvent(
          new CustomEvent("category-mobile-filter-clear", {
            bubbles: true,
            composed: true
          })
        );
        this.close();
      }
    });

    this.addEventListener("input", (event) => {
      const target = event.target;
      if (target.matches("[data-field='m-price-min-range']")) {
        let val = Number(target.value);
        let currentMax = Number(this.maxPrice || this.priceBounds.max);
        if (val >= currentMax) val = currentMax - 1;
        this.minPrice = String(val);
        this.maxPrice = String(currentMax);
        target.value = val;
        this.updatePriceSliderUI();
      } else if (target.matches("[data-field='m-price-max-range']")) {
        let val = Number(target.value);
        let currentMin = Number(this.minPrice || this.priceBounds.min);
        if (val <= currentMin) val = currentMin + 1;
        this.maxPrice = String(val);
        this.minPrice = String(currentMin);
        target.value = val;
        this.updatePriceSliderUI();
      } else if (target.matches("[data-field='m-min-price']") || target.matches("[data-field='m-max-price']")) {
        this.syncTextInputsToSliderMobile();
      }
    });
  }

  onlyNumbers(value) {
    return String(value || "").replace(/\D/g, "");
  }

  clampPrice(value) {
    return Math.min(this.priceBounds.max, Math.max(this.priceBounds.min, Number(value)));
  }

  syncTextInputsToSliderMobile() {
    const minInput = this.querySelector("[data-field='m-min-price']");
    const maxInput = this.querySelector("[data-field='m-max-price']");

    if (!minInput || !maxInput) return;

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
    this.updatePriceSliderUI();
  }

  formatNumber(value) {
    return Number(value || 0).toFixed(2).replace(".", ",");
  }

  updatePriceSliderUI() {
    const minRange = this.querySelector("[data-field='m-price-min-range']");
    const maxRange = this.querySelector("[data-field='m-price-max-range']");
    const activeTrack = this.querySelector("[data-m-price-active-track]");
    const minLabel = this.querySelector("[data-m-price-label-min]");
    const maxLabel = this.querySelector("[data-m-price-label-max]");
    const minInput = this.querySelector("[data-field='m-min-price']");
    const maxInput = this.querySelector("[data-field='m-max-price']");

    let min = Number(this.minPrice || this.priceBounds.min);
    let max = Number(this.maxPrice || this.priceBounds.max);

    if (minRange) minRange.value = min;
    if (maxRange) maxRange.value = max;
    if (minInput && document.activeElement !== minInput) minInput.value = min;
    if (maxInput && document.activeElement !== maxInput) maxInput.value = max;

    const rangeSize = this.priceBounds.max - this.priceBounds.min;
    const startPercent = ((min - this.priceBounds.min) / rangeSize) * 100;
    const endPercent = ((max - this.priceBounds.min) / rangeSize) * 100;

    if (activeTrack) {
      activeTrack.style.left = `${startPercent}%`;
      activeTrack.style.width = `${endPercent - startPercent}%`;
    }

    if (minLabel) minLabel.textContent = `R$ ${this.formatNumber(min)}`;
    if (maxLabel) maxLabel.textContent = `R$ ${this.formatNumber(max)}`;
  }

  open(state = {}) {
    if (state.priceRange && state.priceRange !== "all") {
      const parts = state.priceRange.split("-");
      this.minPrice = parts[0];
      this.maxPrice = parts[1];
    } else {
      this.minPrice = "";
      this.maxPrice = "";
    }
    
    this.selectedSize = state.size || "";
    this.selectedColor = state.color || "";

    if (!this.root || !this.panel) return;

    this.renderAccordions();

    this.root.classList.remove("hidden");
    this.root.classList.add("flex");

    requestAnimationFrame(() => {
      this.root.classList.remove("opacity-0");
      this.panel.classList.remove("translate-x-full");
      this.panel.classList.add("translate-x-0");
      this.updatePriceSliderUI();
    });

    document.body.style.overflow = "hidden";
  }

  close() {
    if (!this.root || !this.panel) return;

    this.root.classList.add("opacity-0");
    this.panel.classList.remove("translate-x-0");
    this.panel.classList.add("translate-x-full");

    setTimeout(() => {
      this.root.classList.add("hidden");
      this.root.classList.remove("flex");
    }, 250);

    document.body.style.overflow = "";
  }

  renderAccordions() {
    const accordionsContainer = this.querySelector("[data-accordions-container]");
    if (accordionsContainer) {
      accordionsContainer.innerHTML = this.getAccordionsHTML();
      this.updatePriceSliderUI();
      if (window.lucide && typeof window.lucide.createIcons === "function") {
         window.lucide.createIcons();
      }
    }
  }

  getAccordionsHTML() {
    const sizeOptions = ["PP", "P", "M", "G", "GG"];
    const colorOptions = ["Amarelo", "Areia", "Azul", "Caqui", "Cinza", "Dourado", "Branco", "Nude", "Off"];

    return `
      <details class="group mb-4 rounded-xl bg-white shadow-sm" open>
        <summary class="flex cursor-pointer list-none items-center justify-between p-4 font-geist text-[1rem] font-medium text-zinc-900">
          Faixa de Preço
          <i data-lucide="chevron-down" class="h-4 w-4 text-zinc-600 transition-transform group-open:rotate-180"></i>
        </summary>
        <div class="px-4 pb-5">
          <div class="mb-5 flex items-center justify-between font-geist text-[0.85rem] text-zinc-500">
            <span data-m-price-label-min>R$ ${this.formatNumber(this.minPrice || this.priceBounds.min)}</span>
            <span data-m-price-label-max>R$ ${this.formatNumber(this.maxPrice || this.priceBounds.max)}</span>
          </div>

          <div class="relative mb-10">
            <div class="absolute left-0 right-0 top-[8px] h-[5px] rounded-full bg-[#f1f1ee]"></div>
            <div data-m-price-active-track class="absolute top-[8px] h-[5px] rounded-full bg-[#E7D158]"></div>
            <input
              type="range"
              min="${this.priceBounds.min}"
              max="${this.priceBounds.max}"
              step="1"
              value="${this.minPrice || this.priceBounds.min}"
              data-field="m-price-min-range"
              class="m-category-price-range"
              aria-label="Preço mínimo"
            />
            <input
              type="range"
              min="${this.priceBounds.min}"
              max="${this.priceBounds.max}"
              step="1"
              value="${this.maxPrice || this.priceBounds.max}"
              data-field="m-price-max-range"
              class="m-category-price-range"
              aria-label="Preço máximo"
            />
          </div>

          <div class="grid grid-cols-2 gap-3 mt-6">
            <input
              type="text"
              data-field="m-min-price"
              value="${this.minPrice || ""}"
              placeholder="Mínimo"
              class="h-[44px] rounded-[10px] border border-[#e1e1e1] bg-white px-3 font-geist text-[0.95rem] text-zinc-700 outline-none transition-colors focus:border-zinc-400"
            />
            <input
              type="text"
              data-field="m-max-price"
              value="${this.maxPrice || ""}"
              placeholder="Máximo"
              class="h-[44px] rounded-[10px] border border-[#e1e1e1] bg-white px-3 font-geist text-[0.95rem] text-zinc-700 outline-none transition-colors focus:border-zinc-400"
            />
          </div>
        </div>
      </details>

      <details class="group mb-4 rounded-xl bg-white shadow-sm" open>
        <summary class="flex cursor-pointer list-none items-center justify-between p-4 font-geist text-[1rem] font-medium text-zinc-900">
          Tamanho
          <i data-lucide="chevron-down" class="h-4 w-4 text-zinc-600 transition-transform group-open:rotate-180"></i>
        </summary>
        <div class="px-4 pb-5 flex flex-wrap gap-2">
            ${sizeOptions.map(opt => `
              <button
                type="button"
                data-action="select-size-mobile"
                data-value="${opt}"
                class="inline-flex h-[40px] w-[50px] items-center justify-center rounded-[8px] border font-geist text-[0.95rem] transition-colors ${
                  this.selectedSize === opt
                    ? "border-zinc-800 bg-transparent text-zinc-900"
                    : "border-[#e1e1e1] bg-white text-zinc-600"
                }"
              >
                ${opt}
              </button>
            `).join("")}
        </div>
      </details>

      <details class="group mb-4 rounded-xl bg-white shadow-sm" open>
        <summary class="flex cursor-pointer list-none items-center justify-between p-4 font-geist text-[1rem] font-medium text-zinc-900">
          Cor
          <i data-lucide="chevron-down" class="h-4 w-4 text-zinc-600 transition-transform group-open:rotate-180"></i>
        </summary>
        <div class="grid grid-cols-3 gap-2 px-4 pb-5">
            ${colorOptions.map(opt => `
              <button
                type="button"
                data-action="select-color-mobile"
                data-value="${opt}"
                class="inline-flex h-[40px] items-center justify-center rounded-[8px] border font-geist text-[0.92rem] transition-colors ${
                  this.selectedColor === opt
                    ? "border-zinc-800 bg-transparent text-zinc-900"
                    : "border-[#e1e1e1] bg-white text-zinc-600"
                }"
              >
                ${opt}
              </button>
            `).join("")}
        </div>
      </details>
    `;
  }

  render() {
    this.innerHTML = `
      <style>
        .m-category-price-range {
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
        .m-category-price-range::-webkit-slider-runnable-track {
          height: 4px;
          background: transparent;
        }
        .m-category-price-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: auto;
          margin-top: -5px;
          height: 16px;
          width: 16px;
          border-radius: 999px;
          border: 2px solid #ffffff;
          background: #E7D158;
          box-shadow: 0 0 0 1px #d8d3c0;
          cursor: pointer;
        }
        .m-category-price-range::-moz-range-track {
          height: 4px;
          background: transparent;
        }
        .m-category-price-range::-moz-range-thumb {
          pointer-events: auto;
          height: 16px;
          width: 16px;
          border-radius: 999px;
          border: 2px solid #ffffff;
          background: #E7D158;
          box-shadow: 0 0 0 1px #d8d3c0;
          cursor: pointer;
        }
        details > summary::-webkit-details-marker {
          display: none;
        }
      </style>
      <div data-filter-mobile-root class="fixed inset-0 z-[120] hidden flex-col bg-[rgba(10,10,11,0.5)] opacity-0 transition-opacity duration-200 lg:hidden">
        <aside data-filter-mobile-panel class="mr-auto h-full w-[min(90vw,360px)] -translate-x-full bg-[#f3f4f6] shadow-2xl transition-transform duration-300 flex flex-col">
          <div class="flex items-center justify-between px-5 py-5 pb-4">
            <h3 class="font-geist text-[1.4rem] font-medium text-zinc-800">Filtrar</h3>
            <button type="button" data-action="close-filter-mobile" aria-label="Fechar filtros" class="inline-flex h-8 w-8 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-700">
              <i data-lucide="x" class="h-5 w-5"></i>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-4" data-accordions-container>
            ${this.getAccordionsHTML()}
          </div>

          <div class="shrink-0 bg-white p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <button type="button" data-action="apply-filter-mobile" class="mb-3 inline-flex h-[48px] w-full items-center justify-center rounded-full bg-[#E7D158] px-5 font-geist text-[1rem] font-medium text-zinc-900 transition-colors hover:bg-[#dcc74f]">
              Aplicar
            </button>
            <button type="button" data-action="clear-filter-mobile" class="inline-flex h-[48px] w-full items-center justify-center rounded-full border border-zinc-200 bg-transparent px-5 font-geist text-[1rem] text-zinc-600 transition-colors hover:bg-zinc-50">
              Limpar filtros
            </button>
          </div>
        </aside>
      </div>
    `;
  }
}

customElements.define("app-filter-mobile", AppFilterMobile);
