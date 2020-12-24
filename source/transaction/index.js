"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var log_1 = require("./decorators/log");
var Transaction = /** @class */ (function () {
    function Transaction() {
        this.store = {};
        this.logs = undefined;
    }
    /**
     * this function is protected by seal and it cannot be changed
     * @param Array<IScenario>
     */
    Transaction.prototype.dispatch = function (scenarios) {
        return __awaiter(this, void 0, void 0, function () {
            var i, step, silent, storeBefore, storeAfter, e_1, j, err_1, storeAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scenarios.sort(function (curr, next) {
                            return curr.index > next.index ? 1 : -1;
                        });
                        if (scenarios[0].index < 0) {
                            throw new Error("index must not be negative");
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < scenarios.length)) return [3 /*break*/, 14];
                        step = scenarios[i];
                        silent = false;
                        if (step.hasOwnProperty('silent'))
                            silent = step.silent;
                        storeBefore = __assign({}, this.store);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 13]);
                        return [4 /*yield*/, step.call(this.store)];
                    case 3:
                        _a.sent();
                        storeAfter = __assign({}, this.store);
                        this.logs.push(__assign(__assign({}, step), { storeBefore: storeBefore, storeAfter: storeAfter, error: null }));
                        return [3 /*break*/, 13];
                    case 4:
                        e_1 = _a.sent();
                        if (!!silent) return [3 /*break*/, 11];
                        if (this.logs !== undefined) {
                            this.logs.push(__assign(__assign({}, step), { error: { name: e_1.name, message: e_1.message, stack: e_1.stack } }));
                        }
                        j = i - 1;
                        _a.label = 5;
                    case 5:
                        if (!(j >= 0)) return [3 /*break*/, 10];
                        if (!scenarios[j].restore) return [3 /*break*/, 9];
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, scenarios[j].restore(null)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _a.sent();
                        throw err_1;
                    case 9:
                        j--;
                        return [3 /*break*/, 5];
                    case 10:
                        this.store = null;
                        return [3 /*break*/, 14];
                    case 11:
                        storeAfter = this.store;
                        this.logs.push(__assign(__assign({}, step), { storeBefore: storeBefore, storeAfter: storeAfter, error: { name: e_1.name, message: e_1.message, stack: e_1.stack } }));
                        _a.label = 12;
                    case 12: return [3 /*break*/, 13];
                    case 13:
                        i++;
                        return [3 /*break*/, 1];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    Transaction = __decorate([
        log_1.Log
    ], Transaction);
    return Transaction;
}());
exports["default"] = Transaction;
