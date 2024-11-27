import { faker } from "@faker-js/faker";


const generatePets = () => {
    return {
        name: faker.person.firstName(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(5),
        adopted: false,
        owner: "",
        image: faker.image.url(),
    };
};


export default {generatePets}
