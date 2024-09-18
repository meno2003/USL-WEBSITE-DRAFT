require 'stripe'
require 'sinatra'

# This is your test secret API key.
Stripe.api_key = 'pk_live_51PuHlPHThqRnB4qJBgi4Sy5M3m2uIJdVCelHOSbLNc0Qaj56Tdh95UeYiQsb5xYkEZVoXyYnSxnER9mIVR2DE4PC00qHOyvhBx'

set :static, true
set :port, 4242

YOUR_DOMAIN = 'https://universitysuperleague.com/'

post '/create-checkout-session' do
  content_type 'application/json'

  session = Stripe::Checkout::Session.create({
    line_items: [{
      price: 'price_1PvNmDHThqRnB4qJMAtR8VFF',
      quantity: 1,
    }],
    mode: 'payment',
    success_url: YOUR_DOMAIN + 'success.html',
    cancel_url: YOUR_DOMAIN + 'cancel.html',
  })
  redirect session.url, 303
end