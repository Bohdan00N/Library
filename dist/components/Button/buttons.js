import { jsx as _jsx } from "react/jsx-runtime";
import { Button, Form } from "antd";
export const CustomButton = ({ children, htmlType = "button", type, danger, disabled, loading, shape, icon, onClick, size, ghost = false, }) => {
    return (_jsx(Form.Item, { children: _jsx(Button, { style: {
                paddingBottom: "45px",
                width: "30vh",
                fontSize: "25px",
            }, htmlType: htmlType, type: type, disabled: disabled, danger: danger, loading: loading, shape: shape, icon: icon, onClick: onClick, ghost: ghost, size: size, children: children }) }));
};
