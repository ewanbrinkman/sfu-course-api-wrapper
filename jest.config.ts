import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.test.json';

const commonConfig = {
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

export default {
    projects: [
        {
            // Separate the `wrappers` test folder, since a delay should be
            // added between tests in that folder. This is to prevent the API
            // getting overwhelmed and returning errors when it is not expected
            // to.
            ...commonConfig,
            displayName: 'wrappers',
            testMatch: ['<rootDir>/test/wrappers/**/*.test.ts'],
            setupFilesAfterEnv: ['<rootDir>/test/wrappers/jest.setup.ts'],
        },
        {
            ...commonConfig,
            displayName: 'default',
            testMatch: ['<rootDir>/test/**/*.test.ts'],
            testPathIgnorePatterns: ['<rootDir>/test/wrappers/'],
        },
    ],
};
