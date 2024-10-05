import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.test.json';

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // moduleNameMapper and modulePaths are needed for TypeScript custom paths,
    // in tsconfig.json compilerOptions.paths
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: `<rootDir>${compilerOptions.baseUrl}`,
    }),
    modulePaths: ['<rootDir>'],
    transform: {
        '.ts$': ['ts-jest', { tsconfig: './tsconfig.test.json' }],
    },
    modulePathIgnorePatterns: ['<rootDir>/docs/'],
};
