
## Description

[NestJs-MicroServices] communcation with rabit mqtt

## Run

```bash
$ docker compose up --build -d   
```

## Api

1. send request from task service with review:false 

2. in review service  change review:false to review:true 

3. return response back in task task service 

api end point task create :post  - [http://localhost:3000/task]
api end point task get :get  - [http://localhost:3000/task]


body :{

   "title":"title",
    "body":"body here ",
    "review":false
}

## Stay in touch

- Author - Usman jamil usmanjamil196@gmail.com

## License

Nest is [MIT licensed](LICENSE).
