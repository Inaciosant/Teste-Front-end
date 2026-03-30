class AppHeader extends HTMLElement {
  connectedCallback() {
    this.ensureGlobalOverlay();
    this.render();
    this.bindEvents();

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  disconnectedCallback() {
    if (this.accountOverlay) {
      this.accountOverlay.remove();
      this.accountOverlay = null;
    }
  }

  ensureGlobalOverlay() {
    this.accountOverlay = document.querySelector("[data-global-account-overlay]");

    if (this.accountOverlay) {
      return;
    }

    this.accountOverlay = document.createElement("div");
    this.accountOverlay.setAttribute("data-global-account-overlay", "");
    this.accountOverlay.className = "account-overlay";
    document.body.appendChild(this.accountOverlay);
  }

  bindEvents() {
    const searchToggle = this.querySelector("[data-search-toggle]");
		const mobileMenuToggle = this.querySelector("[data-menu-toggle]");
		const mobileSearchToggle = this.querySelector("[data-mobile-search-toggle]");
		const mobileSearchClose = this.querySelector("[data-mobile-search-close]");
		const accountToggles = this.querySelectorAll("[data-account-toggle]");
		const cartToggles = this.querySelectorAll("[data-cart-toggle]");
    const navRoot = this.querySelector("[data-nav-root]");
    const searchInput = this.querySelector("[data-search-input]");
		const mobileSearchInput = this.querySelector("[data-mobile-search-input]");

		if (!navRoot) {
      return;
    }

    const openSearch = () => {
			if (!searchInput) {
				return;
			}
      navRoot.classList.add("is-search-open");
      searchInput.focus();
    };

    const closeSearch = () => {
			if (!searchInput) {
				return;
			}
      navRoot.classList.remove("is-search-open");
      searchInput.blur();
    };

		const toggleMenu = () => {
			document.dispatchEvent(new CustomEvent("toggle-mobile-menu"));
		};

		const closeMenu = () => {
			navRoot.classList.remove("is-menu-open");
		};

		const openMobileSearch = () => {
			navRoot.classList.add("is-mobile-search-open");
			if (mobileSearchInput) {
				mobileSearchInput.focus();
			}
		};

		const closeMobileSearch = () => {
			navRoot.classList.remove("is-mobile-search-open");
			if (mobileSearchInput) {
				mobileSearchInput.blur();
			}
		};

		const toggleAccountMenu = () => {
			navRoot.classList.toggle("is-account-open");
			this.accountOverlay?.classList.toggle("is-visible", navRoot.classList.contains("is-account-open"));
		};

		const toggleCart = () => {
			document.dispatchEvent(new CustomEvent("toggle-cart"));
		};

		const closeAccountMenu = () => {
			navRoot.classList.remove("is-account-open");
			this.accountOverlay?.classList.remove("is-visible");
		};

		if (searchToggle && searchInput) {
			searchToggle.addEventListener("click", () => {
				closeMenu();
				closeMobileSearch();
				closeAccountMenu();
				if (navRoot.classList.contains("is-search-open")) {
					closeSearch();
					return;
				}

				openSearch();
			});
		}

		if (mobileMenuToggle) {
			mobileMenuToggle.addEventListener("click", (event) => {
				event.preventDefault();
				closeSearch();
				closeMobileSearch();
				closeAccountMenu();
				toggleMenu();
			});
		}

		if (mobileSearchToggle) {
			mobileSearchToggle.addEventListener("click", (event) => {
				event.preventDefault();
				closeMenu();
				closeSearch();
				closeAccountMenu();

				if (navRoot.classList.contains("is-mobile-search-open")) {
					closeMobileSearch();
					return;
				}

				openMobileSearch();
			});
		}

		if (mobileSearchClose) {
			mobileSearchClose.addEventListener("click", (event) => {
				event.preventDefault();
				closeMobileSearch();
			});
		}

		accountToggles.forEach((toggle) => {
			toggle.addEventListener("click", (event) => {
				event.preventDefault();
				closeMenu();
				closeSearch();
				closeMobileSearch();
				toggleAccountMenu();
			});
		});

		cartToggles.forEach((toggle) => {
			toggle.addEventListener("click", (event) => {
				event.preventDefault();
				closeMenu();
				closeSearch();
				closeMobileSearch();
				closeAccountMenu();
				toggleCart();
			});
		});

		if (this.accountOverlay) {
			this.accountOverlay.addEventListener("click", () => {
				closeAccountMenu();
			});
		}

    this.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeSearch();
				closeMenu();
				closeMobileSearch();
				closeAccountMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (!this.contains(event.target)) {
        closeSearch();
				closeMenu();
				closeMobileSearch();
				closeAccountMenu();
      }
    });
  }

  render() {
    this.innerHTML = `
		<header class="w-full px-4 pb-2 lg:px-9 lg:pt-4 lg:pb-0">
			<nav
				class="relative mt-2 flex w-full items-center justify-between gap-4 overflow-visible rounded-[40px] bg-[rgba(10,10,11,0.88)] px-4 py-2 pl-5 text-zinc-100 backdrop-blur-md h-[72px] lg:mt-0 lg:h-[76px] lg:px-10 lg:pl-10"
				data-nav-root
			>
				<a class="hidden lg:block shrink-0 text-[2rem] font-extralight leading-none tracking-[0.42em] text-[#d8cc5b]" href="/">LIME</a>

				<div data-mobile-left class="lg:hidden flex shrink-0 items-center gap-2 transition-all duration-200">
					<button
						type="button"
						aria-label="Abrir menu"
						data-menu-toggle
						class="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20"
					>
						<img src="./assets/icons/menu.svg" alt="Abrir menu" class="h-[14px] w-[14px]" />
					</button>
					<button
						type="button"
						aria-label="Conta"
						data-account-toggle
						class="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-0"
					>
						<img src="./assets/icons/user.svg" alt="Conta" class="w-[13px] h-[14px]" />
					</button>
				</div>

				<a data-mobile-logo class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden text-[1.55rem] font-extralight leading-none tracking-[0.3em] text-[#d8cc5b] transition-all duration-200" href="/">LIME</a>

				<div class="relative hidden lg:flex h-10 min-w-0 flex-1 items-center pl-10" data-center-zone>
					<ul
						class="flex w-full items-center gap-12 pr-12 whitespace-nowrap text-[14px] font-light font-geist transition-all duration-300"
						data-nav-links
					>
						<li><a class="transition-colors duration-200 hover:text-[#d8cc5b]" href="./categoria.html">Blusas</a></li>
						<li><a class="transition-colors duration-200 hover:text-[#d8cc5b]" href="#">Calças</a></li>
						<li><a class="transition-colors duration-200 hover:text-[#d8cc5b]" href="#">Jaquetas</a></li>
						<li><a class="transition-colors duration-200 hover:text-[#d8cc5b]" href="#">Sapatos</a></li>
						<li><a class="transition-colors duration-200 hover:text-[#d8cc5b]" href="#">Óculos</a></li>
						<li><a class="transition-colors duration-200 hover:text-[#d8cc5b]" href="#">Winter 2024</a></li>
					</ul>

					<div class="flex items-center" data-search-shell>
						<input
							class="h-10 w-full border-0 bg-transparent pl-4 pr-12 text-[15px] text-white outline-none placeholder:text-white/60"
							type="text"
							placeholder="O que você procura?"
							aria-label="Buscar produtos"
							data-search-input
						/>
						<button
							type="button"
							aria-label="Buscar"
							data-search-toggle
							class="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full transition-colors duration-200"
						>
							<img src="./assets/icons/search.svg" alt="Buscar" class="w-[15px] h-[15px]" />
						</button>
					</div>
				</div>

				<div class="hidden lg:flex shrink-0 items-center gap-2 ml-3">
					<button 
						type="button"
						aria-label="Conta"
						data-account-toggle
						class="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20"
					>
						<img src="./assets/icons/user.svg" alt="Conta" class="w-[13px] h-[14px]" />
					</button>
					<button
						type="button"
						aria-label="Sacola"
						data-cart-toggle
						class="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20"
					>
						<img src="./assets/icons/bag.svg" alt="Sacola" class="w-[11px] h-[15px]" />
					</button>
				</div>

				<div data-mobile-right class="ml-auto lg:hidden flex shrink-0 items-center gap-2 transition-all duration-200">
					<button
						type="button"
						aria-label="Buscar"
						data-mobile-search-toggle
						class="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20"
					>
						<img src="./assets/icons/search.svg" alt="Buscar" class="w-[15px] h-[15px]" />
					</button>
					<button
						type="button"
						data-cart-toggle
						aria-label="Sacola"
						class="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20"
					>
						<img src="./assets/icons/bag.svg" alt="Sacola" class="w-[11px] h-[15px]" />
					</button>
				</div>

				<div data-mobile-search-shell class="mobile-search-shell absolute left-3 right-3 top-1/2 z-[80] -translate-y-1/2 lg:hidden">
					<div class="flex h-[44px] w-full items-center rounded-full border border-[#E7D158]/70 bg-[rgba(10,10,11,0.96)] pl-4 pr-2 backdrop-blur-xl">
						<input
							type="text"
							placeholder="O que você procura?"
							aria-label="Buscar produtos"
							data-mobile-search-input
							class="h-full w-full border-0 bg-transparent text-[15px] text-white outline-none placeholder:text-zinc-400"
						/>
						<button
							type="button"
							aria-label="Fechar busca"
							data-mobile-search-close
							class="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full transition-colors duration-200"
						>
							<img src="./assets/icons/search.svg" alt="Buscar" class="w-[15px] h-[15px]" />
						</button>
					</div>
				</div>

				<div data-account-menu class="account-dropdown absolute inset-x-2 top-1/2 z-[85] -translate-y-1/2 rounded-[999px] border border-transparent bg-[rgba(10,10,11,0.96)] p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl lg:left-auto lg:right-[52px] lg:top-[calc(100%+12px)] lg:h-[200px] lg:w-[200px] lg:translate-y-0 lg:rounded-[22px] lg:border-0 lg:bg-[#efefef] lg:p-0 lg:backdrop-blur-0">
					<div class="flex gap-3 lg:mx-auto lg:h-full lg:w-[120px] lg:flex-col lg:items-center lg:justify-center lg:gap-[40px]">
						<a href="./login.html" class="flex h-[40px] flex-1 items-center justify-center rounded-full border border-transparent bg-[#171715] text-[16px] font-light font-geist text-[#E7D158] transition-colors duration-200 hover:bg-[#1d1d1a] lg:h-[40px] lg:w-[120px] lg:flex-none lg:rounded-[59px] lg:border-0 lg:bg-white lg:px-2 lg:py-2 lg:text-[15px] lg:text-zinc-900 lg:hover:bg-white">
							Entrar
						</a>
						<a href="./cadastro.html" class="flex h-[40px] flex-1 items-center justify-center rounded-full border border-transparent bg-[#171715] text-[16px] font-light font-geist text-[#E7D158] transition-colors duration-200 hover:bg-[#1d1d1a] lg:h-[40px] lg:w-[120px] lg:flex-none lg:rounded-[59px] lg:border-0 lg:bg-white lg:px-2 lg:py-2 lg:text-[15px] lg:text-zinc-900 lg:hover:bg-white">
							Cadastrar
						</a>
					</div>
				</div>
			</nav>
		</header>
		`;
  }
}

customElements.define("app-header", AppHeader);
