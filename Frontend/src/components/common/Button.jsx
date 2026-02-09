import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "px-6 py-2.5 rounded-full font-semibold transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2 whitespace-nowrap";

  const variants = {
    primary:
      "bg-[#6739b7] hover:bg-[#5a2e9e] text-white shadow-purple-200",
    outline:
      "border-2 border-[#6739b7] text-[#6739b7] hover:bg-purple-50",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
