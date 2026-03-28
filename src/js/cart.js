// cart.js
const CART_KEY = 'lime_cart_items';

export const Cart = {
    getItems() {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    },

    saveItems(items) {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
        document.dispatchEvent(new CustomEvent('cart-updated', { detail: items }));
    },

    add(product) {
        const items = this.getItems();
        const existingItem = items.find(i => i.id === product.id && i.size === product.size);

        if (existingItem) {
            existingItem.quantity += (product.quantity || 1);
        } else {
            items.push({ ...product, quantity: product.quantity || 1 });
        }

        this.saveItems(items);
        
        document.dispatchEvent(new CustomEvent('toggle-cart', { detail: { open: true } }));
    },

    remove(productId, size) {
        const items = this.getItems();
        const filtered = items.filter(i => !(i.id === productId && i.size === size));
        this.saveItems(filtered);
    },

    getTotal() {
        return this.getItems().reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    formatPrice(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }
};