const { MercadoPagoConfig, Preference } = require('mercadopago');
const axios = require('axios');

const client = new MercadoPagoConfig({ 
    accessToken: "APP_USR-2132570145427976-111317-72119888dfc6da9efb01f11a27cb84ec-2087455307",
    options: { timeout: 5000 }
});

const createOrder = async (req, res) => {
    try {
        const preference = new Preference(client);
        
        const body = {
            items: [
                {
                    title: "Suscripcion impulsa",
                    unit_price: 10000,
                    currency_id: "CLP",
                    quantity: 1
                }
            ],
            back_urls: {
                success: "https://localhost:4000/success",   // URL de éxito
                failure: "https://localhost:4000/failure",    // URL de fallo
                pending: "https://localhost:4000/pending"   // URL de pago pendiente
            },
            notification_url: "https://e6e4-201-189-99-173.ngrok-free.app/webhook" // Redirige automáticamente si el pago es aprobado
        };

        const result = await preference.create({ body });
        
        // Verifica el resultado en la consola antes de enviarlo al cliente
        console.log("Resultado de la creación de orden:", result.body);

        // Envía la respuesta
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error al crear la orden:", error);
        return res.status(500).json({ error: error.message });
    }
};

const receiveWebhook = async (req, res) => {
    const payment = req.query

    try{
        if (payment.type === "payment"){
            const data = await MercadoPagoConfig.payment.get(payment["data.id"]);
            console.log(data)
        }
        res.status(204).send();

    }catch (error) {
        console.log(error)
        return res.sendStatus(500).json({error: error.message})

    }
}


module.exports = { createOrder,
    receiveWebhook,
 };
