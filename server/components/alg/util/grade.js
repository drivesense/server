import distance from 'gps-distance';

export function grade(student1, student2) {
  return 1 / distance(...student1.location, ...student2.location);
}