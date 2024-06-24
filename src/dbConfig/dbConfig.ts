import mongoose from "mongoose";


export async function Connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('Connected to the database');

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Mongoose connected to db');
        })

        connection.on('error', (err) => {
            console.log('Mongoose connection error: ', err);
            process.exit(1);
        })

        connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        })



    } catch (error) {
        console.log('Error connecting to the database', error);
    }
}