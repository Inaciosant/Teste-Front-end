class BadgeHeader extends HTMLElement {

    connectedCallback() {
        this.render();
    }


    render() {
        this.innerHTML = `
        <section class="w-full bg-[#0b1020] py-3 px-6">
            <div class="mx-auto w-full rounded-full bg-black py-2 text-center">
                <p class="text-[10px] tracking-wide text-[#d8cc5b] uppercase">
                    WINTER 24 COLLECTION ESTÁ DISPONÍVEL! SHOP NOW
                </p>
            </div>
        </section>
        `;
    }
}

customElements.define('app-badgeheader', BadgeHeader);