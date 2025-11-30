const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event) {
    try {
        const { product } = JSON.parse(event.body);

        let priceId;
        if (product === 'plant_tree') priceId = 'PRICE_ID_FOR_PLANT_TREE';
        if (product === 'shop') priceId = 'PRICE_ID_FOR_SHOP';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1
            }],
            mode: 'payment',
            success_url: window.location.origin + '/success.html',
            cancel_url: window.location.origin + '/cancel.html'
        });

        return { statusCode: 200, body: JSON.stringify({ sessionId: session.id }) };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, body: JSON.stringify({ error: String(err) }) };
    }
};