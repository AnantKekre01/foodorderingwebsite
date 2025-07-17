document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const menuItems = document.querySelectorAll(".menu-item");
    const orderSummary = document.querySelector(".order-summary");
    
    menuItems.forEach((item, index) => {
        item.querySelector(".add-to-cart-btn").addEventListener("click", () => {
            const title = item.querySelector(".menu-title").innerText;
            const price = parseInt(item.querySelector(".menu-price").innerText.replace("₹", "").trim());
            const quantity = parseInt(item.querySelector(".quantity-select").value);
            
            cart.push({ title, price, quantity });
            updateOrderSummary();
        });
    });

    function updateOrderSummary() {
        orderSummary.innerHTML = "<h3>Order Summary</h3>";
        cart.forEach((item) => {
            orderSummary.innerHTML += `<p>${item.title} x ${item.quantity} - ₹${item.price * item.quantity}</p>`;
        });
    }
});
