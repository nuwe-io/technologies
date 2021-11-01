# Technoloiges API

API que contiene una lista de diferentes tecnologías del sector sofware.

## Install

(not released the package yet)
```shell
npm i @nuwe/technologies
```

o clonalo utilizando:

```shell
git clone https://github.com/nuwe-io/technologies
```

## Usage

API Documentation: [technologies.nuwe.io](https://technologies.nuwe.io)

Para utilizar la API:

```typescript
// Para utilizar con axios:
import axios from "axios";

const baseURL = "https://technologies.nuwe.io/";
const logoFileName = "azure.png";

const azureLogo = () => axios.get(`${baseURL}/${logoFileName}`);
```

### Update de la documentación:

ejecutar desde el root folder:

```shell
apidoc -i src/ -o public/
```

### Contribute

In progress

## Contact info

Podéis poneros en contacto a través de linkedin:

[Edgar Gago Carrillo](https://www.linkedin.com/in/gagocarrilloedgar/)

o a través de:

> hello@nuwe.io

## Licence

[MIT](https://opensource.org/licenses/MIT)

## Stack

- CosmosDB con MongoDB con deploy en Azure
- TS
- Node
- AWS EBS con Docker --> deploy automático con cambios desde la rama main
- AWS S3 para el file manager
