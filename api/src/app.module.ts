// app.module.jsx settings database, import modules needed.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersModule } from './teachers/teachers.module';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
// DB setting
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
    ClassesModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
