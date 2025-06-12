const productCategories = [
    { id: 1, name: 'Fruits', icon: '🍎' },
    { id: 2, name: 'Vegetables', icon: '🥕' },
    { id: 3, name: 'Dairy', icon: '🥛' },
    { id: 4, name: 'Meat', icon: '🥩' },
    { id: 5, name: 'Baked Goods', icon: '🍞' },
    { id: 6, name: 'Herbs', icon: '🌿' },
    { id: 7, name: 'Flowers', icon: '🌸' },
    { id: 8, name: 'Honey', icon: '🍯' },
    { id: 9, name: 'Preserves', icon: '🍓' },
    { id: 10, name: 'Crafts', icon: '🎨' }
];

const markets = [
    {
        id: '1',
        name: 'Downtown Farmers Market',
        description: 'A vibrant market in the heart of the city featuring over 50 local vendors offering fresh produce, artisanal goods, and prepared foods.',
        address: '123 Main Street',
        city: 'Springfield',
        state: 'Illinois',
        zipCode: '62701',
        latitude: 39.7817,
        longitude: -89.6501,
        hours: [
            { day: 'Saturday', open: '8:00 AM', close: '2:00 PM' },
            { day: 'Sunday', open: '9:00 AM', close: '1:00 PM' }
        ],
        categories: ['Fruits', 'Vegetables', 'Dairy', 'Baked Goods', 'Honey'],
        imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400',
        averageRating: 4.5,
        vendors: [
            {
                id: '1',
                name: 'Green Valley Farm',
                description: 'Organic fruits and vegetables',
                products: ['Tomatoes', 'Lettuce', 'Carrots', 'Apples']
            }
        ]
    },
    {
        id: '2',
        name: 'Riverside Community Market',
        description: 'Family-friendly market along the riverfront with live music, food trucks, and a diverse selection of local vendors.',
        address: '456 River Road',
        city: 'Springfield',
        state: 'Illinois',
        zipCode: '62702',
        latitude: 39.8017,
        longitude: -89.6401,
        hours: [
            { day: 'Saturday', open: '7:00 AM', close: '3:00 PM' }
        ],
        categories: ['Vegetables', 'Meat', 'Crafts', 'Flowers', 'Preserves'],
        imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
        averageRating: 4.2,
        vendors: [
            {
                id: '2',
                name: 'River Valley Meats',
                description: 'Grass-fed beef and free-range poultry',
                products: ['Beef', 'Chicken', 'Pork', 'Turkey']
            }
        ]
    },
    {
        id: '3',
        name: 'Heritage Square Market',
        description: 'Historic market square featuring traditional crafts, heirloom varieties, and time-honored farming practices.',
        address: '789 Heritage Lane',
        city: 'Springfield',
        state: 'Illinois',
        zipCode: '62703',
        latitude: 39.7617,
        longitude: -89.6301,
        hours: [
            { day: 'Saturday', open: '8:00 AM', close: '4:00 PM' },
            { day: 'Wednesday', open: '3:00 PM', close: '7:00 PM' }
        ],
        categories: ['Fruits', 'Herbs', 'Honey', 'Crafts', 'Baked Goods'],
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
        averageRating: 4.8,
        vendors: [
            {
                id: '3',
                name: 'Heritage Herbs',
                description: 'Medicinal and culinary herbs',
                products: ['Basil', 'Oregano', 'Thyme', 'Lavender']
            }
        ]
    },
    {
        id: '4',
        name: 'Westside Weekly Market',
        description: 'Neighborhood market serving the west side community with affordable fresh produce and local specialties.',
        address: '321 West Avenue',
        city: 'Springfield',
        state: 'Illinois',
        zipCode: '62704',
        latitude: 39.7917,
        longitude: -89.6701,
        hours: [
            { day: 'Tuesday', open: '4:00 PM', close: '8:00 PM' },
            { day: 'Saturday', open: '9:00 AM', close: '2:00 PM' }
        ],
        categories: ['Vegetables', 'Dairy', 'Baked Goods', 'Preserves'],
        imageUrl: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=400',
        averageRating: 4.1,
        vendors: [
            {
                id: '4',
                name: 'Westside Dairy',
                description: 'Fresh milk, cheese, and yogurt',
                products: ['Milk', 'Cheese', 'Yogurt', 'Butter']
            }
        ]
    },
    {
        id: '5',
        name: 'Eastgate Artisan Market',
        description: 'Boutique market specializing in artisanal foods, handcrafted goods, and unique local products.',
        address: '654 East Gate Drive',
        city: 'Springfield',
        state: 'Illinois',
        zipCode: '62705',
        latitude: 39.7717,
        longitude: -89.6101,
        hours: [
            { day: 'Friday', open: '5:00 PM', close: '9:00 PM' },
            { day: 'Saturday', open: '10:00 AM', close: '4:00 PM' }
        ],
        categories: ['Honey', 'Preserves', 'Crafts', 'Flowers', 'Baked Goods'],
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        averageRating: 4.6,
        vendors: [
            {
                id: '5',
                name: 'Golden Hive Apiary',
                description: 'Raw honey and bee products',
                products: ['Honey', 'Beeswax', 'Propolis', 'Royal Jelly']
            }
        ]
    },
    {
        id: '6',
        name: 'Northside Organic Market',
        description: 'Certified organic market featuring sustainable farming practices and eco-friendly vendors.',
        address: '987 North Street',
        city: 'Springfield',
        state: 'Illinois',
        zipCode: '62706',
        latitude: 39.8217,
        longitude: -89.6201,
        hours: [
            { day: 'Saturday', open: '8:00 AM', close: '3:00 PM' },
            { day: 'Sunday', open: '10:00 AM', close: '2:00 PM' }
        ],
        categories: ['Fruits', 'Vegetables', 'Herbs', 'Dairy'],
        imageUrl: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=400',
        averageRating: 4.7,
        vendors: [
            {
                id: '6',
                name: 'Organic Acres',
                description: 'Certified organic produce',
                products: ['Kale', 'Spinach', 'Berries', 'Squash']
            }
        ]
    }
];

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productCategories, markets };
}
