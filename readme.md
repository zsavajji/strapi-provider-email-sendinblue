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

| Variable               | Type   | Description                                                    | Required | Default   |
| ---------------------- | ------ | -------------------------------------------------------------- | -------- | --------- |
| provider               | string | The name of the provider you use                               | yes      |           |
| providerOptions        | object | Provider options                                               | yes      |           |
| providerOptions.apiKey | object | Api key given to the function setApiKey                        | yes      |           |
| settings               | object | Settings                                                       | no       | {}        |
| settings.from          | string | Default sender mail address                                    | no       | undefined |
| settings.fromName      | string | Default name the receiver is asked to reply to                 | no       | undefined |
| settings.replyTo       | string | Default address or addresses the receiver is asked to reply to | no       | undefined |

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
      from: "myemail@mail.com",
      fromName: "My name",
      replyTo: "myemail@mail.com",
    },
  },
  // ...
});
```
