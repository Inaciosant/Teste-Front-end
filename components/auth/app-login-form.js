class AppLoginForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    this.form = this.querySelector("[data-login-form]");
    this.emailInput = this.querySelector("#email");
    this.passwordInput = this.querySelector("#password");
    this.formMessage = this.querySelector("[data-login-message]");

    if (!this.form || !this.emailInput || !this.passwordInput) {
      return;
    }

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    [this.emailInput, this.passwordInput].forEach((field) => {
      field.addEventListener("input", () => this.validateField(field));
      field.addEventListener("blur", () => this.validateField(field));
    });
  }

  handleSubmit() {
    const isEmailValid = this.validateField(this.emailInput);
    const isPasswordValid = this.validateField(this.passwordInput);

    if (!isEmailValid || !isPasswordValid) {
      this.setFormMessage("Confira os campos destacados para continuar.", "error");
      return;
    }

  }

  validateField(field) {
    if (!field) {
      return false;
    }

    const value = field.value.trim();

    if (field.id === "email") {
      if (!value) {
        this.setFieldError(field, "Informe seu e-mail.");
        return false;
      }

      if (!this.isValidEmail(value)) {
        this.setFieldError(field, "Digite um e-mail válido.");
        return false;
      }
    }

    if (field.id === "password") {
      if (!value) {
        this.setFieldError(field, "Informe sua senha.");
        return false;
      }

    
    }

    this.clearFieldError(field);
    this.clearFormMessage();
    return true;
  }

  setFieldError(field, message) {
    const errorElement = this.querySelector(`[data-error-for="${field.id}"]`);

    field.classList.add("border-red-400", "bg-red-50/50");
    field.classList.remove("focus:border-zinc-300");
    field.setAttribute("aria-invalid", "true");

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove("hidden");
    }
  }

  clearFieldError(field) {
    const errorElement = this.querySelector(`[data-error-for="${field.id}"]`);

    field.classList.remove("border-red-400", "bg-red-50/50");
    field.classList.add("focus:border-zinc-300");
    field.removeAttribute("aria-invalid");

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.add("hidden");
    }
  }

  setFormMessage(message, type) {
    if (!this.formMessage) {
      return;
    }

    this.formMessage.textContent = message;
    this.formMessage.classList.remove("hidden", "text-red-500", "text-emerald-600");
    this.formMessage.classList.add(type === "error" ? "text-red-500" : "text-emerald-600");
  }

  clearFormMessage() {
    if (!this.formMessage) {
      return;
    }

    this.formMessage.textContent = "";
    this.formMessage.classList.add("hidden");
    this.formMessage.classList.remove("text-red-500", "text-emerald-600");
  }

  isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  render() {
    this.innerHTML = `
      <section class="w-full bg-[#f3f3f3] pb-16 pt-0">
        <div class="mx-auto w-full max-w-[980px] px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-[460px]">
            <h1 class="text-center font-geist text-[2rem] font-normal text-zinc-900 md:text-[2.2rem]">
              Login
            </h1>

            <form data-login-form class="mt-8" novalidate>
              <div class="space-y-6">
                <div>
                  <label for="email" class="mb-2 block font-geist text-[0.95rem] text-zinc-500">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e-mail@teste.com"
                    class="h-[46px] w-full rounded-full border border-transparent bg-[#e6e5df] px-5 text-[0.95rem] text-zinc-800 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:text-[1.02rem]"
                  />
                  <p data-error-for="email" class="mt-1 hidden pl-2 font-geist text-[0.82rem] text-red-500"></p>
                </div>

                <div>
                  <label for="password" class="mb-2 block font-geist text-[0.95rem] text-zinc-500">
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="*******"
                    class="h-[46px] w-full rounded-full border border-transparent bg-[#e6e5df] px-5 text-[0.95rem] text-zinc-800 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-300 sm:h-[52px] sm:px-6 sm:text-[1.02rem]"
                  />
                  <p data-error-for="password" class="mt-1 hidden pl-2 font-geist text-[0.82rem] text-red-500"></p>
                </div>
              </div>

              <p data-login-message class="mt-4 hidden text-center font-geist text-[0.9rem]"></p>

              <div class="mt-6">
                <button
                  type="submit"
                  class="inline-flex h-[46px] w-full items-center justify-center rounded-full bg-[#E7D158] px-8 font-geist text-[1.06rem] text-zinc-900 transition-colors hover:bg-[#dcc74f] sm:h-[50px]"
                >
                  Continuar
                </button>
              </div>

              <div class="mt-4 text-center">
                <a href="#" class="font-geist text-[0.9rem] text-zinc-800 underline underline-offset-2 transition-colors hover:text-zinc-600">
                  Esqueci minha senha
                </a>
              </div>

              <div class="mt-8 border-t border-zinc-300 pt-8 text-center">
                <p class="font-geist text-[0.95rem] text-zinc-500">
                  Ainda não possui conta?
                  <a href="./cadastro.html" class="text-zinc-800 underline underline-offset-2 transition-colors hover:text-zinc-600">
                    Criar conta
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("app-login-form", AppLoginForm);
