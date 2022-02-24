import { hashSync } from 'bcrypt';

export const USERDATA: { username: string, password: string }[] = [
  { username: 'admin', password: hashSync('administer', 10) },
  { username: 'test', password: hashSync('test', 10) }
]