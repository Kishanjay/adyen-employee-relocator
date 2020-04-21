module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  publicPath: process.env.CD_ENV === 'github'
    ? '/adyen-employee-relocator/'
    : '/',
};
