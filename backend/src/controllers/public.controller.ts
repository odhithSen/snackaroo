import { NextFunction, Request, Response, Router } from 'express'
import HttpException from '../models/http-exception.model'
import {
  getRestaurants,
  getRestaurantById,
  getDishesByRestaurantId,
  getDishByDishId,
} from '../services/public.service'
import { PaginationQuery } from '../models/query-interface'
import { validatePaginationQuery } from '../utils/pagination-query-validation'

const router = Router()

router.get(
  '/restaurants',
  async (req: Request<{}, {}, {}, PaginationQuery>, res: Response, next: NextFunction) => {
    const paginationValues = validatePaginationQuery(req.query)
    if (paginationValues instanceof HttpException) {
      next(paginationValues)
    } else {
      try {
        const restaurants = await getRestaurants(paginationValues)
        res.json({ status: 'success', restaurants })
      } catch (error) {
        next(error)
      }
    }
  },
)

router.get('/restaurants/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurantId = parseInt(req.params.id)
    if (isNaN(restaurantId)) {
      throw new HttpException(400, 'Invalid restaurant id')
    }
    const restaurant = await getRestaurantById(restaurantId)
    res.json({ status: 'success', restaurant })
  } catch (error) {
    next(error)
  }
})

router.get(
  '/restaurants/:id/dishes',
  async (
    req: Request<{ id: string }, {}, {}, PaginationQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    const paginationValues = validatePaginationQuery(req.query)
    if (paginationValues instanceof HttpException) {
      next(paginationValues)
    } else {
      try {
        const restaurantId = parseInt(req.params.id)
        if (isNaN(restaurantId)) {
          throw new HttpException(400, 'Invalid restaurant id')
        }
        const dishes = await getDishesByRestaurantId(restaurantId, paginationValues)
        res.json({ status: 'success', dishes })
      } catch (error) {
        next(error)
      }
    }
  },
)

router.get(
  '/restaurants/dishes/:dishId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dishId = parseInt(req.params.dishId)
      if (isNaN(dishId)) {
        throw new HttpException(400, 'Invalid dish id')
      }
      const dish = await getDishByDishId(dishId)
      res.json({ status: 'success', dish })
    } catch (error) {
      next(error)
    }
  },
)

export default router
