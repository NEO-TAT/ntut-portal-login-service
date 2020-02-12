<!--
 Copyright (c) 2020 DevilTea
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# ntut-portal-login-service

A simple ntut portal login service

## Requirements
- NodeJS v12

## How To Use
1. Create a config.json in `src/` as config.example.json like.

2. Execute the following script
    ```sh
    $ npm i
    $ npm run start:prod
    ```

## API

`POST` - `/api/login`

- Request
  
  body: 
  ```json
  {
    "studentId": string,
    "password": string
  }
  ```

- Response

  - `201` Created

    body:
    ```json
    {
      "cookie": {
        "key": "JSESSIONID",
        "value": "aaaBWrwUz3Vk_hMdxXE_w",
        "domain": "app.ntut.edu.tw",
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "hostOnly": true,
        "creation": "2020-02-12T11:58:14.027Z",
        "lastAccessed": "2020-02-12T11:58:14.031Z"
      }
    }
    ```

  - `400` Bad Request

    body: error message

## License

**The MIT License (MIT)**

Copyright © 2020 DevilTea