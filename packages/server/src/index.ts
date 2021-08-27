// import { double } from "@app/lib";
import cors from "cors";
import dayjs from "dayjs";
import Express from "express";
import fs from "fs/promises";
import { createConnection } from "typeorm";

const createTypeORMConnection = () => {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "lukasz",
    password: "xGQSMYSl7WB49jdxcfDAORRdb6f81aqV",
    database: "postgres",
    // entities: [],
    // synchronize: false,
    // logging: false,
  });
};

function LogDecorator(target: Function) {
  console.log(`Log decorator`, target.name);
}

@LogDecorator
class User {
  constructor(public name: string) {}
}

(async () => {
  await createTypeORMConnection();
  const app = Express();

  app.use(cors());
  app.use(Express.urlencoded({ extended: false }));
  app.use(Express.json({ limit: "1mb" }));

  app.get("/", async (request, response) => {
    response
      .status(200)
      .setHeader("content-type", "application/json")
      .end(
        JSON.stringify({
          message: "Hello World",
          date: dayjs("2021-08-27").format("DD/MM/YYYY"),
          // double: double(2),
          files: Array.from(await fs.readdir(process.cwd())),
          user: new User("Łukasz"),
        })
      );
  });
  const port = 9000;
  app.listen({ port }, () => console.log(`Server running on port ${port}`));
})();
