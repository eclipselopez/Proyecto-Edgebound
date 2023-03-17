import { Router, Request, Response } from 'express'
import ProductController from './controllers/product.controller'

const productRoutes = Router()
const productCtrl = new ProductController

productRoutes.post('/register', async(req: Request, res: Response) => {
    const body = req.body

    try {
        const response = await productCtrl.registerProduct(body)
        return res.status(response.code).json(response)
    } catch(err: any) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})

productRoutes.get('/regexp', async(req: Request, res: Response) => {
    const value: any = req.query.reg

    try {
        const response = await productCtrl.getAllForRegExp(value)
        return res.status(response.code).json(response)
    }catch(err:any) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})

productRoutes.get('/:category', async( req: Request, res: Response ) => {
    const category: any = req.params.category

    try {
        const response = await productCtrl.surgeryProduct(category)
        return res.status(response.code).json(response)
    }catch(err: any) {
        return res.status(err.code ? err.code : 500).json(err)
    } 
})

module.exports = productRoutes