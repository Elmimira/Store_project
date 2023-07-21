var selectedProduct = null; // Зберігає обраний товар
var orders = JSON.parse(localStorage.getItem("orders")) || [];

// Функція для відображення товарів вибраної категорії
function showProducts(category) {
    var productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Очищення списку товарів

    var products = getProductsByCategory(category);

    // Додавання товарів до списку
    for (var i = 0; i < products.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = products[i].name + " - " + products[i].price + " грн"; // Виводимо назву товару та ціну
        li.onclick = function () {
            showProductDetails(this.innerHTML.split(" - ")[0]);
            updateSelectedCategory(this.id);
        };
        productList.appendChild(li);
    }

    // Очищення інформації про товар
    document.getElementById("product-details").innerHTML = "";
    selectedProduct = null;
    hideBuyButton();
}

// Функція для відображення інформації про обраний товар
function showProductDetails(productName) {
    var productDetails = document.getElementById("product-details");

    var product = getProductByName(productName);

    // Відображення інформації про товар
    productDetails.innerHTML =
        "<h3>" + product.name + "</h3><p>" + product.description + "</p>";

    // Зберігання обраного товару
    selectedProduct = product;

    showBuyButton();
}

// Функція для відображення кнопки "Купити"
function showBuyButton() {
    var buyButton = document.getElementById("buy-button");
    buyButton.style.display = "block";
}

// Функція для сховування кнопки "Купити"
function hideBuyButton() {
    var buyButton = document.getElementById("buy-button");
    buyButton.style.display = "none";
}

// Функція для оновлення вибраної категорії
function updateSelectedCategory(categoryId) {
    var categories = document.getElementsByTagName("li");
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id === categoryId) {
            categories[i].classList.add("selected");
        } else {
            categories[i].classList.remove("selected");
        }
    }
}

// Функція для відкриття модального вікна форми оформлення замовлення
function openOrderForm() {
    var modal = document.getElementById("order-modal");
    modal.style.display = "block";
}

// Функція для закриття модального вікна форми оформлення замовлення
function closeOrderForm() {
    var modal = document.getElementById("order-modal");
    modal.style.display = "none";
}

// Функція для перевірки даних користувача при підтвердженні замовлення
function submitOrder(event) {
    event.preventDefault();
    var form = document.getElementById("order-form");
    var name = form.name.value;
    var city = form.city.value;
    var delivery = form.delivery.value;
    var payment = form.payment.value;
    var quantity = form.quantity.value;
    var comment = form.comment.value;

    // Перевірка на обов'язкові поля
    var errorMessage = document.getElementById("error-message");
    if (!name || !city || !delivery || !payment || !quantity) {
        errorMessage.innerText = "Будь ласка, заповніть всі обов'язкові поля.";
        return;
    }

    // Створення об'єкту замовлення
    var order = {
        date: new Date().toLocaleString(),
        price: selectedProduct.price, 
        product: selectedProduct,
        quantity: quantity,
        name: name,
        city: city,
        delivery: delivery,
        payment: payment,
        comment: comment,
    };

    // Додавання замовлення до localStorage
    addOrderToLocalStorage(order);

    // Виведення інформації про замовлення на сторінку
    var orderDetails = document.getElementById("order-details");
    var orderInfo =
        "<h2>Інформація про замовлення</h2>" +
        "<p><b>Дата:</b> " +
        order.date +
        "</p>" +
        "<p><b>Ціна:</b> " +
        order.price +
        " грн</p>" +
        "<p><b>Товар:</b> " +
        order.product.name +
        "</p>" +
        "<p><b>Кількість:</b> " +
        order.quantity +
        "</p>" +
        "<p><b>ПІБ покупця:</b> " +
        order.name +
        "</p>" +
        "<p><b>Місто:</b> " +
        order.city +
        "</p>" +
        "<p><b>Склад Нової пошти:</b> " +
        order.delivery +
        "</p>" +
        "<p><b>Спосіб оплати:</b> " +
        order.payment +
        "</p>" +
        "<p><b>Коментар до замовлення:</b> " +
        order.comment +
        "</p>";
    orderDetails.innerHTML = orderInfo;

    // Закриття модального вікна
    closeOrderForm();
    showMyOrders(); // Оновлюємо список замовлень після додавання нового замовлення
}

