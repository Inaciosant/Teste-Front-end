class TopBar extends HTMLElement {

    connectedCallback() {
        this.render();
    }


    render() {
        this.innerHTML = `
        <section class="w-full  px-5 sm:px-6">
            <div class="mx-auto w-full rounded-full h-10 bg-black py-2 text-center flex items-center justify-center overflow-hidden">
                    <p class="max-w-full truncate whitespace-nowrap text-[10px] sm:text-[12px] tracking-wide text-[#d8cc5b] font-geist font-normal" >
                    WINTER 24 COLLECTION ESTÁ DISPONÍVEL! SHOP NOW
                </p>
            </div>
        </section>
        `;
    }
}

customElements.define('app-topbar', TopBar);