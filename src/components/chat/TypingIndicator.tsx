
import LoadingDots from "./LoadingDots";
import { motion } from "framer-motion";

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="chat-message bot-message !py-2"
    >
      <LoadingDots />
    </motion.div>
  );
};

export default TypingIndicator;
