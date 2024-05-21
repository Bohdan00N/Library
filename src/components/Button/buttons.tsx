import React from "react";
import { Button, Form } from "antd";
type Props = {
  children: React.ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  type?: "default" | "link" | "text" | "primary" | "dashed" | undefined;
  danger?: boolean;
  loading?: boolean;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: React.ReactNode;
  ghost?: boolean;
  disabled?: boolean;
  size?: "large" | "middle" | "small" | undefined;
 
};

export const CustomButton = ({
  children,
  htmlType = "button",
  type,
  danger,
  disabled,
  loading,
  shape,
  icon,
  onClick,
  size,
  ghost = false,
}: Props) => {
  return (
    <Form.Item>
      <Button
        style={{
          paddingBottom: "45px",
          width: "30vh",
          fontSize: "25px",
        }}
        htmlType={htmlType}
        type={type}
        disabled={disabled}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
        ghost={ghost}
        size={size}
        
      >
        {children}
      </Button>
    </Form.Item>
  );
};
