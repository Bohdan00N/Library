"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var registerSchema = (0, zod_1.object)({
    name: (0, zod_1.string)().min(1, "Full name is required").max(100),
    email: (0, zod_1.string)()
        .min(1, "Email address is required")
        .email("Email Address is invalid"),
    password: (0, zod_1.string)()
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});
var loginSchema = (0, zod_1.object)({
    email: (0, zod_1.string)()
        .min(1, "Email address is required")
        .email("Email Address is invalid"),
    password: (0, zod_1.string)()
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});
