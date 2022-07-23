import React from "react";
import { motion } from "framer-motion";

const slideIn = {
  open: { y: "0" },
  close: { y: "100%" },
};

const AnimatedContainer = ({
  children,
  className,
  ...props
}: {
  children: JSX.Element | JSX.Element[];
  className?: string;
}) => {
  return (
    <motion.div
      variants={slideIn}
      initial={"close"}
      animate={"open"}
      exit={"close"}
      transition={{ duration: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
