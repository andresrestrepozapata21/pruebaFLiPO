// All imports neededs
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

// To setting url prefix endpoints teacher
@Controller('teachers')
export class TeachersController {
  //To settins constructor for to use services teacher
  constructor(private readonly teachersService: TeachersService) { }
  /* =============================================================================================================================
                                                     Regular CRUD
================================================================================================================================*/
  //Method POST to create teacher
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }
  //Method GET to get all teacher
  @Get()
  findAll() {
    return this.teachersService.findAll();
  }
  //Method GET to get one teacher
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.teachersService.findOne(id);
  }
  //Method PATCH to update one teacher
  @Put(':id')
  update(@Param('id') id: number, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }
  //Method DELETE to logic delete one teacher
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.teachersService.remove(id);
  }
}
