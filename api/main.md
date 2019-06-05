# Documentation of the Backend part

> Deliverable D1

## General group information

| Member n. | Role           | First name   | Last Name    | Matricola   | Email address                         | 
| --------- | -------------- | ------------ | ------------ | ----------- | ------------------------------------- |
| 1         | administrator  | Alberto      | Frattini     | 898440      | alberto.frattini@mail.polimi.it       |
| 2         | member         | Gabriele     | Ghiringhelli | 914499      | gabriele.ghiringhelli@mail.polimi.it  |

## Links to other deliverables

- Deliverable D0: the web application is accessible at
  [this address](https://example.com).

- Deliverable D2: the YAML or JSON file containing the specification of the app
  API can be found at [this address](https://example.com/backend/spec.yaml).

- Deliverable D3: the SwaggerUI page of the same API is available at
  [this address](https://example.com/backend/swaggerui).

- Deliverable D4: the source code of D0 is available as a zip file at
  [this address](https://example.com/backend/app.zip).

- Deliverable D5: the address of the online source control repository is
  available [this address](https://examplegit.com). We hereby declare that this
  is a private repository and, upon request, we will give access to the
  instructors.

## Specification

### Web Architecture

Describe here, with a diagram, the components of your web application and how
they interact. Highlight which parts belong to the application layer, data layer
or presentation layer. How did you ensure that HTML is not rendered server side?

### API

#### REST compliance

Describe here to what extent did you follow REST principles and what are the
reasons for which you might have decided to diverge. Note, you must not describe
the whole API here, just the design decisions.

#### OpenAPI Resource models

Describe here synthetically, which models you have introduced for resources.

### Data model

Describe with an ER diagram the model used in the data layer of your web
application. How these map to the OpenAPI data model?

## Implementation

### Tools used

Tools, languages and frameworks used for the backend of the application:
- JavaScript as main programming language
- Node.js as run-time environment
- Swagger framework
- PostgreSQL as database
- Main NPM modules: express, express-session, swagger, knex, pg, bcrypt and joi.

### Discussion

- How did you make sure your web application adheres to the provided OpenAPI
  specification?
- Why do you think your web application adheres to common practices to partition
  the web application (static assets vs. application data)
- There are two action that can be performed only if a user is registered and logged into the platform: Adding and checking the cart. To do so, we have used 'express-session' and, attaching a parameter to the request coming towards the server, we could check if the user is logged in and who this user is and show the content of the cart accordingly. Before logging in, a user must register and can do it through the specific registration page. Then, the user
can log in and start putting books into the cart.
- The data model have been managed through a relational database: PostgreSQL.

## Other information

### Task assignment

- Alberto worked on front end (30%) and OpenAPI Spec (80% of the time)
- Gabriele worked on front end (70%) and OpenAPI Spec (20% of the time)

### Analysis of existing API

Describe here if you have found relevant APIs that have inspired the OpenAPI specification and why (at least two).

### Learning outcome

What was the most important thing all the members have learned while developing
this part of the project, what questions remained unanswered, how you will use
what you've learned in your everyday life?

Examples:
- Foo learned to write SQL queries and Javascript but wanted to know more about
  caching, he's probably going to create his own startup with what she has
  learned
- Bar learned how to deploy on a cloud platform, he would have liked to know
  more about promises for asynchronous code..