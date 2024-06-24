import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody, "reqBody");

        // 1. Check if user already exists
        const userExist = await User.findOne({ email });

        if (userExist) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "User already exists",
                },
                { status: 400 }
            );
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Save the user to the database
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        const newUser = await user.save();
        console.log(newUser, "newUser");

        const id = newUser._id;
        console.log(id, "id-----------");

        // 4. Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

        return NextResponse.json(
            {
                status: true,
                message: "User created",
                data: newUser,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                status: "error",
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}
