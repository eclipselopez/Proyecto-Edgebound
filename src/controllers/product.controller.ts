import logger from '../../lib/logger';
import IProduct from '../interfaces/product.interface';
import IResponse from '../interfaces/response.interface';
import Product from '../models/product.model'


export default class ProductController {
    registerProduct(product: IProduct): Promise<IResponse> {
        logger.info(`creating ${product}`)
        return new Promise ((resolve, reject) => {
            if (!product) {
                return reject ({ ok: false, message: 'datos incorrectos', response: null, code:400 })
            }
            Product.create(product).then((res: any) => {
                logger.info(`${product} creado exitosamente`)
                return resolve({ ok: true, message: 'producto creado con exito', response: res, code: 201})
                }).catch((err: any) => {
                logger.error(err)
                return reject({ ok: false, message: 'Error del servidor', response: err, code:500 })
            })
        })
    }

    getAllForRegExp(value: string): Promise<IResponse> {
        const regexp = new RegExp(value, 'i');

        return new Promise(async(resolve, reject) => {
            try {
                const result: any = await Product.find({ name: regexp })
                if ( result.length < 1 ) {
                    return reject({ok: false, message: 'producto no encontrado', response: null, code: 404})
                }

                return resolve({ ok: true, message: 'Producto encontrado', response: result, code: 200 })
            }catch(e) {
                return reject({ ok: false, message: 'Error del servidor', response: e, code:500 })
            }
        })
    }

    surgeryProduct(category: string): Promise<IResponse> {
        return new Promise(async(resolve, reject) => {
            try {
                const result: any = await Product.find({ category: category })
                if ( result.length < 1 ) {
                    return reject({ok: false, message: 'producto no encontrado', response: null, code: 404})
                }
                const suggestion = result.slice(0, 2)
                
                return resolve({ ok: true, message: 'Producto encontrado', response: suggestion, code: 200 })
            }catch(e) {
                return reject({ ok: false, message: 'Error del servidor', response: e, code:500 })
            }
        })
    }  
}