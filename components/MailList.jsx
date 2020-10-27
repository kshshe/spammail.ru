import { useEffect, useState } from "react";
import axios from "axios";
import { DOMAIN } from "../constants";
import { Loader, Header, Segment } from "semantic-ui-react";
import MailItem from "./MailItem";

const getMail = async (mail) => {
  const { data } = await axios.get("/api/get", {
    params: { mail: `${mail}@${DOMAIN}` },
  });
  return data.data;
};

const MailList = ({ mail }) => {
  const [loading, setLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    setShouldLoad(true);
  }, [mail]);
  useEffect(() => {
    const i = setInterval(() => {
      setShouldLoad(true);
    }, 15000);
    return () => clearInterval(i);
  }, []);
  useEffect(() => {
    if (shouldLoad) {
      (async () => {
        setLoading(true);
        const data = await getMail(mail);
        setShouldLoad(false);
        setData(data);
        setLoading(false);
      })();
    }
  }, [shouldLoad, mail]);
  if (data.length === 0 && !loading) {
    return (
      <Segment placeholder>
        <Header icon>
          В {mail}@{DOMAIN} пусто
        </Header>
      </Segment>
    );
  }
  return (
    <>
      {loading && <Loader active inline="centered" />}
      {data.map((item, index) => (
        <MailItem key={index} item={item} />
      ))}
    </>
  );
};

export default MailList;
