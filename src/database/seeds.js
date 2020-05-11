require('dotenv/config');

const bcrypt = require('bcrypt');
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
        email: 'usuariocomum@foodfy.com',
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
    const recipesValues = [
        {
            title: 'Triplo bacon burger',
            ingredients: `{${[
                '3 kg de carne moída (escolha uma carne magra e macia)',
                '300 g de bacon moído',
                '1 ovo',
                '3 colheres (sopa) de farinha de trigo',
                '3 colheres (sopa) de tempero caseiro: feito com alho, sal, cebola, pimenta e cheiro verde processados no liquidificador',
                '30 ml de água gelada',
            ]}}`,
            preparations: `{${[
                'Misture todos os ingredientes muito bem e amasse para que fique tudo muito bem misturado.',
                'Faça porções de 90 g a 100 g.',
                'Forre um plástico molhado em uma bancada e modele os hambúrgueres utilizando um aro como base.',
                'Faça um de cada vez e retire o aro logo em seguida.',
                'Forre uma assadeira de metal com plástico, coloque os hambúrgueres e intercale camadas de carne e plásticos (sem apertar).',
                'Faça no máximo 4 camadas por forma e leve para congelar.',
                'Retire do congelador, frite ou asse e está pronto.',
            ]}}`,
            information:
                'Preaqueça a chapa, frigideira ou grelha por 10 minutos antes de levar os hambúrgueres.',
            user_id,
            chef_id,
        },
        {
            title: 'Pizza 4 estações',
            ingredients: `{${[
                '1 xícara (chá) de leite',
                '1 ovo',
                '1 colher (chá) de sal',
                '1 colher (chá) de açúcar',
                '1 colher (sopa) de margarina',
                '1 e 1/2 xícara (chá) de farinha de trigo',
                '1 colher (sobremesa) de fermento em pó',
                '1/2 lata de molho de tomate',
                '250 g de mussarela ralada grossa',
                '2 tomates fatiados',
                'azeitona picada',
                'orégano a gosto',
            ]}}`,
            preparations: `{${[
                'No liquidificador bata o leite, o ovo, o sal, o açúcar, a margarina, a farinha de trigo e o fermento em pó até que tudo esteja encorporado.',
                'Despeje a massa em uma assadeira para pizza untada com margarina e leve ao forno preaquecido por 20 minutos.',
                'Retire do forno e despeje o molho de tomate.',
                'Cubra a massa com mussarela ralada, tomate e orégano a gosto.',
                'Leve novamente ao forno até derreter a mussarela.',
            ]}}`,
            information:
                'Pizza de liquidificador é uma receita deliciosa e supersimples de preparar.',
            user_id,
            chef_id,
        },
        {
            title: 'Asinhas de frango ao barbecue',
            ingredients: `{${[
                '12 encontros de asinha de galinha, temperados a gosto',
                '2 colheres de sopa de farinha de trigo',
                '1/2 xícara (chá) de óleo',
                '1 xícara de molho barbecue',
            ]}}`,
            preparations: `{${[
                'Em uma tigela coloque o encontro de asinha de galinha e polvilhe a farinha de trigo e misture com as mãos.',
                'Em uma frigideira ou assador coloque o óleo quando estiver quente frite até ficarem douradas.',
                'Para servir fica bonito com salada, ou abuse da criatividade.',
            ]}}`,
            information: '',
            user_id,
            chef_id,
        },
        {
            title: 'Lasanha mac n cheese',
            ingredients: `{${[
                'massa pronta de lasanha',
                '400 g de presunto',
                '400 g de mussarela ralada',
                '2 copos de requeijão',
                '150 g de mussarela para gratinar',
            ]}}`,
            preparations: `{${[
                'Em uma panela, coloque a manteiga para derreter.',
                'Acrescente a farinha de trigo e misture bem com auxílio de um fouet.',
                'Adicione o leite e misture até formar um creme homogêneo.',
                'Tempere com sal, pimenta e noz-moscada a gosto.',
                'Desligue o fogo e acrescente o creme de leite; misture bem e reserve.',
            ]}}`,
            information: 'Recheie a lasanha com o que preferir.',
            chef_id,
            user_id,
        },
    ];
    const recipePromises = recipesValues.map((recipe) => Recipe.create(recipe));
    await Promise.all(recipePromises);
}

async function runSeed() {
    try {
        const adminUser = await createAdminUser();
        await createRegularUser();

        const chef = await createChef();
        await createRecipes({ user_id: adminUser.id, chef_id: chef.id });
        console.log('Seeds generated 🚀'); // eslint-disable-line
        process.exit();
    } catch (err) {
        console.log('Error while generating seed data', err); // eslint-disable-line
    }
}

runSeed();
