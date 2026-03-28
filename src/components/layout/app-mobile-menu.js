class AppMobileMenu extends HTMLElement {
  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    this.menuRoot = this.querySelector("[data-menu-root]");
    const closeBtn = this.querySelector("[data-menu-close]");

    // Escuta o evento disparado pelo Header
    document.addEventListener("toggle-mobile-menu", () => {
      this.openMenu();
    });

    // Fecha ao clicar no X
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.closeMenu();
      });
    }

    // Fecha se apertar ESC
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !this.menuRoot.classList.contains("hidden")) {
        this.closeMenu();
      }
    });
  }

  openMenu() {
    if (this.menuRoot) {
      this.menuRoot.classList.remove("hidden");
      this.menuRoot.classList.add("flex");
      document.body.style.overflow = "hidden"; // Trava rolagem do fundo
    }
  }

  closeMenu() {
    if (this.menuRoot) {
      this.menuRoot.classList.add("hidden");
      this.menuRoot.classList.remove("flex");
      document.body.style.overflow = ""; // Destrava rolagem
    }
  }

  render() {
    this.innerHTML = `
      <div data-menu-root class="fixed inset-0 z-[100] hidden flex-col bg-[rgba(10,10,11,0.6)] p-3 backdrop-blur-sm transition-all duration-300">
          <div class="flex h-full w-full flex-col overflow-y-auto rounded-[24px] bg-[#e6e6e6] px-4 py-4 shadow-2xl">
              
              <div class="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm">
                  <span class="text-[1.25rem] font-medium text-[#d8cc5b]">Menu</span>
                  <button type="button" aria-label="Fechar menu" data-menu-close class="text-zinc-400 transition-colors hover:text-zinc-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
              </div>

              <div class="mt-4 flex gap-3 rounded-xl bg-white p-3 shadow-sm">
                  <a href="#" class="flex h-[42px] flex-1 items-center justify-center rounded-full bg-[#f4f4f4] text-[13px] font-medium text-zinc-800 transition-colors hover:bg-[#e9e9e9]">
                      Entrar
                  </a>
                  <a href="#" class="flex h-[42px] flex-1 items-center justify-center rounded-full bg-[#f4f4f4] text-[13px] font-medium text-zinc-800 transition-colors hover:bg-[#e9e9e9]">
                      Cadastrar
                  </a>
              </div>

              <ul class="mt-6 flex flex-col px-2 text-[14px] font-geist text-zinc-800">
                  <li>
                      <a href="/categorias" class="flex items-center justify-between py-3.5 transition-colors hover:text-[#d8cc5b]">
                          Blusas
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </a>
                  </li>
                  <li><a href="#" class="block py-3.5 transition-colors hover:text-[#d8cc5b]">Calças</a></li>
                  <li><a href="#" class="block py-3.5 transition-colors hover:text-[#d8cc5b]">Jaquetas</a></li>
                  <li><a href="#" class="block py-3.5 transition-colors hover:text-[#d8cc5b]">Sapatos</a></li>
                  <li><a href="#" class="block py-3.5 transition-colors hover:text-[#d8cc5b]">Óculos</a></li>
                  <li><a href="#" class="block py-3.5 transition-colors hover:text-[#d8cc5b]">Winter 2024</a></li>
              </ul>
          </div>
      </div>
    `;
  }
}

customElements.define("app-mobile-menu", AppMobileMenu);