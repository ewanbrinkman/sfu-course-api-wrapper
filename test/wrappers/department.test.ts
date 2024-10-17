import wrappers from '../../src/wrappers';
import { NotFoundError } from '../../src/errors';

describe('departments', () => {
    test('request department that exists', async () => {
        const department = await wrappers.department('cmpt', 2022, 'fall');
        expect(department).toMatchSnapshot();
    }, 30000);
    test('request department that does not exist', async () => {
        await expect(wrappers.department('asdf', 2022, 'fall')).rejects.toThrow(
            NotFoundError,
        );
    }, 30000);
});
