class SiteFooter2 extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        .footer2-mobile-only {
          display: block;
        }

        .footer2-desktop-only {
          display: none;
        }

        @media (min-width: 1024px) {
          .footer2-mobile-only {
            display: none;
          }

          .footer2-desktop-only {
            display: block;
          }
        }
      </style>
      <footer class="w-full overflow-x-hidden bg-[#171716] font-geist text-[16px] font-normal leading-none text-white">
        <div class="footer2-mobile-only px-4 pb-10 pt-10">
          <div class="mx-auto max-w-xl space-y-10">
            <section>
              <h3 class="mb-5 text-[20px] font-normal text-[#E7D158]">Institucional</h3>
              <ul class="space-y-4 text-[15px] text-zinc-100">
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Quem somos</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Trocas e devoluções</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Política de privacidade</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Entrega</a></li>
              </ul>
            </section>

            <section>
              <h3 class="mb-5 text-[20px] font-normal text-[#E7D158]">Minha conta</h3>
              <ul class="space-y-4 text-[15px] text-zinc-100">
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Fale conosco</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Meus dados</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Meus pedidos</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Mapa do site</a></li>
              </ul>
            </section>

            <section>
              <h3 class="mb-5 text-[20px] font-normal text-[#E7D158]">Categorias</h3>
              <ul class="space-y-4 text-[15px] text-zinc-100">
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Camisetas</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Calças</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Jaquetas</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Sapatos</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Óculos</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Winter 2024</a></li>
              </ul>
            </section>

            <section>
              <h3 class="mb-5 text-[20px] font-normal text-[#E7D158]">Fale conosco</h3>
              <ul class="space-y-4 text-[15px] leading-relaxed text-zinc-100">
                <li>Telefone: (16) 3799-9999</li>
                <li>WhatsApp: (16) 99999-9999</li>
                <li><a href="mailto:contato@lime.com.br" class="transition-colors hover:text-[#E7D158]">contato@lime.com.br</a></li>
                <li>
                  De segunda à sexta das 9h às 12h<br />
                  e das 14h às 18h
                </li>
                <li>
                  Av. Distrito Federal, 1570 -<br />
                  São José, Franca - SP, 14401-342
                </li>
              </ul>
            </section>

            <section>
              <h3 class="mb-4 text-[20px] font-normal text-[#E7D158]">Redes sociais</h3>
              <div class="flex items-center gap-5">
                <a href="#" aria-label="Instagram" class="inline-flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-70">
                  <img src="./assets/icons/Instagram.svg" alt="Instagram" class="h-5 w-5" style="filter: brightness(0) invert(1);" />
                </a>
                <a href="#" aria-label="Facebook" class="inline-flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-70">
                  <img src="./assets/icons/facebook.svg" alt="Facebook" class="h-5 w-5" style="filter: brightness(0) invert(1);" />
                </a>
                <a href="#" aria-label="TikTok" class="inline-flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-70">
                  <img src="./assets/icons/tiktok.svg" alt="TikTok" class="h-5 w-5" style="filter: brightness(0) invert(1);" />
                </a>
                <a href="#" aria-label="YouTube" class="inline-flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-70">
                  <img src="./assets/icons/youtube.svg" alt="YouTube" class="h-5 w-5" style="filter: brightness(0) invert(1);" />
                </a>
              </div>
            </section>

            <section>
              <h3 class="mb-4 text-[20px] font-normal text-[#E7D158]">Plataforma</h3>
              <div class="flex items-center gap-2 text-zinc-100">
                <img src="./assets/images/footer-icons/irroba.svg" alt="Irroba" class="h-4 w-auto invert" />
              </div>
            </section>
          </div>
        </div>

        <div class="footer2-desktop-only pt-16">
          <div class="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 pb-16 lg:grid-cols-5 lg:px-20">
            <div class="flex flex-col gap-3">
              <a href="#" class="relative flex w-full items-center justify-center rounded-full bg-[#262624] px-6 py-4 align-middle transition-colors hover:bg-[#333331]">
                <img src="./assets/icons/Instagram.svg" alt="Instagram" class="absolute left-6 h-5 w-5">
                <span class="w-full text-center">Instagram</span>
              </a>
              <a href="#" class="relative flex w-full items-center justify-center rounded-full bg-[#262624] px-6 py-4 align-middle transition-colors hover:bg-[#333331]">
                <img src="./assets/icons/facebook.svg" alt="Facebook" class="absolute left-6 h-5 w-5">
                <span class="w-full text-center">Facebook</span>
              </a>
              <a href="#" class="relative flex w-full items-center justify-center rounded-full bg-[#262624] px-6 py-4 align-middle transition-colors hover:bg-[#333331]">
                <img src="./assets/icons/tiktok.svg" alt="TikTok" class="absolute left-6 h-5 w-5">
                <span class="w-full text-center">TikTok</span>
              </a>
              <a href="#" class="relative flex w-full items-center justify-center rounded-full bg-[#262624] px-6 py-4 align-middle transition-colors hover:bg-[#333331]">
                <img src="./assets/icons/youtube.svg" alt="YouTube" class="absolute left-6 h-5 w-5">
                <span class="w-full text-center">YouTube</span>
              </a>
            </div>

            <div>
              <h3 class="mb-8 tracking-wider text-[#E7D158]">Institucional</h3>
              <ul class="flex flex-col gap-5">
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Quem somos</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Trocas e devoluções</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Política de privacidade</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Entrega</a></li>
              </ul>
            </div>

            <div>
              <h3 class="mb-8 tracking-wider text-[#E7D158]">Minha conta</h3>
              <ul class="flex flex-col gap-5">
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Fale conosco</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Meus dados</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Meus pedidos</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Mapa do site</a></li>
              </ul>
            </div>

            <div>
              <h3 class="mb-8 tracking-wider text-[#E7D158]">Categorias</h3>
              <ul class="flex flex-col gap-5">
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Camisetas</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Calças</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Jaquetas</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Sapatos</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Óculos</a></li>
                <li><a href="#" class="transition-colors hover:text-[#E7D158]">Winter 2024</a></li>
              </ul>
            </div>

            <div>
              <h3 class="mb-3 tracking-wider text-[#E7D158]">Fale conosco</h3>
              <ul class="flex flex-col gap-5">
                <li><p>Telefone: (16) 3799-9999</p></li>
                <li><p>WhatsApp: (16) 99999-9999</p></li>
                <li><p><a href="mailto:contato@lime.com.br" class="transition-colors hover:text-[#E7D158]">contato@lime.com.br</a></p></li>
                <li class="pt-2">
                  <p>De segunda à sexta das 9h às 12h</p>
                  <p class="mt-2">e das 14h às 18h</p>
                </li>
                <li class="pt-2">
                  <p>Av. Distrito Federal, 1570 -</p>
                  <p class="mt-2">São José, Franca - SP, 14401-342</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="w-full overflow-x-hidden bg-[#e9e9e9] px-6 py-8 text-[#1f1f1f] lg:px-20">
          <div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-10">
            <div class="flex min-w-0 flex-col gap-4">
              <h4 class="text-[20px] font-normal leading-none text-[#2b2b2b]">Formas de pagamento</h4>
              <div class="flex flex-wrap items-center gap-x-4 gap-y-3">
                <img src="./assets/images/footer-icons/payment/boleto.svg" alt="Boleto" class="h-4 w-auto" />
                <img src="./assets/images/footer-icons/payment/visa.svg" alt="Visa" class="h-4 w-auto" />
                <img src="./assets/images/footer-icons/payment/3.svg" alt="3" class="h-4 w-auto" />
                <img src="./assets/images/footer-icons/payment/hiper.svg" alt="Hipercard" class="h-4 w-auto" />
                <img src="./assets/images/footer-icons/payment/Elo.svg" alt="Elo" class="h-4 w-auto" />
                <img src="./assets/images/footer-icons/payment/AE.svg" alt="American Express" class="h-4 w-auto" />
                <img src="./assets/images/footer-icons/payment/Master.svg" alt="Mastercard" class="h-4 w-auto" />
              </div>
            </div>

            <div class="flex min-w-0 flex-col gap-4">
              <h4 class="text-[20px] font-normal leading-none text-[#2b2b2b]">Formas de entrega</h4>
              <div class="flex flex-wrap items-center gap-x-4 gap-y-3">
                <img src="./assets/images/footer-icons/shipping/rodonaves.svg" alt="Rodonaves" class="h-4 w-auto" />
                <img src="./assets/images/footer-icons/shipping/jadlog.svg" alt="Jadlog" class="h-4 w-auto" />
                <img src="./assets/images/footer-icons/shipping/brad.svg" alt="Braspress" class="h-4 w-auto" />
                <img src="./assets/images/footer-icons/shipping/tnt.svg" alt="TNT" class="h-4 w-auto" />
                <img src="./assets/images/footer-icons/shipping/Correios.svg" alt="Correios" class="h-4 w-auto" />
              </div>
            </div>

            <div class="flex min-w-0 flex-col gap-4">
              <h4 class="text-[20px] font-normal leading-none text-[#2b2b2b]">Certificados</h4>
              <div class="flex flex-wrap items-center gap-x-4 gap-y-3">
                <img src="./assets/images/footer-icons/certificates/Google1.svg" alt="Google Site Seguro" class="h-6 w-auto" />
                <img src="./assets/images/footer-icons/certificates/Google2.svg" alt="Google Avaliado" class="h-6 w-auto" />
              </div>
            </div>

            <div class="hidden min-w-0 flex-col gap-4 lg:flex">
              <h4 class="text-[20px] font-normal leading-none text-[#2b2b2b]">Plataforma</h4>
              <div class="flex flex-wrap items-center gap-x-4 gap-y-3">
                <img src="./assets/images/footer-icons/irroba.svg" alt="Irroba" class="h-4 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("app-footer2", SiteFooter2);
