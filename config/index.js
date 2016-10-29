import test from './testConfig'
import development from './devConfig'

const configs = {
  test,
  development,
}

export default configs[process.env.NODE_ENV]