import { petsService } from "../services/index.js"
import mocksServices from "../services/mocksServices.js";
import PetDTO from "../dto/Pet.dto.js";

const getMockingPets = async(req, res) => {
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
};
export default {getMockingPets};