/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
const { discount, sale_price, quantity } = purchase;
const revenue = sale_price * quantity * (1 - discount / 100)
return revenue
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
   const { profit } = seller;
   if (index === 0) {
    return profit * 0.15;
} else if (index === 1 || index === 2) {
    return profit * 0.10;
} else if (index === total - 1) {
    return 0;
} else {
    return profit * 0.05;
}
}
/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
    // Проверка входных данных
    if (
        !data ||
        !Array.isArray(data.sellers) ||
        data.sellers.length === 0 ||
        !Array.isArray(data.products) ||
        data.products.length === 0 ||
        !Array.isArray(data.purchase_records) ||
        data.purchase_records.length === 0
    ) {
        throw new Error("Некорректные входные данные")
    }

    // Проверка наличия опций
    const { calculateRevenue, calculateBonus } = options
if (typeof calculateRevenue !== "function") {
    throw new Error("calculateRevenue должна быть функцией")
}
if (typeof calculateBonus !== "function") {
    throw new Error("calculateBonus должна быть функцией")
}

    // Подготовка промежуточных данных для сбора статистики
    const sellerStats = data.sellers.map(seller => {
return {
id: seller.id,
name: `${seller.first_name} ${seller.last_name}`,
revenue: 0,
profit: 0,
sales_count: 0,
products_sold: {}
}
})

    // Индексация продавцов и товаров для быстрого доступа

const sellerIndex = {}
sellerStats.forEach(seller => {
sellerIndex[seller.id] = seller
})

const productIndex = {}
data.products.forEach(product => {
productIndex[product.sku] = product
})


    // Расчет выручки и прибыли для каждого продавца
data.purchase_records.forEach(record => {
    const seller = sellerIndex[record.seller_id]

    seller.sales_count += 1
    seller.revenue += record.total_amount

    record.items.forEach(item => {
        const product = productIndex[item.sku]

        const cost =
            product.purchase_price * item.quantity

        const profit =
            calculateRevenue(item, product) - cost

        seller.profit += profit

        if (!seller.products_sold[item.sku]) {
            seller.products_sold[item.sku] = 0
        }

        seller.products_sold[item.sku] += item.quantity
    })
})


    // Сортировка продавцов по прибыли
    sellerStats.sort((a, b) => b.profit - a.profit
)


    // Назначение премий на основе ранжирования
    sellerStats.forEach((seller, index) => {
        seller.bonus = calculateBonus(
        index,
        sellerStats.length,
        seller
	)
seller.top_products = Object
.entries(seller.products_sold)
.map(([sku, quantity]) => {
        return {
            sku,
            quantity
        }
    })
.sort((a, b) => b.quantity - a.quantity)
.slice(0, 10);
})

    // Подготовка итоговой коллекции с нужными полями
    return sellerStats.map(seller => ({
    seller_id: seller.id,
    name: seller.name,
    revenue: +seller.revenue.toFixed(2),
    profit: +seller.profit.toFixed(2),
    sales_count: seller.sales_count,
    top_products: seller.top_products,
    bonus: +seller.bonus.toFixed(2)
}
));
}
