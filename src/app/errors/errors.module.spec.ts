import { ErrorsModule } from './errors.module';

describe('ErrorsModule', () => {
  let errosModule: ErrorsModule;

  beforeEach(() => {
    errosModule = new ErrorsModule();
  });

  it('should create an instance', () => {
    expect(errosModule).toBeTruthy();
  });
});
