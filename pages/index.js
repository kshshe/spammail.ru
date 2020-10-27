import { useEffect, useState } from "react";
import uniqid from "uniqid";
import Head from "next/head";
import { Container, Header, Form, Input, Divider } from "semantic-ui-react";
import useLocalState from "../hooks/useLocalState";
import MailList from "../components/MailList";
import { DOMAIN } from "../constants";

export default function Home() {
  const [mail, setMail] = useLocalState("", "mail");
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    if (!mail) {
      setMail(uniqid());
    }
    setFirstRender(false);
  }, [firstRender, mail]);

  if (firstRender) {
    return null;
  }

  return (
    <>
      <Head>
        <title>SpamMail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header as="h1">SpamMail</Header>
        <Divider />
        <Form>
          <Form.Group inline>
            <Form.Field>
              <Input
                placeholder="address"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              <label>@{DOMAIN}</label>
            </Form.Field>
          </Form.Group>
        </Form>
        <Divider />
        {mail && <MailList mail={mail} />}
      </Container>
    </>
  );
}
