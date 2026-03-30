class AppBreadcrumb extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['items'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const itemsRaw = this.getAttribute("items") || "[]";
    let items = [];

    try {
      items = JSON.parse(itemsRaw.replace(/'/g, '"'));
    } catch (error) {
      items = [];
    }

    this.innerHTML = `
      <nav class="flex w-full flex-wrap items-center justify-center font-geist text-[13px] font-normal leading-none tracking-[-0.2px] md:text-[14px]">
        ${items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return `
            <div class="flex items-center">
              ${isLast 
                ? `<span class="cursor-default text-[#A1A1AA]">${item.label}</span>`
                : `<a href="${item.url || '#'}" class="text-[#18181B] transition-colors hover:opacity-70">${item.label}</a>`
              }
              
              ${!isLast ? `
                <span class="mx-3 font-light ${index === items.length - 2 ? 'text-[#D4D4D8]' : 'text-[#18181B]'}">
                  |
                </span>
              ` : ''}
            </div>
          `;
        }).join('')}
      </nav>
    `;
  }
}

customElements.define('app-breadcrumb', AppBreadcrumb);
