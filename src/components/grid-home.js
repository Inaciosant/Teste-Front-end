class GridHome extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="w-full bg-[#111111] ">
        <div class="grid w-full grid-cols-1 gap-3 px-0 md:px-0 lg:grid-cols-12 lg:grid-rows-[350px_350px] lg:gap-0">
          <article class="relative min-h-[320px] overflow-hidden bg-[#171717] lg:col-span-6 lg:row-span-2">
            <img
              src="./assets/images/grid/1.jpg"
              alt="Modelo com blazer e óculos escuros"
              class="h-full w-full object-cover object-center"
            />
            <div class="absolute inset-0 bg-black/50"></div>
            <div class="absolute bottom-[18%] left-1/2 flex w-[220px] -translate-x-1/2 flex-col items-center gap-4 font-geist text-center">
              <p class="text-[14px] font-light text-white">Reimagine your style</p>
              <a href="#" class="inline-flex rounded-full border border-[#d8cc5b] px-5 py-2 text-[12px] text-[#d8cc5b] transition-colors hover:bg-[#d8cc5b] hover:text-black">
                Veja mais!
              </a>
            </div>
          </article>

          <article class="relative min-h-[240px] overflow-hidden bg-[#ececec] lg:min-h-[180px] lg:col-span-6 lg:row-span-1">
            <img
              src="./assets/images/grid/3.jpg"
              alt="Modelo loira com blazer preto"
              class="absolute right-0 top-0 h-full w-full object-cover object-[78%_top] lg:object-right"
            />
            <div class="absolute left-[22%] top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 font-geist text-center">
              <p class="text-[14px] font-light text-[#171717]">Old school drop</p>
              <a href="#" class="inline-flex rounded-full border border-[#171717] px-5 py-2 text-[12px] text-[#171717] transition-colors hover:bg-[#171717] hover:text-white">
                Shop now!
              </a>
            </div>
          </article>

          <article class="relative min-h-[180px] overflow-hidden bg-[#0f0f0f] lg:col-span-6 lg:row-span-1">
            <img
              src="./assets/images/grid/2.jpg"
              alt="Modelo com jaqueta preta e óculos vermelhos"
              class="h-full w-full object-cover object-center"
            />
            <div class="absolute right-[13%] top-1/2 flex w-[190px] -translate-y-1/2 flex-col items-center gap-5 text-center font-geist">
              <p class="text-[14px] font-light text-white">La finesse collection</p>
              <a href="#" class="inline-flex rounded-full border border-[#d8cc5b] px-5 py-2 text-[12px] text-[#d8cc5b] transition-colors hover:bg-[#d8cc5b] hover:text-black">
                Shop now!
              </a>
            </div>
          </article>

   
        </div>
      </section>
    `;
  }
}

customElements.define("grid-home", GridHome);
