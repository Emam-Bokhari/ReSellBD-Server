"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/Auth/auth.route");
const user_route_1 = require("../modules/User/user.route");
const listing_route_1 = require("../modules/Listing/listing.route");
const transaction_route_1 = require("../modules/Transaction/transaction.route");
const payment_route_1 = require("../modules/Payment/payment.route");
const analytics_route_1 = require("../modules/Analytics/analytics.route");
const newsLetter_route_1 = require("../modules/NewsLetter/newsLetter.route");
const blog_route_1 = require("../modules/Blog/blog.route");
const contact_route_1 = require("../modules/Contact/contact.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/listings',
        route: listing_route_1.ListingRoutes,
    },
    {
        path: '/newsLetters',
        route: newsLetter_route_1.NewsLetterRoutes,
    },
    {
        path: '/transactions',
        route: transaction_route_1.TransactionRoutes,
    },
    {
        path: '/payments',
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/contacts',
        route: contact_route_1.ContactRoutes,
    },
    {
        path: '/analytics',
        route: analytics_route_1.AnalyticsRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
