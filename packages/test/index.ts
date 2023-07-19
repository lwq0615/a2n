import openServer from "@/start"

openServer((config) => {
  console.log("server start " + config.port);
})




