export const PORT = 3000;
import bs from 'bcrypt'
export const harcodeData = async (model, list, attribute, message, error) => {
    for (const item of list) {
        const whereCondition = {};
        whereCondition[attribute] = item[attribute]; 

        const [data, isCreated] = await model.findOrCreate({
            where: whereCondition,
            defaults: item
        });

        if (isCreated) {
            console.log(`${message} ${data[attribute]}`);
        } else {
            console.log(`${error} ${data[attribute]}`);
        }
    }
};


export const harcodeUsers = async (model, users) => {

  for (const user of users) {
      var hashedPassword = await bs.hash(user.password, 6);
    const [data, isCreated] = await model.findOrCreate({
      where: { email: user.email },
      defaults: {
        name: user.name,
        lastName: user.lastName,
        licenseNumber: user.licenseNumber || null,
        specialty_id: user.specialty_id || null,
        role_id: user.role_id || 1,
        password: hashedPassword
      }
    });

    if (isCreated) {
      console.log(`Usuario creado: ${data.name} ${data.lastName} (${data.email})`);
    } else {
      console.log(`Usuario ya existente: ${data.email}`);
    }
  }
};

