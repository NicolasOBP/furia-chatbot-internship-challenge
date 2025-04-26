import { styles } from "../../style";
import botIcon from "../../imgs/furiaLogo.png";

export const TypingAnimation = ({ isTyping }: { isTyping: boolean }) => {
  if (isTyping) {
    return (
      <div style={{ ...styles.messageRow, justifyContent: "flex-start" }}>
        <img src={botIcon} style={styles.icon} alt="bot" />
        <div style={{ ...styles.bubble, backgroundColor: "#333" }}>
          <span style={styles.text}>Digitando...</span>
        </div>
      </div>
    );
  }
  return <div></div>;
};
