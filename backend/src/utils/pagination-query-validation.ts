import HttpException from '../models/http-exception.model'
import { PaginationQuery } from '../models/query-interface'

export interface PaginationValues {
  page: number
  limit: number
}

export function validatePaginationQuery(query: PaginationQuery): PaginationValues | HttpException {
  try {
    const page = query.page ? parseInt(query.page) : 1
    const limit = query.limit ? parseInt(query.limit) : 10
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return new HttpException(400, 'Invalid pagination query values')
    }
    if (limit > 1000) {
      return new HttpException(400, 'Invalid pagination limit value')
    }

    return { page, limit }
  } catch (error) {
    if (error instanceof HttpException) {
      return error
    }
    console.error('Error validating pagination query', error)
    return new HttpException(500, 'Error validating pagination query')
  }
}
