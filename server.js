const app = require("./app");
const { PORT, BASE_URL } = require("./util/secrets");

app.listen(PORT, () => {
  console.log(
    `Server is listen on ${BASE_URL} in ${process.env.NODE_ENV} mode`
  );
});
