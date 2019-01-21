# flatfair

> Full stack challenge with flatfair

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Architecture

I've chosen to use a number of modern web technologies to build this project:

The web client is build using the Vue.js framework and uses Nuxt.js to get server-side rendering out of the box. The design comes from Ant Design, a CSS framework.

The web client communicates to the back-end via a GraphQL API (think of it as an alternative to a REST API). Both the web client and Node.js server are using the Apollo libraries to handle this communication.

Unit testing is handled by ava; end to end testing is handled by Cypress.

So, in summary:

- Vue.js web framework with Nuxt.js (for server-side rendering)
- Ant Design CSS framework
- Apollo client & server libraries for enable the GraphQL API
- Lambda functions running Node.js
- Unit tests with ava
- End to end tests with Cypress

Where is this hosted? On Netlify.

Visit the [live demo]().

## Design

### Web client

Pages:

#### Create

- URL: `/create/:client_id`
- Contains a form for users to enter flatbonds details
- Contains a 'submit' button to POST the flatbond details to `/flatbond`

On page load, we send a request to the API server: `config(id: client_id)`. Why? 

Because we need to know if there is fixed_membership_fee for each user. Without this, our membership fee estimates would be incorrect. 

The response will tell us if the client has a fixed membership, and (if so) how much it costs. If they have a fixed membership fee, we'll use that value (plus 20% VAT) to calculate their membership fee.

If the user does not have a fixed membership fee, the membership fee will be 1 week of rent + VAT (with a minimum of £120 + VAT).

#### Details

- URL: `/details`
- Contains the details of recently-created flatbonds
- Contains a button to go back to the `/create` page

### GraphQL API server

I generally find that a good example can be the best way to understand how something works. So here are some example queries and mutations to demonstrate what the API server does and how you can use it:

#### Configs

```graphql
query {
    config(client_id: 1) {
        client_id
        fixed_membership_fee
        fixed_membership_fee_amount
    }
}
```

```graphql
query {
    configs {
        client_id
        fixed_membership_fee
        fixed_membership_fee_amount
    }
}
```

#### Flatbonds

```graphql
mutation {
    flatbond(rent: 50000, membership_fee: 12000, postcode: "AWS EC2", client_id: 1) {
        rent
        membership_fee
        postcode
        client_id
    }
}
```

## Difficulties

Toughest part: solving a couple of bugs with getting the Apollo server running on Netlify's serverless.