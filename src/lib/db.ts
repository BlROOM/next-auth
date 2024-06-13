import moongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(moongoose.connection.readyState);
    if (moongoose.connection.readyState) return;
    const coon = await moongoose.connect(process.env.MONGODB_URL as string);
    console.log(`mongoDB connected ${coon.connection.host}`);
  } catch (e) {
    console.log("error connected", e);
    process.exit();
  }
};

export default connectDB;
