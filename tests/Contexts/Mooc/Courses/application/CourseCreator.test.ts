import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { CourseNameLengthExceeded } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseNameLengthExceeded';
import { CourseMother } from '../Domain/CourseMother';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CreateCourseRequestMother } from './CreateCourseRequestMother';

let repository: CourseRepositoryMock;
let creator: CourseCreator;

beforeEach(() => {
  repository = new CourseRepositoryMock();
  creator = new CourseCreator(repository);
});

describe('CourseCreator', () => {
  it('should create a valid course', async () => {
    const request = CreateCourseRequestMother.random();

    const course = CourseMother.fromRequest(request);

    await creator.run(request);

    repository.assertSaveHaveBeenCalledWith(course);
  });

  it('should throw error if course name length is exceeded', async () => {
    expect(() => {
      const request = CreateCourseRequestMother.invalidRequest();

      const course = CourseMother.fromRequest(request);

      creator.run(request);

      repository.assertSaveHaveBeenCalledWith(course);
    }).toThrow(CourseNameLengthExceeded);
  });
});