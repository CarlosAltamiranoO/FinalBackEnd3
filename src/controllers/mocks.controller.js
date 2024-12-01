import { petsService } from "../services/index.js"
import mocksServices from "../services/mocksServices.js";
import PetDTO from "../dto/Pet.dto.js";

/* const getMockingPets2 = async(req, res) => {
    try {
        const pets = [];
        for (let i = 0; i < 3; i++) {
            const pet = mocksServices.generatePets();
            pets.push(pet);
        }
        const savedPets = await petsService.insert(pets);
        //return res.status(201).json();
        res.send({status:"success",payload:savedPets})
    } catch (error) {
        console.error('Error saving pets:', error);
        return res.status(500).json({ error: 'Failed to save pets' });
    }
}; */
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

export default { getMockingPets, getMockingUsers };