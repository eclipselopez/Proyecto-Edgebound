"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../lib/logger"));
const product_model_1 = __importDefault(require("../models/product.model"));
class ProductController {
    registerProduct(product) {
        logger_1.default.info(`creating ${product}`);
        return new Promise((resolve, reject) => {
            if (!product) {
                return reject({ ok: false, message: 'datos incorrectos', response: null, code: 400 });
            }
            product_model_1.default.create(product).then((res) => {
                logger_1.default.info(`${product} creado exitosamente`);
                return resolve({ ok: true, message: 'producto creado con exito', response: res, code: 201 });
            }).catch((err) => {
                logger_1.default.error(err);
                return reject({ ok: false, message: 'Error del servidor', response: err, code: 500 });
            });
        });
    }
    getAllForRegExp(value) {
        const regexp = new RegExp(value, 'i');
        return new Promise((resolve, reject) => {
            product_model_1.default.find({ name: regexp }).then((res) => {
                if (!res || res.length == 0) {
                    return reject({ ok: false, message: 'producto no encontrado', response: null, code: 404 });
                }
                return resolve({ ok: true, message: 'Producto encontrado', response: res, code: 200 });
            }).catch((err) => {
                return reject({ ok: false, message: 'Error del servidor', response: err, code: 500 });
            });
        });
    }
    surgeryProduct(category) {
        return new Promise((resolve, reject) => {
            product_model_1.default.find({ category: category }).then((res) => {
                if (!res || res.length == 0) {
                    return reject({ ok: false, message: 'producto no encontrado', response: null, code: 404 });
                }
                return resolve({ ok: true, message: 'Producto encontrado', response: res, code: 200 });
            }).catch((err) => {
                return reject({ ok: false, message: 'Error del servidor', response: err, code: 500 });
            });
        });
    }
}
exports.default = ProductController;
