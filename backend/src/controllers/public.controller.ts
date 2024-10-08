import { NextFunction, Request, Response, Router } from 'express'
import HttpException from '../models/http-exception.model'
import {
  getRestaurants,
  getRestaurantById,
  getDishesByRestaurantId,
  getDishByDishId,
  getDishCategoriesByRestaurantId,
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

router.get(
  '/restaurants/:restaurantId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const restaurantId = parseInt(req.params.restaurantId)
      if (isNaN(restaurantId)) {
        throw new HttpException(400, 'Invalid restaurant id')
      }
      const restaurant = await getRestaurantById(restaurantId)
      res.json({ status: 'success', restaurant })
    } catch (error) {
      next(error)
    }
  },
)

router.get(
  '/restaurants/:restaurantId/dishes',
  async (
    req: Request<{ restaurantId: string }, {}, {}, PaginationQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    const paginationValues = validatePaginationQuery(req.query)
    if (paginationValues instanceof HttpException) {
      next(paginationValues)
    } else {
      try {
        const restaurantId = parseInt(req.params.restaurantId)
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

// TODO: Implement this endpoint so that it will return only a list of dish category names
router.get(
  '/restaurants/:restaurantId/dish-categories',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const restaurantId = parseInt(req.params.restaurantId)
      if (isNaN(restaurantId)) {
        throw new HttpException(400, 'Invalid restaurant id')
      }
      const dishCategories = await getDishCategoriesByRestaurantId(restaurantId)
      res.json({ status: 'success', dishCategories })
    } catch (error) {
      next(error)
    }
  },
)

export default router