function getProductsByCategory(category) {
    if (category === "electronics") {
        return [
            { name: "Смартфон", description: "Дуже крутий смартфон", price: 1000 },
            { name: "Ноутбук", description: "Можливо, найдорожчий ноутбук на світі", price: 2000 },
        ];
    } else if (category === "clothing") {
        return [
            { name: "Футболка", description: "Класна футболка", price: 30 },
            { name: "Джинси", description: "Стильні джинси", price: 50 },
        ];
    } else if (category === "books") {
        return [
            { name: "Роман", description: "Цікавий роман", price: 20 },
            { name: "Детектив", description: "Напружений детектив", price: 25 },
        ];
    }
}

function getProductByName(productName) {
    if (productName === "Смартфон") {
        return { name: "Смартфон", description: "Дуже крутий смартфон", price: 1000 };
    } else if (productName === "Ноутбук") {
        return {
            name: "Ноутбук",
            description: "Можливо, найдорожчий ноутбук на світі",
            price: 2000,
        };
    } else if (productName === "Футболка") {
        return { name: "Футболка", description: "Класна футболка", price: 30 };
    } else if (productName === "Джинси") {
        return { name: "Джинси", description: "Стильні джинси", price: 50 };
    } else if (productName === "Роман") {
        return { name: "Роман", description: "Цікавий роман", price: 20 };
    } else if (productName === "Детектив") {
        return { name: "Детектив", description: "Напружений детектив", price: 25 };
    }
}

// Функція для додавання замовлення до localStorage
function addOrderToLocalStorage(order) {
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
}

// Функція для відображення списку замовлень користувача
function showMyOrders() {
    var orderList = document.getElementById("order-list");
    orderList.innerHTML = ""; // Очищення списку замовлень

    // Отримуємо замовлення з localStorage
    orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Перевірка наявності замовлень
    if (orders.length === 0) {
        orderList.innerHTML = "<li>Немає замовлень</li>";
    } else {
        // Показуємо список замовлень користувача
        for (var i = 0; i < orders.length; i++) {
            var order = orders[i];
            var li = document.createElement("li");
            li.innerHTML =
                "Дата: " +
                order.date +
                ", Ціна: " +
                order.price +
                " грн" +
                '<button onclick="showOrderDetails(' +
                i +
                ')">Деталі</button>' +
                '<button onclick="deleteOrder(' +
                i +
                ')">Видалити</button>';
            orderList.appendChild(li);
        }
    }
}

// Функція для відображення деталей обраного замовлення
function showOrderDetails(orderIndex) {
    var orderDetails = document.getElementById("order-details");
    var order = orders[orderIndex];
    var orderInfo =
        "<h2>Інформація про замовлення</h2>" +
        "<p><b>Дата:</b> " +
        order.date +
        "</p>" +
        "<p><b>Ціна:</b> " +
        order.price +
        " грн</p>" +
        "<p><b>Товар:</b> " +
        order.product.name +
        "</p>" +
        "<p><b>Кількість:</b> " +
        order.quantity +
        "</p>" +
        "<p><b>ПІБ покупця:</b> " +
        order.name +
        "</p>" +
        "<p><b>Місто:</b> " +
        order.city +
        "</p>" +
        "<p><b>Склад Нової пошти:</b> " +
        order.delivery +
        "</p>" +
        "<p><b>Спосіб оплати:</b> " +
        order.payment +
        "</p>" +
        "<p><b>Коментар до замовлення:</b> " +
        order.comment +
        "</p>";
    orderDetails.innerHTML = orderInfo;
    // Відображення розділу з деталями замовлення
    var myOrdersSection = document.getElementById("my-orders");
    var orderDetailsSection = document.getElementById("order-details");
    myOrdersSection.style.display = "none";
    orderDetailsSection.style.display = "block";
}

// Функція для видалення замовлення зі списку
function deleteOrder(orderIndex) {
    orders.splice(orderIndex, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    showMyOrders(); // Оновлюємо список замовлень після видалення
    showMyOrdersSection(); // Переключаємося на розділ "Мої замовлення"
}

// Функція для відображення розділу "Мої замовлення"
function showMyOrdersSection() {
    var myOrdersSection = document.getElementById("my-orders");
    var orderDetailsSection = document.getElementById("order-details");
    myOrdersSection.style.display = "block";
    orderDetailsSection.style.display = "none";
}

// Функція для переключення на розділ "Деталі замовлення"
function showOrderDetailsSection() {
    var myOrdersSection = document.getElementById("my-orders");
    var orderDetailsSection = document.getElementById("order-details");
    myOrdersSection.style.display = "none";
    orderDetailsSection.style.display = "block";
}
