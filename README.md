# Welcome to babel-plugin-import-route-async!

The plugin aims to async loading react components by router on demand.

## Install
```sh
npm i babel-plugin-import-route-async --save-dev
yarn add babel-plugin-import-route-async -D
```
## Guide
The plugin could translate es6 import module syntax to async loading with webpack.
you could specify the component name, path and comment with identity key for plugin to translate.

### Options
#### sourceKey
The key in the component path, default: /\/pages?\//.
#### localKey
The key in the compoent name, default: /.*[p|P]age$/.
#### exact
If exact is true,the plugin will check both localkey and sourceKey together, default: true.
#### async
If async is true,the components will be async loading, otherwise sync loading, default: true.

### Example
```js
import myPage  from './pages/mypage'

import { myPage } from './pages/mypage'

import { 
notPage,
/* route-async */
myPageComponent } from './pages/mypage'

import { 
//async loading
/* route-async */
myPageComponent1,

//sync loading
/* route-sync */
myPageComponent2 } from './pages/mypage'
```