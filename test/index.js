// import * as a2n from '../dist/a2n.bundle'
import * as a2n from '../src/index'

console.log(a2n);

a2n.start((path) => require(path))