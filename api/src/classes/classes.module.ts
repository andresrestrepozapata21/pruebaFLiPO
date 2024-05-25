// All imports neededs
import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Class } from './entities/class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { TeachersModule } from 'src/teachers/teachers.module';
import { TeachersService } from 'src/teachers/teachers.service';
import { StudentsModule } from 'src/students/students.module';
// Setting and export by module teacher
@Module({
  imports: [TypeOrmModule.forFeature([Class]), TeachersModule, StudentsModule],
  controllers: [ClassesController],
  providers: [ClassesService, TeachersService],
})
export class ClassesModule {}
