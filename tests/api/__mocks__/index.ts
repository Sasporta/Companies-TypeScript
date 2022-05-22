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

export const mockFindOneBy = (uuid: string, list: { uuid: string }[]) =>
  list.reduce((a, c) => c.uuid === uuid ? { ...c, remove: jest.fn(), save: jest.fn() } : a, null);
