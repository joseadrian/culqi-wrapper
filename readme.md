# Instalación 

> npm install joseadrian/culqi-wrapper

# Cómo usar

```js
const Culqi = require('culqi-wrapper');
var culqi = new Culqi(private_key, options); 

culqi.getPlan('PLAN_ID', function(err, response) {
    if( err ) {
        console.error(err);
    } else {
        console.log(response);
    }
});
```

> Para respuestas retornados, revisar la documentación de Culqi.  [Respuestas](https://culqi.com/api/) / [Errores](https://culqi.com/api/#/errores)

# Options
 
#### version 

> Default: `v2`

#### hostname

> Default: `api.culqi.com`