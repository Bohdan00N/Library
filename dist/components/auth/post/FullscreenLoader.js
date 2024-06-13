import { jsx as _jsx } from "react/jsx-runtime";
import { Spin } from 'antd';
const FullScreenLoader = () => {
    return (_jsx("div", { children: _jsx(Spin, { size: "large" }) }));
};
export default FullScreenLoader;
