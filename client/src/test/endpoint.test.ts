import app, {closeServer} from "../../../backend/server";
import supertest from "supertest";
import {User} from "../../../backend/user/service"
import { generateUserToken } from "../../../backend/middleware/auth";


const request = supertest(app);
let token:any;
const user: User = {
    username: "admin",
    password: "admin123"
}
beforeAll(async () => {
    const userToken = jest.fn(generateUserToken)
    token = await userToken(user)
})

describe("endpoint testing", () :void => {
    test("successfull user login", async (): Promise<void> => {
        const req = request.post("/user/login")
        req.send({
            username: user.username,
            password: user.password
        })
        expect((await req).status).toBe(200)
    })

    test("user login fail", async (): Promise<void> => {
        const req = request.post("/user/login")
        req.send({
            username: user.username,
            password: "wrongpassword"
        })
        expect((await req).status).toBe(401)
    })

    test("create new user",async () :Promise<void> => {
        const req = request.post("/user/create")
        req.send({
            username: "test-user",
            password: "testpassword"
        })
        expect((await req).status).toBe(200)
    })
    test("wrong enpoint",async ():Promise<void> => {
        const req = request.get("/wrongenpoint")
        expect((await req).status).toBe(404)
    })
    test("notes endpoint", async ():Promise<void> => {
        const req = request.get("/note/:1")
        req.set("authorization", token)
        expect((await req).status).toBe(200)
    })
    test("note endpoint without authorization", async ():Promise<void> => {
        const req = request.get("/note/:1")
        req.set("authorization", token)
        expect((await req).status).toBe(200)
    })
    test("quotes endpoint",async () => {
        const req = request.post("/quote/quote_post")
        req.set("authorization", token)
        req.send({
            qote: "testquote",
            quote_id: "011",
            user_id: 1
        })
        expect((await req).status).toBe(200)
    })
})
afterAll(async (): Promise<void> => {
    await closeServer()
})
