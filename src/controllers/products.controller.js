export const createProduct = (req, res) => {
    const { body } = req
    return res.json({
        message: 'Producto creado',
        body
    })
}

export const getAllProducts = (req, res) => {
    const { name, price } = req.query;

    if (name) {
        return res.json({
            message: 'Producto por nombre',
            name
        })
    }
    if (price) {
        const priceFloat = parseFloat(price);
        return res.json({
            message: 'Producto por precio',
            priceFloat
        })
    }

    return res.json({
        message: 'Lista de Productos'
    })
}

export const getProductById = (req, res) => {
    const { id } = req.params;

    return res.json({
        message: 'Producto por ID',
        id: parseInt(id)
    })
}