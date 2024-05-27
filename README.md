# pruebaFLiPO
Clone the Repository

If you haven't cloned the repository yet, clone it using git:

git clone https://github.com/andresrestrepozapata21/pruebaFLiPO.git

Subsequently, you will find 3 folders:
1. api (backend)
2. app(frontEnd)
3. resource (documentation and deliverables: Postman workspace with all endpoints, link to Figma with the page design, the Prompts, the sql file with the database, MER diagram of the database.)

Enter each of the folders and execute individually:

npm i

Make sure you have entered the correct database configuration in the app.modeule.jsx file in the main backend src:

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'prueba_tecnica_flipo',
      autoLoadEntities:true,
      synchronize: true,
    }),
    TeachersModule,
    ClassesModule,F
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
just enter your database server credentials, in my case I am using Xampp as a database server.

In the resource folder, I provide the sql with the database ready, if you don't want to import this sql, just make sure the database is named like this on the line:

  database: 'flipo_technical_test',

The code will synchronize the tables automatically with the entity configuration made.

Now if you are in the backend execute:

npm run start:dev

if you are in the frontend execute:

npm run dev

=========================================================================== IMPORTANT ======================================================================================================

In the resources folder you will find:

- postman workspace with all endpoints
- Link to Figma with the page design
- The Prompts
- the sql file with the database
- MER diagram of the database.
