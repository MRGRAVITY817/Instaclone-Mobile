module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    service: {
      name: "instaclone-backend",
      url: "http://localhost:4334/graphql",
    },
  },
};
