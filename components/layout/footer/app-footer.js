class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.mobileQuery = window.matchMedia("(max-width: 1023px)");
    this.handleBreakpointChange = this.handleBreakpointChange.bind(this);
  }

  connectedCallback() {
    this.render();
    this.setupAccordion();

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }

    this.mobileQuery.addEventListener("change", this.handleBreakpointChange);
  }

  disconnectedCallback() {
    this.mobileQuery.removeEventListener("change", this.handleBreakpointChange);
  }

  handleBreakpointChange() {
    this.setupAccordion();
  }

  toggleSection(trigger) {
    const panel = trigger.nextElementSibling;
    const indicator = trigger.querySelector("[data-footer-accordion-indicator]");

    if (!panel || panel.tagName !== "UL") {
      return;
    }

    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!isOpen));
    panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
    if (indicator) {
      indicator.classList.toggle("rotate-180", !isOpen);
    }
  }

  setupAccordion() {
    const triggers = this.querySelectorAll("[data-footer-accordion-trigger]");
    const isMobile = this.mobileQuery.matches;

    triggers.forEach((trigger) => {
      const panel = trigger.nextElementSibling;

      if (!panel || panel.tagName !== "UL") {
        return;
      }

      if (isMobile) {
        trigger.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = "0px";
      } else {
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = "none";
      }

      const indicator = trigger.querySelector("[data-footer-accordion-indicator]");
      if (indicator) {
        indicator.classList.toggle("rotate-180", !isMobile);
      }
    });

    if (this.accordionBound) {
      return;
    }

    this.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-footer-accordion-trigger]");

      if (!trigger || !this.mobileQuery.matches) {
        return;
      }

      this.toggleSection(trigger);
    });

    this.addEventListener("keydown", (event) => {
      const trigger = event.target.closest("[data-footer-accordion-trigger]");

      if (!trigger || !this.mobileQuery.matches) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.toggleSection(trigger);
      }
    });

    this.accordionBound = true;
  }

  render() {
    this.innerHTML = `
    <footer class="bg-[#171716] text-white pt-16 font-geist font-normal text-[16px] leading-none overflow-x-hidden">
      <div class="max-w-7xl mx-auto grid grid-cols-1 gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-5 lg:px-20">
        
        <div class="flex flex-col gap-3">
          <a href="#" class="relative flex items-center justify-center bg-[#262624] hover:bg-[#333331] transition-colors rounded-full px-6 py-4 w-full align-middle">
            <img src="./assets/icons/Instagram.svg" alt="Instagram" class="w-5 h-5 absolute left-6">
            <span class="w-full text-center">Instagram</span>
          </a>
          <a href="#" class="relative flex items-center justify-center bg-[#262624] hover:bg-[#333331] transition-colors rounded-full px-6 py-4 w-full align-middle">
            <img src="./assets/icons/facebook.svg" alt="Facebook" class="w-5 h-5 absolute left-6">
            <span class="w-full text-center">Facebook</span>
          </a>
          <a href="#" class="relative flex items-center justify-center bg-[#262624] hover:bg-[#333331] transition-colors rounded-full px-6 py-4 w-full align-middle">
            <img src="./assets/icons/tiktok.svg" alt="TikTok" class="w-5 h-5 absolute left-6">
            <span class="w-full text-center">TikTok</span>
          </a>
          <a href="#" class="relative flex items-center justify-center bg-[#262624] hover:bg-[#333331] transition-colors rounded-full px-6 py-4 w-full align-middle">
            <img src="./assets/icons/youtube.svg" alt="YouTube" class="w-5 h-5 absolute left-6">
            <span class="w-full text-center">YouTube</span>
          </a>
        </div>

        <div>
          <h3
            class="text-[#E7D158] font-regular mb-4 lg:mb-8 tracking-wider flex items-center justify-between cursor-pointer lg:cursor-default"
            data-footer-accordion-trigger
            role="button"
            tabindex="0"
            aria-expanded="true"
          >
            <span>Institucional</span>
            <i data-lucide="chevron-down" class="lg:hidden h-4 w-4 transition-transform duration-200" data-footer-accordion-indicator></i>
          </h3>
          <ul class="flex flex-col gap-5 overflow-hidden transition-all duration-300 lg:overflow-visible">
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Quem somos</a></li>
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Trocas e devoluções</a></li>
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Política de privacidade</a></li>
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Entrega</a></li>
          </ul>
        </div>

        <div>
          <h3
            class="text-[#E7D158] font-regular mb-4 lg:mb-8 tracking-wider flex items-center justify-between cursor-pointer lg:cursor-default"
            data-footer-accordion-trigger
            role="button"
            tabindex="0"
            aria-expanded="true"
          >
            <span>Minha conta</span>
            <i data-lucide="chevron-down" class="lg:hidden h-4 w-4 transition-transform duration-200" data-footer-accordion-indicator></i>
          </h3>
          <ul class="flex flex-col gap-5 overflow-hidden transition-all duration-300 lg:overflow-visible">
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Fale conosco</a></li>
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Meus dados</a></li>
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Meus pedidos</a></li>
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Mapa do site</a></li>
          </ul>
        </div>

        <div>
          <h3
            class="text-[#E7D158] font-regular mb-4 lg:mb-8 tracking-wider flex items-center justify-between cursor-pointer lg:cursor-default"
            data-footer-accordion-trigger
            role="button"
            tabindex="0"
            aria-expanded="true"
          >
            <span>Categorias</span>
            <i data-lucide="chevron-down" class="lg:hidden h-4 w-4 transition-transform duration-200" data-footer-accordion-indicator></i>
          </h3>
          <ul class="flex flex-col gap-5 overflow-hidden transition-all duration-300 lg:overflow-visible">
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Camisetas</a></li>
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Calças</a></li>
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Jaquetas</a></li>
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Sapatos</a></li>
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Óculos</a></li>
            <li><a href="#" class="hover:text-[#E7D158] transition-colors">Winter 2024</a></li>
          </ul>
        </div>

        <div>
          <h3
            class="text-[#E7D158] font-regular mb-4 lg:mb-3 tracking-wider flex items-center justify-between cursor-pointer lg:cursor-default"
            data-footer-accordion-trigger
            role="button"
            tabindex="0"
            aria-expanded="true"
          >
            <span>Fale conosco</span>
            <i data-lucide="chevron-down" class="lg:hidden h-4 w-4 transition-transform duration-200" data-footer-accordion-indicator></i>
          </h3>
          <ul class="flex flex-col gap-5 overflow-hidden transition-all duration-300 lg:overflow-visible">
            <li><p>Telefone: (16) 3799-9999</p></li>
            <li><p>WhatsApp: (16) 99999-9999</p></li>
            <li><p><a href="mailto:contato@lime.com.br" class="hover:text-[#E7D158] transition-colors">contato@lime.com.br</a></p></li>
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

      <div class="w-full bg-[#e9e9e9] text-[#1f1f1f] py-8 px-4 sm:px-6 md:px-20 overflow-x-hidden">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div class="flex min-w-0 flex-col gap-4">
            <h4 class="text-[20px] leading-none font-normal text-[#2b2b2b]">Formas de pagamento</h4>
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
            <h4 class="text-[20px] leading-none font-normal text-[#2b2b2b]">Formas de entrega</h4>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-3">
              <img src="./assets/images/footer-icons/shipping/rodonaves.svg" alt="Rodonaves" class="h-4 w-auto" />
              <img src="./assets/images/footer-icons/shipping/jadlog.svg" alt="Jadlog" class="h-4 w-auto" />
              <img src="./assets/images/footer-icons/shipping/brad.svg" alt="Braspress" class="h-4 w-auto" />
              <img src="./assets/images/footer-icons/shipping/tnt.svg" alt="TNT" class="h-4 w-auto" />
              <img src="./assets/images/footer-icons/shipping/Correios.svg" alt="Correios" class="h-4 w-auto" />
            </div>
          </div>

          <div class="flex min-w-0 flex-col gap-4">
            <h4 class="text-[20px] leading-none font-normal text-[#2b2b2b]">Certificados</h4>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-3">
              <img src="./assets/images/footer-icons/certificates/Google1.svg" alt="Google Site Seguro" class="h-6 w-auto" />
              <img src="./assets/images/footer-icons/certificates/Google2.svg" alt="Google Avaliado" class="h-6 w-auto" />
            </div>
          </div>

          <div class="flex min-w-0 flex-col gap-4">
            <h4 class="text-[20px] leading-none font-normal text-[#2b2b2b]">Plataforma</h4>
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

customElements.define('app-footer', SiteFooter);
