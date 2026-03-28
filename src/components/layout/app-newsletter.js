class AppNewsletter extends HTMLElement {
    connectedCallback() {
        this.render();
        this.bindEvents();
    }

    bindEvents() {
        const form = this.querySelector('form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]').value;
                console.log('Newsletter Submit:', { email });
                
                const btn = form.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Enviado!';
                btn.classList.replace('text-[#E7D158]', 'text-green-400');
                
                form.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.replace('text-green-400', 'text-[#E7D158]');
                }, 3000);
            });
        }
    }

    render() {
        this.innerHTML = `
            <section class="w-full px-4 lg:px-9 py-6">
                <div class="flex flex-col xl:flex-row items-center justify-between w-full bg-[#E7D158] rounded-[24px] xl:rounded-full px-6 py-6 xl:px-8 xl:py-3 gap-6 xl:gap-4">
                    
                    <div class="flex flex-col xl:flex-row items-center gap-2 xl:gap-10 text-center xl:text-left shrink-0">
                        <h2 class="text-[18px] xl:text-[20px] font-medium text-zinc-900 whitespace-nowrap">
                            Receba nossas ofertas
                        </h2>
                        <p class="text-[13px] xl:text-[14px] text-zinc-800 whitespace-nowrap">
                            Se cadastre na newsletter e fique por dentro das novidades
                        </p>
                    </div>

                    <form class="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
                        <input 
                            type="email" 
                            placeholder="Coloque seu e-mail" 
                            required 
                            class="h-[44px] w-full xl:w-[360px] rounded-full bg-white px-5 text-[14px] text-zinc-800 placeholder:text-zinc-400 outline-none border border-transparent focus:border-zinc-300" 
                        />
                        <button 
                            type="submit" 
                            class="h-[44px] w-full sm:w-auto px-10 rounded-full bg-[#151515] text-[#E7D158] text-[14px] font-medium hover:bg-black transition-colors shrink-0"
                        >
                            Enviar
                        </button>
                    </form>

                </div>
            </section>
        `;
    }
}

customElements.define("app-newsletter", AppNewsletter);