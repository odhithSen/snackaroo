import HttpException from '../models/http-exception.model'

export function validateDateRange(from?: string, to?: string): { fromDate: Date; toDate: Date } {
  const fromDate = from ? new Date(from) : undefined
  const toDate = to ? new Date(to) : undefined

  if (!fromDate || !toDate) {
    throw new HttpException(400, 'Missing query parameters from and to')
  }
  if ((fromDate && isNaN(fromDate.getTime())) || (toDate && isNaN(toDate.getTime()))) {
    throw new HttpException(400, 'Invalid date format')
  }
  if (fromDate && toDate && fromDate >= toDate) {
    throw new HttpException(400, 'Invalid date range')
  }

  return { fromDate, toDate }
}
