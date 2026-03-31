class AppCart extends HTMLElement {
    connectedCallback() {
        this.render();
        this.bindEvents();
        this.updateCartUI(); // Renderiza os itens iniciais
    }

    bindEvents() {
        this.cartOverlay = this.querySelector("[data-cart-overlay]");
        this.cartPanel = this.querySelector("[data-cart-panel]");
        const closeBtn = this.querySelector("[data-cart-close]");
        const continueBtn = this.querySelector("[data-continue-shopping]");
        this.itemsContainer = this.querySelector("[data-cart-items]");
        this.subtotalElement = this.querySelector("[data-cart-subtotal]");

        // Abrir/Fechar pelo evento global
        document.addEventListener("toggle-cart", (e) => {
            if (e.detail?.open) {
                this.openCart();
            } else {
                this.toggleCart();
            }
        });

        // Atualizar interface quando o Cart.js avisar
        document.addEventListener("cart-updated", () => {
            this.updateCartUI();
        });

        // Fechar carrinho
        closeBtn?.addEventListener("click", () => this.closeCart());
        continueBtn?.addEventListener("click", () => this.closeCart());
        
        // Fechar clicando fora do painel
        this.cartOverlay?.addEventListener("click", (e) => {
            if (e.target === this.cartOverlay) {
                this.closeCart();
            }
        });

        // Delegação de eventos para as lixeiras
        this.itemsContainer?.addEventListener("click", (e) => {
            const removeBtn = e.target.closest("[data-remove-item]");
            if (removeBtn) {
                const id = removeBtn.getAttribute("data-id");
                const size = removeBtn.getAttribute("data-size");
                Cart.remove(id, size);
            }
        });
    }

    openCart() {
        this.cartOverlay.classList.remove("hidden");
        this.cartOverlay.classList.add("flex");
        setTimeout(() => {
            this.cartOverlay.classList.remove("opacity-0");
            this.cartPanel.classList.remove("translate-x-full");
            this.cartPanel.classList.add("translate-x-0");
        }, 10);
        document.body.style.overflow = "hidden";
    }

    closeCart() {
        this.cartOverlay.classList.add("opacity-0");
        this.cartPanel.classList.remove("translate-x-0");
        this.cartPanel.classList.add("translate-x-full");
        
        setTimeout(() => {
            this.cartOverlay.classList.add("hidden");
            this.cartOverlay.classList.remove("flex");
        }, 300); // Tempo da transição
        document.body.style.overflow = "";
    }

    toggleCart() {
        if (this.cartOverlay.classList.contains("hidden")) {
            this.openCart();
        } else {
            this.closeCart();
        }
    }

    updateCartUI() {
        const items = Cart.getItems();
        
        if (!this.itemsContainer || !this.subtotalElement) return;

        if (items.length === 0) {
            this.itemsContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-zinc-400 gap-4">
                    <p class="text-[14px]">Seu carrinho está vazio.</p>
                </div>
            `;
        } else {
            this.itemsContainer.innerHTML = items.map(item => `
                <div class="flex gap-3 items-start mb-5 last:mb-0 px-1">
                    <div class="w-[84px] h-[98px] shrink-0 bg-[#d9d9d9] rounded-lg overflow-hidden">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1 flex flex-col pt-0.5">
                        <div class="flex justify-between items-start gap-2">
                            <h3 class="text-[12px] text-zinc-600 leading-snug pr-2 font-light">${item.name}</h3>
                            <button type="button" data-remove-item data-id="${item.id}" data-size="${item.size}" class="text-zinc-300 hover:text-zinc-500 transition-colors shrink-0 mt-0.5">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="mt-2 text-[13px] font-bold text-zinc-900">${Cart.formatPrice(item.price)}</div>
                        <div class="mt-1 text-[12px] text-zinc-500 font-light flex items-center justify-between">
                            <span>Tamanho: ${item.size}</span>
                            ${item.quantity > 1 ? `<span class="bg-zinc-100 px-2 py-0.5 rounded-full text-[11px] font-medium text-zinc-600">Qtd: ${item.quantity}</span>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');
        }

        this.subtotalElement.textContent = Cart.formatPrice(Cart.getTotal());
    }

    render() {
        this.innerHTML = `
            <div data-cart-overlay class="fixed inset-0 z-[150] hidden flex-col bg-[rgba(10,10,11,0.6)] p-3 backdrop-blur-sm transition-opacity duration-300 opacity-0 lg:p-4">
                
                <div data-cart-panel class="flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-[#e6e6e6] px-4 py-4 shadow-2xl transition-transform duration-300 translate-x-full lg:ml-auto lg:w-[420px]">
                    
                    <div class="flex items-center justify-between rounded-[16px] bg-white px-5 py-4 shadow-sm shrink-0">
                        <span class="text-[1.25rem] font-medium text-[#d8cc5b]">Meu carrinho</span>
                        <button type="button" aria-label="Fechar carrinho" data-cart-close class="text-zinc-400 transition-colors hover:text-zinc-700">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <div class="flex-1 overflow-y-auto py-6 mt-1" data-cart-items>
                        </div>

                    <div class="mt-auto shrink-0 rounded-[16px] bg-white p-5 shadow-sm">
                        <div class="mb-5 flex items-end justify-between px-1">
                            <span class="text-[14px] text-zinc-500 font-light">Sub-total</span>
                            <span class="text-[16px] font-semibold text-zinc-900" data-cart-subtotal>R$ 0,00</span>
                        </div>
                        
                        <div class="flex flex-col gap-3">
                            <a href="./checkout.html" class="flex h-[48px] w-full items-center justify-center rounded-full bg-[#E7D158] text-[14px] font-medium text-zinc-900 transition-colors hover:bg-[#d5c04b]">
                                Finalizar compra
                            </a>
                            <button type="button" data-continue-shopping class="flex h-[48px] w-full items-center justify-center rounded-full border border-zinc-200 bg-white text-[14px] font-medium text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-800">
                                Continuar comprando
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        `;
    }
}

customElements.define("app-cart", AppCart);