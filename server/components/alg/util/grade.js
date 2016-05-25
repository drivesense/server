export function grade({location, topics}, student1, student2) {
  const locationGrade = location(student1, student2);
  const topicsGrade = topics(student1, student2);

  return locationGrade * 0.5 + topicsGrade * 0.5;
}