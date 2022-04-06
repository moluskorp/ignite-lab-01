import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateStudentparams {
    authUserId: string;
}
@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) {}

    listAllStudents() {
        return this.prisma.student.findMany();
    }

    getStudentById(id: string) {
        return this.prisma.student.findUnique({
            where: { id },
        });
    }

    getStudentByAuthUserId(authUserId: string) {
        return this.prisma.student.findUnique({
            where: {
                authUserId,
            },
        });
    }

    createStudent({ authUserId }: CreateStudentparams) {
        return this.prisma.student.create({
            data: {
                authUserId,
            },
        });
    }
}
