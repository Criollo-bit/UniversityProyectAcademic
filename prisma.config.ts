import { defineConfig } from '@prisma/config';

// Función simple para decidir la URL
function getDbUrl() {
  const args = process.argv.join(' ');
  
  // Si es el schema de academico -> Base EducationalDataBase
  if (args.includes('academico.prisma')) {
    return "postgresql://postgres:123456@localhost:5432/EducationalDataBase";
  }
  
  // Si es el schema de estudiantes -> Base StudentDataBase
  if (args.includes('estudiantes.prisma')) {
    return "postgresql://postgres:123456@localhost:5432/StudentDataBase";
  }

  // Si es cualquier otro -> Base UniversityDataBase
  return "postgresql://postgres:123456@localhost:5432/UniversityDataBase";
}

export default defineConfig({
  datasource: {
    url: getDbUrl(),
  },
});