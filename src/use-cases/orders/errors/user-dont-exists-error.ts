export class UserDontExistsError extends Error {
  constructor() {
    super("User don't exists.")
  }
}
