# strapi-provider-email-sendinblue

## Resources

- [License](LICENSE)

## Links

- [Strapi website](https://strapi.io/)
- [Strapi community on Slack](https://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## Prerequisites

You need to have the plugin `strapi-plugin-email` installed in you Strapi project.

## Installation

```bash
# using yarn
yarn add @yanotoma/strapi-provider-email-sendinblue

# using npm
npm install @yanotoma/strapi-provider-email-sendinblue --save
```

## Configuration

### package.json

Since the name of the package has an scope you have to add an alias.

replace `<version>` with the version you have installed. ex. `npm:@yanotoma/strapi-provider-email-sendinblue@1.0.1`

```json

  "dependencies": {
    ...
    "strapi-provider-email-sendinblue": "npm:@yanotoma/strapi-provider-email-sendinblue@<version>"
    ...
  }

```

### Config params

| Variable                 | Type   | Description                                       | Required | Default   |
| ------------------------ | ------ | ------------------------------------------------- | -------- | --------- |
| provider                 | string | The name of the provider you use                  | yes      |           |
| providerOptions          | object | Provider options                                  | yes      |           |
| providerOptions.apiKey   | object | Api key given to the function setApiKey           | yes      |           |
| settings                 | object | Settings                                          | no       | {}        |
| settings.defaultFrom     | string | Default sender mail address                       | no       | undefined |
| settings.defaultFromName | string | Default name of the sender                        | no       | undefined |
| settings.defaultReplyTo  | string | Default address the receiver is asked to reply to | no       | undefined |

#### Example

**Path -** `config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "sendinblue",
    providerOptions: {
      apiKey: env("SENDINBLUE_API_KEY"),
    },
    settings: {
      defaultFrom: "myemail@mail.com",
      defaultFromName: "My name",
      defaultReplyTo: "myemail@mail.com",
    },
  },
  // ...
});
```

## Usage

### Params

| Variable           | Type     | Description                                              | Required                   |
| ------------------ | -------- | -------------------------------------------------------- | -------------------------- |
| to                 | string   | address of the receiver                                  | yes                        |
| from               | string   | address of the sender                                    | no                         |
| fromName           | string   | anme of the sender                                       | no                         |
| replyTo            | string   | address the receiver is asked to reply to                | no                         |
| subject            | string   | subject of the email                                     | yes                        |
| html               | string   | html email body                                          | if there is not templateId |
| text               | string   | text email body                                          | if there is not templateId |
| templateId         | number   | id of the template created in Sendinblue                 | if there is not html       |
| params             | object   | params to tjat will override the template                | no                         |
| tags               | string[] | array of string to add to the transactional email record | no                         |
| contact            | object   | data to add or update a contact                          | no                         |
| contact.email      | string   | address to add to the contacts list                      | yes                        |
| contact.attributes | object   | attributes to add with the email address                 | no                         |

### Examples

```js
// using html and text
const user = {
  name: 'Jhon Doe',
  email: 'jd@mail.com',
};

const html = `<h1>Hello ${user.name}</h1>`;
const text = `Hello ${user.name}`

await strapi.plugins.email.services.email.send({
  to: user.email,
  subject: 'This is a test!'
  html,
  text,
  tags: ['test', 'hello']
});

```

```js
// using template id
const user = {
  name: 'Jhon Doe',
  email: 'jd@mail.com',
};


await strapi.plugins.email.services.email.send({
  to: user.email,
  subject: 'This is a test!'
  templateId: 1,
  params: user,
  tags: ['test', 'hello', 'template']
});

```

```js
// adding a contact

// attributes may change depending on your configuration and language
const contact = {
  email: 'jd@mail.com',
  attributes: {
    'FIRSTNAME': 'Jhon',
    'LASTNAME': 'Doe'
  }
};

const html = `<h1>Hello ${user.attributes.FIRSTNAME}</h1>`;
const text = `Hello ${user.attributes.FIRSTNAME}`

await strapi.plugins.email.services.email.send({
  to: user.email,
  subject: 'This is a test!'
  html,
  text,
  tags: ['test', 'hello'],
  contact
});

```
