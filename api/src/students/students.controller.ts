// All imports neededs
import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

// To setting url prefix endpoints teacher
@Controller('students')
export class StudentsController {
  //To settins constructor for to use services teacher
  constructor(private readonly studentsService: StudentsService) { }
  /* =============================================================================================================================
                                                     Regular CRUD
================================================================================================================================*/
  //Method POST to create teacher
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }
  //Method GET to get all teacher
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }
  //Method GET to get one teacher
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }
  //Method PATCH to update one teacher
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }
  //Method DELETE to logic delete one teacher
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
