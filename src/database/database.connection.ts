import mongoose from "mongoose";

const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Error al conectar a la base de datos", error);
  }
};
export default databaseConnect;
