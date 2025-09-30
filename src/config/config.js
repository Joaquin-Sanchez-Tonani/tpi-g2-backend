export const PORT = 3000;

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

export const harcodeUsers = async (model,users) => {
  for (const user of users) {
    const [data, isCreated] = await model.findOrCreate({
      where: { email: user.email }, 
      defaults: user                
    });

    if (isCreated) {
      console.log(`Usuario creado: ${data.name} ${data.lastName} (${data.email})`);
    } else {
      console.log(`Usuario ya existente: ${data.email}`);
    }
  }
};
