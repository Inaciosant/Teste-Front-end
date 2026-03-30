class AppFilterMobile extends HTMLElement {
  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    this.root = this.querySelector("[data-filter-mobile-root]");
    this.panel = this.querySelector("[data-filter-mobile-panel]");
    this.priceSelect = this.querySelector("[data-filter-price]");
    this.sizeSelect = this.querySelector("[data-filter-size]");
    this.colorSelect = this.querySelector("[data-filter-color]");

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

      if (action === "apply-filter-mobile") {
        this.dispatchEvent(
          new CustomEvent("category-mobile-filter-apply", {
            bubbles: true,
            composed: true,
            detail: {
              priceRange: this.priceSelect?.value || "all",
              size: this.sizeSelect?.value || "",
              color: this.colorSelect?.value || ""
            }
          })
        );
        this.close();
        return;
      }

      if (action === "clear-filter-mobile") {
        if (this.priceSelect) {
          this.priceSelect.value = "all";
        }

        if (this.sizeSelect) {
          this.sizeSelect.value = "";
        }

        if (this.colorSelect) {
          this.colorSelect.value = "";
        }

        this.dispatchEvent(
          new CustomEvent("category-mobile-filter-clear", {
            bubbles: true,
            composed: true
          })
        );
        this.close();
      }
    });
  }

  open(state = {}) {
    if (this.priceSelect) {
      this.priceSelect.value = state.priceRange || "all";
    }

    if (this.sizeSelect) {
      this.sizeSelect.value = state.size || "";
    }

    if (this.colorSelect) {
      this.colorSelect.value = state.color || "";
    }

    if (!this.root || !this.panel) {
      return;
    }

    this.root.classList.remove("hidden");
    this.root.classList.add("flex");

    requestAnimationFrame(() => {
      this.root.classList.remove("opacity-0");
      this.panel.classList.remove("-translate-x-full");
      this.panel.classList.add("translate-x-0");
    });

    document.body.style.overflow = "hidden";
  }

  close() {
    if (!this.root || !this.panel) {
      return;
    }

    this.root.classList.add("opacity-0");
    this.panel.classList.remove("translate-x-0");
    this.panel.classList.add("-translate-x-full");

    setTimeout(() => {
      this.root.classList.add("hidden");
      this.root.classList.remove("flex");
    }, 250);

    document.body.style.overflow = "";
  }

  render() {
    this.innerHTML = `
      <div data-filter-mobile-root class="fixed inset-0 z-[120] hidden flex-col bg-[rgba(10,10,11,0.86)] p-3 opacity-0 transition-opacity duration-200 lg:hidden">
        <aside data-filter-mobile-panel class="h-full w-[min(86vw,340px)] -translate-x-full rounded-[18px] bg-[#dededf] p-3 shadow-2xl transition-transform duration-300">
          <div class="flex h-full flex-col rounded-[14px] bg-[#f1f1f1] p-3">
            <div class="mb-3 flex items-center justify-between rounded-[10px] bg-[#e8e8e8] px-3 py-3">
              <h3 class="font-geist text-[1.9rem] font-normal leading-none text-[#E7D158]">Filtrar</h3>
              <button type="button" data-action="close-filter-mobile" aria-label="Fechar filtros" class="inline-flex h-8 w-8 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-700">
                <span class="text-[1.35rem] leading-none">×</span>
              </button>
            </div>

            <div class="space-y-3">
              <label class="block">
                <span class="mb-2 block pl-1 font-geist text-[0.95rem] text-zinc-700">Faixa de Preço</span>
                <select data-filter-price class="h-[44px] w-full rounded-[10px] border border-transparent bg-white px-3 font-geist text-[0.95rem] text-zinc-700 outline-none transition-colors focus:border-zinc-300">
                  <option value="all">Todos</option>
                  <option value="0-100">Até R$ 100</option>
                  <option value="100-200">R$ 100 a R$ 200</option>
                  <option value="200-300">R$ 200 a R$ 300</option>
                </select>
              </label>

              <label class="block">
                <span class="mb-2 block pl-1 font-geist text-[0.95rem] text-zinc-700">Tamanho</span>
                <select data-filter-size class="h-[44px] w-full rounded-[10px] border border-transparent bg-white px-3 font-geist text-[0.95rem] text-zinc-700 outline-none transition-colors focus:border-zinc-300">
                  <option value="">Todos</option>
                  <option value="PP">PP</option>
                  <option value="P">P</option>
                  <option value="M">M</option>
                  <option value="G">G</option>
                  <option value="GG">GG</option>
                </select>
              </label>

              <label class="block">
                <span class="mb-2 block pl-1 font-geist text-[0.95rem] text-zinc-700">Cor</span>
                <select data-filter-color class="h-[44px] w-full rounded-[10px] border border-transparent bg-white px-3 font-geist text-[0.95rem] text-zinc-700 outline-none transition-colors focus:border-zinc-300">
                  <option value="">Todas</option>
                  <option value="Amarelo">Amarelo</option>
                  <option value="Areia">Areia</option>
                  <option value="Azul">Azul</option>
                  <option value="Branco">Branco</option>
                  <option value="Cinza">Cinza</option>
                </select>
              </label>
            </div>

            <div class="mt-auto rounded-[12px] bg-white p-3">
              <button type="button" data-action="apply-filter-mobile" class="mb-2 inline-flex h-[46px] w-full items-center justify-center rounded-full bg-[#E7D158] px-5 font-geist text-[1rem] text-zinc-900 transition-colors hover:bg-[#dcc74f]">
                Aplicar
              </button>
              <button type="button" data-action="clear-filter-mobile" class="inline-flex h-[44px] w-full items-center justify-center rounded-full border border-[#d7d3c4] bg-transparent px-5 font-geist text-[0.95rem] text-zinc-500 transition-colors hover:bg-[#efefef]">
                Limpar filtros
              </button>
            </div>
          </div>
        </aside>
      </div>
    `;
  }
}

customElements.define("app-filter-mobile", AppFilterMobile);
