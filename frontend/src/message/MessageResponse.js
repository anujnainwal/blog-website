import { message } from "antd";

const MessageResponse = ({ type, content }) => {
  function showNotification() {
    if (type === "success") {
      return message.success(`${content}`);
    } else if (type === "error") {
      return message.error(`${content}`);
    }
  }
  showNotification();
  return null;
};

export default MessageResponse;
