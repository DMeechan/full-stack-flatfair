# flatfair

> Full stack challenge for flatfair

## Build Setup

``` bash
# install dependencies
$ yarn install

# run unit & end to end tests with Cypress
$ yarn test

# serve Vue.js & Nuxt.js front-end with hot reload at localhost:3000
# AND a local serverless Netlify lambda server on localhost:9000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project from Nuxt.js
$ yarn run generate
```

For a detailed explanation on how things work with Nuxt.js, checko ut the [Nuxt.js docs](https://nuxtjs.org).

## Architecture

This project is using a number of modern web technologies:

### Front-end

- [Vue.js](https://vuejs.org/) for building the web app
- [Ant Design Vue](https://github.com/vueComponent/ant-design-vue) CSS framework
- [Nuxt.js](https://nuxtjs.org/) for server-side rendering
- [Vuex](https://vuex.vuejs.org/) for state management (used minimally here - just for storing the data for the `details` page after submitting a flatbond)
- [Apollo client](https://github.com/apollographql/apollo-client) for communicating with the GraphQL API
- [Netlify](http://netlify.com) to host the front-end code

### Back-end

- [Netlify Functions](https://www.netlify.com/features/functions/) to host a serverless back-end
- [Netlify Lamda](https://github.com/netlify/netlify-lambda) for serving Netlify Functions locally- 
- [Apollo Server](https://github.com/apollographql/apollo-server) to serve a GraphQL API
- [Node.js](https://nodejs.org/en/)


Other tools

- [Cypress](https://www.cypress.io/) for unit testing and end-to-end testing
- [Git](https://git-scm.com/) version control

### Where is this hosted?

On Netlify. The Nuxt.js front-end is being served by Netlify (with server-side rendering) and the serverless GraphQL API server is running on Netlify Functions.

Why Netlify? It's free. It's pretty easy to use. It's super fast.

Visit the [live demo]().

## Design

### Screenshots

### Web client pages

#### Create

- URL: `/create/:client_id`
- Contains a form for users to enter flatbonds details
- Contains a 'submit' button to POST the flatbond details to `/flatbond`
- All 404s redirect to `/create/1`

On page load, we send a request to the API server: `config(id: client_id)`. Why? 

Because we need to know if there is a `fixed_membership_fee` for the user. Without this, we wouldn't know if the user has a fixed membership fee, so our estimates would be incorrect. 

The API will tell us if the client has a fixed membership, and (if so) how much it costs. If they have a fixed membership fee, we'll use that value (plus 20% VAT) to calculate their membership fee.

Otherwise, the membership fee will be 1 week of rent + VAT (with a minimum of £120 + VAT).

Given that there is no persistence in the back-end (because there's no database and the data stored in memory has a short lifespan (because of serverless)), there are just three configs set up in the database.

1 and 3 do not have a fixed membership fee. 2 has a fixed membership fee.

So you can switch between the pages `/create/1` and `/create/2` to view the difference between the two.

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
    createFlatbond(rent: 50000, membership_fee: 12000, postcode: "AWS EC2", client_id: 1) {
        rent
        membership_fee
        postcode
        client_id
    }
}
```

## Difficulties

I figured that this project would be a great opportunity to learn serverless (which it sure has been), but it ended up slowing me down much more than expected.

The toughest part of this project has certainly been using Apollo lambda server together with Netlify and Nuxt.js. With all three cutting-edge technologies combined, there were a few difficulties: error messages are often lackluster (and sometimes non-existent), tools for debugging don't really seem to exist, there isn't a great deal of documentation & examples online.

So why choose them in the first place? Recently I've been programming almost exclusively in Elixir, so why come back to JavaScript for this project?

To **learn** serverless and **to keep pushing myself outside of my comfort zone**. Working with cutting-edge tooling can sometimes feel like running up an infinite mountain, but it can also be a great way to keep yourself pushing in the direction of growth.

Unfortunately, though, this came at the cost of stress and time. The greatest challenge was one of the libraries (I'm looking at you, Apollo Server Lambda) being *very* picky about tiny details but often the error messages and stack trace gave zero guidance on the source of the problem. This lead to losing a couple hours just trying to debug *tiny* issues because they were near-impossible to track down with Apollo. As a result, this project ultimately took me longer to build than the 5 hours that I'd originally allocated.

However, looking beyond the scope of just this project, I've now got a much stronger understanding on the benefits and drawbacks of serverless & GraphQL (as a developer) and a healthy dose of perspective.