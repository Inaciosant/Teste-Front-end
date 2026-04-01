class AppCheckoutPage extends HTMLElement {
    constructor() {
        super();
        this.cartItems = Cart.getItems();
        this.cepDigits = "";
    }

    connectedCallback() {
        this.render();
        this.bindEvents();
        document.addEventListener("cart-updated", this.handleCartUpdate.bind(this));
    }

    disconnectedCallback() {
        document.removeEventListener("cart-updated", this.handleCartUpdate.bind(this));
    }

    handleCartUpdate(e) {
        this.cartItems = e.detail;
        this.render();
        this.bindEvents();
    }

    bindEvents() {
        this.querySelectorAll("[data-action='decrease-quantity']").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.currentTarget.dataset.id;
                const size = e.currentTarget.dataset.size;
                this.updateQuantity(id, size, -1);
            });
        });

        this.querySelectorAll("[data-action='increase-quantity']").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.currentTarget.dataset.id;
                const size = e.currentTarget.dataset.size;
                this.updateQuantity(id, size, 1);
            });
        });

        this.querySelectorAll("[data-action='remove-item']").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.currentTarget.dataset.id;
                const size = e.currentTarget.dataset.size;
                Cart.remove(id, size);
            });
        });

        const removeAllBtn = this.querySelector("[data-action='remove-all']");
        if (removeAllBtn) {
            removeAllBtn.addEventListener("click", () => {
                Cart.saveItems([]);
            });
        }

        const cepInput = this.querySelector("[data-cep-input]");
        if (cepInput) {
            cepInput.addEventListener("input", (e) => {
                const masked = this.maskCep(e.target.value);
                e.target.value = masked;
                this.cepDigits = masked.replace(/\D/g, "");
            });
        }

        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    updateQuantity(id, size, delta) {
        const items = Cart.getItems();
        const itemIndex = items.findIndex(i => String(i.id) === String(id) && i.size === size);
        
        if (itemIndex > -1) {
            const newQuantity = items[itemIndex].quantity + delta;
            if (newQuantity > 0) {
                items[itemIndex].quantity = newQuantity;
                Cart.saveItems(items);
            }
        }
    }

    maskCep(value) {
        let v = value.replace(/\D/g, "").slice(0, 8);
        if (v.length > 5) {
            v = v.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
        }
        return v;
    }

    formatPrice(value) {
        return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    renderCartItems() {
        if (this.cartItems.length === 0) {
            return `<div class="py-10 text-center font-geist text-zinc-500 text-[1.1rem]">Seu carrinho está vazio.</div>`;
        }

        return this.cartItems.map((item) => {
            const itemTotal = item.price * item.quantity;
            return `
                <article class="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b border-[#d8d3c0]">
                    <div class="flex items-center gap-4 w-full sm:w-auto">
                        <img src="${item.image || './assets/images/products/Product1.jpg'}" alt="${item.name}" class="w-[88px] h-[104px] object-cover rounded-[14px]">
                        <div class="flex flex-col gap-1 max-w-[220px]">
                            <h3 class="font-geist text-[0.95rem] leading-tight text-zinc-800">${item.name}</h3>
                            <p class="font-geist text-[0.85rem] text-zinc-500">Tamanho: <span class="text-zinc-800">${item.size}</span></p>
                        </div>
                    </div>
                    
                    <div class="flex flex-row sm:flex-row w-full sm:w-auto mt-4 sm:mt-0 justify-between sm:justify-end sm:gap-14 items-center">
                        <div class="flex flex-col mt-3 sm:mt-0">
                            <span class="font-geist text-[0.8rem] text-zinc-700 hidden sm:block mb-1">Preço Unitário:</span>
                            <span class="font-geist text-[0.95rem] text-zinc-500">${this.formatPrice(item.price)}</span>
                        </div>
                        
                        <div class="flex flex-col items-center gap-2">
                            <div class="flex items-center h-[36px] rounded-full bg-[#f1f1ee] px-2 text-zinc-800 font-geist">
                                <button type="button" data-action="decrease-quantity" data-id="${item.id}" data-size="${item.size}" class="w-7 h-7 flex items-center justify-center bg-white rounded-full text-[1.2rem] pb-[2px] cursor-pointer hover:bg-zinc-200 transition-colors">-</button>
                                <span class="w-[28px] text-center text-[0.9rem] font-medium">${item.quantity}</span>
                                <button type="button" data-action="increase-quantity" data-id="${item.id}" data-size="${item.size}" class="w-7 h-7 flex items-center justify-center bg-white rounded-full text-[1.2rem] pb-[1px] cursor-pointer hover:bg-zinc-200 transition-colors">+</button>
                            </div>
                            <button type="button" data-action="remove-item" data-id="${item.id}" data-size="${item.size}" class="text-[0.8rem] font-geist text-zinc-400 underline underline-offset-2 hover:text-zinc-600 transition-colors">Remover</button>
                        </div>

                        <div class="flex flex-col items-end text-right">
                           <span class="font-geist text-[0.8rem] text-zinc-700 hidden sm:block mb-1">Total</span>
                           <span class="font-geist font-medium text-[0.95rem] text-zinc-800">${this.formatPrice(itemTotal)}</span>
                        </div>
                    </div>
                </article>
            `;
        }).join("");
    }

    render() {
        const subtotal = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        
        this.innerHTML = `
            <section class="mx-auto w-full max-w-[1400px] px-6 lg:px-20 xl:px-24 pb-20">
                <h1 class="font-geist text-[2rem] font-normal text-zinc-900 mb-8 mt-4">Carrinho de compras</h1>
                
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
                    <!-- Esquerda: Lista de Itens -->
                    <div class="lg:col-span-7 xl:col-span-8 flex flex-col">
                        
                        <div class="flex flex-col mb-8 border-t border-[#d8d3c0]">
                            ${this.renderCartItems()}
                        </div>

                        ${this.cartItems.length > 0 ? `
                        <div class="flex flex-col sm:flex-row items-center justify-end gap-4 mt-2">
                            <button type="button" data-action="remove-all" class="h-[46px] px-6 rounded-full border border-zinc-200 bg-transparent text-zinc-500 font-geist text-[0.95rem] transition-colors hover:bg-zinc-100 whitespace-nowrap">
                                Remover todos os itens
                            </button>
                            <a href="./index.html" class="h-[46px] px-6 rounded-full border border-zinc-800 bg-transparent text-zinc-800 font-geist text-[0.95rem] transition-colors hover:bg-zinc-100 flex items-center justify-center whitespace-nowrap">
                                Adicionar mais itens
                            </a>
                        </div>
                        ` : ''}

                    </div>

                    <!-- Direita: Resumo do Pedido -->
                    <div class="lg:col-span-5 xl:col-span-4">
                        <div class="bg-[#f1f1ee] rounded-[24px] p-6 lg:p-8 flex flex-col">
                            <h2 class="font-geist text-[1.4rem] font-medium text-zinc-900 mb-6">Resumo do pedido</h2>
                            
                            <div class="flex flex-col gap-4 mb-6 font-geist text-[0.95rem] text-zinc-500">
                                <div class="flex justify-between items-center">
                                    <span>Sub-total</span>
                                    <span class="text-zinc-800">${this.formatPrice(subtotal)}</span>
                                </div>
                            </div>
                            
                            <div class="flex flex-col mb-6">
                                <div class="font-geist text-[1.6rem] font-medium text-zinc-900 mb-1">
                                    ${this.formatPrice(subtotal)}
                                </div>
                                <span class="font-geist text-[0.85rem] text-zinc-500">12x de ${this.formatPrice(subtotal / 12)} sem juros</span>
                            </div>

                            <a href="#" class="h-[52px] w-full bg-[#e3cd4f] hover:bg-[#d4be43] transition-colors rounded-full font-geist font-medium text-[1.05rem] text-zinc-900 flex items-center justify-center mb-8">
                                Finalizar compra
                            </a>

                            <div class="flex flex-col pt-6 border-t border-[#d8d3c0]/60">
                                <h3 class="font-geist font-medium text-[0.95rem] text-zinc-800 mb-1">Possui um cupom de desconto?</h3>
                                <p class="font-geist text-[0.85rem] text-zinc-500 mb-6">Você poderá utilizá-lo na etapa de pagamento</p>
                            </div>

                            <div class="flex flex-col pt-6 border-t border-[#d8d3c0]/60">
                                <span class="font-geist text-[0.9rem] text-zinc-600 mb-3 block">Informe o CEP para consultar o prazo de entrega:</span>
                                
                                <div class="flex gap-3 h-[48px] w-full relative mb-3">
                                    <input 
                                        type="text" 
                                        data-cep-input
                                        value="${this.cepDigits ? this.maskCep(this.cepDigits) : ''}"
                                        placeholder="Digite seu CEP" 
                                        class="h-full w-full rounded-full border border-transparent bg-white px-5 font-geist text-[0.95rem] text-zinc-700 outline-none transition-colors focus:border-zinc-300"
                                    >
                                    <button 
                                        type="button" 
                                        class="h-full px-6 shrink-0 rounded-full border border-zinc-500 bg-transparent font-geist text-[0.95rem] text-zinc-800 transition-colors hover:bg-zinc-200/50"
                                    >
                                        Buscar
                                    </button>
                                </div>
                                <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank" class="font-geist text-[0.8rem] text-zinc-600 underline underline-offset-2">Não sei meu CEP</a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define("app-checkout-page", AppCheckoutPage);
