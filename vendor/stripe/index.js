class Stripe {
  constructor() {}
  checkout = { sessions: { create: async () => ({ url: 'https://example.com' }) } };
}
module.exports = function(key) { return new Stripe(); };
