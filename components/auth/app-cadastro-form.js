class AppCadastroForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.bindEvents();
    this.updateByType(this.getSelectedType());
  }

  bindEvents() {
    const typeInputs = this.querySelectorAll('input[name="person_type"]');
    const form = this.querySelector("[data-register-form]");
    const docInput = this.querySelector("[data-doc-input]");
    const secondLeftInput = this.querySelector("[data-second-left-input]");
    const phoneInput = this.querySelector("[data-phone-input]");
    const cepInput = this.querySelector("[data-cep-input]");

    typeInputs.forEach((input) => {
      input.addEventListener("change", () => {
        this.updateByType(this.getSelectedType());
      });
    });

    docInput?.addEventListener("input", () => this.applyDocumentMask());
    secondLeftInput?.addEventListener("input", () => this.applySecondLeftMask());
    phoneInput?.addEventListener("input", () => this.applyPhoneMask());
    cepInput?.addEventListener("input", () => this.applyCepMask());

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }

  getSelectedType() {
    const checked = this.querySelector('input[name="person_type"]:checked');
    return checked ? checked.value : "fisica";
  }

  updateByType(type) {
    const isJuridica = type === "juridica";

    const docInput = this.querySelector("[data-doc-input]");
    const secondLeftInput = this.querySelector("[data-second-left-input]");
    const socialInput = this.querySelector("[data-social-input]");
    const sexField = this.querySelector("[data-sex-field]");
    const stateField = this.querySelector("[data-state-field]");
    const stateInput = this.querySelector("[data-state-input]");

    if (!docInput || !secondLeftInput || !socialInput || !sexField || !stateField || !stateInput) {
      return;
    }

    if (isJuridica) {
      docInput.placeholder = "CNPJ*";
      docInput.maxLength = 18;
      secondLeftInput.placeholder = "Razão social*";
      secondLeftInput.removeAttribute("inputmode");
      secondLeftInput.removeAttribute("maxlength");
      secondLeftInput.dataset.mask = "none";
      socialInput.placeholder = "Nome fantasia";
      stateInput.placeholder = "Inscrição estadual";
      sexField.classList.add("hidden");
      stateField.classList.remove("hidden");
      this.applyDocumentMask();
      return;
    }

    docInput.placeholder = "CPF*";
    docInput.maxLength = 14;
    secondLeftInput.placeholder = "Data de nascimento*";
    secondLeftInput.setAttribute("inputmode", "numeric");
    secondLeftInput.setAttribute("maxlength", "10");
    secondLeftInput.dataset.mask = "date";
    socialInput.placeholder = "Instagram";
    sexField.classList.remove("hidden");
    stateField.classList.add("hidden");
    this.applyDocumentMask();
    this.applySecondLeftMask();
  }

  getDigits(value) {
    return (value || "").replace(/\D/g, "");
  }

  applyDocumentMask() {
    const docInput = this.querySelector("[data-doc-input]");

    if (!docInput) {
      return;
    }

    const isJuridica = this.getSelectedType() === "juridica";
    const digits = this.getDigits(docInput.value).slice(0, isJuridica ? 14 : 11);

    if (isJuridica) {
      let masked = digits;
      if (digits.length > 2) masked = `${digits.slice(0, 2)}.${digits.slice(2)}`;
      if (digits.length > 5) masked = `${masked.slice(0, 6)}.${masked.slice(6)}`;
      if (digits.length > 8) masked = `${masked.slice(0, 10)}/${masked.slice(10)}`;
      if (digits.length > 12) masked = `${masked.slice(0, 15)}-${masked.slice(15)}`;
      docInput.value = masked;
      return;
    }

    let masked = digits;
    if (digits.length > 3) masked = `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length > 6) masked = `${masked.slice(0, 7)}.${masked.slice(7)}`;
    if (digits.length > 9) masked = `${masked.slice(0, 11)}-${masked.slice(11)}`;
    docInput.value = masked;
  }

  applySecondLeftMask() {
    const secondLeftInput = this.querySelector("[data-second-left-input]");

    if (!secondLeftInput || secondLeftInput.dataset.mask !== "date") {
      return;
    }

    const digits = this.getDigits(secondLeftInput.value).slice(0, 8);
    let masked = digits;
    if (digits.length > 2) masked = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    if (digits.length > 4) masked = `${masked.slice(0, 5)}/${masked.slice(5)}`;
    secondLeftInput.value = masked;
  }

  applyPhoneMask() {
    const phoneInput = this.querySelector("[data-phone-input]");

    if (!phoneInput) {
      return;
    }

    const digits = this.getDigits(phoneInput.value).slice(0, 11);
    let masked = digits;

    if (digits.length > 2) {
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }

    if (digits.length > 6 && digits.length <= 10) {
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }

    if (digits.length > 10) {
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    phoneInput.value = masked;
  }

  applyCepMask() {
    const cepInput = this.querySelector("[data-cep-input]");

    if (!cepInput) {
      return;
    }

    const digits = this.getDigits(cepInput.value).slice(0, 8);
    let masked = digits;

    if (digits.length > 5) {
      masked = `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }

    cepInput.value = masked;
  }

  render() {
    this.innerHTML = `
      <section class="w-full bg-[#f3f3f3] pb-16 pt-0">
        <div class="mx-auto w-full max-w-[980px] px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-[820px]">
            <h1 class="text-center font-geist text-[2rem] font-normal text-zinc-900 md:text-[2.25rem]">
              Criar conta
            </h1>
            <p class="mt-2 text-center font-geist text-[1rem] text-zinc-500">
              Já possui conta?
              <a href="./login.html" class="text-zinc-800 underline underline-offset-2 transition-colors hover:text-zinc-600">Fazer login</a>
            </p>

            <h2 class="mt-9 text-center font-geist text-[1.7rem] font-normal text-zinc-900 md:mt-10 md:text-[1.95rem]">
              Informações da Conta
            </h2>

            <div class="mt-6 flex flex-col items-center gap-2.5 font-geist text-[0.98rem] text-zinc-700 sm:text-[1.05rem]">
              <span class="text-center">Tipo de conta:</span>
              <div class="flex items-center justify-center gap-4 sm:gap-5">
                <label class="inline-flex cursor-pointer items-center gap-2">
                  <input type="radio" name="person_type" value="fisica" checked class="peer sr-only" />
                  <span class="inline-flex h-5 w-5 shrink-0 rounded-full border-2 border-[#c8c6bc] bg-transparent transition-all peer-checked:border-[5px] peer-checked:border-[#E7D158] peer-checked:bg-white"></span>
                  <span class="whitespace-nowrap text-zinc-600 transition-colors peer-checked:text-zinc-700">Pessoa física</span>
                </label>
                <label class="inline-flex cursor-pointer items-center gap-2">
                  <input type="radio" name="person_type" value="juridica" class="peer sr-only" />
                  <span class="inline-flex h-5 w-5 shrink-0 rounded-full border-2 border-[#c8c6bc] bg-transparent transition-all peer-checked:border-[5px] peer-checked:border-[#E7D158] peer-checked:bg-white"></span>
                  <span class="whitespace-nowrap text-zinc-600 transition-colors peer-checked:text-zinc-700">Pessoa jurídica</span>
                </label>
              </div>
            </div>

            <form data-register-form class="mt-8 md:mt-10" novalidate>
              <div class="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4">
                <input type="text" placeholder="Nome completo*" class="h-[46px] w-full rounded-full border border-transparent bg-[#e6e5df] px-5 text-[0.98rem] text-zinc-800 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:text-[1.05rem]" />
                <input data-doc-input type="text" placeholder="CPF*" class="h-[46px] w-full rounded-full border border-transparent bg-[#e6e5df] px-5 text-[0.98rem] text-zinc-800 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:text-[1.05rem]" />

                <input data-second-left-input data-mask="date" inputmode="numeric" maxlength="10" type="text" placeholder="Data de nascimento*" class="h-[46px] w-full rounded-full border border-transparent bg-[#e6e5df] px-5 text-[0.98rem] text-zinc-800 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:text-[1.05rem]" />

                <div data-sex-field class="relative">
                  <select class="h-[46px] w-full appearance-none rounded-full border border-transparent bg-[#e6e5df] px-5 pr-11 text-[0.98rem] text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:pr-12 sm:text-[1.05rem]">
                    <option value="" selected>Sexo</option>
                    <option value="feminino">Feminino</option>
                    <option value="masculino">Masculino</option>
                    <option value="outro">Outro</option>
                  </select>
                  <span class="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 sm:right-6">⌄</span>
                </div>

                <div data-state-field class="hidden">
                  <input data-state-input type="text" placeholder="Inscrição estadual" class="h-[46px] w-full rounded-full border border-transparent bg-[#e6e5df] px-5 text-[0.98rem] text-zinc-800 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:text-[1.05rem]" />
                </div>

                <input data-phone-input inputmode="numeric" maxlength="15" type="text" placeholder="Celular*" class="h-[46px] w-full rounded-full border border-transparent bg-[#e6e5df] px-5 text-[0.98rem] text-zinc-800 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:text-[1.05rem]" />
                <input data-social-input type="text" placeholder="Instagram" class="h-[46px] w-full rounded-full border border-transparent bg-[#e6e5df] px-5 text-[0.98rem] text-zinc-800 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:text-[1.05rem]" />

                <input type="email" placeholder="E-mail*" class="h-[46px] w-full rounded-full border border-transparent bg-[#e6e5df] px-5 text-[0.98rem] text-zinc-800 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:text-[1.05rem] md:col-span-2" />

                <input type="password" placeholder="Senha*" class="h-[46px] w-full rounded-full border border-transparent bg-[#e6e5df] px-5 text-[0.98rem] text-zinc-800 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:text-[1.05rem]" />
                <input type="password" placeholder="Confirmar senha*" class="h-[46px] w-full rounded-full border border-transparent bg-[#e6e5df] px-5 text-[0.98rem] text-zinc-800 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:text-[1.05rem]" />
              </div>

              <h3 class="mt-10 text-center font-geist text-[1.7rem] font-normal text-zinc-900 md:mt-14 md:text-[1.95rem]">
                Endereço para entrega
              </h3>

              <div class="mt-5 flex items-center gap-2.5 sm:mt-6 sm:gap-3">
                <input data-cep-input inputmode="numeric" maxlength="9" type="text" placeholder="CEP*" class="h-[46px] min-w-0 flex-1 rounded-full border border-transparent bg-[#e6e5df] px-5 text-[0.98rem] text-zinc-800 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:text-[1.05rem]" />
                <button type="button" class="inline-flex h-[46px] shrink-0 items-center justify-center rounded-full border border-zinc-800 px-5 font-geist text-[1rem] text-zinc-900 transition-colors hover:bg-zinc-100 sm:h-[52px] sm:px-8 sm:text-[1.15rem]">
                  Buscar
                </button>
              </div>

              <a href="#" class="mt-2 inline-block font-geist text-[0.86rem] text-zinc-800 underline underline-offset-2 transition-colors hover:text-zinc-600 sm:text-[1rem]">
                Não sei meu CEP
              </a>

              <div class="mt-7 flex justify-center sm:mt-8">
                <button type="submit" class="inline-flex h-[46px] w-full items-center justify-center rounded-full bg-[#E7D158] px-8 font-geist text-[1.1rem] text-zinc-900 transition-colors hover:bg-[#dcc74f] sm:w-auto">
                  Criar conta
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("app-cadastro-form", AppCadastroForm);
