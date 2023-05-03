import IResponse from '../interfaces/response.interface';
import productModel from '../models/product.model';
import IProduct from '../interfaces/product.interface';
import logger from '../../lib/logger';

export default class ProductController {

    createProduct(product: IProduct): Promise<IResponse> {
        logger.info(`creating ${product}`)
        return new Promise ((resolve, reject) => {
            if (!product) {
                return reject ({ ok: false, message: 'Parametros incorrectos', response: null, code:400 })
            }
            productModel.create(product).then((res: any) => {
                    logger.info(`${product}fue agregado correctamente`)
                    return resolve ({ ok: true, message: 'producto agregado correctamente', response: res, code:201 })
                }).catch((err: any) =>{
                    logger.error(err)
                    return reject({ ok: false, message: 'Error del servidor', response: err, code:500 })
                }
            )
        }
    )}
    
    readProductByCategory(category: string): Promise<IResponse> {
        const regexp = new RegExp(category, 'i')
        return new Promise(async(resolve, reject) =>{
            if (!category){
                    return reject({ok: false, message: 'parametros incorrectos', response: null, code: 500 })
                }
                try{
                    const result: any = await productModel.find({ category: regexp}) 
                    if (result.length < 1){
                        return reject({ok: false, message: 'producto no encontrado', response: null, code: 404})
                    }
                    return resolve({ ok: true, message: 'Producto encontrado', response: result, code: 200 })
                }catch(e){
                    return reject({ ok: false, message: 'Error del servidor', response: e, code:500 })

                }
            }
        )
    }

    readProductByName(name: string): Promise<IResponse> {
        const regexp = new RegExp(name, 'i')
        return new Promise(async(resolve, reject) =>{
            if (!name){
                    return reject({ok: false, message: 'parametros incorrectos', response: null, code: 500 })
                }
                try{
                    const result: any = await productModel.find({ name: regexp}) 
                    if (result.length < 1){
                        return reject({ok: false, message: 'producto no encontrado', response: null, code: 404})
                    }
                    return resolve({ ok: true, message: 'Producto encontrado', response: result, code: 200 })
                }catch(e){
                    return reject({ ok: false, message: 'Error del servidor', response: e, code:500 })
                }
            }
        )
    }
    
    populateProducts(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const products = [
                    {
                        name: 'Samsung Galaxy',
                        category: 'electronics'
                    },
                    {
                        name: 'Motorola V3',
                        category: 'electronics'
                    },
                    {
                        name: 'Iphone 12',
                        category: 'electronics'
                    },
                    {
                        name: 'Skippy',
                        category: 'grocery_store'
                    }
                ]

                const data = await productModel.find({})

                if (data && data.length < 1) {
                    for( let product of products) {
                        try {
                            await this.createProduct(product)
                            logger.info(`Product created ${product}`)
                        } catch(e) {
                            logger.error(e)
                            return reject(false)
                        }
                    }
                }
                return resolve(true)
            } catch(e) {
                logger.error(e)
                return reject(false)
            }
        })
    }
}