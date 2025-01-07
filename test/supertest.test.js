import supertest from "supertest";
import chai from "chai";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");
/* un owner id para consultar una adopcion particular */
let ownerId = "674d030fcc82305a955ad587";
/* una id de adopcion en particular */
const adoptionId = "674d007d3fd8aeb572fcf8d3";
let petId;

describe("Testing App Adoctame - solo optener id mascota ", () => {
    it("Endpoint POST /api/pets debe crear una mascota correctamente para test de Adoption", async () => {
        const nuevaMascota = {
            name: "DogPool",
            specie: "Perro",
            birthDate: "2021-01-01",
        };
        const { statusCode, body } = await requester.post("/api/pets").send(nuevaMascota);
        expect(statusCode).to.equal(200);
        expect(body.payload).to.have.property("adopted").that.equals(false);
        petId = body.payload._id; 
    });

})

describe("Testing App Adoctame - router router Adoption ", () => {

    it("Endpoint GET /api/adoptions debe obtener todas las adopciones , payload devuelve un array y steatus 200", async () => {
        const { statusCode, body } = await requester.get("/api/adoptions");
        expect(statusCode).to.equal(200);
        expect(body).to.have.property("payload").that.is.an("array");
    })

    it("Endpoint GET /api/adoptions/aid debe obtener adopcion determinada , payload devuelve la adopcion con su id de adopcion , owner y pets", async () => {
        const { statusCode, body } = await requester.get(`/api/adoptions/${adoptionId}`);
        expect(statusCode).to.equal(200);
        expect(body.status).to.equal("success");
        expect(body.payload).to.have.property("_id", adoptionId);
        expect(body.payload).to.have.property("owner");
        expect(body.payload).to.have.property("pet");
    })


    it("Endpoint POST /api/adoptions/uid/pid debe obtener succes y mensagge Pet adopted", async () => {
        
        const { statusCode, body } = await requester.post(`/api/adoptions/${ownerId}/${petId}`).send("");
        expect(statusCode).to.equal(200);
        expect(body.status).to.equal("success");
        expect(body.message).to.equal("Pet adopted")
    })

    it("Endpoint POST /api/adoptions/uid/pid debe obtener status: 400 ya que una mascota no puede tener mas de una adopcion", async () => {
        
        const { statusCode } = await requester.post(`/api/adoptions/${ownerId}/${petId}`).send("");
        expect(statusCode).to.equal(400);

    })

})