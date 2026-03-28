class ProductCardHeader extends HTMLElement {
	constructor() {
		super();
		this.currentIndex = 0;
		this.products = [
			{
				title: "Blusa de moletom oversized com<br />mangas bufantes",
				image: "./assets/images/products/Product1.jpg",
				price: "159,92",
				oldPrice: "199,90",
				installments: "<strong class='text-zinc-300 font-normal'>10x</strong> de <strong class='text-zinc-300 font-normal'>R$ 15,99</strong> sem juros",
				discount: "20% off"
			},
			{
				title: "Blusa de moletom com modelagem<br />curta e estampa",
				image: "./assets/images/products/Product2.jpg",
				price: "139,90",
				oldPrice: "169,90",
				installments: "<strong class='text-zinc-300 font-normal'>10x</strong> de <strong class='text-zinc-300 font-normal'>R$ 13,99</strong> sem juros",
				discount: "15% off"
			}
		];
		this.handleMobileScroll = this.handleMobileScroll.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}

	connectedCallback() {
		this.render();
		this.bindEvents();
		this.updateDesktopCard();
		this.updateMobileProgress();
		if (window.lucide && typeof window.lucide.createIcons === "function") {
			window.lucide.createIcons();
		}
	}

	disconnectedCallback() {
		if (this.mobileScroller) {
			this.mobileScroller.removeEventListener("scroll", this.handleMobileScroll);
		}
		window.removeEventListener("resize", this.handleResize);
	}

	bindEvents() {
		const prev = this.querySelector("[data-action='prev']");
		const next = this.querySelector("[data-action='next']");
		this.mobileScroller = this.querySelector("[data-mobile-scroller]");

		if (prev) {
			prev.addEventListener("click", (event) => {
				event.preventDefault();
				this.currentIndex = (this.currentIndex - 1 + this.products.length) % this.products.length;
				this.updateDesktopCard();
			});
		}

		if (next) {
			next.addEventListener("click", (event) => {
				event.preventDefault();
				this.currentIndex = (this.currentIndex + 1) % this.products.length;
				this.updateDesktopCard();
			});
		}

		if (this.mobileScroller) {
			this.mobileScroller.addEventListener("scroll", this.handleMobileScroll, { passive: true });
		}

		window.addEventListener("resize", this.handleResize);
	}

	handleMobileScroll() {
		this.updateMobileProgress();
	}

	handleResize() {
		this.updateMobileProgress();
	}

	updateDesktopCard() {
		const product = this.products[this.currentIndex];
		const image = this.querySelector("[data-product-image]");
		const title = this.querySelector("[data-product-title]");
		const oldPrice = this.querySelector("[data-product-old-price]");
		const price = this.querySelector("[data-product-price]");
		const installments = this.querySelector("[data-product-installments]");
		const badge = this.querySelector("[data-product-badge]");
		const dots = this.querySelectorAll("[data-dot-index]");

		if (image) {
			image.style.opacity = "0.35";
			setTimeout(() => {
				image.src = product.image;
				image.style.opacity = "1";
			}, 140);
		}

		if (title) title.innerHTML = product.title;
		if (oldPrice) oldPrice.textContent = product.oldPrice;
		if (price) price.textContent = product.price;
		if (installments) installments.innerHTML = product.installments;
		if (badge) badge.textContent = product.discount;

		dots.forEach((dot, index) => {
			dot.classList.toggle("bg-[#E7D158]", index === this.currentIndex);
			dot.classList.toggle("bg-zinc-800", index !== this.currentIndex);
		});
	}

	updateMobileProgress() {
		const progress = this.querySelector("[data-mobile-progress]");

		if (!progress || !this.mobileScroller) {
			return;
		}

		const totalWidth = this.mobileScroller.scrollWidth;
		const visibleWidth = this.mobileScroller.clientWidth;
		const scrolledWidth = this.mobileScroller.scrollLeft + visibleWidth;
		const percent = totalWidth <= 0 ? 100 : Math.min((scrolledWidth / totalWidth) * 100, 100);

		progress.style.width = `${percent}%`;
		progress.style.transform = "translateX(0)";
	}

	renderMobileCards() {
		return this.products
			.map((product) => `
				<article class="product-card-mobile snap-start shrink-0 rounded-[24px] bg-[#111111] px-4 pt-4 pb-5 shadow-2xl">
					<div class="relative h-[246px] w-full overflow-hidden rounded-[20px] bg-zinc-200">
						<img
							src="${product.image}"
							class="h-full w-full object-cover object-top"
							alt="Blusa de moletom"
						/>
						<div class="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-900">
							${product.discount}
						</div>
					</div>

					<div class="pt-4">
						<h3 class="mb-4 min-h-[48px] text-[13px] leading-[1.55] text-zinc-400">
							${product.title}
						</h3>

						<div class="mb-2.5 flex items-center gap-3">
							<span class="text-[13px] text-zinc-600 line-through">${product.oldPrice}</span>
							<span class="text-[1rem] text-[#E7D158]">${product.price}</span>
						</div>

						<p class="text-[12px] text-zinc-500">
							${product.installments}
						</p>
					</div>
				</article>
			`)
			.join("");
	}

	render() {
		const product = this.products[this.currentIndex];
		const desktopDots = this.products
			.map((_, index) => `<div data-dot-index="${index}" class="h-[3px] w-7 rounded-full ${index === this.currentIndex ? "bg-[#E7D158]" : "bg-zinc-800"}"></div>`)
			.join("");

		this.innerHTML = `
		<div class="font-geist">
			<div class="hidden w-[300px] flex-col gap-4 sm:w-[332px] lg:flex">
				<div class="flex w-full items-center justify-between px-1">
					<h2 class="text-[1rem] text-zinc-100">Winter 24 Collection</h2>
					<a href="#" class="rounded-full border border-[#E7D158] px-4 py-1.5 text-[12px] text-[#E7D158] transition-colors hover:bg-[#E7D158] hover:text-black">
						Veja mais!
					</a>
				</div>

				<div class="relative w-full overflow-visible rounded-[30px] bg-[#121212] shadow-2xl">
					<div class="relative h-[302px] w-full bg-zinc-200">
						<img
							data-product-image
							src="${product.image}"
							class="h-full w-full object-cover object-top transition-opacity duration-300"
							alt="Blusa de moletom"
						/>

						<div data-product-badge class="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-900">
							${product.discount}
						</div>

						<button data-action="prev" class="absolute -left-[22px] top-1/2 z-10 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[rgba(78,78,78,0.68)] text-white shadow-[0_10px_24px_rgba(0,0,0,0.28)] duration-300 hover:bg-[rgba(92,92,92,0.82)]">
							<i data-lucide="chevron-left" class="h-4 w-4"></i>
						</button>
						<button data-action="next" class="absolute -right-[22px] top-1/2 z-10 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[rgba(78,78,78,0.68)] text-white shadow-[0_10px_24px_rgba(0,0,0,0.28)] duration-300 hover:bg-[rgba(92,92,92,0.82)]">
							<i data-lucide="chevron-right" class="h-4 w-4"></i>
						</button>
					</div>

					<div class="px-6 pt-5 pb-6">
						<h3 data-product-title class="mb-4 min-h-[48px] text-[13px] leading-[1.55] text-zinc-400">
							${product.title}
						</h3>

						<div class="mb-2.5 flex items-center gap-3">
							<span data-product-old-price class="text-[13px] text-zinc-600 line-through">${product.oldPrice}</span>
							<span data-product-price class="text-[0.95rem] text-[#E7D158]">${product.price}</span>
						</div>

						<p data-product-installments class="text-[12px] text-zinc-500">
							${product.installments}
						</p>
					</div>
				</div>

				<div class="mt-1 flex items-center justify-center gap-1.5">
					${desktopDots}
				</div>
			</div>

			<div class="flex w-full max-w-[420px] flex-col gap-5 overflow-hidden lg:hidden">
				<div class="flex w-full items-center justify-between gap-4 px-1">
					<h2 class="text-[0.98rem] text-zinc-100">Winter 24 Collection</h2>
					<a href="#" class="rounded-full border border-[#E7D158] px-4 py-1.5 text-[12px] text-[#E7D158] transition-colors hover:bg-[#E7D158] hover:text-black">
						Veja mais!
					</a>
				</div>

				<div data-mobile-scroller class="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-10">
					${this.renderMobileCards()}
				</div>

				<div class="relative mx-auto h-[3px] w-[56px] overflow-hidden rounded-full bg-[#5c5630]">
					<div data-mobile-progress class="absolute left-0 top-0 h-full rounded-full bg-[#E7D158] transition-transform duration-200"></div>
				</div>
			</div>
		</div>
		`;
	}
}

customElements.define("product-cardheader", ProductCardHeader);
