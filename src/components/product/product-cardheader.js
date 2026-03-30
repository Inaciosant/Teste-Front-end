class ProductCardHeader extends HTMLElement {
	constructor() {
		super();
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
	}

	connectedCallback() {
		this.render();
		this.initCarousels();
		if (window.lucide && typeof window.lucide.createIcons === "function") {
			window.lucide.createIcons();
		}
	}

	disconnectedCallback() {
		this.desktopSwiper?.destroy(true, true);
		this.mobileSwiper?.destroy(true, true);
	}

	initCarousels() {
		if (!window.Swiper) {
			return;
		}

		const desktopContainer = this.querySelector("[data-desktop-swiper]");
		const mobileContainer = this.querySelector("[data-mobile-swiper]");
		const prevButton = this.querySelector("[data-action='prev']");
		const nextButton = this.querySelector("[data-action='next']");
		const pagination = this.querySelector("[data-desktop-pagination]");

		if (desktopContainer) {
			this.desktopSwiper = new window.Swiper(desktopContainer, {
				slidesPerView: 1,
				spaceBetween: 0,
				navigation: {
					prevEl: prevButton,
					nextEl: nextButton
				},
				pagination: {
					el: pagination,
					clickable: true,
					bulletClass: "product-header-bullet",
					bulletActiveClass: "is-active"
				}
			});
		}

		if (mobileContainer) {
			this.mobileSwiper = new window.Swiper(mobileContainer, {
				slidesPerView: "auto",
				spaceBetween: 20,
				on: {
					init: () => this.updateMobileProgress(),
					slideChange: () => this.updateMobileProgress(),
					resize: () => this.updateMobileProgress()
				}
			});
		}
	}

	updateMobileProgress() {
		const progress = this.querySelector("[data-mobile-progress]");

		if (!progress || !this.mobileSwiper) {
			return;
		}

		const totalSlides = this.products.length;
		const visibleSlides = this.mobileSwiper.slidesPerViewDynamic();
		const percent = totalSlides <= 0
			? 100
			: Math.min(((this.mobileSwiper.activeIndex + visibleSlides) / totalSlides) * 100, 100);

		progress.style.width = `${percent}%`;
		progress.style.transform = "translateX(0)";
	}

	renderMobileCards() {
		return this.products
			.map((product) => `
				<article class="swiper-slide product-card-mobile shrink-0 flex h-[454px] w-[302px] flex-col rounded-[24px] bg-[#111111] p-4 shadow-2xl">
					<div class="relative h-[250px] md:h-[280px] w-full shrink-0 overflow-hidden rounded-[20px] bg-zinc-200">
						<img
							src="${product.image}"
							class="h-full w-full object-cover object-top"
							alt="Blusa de moletom"
						/>
						<div class="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-900">
							${product.discount}
						</div>
					</div>

					<div class="flex flex-1 flex-col pt-4">
						<h3 class="mb-4 min-h-[48px] text-[13px] leading-[1.55] text-zinc-400">
							${product.title}
						</h3>

						<div class="mb-2.5 mt-auto flex items-center gap-3">
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

	renderDesktopSlides() {
		return this.products
			.map((product) => `
				<div class="swiper-slide">
					<div class="relative flex h-[454px] w-[302px] flex-col overflow-visible rounded-[30px] bg-[#121212] shadow-2xl">
						<div class="relative h-[250px] md:h-[280px] w-full shrink-0 bg-zinc-200">
							<img
								src="${product.image}"
								class="h-full w-full object-cover object-top"
								alt="Blusa de moletom"
							/>

							<div class="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-900">
								${product.discount}
							</div>
						</div>

						<div class="flex flex-1 flex-col px-6 pt-5 pb-6">
							<h3 class="mb-4 min-h-[48px] text-[13px] leading-[1.55] text-zinc-400">
								${product.title}
							</h3>

							<div class="mb-2.5 mt-auto flex items-center gap-3">
								<span class="text-[13px] text-zinc-600 line-through">${product.oldPrice}</span>
								<span class="text-[0.95rem] text-[#E7D158]">${product.price}</span>
							</div>

							<p class="text-[12px] text-zinc-500">
								${product.installments}
							</p>
						</div>
					</div>
				</div>
			`)
			.join("");
	}

	render() {
		this.innerHTML = `
		<div class="font-geist">
			<div class="relative hidden w-[302px] flex-col gap-4 lg:flex">
				<div class="flex w-full items-center justify-between px-1">
					<h2 class="text-[1rem] text-zinc-100">Winter 24 Collection</h2>
					<a href="#" class="rounded-full border border-[#E7D158] px-4 py-1.5 text-[12px] text-[#E7D158] transition-colors hover:bg-[#E7D158] hover:text-black">
						Veja mais!
					</a>
				</div>

				<div data-desktop-swiper class="swiper w-full overflow-hidden rounded-[30px]">
					<div class="swiper-wrapper">
						${this.renderDesktopSlides()}
					</div>
				</div>

				<button data-action="prev" class="absolute left-[-22px] top-[50%] z-10 hidden h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[rgba(78,78,78,0.68)] text-white shadow-[0_10px_24px_rgba(0,0,0,0.28)] duration-300 hover:bg-[rgba(92,92,92,0.82)] lg:flex">
					<i data-lucide="chevron-left" class="h-4 w-4"></i>
				</button>
				<button data-action="next" class="absolute right-[-22px] top-[50%] z-10 hidden h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[rgba(78,78,78,0.68)] text-white shadow-[0_10px_24px_rgba(0,0,0,0.28)] duration-300 hover:bg-[rgba(92,92,92,0.82)] lg:flex">
					<i data-lucide="chevron-right" class="h-4 w-4"></i>
				</button>

				<div data-desktop-pagination class="mt-1 flex items-center justify-center gap-1.5"></div>
			</div>

			<div class="flex w-full max-w-[420px] flex-col gap-5 overflow-hidden lg:hidden">
				<div class="flex w-full items-center justify-between gap-4 px-1">
					<h2 class="text-[0.98rem] text-zinc-100">Winter 24 Collection</h2>
					<a href="#" class="rounded-full border border-[#E7D158] px-4 py-1.5 text-[12px] text-[#E7D158] transition-colors hover:bg-[#E7D158] hover:text-black">
						Veja mais!
					</a>
				</div>

				<div data-mobile-swiper class="swiper w-full overflow-hidden pb-2 pr-10">
					<div class="swiper-wrapper">
						${this.renderMobileCards()}
					</div>
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
