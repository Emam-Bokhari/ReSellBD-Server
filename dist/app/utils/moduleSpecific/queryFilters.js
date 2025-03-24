'use strict';
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, '__esModule', { value: true });
exports.excludeDeletedAggregation = exports.excludeDeletedQuery = void 0;
const excludeDeletedQuery = function (next) {
  this.where({ isDeleted: false });
  next();
};
exports.excludeDeletedQuery = excludeDeletedQuery;
const excludeDeletedAggregation = function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  this.pipeline().unshift({ $project: { isDeleted: 0 } });
  next();
};
exports.excludeDeletedAggregation = excludeDeletedAggregation;
