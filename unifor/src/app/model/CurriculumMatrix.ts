export interface CurriculumMatrix {
  id?: number;
  course: { id: number; name: string };
  semester: { id: number; number: string };
  subject: { id: number; name: string };
}
