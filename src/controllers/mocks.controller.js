import { petsService, usersService, adoptionsService } from "../services/index.js"
import mocksServices from "../services/mocksServices.js";

const getMockingPets = async (req, res) => {
    try {
        const numPets = parseInt(req.query.num) || 50;
        const mockPets = await mocksServices.generateMockPets(numPets);
        res.send({ status: 'success', payload: mockPets });

    }

    catch (error) {
        console.error('Error saving pets:', error);
        return res.status(500).json({ error: 'Failed to save pets' });
    }
}
const getMockingUsers = async (req, res) => {
    try {
        const numUsers = parseInt(req.query.num) || 50;
        const mockUsers = await mocksServices.generateMockUsers(numUsers);
        res.send({ status: 'success', payload: mockUsers });

    } catch (error) {
        console.error('Error saving Users:', error);
        return res.status(500).json({ error: 'Failed to save Users' });
    }

}
const generateData = async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;

        const mockUsers = await mocksServices.generateMockUsers(users);
        const mockPets = mocksServices.generateMockPets(pets);

        const createdUsers = await Promise.all(mockUsers.map(user => usersService.create(user)));
        const createdPets = await Promise.all(mockPets.map(pet => petsService.create(pet)));

        const adoptions = [];
        for (let i = 0; i < Math.min(createdUsers.length, createdPets.length); i++) { // el minimo length de los dos array ya que el tamaño puede ser diferente
            adoptions.push({
                owner: createdUsers[i % createdUsers.length]._id,
                pet: createdPets[i]._id
            });
        }

        //await Promise.all(adoptions.map(adoption => adoptionsService.create(adoption)));
        await Promise.all(
            adoptions.map(async (adoption) => {
                await adoptionsService.create(adoption);
                await petsService.update(adoption.pet, { adopted: true, owner: adoption.owner });
                await usersService.update(adoption.owner, { $push:{ pets: adoption.pet }}); //no funciona , ni idea
            })
        )

        res.send({
            status: 'success',
            message: `se creaton ${adoptions.length} Adopciones`
        });
    } catch (error) {
        console.error("Error generating data:", error);
        res.status(500).send({ status: 'error', message: 'Internal server error' });
    }
}

export default { getMockingPets, getMockingUsers, generateData };