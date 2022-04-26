export default function ({ req }) {
  if (process.server) {
    // https://github.com/nuxt/nuxt.js/issues/2914
    const ip = req.connection || req.socket
    console.log('ip address');
    console.log(ip)
  }
}