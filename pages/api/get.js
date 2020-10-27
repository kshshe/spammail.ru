import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import _ from "lodash";

var config = {
  imap: {
    user: "mail@spammail.ru",
    password: "goxqic-xufwYn-fenqu6",
    host: "imap.yandex.ru",
    port: 993,
    tls: true,
  },
};

export default async (req, res) => {
  const { mail } = req.query;
  if (!mail) {
    res.statusCode = 400;
    res.json({});
    return;
  }
  res.statusCode = 200;

  const connection = await imaps.connect(config);
  await connection.openBox("INBOX");
  const searchCriteria = [["TO", mail]];
  const fetchOptions = {
    bodies: ["HEADER", "TEXT", ""],
  };
  const messages = await connection.search(searchCriteria, fetchOptions);
  const data = [];
  await Promise.all(
    messages.map(async (item) => {
      const all = _.find(item.parts, { which: "" });
      const id = item.attributes.uid;
      const idHeader = "Imap-Id: " + id + "\r\n";
      const mail = await simpleParser(idHeader + all.body);
      data.push(mail);
    })
  );
  await connection.closeBox("INBOX");
  await connection.end();

  res.json({ data });
};
