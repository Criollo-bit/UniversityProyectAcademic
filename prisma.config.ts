import { defineConfig } from '@prisma/config';

// Función para decidir la URL basada en el esquema que se está procesando
function getDbUrl() {
  const args = process.argv.join(' ');
  
  // Si es el schema de academic va a Base EducationalDataBase
  if (args.includes('academic.prisma')) {
    return process.env.ACADEMIC_DATABASE_URL || "postgresql://postgres:123456@localhost:5432/EducationalDataBase";
  }
  
  // Si es el schema de students va a Base StudentDataBase
  if (args.includes('students.prisma')) {
    return process.env.STUDENTS_DATABASE_URL || "postgresql://postgres:123456@localhost:5432/StudentDataBase";
  }

  // Si es el esquema principal
  return process.env.MAIN_DATABASE_URL || "postgresql://postgres:123456@localhost:5432/UniversityDataBase";
}

export default defineConfig({
  datasource: {
    url: getDbUrl(),
  },
});