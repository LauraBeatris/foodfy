require('dotenv/config');

const bcrypt = require('bcrypt');
const faker = require('faker');
const User = require('../app/models/User');
const Chef = require('../app/models/Chef');
const Recipe = require('../app/models/Recipe');
const File = require('../app/models/File');

async function createAdminUser() {
    const password = await bcrypt.hash('123', 8);
    const adminUserValues = {
        name: 'Administrador',
        email: 'administrador@foodfy.com',
        password,
        is_admin: true,
    };

    const adminUser = await User.create(adminUserValues);
    return adminUser;
}

async function createRegularUser() {
    const password = await bcrypt.hash('123', 8);
    const regularUserValues = {
        name: 'Usuário Comum',
        email: 'usuáriocomum@foodfy.com',
        password,
        is_admin: false,
    };

    await User.create(regularUserValues);
}

async function createFile({ name, path }) {
    const file = await File.create({ name, path });
    return file;
}

async function createChef() {
    const file = await createFile({
        name: 'chef-mayk',
        path:
            'https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4',
    });

    const chefValues = {
        name: 'Mayk Brito',
        file_id: file.id,
    };

    const chef = await Chef.create(chefValues);
    return chef;
}

async function createRecipes({ user_id, chef_id }) {
    const ingredients = Array.from({ length: 5 }, () => faker.name.findName());
    const preparations = Array.from({ length: 5 }, () =>
        faker.lorem.paragraph()
    );

    const recipePromises = [];
    while (recipePromises.length <= 5) {
        const recipeValues = {
            title: faker.name.title(),
            ingredients: `{${ingredients}}`,
            preparations: `{${preparations}}`,
            information: faker.lorem.text(),
            user_id,
            chef_id,
        };

        recipePromises.push(Recipe.create(recipeValues));
    }

    await Promise.all(recipePromises);
}

async function runSeed() {
    try {
        const adminUser = await createAdminUser();
        await createRegularUser();

        const chef = await createChef();
        await createRecipes({ user_id: adminUser.id, chef_id: chef.id });
    } catch (err) {
        console.log('Error while generating seed data', err); // eslint-disable-line
    }
}

runSeed();
