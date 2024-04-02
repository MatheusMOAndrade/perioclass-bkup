import { Security } from "../../modules/Security"
import { UsersRaw, UsersView, processUser } from "../../views/UsersView";

export const fakeUser: UsersView = {
    id: "1",
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: Security.AESEncrypt('password123'),
    phone: "987654321",
    level: 7,
    createdAt: new Date(),
    updatedAt: new Date()
};

export const fakeSessionToken = Security.JWTEncrypt(fakeUser);

export const userRawView: UsersRaw = {
    id: "1",
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: Security.AESEncrypt('password123'),
    phone: "987654321",
    level: 7,
    created_at: new Date(),
    updated_at: new Date()
}

export const sessionToken = Security.JWTEncrypt(processUser(userRawView));
