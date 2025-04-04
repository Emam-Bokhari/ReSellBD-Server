import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ListingRoutes } from '../modules/Listing/listing.route';
import { TransactionRoutes } from '../modules/Transaction/transaction.route';
import { PaymentRoutes } from '../modules/Payment/payment.route';
import { AnalyticsRoutes } from '../modules/Analytics/analytics.route';
import { NewsLetterRoutes } from '../modules/NewsLetter/newsLetter.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { ContactRoutes } from '../modules/Contact/contact.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/listings',
    route: ListingRoutes,
  },
  {
    path: '/newsLetters',
    route: NewsLetterRoutes,
  },
  {
    path: '/transactions',
    route: TransactionRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/contacts',
    route: ContactRoutes,
  },
  {
    path: '/analytics',
    route: AnalyticsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
