import moment from "moment";
import { Header, Segment } from "semantic-ui-react";

const MailItem = ({ item }) => (
  <Segment>
    <Header>{item.subject}</Header>
    <div>{moment(item.date).locale("ru").calendar()}</div>
    {item.html && <div dangerouslySetInnerHTML={{ __html: item.html }}></div>}
    {!item.html && <div>{item.text}</div>}
  </Segment>
);

export default MailItem;
