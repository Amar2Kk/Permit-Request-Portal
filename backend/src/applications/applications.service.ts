import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.permitApplication.findMany({
      orderBy: {
        submitted_at: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const application = await this.prisma.permitApplication.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return application;
  }

  async create(createApplicationDto: CreateApplicationDto) {
    return this.prisma.permitApplication.create({
      data: createApplicationDto,
    });
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    // Check if application exists
    await this.findOne(id);

    return this.prisma.permitApplication.update({
      where: { id },
      data: updateApplicationDto,
    });
  }
}

