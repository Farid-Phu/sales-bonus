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
}
)

const productIndex = {}
data.products.forEach(product => {
productIndex[product.sku] = product
}
)



console.log(productIndex);

    // @TODO: Расчет выручки и прибыли для каждого продавца

    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями
}
