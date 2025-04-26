import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import botIcon from "../../imgs/furiaLogo.png";
import { styles } from "../../style";

type ChatIconProps = {
  isUser: boolean;
  position: "left" | "right";
};

export const ChatIcon = ({ isUser, position }: ChatIconProps) => {
  if (isUser && position === "right") {
    return (
      <FontAwesomeIcon
        icon={faUser}
        size="2x"
        color="#fff"
        style={{ marginLeft: 8 }}
      />
    );
  }

  if (!isUser && position === "left") {
    return <img src={botIcon} style={styles.icon} alt="bot" />;
  }

  return <div></div>;
};
