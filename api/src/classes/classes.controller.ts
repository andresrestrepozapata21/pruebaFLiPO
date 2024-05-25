// All imports neededs
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

// To setting url prefix endpoints class
@Controller('classes')
export class ClassesController {
  //To settins constructor for to use services class
  constructor(private readonly classesService: ClassesService) { }
  /* =============================================================================================================================
                                                       Regular CRUD
 ================================================================================================================================*/
  //Method POST to create class
  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }
  //Method GET to get all class
  @Get()
  findAll() {
    return this.classesService.findAll();
  }
  //Method GET to get one class
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.classesService.findOne(id);
  }
  //Method PATCH to update one class
  @Put(':id')
  update(@Param('id') id: number, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(id, updateClassDto);
  }
  //Method DELETE to logic delete one class
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.classesService.remove(id);
  }
  /* =============================================================================================================================
                                                        Extra Routes 
  ================================================================================================================================*/
  //Method POST to add teacher to a class
  @Post(":id/assign-teacher")
  addTeacher(
    @Param('id') id: number,
    @Body() body: any
  ) {
    return this.classesService.addTeacher(id, body);
  }
  //Method POST to add students to a class
  @Post(":id/assign-students")
  addStudents(
    @Param('id') id: number,
    @Body() body: any
  ) {
    return this.classesService.addStudents(id, body);
  }
  //Method GET to get one classwith all students him
  @Get(':id/students')
  getStudentsByClass(@Param('id') id: number) {
    return this.classesService.getStudentsByClass(id);
  }
}
