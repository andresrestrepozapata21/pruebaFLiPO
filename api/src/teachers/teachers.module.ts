// All imports neededs
import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
// Setting and export by module teacher
@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TypeOrmModule]
})
export class TeachersModule {}
