class InfoSection extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <section class="w-full bg-[#151515] py-8 border-y border-neutral-800">
            <div class="max-w-[90rem] mx-auto px-4 md:px-8">
              
              <div class="flex overflow-x-auto xl:grid xl:grid-cols-4 gap-4 md:gap-6 pb-4 snap-x snap-mandatory hide-scrollbar">

                <div class="flex-none w-[85%] sm:w-[50%] lg:w-[35%] xl:w-auto snap-center bg-[#0a0a0a] rounded-full px-6 py-4 flex items-center gap-4">
                  <div class="text-[#e2c145] flex-shrink-0">
                    <img src="./assets/icons/caminhao.svg" alt="Entrega rápida" class="w-8 h-8" />
                  </div>
                  <div class="flex flex-col">
                    <h3 class="font-medium text-[#e2c145] text-sm md:text-base tracking-wide">Entrega rápida</h3>
                    <p class="text-xs md:text-sm text-neutral-400">Para todo o país</p>
                  </div>
                </div>

                <div class="flex-none w-[85%] sm:w-[50%] lg:w-[35%] xl:w-auto snap-center bg-[#0a0a0a] rounded-full px-6 py-4 flex items-center gap-4">
                  <div class="text-[#e2c145] flex-shrink-0">
                    <img src="./assets/icons/card.svg" alt="Parcele suas compras" class="w-8 h-8" />
                  </div>
                  <div class="flex flex-col">
                    <h3 class="font-medium text-[#e2c145] text-sm md:text-base tracking-wide">Parcele suas compras</h3>
                    <p class="text-xs md:text-sm text-neutral-400">Em todos os cartões de crédito</p>
                  </div>
                </div>

                <div class="flex-none w-[85%] sm:w-[50%] lg:w-[35%] xl:w-auto snap-center bg-[#0a0a0a] rounded-full px-6 py-4 flex items-center gap-4">
                  <div class="text-[#e2c145] flex-shrink-0">
                    <img src="./assets/icons/lock.svg" alt="Loja segura" class="w-8 h-8" />
                  </div>
                  <div class="flex flex-col">
                    <h3 class="font-medium text-[#e2c145] text-sm md:text-base tracking-wide">Loja segura</h3>
                    <p class="text-xs md:text-sm text-neutral-400">Compre com segurança</p>
                  </div>
                </div>

                <div class="flex-none w-[85%] sm:w-[50%] lg:w-[35%] xl:w-auto snap-center bg-[#0a0a0a] rounded-full px-6 py-4 flex items-center gap-4">
                  <div class="text-[#e2c145] flex-shrink-0">
                    <img src="./assets/icons/box.svg" alt="Todos os produtos" class="w-8 h-8" />
                  </div>
                  <div class="flex flex-col">
                    <h3 class="font-medium text-[#e2c145] text-sm md:text-base tracking-wide">Todos os produtos</h3>
                    <p class="text-xs md:text-sm text-neutral-400">Estão à pronta entrega</p>
                  </div>
                </div>

              </div>
            </div>
          </section>
        `;
      }
    }

    customElements.define('info-section', InfoSection);