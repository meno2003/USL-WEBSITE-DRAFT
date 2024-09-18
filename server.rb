require 'stripe'
require 'sinatra'

Stripe.api_key = ENV['STRIPE_SECRET_KEY']

set :port, 4242

YOUR_DOMAIN = 'https://universitysuperleague.com/'

post '/create-checkout-session' do
  content_type 'application/json'

  session = Stripe::Checkout::Session.create({
    line_items: [{
      price: 'price_1Q01j6HThqRnB4qJKwGEGYWD',
      quantity: 1,
    }],
    mode: 'payment',
    success_url: YOUR_DOMAIN + '/success.html',
    cancel_url: YOUR_DOMAIN + '/cancel.html',
  })
  status 200
  { url: session.url }.to_json # Return the session URL as JSON
end