const stripe = require('stripe')('sk_test_51IwRCWSI6Fv9GtSrDDUkZJl7uHpWEhVG6onU60tM5JSmTjjBrepELcsTo01Z9x8NrSRu6V8YG5akyGd00I5BO32V00E7BSP4vd')


exports.handler = async (event) => {
    const {typeName, arguments} = event;

    if(typeName !== 'Mutation'){
        throw new Error('Request is not a mutation');
    }

    if(!arguments?.amount){
        throw new Error('Amount argument is required')
    }

    var customer = await stripe.customers.create({
        name: 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        }
    });
    
    // create payment intent

    const paymentIntent = await stripe.paymentIntents.create({
        description: 'Software development services',
        amount:arguments.amount,
        currency:'usd',
        customer:customer.id
    })

    

    return {
        clientSecret: paymentIntent.client_secret,
    }
};
