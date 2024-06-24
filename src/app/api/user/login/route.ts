import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

Connect();


//login

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody, "reqBody");


        // 1. Check if user already exists
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "User does not exists",
                },
                { status: 400 }
            );
        }


        // 2. Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "Invalid credentials",
                },
                { status: 400 }
            );
        }

        // 3. Generate token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,

        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            status: "success",
            message: "User logged in successfully",
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        },
            { status: 200 });




        response.cookies.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        return response;

    }
    catch (error) {

        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });

    }

}