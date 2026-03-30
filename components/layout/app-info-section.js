class InfoSection extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <section class="w-full bg-[#151515] py-8 border-y border-neutral-800">
            <div class="max-w-[90rem] mx-auto px-4 md:px-8">
              
              <div class="flex overflow-x-auto xl:grid xl:grid-cols-4 gap-4 md:gap-6 pb-4 snap-x snap-mandatory hide-scrollbar">

                <div class="flex-none w-[85%] sm:w-[50%] lg:w-[35%] xl:w-auto snap-center bg-[#0a0a0a] rounded-full px-6 py-4 flex items-center gap-4">
                  <div class="text-[#e2c145] flex-shrink-0">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"></path>
                    </svg>
                  </div>
                  <div class="flex flex-col">
                    <h3 class="font-medium text-[#e2c145] text-sm md:text-base tracking-wide">Entrega rápida</h3>
                    <p class="text-xs md:text-sm text-neutral-400">Para todo o país</p>
                  </div>
                </div>

                <div class="flex-none w-[85%] sm:w-[50%] lg:w-[35%] xl:w-auto snap-center bg-[#0a0a0a] rounded-full px-6 py-4 flex items-center gap-4">
                  <div class="text-[#e2c145] flex-shrink-0">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"></path>
                    </svg>
                  </div>
                  <div class="flex flex-col">
                    <h3 class="font-medium text-[#e2c145] text-sm md:text-base tracking-wide">Parcele suas compras</h3>
                    <p class="text-xs md:text-sm text-neutral-400">Em todos os cartões de crédito</p>
                  </div>
                </div>

                <div class="flex-none w-[85%] sm:w-[50%] lg:w-[35%] xl:w-auto snap-center bg-[#0a0a0a] rounded-full px-6 py-4 flex items-center gap-4">
                  <div class="text-[#e2c145] flex-shrink-0">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
                    </svg>
                  </div>
                  <div class="flex flex-col">
                    <h3 class="font-medium text-[#e2c145] text-sm md:text-base tracking-wide">Loja segura</h3>
                    <p class="text-xs md:text-sm text-neutral-400">Compre com segurança</p>
                  </div>
                </div>

                <div class="flex-none w-[85%] sm:w-[50%] lg:w-[35%] xl:w-auto snap-center bg-[#0a0a0a] rounded-full px-6 py-4 flex items-center gap-4">
                  <div class="text-[#e2c145] flex-shrink-0">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"></path>
                    </svg>
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