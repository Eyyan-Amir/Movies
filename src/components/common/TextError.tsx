import React from "react";

const TextError: React.FC = ({ children }) => {
	return <div style={{ color: "red" }}>{children}</div>;
};

export default TextError;
