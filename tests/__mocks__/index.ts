export const mockAllBasics = () => {
  jest.mock('typeorm', () => ({
    __esModule: true,
    Column: jest.fn(),
    Entity: jest.fn(),
    ManyToOne: jest.fn(),
    OneToMany: jest.fn(),
    JoinColumn: jest.fn(),
    BaseEntity: jest.fn(),
    CreateDateColumn: jest.fn(),
    UpdateDateColumn: jest.fn(),
    PrimaryGeneratedColumn: jest.fn(),
  }));
};
