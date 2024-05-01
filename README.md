https://github.com/LucasDaniOV/tiStudent/assets/94640850/c4a59b32-d006-4291-829d-bb9b4a3f63eb

https://github.com/LucasDaniOV/tiStudent/assets/94640850/af7ec5f6-d4d1-4716-8b6d-d11e652e465b

# tiStudent
A platform where students can share academic resources and like or comment on them.  
Created by [Davy Bellens](https://github.com/DavyBellens) and [Lucas Daniel Oude Vrielink](https://github.com/LucasDaniOV) for a school project.
## Back-End  
```cd tiStudent/back-end```

Create your .env file by copying the .env.example and update the values  
```cp .env.example .env```  

Use a Docker container for the database  
```docker run --name tiStudent -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=tiStudent -d postgres```  

You should have something like this:
```
APP_PORT = 3000
DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/tiStudent?schema=public'
JWT_SECRET = 6Eg/dalEkm27SZ1VCmA2eNW4+xRvV+845fxIshtzej0poP4CzHIr7ctmO1x9sWC3ZzFHkXpGNITZzzh5nIHgJqRB+obv6eHPL4xgYAZCybGnbg+GMfu5vEe2UZhwbHDSOafsHg==
JWT_EXPIRES_HOURS = 8
JWT_ISSUER = 'tistudent_app'
```

Install node modules  
```npm i```

Generate DB  
```npx prisma generate```  
```npx prisma db push```  
```npx prisma migrate dev```  

Run tests  
```npm test```

Start back-end  
```npm start```

Check api documentation at http://localhost:3000/api-docs/

## Front-End  
```cd ../front-end```

Copy .env.example to .env  
```cp .env.example .env```

Install node modules  
```npm i```

Run tests  
```npm test```

Start front-end  
```npm run dev```
