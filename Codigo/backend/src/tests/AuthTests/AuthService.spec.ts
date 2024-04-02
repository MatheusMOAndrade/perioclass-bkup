import { fakeUser, fakeSessionToken, userRawView } from '../__mocks__/AuthMocks';
import { connectMysqlMock } from '../__mocks__/DatabaseMocks';
import AuthService from '../../services/AuthService';
import Database from '../../modules/Database';

const { authorize, authenticate } = AuthService;
const { connectMysql } = Database;

beforeAll(() => {
    connectMysql(connectMysqlMock);
});

describe(`authorize`, () => {
    test(`should return user data and session token when email and password are correct`, async () => {

        const result = await authorize(fakeUser.email, 'password123');

        expect(result.user).toMatchObject({
            name: 'John Doe',
            email: 'johndoe@example.com'
        });

        expect(result['session-token']).toBeDefined();
    });

    it('should throw 404 error when email is not registered', async () => {
        const nonExistingEmail = 'nonexisting@example.com';

        await expect(authorize(nonExistingEmail, 'password123'))
            .rejects.toMatchObject({ status: 404, message: "Email não cadastrado." });
    });

    it('should throw 400 error when password is incorrect', async () => {
        const wrongPassword = 'wrongpassword';
        await expect(authorize(fakeUser.email, wrongPassword))
            .rejects.toMatchObject({ status: 400, message: "Senha incorreta." });
    });
});

describe('authenticate', () => {
    it('should return the user ID and access level when the session token is valid', async () => {
        const result = await authenticate(fakeSessionToken);

        expect(result.userId).toBe("1");
        expect(result.level).toBe(7);
    });
});
