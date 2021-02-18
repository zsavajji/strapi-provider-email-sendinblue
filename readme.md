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

| Variable                 | Type   | Description                                                    | Required | Default   |
| ------------------------ | ------ | -------------------------------------------------------------- | -------- | --------- |
| provider                 | string | The name of the provider you use                               | yes      |           |
| providerOptions          | object | Provider options                                               | yes      |           |
| providerOptions.apiKey   | object | Api key given to the function setApiKey                        | yes      |           |
| settings                 | object | Settings                                                       | no       | {}        |
| settings.defaultFrom     | string | Default sender mail address                                    | no       | undefined |
| settings.defaultFromName | string | Default name of the sender                                     | no       | undefined |
| settings.defaultReplyTo  | string | Default address or addresses the receiver is asked to reply to | no       | undefined |

### Example

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
