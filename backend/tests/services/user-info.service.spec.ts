import { getUserByEmail, addUser } from '../../src/services/user-info.service'
import { User } from '../../src/models/user.model'
import HttpException from '../../src/models/http-exception.model'

jest.mock('../../src/models/user.model')

describe('User-info Service: getUserByEmail', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockUser = {
    user_id: 1,
    first_name: 'Test',
    last_name: 'User',
    email: 'user@example.com',
    contact_number: '123-456-7890',
    profile_picture_url: 'https://example.com/profile.jpg',
  }

  it('should successfully return a user by email', async () => {
    const findOneMock = jest.fn().mockResolvedValue(mockUser)
    User.findOne = findOneMock

    const result = await getUserByEmail('user@example.com')

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'user@example.com' } })
    expect(result).toEqual(mockUser)
  })

  it('should return null if no user is found', async () => {
    const findOneMock = jest.fn().mockResolvedValue(null)
    User.findOne = findOneMock

    const result = await getUserByEmail('notuser@example.com')

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'notuser@example.com' } })
    expect(result).toBeNull()
  })

  it('should throw a 500 error if there is an internal error', async () => {
    const findOneMock = jest.fn().mockRejectedValue(new Error('Internal error'))
    User.findOne = findOneMock

    await expect(getUserByEmail('testuser@example.com')).rejects.toThrow(
      new HttpException(500, 'Error getting user by email'),
    )

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'testuser@example.com' } })
  })
})

describe('User-info Service: addUser', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockNewUser = {
    user_id: 1,
    first_name: 'Test',
    last_name: 'User',
    email: 'user@example.com',
    contact_number: '123-456-7890',
    profile_picture_url: 'https://example.com/profile.jpg',
  }

  it('should successfully add a new user', async () => {
    const saveMock = jest.fn().mockResolvedValue(mockNewUser)
    User.build = jest.fn().mockReturnValue({ save: saveMock })

    const result = await addUser(mockNewUser)

    expect(User.build).toHaveBeenCalledWith(mockNewUser)
    expect(saveMock).toHaveBeenCalled()
    expect(result).toEqual(mockNewUser)
  })

  it('should throw an HttpException if user already exists', async () => {
    const saveMock = jest.fn().mockRejectedValue({ name: 'SequelizeUniqueConstraintError' })
    User.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addUser(mockNewUser)).rejects.toThrow(
      new HttpException(400, 'User already exists'),
    )

    expect(User.build).toHaveBeenCalledWith(mockNewUser)
  })

  it('should throw an HttpException for invalid user details', async () => {
    const saveMock = jest.fn().mockRejectedValue({ name: 'ValidationError' })
    User.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addUser(mockNewUser)).rejects.toThrow(new HttpException(400, 'Invalid user'))

    expect(User.build).toHaveBeenCalledWith(mockNewUser)
  })

  it('should throw a 500 error for any other internal exception', async () => {
    const saveMock = jest.fn().mockRejectedValue(new Error('Some random error'))
    User.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addUser(mockNewUser)).rejects.toThrow(new HttpException(500, 'Error saving user'))

    expect(User.build).toHaveBeenCalledWith(mockNewUser)
  })
})
